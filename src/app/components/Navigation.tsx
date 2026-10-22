import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useMatches } from "react-router";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BrandLockup } from "./BrandLockup";

/** Route `handle` fields the nav reads (see routes.tsx). */
export type NavHandle = { darkTop?: boolean };

// Scrolled past this, the transparent nav turns solid.
const TRANSPARENT_MAX_SCROLL = 40;

export function Navigation() {
  const location = useLocation();
  const darkTop = useMatches().some((match) => (match.handle as NavHandle | undefined)?.darkTop);
  // The menu remembers which location it was opened on, so any navigation
  // closes it in the same render (no effect, no extra render).
  const [menuOpenedAt, setMenuOpenedAt] = useState<string | null>(null);
  const isMobileMenuOpen = menuOpenedAt === location.key;

  // Hide on scroll down, show on scroll up. Always shown near the top of the
  // page, while the mobile menu is open, and when something in it gets focus.
  const navRef = useRef<HTMLElement>(null);
  const [hiddenOnScroll, setHiddenOnScroll] = useState(false);
  const isHidden = hiddenOnScroll && !isMobileMenuOpen;

  // On a page whose dark top section runs up behind it, the nav is
  // transparent with white text until the page scrolls. Starts true so the
  // prerendered HTML (and hydration) match the top-of-page state; the menu
  // always opens on the solid bar.
  const [nearTop, setNearTop] = useState(true);
  const transparent = darkTop && nearTop && !isMobileMenuOpen;

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setNearTop(y <= TRANSPARENT_MAX_SCROLL);
      if (y <= (navRef.current?.offsetHeight ?? 0)) {
        setHiddenOnScroll(false);
        lastY = y;
      } else if (Math.abs(y - lastY) >= 5) {
        // Small threshold so trackpad jitter doesn't flicker the nav.
        setHiddenOnScroll(y > lastY);
        lastY = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // In case the page loaded already scrolled.
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Lets sticky bars (Portfolio filters) move up to top: 0 via --nav-offset.
  useEffect(() => {
    document.documentElement.toggleAttribute("data-nav-hidden", isHidden);
    return () => document.documentElement.removeAttribute("data-nav-hidden");
  }, [isHidden]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Technologies", path: "/technologies" },
    { name: "Process", path: "/process" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      ref={navRef}
      onFocus={() => setHiddenOnScroll(false)}
      data-transparent={transparent || undefined}
      className={`fixed top-0 left-0 right-0 z-50 h-[var(--nav-height)] transition-[translate,background-color,border-color,box-shadow] duration-300 motion-reduce:transition-none border-b ${
        transparent ? "bg-transparent border-transparent" : "bg-white border-slate-200"
      } ${isHidden ? "-translate-y-full" : transparent ? "" : "shadow-sm"}`}
    >
      <div className="h-full w-full px-3 sm:px-6 lg:px-8 max-w-[100rem] mx-auto">
        <div className="flex h-full items-center justify-between gap-2 sm:gap-4">
          {/* Logo and Name */}
          <Link to="/" className="flex h-full shrink-0 items-center">
            <motion.div
              className="flex h-full items-center"
              whileHover={{ scale: 1.02 }}
            >
              {/* Mark is 48px tall on mobile, 60px from md (8px/10px bar padding). */}
              <BrandLockup
                onDark={transparent}
                imgClassName="h-full py-2 md:py-2.5"
                imgSizes="(min-width: 48rem) 63px, 50px"
                textClassName="ml-2 text-lg md:ml-2.5 md:text-[22px]"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div data-nav-links className="hidden nav:flex items-center justify-center flex-1 px-3">
            <div className="flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2.5 py-2 text-sm whitespace-nowrap underline-offset-8 transition-colors duration-300 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    transparent
                      ? `text-white focus-visible:outline-white ${
                          location.pathname === link.path
                            ? "font-semibold underline decoration-2 decoration-emerald-400"
                            : "font-medium hover:underline hover:decoration-1 hover:decoration-white/60"
                        }`
                      : `focus-visible:outline-emerald-600 ${
                          location.pathname === link.path
                            ? "text-emerald-700 font-semibold underline decoration-2 decoration-emerald-600"
                            : "text-slate-600 font-medium hover:text-emerald-700 hover:underline hover:decoration-1 hover:decoration-emerald-600/40"
                        }`
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div data-nav-cta className="hidden lg:flex items-center shrink-0 ml-auto nav:ml-0">
            <Link
              to="/contact"
              className="bg-gradient-to-r from-emerald-700 to-cyan-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-emerald-800 hover:to-cyan-800 hover:shadow-lg transition-all duration-300"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpenedAt(isMobileMenuOpen ? null : location.key)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className={`nav:hidden shrink-0 transition-colors duration-300 ${
              transparent ? "text-white hover:text-emerald-300" : "text-slate-600 hover:text-emerald-600"
            }`}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="nav:hidden absolute inset-x-0 top-full max-h-[calc(100dvh-var(--nav-height))] overflow-y-auto bg-white border-t border-slate-200 shadow-lg"
          >
            <div className="px-4 py-6 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 underline-offset-8 transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${
                    location.pathname === link.path
                      ? "text-emerald-700 font-semibold underline decoration-2 decoration-emerald-600"
                      : "text-slate-600 font-medium hover:text-emerald-700 hover:underline hover:decoration-1 hover:decoration-emerald-600/40"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className="block text-center bg-gradient-to-r from-emerald-700 to-cyan-700 text-white px-6 py-3 rounded-lg font-semibold mt-4 lg:hidden hover:from-emerald-800 hover:to-cyan-800 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
