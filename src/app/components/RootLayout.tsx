import { Outlet } from "react-router";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { BackToTop } from "./BackToTop";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <ScrollToTop />
      <Navigation />
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