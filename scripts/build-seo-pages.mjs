// Runs after `vite build` (see the "build" script in package.json).
//
// Vite produces a single dist/index.html. This writes one HTML file per page
// listed in src/seo/pages.js (dist/lodging.html, dist/new/<slug>.html, ...)
// with that page's title, description, canonical URL, link-preview tags, and
// structured data already in the <head>, so crawlers and link-preview bots
// that don't run JavaScript see the right details. It also writes
// dist/404.html (served with a real 404 status by Vercel) and
// dist/sitemap.xml.
//
// vercel.json's "cleanUrls" serves dist/lodging.html at /lodging.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  DESKTOP_HERO_QUERY,
  MOBILE_HERO_QUERY,
  absoluteUrl,
  notFoundPage,
  routes,
} from "../src/seo/pages.js";
import { getHeadTags, getStructuredData } from "../src/seo/head.js";

const DIST = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const GENERIC_TITLE = /\s*<title data-static-head>[^<]*<\/title>/;
const HEAD_ANCHOR = /(<meta name="viewport"[^>]*>)/;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function attributes(attrs = {}) {
  return Object.entries(attrs)
    .map(([name, value]) => ` ${name}="${escapeHtml(value)}"`)
    .join("");
}

// data-static-head marks tags that src/main.jsx removes once React renders
// its own copies, so the live page never has duplicates.
function renderTag({ tag, attrs, text }) {
  return text === undefined
    ? `<${tag} data-static-head${attributes(attrs)} />`
    : `<${tag} data-static-head${attributes(attrs)}>${escapeHtml(text)}</${tag}>`;
}

function renderHead(route) {
  const lines = getHeadTags(route).map(renderTag);

  if (route.hero) {
    lines.push(
      `<link rel="preload" as="image" href="${route.hero.mobile}" media="${MOBILE_HERO_QUERY}" fetchpriority="high" />`,
      `<link rel="preload" as="image" href="${route.hero.desktop}" media="${DESKTOP_HERO_QUERY}" fetchpriority="high" />`
    );
  }

  const data = getStructuredData(route);

  if (data) {
    // Escape "<" so the JSON can never close the script element early.
    const json = JSON.stringify(data).replace(/</g, "\\u003c");
    lines.push(`<script type="application/ld+json" data-static-head>${json}</script>`);
  }

  return lines.map((line) => `\n    ${line}`).join("");
}

function pageHtml(template, route) {
  return template.replace(HEAD_ANCHOR, (anchor) => anchor + renderHead(route));
}

function outputPath(path) {
  return join(DIST, path === "/" ? "index.html" : `${path.slice(1)}.html`);
}

async function write(file, contents) {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, contents);
}

function sitemap() {
  const urls = routes
    .filter((route) => !route.noindex)
    .map((route) => {
      const lastmod = route.lastmod ? `\n    <lastmod>${route.lastmod}</lastmod>` : "";
      return `  <url>\n    <loc>${absoluteUrl(route.path)}</loc>${lastmod}\n  </url>`;
    });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
}

const built = await readFile(join(DIST, "index.html"), "utf8");
const template = built.replace(GENERIC_TITLE, "");

if (template === built || !HEAD_ANCHOR.test(template)) {
  throw new Error(
    "dist/index.html doesn't have the expected <title data-static-head> or viewport tag. Was index.html changed?"
  );
}

for (const route of routes) {
  await write(outputPath(route.path), pageHtml(template, route));
}

await write(join(DIST, "404.html"), pageHtml(template, notFoundPage));
await write(join(DIST, "sitemap.xml"), sitemap());

console.log(
  `SEO pages: wrote ${routes.length} pages, 404.html, and sitemap.xml ` +
    `(${routes.filter((route) => !route.noindex).length} URLs).`
);
