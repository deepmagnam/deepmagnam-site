import type { RouteObject } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { PageLoadingFallback } from "./components/PageLoadingFallback";
import { Home } from "./pages/Home";
// Stays in the main bundle: it's what renders if a lazy page chunk fails to load.
import { ErrorPage } from "./pages/ErrorPage";

// Every page except Home is its own chunk, fetched on first visit to that route.
// Exported separately so tests can mount the same config in a memory router.
export const routes: RouteObject[] = [
  {
    path: "/",
    Component: RootLayout,
    ErrorBoundary: ErrorPage,
    // Shown on a first load straight onto a lazy route, until its chunk arrives.
    HydrateFallback: PageLoadingFallback,
    children: [
      { index: true, Component: Home },
      { path: "about", lazy: { Component: async () => (await import("./pages/About")).About } },
      { path: "services", lazy: { Component: async () => (await import("./pages/Services")).Services } },
      { path: "portfolio", lazy: { Component: async () => (await import("./pages/Portfolio")).Portfolio } },
      { path: "technologies", lazy: { Component: async () => (await import("./pages/Technologies")).Technologies } },
      { path: "process", lazy: { Component: async () => (await import("./pages/Process")).Process } },
      { path: "testimonials", lazy: { Component: async () => (await import("./pages/Testimonials")).Testimonials } },
      { path: "contact", lazy: { Component: async () => (await import("./pages/Contact")).Contact } },
      { path: "*", lazy: { Component: async () => (await import("./pages/NotFound")).NotFound } },
    ],
  },
];
