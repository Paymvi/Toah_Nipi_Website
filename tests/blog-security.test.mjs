// Security tests for the blog backend, run against a LOCAL Supabase stack with
// direct API requests (no UI), through the real upload function
// (api/blog-process-upload.js). See BLOG_ADMIN_SETUP.md, "Testing".
//
//   npx supabase start
//   npm run test:blog-security
//
// Uses only the local stack's disposable demo keys (from `npx supabase
// status`). Refuses to run against anything but localhost.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHmac } from "node:crypto";
import { readFileSync } from "node:fs";
import { before, test } from "node:test";
import { createClient } from "@supabase/supabase-js";

const status = JSON.parse(
  execFileSync("npx", ["--yes", "supabase@3.2.0", "status", "-o", "json"], { encoding: "utf8", shell: true })
    .replace(/^[^{]*/, "")
);
const URL_ = status.API_URL;
// BLOG_TEST_KEYS=new tests the newer sb_publishable_ / sb_secret_ key types.
const newKeys = process.env.BLOG_TEST_KEYS === "new";
const ANON = newKeys ? status.PUBLISHABLE_KEY : status.ANON_KEY;
const SERVICE = newKeys ? status.SECRET_KEY : status.SERVICE_ROLE_KEY;
const DB_CONTAINER = "supabase_db_toah_nipi_blog";

if (!/^http:\/\/(127\.0\.0\.1|localhost):/.test(URL_)) {
  throw new Error(`Refusing to run security tests against ${URL_}`);
}

// The upload function reads these; set to the local stack only.
Object.assign(process.env, { VITE_SUPABASE_URL: URL_, VITE_SUPABASE_ANON_KEY: ANON, SUPABASE_SERVICE_ROLE_KEY: SERVICE });
const { POST: processUpload } = await import("../api/blog-process-upload.js");

const fixture = (name) => readFileSync(new URL(`./fixtures/${name}`, import.meta.url));
const VALID_PDF = fixture("blank-valid.pdf");
const JS_PDF = fixture("javascript.pdf");
const ENCRYPTED_PDF = fixture("encrypted-no-open-password.pdf");
const ATTACHMENT_PDF = fixture("attachment.pdf");
const HTML_AS_PDF = Buffer.from("<html><script>alert(1)</script></html>");
const DAMAGED_PDF = VALID_PDF.subarray(0, 200);

const opts = { auth: { persistSession: false, autoRefreshToken: false } };
const admin = createClient(URL_, SERVICE, opts);
const anon = createClient(URL_, ANON, opts);
const run = Date.now();

const sql = (query) =>
  execFileSync("docker", ["exec", "-i", DB_CONTAINER, "psql", "-U", "postgres", "-tA", "-v", "ON_ERROR_STOP=1"], {
    input: query,
    encoding: "utf8",
  }).trim();

function totp(secret) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const bits = [...secret.replace(/=+$/, "")].map((c) => alphabet.indexOf(c).toString(2).padStart(5, "0")).join("");
  const key = Buffer.from(bits.match(/.{8}/g).map((b) => parseInt(b, 2)));
  const counter = Buffer.alloc(8);
  counter.writeBigUInt64BE(BigInt(Math.floor(Date.now() / 30000)));
  const hash = createHmac("sha1", key).update(counter).digest();
  return String((hash.readUInt32BE(hash[19] & 15) & 0x7fffffff) % 1e6).padStart(6, "0");
}

// Password-only sign-in, like the staff page.
async function makeUser(name, { editor = false } = {}) {
  const email = `${name}-${run}@example.test`;
  const password = `pw-${run}-${name}-long-enough`;
  const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
  assert.ifError(error);
  if (editor) sql(`insert into private.blog_editors (user_id, note) values ('${data.user.id}', 'test');`);

  const client = createClient(URL_, ANON, opts);
  assert.ifError((await client.auth.signInWithPassword({ email, password })).error);
  const token = async () => (await client.auth.getSession()).data.session.access_token;
  return { client, id: data.user.id, email, password, token };
}

const denied = (result, label) => {
  assert.ok(result.error, `${label}: expected an error, got data ${JSON.stringify(result.data)}`);
};

const callUpload = async (token, uploadId) => {
  const response = await processUpload(new Request("http://localhost/api/blog-process-upload", {
    method: "POST",
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), "Content-Type": "application/json" },
    body: JSON.stringify({ uploadId }),
  }));
  return { status: response.status, body: await response.json() };
};

// Upload to quarantine, then ask the server to check and attach it, as the staff page does.
async function uploadPdf(user, postId, bytes, filename = "story.pdf") {
  const { data: uploadId, error } = await user.client.rpc("blog_begin_upload", {
    p_post_id: postId, p_filename: filename, p_size: bytes.length,
  });
  assert.ifError(error);
  const put = await user.client.storage.from("blog-uploads").upload(`incoming/${uploadId}.pdf`, bytes, { contentType: "application/pdf" });
  assert.ifError(put.error);
  return { uploadId, ...(await callUpload(await user.token(), uploadId)) };
}

const uploadState = (id) => sql(`select status from public.blog_uploads where id = '${id}'`);
const postPdf = (id) => sql(`select coalesce(pdf_upload_id::text, '') from public.blog_posts where id = '${id}'`);
const publicFileStatus = async (uploadId) => {
  const { data, error } = await anon.storage.from("blog-files").createSignedUrl(`${uploadId}.pdf`, 60);
  if (error) return { signed: false };
  const response = await fetch(data.signedUrl);
  return { signed: true, status: response.status, response };
};

let editor, otherEditor, plainUser;

before(async () => {
  editor = await makeUser("editor", { editor: true });
  otherEditor = await makeUser("editor2", { editor: true });
  plainUser = await makeUser("plain");
});

test("the migration leaves no uploads waiting for the removed approval step", () => {
  assert.equal(sql("select count(*) from public.blog_uploads where status = 'pending_review'"), "0");
  for (const fn of ["blog_submit_upload", "blog_claim_pending", "blog_release_upload", "blog_attach_upload"]) {
    assert.equal(sql(`select count(*) from pg_proc where proname = '${fn}'`), "0", `${fn} removed`);
  }
});

test("anonymous visitors cannot manage posts or upload", async () => {
  denied(await anon.rpc("blog_create_post", { p_title: "x" }), "anon create");
  denied(await anon.rpc("blog_begin_upload", { p_post_id: crypto.randomUUID(), p_filename: "a.pdf", p_size: 10 }), "anon upload slot");
  denied(await anon.rpc("blog_claim_upload", { p_upload_id: crypto.randomUUID() }), "anon claim");
  denied(await anon.from("blog_posts").select("*"), "anon read posts table");
  denied(await anon.from("blog_uploads").select("*"), "anon read uploads");
  denied(await anon.from("blog_audit_log").select("*"), "anon read audit");
  denied(await anon.from("blog_posts").insert({ title: "x", created_by: crypto.randomUUID(), updated_by: crypto.randomUUID() }), "anon insert");
  denied(await anon.storage.from("blog-uploads").upload(`incoming/${crypto.randomUUID()}.pdf`, VALID_PDF, { contentType: "application/pdf" }), "anon storage upload");
  assert.equal((await callUpload(null, crypto.randomUUID())).status, 401, "upload endpoint without a session");
  assert.equal((await callUpload(ANON, crypto.randomUUID())).status, 403, "upload endpoint with only the public key");
  assert.ifError((await anon.rpc("blog_list_published")).error);
});

test("signed-in users who are not editors cannot manage posts or upload", async () => {
  denied(await plainUser.client.rpc("blog_create_post", { p_title: "x" }), "plain create");
  denied(await plainUser.client.rpc("blog_begin_upload", { p_post_id: crypto.randomUUID(), p_filename: "a.pdf", p_size: 10 }), "plain upload slot");
  assert.deepEqual((await plainUser.client.from("blog_posts").select("*")).data, [], "plain user sees no posts");
  denied(await plainUser.client.storage.from("blog-uploads").upload(`incoming/${crypto.randomUUID()}.pdf`, VALID_PDF, { contentType: "application/pdf" }), "plain storage upload");
  assert.equal((await callUpload(await plainUser.token(), crypto.randomUUID())).status, 403, "upload endpoint");
});

test("editors work with password-only sessions, including ones with an old authenticator enrolled", async () => {
  const created = await editor.client.rpc("blog_create_post", { p_title: "password only" });
  assert.ifError(created.error);
  assert.ifError((await editor.client.rpc("blog_delete_post", { p_id: created.data })).error);

  // An editor who enrolled TOTP under the earlier design signs in with just a password (aal1).
  const legacy = await makeUser("legacy-mfa", { editor: true });
  const { data: factor } = await legacy.client.auth.mfa.enroll({ factorType: "totp", friendlyName: "old" });
  assert.ifError((await legacy.client.auth.mfa.challengeAndVerify({ factorId: factor.id, code: totp(factor.totp.secret) })).error);
  const fresh = createClient(URL_, ANON, opts);
  assert.ifError((await fresh.auth.signInWithPassword({ email: legacy.email, password: legacy.password })).error);
  assert.equal((await fresh.auth.mfa.getAuthenticatorAssuranceLevel()).data.currentLevel, "aal1");
  const post = await fresh.rpc("blog_create_post", { p_title: "aal1 editor" });
  assert.ifError(post.error, "aal1 session can manage posts");
  await fresh.rpc("blog_delete_post", { p_id: post.data });
  const change = await fresh.auth.updateUser({ password: `${legacy.password}-changed` });
  console.log(`  password change by an editor with an old authenticator, password-only session: ${change.error ? `refused (${change.error.message})` : "ok"}`);
});

test("editors cannot grant themselves access or reach server-only steps", async () => {
  denied(await plainUser.client.schema("private").from("blog_editors").insert({ user_id: plainUser.id }), "self-grant");
  denied(await editor.client.schema("private").from("blog_editors").select("*"), "read editors");
  denied(await editor.client.from("blog_posts").update({ status: "published" }).eq("title", "x").select(), "direct update");
  denied(await editor.client.from("blog_posts").update({ pdf_upload_id: crypto.randomUUID() }).gt("created_at", "2000-01-01").select(), "set pdf directly");
  denied(await editor.client.from("blog_audit_log").insert({ action: "created" }), "forge audit");
  denied(await editor.client.from("blog_audit_log").delete().gt("id", 0).select(), "delete audit");
  denied(await editor.client.from("blog_uploads").update({ status: "approved" }).gt("created_at", "2000-01-01").select(), "approve own upload");
  denied(await editor.client.rpc("blog_finish_upload", { p_upload_id: crypto.randomUUID(), p_ok: true, p_reason: null, p_byte_size: 1, p_sha256: null, p_page_count: 1, p_scan_result: null }), "finish upload");
  denied(await editor.client.rpc("blog_claim_cleanup"), "claim cleanup");
  denied(await editor.client.schema("auth").from("users").select("*"), "read auth.users");
  assert.equal(sql(`select count(*) from private.blog_editors where user_id = '${plainUser.id}'`), "0");

  const exposed = await editor.client.schema("private").from("blog_editors").select("*");
  assert.equal(exposed.error?.code, "PGRST106", "private schema must not be exposed");
  assert.equal(sql("select relrowsecurity::text from pg_class where oid = 'private.blog_editors'::regclass"), "true");
});

test("server validates fields", async () => {
  denied(await editor.client.rpc("blog_create_post", { p_title: "   " }), "blank title");
  denied(await editor.client.rpc("blog_create_post", { p_title: "x".repeat(151) }), "long title");
  denied(await editor.client.rpc("blog_create_post", { p_title: "ok", p_description: "x".repeat(501) }), "long description");
  denied(await editor.client.rpc("blog_create_post", { p_title: "line\nbreak" }), "control chars");
  const html = await editor.client.rpc("blog_create_post", { p_title: "<script>alert(1)</script>" });
  assert.ifError(html.error); // plain text; React renders it as text
  await editor.client.rpc("blog_delete_post", { p_id: html.data });
});

let postId, firstUpload;

test("upload, validation, publish and public reading", async () => {
  const created = await editor.client.rpc("blog_create_post", { p_title: `Test ${run}`, p_description: "Hello" });
  assert.ifError(created.error);
  postId = created.data;
  denied(await editor.client.rpc("blog_set_published", { p_id: postId, p_published: true }), "publish without pdf");

  const up = await uploadPdf(editor, postId, VALID_PDF);
  assert.equal(up.status, 200, JSON.stringify(up.body));
  firstUpload = up.uploadId;
  assert.equal(uploadState(firstUpload), "attached");
  assert.equal(postPdf(postId), firstUpload);
  assert.equal(sql(`select scan_result from public.blog_uploads where id = '${firstUpload}'`), "not_scanned", "recorded as validated, not virus-scanned");
  const quarantine = await admin.storage.from("blog-uploads").list("incoming", { search: firstUpload });
  assert.equal(quarantine.data.length, 0, "quarantine copy removed");

  // Draft: private, but editors can preview.
  assert.equal((await publicFileStatus(firstUpload)).signed, false, "draft PDF not public");
  assert.ok(!(await anon.rpc("blog_list_published")).data.some((p) => p.id === postId), "draft not listed");
  assert.ifError((await editor.client.storage.from("blog-files").createSignedUrl(`${firstUpload}.pdf`, 60)).error, "editor preview");

  assert.ifError((await editor.client.rpc("blog_set_published", { p_id: postId, p_published: true })).error);
  assert.ok((await anon.rpc("blog_list_published")).data.some((p) => p.id === postId), "published post listed");
  const file = await publicFileStatus(firstUpload);
  assert.equal(file.status, 200);
  assert.equal(file.response.headers.get("content-type"), "application/pdf");
  assert.match(new URL((await anon.storage.from("blog-files").createSignedUrl(`${firstUpload}.pdf`, 60)).data.signedUrl).pathname, /^\/storage\/v1\//, "served by Supabase Storage");
});

test("unvalidated uploads stay private and quarantine is write-once", async () => {
  const slot = await editor.client.rpc("blog_begin_upload", { p_post_id: postId, p_filename: "a.pdf", p_size: VALID_PDF.length });
  const path = `incoming/${slot.data}.pdf`;
  denied(await editor.client.storage.from("blog-uploads").upload(`incoming/${crypto.randomUUID()}.pdf`, VALID_PDF, { contentType: "application/pdf" }), "unreserved path");
  denied(await editor.client.storage.from("blog-uploads").upload(`../blog-files/${firstUpload}.pdf`, VALID_PDF, { contentType: "application/pdf" }), "path traversal");
  denied(await otherEditor.client.storage.from("blog-uploads").upload(path, VALID_PDF, { contentType: "application/pdf" }), "someone else's slot");
  denied(await editor.client.storage.from("blog-uploads").upload(path, VALID_PDF, { contentType: "text/html" }), "wrong MIME type");
  assert.ifError((await editor.client.storage.from("blog-uploads").upload(path, JS_PDF, { contentType: "application/pdf" })).error);
  denied(await editor.client.storage.from("blog-uploads").upload(path, VALID_PDF, { contentType: "application/pdf", upsert: true }), "overwrite after upload");
  denied(await editor.client.storage.from("blog-uploads").download(path), "editor read quarantine");
  denied(await anon.storage.from("blog-uploads").createSignedUrl(path, 60), "anon sign quarantine");
  // Validation can't be skipped: editors can't write the published bucket.
  denied(await editor.client.storage.from("blog-files").upload(`${slot.data}.pdf`, JS_PDF, { contentType: "application/pdf" }), "write blog-files directly");
  const removal = await editor.client.storage.from("blog-files").remove([`${firstUpload}.pdf`]);
  assert.equal(removal.data?.length ?? 0, 0, "editors can't delete published files");
  // Withdraw the never-checked upload.
  assert.equal((await callUpload(await editor.token(), slot.data)).status, 422, "the JavaScript PDF is rejected when checked");
});

test("oversized and wrongly named files are refused", async () => {
  const slot = await editor.client.rpc("blog_begin_upload", { p_post_id: postId, p_filename: "big.pdf", p_size: 1000 });
  const big = Buffer.alloc(21 * 1024 * 1024, 0x20);
  big.write("%PDF-1.7\n");
  denied(await editor.client.storage.from("blog-uploads").upload(`incoming/${slot.data}.pdf`, big, { contentType: "application/pdf" }), "21 MB upload (storage limit)");
  denied(await editor.client.rpc("blog_begin_upload", { p_post_id: postId, p_filename: "big.pdf", p_size: 21 * 1024 * 1024 }), "declared size");
  denied(await editor.client.rpc("blog_begin_upload", { p_post_id: postId, p_filename: "story.html", p_size: 10 }), "wrong extension");
});

test("invalid, disguised, damaged and prohibited PDFs are rejected; the published PDF stays", async () => {
  const cases = [
    [JS_PDF, /JavaScript/],
    [ENCRYPTED_PDF, /encrypted|password/],
    [ATTACHMENT_PDF, /attached files/],
    [HTML_AS_PDF, /not a PDF/],
    [DAMAGED_PDF, /incomplete|damaged/],
  ];

  for (const [bytes, reason] of cases) {
    const up = await uploadPdf(otherEditor, postId, bytes, "replacement.pdf");
    assert.equal(up.status, 422, `${reason}: ${JSON.stringify(up.body)}`);
    assert.match(up.body.error, reason);
    assert.equal(uploadState(up.uploadId), "rejected");
    assert.equal((await publicFileStatus(up.uploadId)).signed, false, "rejected file never public");
  }

  assert.equal(postPdf(postId), firstUpload, "post still uses its validated PDF");
  assert.equal((await publicFileStatus(firstUpload)).status, 200, "published PDF still served");
});

test("changed IDs and repeated or direct calls don't bypass validation", async () => {
  const { data: slot } = await editor.client.rpc("blog_begin_upload", { p_post_id: postId, p_filename: "x.pdf", p_size: VALID_PDF.length });
  await editor.client.storage.from("blog-uploads").upload(`incoming/${slot}.pdf`, VALID_PDF, { contentType: "application/pdf" });
  assert.equal((await callUpload(await otherEditor.token(), slot)).status, 400, "another editor's upload");
  assert.equal((await callUpload(await editor.token(), crypto.randomUUID())).status, 400, "unknown upload id");
  assert.equal((await callUpload(await editor.token(), "../../etc")).status, 400, "malformed id");
  const first = await callUpload(await editor.token(), slot);
  assert.equal(first.status, 200);
  assert.equal((await callUpload(await editor.token(), slot)).status, 400, "same upload twice");
  denied(await editor.client.rpc("blog_update_post", { p_id: crypto.randomUUID(), p_title: "x" }), "unknown post id");
  denied(await editor.client.rpc("blog_begin_upload", { p_post_id: crypto.randomUUID(), p_filename: "a.pdf", p_size: 10 }), "upload slot for unknown post");
  firstUpload = slot; // now the post's PDF
});

let secondUpload;

test("a valid replacement swaps in one step and retires the old file", async () => {
  assert.equal((await publicFileStatus(firstUpload)).status, 200, "old file live until replaced");
  const up = await uploadPdf(otherEditor, postId, VALID_PDF, "new version.pdf");
  assert.equal(up.status, 200);
  secondUpload = up.uploadId;
  assert.equal(postPdf(postId), secondUpload);
  assert.equal((await publicFileStatus(secondUpload)).status, 200, "new file live");
  assert.equal((await publicFileStatus(firstUpload)).signed, false, "old file no longer public");
  assert.equal(uploadState(firstUpload), "superseded");
});

test("unpublishing blocks new access; already-issued signed links last until expiry", async () => {
  const issued = await anon.storage.from("blog-files").createSignedUrl(`${secondUpload}.pdf`, 60);
  assert.ifError(issued.error);
  assert.ifError((await editor.client.rpc("blog_set_published", { p_id: postId, p_published: false })).error);
  assert.equal((await publicFileStatus(secondUpload)).signed, false, "no new links after unpublish");
  assert.ok(!(await anon.rpc("blog_list_published")).data.some((p) => p.id === postId));
  const stale = await fetch(issued.data.signedUrl);
  console.log(`  signed link issued before unpublish -> HTTP ${stale.status} (works until it expires; the site issues 10-minute links)`);
  assert.ifError((await editor.client.rpc("blog_set_published", { p_id: postId, p_published: true })).error);
});

test("cleanup (run after uploads) deletes only files that are no longer in use", async () => {
  sql(`update public.blog_uploads set superseded_at = now() - interval '2 days', processed_at = now() - interval '2 days', created_at = now() - interval '2 days'
       where post_id = '${postId}' and status <> 'attached';`);
  const other = await editor.client.rpc("blog_create_post", { p_title: "trigger cleanup" });
  assert.equal((await uploadPdf(editor, other.data, VALID_PDF)).status, 200);
  assert.equal(uploadState(firstUpload), "deleted");
  assert.equal(uploadState(secondUpload), "attached");
  assert.equal((await publicFileStatus(secondUpload)).status, 200, "current PDF survives cleanup");
  assert.equal((await admin.storage.from("blog-files").list("", { search: firstUpload })).data.length, 0, "old file deleted from storage");
  await editor.client.rpc("blog_delete_post", { p_id: other.data });
});

test("deleting a post removes it and its PDF from public view, with an audit entry", async () => {
  const issued = await anon.storage.from("blog-files").createSignedUrl(`${secondUpload}.pdf`, 60);
  assert.ifError(issued.error);
  assert.ifError((await editor.client.rpc("blog_delete_post", { p_id: postId })).error);
  assert.ok(!(await anon.rpc("blog_list_published")).data.some((p) => p.id === postId));
  assert.equal((await publicFileStatus(secondUpload)).signed, false, "no new links after delete");
  assert.equal(uploadState(secondUpload), "superseded", "file queued for cleanup");

  const actions = sql(`select string_agg(action || ':' || coalesce(actor_email, 'server'), ',' order by id) from public.blog_audit_log where post_id = '${postId}'`);
  for (const expected of [`created:${editor.email}`, "upload_approved:server", "pdf_attached:server", `published:${editor.email}`,
    "upload_rejected:server", "pdf_replaced:server", `unpublished:${editor.email}`, `deleted:${editor.email}`]) {
    assert.ok(actions.includes(expected), `audit missing ${expected}: ${actions}`);
  }
  assert.equal(sql(`select count(*) from public.blog_audit_log where post_id = '${postId}' and action = 'pdf_replaced' and details->>'uploaded_by' = '${otherEditor.id}'`), "1", "records who uploaded the replacement");
});

test("removing an editor revokes access immediately", async () => {
  const { data: slot } = await otherEditor.client.rpc("blog_begin_upload", {
    p_post_id: (await otherEditor.client.rpc("blog_create_post", { p_title: "before revoke" })).data, p_filename: "a.pdf", p_size: VALID_PDF.length,
  });
  await otherEditor.client.storage.from("blog-uploads").upload(`incoming/${slot}.pdf`, VALID_PDF, { contentType: "application/pdf" });
  sql(`delete from private.blog_editors where user_id = '${otherEditor.id}';`);
  denied(await otherEditor.client.rpc("blog_create_post", { p_title: "after revoke" }), "create");
  assert.deepEqual((await otherEditor.client.from("blog_posts").select("id")).data, [], "can't read drafts");
  assert.equal((await callUpload(await otherEditor.token(), slot)).status, 403, "can't finish a pending upload");
});

test("rate limit on upload slots", async () => {
  const created = await editor.client.rpc("blog_create_post", { p_title: "rate" });
  let refused = null;
  for (let i = 0; i < 40 && !refused; i += 1) {
    const r = await editor.client.rpc("blog_begin_upload", { p_post_id: created.data, p_filename: "a.pdf", p_size: 10 });
    if (r.error) refused = r.error.message;
  }
  assert.match(refused || "", /Too many uploads/);
  await editor.client.rpc("blog_delete_post", { p_id: created.data });
});
