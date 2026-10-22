import { describe, expect, it, vi } from "vitest";
import { act } from "@testing-library/react";
import { hydrateRoot } from "react-dom/client";
import { createMemoryRouter, matchRoutes, RouterProvider } from "react-router";
import template from "../index.html?raw";
import App from "./app/App";
import { cloneRoutes } from "./app/routes";
import sitemap from "../public/sitemap.xml?raw";
import { PRERENDER_PAGES, renderPage } from "./entry-server";
import { PAGE_META } from "./config/pageMeta";

const parse = (html: string) => new DOMParser().parseFromString(html, "text/html");
const attr = (doc: Document, selector: string, name: string) => doc.querySelector(selector)?.getAttribute(name);

describe("prerender", () => {
  it("writes dist/<route>/index.html for every page, plus 404.html", () => {
    expect(PRERENDER_PAGES.map((page) => page.file)).toEqual([
      ...Object.keys(PAGE_META).map((path) => (path === "/" ? "index.html" : `${path.slice(1)}/index.html`)),
      "404.html",
    ]);
  });

  it.each([
    ["/", "IT Services and Engineering Solutions", "Deepmagnam Integrated Solutions | CAD & Software Development"],
    ["/about", "About Deepmagnam Integrated Solutions", "About | Deepmagnam Integrated Solutions"],
    ["/services", "Our Services", "CAD & Software Services | Deepmagnam Integrated Solutions"],
    ["/portfolio", "Our Portfolio", "Portfolio | Deepmagnam Integrated Solutions"],
    ["/technologies", "Technologies We Use", "Technologies | Deepmagnam Integrated Solutions"],
    ["/process", "Our Process", "Process | Deepmagnam Integrated Solutions"],
    ["/testimonials", "Client Testimonials", "Testimonials | Deepmagnam Integrated Solutions"],
    ["/contact", "Get In Touch", "Contact | Deepmagnam Integrated Solutions"],
    ["/404", "Page Not Found", "Page Not Found | Deepmagnam Integrated Solutions"],
  ])("%s has its own <h1> and <title>", async (path, h1, title) => {
    const doc = parse(await renderPage(template, path));

    expect([...doc.querySelectorAll("h1")].map((el) => el.textContent)).toEqual([h1]);
    expect(doc.querySelectorAll("title")).toHaveLength(1);
    expect(doc.title).toBe(title);
    expect(PRERENDER_PAGES.find((page) => page.path === path)?.title).toBe(title);
  });

  it("gives a page its own content and head tags", async () => {
    const doc = parse(await renderPage(template, "/services"));
    const title = "CAD & Software Services | Deepmagnam Integrated Solutions";

    expect(doc.title).toBe(title);
    expect(attr(doc, 'meta[name="description"]', "content")).toBe(PAGE_META["/services"].description);
    expect(attr(doc, 'link[rel="canonical"]', "href")).toBe("https://www.deepmagnam.in/services");
    expect(attr(doc, 'meta[property="og:url"]', "content")).toBe("https://www.deepmagnam.in/services");
    expect(attr(doc, 'meta[property="og:title"]', "content")).toBe(title);
    expect(attr(doc, 'meta[name="twitter:description"]', "content")).toBe(PAGE_META["/services"].description);
    expect(doc.querySelector("#root h1")?.textContent).toBe("Our Services");
  });

  it("marks 404.html noindex, without a canonical URL", async () => {
    const doc = parse(await renderPage(template, "/404"));

    expect(doc.title).toBe("Page Not Found | Deepmagnam Integrated Solutions");
    expect(attr(doc, 'meta[name="robots"]', "content")).toBe("noindex");
    expect(doc.querySelector('link[rel="canonical"]')).toBeNull();
    expect(doc.querySelector('meta[property="og:url"]')).toBeNull();
    expect(doc.querySelector("#root h1")?.textContent).toBe("Page Not Found");
  });

  it("lists exactly the prerendered pages in sitemap.xml, so /admin stays out of both", () => {
    const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
    expect(locs).toEqual(Object.keys(PAGE_META).map((path) => `https://www.deepmagnam.in${path}`));
    expect(PRERENDER_PAGES.some((page) => page.path.startsWith("/admin"))).toBe(false);
  });

  it("fails if index.html is missing a tag it fills in", async () => {
    await expect(renderPage(template.replace(/<link rel="canonical"[^>]*>/, ""), "/about")).rejects.toThrow(/canonical/);
  });

  it.each(["/", "/about", "/contact", "/404"])(
    "%s renders the transparent nav and hydrates without warnings",
    async (path) => {
      const doc = parse(await renderPage(template, path));
      expect(doc.querySelector("#root nav")?.hasAttribute("data-transparent")).toBe(true);

      // Load the page's lazy chunk first, as main.tsx does, then hydrate the
      // prerendered markup.
      const routes = cloneRoutes();
      for (const { route } of matchRoutes(routes, path) ?? []) {
        if (route.lazy && typeof route.lazy === "object") {
          const loaded = Object.fromEntries(
            await Promise.all(
              Object.entries(route.lazy).map(async ([key, load]) => [key, await (load as () => Promise<unknown>)()]),
            ),
          );
          Object.assign(route, loaded, { lazy: undefined });
        }
      }
      const container = document.createElement("div");
      container.innerHTML = doc.getElementById("root")!.innerHTML;
      document.body.append(container);

      const errors = vi.spyOn(console, "error").mockImplementation(() => {});
      const onRecoverableError = vi.fn();
      const root = await act(async () =>
        hydrateRoot(
          container,
          <App>
            <RouterProvider router={createMemoryRouter(routes, { initialEntries: [path] })} />
          </App>,
          { onRecoverableError },
        ),
      );
      try {
        expect(errors).not.toHaveBeenCalled();
        expect(onRecoverableError).not.toHaveBeenCalled();
        expect(container.querySelector("nav")?.hasAttribute("data-transparent")).toBe(true);
      } finally {
        errors.mockRestore();
        act(() => root.unmount());
        container.remove();
      }
    },
  );
});
