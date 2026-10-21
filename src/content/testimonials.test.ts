import { describe, expect, it } from "vitest";
import { ContentError } from "./collection";
import { compareTestimonials, parseTestimonial, type TestimonialEntry } from "./testimonials";

const valid = {
  name: "Asha Kumar",
  quote: "Precise drawings, delivered early.",
  role: "Plant Head",
  company: "Acme Castings",
  photo: "/content/media/testimonials/asha.jpg",
  rating: 5,
  date: "2026-09-01",
  order: 1,
  published: true,
  consent: true,
};

function problemsFor(data: unknown) {
  try {
    parseTestimonial(data);
  } catch (error) {
    if (error instanceof ContentError) return error.problems;
    throw error;
  }
  return [];
}

describe("parseTestimonial", () => {
  it("accepts a complete entry", () => {
    expect(parseTestimonial(valid)).toEqual(valid);
  });

  it("accepts only the required fields, unpublished by default", () => {
    expect(parseTestimonial({ name: " Asha ", quote: "Great." })).toEqual({
      name: "Asha",
      quote: "Great.",
      role: undefined,
      company: undefined,
      photo: undefined,
      rating: undefined,
      date: undefined,
      order: undefined,
      published: false,
      consent: false,
    });
  });

  it("treats empty optional fields as missing", () => {
    const entry = parseTestimonial({ ...valid, role: "", company: null, photo: "", rating: null });
    expect(entry).toMatchObject({ role: undefined, company: undefined, photo: undefined, rating: undefined });
  });

  it("requires name and quote", () => {
    expect(problemsFor({ name: "  ", published: false })).toEqual(['"name" is required', '"quote" is required']);
  });

  it("refuses to publish without the client's consent", () => {
    expect(problemsFor({ ...valid, consent: false })).toEqual([
      expect.stringContaining("needs the client's consent before it can be published"),
    ]);
    expect(problemsFor({ ...valid, consent: undefined })).toHaveLength(1);
  });

  it("allows an unpublished entry without consent (a draft)", () => {
    expect(problemsFor({ ...valid, published: false, consent: false })).toEqual([]);
  });

  it("limits the quote to 300 characters", () => {
    expect(problemsFor({ ...valid, quote: "a".repeat(300) })).toEqual([]);
    expect(problemsFor({ ...valid, quote: "a".repeat(301) })).toEqual(['"quote" is 301 characters long (maximum 300)']);
    // Counted as characters, not UTF-16 units: 300 emoji are fine.
    expect(problemsFor({ ...valid, quote: "👍".repeat(300) })).toEqual([]);
  });

  it.each([0, 6, 4.5, "5"])("rejects rating %j", (rating) => {
    expect(problemsFor({ ...valid, rating })).toHaveLength(1);
  });

  it("rejects malformed values", () => {
    expect(problemsFor({ ...valid, date: "19/10/2026", order: "first", published: "yes" })).toEqual([
      '"date" must be a date like 2026-01-31',
      '"order" must be a whole number',
      '"published" must be true or false',
    ]);
    expect(problemsFor([])).toEqual(["must be a JSON object", '"name" is required', '"quote" is required']);
  });
});

describe("compareTestimonials", () => {
  const entry = (name: string, extra: Partial<TestimonialEntry> = {}): TestimonialEntry => ({
    name,
    quote: "q",
    published: true,
    consent: true,
    ...extra,
  });

  it("sorts by display order, then newest date, then name; unordered entries last", () => {
    const sorted = [
      entry("No order, old", { date: "2025-01-01" }),
      entry("Order 2", { order: 2 }),
      entry("No order, new", { date: "2026-01-01" }),
      entry("Order 1, old", { order: 1, date: "2025-05-05" }),
      entry("Order 1, new", { order: 1, date: "2026-05-05" }),
      entry("B, no date"),
      entry("A, no date"),
    ];
    sorted.sort(compareTestimonials);
    expect(sorted.map((e) => e.name)).toEqual([
      "Order 1, new",
      "Order 1, old",
      "Order 2",
      "No order, new",
      "No order, old",
      "A, no date",
      "B, no date",
    ]);
  });
});
