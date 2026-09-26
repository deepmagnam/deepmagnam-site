import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logoImage from "../../imports/edited-photo_-_2026-09-07T151854.793.png";

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
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-sm border-b border-slate-200">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[100rem] mx-auto">
        <div className="flex flex-wrap items-center justify-between min-h-[5rem] py-2 lg:py-0">
          {/* Logo and Name */}
          <Link to="/" className="flex items-center space-x-3 shrink-0">
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
            >
              <img 
                src={logoImage} 
                alt="DEEPMAGNAM INTEGRATED SOLUTIONS Logo" 
                className="h-20 md:h-28 lg:h-32 w-auto object-contain py-2"
              />
              <span className="ml-2 text-sm md:text-base font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent max-w-[180px] sm:max-w-none leading-tight">
                DEEPMAGNAM INTEGRATED SOLUTIONS
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center justify-center flex-1 px-4">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
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
          <div className="hidden lg:flex items-center shrink-0">
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
            className="xl:hidden text-slate-600 hover:text-emerald-600 transition-colors ml-auto lg:ml-4"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white border-t border-slate-200 shadow-lg"
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
