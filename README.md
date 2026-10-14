# Deepmagnam Integrated Solutions website

Marketing site for Deepmagnam Integrated Solutions, a Coimbatore-based firm offering mechanical CAD/engineering design (CAD, FEA, reverse engineering, product and machine design) and software services (web, e-commerce, mobile apps, graphic design).

It's a React app, prerendered to static HTML at build time: React 18, React Router 7, Tailwind CSS 4, Motion for animation, Lucide icons, built with Vite and TypeScript. The Plus Jakarta Sans font is self-hosted from npm.

Pages: Home, About, Services, Portfolio, Technologies, Process, Testimonials, Contact, plus a 404 page. Home ships in the main bundle; every other page is a separate chunk loaded on first visit.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev       # dev server with hot reload, http://localhost:5173
```

## Build

```bash
npm run build     # type-checks (tsc), builds to dist/, then prerenders every page
npm run preview   # serves dist/ locally, http://localhost:4173
```

`dist/` is a fully static site; any static host works. Each page is its own HTML file (`index.html`, `about.html`, …, plus `404.html`) with that page's content, title, description, canonical URL and share tags, so crawlers and link previews don't need to run JavaScript. In the browser, React then hydrates the page and it behaves as a normal single-page app.

How the prerender works: `vite build --ssr` bundles `src/entry-server.tsx`, and `scripts/prerender.mjs` renders each page with it into the built `index.html`. The list of pages comes from `src/config/pageMeta.ts`; a new page needs an entry there (and in `public/sitemap.xml`).

## Deploy

The host must serve `about.html` for `/about` (and so on), and `404.html` with a 404 status for any other path. Both configs are already in the repo:

- **Vercel:** `vercel.json` (`cleanUrls`, `trailingSlash: false`; Vercel serves `404.html` for unknown paths on its own). Import the repo; the defaults (build `npm run build`, output `dist`) are correct.
- **Netlify:** `public/_redirects` (copied into `dist/`; Netlify already serves `about.html` at `/about`). Build command `npm run build`, publish directory `dist`.

For any other host, set up the equivalent "clean URLs" and "404.html for everything else" rules. Don't fall back to `index.html`: that's the prerendered home page.

## What to update before going live

### Domain (`SITE_URL`)

The domain is `https://www.deepmagnam.in`. If it changes, update all of these:

- `src/config/site.ts`: `SITE_URL` (used for canonical URLs and share tags on each page)
- `index.html`: canonical link, `og:url`, `og:image`, `twitter:image` and the JSON-LD block
- `public/robots.txt`: the `Sitemap:` line
- `public/sitemap.xml`: every `<loc>`

### Contact details and social links

All in `src/config/site.ts`:

- `CONTACT`: email, `phones` (a list; each has a display format, digits only for the `tel:` and WhatsApp links, and a `whatsapp` flag) and address. The Contact page and the footer both read from here and list every number; single CTAs such as "Call Us Now" use the first one.
- `SOCIAL`: Instagram, LinkedIn and YouTube URLs.

The address, phones, email and social URLs also appear in the JSON-LD block in `index.html` (`address`, `contactPoint`, `email`, `sameAs`).

### Site name, title and description

`src/config/site.ts`: `SITE_NAME`, `SITE_TITLE` and `SITE_DESCRIPTION`. The static copies in `index.html` (`<title>`, meta description, Open Graph and Twitter tags, JSON-LD) should match. The prerender fills in each page's own title, description, canonical URL and `og:url` from those tags, so they must stay in `index.html`.

Each page's title and description are in `src/config/pageMeta.ts`.

### Placeholder content

Portfolio projects, team members, testimonials and some photos are sample content (see `src/app/data/mockData.ts` and the page files in `src/app/pages/`). The Unsplash photos are hot-linked and meant to be replaced with real ones.

## Project layout

```
index.html                 static meta tags, JSON-LD
public/                    favicons, OG image, robots.txt, sitemap.xml, _redirects
src/config/site.ts         site URL, name, title, description, contact details
src/config/pageMeta.ts     each page's title and description; the pages to prerender
src/entry-server.tsx       prerender: renders a page into the built index.html
scripts/prerender.mjs      prerender: writes dist/<page>.html for every page
src/app/routes.tsx         routes (lazy-loaded pages)
src/app/components/        nav, footer, layout
src/app/pages/             one file per page
src/app/data/              portfolio and services content
src/imports/               logo and hero images (WebP)
src/styles/                Tailwind setup and theme
vite.config.ts             Vite config, plus the Home hero-image preload
```
