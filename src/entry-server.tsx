// Prerender entry: built with `vite build --ssr` and run by scripts/prerender.mjs,
// which writes one static HTML file per page into dist/.
import { renderToString } from "react-dom/server";
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from "react-router";
import App from "./app/App";
import { cloneRoutes } from "./app/routes";
import { SITE_URL } from "./config/site";
import { NOT_FOUND_META, PAGE_META, pageTitle, type PageMeta } from "./config/pageMeta";

// 404.html is rendered at a path no route claims, so it gets the catch-all page.
const NOT_FOUND_PATH = "/404";

const metaFor = (path: string): PageMeta =>
  path === NOT_FOUND_PATH ? NOT_FOUND_META : PAGE_META[path as keyof typeof PAGE_META];

// dist/<route>/index.html, which Vercel serves at /<route>. `title` is what the
// file's <title> must be; scripts/prerender.mjs checks it after writing.
export const PRERENDER_PAGES = [
  ...Object.keys(PAGE_META).map((path) => ({
    path,
    file: path === "/" ? "index.html" : `${path.slice(1)}/index.html`,
    title: pageTitle(metaFor(path).title),
  })),
  { path: NOT_FOUND_PATH, file: "404.html", title: pageTitle(NOT_FOUND_META.title) },
];

const escapeAttr = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Every tag must be in index.html; a missing one fails the build rather than
// silently shipping the home page's tags.
function replaceTag(html: string, pattern: RegExp, replacement: string) {
  if (!pattern.test(html)) throw new Error(`prerender: index.html has no match for ${pattern}`);
  // A function, so "$" in page content isn't read as a replacement pattern.
  return html.replace(pattern, () => replacement);
}

function setMeta(html: string, attr: "name" | "property", key: string, content: string) {
  return replaceTag(
    html,
    new RegExp(`<meta ${attr}="${key}" content="[^"]*" />`),
    `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`,
  );
}

function renderHead(template: string, path: string) {
  const isNotFound = path === NOT_FOUND_PATH;
  const meta = metaFor(path);
  const title = escapeAttr(pageTitle(meta.title));
  const url = SITE_URL + path;

  let html = replaceTag(template, /<title>[^<]*<\/title>/, `<title>${title}</title>`);
  html = setMeta(html, "name", "description", meta.description);
  html = setMeta(html, "property", "og:title", pageTitle(meta.title));
  html = setMeta(html, "property", "og:description", meta.description);
  html = setMeta(html, "name", "twitter:title", pageTitle(meta.title));
  html = setMeta(html, "name", "twitter:description", meta.description);

  const canonical = /<link rel="canonical" href="[^"]*" \/>/;
  const ogUrl = /<meta property="og:url" content="[^"]*" \/>/;
  if (isNotFound) {
    // Served for any unknown URL, so there's no single canonical URL.
    html = replaceTag(html, canonical, `<meta name="robots" content="noindex" />`);
    html = replaceTag(html, ogUrl, "");
  } else {
    html = replaceTag(html, canonical, `<link rel="canonical" href="${escapeAttr(url)}" />`);
    html = replaceTag(html, ogUrl, `<meta property="og:url" content="${escapeAttr(url)}" />`);
  }
  return html;
}

async function renderApp(path: string) {
  const handler = createStaticHandler(cloneRoutes());
  const context = await handler.query(new Request(SITE_URL + path));
  if (context instanceof Response) throw new Error(`prerender: ${path} returned a redirect`);
  if (context.errors) throw new Error(`prerender: ${path} failed: ${JSON.stringify(context.errors)}`);

  const router = createStaticRouter(handler.dataRoutes, context);
  // hydrate={false}: no route has a loader, so there's no data to hand over.
  return renderToString(
    <App>
      <StaticRouterProvider router={router} context={context} hydrate={false} />
    </App>,
  );
}

/** The built index.html, filled in with `path`'s head tags and rendered page. */
export async function renderPage(template: string, path: string) {
  const appHtml = await renderApp(path);
  return replaceTag(renderHead(template, path), /<div id="root"><\/div>/, `<div id="root">${appHtml}</div>`);
}
