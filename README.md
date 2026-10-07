# Deepmagnam Integrated Solutions website

Marketing site for Deepmagnam Integrated Solutions, a Coimbatore-based firm offering mechanical CAD/engineering design (CAD, FEA, reverse engineering, product and machine design) and software services (web, e-commerce, mobile apps, graphic design).

It's a single-page app: React 18, React Router 7, Tailwind CSS 4, Motion for animation, Lucide icons, built with Vite and TypeScript. The Plus Jakarta Sans font is self-hosted from npm.

Pages: Home, About, Services, Portfolio, Technologies, Process, Contact, plus a 404 page. Home ships in the main bundle; every other page is a separate chunk loaded on first visit.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev       # dev server with hot reload, http://localhost:5173
```

## Build

```bash
npm run build     # type-checks (tsc), then builds to dist/
npm run preview   # serves dist/ locally, http://localhost:4173
```

`dist/` is a fully static site; any static host works.

## Deploy

Because it's a single-page app, the host must serve `index.html` for every path (so `/about` works on a direct visit or refresh). Both configs are already in the repo:

- **Vercel:** `vercel.json` (rewrite to `/index.html`). Import the repo; the defaults (build `npm run build`, output `dist`) are correct.
- **Netlify:** `public/_redirects` (copied into `dist/`). Build command `npm run build`, publish directory `dist`.

For any other host, set up the equivalent "fallback to index.html" rule.

## What to update before going live

### Domain (`SITE_URL`)

The domain is a placeholder (`https://www.deepmagnam.com`). Change it in all of these:

- `src/config/site.ts`: `SITE_URL` (used for canonical URLs and share tags on each page)
- `index.html`: canonical link, `og:url`, `og:image`, `twitter:image` and the JSON-LD block
- `public/robots.txt`: the `Sitemap:` line
- `public/sitemap.xml`: every `<loc>`

### Contact details and social links

All in `src/config/site.ts`:

- `CONTACT`: email, phone (a display format, plus digits only for the `tel:` and WhatsApp links) and address. The Contact page and the footer both read from here.
- `SOCIAL`: LinkedIn, X, GitHub and Facebook URLs (currently `#`).

The address also appears in the JSON-LD block in `index.html` (`addressLocality` and so on).

### Site name, title and description

`src/config/site.ts`: `SITE_NAME`, `SITE_TITLE` and `SITE_DESCRIPTION`. The static copies in `index.html` (`<title>`, meta description, Open Graph and Twitter tags, JSON-LD) should match; they're what link previews and crawlers see before JavaScript runs.

### Placeholder content

Portfolio projects and some photos are sample content (see `src/app/data/mockData.ts` and the page files in `src/app/pages/`). The Unsplash photos are hot-linked and meant to be replaced with real ones.

## Project layout

```
index.html                 static meta tags, JSON-LD
public/                    favicons, OG image, robots.txt, sitemap.xml, _redirects
src/config/site.ts         site URL, name, title, description, contact details
src/app/routes.tsx         routes (lazy-loaded pages)
src/app/components/        nav, footer, layout
src/app/pages/             one file per page
src/app/data/              portfolio and services content
src/imports/               logo and hero images (WebP)
src/styles/                Tailwind setup and theme
vite.config.ts             Vite config, plus the Home hero-image preload
```
