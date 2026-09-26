import { Link } from "react-router";
import { Mail, Phone, MapPin, Linkedin, Github, Facebook } from "lucide-react";
import logoImage from "../../imports/logo-mark.webp";

function XLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={logoImage} 
                alt="Deepmagnam Integrated Solutions logo"
                loading="lazy"
                decoding="async"
                width={256}
                height={256}
                className="h-20 md:h-24 w-auto object-contain"
              />
              <h3 className="uppercase text-base md:text-sm font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Deepmagnam Integrated Solutions
              </h3>
            </div>
            <p className="text-slate-600 mb-4 text-sm font-medium tracking-wide">
              
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="LinkedIn" className="text-slate-500 hover:text-emerald-600 transition-colors">
                <Linkedin size={20} aria-hidden="true" />
              </a>
              <a href="#" aria-label="X (formerly Twitter)" className="text-slate-500 hover:text-emerald-600 transition-colors">
                <XLogo size={20} />
              </a>
              <a href="#" aria-label="GitHub" className="text-slate-500 hover:text-emerald-600 transition-colors">
                <Github size={20} aria-hidden="true" />
              </a>
              <a href="#" aria-label="Facebook" className="text-slate-500 hover:text-emerald-600 transition-colors">
                <Facebook size={20} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-900 font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-slate-600 hover:text-emerald-600 transition-colors font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-600 hover:text-emerald-600 transition-colors font-medium">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-slate-600 hover:text-emerald-600 transition-colors font-medium">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-emerald-600 transition-colors font-medium">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-slate-900 font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-slate-600 font-medium">Mechanical Design</li>
              <li className="text-slate-600 font-medium">Product Development</li>
              <li className="text-slate-600 font-medium">Web Development</li>
              <li className="text-slate-600 font-medium">E-Commerce Solutions</li>
              <li className="text-slate-600 font-medium">UI/UX & Design</li>
              <li className="text-slate-600 font-medium">Advanced CAD Services</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-slate-900 font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-slate-600 font-medium">
                <Mail size={18} className="mt-1 flex-shrink-0 text-emerald-600" />
                <span>info@deepmagnam.com</span>
              </li>
              <li className="flex items-start space-x-3 text-slate-600 font-medium">
                <Phone size={18} className="mt-1 flex-shrink-0 text-emerald-600" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3 text-slate-600 font-medium">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-emerald-600" />
                <span>123 Tech Street, Innovation City, IC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-12 pt-8 text-center text-slate-500 font-medium">
          <p>&copy; {currentYear} Deepmagnam Integrated Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
