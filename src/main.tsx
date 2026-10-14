  import { createRoot, hydrateRoot } from "react-dom/client";
  import { createBrowserRouter, matchRoutes, RouterProvider } from "react-router";
  import App from "./app/App.tsx";
  import { routes } from "./app/routes";
  import "@fontsource-variable/plus-jakarta-sans";
  import "./styles/index.css";

  // Loads the lazy page(s) for the current URL up front. Prerendered HTML
  // already shows that page, so the router must not start with its
  // HydrateFallback, or hydration wouldn't match.
  async function loadCurrentLazyRoutes() {
    const matches = matchRoutes(routes, window.location) ?? [];
    await Promise.all(
      matches.map(async ({ route }) => {
        const { lazy } = route;
        if (!lazy) return;
        const loaded =
          typeof lazy === "function"
            ? await lazy()
            : Object.fromEntries(
                await Promise.all(
                  Object.entries(lazy).map(async ([key, load]) => [key, await (load as () => Promise<unknown>)()]),
                ),
              );
        Object.assign(route, loaded, { lazy: undefined });
      }),
    );
  }

  const container = document.getElementById("root")!;
  const app = () => (
    <App>
      <RouterProvider router={createBrowserRouter(routes)} />
    </App>
  );

  // Built pages are prerendered (src/entry-server.tsx); the dev server's index.html is empty.
  if (container.hasChildNodes()) {
    loadCurrentLazyRoutes().then(
      () => hydrateRoot(container, app()),
      // Chunk failed to load: render from scratch so the router shows its error page.
      () => createRoot(container).render(app()),
    );
  } else {
    createRoot(container).render(app());
  }
