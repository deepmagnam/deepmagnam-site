import { describe, expect, it } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import { cloneRoutes, routes } from "./routes";

// Mounts the real route config (lazy pages included) at the given URL.
function renderAt(path: string) {
  const router = createMemoryRouter(cloneRoutes(routes), { initialEntries: [path] });
  render(<RouterProvider router={router} />);
  return { user: userEvent.setup() };
}

describe("routes", () => {
  it.each([
    ["/", "Mechanical CAD Design & Software Development"],
    ["/about", "About Deepmagnam Integrated Solutions"],
    ["/services", "Our Services"],
    ["/portfolio", "Our Portfolio"],
    ["/technologies", "Technologies We Use"],
    ["/process", "Our Process"],
    ["/testimonials", "Client Testimonials"],
    ["/contact", "Get In Touch"],
  ])("%s shows its main heading", async (path, heading) => {
    renderAt(path);
    expect(await screen.findByRole("heading", { level: 1, name: heading })).toBeInTheDocument();
  });

  it("shows the Not Found page for an unknown URL", async () => {
    renderAt("/no-such-page");
    expect(await screen.findByRole("heading", { level: 1, name: "Page Not Found" })).toBeInTheDocument();
  });
});

describe("mobile menu", () => {
  it("opens, then closes after choosing a link", async () => {
    const { user } = renderAt("/");
    await screen.findByRole("heading", { level: 1 });

    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAccessibleName("Close menu");

    // The menu is the element the toggle says it controls.
    const menuId = toggle.getAttribute("aria-controls")!;
    const menu = document.getElementById(menuId)!;
    expect(menu).toBeInTheDocument();

    await user.click(within(menu).getByRole("link", { name: "Services" }));

    expect(await screen.findByRole("heading", { level: 1, name: "Our Services" })).toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await waitFor(() => expect(document.getElementById(menuId)).not.toBeInTheDocument());
  });
});

describe("portfolio filter", () => {
  const cardNames = () =>
    screen
      .getAllByRole("button", { name: /^View project details:/ })
      .map((card) => card.getAttribute("aria-label")!.replace("View project details: ", ""));

  it("shows only the projects in the chosen category", async () => {
    const { user } = renderAt("/portfolio");
    await screen.findByRole("heading", { level: 1, name: "Our Portfolio" });

    expect(cardNames()).toHaveLength(9);
    expect(cardNames()).toContain("Industrial Robotic Arm Design");

    const filter = screen.getByRole("button", { name: "Web Development" });
    await user.click(filter);

    expect(filter).toHaveAttribute("aria-pressed", "true");
    await waitFor(() =>
      expect(cardNames()).toEqual(["E-Commerce Platform", "Real Estate Web Portal"]),
    );
  });
});
