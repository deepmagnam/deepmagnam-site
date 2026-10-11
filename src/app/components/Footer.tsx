import { Link } from "react-router";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { CONTACT, SOCIAL, telHref, whatsAppHref } from "../../config/site";

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" aria-hidden="true">
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4zM12 7a5 5 0 1 0 0 10 5 5 0 1 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 1 1 0-6zm5.5-3.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 1 0 0-2.5z" />
    </svg>
  );
}

function YouTubeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" aria-hidden="true">
      <path d="M5 4.5h14a4 4 0 0 1 4 4v7a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4v-7a4 4 0 0 1 4-4zm5 4.25v6.5L15.5 12z" />
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
            <p className="flex flex-wrap items-baseline gap-x-1.5 text-xl">
              <span className="font-bold text-brand-blue">Deepmagnam</span>
              <span className="font-normal text-brand-grey">Integrated Solutions</span>
            </p>
            <p className="mt-2 text-sm text-slate-500">Engineering Ideas. Enabling Innovation.</p>
            {/* One-line name explanation goes here (mt-2 text-sm text-slate-500). */}
            <div className="mt-8 flex gap-2">
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram (opens in a new tab)" className={socialClass}>
                <InstagramIcon size={16} />
              </a>
              <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" className={socialClass}>
                <Linkedin size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
              <a href={SOCIAL.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube (opens in a new tab)" className={socialClass}>
                <YouTubeIcon size={18} />
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
              {CONTACT.phones.map((phone) => (
                <li key={phone.digits} className="flex items-start gap-3">
                  <Phone size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden="true" />
                  <div>
                    <span>{phone.display}</span>
                    <div className="mt-1 flex gap-3 text-xs">
                      <a href={telHref(phone)} aria-label={`Call ${phone.display}`} className={linkClass}>
                        Call
                      </a>
                      {phone.whatsapp && (
                        <a
                          href={whatsAppHref(phone)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`WhatsApp ${phone.display}`}
                          className={linkClass}
                        >
                          WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <MapPin size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden="true" />
                <a
                  href={CONTACT.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${CONTACT.address}, open in Google Maps (opens in a new tab)`}
                  className={linkClass}
                >
                  {CONTACT.address}
                </a>
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
