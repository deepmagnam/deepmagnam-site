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
npm test          # Vitest
npm run lint      # ESLint
npm run preview   # serves dist/ locally, http://localhost:4173
```

`dist/` is a fully static site; any static host works. Each page is its own HTML file (`index.html`, `about.html`, …, plus `404.html`) with that page's content, title, description, canonical URL and share tags, so crawlers and link previews don't need to run JavaScript. In the browser, React then hydrates the page and it behaves as a normal single-page app.

How the prerender works: `vite build --ssr` bundles `src/entry-server.tsx`, and `scripts/prerender.mjs` renders each page with it into the built `index.html`. The list of pages comes from `src/config/pageMeta.ts`; a new page needs an entry there (and in `public/sitemap.xml`).

## Deploy

The host must serve `about.html` for `/about` (and so on), and `404.html` with a 404 status for any other path. Both configs are already in the repo:

- **Vercel:** `vercel.json` (`cleanUrls`, `trailingSlash: false`; Vercel serves `404.html` for unknown paths on its own). Import the repo; the defaults (build `npm run build`, output `dist`) are correct.
- **Netlify:** `public/_redirects` (copied into `dist/`; Netlify already serves `about.html` at `/about`). Build command `npm run build`, publish directory `dist`.

For any other host, set up the equivalent "clean URLs" and "404.html for everything else" rules. Don't fall back to `index.html`: that's the prerendered home page.

## Content editing (CMS)

Testimonials are managed with [Decap CMS](https://decapcms.org) at `/admin`. Editors log in with GitHub; every change is a commit to this repo, and Vercel redeploys the site. The editor guide is [docs/editing-testimonials.md](docs/editing-testimonials.md).

How it fits together:

- **Content:** one JSON file per testimonial in `content/testimonials/`. Uploaded photos go to `content/media/testimonials/`.
- **Build:** `vite/content-plugin.ts` reads, validates and sorts the published entries into the virtual module `virtual:content/testimonials`, which the Testimonials page imports, so they're in the prerendered HTML. Photos are cropped and converted to 64/128/192 px WebP (metadata such as GPS is removed); the originals are never deployed. Invalid content stops the build with a list of what's wrong. That includes a published testimonial without the client's consent, which the CMS also refuses to save.
- **Admin:** `public/admin/index.html` (Decap is loaded from unpkg at a pinned version with an integrity hash, so it isn't part of the site's bundle) and `public/admin/config.yml`. `/admin` is `noindex`, isn't in the sitemap and isn't prerendered.
- **Login:** `api/auth.ts` and `api/callback.ts` are Vercel functions that do the GitHub OAuth exchange. They need two environment variables (below). Login only works on Vercel (or `vercel dev`), not on Netlify.
- **Editorial workflow:** a new or edited entry is a draft on its own branch (and pull request) until someone publishes it in the CMS's Workflow tab. Vercel builds a preview of each of those branches; log in to the CMS on the production address, though, because the OAuth callback URL is fixed.

### One-time setup: GitHub OAuth app and Vercel variables

1. On GitHub, signed in as the repo owner, open **Settings → Developer settings → OAuth Apps → New OAuth App** (<https://github.com/settings/applications/new>).
2. Fill in:
   - **Application name:** `Deepmagnam CMS`
   - **Homepage URL:** `https://<project>.vercel.app` (your Vercel production address)
   - **Authorization callback URL:** `https://<project>.vercel.app/api/callback`
   - Leave **Enable Device Flow** unticked.
3. Click **Register application**. Copy the **Client ID**. Click **Generate a new client secret** and copy it now; GitHub shows it only once.
4. In Vercel, open the project, then **Settings → Environment Variables**, and add both for the **Production** environment:
   - `GITHUB_OAUTH_CLIENT_ID` = the Client ID
   - `GITHUB_OAUTH_CLIENT_SECRET` = the client secret (tick **Sensitive**)

   Don't put either value in the repo or in a `.env` file that's committed.
5. Redeploy so the variables take effect: **Deployments**, then the latest production deployment, then **⋯ → Redeploy**.
6. Give each editor access: on GitHub, **repo Settings → Collaborators → Add people**, with write access. Editors need their own GitHub account.
7. Check it: open `https://<project>.vercel.app/admin` and click **Login with GitHub**. The first time, GitHub asks you to authorize the app.

The token GitHub issues has the `repo` scope (the repo is private, so nothing narrower can commit to it) and is kept in the editor's browser. Only add editors you'd trust with write access to the repo.

**When www.deepmagnam.in goes live:** a GitHub OAuth app has a single callback URL. In the OAuth app's settings, change **Homepage URL** to `https://www.deepmagnam.in` and **Authorization callback URL** to `https://www.deepmagnam.in/api/callback`, then save. No code or Vercel variable changes are needed: `/admin` logs in through whichever address it's opened on. From then on, editors use `https://www.deepmagnam.in/admin`; logging in on the `.vercel.app` address stops working.

### Editing locally without GitHub

```bash
npx decap-server@3.11.3   # terminal 1: lets the CMS write to this checkout
npm run dev               # terminal 2
```

Open <http://localhost:5173/admin> and click **Login**. Changes are written straight into `content/` here (no drafts, no review step), and the site reloads with them.

### Adding Portfolio (or another collection) later

1. Add a definition like `src/content/testimonials.ts` (fields, validation, sort order, image sizes).
2. Pass it to `contentPlugin([...])` in `vite.config.ts`, and declare its `virtual:content/<name>` module in `src/content/virtual-modules.d.ts`.
3. Copy the `testimonials` block in `public/admin/config.yml`, reusing the shared fields (`*published_field`, `*display_order_field`).
4. Import `virtual:content/<name>` in the page instead of `src/app/data/mockData.ts`.

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

Portfolio projects, team members and some photos are sample content (see `src/app/data/mockData.ts` and the page files in `src/app/pages/`). The Unsplash photos are hot-linked and meant to be replaced with real ones. On the Testimonials page, the stats, client names and "Success Stories" figures are placeholders too; the testimonials themselves come from the CMS.

## Project layout

```
index.html                 static meta tags, JSON-LD
public/                    favicons, OG image, robots.txt, sitemap.xml, _redirects
public/admin/              Decap CMS page and config (/admin)
api/                       Vercel functions: GitHub login for the CMS
content/                   CMS content (JSON) and uploaded originals
src/content/               content collection definitions and validation
vite/content-plugin.ts     build step: content -> virtual modules, photos -> WebP
docs/                      editor guide
src/config/site.ts         site URL, name, title, description, contact details
src/config/pageMeta.ts     each page's title and description; the pages to prerender
src/entry-server.tsx       prerender: renders a page into the built index.html
scripts/prerender.mjs      prerender: writes dist/<page>.html for every page
src/app/routes.tsx         routes (lazy-loaded pages)
src/app/components/        nav, footer, layout
src/app/pages/             one file per page
src/app/data/              portfolio, services and other static content
src/imports/               logo and hero images (WebP)
src/styles/                Tailwind setup and theme
vite.config.ts             Vite config, plus the Home hero-image preload
```
