import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { projects } from "../data/mockData";
import { usePageMeta } from "../hooks/usePageMeta";
import { PAGE_META } from "../../config/pageMeta";

export function Portfolio() {
  usePageMeta(PAGE_META["/portfolio"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isModalOpen = selectedProject !== null;

  // Modal behaviour: lock body scroll, move focus into the dialog, trap Tab,
  // close on Escape, and return focus to the card that opened it.
  useEffect(() => {
    if (!isModalOpen) return;

    const trigger = document.activeElement as HTMLElement | null;
    const { overflow, paddingRight } = document.body.style;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setSelectedProject(null);
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || !dialogRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !dialogRef.current.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      trigger?.focus();
    };
  }, [isModalOpen]);

  const categories = ["All", "Mechanical Design", "Web Development", "Mobile Apps", "CRM Systems", "Graphic Design"];

  // Keep the active filter centred in the mobile scroll row. Scrolls only the
  // row itself (not scrollIntoView) so the page never jumps vertically.
  const filterScrollerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scroller = filterScrollerRef.current;
    const active = scroller?.querySelector<HTMLElement>(`[data-category="${selectedCategory}"]`);
    if (!scroller || !active || scroller.scrollWidth <= scroller.clientWidth) return;
    scroller.scrollTo({
      left: active.offsetLeft - (scroller.clientWidth - active.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [selectedCategory]);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="pt-[var(--nav-height)]">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Our Portfolio
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Explore our latest projects in mechanical design and digital solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section: always one row. Centred when it fits, swipeable when it
          doesn't, so the bar height stays constant at every width. Only sticks
          when the viewport is tall enough (not on landscape phones). */}
      <section className="py-3 md:py-6 bg-slate-50 [@media(min-height:500px)]:sticky top-[var(--nav-offset)] z-40 transition-[top] duration-300 motion-reduce:transition-none border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={filterScrollerRef}
            className="relative flex justify-center-safe gap-3 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-px-4 sm:scroll-px-6 lg:scroll-px-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                data-category={category}
                aria-pressed={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 snap-start whitespace-nowrap px-4 md:px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/50"
                    : "bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-haspopup="dialog"
                  aria-label={`View project details: ${project.title}`}
                  className="group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300"
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
                    <div className="text-sm text-emerald-600 mb-2">{project.category}</div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.slice(0, 3).map((tool, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white text-slate-700 text-xs rounded-full"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-600 text-xl">No projects found in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-50 border border-slate-200 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-slate-50 border-b border-slate-200 p-6 flex items-center justify-between z-10">
                <h2 id="project-modal-title" className="text-2xl font-bold text-slate-900">{selectedProject.title}</h2>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project details"
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  <X className="text-slate-600" size={24} aria-hidden="true" />
                </button>
              </div>

              <div className="p-6">
                <div className="aspect-video overflow-hidden rounded-xl mb-6">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={450}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold text-emerald-600 mb-3">Project Overview</h3>
                    <p className="text-slate-700 mb-4">{selectedProject.description}</p>
                    <div className="mb-4">
                      <span className="text-sm text-slate-600">Category:</span>
                      <span className="ml-2 px-3 py-1 bg-white text-emerald-600 text-sm rounded-full">
                        {selectedProject.category}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-cyan-700 mb-3">Tools & Technologies</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProject.tools.map((tool, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-white text-slate-700 rounded-lg"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">Problem Statement</h3>
                    <p className="text-slate-700">{selectedProject.problem}</p>
                  </div>

                  <div className="bg-white rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">Solution Delivered</h3>
                    <p className="text-slate-700">{selectedProject.solution}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
