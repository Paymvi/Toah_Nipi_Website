// node --test tests/pdf-check.test.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { deflateSync } from "node:zlib";
import { checkPdf, MAX_PDF_BYTES } from "../api/_lib/pdf-check.js";

const pdf = { filename: "story.pdf", mimeType: "application/pdf" };
const file = (path) => new Uint8Array(readFileSync(new URL(path, import.meta.url)));

// Minimal hand-built PDF with a correct xref table.
function buildPdf(objects) {
  let out = "%PDF-1.7\n";
  const offsets = objects.map((body, i) => {
    const offset = out.length;
    out += `${i + 1} 0 obj\n${body}\nendobj\n`;
    return offset;
  });
  const xref = out.length;
  out += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  out += offsets.map((o) => `${String(o).padStart(10, "0")} 00000 n \n`).join("");
  out += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return new Uint8Array(Buffer.from(out, "latin1"));
}

const page = (catalogExtra = "", pageExtra = "", more = []) =>
  buildPdf([
    `<< /Type /Catalog /Pages 2 0 R ${catalogExtra} >>`,
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 200 200] ${pageExtra} >>`,
    ...more,
  ]);

const rejected = async (bytes, pattern, declared = pdf) => {
  const result = await checkPdf(bytes, declared);
  assert.equal(result.ok, false, `expected rejection, got ${JSON.stringify(result)}`);
  assert.match(result.reason, pattern);
};

test("accepts a simple valid PDF", async () => {
  const result = await checkPdf(page(), pdf);
  assert.equal(result.ok, true);
  assert.equal(result.pageCount, 1);
  assert.match(result.sha256, /^[0-9a-f]{64}$/);
});

test("accepts the site's existing blog PDFs", async () => {
  for (const name of ["Family_Camp_2026.pdf", "Officially-Fall-at-Toah-Nipi.pdf"]) {
    const result = await checkPdf(file(`../public/Blog/${name}`), pdf);
    assert.equal(result.ok, true, `${name}: ${result.reason}`);
  }
});

test("accepts a pypdf-generated PDF", async () => {
  assert.equal((await checkPdf(file("./fixtures/blank-valid.pdf"), pdf)).ok, true);
});

test("rejects wrong extension, MIME type, empty and oversized files", async () => {
  await rejected(page(), /\.pdf/, { filename: "story.html", mimeType: "application/pdf" });
  await rejected(page(), /PDF files/, { filename: "story.pdf", mimeType: "text/html" });
  await rejected(new Uint8Array(0), /empty/);
  await rejected(new Uint8Array(MAX_PDF_BYTES + 1), /20 MB/);
});

test("rejects disguised and damaged files", async () => {
  await rejected(new Uint8Array(Buffer.from("<html><script>alert(1)</script></html>")), /not a PDF/);
  await rejected(new Uint8Array(Buffer.from("%PDF-1.7\nnot really a pdf\n%%EOF\n")), /damaged|not a valid/);
  await rejected(page().slice(0, 200), /incomplete|damaged/);
});

test("rejects JavaScript, including escaped and compressed names", async () => {
  await rejected(file("./fixtures/javascript.pdf"), /JavaScript/);
  await rejected(page("/OpenAction << /S /JavaScript /JS (app.alert(1)) >>"), /JavaScript/);
  await rejected(page("/OpenAction << /S /J#61vaScript /J#53 (app.alert(1)) >>"), /JavaScript/);

  const hidden = deflateSync(Buffer.from("5 0 << /S /JavaScript /JS (app.alert(1)) >>"));
  const objStm = `<< /Type /ObjStm /N 1 /First 4 /Filter /FlateDecode /Length ${hidden.length} >>\nstream\n${hidden.toString("latin1")}\nendstream`;
  await rejected(page("", "", [objStm]), /JavaScript/);
});

test("rejects launch actions and non-web links", async () => {
  await rejected(
    page("", "/Annots [<< /Type /Annot /Subtype /Link /Rect [0 0 10 10] /A << /S /Launch /F (calc.exe) >> >>]"),
    /launch/
  );
  await rejected(
    page("", "/Annots [<< /Type /Annot /Subtype /Link /Rect [0 0 10 10] /A << /S /URI /URI (file:///etc/passwd) >> >>]"),
    /link/
  );
});

test("accepts ordinary web links", async () => {
  const result = await checkPdf(
    page("", "/Annots [<< /Type /Annot /Subtype /Link /Rect [0 0 10 10] /A << /S /URI /URI (https://toahnipi.org) >> >>]"),
    pdf
  );
  assert.equal(result.ok, true, result.reason);
});

test("rejects attachments", async () => {
  await rejected(file("./fixtures/attachment.pdf"), /attached files/);
});

test("rejects encrypted PDFs, with or without an open password", async () => {
  await rejected(file("./fixtures/encrypted-password.pdf"), /encrypted|password/);
  await rejected(file("./fixtures/encrypted-no-open-password.pdf"), /encrypted|password/);
});
