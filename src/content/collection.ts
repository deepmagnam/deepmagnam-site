// Shared by every CMS-managed collection: the build-time content plugin
// (vite/content-plugin.ts) reads each collection's JSON files and validates
// them with its `parse`. Adding a collection (e.g. portfolio projects) means
// one more definition like src/content/testimonials.ts, passed to
// contentPlugin() in vite.config.ts, a type for its virtual module in
// src/content/virtual-modules.d.ts, and a matching collection in
// public/admin/config.yml.

/** A photo after the build has resized it to WebP. */
export type ResponsiveImage = {
  src: string;
  srcSet: string;
};

export type ImageOptions = {
  /** Output widths in px; the middle one is used as `src`. */
  widths: number[];
  /** Crop to width / height. Omit to keep the original aspect ratio. */
  aspectRatio?: number;
};

export type CollectionDefinition<Entry> = {
  /** Imported as `virtual:content/<name>`. */
  name: string;
  /** Repo-relative folder of JSON files, one per entry. */
  folder: string;
  /** Validates one file. Throws a ContentError listing every problem. */
  parse: (data: unknown) => Entry;
  isPublished: (entry: Entry) => boolean;
  compare: (a: Entry, b: Entry) => number;
  /** Fields holding an uploaded image path, and how to resize them. */
  images: Partial<Record<keyof Entry & string, ImageOptions>>;
};

export class ContentError extends Error {
  constructor(readonly problems: string[]) {
    super(problems.join("; "));
    this.name = "ContentError";
  }
}

/**
 * Reads fields off one JSON object, collecting problems instead of stopping at
 * the first one, so an editor sees everything wrong with a file at once.
 */
export class FieldReader {
  readonly problems: string[] = [];
  private readonly data: Record<string, unknown>;

  constructor(data: unknown) {
    if (typeof data !== "object" || data === null || Array.isArray(data)) {
      this.data = {};
      this.problems.push("must be a JSON object");
    } else {
      this.data = data as Record<string, unknown>;
    }
  }

  private present(field: string) {
    const value = this.data[field];
    return value !== undefined && value !== null && value !== "";
  }

  string(field: string, opts: { required: true; maxLength?: number }): string;
  string(field: string, opts?: { required?: false; maxLength?: number }): string | undefined;
  string(field: string, { required = false, maxLength }: { required?: boolean; maxLength?: number } = {}) {
    if (!this.present(field)) {
      if (required) this.problems.push(`"${field}" is required`);
      return undefined;
    }
    const value = this.data[field];
    if (typeof value !== "string") {
      this.problems.push(`"${field}" must be text`);
      return undefined;
    }
    const trimmed = value.trim();
    if (required && !trimmed) this.problems.push(`"${field}" is required`);
    // Counted in characters as people see them, not UTF-16 units.
    const length = [...trimmed].length;
    if (maxLength !== undefined && length > maxLength) {
      this.problems.push(`"${field}" is ${length} characters long (maximum ${maxLength})`);
    }
    return trimmed || undefined;
  }

  integer(field: string, { min, max }: { min?: number; max?: number } = {}) {
    if (!this.present(field)) return undefined;
    const value = this.data[field];
    if (typeof value !== "number" || !Number.isInteger(value)) {
      this.problems.push(`"${field}" must be a whole number`);
      return undefined;
    }
    if ((min !== undefined && value < min) || (max !== undefined && value > max)) {
      this.problems.push(`"${field}" must be between ${min ?? "-∞"} and ${max ?? "∞"}`);
      return undefined;
    }
    return value;
  }

  boolean(field: string) {
    if (!this.present(field)) return false;
    const value = this.data[field];
    if (typeof value !== "boolean") {
      this.problems.push(`"${field}" must be true or false`);
      return false;
    }
    return value;
  }

  /** A calendar date, YYYY-MM-DD. */
  date(field: string) {
    const value = this.string(field);
    if (value === undefined) return undefined;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value))) {
      this.problems.push(`"${field}" must be a date like 2026-01-31`);
      return undefined;
    }
    return value;
  }

  /** Throws if any field had a problem. */
  done() {
    if (this.problems.length) throw new ContentError(this.problems);
  }
}
