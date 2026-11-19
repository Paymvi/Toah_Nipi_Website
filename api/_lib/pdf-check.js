// Server-side checks for uploaded blog PDFs. Every upload is untrusted.
//
// Passing these checks means the file parsed as a PDF and none of the active
// content these checks know about was found. This is NOT antivirus scanning
// and does not prove the file is harmless.
import { createHash } from "node:crypto";
import { inflateSync } from "node:zlib";
// Loading the worker on the main thread lets pdf.js run in Node without a
// worker file, and makes the bundler include it in the function.
import * as pdfjsWorker from "pdfjs-dist/legacy/build/pdf.worker.mjs";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

globalThis.pdfjsWorker = pdfjsWorker;

export const MAX_PDF_BYTES = 20 * 1024 * 1024; // keep in sync with the bucket limit and blog_begin_upload
const MAX_PAGES = 300;
const MAX_INFLATED_BYTES = 50 * 1024 * 1024;

// PDF names that mean scripts, launching programs, embedded files, forms that
// submit data, or remote content.
const FORBIDDEN_NAMES = new Map([
  ["JavaScript", "contains JavaScript"],
  ["JS", "contains JavaScript"],
  ["Launch", "tries to launch other programs"],
  ["EmbeddedFile", "contains attached files"],
  ["EmbeddedFiles", "contains attached files"],
  ["FileAttachment", "contains attached files"],
  ["RichMedia", "contains embedded media or Flash"],
  ["XFA", "contains an XFA form"],
  ["SubmitForm", "contains a form that sends data"],
  ["ImportData", "contains a form that loads data"],
  ["GoToR", "links to other files"],
  ["GoToE", "links to embedded files"],
  ["Encrypt", "is encrypted or password-protected"],
]);

const SAFE_LINK = /^(https?:|mailto:)/i;

const reject = (reason) => ({ ok: false, reason: `This PDF ${reason}.` });

// Find /Name tokens, decoding #xx escapes so /J#53 can't hide /JS.
function findForbiddenName(text) {
  for (const [, raw] of text.matchAll(/\/([^\s/<>[\]()%{}]+)/g)) {
    let name = raw;

    if (name.includes("#")) {
      name = name.replace(/#([0-9a-fA-F]{2})/g, (_, hex) =>
        String.fromCharCode(parseInt(hex, 16))
      );
    }

    if (FORBIDDEN_NAMES.has(name)) {
      return FORBIDDEN_NAMES.get(name);
    }
  }

  return null;
}

// Objects can be hidden inside compressed object streams, so inflate those
// (and only those: images and fonts can't carry actions) before scanning.
function inflateObjectStreams(text) {
  const parts = [];
  let budget = MAX_INFLATED_BYTES;
  let position = 0;

  for (;;) {
    const start = text.indexOf("stream", position);

    if (start === -1) {
      return parts;
    }

    position = start + 6;

    if (text.slice(start - 3, start) === "end") {
      continue;
    }

    const dict = text.slice(Math.max(0, start - 1024), start);
    const dictStart = dict.lastIndexOf("obj");
    const header = dictStart === -1 ? dict : dict.slice(dictStart);

    if (!/\/Type\s*\/ObjStm/.test(header.replace(/#([0-9a-fA-F]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16))))) {
      continue;
    }

    const dataStart = text[position] === "\r" ? position + 2 : position + 1;
    const end = text.indexOf("endstream", dataStart);

    if (end === -1) {
      throw new Error("unterminated stream");
    }

    if (!/\/FlateDecode/.test(header)) {
      // Object streams with other filters can't be inspected here.
      if (/\/Filter/.test(header)) {
        throw new Error("unsupported object stream filter");
      }

      parts.push(text.slice(dataStart, end));
      continue;
    }

    let inflated;

    try {
      inflated = inflateSync(Buffer.from(text.slice(dataStart, end), "latin1"), {
        maxOutputLength: budget,
      });
    } catch (error) {
      if (error.code === "ERR_BUFFER_TOO_LARGE" || error instanceof RangeError) {
        throw new Error("object streams too large", { cause: error });
      }

      // Damaged compressed data: pdf.js decides below whether the file is usable.
      continue;
    }

    budget -= inflated.length;
    parts.push(inflated.toString("latin1"));
    position = end + 9;
  }
}

/**
 * @param {Uint8Array} bytes
 * @param {{ filename: string, mimeType: string }} declared
 * @returns {Promise<{ ok: true, pageCount: number, sha256: string } | { ok: false, reason: string }>}
 */
export async function checkPdf(bytes, { filename, mimeType }) {
  if (!/\.pdf$/i.test(filename || "")) {
    return { ok: false, reason: "Only files ending in .pdf can be uploaded." };
  }

  if ((mimeType || "").split(";")[0].trim().toLowerCase() !== "application/pdf") {
    return { ok: false, reason: "Only PDF files can be uploaded." };
  }

  if (bytes.length === 0) {
    return { ok: false, reason: "The file is empty." };
  }

  if (bytes.length > MAX_PDF_BYTES) {
    return { ok: false, reason: "PDFs must be 20 MB or smaller." };
  }

  const text = Buffer.from(bytes.buffer, bytes.byteOffset, bytes.length).toString("latin1");

  if (!/^%PDF-(1\.[0-7]|2\.0)/.test(text)) {
    return { ok: false, reason: "This file is not a PDF." };
  }

  if (!text.slice(-2048).includes("%%EOF")) {
    return { ok: false, reason: "This PDF looks incomplete or damaged. Please export it again." };
  }

  let found = findForbiddenName(text);

  if (!found) {
    try {
      for (const part of inflateObjectStreams(text)) {
        found = findForbiddenName(part);

        if (found) {
          break;
        }
      }
    } catch {
      return { ok: false, reason: "This PDF is too complex to check safely. Please export it again as a standard PDF." };
    }
  }

  if (found) {
    return reject(found);
  }

  // Structural parse with pdf.js (maintained by Mozilla).
  let pdf;

  try {
    pdf = await getDocument({
      data: new Uint8Array(bytes), // pdf.js takes ownership of the buffer
      stopAtErrors: true,
      isEvalSupported: false,
      disableFontFace: true,
      useSystemFonts: false,
      verbosity: 0,
    }).promise;
  } catch (error) {
    if (error?.name === "PasswordException") {
      return reject("is password-protected");
    }

    return { ok: false, reason: "This PDF is damaged or not a valid PDF. Please export it again." };
  }

  try {
    if (pdf.numPages < 1 || pdf.numPages > MAX_PAGES) {
      return { ok: false, reason: `PDFs must have between 1 and ${MAX_PAGES} pages.` };
    }

    const { info } = await pdf.getMetadata();

    if (info?.EncryptFilterName) return reject("is encrypted or password-protected");
    if (info?.IsXFAPresent) return reject("contains an XFA form");
    if (info?.IsCollectionPresent) return reject("is a PDF portfolio");

    const attachments = await pdf.getAttachments();

    if (attachments && Object.keys(attachments).length > 0) {
      return reject("contains attached files");
    }

    if ((await pdf.hasJSActions()) || (await pdf.getJSActions())) {
      return reject("contains JavaScript");
    }

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);

      for (const annotation of await page.getAnnotations()) {
        if (annotation.attachment || annotation.annotationType === 17) {
          return reject("contains attached files");
        }

        if (annotation.actions && Object.keys(annotation.actions).length > 0) {
          return reject("contains JavaScript");
        }

        if (annotation.unsafeUrl && !SAFE_LINK.test(annotation.unsafeUrl)) {
          return reject("contains a link that is not a web or email address");
        }
      }
    }

    return {
      ok: true,
      pageCount: pdf.numPages,
      sha256: createHash("sha256").update(bytes).digest("hex"),
    };
  } catch {
    return { ok: false, reason: "This PDF is damaged or not a valid PDF. Please export it again." };
  } finally {
    await pdf.destroy();
  }
}
