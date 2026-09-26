import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { processSteps } from "../data/mockData";
import { usePageMeta } from "../hooks/usePageMeta";

export function Process() {
  usePageMeta("Process", "Our proven workflow: requirement analysis, concept design, development and modeling, testing and optimization, and final delivery.");
  return (
    <div className="pt-20">
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Our Process
            </h1>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto">
              A proven workflow that ensures quality, efficiency, and client satisfaction
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Timeline - Desktop */}
      <section className="py-24 bg-slate-50 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 transform -translate-y-1/2" />
            
            {/* Process Steps */}
            <div className="relative grid grid-cols-5 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex flex-col items-center"
                >
                  {/* Icon Circle */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 w-24 h-24 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-lg shadow-emerald-500/50"
                  >
                    {step.icon}
                  </motion.div>
                  
                  {/* Step Number */}
                  <div className="text-emerald-600 font-bold text-lg mb-2">
                    Step {step.id}
                  </div>
                  
                  {/* Content Card */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6 text-center hover:border-emerald-500/50 transition-all duration-300">
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps - Mobile/Tablet */}
      <section className="py-24 bg-slate-50 lg:hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-cyan-500 to-blue-500" />
            
            {/* Process Steps */}
            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex gap-8"
                >
                  {/* Icon Circle */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/50"
                  >
                    {step.icon}
                  </motion.div>
                  
                  {/* Content Card */}
                  <div className="flex-1 bg-white border border-slate-200 rounded-xl p-6 hover:border-emerald-500/50 transition-all duration-300">
                    <div className="text-emerald-600 font-bold text-sm mb-2">
                      Step {step.id}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Benefits */}
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
              Why Our Process Works
            </h2>
            <p className="text-xl text-slate-600">
              Benefits of our structured approach
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🎯",
                title: "Clear Direction",
                description: "Well-defined goals and milestones keep projects on track"
              },
              {
                icon: "🤝",
                title: "Collaboration",
                description: "Constant communication ensures alignment with your vision"
              },
              {
                icon: "⚡",
                title: "Efficiency",
                description: "Streamlined workflow reduces time and costs"
              },
              {
                icon: "✅",
                title: "Quality Assurance",
                description: "Rigorous testing at every stage ensures excellence"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                What to Expect When Working With Us
              </h2>
              <div className="space-y-6">
                {[
                  "Dedicated project manager assigned to your project",
                  "Regular progress updates and milestone reviews",
                  "Transparent communication through your preferred channels",
                  "Flexible approach to accommodate changing requirements",
                  "Complete documentation and training support",
                  "Post-delivery support and maintenance options"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mt-1">
                      <ArrowRight className="text-slate-900" size={14} />
                    </div>
                    <p className="text-slate-700 text-lg">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                alt="Team working"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Let's discuss how our proven process can bring your vision to life
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300"
          >
            Get Started Today
          </a>
        </div>
      </section>
    </div>
  );
}
