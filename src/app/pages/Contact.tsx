import { motion } from "motion/react";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { CONTACT } from "../../config/site";

export function Contact() {
  usePageMeta("Contact", "Ready to start your project? Get in touch with Deepmagnam Integrated Solutions. We'd love to hear from you and will get back to you as soon as possible.");
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: CONTACT.email,
      link: `mailto:${CONTACT.email}`
    },
    {
      icon: Phone,
      title: "Phone",
      value: CONTACT.phoneDisplay,
      link: `tel:+${CONTACT.phoneDigits}`
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: `+${CONTACT.whatsappDigits}`,
      link: `https://wa.me/${CONTACT.whatsappDigits}`
    },
    {
      icon: MapPin,
      title: "Location",
      value: CONTACT.address,
      link: "#"
    }
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Ready to start your project? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Contact Information
              </h2>
              <p className="text-slate-700 text-lg mb-8">
                Have a question or ready to start a project? Reach out to us through any of these channels.
              </p>

              <div className="space-y-6 mb-12">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-emerald-500/50 transition-all duration-300 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <info.icon className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-semibold mb-1 group-hover:text-emerald-600 transition-colors">
                        {info.title}
                      </h3>
                      <p className="text-slate-600">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Office Hours */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-500/30 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="text-emerald-600" size={24} />
                  <h3 className="text-xl font-semibold text-slate-900">Office Hours</h3>
                </div>
                <div className="space-y-2 text-slate-700">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Message Us */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white border border-slate-200 rounded-2xl p-8 self-start"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Message Us Directly</h2>
              <p className="text-slate-600 text-lg mb-8">
                Tell us about your project on WhatsApp or by email and we'll get back to you as soon as possible.
              </p>
              <div className="space-y-4">
                <a
                  href={`https://wa.me/${CONTACT.whatsappDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-emerald-700 to-cyan-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-emerald-800 hover:to-cyan-800 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  Chat on WhatsApp
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="w-full border-2 border-emerald-700 text-emerald-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-50 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <Mail size={20} />
                  Send an Email
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden h-96 flex items-center justify-center"
          >
            <div className="text-center">
              <MapPin className="text-emerald-600 mx-auto mb-4" size={48} />
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">Visit Our Office</h3>
              <p className="text-slate-600">{CONTACT.address}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start Your Project Today
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Transform your ideas into reality with our expert team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:+${CONTACT.phoneDigits}`}
              className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300"
            >
              Call Us Now
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
