import { motion } from "motion/react";
import { Target, Eye, Award, Users, Briefcase, Cpu } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";

export function About() {
  usePageMeta("About", "Deepmagnam Integrated Solutions: IT services and mechanical design engineering, bridging the gap between industrial precision and digital intelligence.");
  const stats = [
    { value: "200+", label: "Projects Completed", icon: Briefcase },
    { value: "150+", label: "Happy Clients", icon: Users },
    { value: "8+", label: "Years Experience", icon: Award },
  ];

  const team = [
    {
      name: "John Anderson",
      role: "Lead Mechanical Engineer",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
      bio: "15+ years in CAD design and product development",
    },
    {
      name: "Sarah Martinez",
      role: "Senior Software Architect",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
      bio: "Full-stack expert specializing in scalable web solutions",
    },
    {
      name: "David Kim",
      role: "UI/UX Design Director",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
      bio: "Creating beautiful and intuitive user experiences",
    },
    {
      name: "Emily Thompson",
      role: "Product Design Lead",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
      bio: "Innovative product design with manufacturing expertise",
    },
  ];

  const expertise = [
    {
      title: "Mechanical Engineering",
      icon: "⚙️",
      items: ["3D CAD Modeling", "Product Design", "Prototyping", "Manufacturing Drawings"],
    },
    {
      title: "Software Development",
      icon: "💻",
      items: ["Web Applications", "Mobile Apps", "Cloud Solutions", "API Integration"],
    },
    {
      title: "Digital Design",
      icon: "🎨",
      items: ["UI/UX Design", "Brand Identity", "Marketing Materials", "Visual Design"],
    },
  ];

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              About DEEPMAGNAM INTEGRATED SOLUTIONS
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto uppercase tracking-wider font-medium">
              IT Services & Mechanical Designs Engineering
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
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
                Our Story
              </h2>
              <p className="text-slate-700 text-lg mb-6">
                Founded in 2026, DeepMagnam emerged from a vision to bridge the gap between industrial precision and digital intelligence. Our multidisciplinary team, led by six specialized founders, brings together collective expertise in mechanical engineering, IT infrastructure, and cutting-edge software development.
              </p>
              <p className="text-slate-700 text-lg mb-6">
                We specialize in providing high-impact mechanical design solutions and agile digital technology services. By leveraging industry-leading engineering tools alongside modern software development practices, we empower businesses to transform complex concepts into streamlined mechanical designs and scalable digital products.
              </p>
              <p className="text-slate-700 text-lg">
                From intricate engineering components to enterprise-grade web applications, we deliver robust solutions across diverse sectors, including manufacturing, technology, and service-based industries. At DeepMagnam, we are committed to building the infrastructure of the future, one integrated solution at a time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-500/30 rounded-2xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-emerald-500/20 rounded-lg">
                  <Eye className="text-emerald-600" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Our Vision</h2>
              </div>
              <p className="text-slate-700 text-lg">
                To be the leading provider of integrated engineering and digital solutions,
                recognized for innovation, quality, and client success. We envision a future
                where mechanical precision and digital excellence seamlessly converge.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-cyan-50 to-white border border-cyan-500/30 rounded-2xl p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-cyan-500/20 rounded-lg">
                  <Target className="text-cyan-600" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
              </div>
              <p className="text-slate-700 text-lg">
                To deliver exceptional engineering designs and digital solutions that drive
                business growth. We combine technical expertise with creative problem-solving
                to transform complex challenges into elegant, efficient solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Our Expertise
            </h2>
            <p className="text-xl text-slate-600">
              Comprehensive capabilities across multiple domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertise.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white border border-slate-200 rounded-xl p-8 hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{area.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">{area.title}</h3>
                <ul className="space-y-3">
                  {area.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
                  <stat.icon className="text-slate-900" size={40} />
                </div>
                <div className="text-5xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-xl text-white/90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <p className="text-xl text-slate-600">
              Talented professionals driving innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-emerald-600 mb-2">{member.role}</p>
                <p className="text-slate-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
