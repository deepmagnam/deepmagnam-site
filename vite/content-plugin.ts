// Build-time content from the CMS: each collection's JSON files become a
// virtual module (`import testimonials from "virtual:content/testimonials"`)
// holding the published entries, validated and sorted. Invalid content stops
// the build (and shows the dev-server error overlay) with every problem listed.
//
// Uploaded images stay in content/media/ and are never deployed as-is: the
// build resizes them to WebP at the widths the collection asks for, under
// dist/assets/content/. The dev server serves the same URLs, resized on demand.
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import type { Plugin } from "vite";
import { ContentError, type CollectionDefinition, type ResponsiveImage } from "../src/content/collection";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyCollection = CollectionDefinition<any>;

const VIRTUAL_PREFIX = "virtual:content/";
const RESOLVED_PREFIX = "\0" + VIRTUAL_PREFIX;
const IMAGE_OUT_DIR = "assets/content";
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const WEBP_QUALITY = 80;

export type ImageJob = {
  /** Absolute path of the uploaded original. */
  source: string;
  width: number;
  height?: number;
  /** Output path relative to dist/, also the URL path. */
  fileName: string;
};

export type LoadedCollection = {
  entries: Record<string, unknown>[];
  images: ImageJob[];
  /** Every file read, so the build can watch them. */
  files: string[];
};

const imageUrl = (job: ImageJob) => "/" + job.fileName;

/** Reads, validates and sorts one collection. Throws listing every invalid file. */
export async function loadCollection(root: string, collection: AnyCollection): Promise<LoadedCollection> {
  const dir = path.join(root, collection.folder);
  const names = (await fs.readdir(dir).catch(() => [] as string[])).filter((n) => n.endsWith(".json")).sort();
  const problems: string[] = [];
  const parsed: { slug: string; entry: Record<string, unknown> }[] = [];
  const files: string[] = [];

  for (const name of names) {
    const file = path.join(dir, name);
    const label = path.posix.join(collection.folder, name);
    files.push(file);
    try {
      const entry = collection.parse(JSON.parse(await fs.readFile(file, "utf8")));
      parsed.push({ slug: name.slice(0, -".json".length), entry });
    } catch (error) {
      if (error instanceof ContentError) problems.push(...error.problems.map((p) => `${label}: ${p}`));
      else if (error instanceof SyntaxError) problems.push(`${label}: not valid JSON (${error.message})`);
      else throw error;
    }
  }

  const published = parsed.filter(({ entry }) => collection.isPublished(entry));
  published.sort((a, b) => collection.compare(a.entry, b.entry));

  const images: ImageJob[] = [];
  const entries: Record<string, unknown>[] = [];
  for (const { slug, entry } of published) {
    const out: Record<string, unknown> = { slug, ...entry };
    for (const [field, options] of Object.entries(collection.images)) {
      const value = entry[field];
      if (typeof value !== "string" || !options) continue;
      const label = `${path.posix.join(collection.folder, slug)}.json: "${field}"`;

      // The CMS stores repo-root paths like /content/media/testimonials/jane.jpg.
      const source = path.join(root, value);
      const mediaDir = path.join(root, "content", "media");
      if (path.relative(mediaDir, source).startsWith("..")) {
        problems.push(`${label} must be a file under content/media/ (got ${value})`);
        continue;
      }
      if (!IMAGE_EXTENSIONS.has(path.extname(source).toLowerCase())) {
        problems.push(`${label} must be a JPG, PNG, WebP or AVIF image (got ${path.basename(value)})`);
        continue;
      }
      let bytes: Buffer;
      try {
        bytes = await fs.readFile(source);
      } catch {
        problems.push(`${label} file not found: ${value}`);
        continue;
      }
      files.push(source);

      // Content hash in the name: a replaced photo gets a new URL, so caches never show the old one.
      const hash = crypto.createHash("sha256").update(bytes).update(JSON.stringify(options)).digest("hex").slice(0, 10);
      const base = path.parse(source).name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "image";
      const jobs = options.widths.map((width) => ({
        source,
        width,
        height: options.aspectRatio ? Math.round(width / options.aspectRatio) : undefined,
        fileName: `${IMAGE_OUT_DIR}/${collection.name}/${base}-${width}w-${hash}.webp`,
      }));
      images.push(...jobs);
      out[field] = {
        src: imageUrl(jobs[Math.floor(jobs.length / 2)]),
        srcSet: jobs.map((job) => `${imageUrl(job)} ${job.width}w`).join(", "),
      } satisfies ResponsiveImage;
    }
    entries.push(out);
  }

  if (problems.length) {
    throw new Error(`Invalid content in ${collection.folder}/ (edit it in /admin, or fix the files):\n  - ${problems.join("\n  - ")}`);
  }
  return { entries, images, files };
}

/** Crops (if the job has a height) and converts to WebP. Rotates per EXIF, then drops all metadata (GPS included). */
export async function renderImage(job: ImageJob): Promise<Buffer> {
  const { default: sharp } = await import("sharp");
  try {
    return await sharp(job.source)
      .rotate()
      .resize({ width: job.width, height: job.height, fit: "cover" })
      .webp({ quality: WEBP_QUALITY })
      .toBuffer();
  } catch (error) {
    throw new Error(`Couldn't process image ${job.source}: ${(error as Error).message}`);
  }
}

export function contentPlugin(collections: AnyCollection[]): Plugin {
  let root = process.cwd();
  let isBuild = false;
  // URL path -> job, for the dev server.
  const imageJobs = new Map<string, ImageJob>();
  const rendered = new Map<string, Promise<Buffer>>();
  const render = (job: ImageJob) => {
    let result = rendered.get(job.fileName);
    if (!result) {
      result = renderImage(job);
      rendered.set(job.fileName, result);
      result.catch(() => rendered.delete(job.fileName));
    }
    return result;
  };
  const findCollection = (id: string) => collections.find((c) => id === RESOLVED_PREFIX + c.name);

  return {
    name: "content-collections",

    configResolved(config) {
      root = config.root;
      isBuild = config.command === "build";
    },

    resolveId(id) {
      if (id.startsWith(VIRTUAL_PREFIX) && findCollection("\0" + id)) return "\0" + id;
    },

    async load(id, options) {
      const collection = findCollection(id);
      if (!collection) return;
      const { entries, images, files } = await loadCollection(root, collection);
      for (const file of files) this.addWatchFile(file);
      for (const job of images) {
        imageJobs.set(imageUrl(job), job);
        // The SSR build only needs the URLs; the client build writes the files.
        if (isBuild && !options?.ssr) {
          this.emitFile({ type: "asset", fileName: job.fileName, source: await render(job) });
        }
      }
      return `export default ${JSON.stringify(entries)};`;
    },

    configureServer(server) {
      const contentDir = path.join(root, "content");
      server.watcher.add(contentDir);
      // Saving in the CMS (local backend) or editing a file reloads the page with the new content.
      server.watcher.on("all", (_event, file) => {
        if (!file.startsWith(contentDir + path.sep)) return;
        for (const collection of collections) {
          const mod = server.moduleGraph.getModuleById(RESOLVED_PREFIX + collection.name);
          if (mod) server.moduleGraph.invalidateModule(mod);
        }
        server.ws.send({ type: "full-reload" });
      });

      server.middlewares.use((req, res, next) => {
        const job = imageJobs.get((req.url ?? "").split("?")[0]);
        if (!job) return next();
        render(job).then(
          (image) => {
            res.setHeader("Content-Type", "image/webp");
            res.setHeader("Cache-Control", "no-cache");
            res.end(image);
          },
          next,
        );
      });
    },
  };
}
