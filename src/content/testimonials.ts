import { FieldReader, type CollectionDefinition, type ResponsiveImage } from "./collection";

// Field names match public/admin/config.yml (the CMS writes these JSON files).
export const QUOTE_MAX_LENGTH = 300;

/** One file in content/testimonials/, validated. */
export type TestimonialEntry = {
  name: string;
  quote: string;
  role?: string;
  company?: string;
  /** Repo path of the uploaded original, e.g. /content/media/testimonials/jane.jpg */
  photo?: string;
  rating?: number;
  /** YYYY-MM-DD */
  date?: string;
  order?: number;
  published: boolean;
  consent: boolean;
};

/** What the Testimonials page gets: published entries only, photo resized. */
export type Testimonial = Omit<TestimonialEntry, "photo" | "published" | "consent"> & {
  /** File name without .json; unique, so it's used as the React key. */
  slug: string;
  photo?: ResponsiveImage;
};

export function parseTestimonial(data: unknown): TestimonialEntry {
  const read = new FieldReader(data);
  const entry: TestimonialEntry = {
    name: read.string("name", { required: true }),
    quote: read.string("quote", { required: true, maxLength: QUOTE_MAX_LENGTH }),
    role: read.string("role"),
    company: read.string("company"),
    photo: read.string("photo"),
    rating: read.integer("rating", { min: 1, max: 5 }),
    date: read.date("date"),
    order: read.integer("order"),
    published: read.boolean("published"),
    consent: read.boolean("consent"),
  };
  // Same rule the CMS enforces on save (public/admin/index.html); checked here
  // too so a hand-edited file can't put a quote on the site without consent.
  if (entry.published && !entry.consent) {
    read.problems.push(`"published" is true but "consent" is not: a testimonial needs the client's consent before it can be published`);
  }
  read.done();
  return entry;
}

/** Lowest display order first (entries without one last), then newest first, then by name. */
export function compareTestimonials(a: TestimonialEntry, b: TestimonialEntry) {
  const order = (a.order ?? Infinity) - (b.order ?? Infinity);
  if (order) return order;
  const date = (b.date ?? "").localeCompare(a.date ?? "");
  if (date) return date;
  return a.name.localeCompare(b.name);
}

export const testimonialsCollection: CollectionDefinition<TestimonialEntry> = {
  name: "testimonials",
  folder: "content/testimonials",
  parse: parseTestimonial,
  isPublished: (entry) => entry.published,
  compare: compareTestimonials,
  // Shown at 64 CSS px, square: 1x, 2x and 3x screens.
  images: { photo: { widths: [64, 128, 192], aspectRatio: 1 } },
};
