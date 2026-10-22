import { motion } from "motion/react";
import { mechanicalServices, itServices } from "../data/servicesData";
import { ChevronRight } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { PAGE_META } from "../../config/pageMeta";

export function Services() {
  usePageMeta(PAGE_META["/services"]);
  return (
    <div>
      {/* Hero Section */}
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Deepmagnam Integrated Solutions provides professional-grade engineering and digital solutions, bridgeing the gap between physical design and digital excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mechanical Design Services */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Engineering Solutions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive CAD, product development, and prototyping services delivered with precision and technical expertise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mechanicalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white/40 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 hover:border-emerald-500/50 transition-all duration-300 group flex flex-col h-full"
                >
                  <div className="p-3 bg-emerald-500/10 rounded-lg w-fit mb-4 group-hover:bg-emerald-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {service.category}
                  </h3>
                  <ul className="space-y-2 flex-grow">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 group-hover:text-slate-700 transition-colors">
                        <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* IT Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              IT Services
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Scalable web applications, e-commerce platforms, and digital transformation strategies powered by modern technology stacks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {itServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white/40 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 group flex flex-col h-full"
                >
                  <div className="p-3 bg-cyan-500/10 rounded-lg w-fit mb-4 group-hover:bg-cyan-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-cyan-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-slate-900 group-hover:text-cyan-700 transition-colors">
                    {service.category}
                  </h3>
                  <ul className="space-y-2 flex-grow">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 group-hover:text-slate-700 transition-colors">
                        <ChevronRight className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Bring Your Vision to Life?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Whether it's a mechanical part or a complex digital platform, Deepmagnam Integrated Solutions has the expertise to deliver.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-50 transition-all duration-300 shadow-xl"
          >
            Start Your Project
          </a>
        </div>
      </section>
    </div>
  );
}

