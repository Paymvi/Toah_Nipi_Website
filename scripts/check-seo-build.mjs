// Checks the built site in dist/ without running any JavaScript, the way a
// link-preview bot would see it. Run `npm run build` first, then
// `npm run check:seo`. Exits with an error listing every problem found.
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  SITE_URL,
  absoluteUrl,
  fullTitle,
  notFoundPage,
  previewImage,
  routes,
} from "../src/seo/pages.js";
import stories from "../src/data/stories.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const problems = [];
let checks = 0;

function check(condition, message) {
  checks += 1;
  if (!condition) problems.push(message);
}

function decode(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function headOf(html) {
  return html.slice(0, html.indexOf("</head>"));
}

function all(html, pattern) {
  return [...html.matchAll(pattern)];
}

function metaContent(head, key, name) {
  return all(head, new RegExp(`<meta[^>]*${key}="${name}"[^>]*>`, "g")).map(
    ([tag]) => decode(tag.match(/content="([^"]*)"/)?.[1] ?? "")
  );
}

function distFile(urlPath) {
  return join(DIST, decodeURIComponent(urlPath.split("#")[0]).replace(/^\//, ""));
}

function htmlFileFor(path) {
  return join(DIST, path === "/" ? "index.html" : `${path.slice(1)}.html`);
}

async function checkPage(label, file, route) {
  check(existsSync(file), `${label}: ${file} is missing`);
  if (!existsSync(file)) return;

  const head = headOf(await readFile(file, "utf8"));
  const titles = all(head, /<title[^>]*>([^<]*)<\/title>/g);
  const canonicals = all(head, /<link[^>]*rel="canonical"[^>]*href="([^"]*)"/g);
  const descriptions = metaContent(head, "name", "description");
  const robots = metaContent(head, "name", "robots");
  const ogImages = metaContent(head, "property", "og:image");

  check(titles.length === 1, `${label}: expected 1 <title>, found ${titles.length}`);
  check(
    titles[0] && decode(titles[0][1]) === fullTitle(route),
    `${label}: title is "${titles[0]?.[1]}", expected "${fullTitle(route)}"`
  );
  check(descriptions.length <= 1, `${label}: more than one description`);
  check(
    (descriptions[0] ?? undefined) === route.description,
    `${label}: description doesn't match src/seo/pages.js`
  );

  if (route.noindex) {
    check(robots.includes("noindex"), `${label}: should be noindex`);
    check(canonicals.length === 0, `${label}: noindex page shouldn't have a canonical`);
  } else {
    check(robots.length === 0, `${label}: unexpected robots tag`);
    check(canonicals.length === 1, `${label}: expected 1 canonical, found ${canonicals.length}`);
    check(
      canonicals[0]?.[1] === absoluteUrl(route.path),
      `${label}: canonical is ${canonicals[0]?.[1]}`
    );
  }

  for (const property of ["og:title", "og:type", "og:image", "twitter:card", "twitter:image"]) {
    const key = property.startsWith("og:") ? "property" : "name";
    check(
      metaContent(head, key, property).length === 1,
      `${label}: expected exactly one ${property}`
    );
  }

  const image = previewImage(route);
  check(ogImages[0] === absoluteUrl(image.src), `${label}: og:image is ${ogImages[0]}`);
  check(existsSync(distFile(image.src)), `${label}: preview image ${image.src} is missing`);

  if (route.hero) {
    for (const src of [route.hero.mobile, route.hero.desktop]) {
      check(existsSync(distFile(src)), `${label}: hero image ${src} is missing`);
      check(head.includes(`href="${src}"`), `${label}: hero ${src} isn't preloaded`);
    }
  }

  for (const [, json] of all(head, /<script type="application\/ld\+json"[^>]*>([^<]*)<\/script>/g)) {
    try {
      JSON.parse(json);
    } catch {
      problems.push(`${label}: structured data isn't valid JSON`);
    }
  }

  for (const [, src] of all(head, /<script[^>]*src="([^"]+)"/g)) {
    check(existsSync(distFile(src)), `${label}: script ${src} is missing`);
  }

  return head;
}

// Every page, story, and the 404 page.
for (const route of routes) {
  await checkPage(route.path, htmlFileFor(route.path), route);
}

await checkPage("404", join(DIST, "404.html"), notFoundPage);

const home = headOf(await readFile(join(DIST, "index.html"), "utf8"));
check(home.includes('"@type":"WebSite"'), "home: missing WebSite structured data");
check(home.includes('"@type":"LodgingBusiness"'), "home: missing organization structured data");

for (const story of stories) {
  const head = headOf(await readFile(htmlFileFor(`/new/${story.slug}`), "utf8"));
  const hasArticle = head.includes('"@type":"BlogPosting"');
  check(
    story.draft ? !hasArticle : hasArticle,
    `/new/${story.slug}: BlogPosting markup should ${story.draft ? "not " : ""}be present`
  );

  for (const src of [story.image, story.pdf].filter(Boolean)) {
    check(existsSync(distFile(src)), `/new/${story.slug}: ${src} is missing`);
  }
}

// Sitemap: exactly the indexable pages, absolute production URLs.
const sitemap = await readFile(join(DIST, "sitemap.xml"), "utf8");
const listed = all(sitemap, /<loc>([^<]+)<\/loc>/g).map(([, loc]) => loc).sort();
const indexable = routes.filter((route) => !route.noindex).map((route) => absoluteUrl(route.path)).sort();
check(JSON.stringify(listed) === JSON.stringify(indexable), "sitemap.xml doesn't match the indexable pages");
check(listed.every((loc) => loc.startsWith(`${SITE_URL}/`)), "sitemap.xml has a non-production URL");
for (const [, date] of all(sitemap, /<lastmod>([^<]+)<\/lastmod>/g)) {
  check(/^\d{4}-\d{2}-\d{2}$/.test(date), `sitemap.xml: bad lastmod ${date}`);
}

const robots = await readFile(join(DIST, "robots.txt"), "utf8");
check(robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`), "robots.txt doesn't point to the sitemap");
check(!/^Disallow:\s*\/\s*$/m.test(robots), "robots.txt blocks the whole site");

// vercel.json: real 404s, redirects that land on real pages, no loops.
const vercel = JSON.parse(await readFile(join(ROOT, "vercel.json"), "utf8"));
const routePaths = new Set(routes.map((route) => route.path));
const sources = new Set();

check(vercel.cleanUrls === true, "vercel.json: cleanUrls should be true");
check(vercel.trailingSlash === false, "vercel.json: trailingSlash should be false");
check(
  !(vercel.rewrites || []).some((rewrite) => /\(\.\*\)|:path\*/.test(rewrite.source)),
  "vercel.json: a catch-all rewrite would turn unknown URLs into 200 pages"
);

for (const redirect of vercel.redirects) {
  const key = JSON.stringify([redirect.source, redirect.has]);
  check(!sources.has(key), `vercel.json: duplicate redirect ${redirect.source}`);
  sources.add(key);

  if (redirect.has) {
    check(
      redirect.has.every((rule) => rule.type === "host" && rule.value === "toah-nipi.vercel.app"),
      `vercel.json: ${redirect.source} host rule should only match toah-nipi.vercel.app`
    );
    continue;
  }

  const target = redirect.destination.split("#")[0];
  check(redirect.permanent === true, `vercel.json: ${redirect.source} should be permanent`);
  check(!routePaths.has(redirect.source), `vercel.json: ${redirect.source} redirects a live page`);
  check(
    routePaths.has(target) || existsSync(distFile(target)),
    `vercel.json: ${redirect.source} points to ${target}, which doesn't exist`
  );
}

// Old addresses that should stay "not found" (no page, no redirect).
for (const path of ["/cart", "/search", "/imnew", "/events-calendar-234nF", "/timeline/blog-post-title-one"]) {
  check(!routePaths.has(path) && !existsSync(htmlFileFor(path)), `${path} should not have a page`);
  check(
    !vercel.redirects.some((redirect) => !redirect.has && redirect.source === path),
    `${path} should not be redirected`
  );
}

if (problems.length) {
  console.error(`SEO check failed (${problems.length} of ${checks} checks):`);
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

console.log(`SEO check passed: ${checks} checks across ${routes.length + 1} HTML files.`);
