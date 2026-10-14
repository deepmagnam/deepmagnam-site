import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "./site";

export type PageMeta = {
  /** `null` on the home page, which uses the full site title. */
  title: string | null;
  description: string;
};

// One entry per page. usePageMeta applies these in the browser, and the
// prerender (src/entry-server.tsx) writes them into each page's static HTML,
// which gets one file per key here.
export const PAGE_META = {
  "/": { title: null, description: SITE_DESCRIPTION },
  "/about": {
    title: "About",
    description:
      "Deepmagnam Integrated Solutions: IT services and mechanical design engineering, bridging the gap between industrial precision and digital intelligence.",
  },
  "/services": {
    title: "CAD & Software Services",
    description:
      "Outsourced CAD, FEA (ANSYS) and machine design, plus custom web and mobile apps, e-commerce and graphic design. One team for engineering and software.",
  },
  "/portfolio": {
    title: "Portfolio",
    description:
      "Explore our latest projects in mechanical design and digital solutions, from industrial equipment redesign to e-commerce platforms and web portals.",
  },
  "/technologies": {
    title: "Technologies",
    description:
      "Industry-leading tools we use: SolidWorks, AutoCAD, CATIA and Fusion 360 for mechanical design, and React, Next.js, Node.js and TypeScript for software.",
  },
  "/process": {
    title: "Process",
    description:
      "Our proven workflow: requirement analysis, concept design, development and modeling, testing and optimization, and final delivery.",
  },
  "/testimonials": {
    title: "Testimonials",
    description:
      "Don't just take our word for it. Hear what our clients have to say about working with Deepmagnam Integrated Solutions.",
  },
  "/contact": {
    title: "Contact",
    description:
      "Ready to start your project? Get in touch with Deepmagnam Integrated Solutions. We'd love to hear from you and will get back to you as soon as possible.",
  },
} satisfies Record<string, PageMeta>;

export const NOT_FOUND_META: PageMeta = {
  title: "Page Not Found",
  description: "The page you're looking for may have been moved or never existed.",
};

export const pageTitle = (title: string | null) => (title ? `${title} | ${SITE_NAME}` : SITE_TITLE);
