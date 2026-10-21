import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { testimonialsCollection } from "../src/content/testimonials";
import { loadCollection, renderImage } from "./content-plugin";

let root: string;

beforeEach(async () => {
  root = await fs.mkdtemp(path.join(os.tmpdir(), "content-plugin-"));
  await fs.mkdir(path.join(root, "content/testimonials"), { recursive: true });
  await fs.mkdir(path.join(root, "content/media/testimonials"), { recursive: true });
});

afterEach(async () => {
  await fs.rm(root, { recursive: true, force: true });
});

const writeEntry = (slug: string, data: object) =>
  fs.writeFile(path.join(root, "content/testimonials", `${slug}.json`), JSON.stringify(data));

const writePhoto = (name: string, width: number, height: number) =>
  sharp({ create: { width, height, channels: 3, background: "#c87828" } })
    .jpeg()
    .toFile(path.join(root, "content/media/testimonials", name));

describe("loadCollection", () => {
  it("returns no entries when the folder is empty or missing", async () => {
    expect((await loadCollection(root, testimonialsCollection)).entries).toEqual([]);
    await fs.rm(path.join(root, "content"), { recursive: true });
    expect((await loadCollection(root, testimonialsCollection)).entries).toEqual([]);
  });

  it("returns only published entries, sorted, with the file name as slug", async () => {
    await writeEntry("second", { name: "Second", quote: "q", order: 2, published: true, consent: true });
    await writeEntry("first", { name: "First", quote: "q", order: 1, published: true, consent: true });
    await writeEntry("draft", { name: "Draft", quote: "q", order: 0, published: false, consent: false });

    const { entries } = await loadCollection(root, testimonialsCollection);
    expect(entries.map((e) => [e.slug, e.name])).toEqual([
      ["first", "First"],
      ["second", "Second"],
    ]);
  });

  it("replaces a published entry's photo with resized WebP URLs", async () => {
    await writePhoto("Asha Photo.JPG", 4000, 3000);
    await writeEntry("asha", {
      name: "Asha",
      quote: "q",
      photo: "/content/media/testimonials/Asha Photo.JPG",
      published: true,
      consent: true,
    });

    const { entries, images } = await loadCollection(root, testimonialsCollection);
    expect(images.map((job) => [job.width, job.height])).toEqual([
      [64, 64],
      [128, 128],
      [192, 192],
    ]);
    const [file64, file128, file192] = images.map((job) => job.fileName);
    expect(file64).toMatch(/^assets\/content\/testimonials\/asha-photo-64w-[0-9a-f]{10}\.webp$/);
    expect(entries[0].photo).toEqual({
      src: `/${file128}`,
      srcSet: `/${file64} 64w, /${file128} 128w, /${file192} 192w`,
    });
  });

  it("doesn't process photos of unpublished entries", async () => {
    await writeEntry("draft", { name: "Draft", quote: "q", photo: "/content/media/testimonials/nope.jpg" });
    expect((await loadCollection(root, testimonialsCollection)).images).toEqual([]);
  });

  it("lists every problem in every file", async () => {
    await writeEntry("no-consent", { name: "A", quote: "q", published: true });
    await writeEntry("long", { name: "B", quote: "x".repeat(301) });
    await fs.writeFile(path.join(root, "content/testimonials/broken.json"), "{ nope");
    await writeEntry("missing-photo", {
      name: "C",
      quote: "q",
      photo: "/content/media/testimonials/missing.jpg",
      published: true,
      consent: true,
    });
    await writeEntry("outside", { name: "D", quote: "q", photo: "/package.json", published: true, consent: true });
    await writePhoto("phone.heic", 10, 10);
    await writeEntry("heic", {
      name: "E",
      quote: "q",
      photo: "/content/media/testimonials/phone.heic",
      published: true,
      consent: true,
    });

    const error = await loadCollection(root, testimonialsCollection).catch((e: Error) => e);
    expect(error).toBeInstanceOf(Error);
    const message = (error as Error).message;
    expect(message).toContain("content/testimonials/broken.json: not valid JSON");
    expect(message).toContain("content/testimonials/no-consent.json: \"published\" is true but \"consent\" is not");
    expect(message).toContain('content/testimonials/long.json: "quote" is 301 characters long (maximum 300)');
    expect(message).toContain('content/testimonials/missing-photo.json: "photo" file not found');
    expect(message).toContain('content/testimonials/outside.json: "photo" must be a file under content/media/');
    expect(message).toContain('content/testimonials/heic.json: "photo" must be a JPG, PNG, WebP or AVIF image');
  });
});

describe("renderImage", () => {
  it("crops to a square WebP of the requested size, without metadata", async () => {
    await writePhoto("wide.jpg", 4000, 3000);
    const output = await renderImage({
      source: path.join(root, "content/media/testimonials/wide.jpg"),
      width: 128,
      height: 128,
      fileName: "unused.webp",
    });
    const meta = await sharp(output).metadata();
    expect([meta.format, meta.width, meta.height, meta.exif]).toEqual(["webp", 128, 128, undefined]);
    expect(output.length).toBeLessThan(5_000);
  });
});
