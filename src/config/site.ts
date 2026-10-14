// Also hard-coded in index.html, public/robots.txt and public/sitemap.xml; keep them in sync.
export const SITE_URL = "https://www.deepmagnam.in";

export const SITE_NAME = "Deepmagnam Integrated Solutions";

export const SITE_TITLE = "Deepmagnam Integrated Solutions | CAD & Software Development";

export const SITE_DESCRIPTION =
  "Mechanical CAD, FEA (ANSYS), reverse engineering, product development and machine design, plus websites, e-commerce, mobile apps and graphic design.";

// The Contact page and footer both read from here. The address, phones and
// email are also in the JSON-LD block in index.html.
export const CONTACT = {
  email: "deepmagnam@gmail.com",
  /**
   * All numbers are equal; list them in this order. Single CTAs use the first.
   * `digits` is digits only, with country code, for tel: and WhatsApp links.
   */
  phones: [
    { display: "+91 81369 04472", digits: "918136904472", whatsapp: true },
    { display: "+91 75400 01501", digits: "917540001501", whatsapp: true },
    { display: "+91 97894 39543", digits: "919789439543", whatsapp: true },
  ],
  address: "Venkateswara Colony, Pollachi, Tamil Nadu 642001, India",
  // Address search for now. Replace with the exact Google Maps pin share link
  // when available.
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Venkateswara+Colony%2C+Pollachi%2C+Tamil+Nadu+642001",
};

export type ContactPhone = (typeof CONTACT.phones)[number];

const WHATSAPP_MESSAGE =
  "Hi Deepmagnam, I found you through your website and would like to discuss a project.";

export const telHref = (phone: ContactPhone) => `tel:+${phone.digits}`;

export const whatsAppHref = (phone: ContactPhone) =>
  `https://wa.me/${phone.digits}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

// Also listed as sameAs in the JSON-LD block in index.html.
export const SOCIAL = {
  instagram: "https://www.instagram.com/deepmagnam/",
  linkedin: "https://www.linkedin.com/company/deepmagnam/",
  youtube: "https://www.youtube.com/@deepmagnamintegratedsolutions",
  x: "https://x.com/DEEPMAGNAM",
};
