// POST /api/blog-process-upload  { uploadId }
// Authorization: Bearer <editor's Supabase access token>
//
// Checks a PDF an editor just put in the private quarantine bucket. Only a
// file that passes the structural checks (./_lib/pdf-check.js) is copied to
// the blog-files bucket and attached to its post, in one database
// transaction. This is validation, NOT antivirus scanning.
//
// SUPABASE_SERVICE_ROLE_KEY is server-only: it never leaves this function and
// is never logged or returned.
import { createClient } from "@supabase/supabase-js";
import { checkPdf } from "./_lib/pdf-check.js";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const clientOptions = { auth: { persistSession: false, autoRefreshToken: false } };

const reply = (status, body) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request) {
  const url = process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !anonKey || !serviceKey) {
    return reply(500, { error: "Blog uploads are not configured on the server." });
  }

  const token = /^Bearer (\S+)$/.exec(request.headers.get("authorization") || "")?.[1];

  if (!token) {
    return reply(401, { error: "Please sign in again." });
  }

  const uploadId = await request.json().then((body) => body?.uploadId, () => null);

  if (typeof uploadId !== "string" || !UUID.test(uploadId)) {
    return reply(400, { error: "Invalid upload." });
  }

  // The database checks the token, editor membership and that this editor
  // owns this pending upload, and marks it as processing (once).
  const asEditor = createClient(url, anonKey, {
    ...clientOptions,
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  const { data: claimed, error: claimError } = await asEditor.rpc("blog_claim_upload", {
    p_upload_id: uploadId,
  });

  if (claimError || !claimed?.length) {
    const status = claimError?.code === "42501" || claimError?.code === "PGRST301" ? 403 : 400;
    return reply(status, { error: claimError?.message || "Upload not found." });
  }

  const { original_filename: filename } = claimed[0];
  const admin = createClient(url, serviceKey, clientOptions);
  const quarantinePath = `incoming/${uploadId}.pdf`;
  let verdict;
  let facts = {};

  try {
    const { data: blob, error } = await admin.storage.from("blog-uploads").download(quarantinePath);

    if (error || !blob) {
      verdict = { ok: false, reason: "The file did not finish uploading. Please try again." };
    } else {
      const bytes = new Uint8Array(await blob.arrayBuffer());
      facts = { byteSize: bytes.length };
      verdict = await checkPdf(bytes, { filename, mimeType: blob.type });

      if (verdict.ok) {
        facts = { ...facts, sha256: verdict.sha256, pageCount: verdict.pageCount };
        const { error: copyError } = await admin.storage
          .from("blog-files")
          .upload(`${uploadId}.pdf`, bytes, { contentType: "application/pdf", cacheControl: "300", upsert: false });

        if (copyError) {
          console.error("blog upload: could not store validated file:", copyError.message);
          verdict = { ok: false, reason: "The PDF passed checks but could not be saved. Please try again." };
        }
      }
    }
  } catch (error) {
    console.error("blog upload: processing failed:", error?.message);
    verdict = { ok: false, reason: "The PDF could not be checked. Please try again." };
  }

  // The quarantine copy is never needed again.
  await admin.storage.from("blog-uploads").remove([quarantinePath]).catch(() => {});

  // Records the result; a valid PDF replaces the post's PDF in the same
  // transaction, so the previous PDF stays live until this succeeds.
  const { error: finishError } = await admin.rpc("blog_finish_upload", {
    p_upload_id: uploadId,
    p_ok: verdict.ok,
    p_reason: verdict.ok ? null : verdict.reason,
    p_byte_size: facts.byteSize ?? null,
    p_sha256: facts.sha256 ?? null,
    p_page_count: facts.pageCount ?? null,
    p_scan_result: null,
  });

  if (finishError) {
    // Usually a missing, revoked or wrong SUPABASE_SERVICE_ROLE_KEY (never logged).
    console.error("blog upload: could not record result (check SUPABASE_SERVICE_ROLE_KEY):", finishError.message);
    return reply(500, { error: "The PDF could not be saved. Please try again." });
  }

  await cleanUpOldFiles(admin);

  return verdict.ok
    ? reply(200, { ok: true, pageCount: facts.pageCount })
    : reply(422, { error: verdict.reason });
}

// Best effort, piggybacking on uploads instead of a cron job: deletes files
// that are no longer used (rejected, abandoned, replaced, or of deleted
// posts) once they are over a day old. Never a post's current PDF.
async function cleanUpOldFiles(admin) {
  try {
    const { data: rows, error } = await admin.rpc("blog_claim_cleanup");
    const ids = error ? [] : rows.map((row) => row.id);
    if (!ids.length) return;

    // A file is in one of the two buckets; removing a missing one is a no-op.
    const [quarantine, approved] = await Promise.all([
      admin.storage.from("blog-uploads").remove(ids.map((id) => `incoming/${id}.pdf`)),
      admin.storage.from("blog-files").remove(ids.map((id) => `${id}.pdf`)),
    ]);

    // On failure rows stay 'deleting' and are retried after the next upload.
    if (!quarantine.error && !approved.error) {
      await admin.rpc("blog_mark_deleted", { p_ids: ids });
    }
  } catch (error) {
    console.error("blog upload: cleanup skipped:", error?.message);
  }
}
