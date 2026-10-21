import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import type { Testimonial } from "../../content/testimonials";
import template from "../../../index.html?raw";
import { renderPage } from "../../entry-server";
import { Testimonials } from "./Testimonials";

// Stands in for the build-time content (content/testimonials/*.json).
const content = vi.hoisted(() => ({ testimonials: [] as Testimonial[] }));
vi.mock("virtual:content/testimonials", () => ({ default: content.testimonials }));

const setTestimonials = (list: Testimonial[]) => content.testimonials.splice(0, Infinity, ...list);

const asha: Testimonial = {
  slug: "asha",
  name: "Asha Kumar",
  quote: "Precise drawings, delivered early.",
  role: "Plant Head",
  company: "Acme Castings",
  rating: 4,
  photo: {
    src: "/assets/content/testimonials/asha-128w-abc.webp",
    srcSet: "/assets/content/testimonials/asha-64w-abc.webp 64w, /assets/content/testimonials/asha-128w-abc.webp 128w",
  },
};
const ravi: Testimonial = { slug: "ravi", name: "Ravi Shankar Iyer", quote: "Smooth project." };

function renderTestimonials() {
  const router = createMemoryRouter([{ path: "/testimonials", Component: Testimonials }], {
    initialEntries: ["/testimonials"],
  });
  render(<RouterProvider router={router} />);
}

beforeEach(() => setTestimonials([]));

describe("Testimonials page", () => {
  it("shows a short message when nothing is published", () => {
    renderTestimonials();
    expect(screen.getByText("Client testimonials will be shared here soon.")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 4 })).not.toBeInTheDocument();
  });

  it("shows each published testimonial in order", () => {
    setTestimonials([asha, ravi]);
    renderTestimonials();

    expect(screen.queryByText(/will be shared here soon/)).not.toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 4 }).map((h) => h.textContent)).toEqual([
      "Asha Kumar",
      "Ravi Shankar Iyer",
    ]);
    expect(screen.getByText(`"${asha.quote}"`)).toBeInTheDocument();
    expect(screen.getByText("Plant Head")).toBeInTheDocument();
    expect(screen.getByText("Acme Castings")).toBeInTheDocument();
  });

  it("shows the resized photo and the star rating", () => {
    setTestimonials([asha]);
    renderTestimonials();

    const photo = screen.getByRole("img", { name: "Asha Kumar" });
    expect(photo).toHaveAttribute("src", asha.photo!.src);
    expect(photo).toHaveAttribute("srcset", asha.photo!.srcSet);
    expect(photo).toHaveAttribute("sizes", "64px");

    const stars = screen.getByRole("img", { name: "Rated 4 out of 5" });
    expect(stars.querySelectorAll("svg")).toHaveLength(4);
  });

  it("leaves out what isn't filled in: initials instead of a photo, no stars, no role or company", () => {
    setTestimonials([ravi]);
    renderTestimonials();

    const card = screen.getByRole("heading", { level: 4, name: "Ravi Shankar Iyer" }).closest("div.relative")!;
    expect(within(card as HTMLElement).queryByRole("img")).not.toBeInTheDocument();
    expect(card).toHaveTextContent("RS");
    expect(card.querySelectorAll("p")).toHaveLength(1); // just the quote
  });
});

describe("Testimonials prerender", () => {
  it("puts published testimonials in the static HTML", async () => {
    setTestimonials([asha]);
    const doc = new DOMParser().parseFromString(await renderPage(template, "/testimonials"), "text/html");
    const root = doc.getElementById("root")!;

    expect(root.textContent).toContain(asha.quote);
    expect(root.querySelector('img[alt="Asha Kumar"]')?.getAttribute("srcset")).toBe(asha.photo!.srcSet);
    expect(root.textContent).not.toContain("will be shared here soon");
  });

  it("prerenders the message when nothing is published", async () => {
    const html = await renderPage(template, "/testimonials");
    expect(html).toContain("Client testimonials will be shared here soon.");
  });
});
