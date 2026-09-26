import { Outlet, useNavigation } from "react-router";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { BackToTop } from "./BackToTop";

export function RootLayout() {
  // True while a lazy page chunk is downloading; the current page stays put.
  const isNavigating = useNavigation().state === "loading";

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <ScrollToTop />
      <Navigation />
      {isNavigating && (
        <div
          role="progressbar"
          aria-label="Loading page"
          className="fixed inset-x-0 top-[var(--nav-height)] z-50 h-0.5 animate-pulse bg-gradient-to-r from-emerald-500 to-cyan-500"
        />
      )}
      {/* clip, not hidden: slide-in animations start ±50px off-axis and would
          otherwise widen the page, and hidden would break position: sticky. */}
      <main className="overflow-x-clip">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}