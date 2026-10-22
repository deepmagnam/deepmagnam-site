import { useEffect } from "react";
import { motion } from "motion/react";
import { Link, useLocation } from "react-router";
import { ArrowLeft } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { NOT_FOUND_META } from "../../config/pageMeta";

export function NotFound() {
  usePageMeta(NOT_FOUND_META);
  const location = useLocation();

  useEffect(() => {
    // The prerendered 404.html already has this tag; a client-side visit adds it.
    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      robots.content = "noindex";
      document.head.appendChild(robots);
    }
    return () => robots.remove();
  }, []);

  return (
    <div>
      <section className="relative pt-[calc(var(--nav-height)+8rem)] pb-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 top-[var(--nav-height)] opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-500 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="text-8xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              404
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Page Not Found
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
              We couldn't find {/* 404.html is prerendered at a stand-in path; React swaps in the real one. */}
              <span className="font-mono text-emerald-400 break-all" suppressHydrationWarning>{location.pathname}</span>.
              It may have been moved or never existed.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
