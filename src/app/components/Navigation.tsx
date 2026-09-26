import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logoImage from "../../imports/logo-mark.webp";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

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
    <nav className="fixed top-0 left-0 right-0 z-50 h-[var(--nav-height)] transition-all duration-300 bg-white shadow-sm border-b border-slate-200">
      <div className="h-full w-full px-3 sm:px-6 lg:px-8 max-w-[100rem] mx-auto">
        <div className="flex h-full items-center justify-between gap-2 sm:gap-4">
          {/* Logo and Name */}
          <Link to="/" className="flex h-full shrink-0 items-center">
            <motion.div
              className="flex h-full items-center"
              whileHover={{ scale: 1.02 }}
            >
              <img 
                src={logoImage} 
                alt="DEEPMAGNAM INTEGRATED SOLUTIONS Logo" 
                className="h-full w-auto shrink-0 object-contain py-2"
              />
              <span data-nav-name className="ml-1.5 sm:ml-2 whitespace-nowrap text-[11px] tracking-tight sm:text-sm sm:tracking-normal md:text-base font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                DEEPMAGNAM INTEGRATED SOLUTIONS
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div data-nav-links className="hidden nav:flex items-center justify-center flex-1 px-3">
            <div className="flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2.5 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                    location.pathname === link.path
                      ? "bg-emerald-50/80 text-emerald-700 shadow-sm border border-emerald-100 font-semibold text-sm"
                      : "text-slate-600 hover:text-emerald-700 hover:bg-slate-50 hover:shadow-sm border border-transparent hover:border-slate-200 font-medium text-sm"
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
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="nav:hidden shrink-0 text-slate-600 hover:text-emerald-600 transition-colors"
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
                  className={`block px-4 py-3 rounded-lg transition-all font-medium ${
                    location.pathname === link.path
                      ? "bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100"
                      : "text-slate-600 hover:bg-slate-50 hover:text-emerald-700"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className="block text-center bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold mt-4 lg:hidden"
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
