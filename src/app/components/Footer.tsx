import { Link } from "react-router";
import { Mail, Phone, MapPin, Linkedin, Github, Facebook } from "lucide-react";
import { CONTACT, SOCIAL } from "../../config/site";

function XLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const linkClass =
  "text-slate-600 hover:text-emerald-700 transition-colors rounded-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600";
const headingClass = "mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500";
const socialClass =
  "flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:border-emerald-500/50 hover:text-emerald-700 transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10 py-12 lg:py-16">
          {/* Brand: first in source order, so it leads when the columns stack. */}
          <div className="sm:col-span-2 lg:col-span-4">
            <p className="flex flex-wrap items-baseline gap-x-1.5 text-xl text-slate-900">
              <span className="font-bold">Deepmagnam</span>
              <span className="font-normal text-slate-600">Integrated Solutions</span>
            </p>
            <p className="mt-2 text-sm text-slate-500">Engineering Ideas. Enabling Innovation.</p>
            {/* One-line name explanation goes here (mt-2 text-sm text-slate-500). */}
            <div className="mt-8 flex gap-2">
              <a href={SOCIAL.linkedin} aria-label="LinkedIn" className={socialClass}>
                <Linkedin size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
              <a href={SOCIAL.x} aria-label="X (formerly Twitter)" className={socialClass}>
                <XLogo size={16} />
              </a>
              <a href={SOCIAL.github} aria-label="GitHub" className={socialClass}>
                <Github size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
              <a href={SOCIAL.facebook} aria-label="Facebook" className={socialClass}>
                <Facebook size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h2 className={headingClass}>Quick Links</h2>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className={linkClass}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className={linkClass}>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className={linkClass}>
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/contact" className={linkClass}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services (plain text: there are no per-service pages) */}
          <div className="lg:col-span-3">
            <h2 className={headingClass}>Services</h2>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>Mechanical Design</li>
              <li>Product Development</li>
              <li>Web Development</li>
              <li>E-Commerce Solutions</li>
              <li>UI/UX & Design</li>
              <li>Advanced CAD Services</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:col-span-2 lg:col-span-3">
            <h2 className={headingClass}>Contact Us</h2>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <Mail size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden="true" />
                <span className="break-words">{CONTACT.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>{CONTACT.phoneDisplay}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>{CONTACT.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 py-6 text-center sm:text-left text-xs text-slate-500">
          <p>&copy; {currentYear} Deepmagnam Integrated Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
