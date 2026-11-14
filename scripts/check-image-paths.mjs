// Fails the build when the code points at an image that isn't in public/.
// Also checks the variants that code derives from a path (-thumb, -md,
// -mobile), the image redirects in vercel.json, and the file-name convention
// in public/images/ (lowercase, hyphens, no spaces) so paths work on
// case-sensitive hosting.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const IMAGE = /["'(](\/[^"'()\s]+\.(?:webp|png|jpe?g|gif|svg|ico|avif))["')]/gi;
const problems = [];
const read = (file) =>
  readFileSync(file, "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "") // commented-out code isn't a reference
    .replace(/^\s*\/\/.*$/gm, "");
// (withFileTypes + recursive skips subfolders in OneDrive-synced folders)
const files = (dir) =>
  readdirSync(dir, { recursive: true })
    .map((entry) => join(dir, entry))
    .filter((file) => statSync(file).isFile());
// Exact-case lookup: Windows and macOS ignore case, production hosting doesn't.
const publicFiles = new Set(files("public").map((f) => f.slice("public".length).replaceAll("\\", "/")));
const exists = (url) => publicFiles.has(decodeURI(url));

// Code derives these variants from the main path; see the helpers in each file.
const variants = {
  [join("src", "pages", "Gallery.jsx")]: ["-thumb", "-md"],
  [join("src", "pages", "Lodging.jsx")]: ["-thumb"],
};

let count = 0;
for (const file of [...files("src"), "index.html"].filter((f) => /\.(jsx?|css|html)$/.test(f))) {
  const text = read(file);
  for (const [, url] of text.matchAll(IMAGE)) {
    count++;
    if (!exists(url)) problems.push(`${file}: ${url} not found in public/`);
    for (const suffix of variants[file] ?? []) {
      const variant = url.replace(/\.webp$/, `${suffix}.webp`);
      if (url.startsWith("/images/") && !exists(variant)) problems.push(`${file}: missing variant ${variant}`);
    }
  }
  for (const [, url] of text.matchAll(/hero\("([^"]+)"\)/g)) {
    const mobile = url.replace(/\.webp$/, "-mobile.webp");
    if (!exists(mobile)) problems.push(`${file}: missing mobile hero ${mobile}`);
  }
}

const { redirects } = JSON.parse(readFileSync("vercel.json", "utf8"));
for (const { destination } of redirects) {
  if (destination.startsWith("/images/") && !exists(destination)) {
    problems.push(`vercel.json: redirect destination ${destination} not found`);
  }
}

for (const file of files(join("public", "images"))) {
  const path = file.slice("public".length).replaceAll("\\", "/");
  if (!/^\/images\/[a-z0-9/-]+\.(webp|png|jpg)$/.test(path)) problems.push(`${path}: use lowercase letters, digits, and hyphens`);
}

if (problems.length) {
  console.error(`Image check failed:\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log(`Image check passed: ${count} image references.`);
