import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { testimonials } from "../data/mockData";
import { usePageMeta } from "../hooks/usePageMeta";

export function Testimonials() {
  usePageMeta("Testimonials", "Don't just take our word for it. Hear what our clients have to say about working with Deepmagnam Integrated Solutions.");
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
              Client Testimonials
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Don't just take our word for it - hear what our clients have to say
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { value: "98%", label: "Client Satisfaction" },
              { value: "150+", label: "Happy Clients" },
              { value: "200+", label: "Projects Delivered" },
              { value: "4.9/5", label: "Average Rating" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative rounded-lg border border-slate-200 bg-white p-8 shadow-sm transition-[background-color,border-color,box-shadow] duration-300 hover:border-emerald-500/50 hover:bg-emerald-50/60 hover:shadow-[0_0_32px_-4px_rgba(16,185,129,0.35)]"
              >
                {/* Quote Icon */}
                <div className="absolute top-8 right-8 opacity-10">
                  <Quote size={80} className="text-emerald-600" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-slate-700 text-lg mb-8 relative z-10">
                  "{testimonial.text}"
                </p>

                {/* Client Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    loading="lazy"
                    decoding="async"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500"
                  />
                  <div>
                    <h4 className="text-slate-900 font-semibold text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-emerald-600">{testimonial.role}</p>
                    <p className="text-slate-600 text-sm">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
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
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-slate-600">
              We've had the privilege of working with amazing companies
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "AutoTech Industries",
              "Digital Commerce Inc",
              "MedHealth Solutions",
              "InnovateMFG",
              "TechStart Ventures",
              "Global Machinery Co",
              "Smart Solutions Ltd",
              "Future Designs Inc"
            ].map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-center text-center rounded-lg border border-slate-200 bg-white p-8 shadow-sm transition-[background-color,border-color,box-shadow] duration-300 hover:border-emerald-500/50 hover:bg-emerald-50/60 hover:shadow-[0_0_32px_-4px_rgba(16,185,129,0.35)]"
              >
                <span className="text-slate-600 font-semibold">{company}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
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
              Success Stories
            </h2>
            <p className="text-xl text-slate-600">
              Real results from real partnerships
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                metric: "30%",
                description: "Reduction in production time through optimized mechanical designs",
                icon: "⚡"
              },
              {
                metric: "5x",
                description: "Increase in online sales after e-commerce platform launch",
                icon: "📈"
              },
              {
                metric: "90%",
                description: "Improvement in customer engagement with new mobile app",
                icon: "📱"
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center rounded-lg border border-slate-200 bg-white p-8 shadow-sm"
              >
                <div className="text-5xl mb-4">{story.icon}</div>
                <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                  {story.metric}
                </div>
                <p className="text-slate-700">{story.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join Our Happy Clients
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Experience the Deepmagnam Integrated Solutions difference. Let's create your success story together.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300"
          >
            Start Your Project
          </a>
        </div>
      </section>
    </div>
  );
}
