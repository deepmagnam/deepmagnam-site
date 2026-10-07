import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Users, Lightbulb, Zap, Award } from "lucide-react";
import { projects } from "../data/mockData";
import hero1Sm from "../../imports/hero-1-960.webp";
import hero1Lg from "../../imports/hero-1-1920.webp";
import hero2Sm from "../../imports/hero-2-960.webp";
import hero2Lg from "../../imports/hero-2-1920.webp";
import hero3Sm from "../../imports/hero-3-960.webp";
import hero3Lg from "../../imports/hero-3-1920.webp";
import { usePageMeta } from "../hooks/usePageMeta";
import { serviceIcons, type ServiceIconName } from "../data/serviceIcons";
import { SITE_DESCRIPTION } from "../../config/site";

// Widths are each source's real pixel width; nothing is upscaled. The first
// slide's srcset must match the preload injected by vite.config.ts.
const heroImages = [
  { src: hero1Lg, srcSet: `${hero1Sm} 960w, ${hero1Lg} 1920w` },
  { src: hero2Lg, srcSet: `${hero2Sm} 960w, ${hero2Lg} 1920w` },
  { src: hero3Lg, srcSet: `${hero3Sm} 960w, ${hero3Lg} 1920w` },
];
const HERO_SIZES = "100vw";

export function Home() {
  usePageMeta(null, SITE_DESCRIPTION);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loaded, setLoaded] = useState(() => heroImages.map(() => false));
  const firstHeroRef = useRef<HTMLImageElement>(null);
  const firstLoaded = loaded[0];

  const markLoaded = (index: number) =>
    setLoaded((prev) => (prev[index] ? prev : prev.map((v, i) => v || i === index)));

  // The first slide may already be complete (from the preload/cache) before
  // React attaches onLoad.
  useEffect(() => {
    if (firstHeroRef.current?.complete && firstHeroRef.current.naturalWidth > 0) markLoaded(0);
  }, []);

  // Only once the first slide has displayed: fetch the others in the
  // background, then start rotating. Each tick moves to the next slide only if
  // its image is ready, so a slow connection never fades to an empty frame.
  useEffect(() => {
    if (!firstLoaded) return;
    heroImages.slice(1).forEach((img, i) => {
      const pre = new Image();
      pre.decoding = "async";
      pre.sizes = HERO_SIZES;
      pre.srcset = img.srcSet;
      pre.src = img.src;
      pre.onload = () => markLoaded(i + 1);
    });
  }, [firstLoaded]);

  // Mirrors `loaded` for the interval callback without restarting the timer.
  const loadedRef = useRef(loaded);
  useEffect(() => {
    loadedRef.current = loaded;
  }, [loaded]);
  useEffect(() => {
    if (!firstLoaded) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const next = (prev + 1) % heroImages.length;
        return loadedRef.current[next] ? next : prev;
      });
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [firstLoaded]);

  const services: { name: string; icon: ServiceIconName; description: string }[] = [
    { name: "Mechanical Engineering", icon: "mechanical", description: "From 2D-3D conversion to complex assembly design" },
    { name: "Product Development", icon: "product", description: "Concept to prototype with DFM optimization" },
    { name: "Web Development", icon: "web", description: "Custom web apps and full-stack solutions" },
    { name: "E-Commerce", icon: "ecommerce", description: "Scalable online marketplaces and payment systems" },
    { name: "UI/UX Design", icon: "uiux", description: "Intuitive interfaces and optimized user experiences" },
    { name: "Specialized IT", icon: "it", description: "AI integration, SaaS, and custom business platforms" },
  ];

  const whyChooseUs = [
    { icon: Users, title: "Expert Team", description: "Skilled engineers and developers" },
    { icon: Lightbulb, title: "Innovation", description: "Cutting-edge solutions" },
    { icon: Zap, title: "Fast Delivery", description: "On-time project completion" },
    { icon: Award, title: "Quality Assured", description: "Industry standards compliance" },
  ];

  return (
    <div className="pt-[var(--nav-height)] bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        
        {/* Shuffle Background Images */}
        {/* initial={false}: the first slide shows as soon as it loads, with no fade-in delay */}
        <AnimatePresence initial={false}>
          {heroImages.map((img, index) => (
            currentImageIndex === index && (
              <motion.img
                key={index}
                ref={index === 0 ? firstHeroRef : undefined}
                src={img.src}
                srcSet={img.srcSet}
                sizes={HERO_SIZES}
                alt=""
                aria-hidden="true"
                // lowercase fetchpriority: React 18 has no fetchPriority prop
                {...(index === 0 ? { fetchpriority: "high" } : { decoding: "async" as const })}
                onLoad={() => markLoaded(index)}
                className="absolute inset-0 w-full h-full object-cover object-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            )
          ))}
        </AnimatePresence>

        {/* Animated background elements (adjusted for light theme readability on raw image) */}
        <div className="absolute inset-0 overflow-hidden mix-blend-overlay opacity-80 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{ duration: 25, repeat: Infinity }}
          />
        </div>

        {/* Dark overlay above the images and glow blobs. At 65% slate-950 even a
            pure-white image pixel ends up dark enough for white text to keep
            better than 4.5:1 contrast on every slide. */}
        <div className="absolute inset-0 bg-slate-950/65 pointer-events-none" />

        {/* Plain elements, no motion: the text paints on first render (it can
            be the LCP element), independent of the slide crossfades. */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance">
            Mechanical CAD Design &amp; Software Development
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-100 max-w-2xl mx-auto text-pretty">
            Engineering and software solutions for clients worldwide, from our studio in Coimbatore, India.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-700 to-cyan-700 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:from-emerald-800 hover:to-cyan-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Get a Quote
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Slogan band */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-balance">
            Engineering Ideas. Enabling Innovation.
          </h2>
          <p className="mt-4 text-lg md:text-xl text-slate-600 text-pretty">
            From product design and reverse engineering to digital solutions, we transform ideas into practical, scalable solutions.
          </p>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-xl text-slate-600">
              Comprehensive solutions for all your engineering and digital needs
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.icon];
              return (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to="/services"
                    className="group relative block h-full overflow-hidden rounded-lg border border-slate-200 bg-white p-8 shadow-sm transition-[background-color,border-color,box-shadow] duration-300 hover:border-emerald-500/50 hover:bg-emerald-50/60 hover:shadow-[0_0_32px_-4px_rgba(16,185,129,0.35)] outline-none focus-visible:border-emerald-500/50 focus-visible:bg-emerald-50/60 focus-visible:shadow-[0_0_32px_-4px_rgba(16,185,129,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-5 right-6 text-6xl font-bold leading-none text-emerald-700/10 select-none"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-700 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white group-focus-visible:bg-emerald-600 group-focus-visible:text-white">
                      <Icon
                        aria-hidden="true"
                        strokeWidth={1.75}
                        className="h-6 w-6 transition-transform duration-300 group-hover:rotate-[9deg] group-focus-visible:rotate-[9deg] motion-reduce:transition-none motion-reduce:group-hover:rotate-0 motion-reduce:group-focus-visible:rotate-0"
                      />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 text-slate-800 transition-colors group-hover:text-emerald-700 group-focus-visible:text-emerald-700">
                      {service.name}
                    </h3>
                    <p className="text-slate-600">{service.description}</p>
                  </Link>
                </motion.li>
              );
            })}
          </ol>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors text-lg font-semibold"
            >
              View All Services
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-slate-600">
              Explore our latest engineering and digital solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.slice(0, 4).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={450}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm font-medium text-emerald-600 mb-2">{project.category}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.slice(0, 3).map((tool, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-sm rounded-full font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300"
            >
              View Full Portfolio
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Why Choose Us
            </h2>
            <p className="text-xl text-slate-600">
              The advantages of partnering with Deepmagnam Integrated Solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full mb-4 shadow-md">
                  <item.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's Build Something Innovative Together
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Ready to transform your ideas into reality? Get in touch with our team today.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300"
          >
            Get Started Now
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}

