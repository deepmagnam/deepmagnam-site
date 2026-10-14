// Last build step: writes a static HTML file per page into dist/, using the
// client build's index.html as the template and the SSR build of
// src/entry-server.tsx (in dist-ssr/) to render each page. Then checks every
// file it wrote has the page's own <title> and an <h1> no other page has.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { PRERENDER_PAGES, renderPage } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);
const template = await fs.readFile(path.join(dist, "index.html"), "utf8");

for (const page of PRERENDER_PAGES) {
  const html = await renderPage(template, page.path);
  const file = path.join(dist, page.file);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, html);
  console.log(`prerendered ${page.path} -> dist/${page.file} (${(html.length / 1024).toFixed(1)} kB)`);
}

const decode = (text) =>
  text.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").trim();
const seenH1 = new Map();
const problems = [];
for (const page of PRERENDER_PAGES) {
  const html = await fs.readFile(path.join(dist, page.file), "utf8");
  const titles = [...html.matchAll(/<title>(.*?)<\/title>/gs)].map((m) => decode(m[1]));
  const h1s = [...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gs)].map((m) => decode(m[1]));
  if (titles.length !== 1 || titles[0] !== page.title) problems.push(`${page.file}: <title> is ${JSON.stringify(titles)}, expected "${page.title}"`);
  if (h1s.length !== 1 || !h1s[0]) problems.push(`${page.file}: expected one non-empty <h1>, found ${JSON.stringify(h1s)}`);
  else if (seenH1.has(h1s[0])) problems.push(`${page.file}: same <h1> as ${seenH1.get(h1s[0])} ("${h1s[0]}")`);
  else seenH1.set(h1s[0], page.file);
}
if (problems.length) {
  console.error(`prerender check failed:\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log(`prerender check: ${PRERENDER_PAGES.length} files, each with its own <title> and <h1>`);

await fs.rm(ssrDir, { recursive: true, force: true });
