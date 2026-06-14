import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

// Icons (red accents)
const SparklesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l-2 2 2 2-2 2m4-6l2 2-2 2 2 2" />
  </svg>
);
const RocketIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);
const PenToolIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

// Logo data
const logos = [
  { id: 1, src: "/assets/arctictextiles.png", title: "Arctic Textiles", category: "Geometric" },
  { id: 2, src: "/assets/rudhraaexim.png", title: "Rudhraa Exports", category: "Organic" },
  { id: 3, src: "/assets/bloomgreen.png", title: "BloomGreen Developers", category: "Abstract" },
  { id: 4, src: "/assets/akshaya.png", title: "Akshaya Tours", category: "Minimalist" },
  { id: 5, src: "/assets/pixel.png", title: "Pixels", category: "Luxury" },
];

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as any } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const AccordionItem: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onClick: () => void }> = ({ title, children, isOpen, onClick }) => (
  <div className="border-b border-zinc-200 dark:border-zinc-800">
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center py-4 sm:py-5 text-left text-sm sm:text-base font-medium text-zinc-900 dark:text-zinc-100 hover:text-red-600 transition-colors"
    >
      <span className="pr-3">{title}</span>
      <motion.svg
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="w-5 h-5 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </motion.svg>
    </button>
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div className="pb-4 sm:pb-5 text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">{children}</div>
    </motion.div>
  </div>
);

const LogoDesign: React.FC = () => {
  const [activeLogo, setActiveLogo] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const whatsappMessage = encodeURIComponent(
    "Hello VGot You! I am interested in getting a professional logo designed for my business. Let's talk!"
  );

  const faqs = [
    { q: "Do you provide logo design services in Karur?", a: "Yes, VGot You is a logo design company based in Karur, offering professional logo and branding services tailored to local businesses and exporters." },
    { q: "Do you design logos for textile companies?", a: "Yes, we specialise in logo design for textile manufacturers and exporters across Tamil Nadu, understanding the industry's visual language." },
    { q: "Do you work with clients outside Tamil Nadu?", a: "Yes, we work with clients across India remotely, delivering high-quality branding nationwide." }
  ];

  return (
    <div className="bg-white dark:bg-black text-zinc-800 dark:text-zinc-200 selection:bg-red-200 dark:selection:bg-red-800 overflow-x-hidden">
      <Header />

      <Helmet>
        <html lang="en-IN" />
        <title>Logo Design Company in Karur | VGot You – Modern Branding</title>
        <meta name="description" content="Professional logo design services in Karur, Tamil Nadu. Custom branding for textile manufacturers, startups, and businesses across India. View our portfolio." />
        <link rel="canonical" href="https://www.vgotyou.com/logo-showcase" />
        <meta property="og:title" content="Logo Design Company in Karur | VGot You" />
        <meta property="og:description" content="Custom logo design and branding for businesses in Karur, Tamil Nadu and across India." />
        <meta property="og:image" content="https://www.vgotyou.com/assets/logo-designer.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <main>
        {/* ===== HERO – animated, not full screen ===== */}
        <section className="relative overflow-hidden px-4 sm:px-6 pt-28 pb-16 sm:pt-32 sm:pb-28">
          <motion.div style={{ y: backgroundY }} className="absolute inset-0 -z-10 bg-gradient-to-br from-red-50/30 via-white to-amber-50/20 dark:from-red-950/20 dark:via-black dark:to-amber-950/10" />
          
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-block rounded-[10px] bg-red-100 dark:bg-red-950/50 px-3 py-1 text-xs font-mono font-medium text-red-700 dark:text-red-300"
              >
                VGot You Studio
              </motion.span>
              <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                Logo Design in
                <span className="block text-red-600">Karur & Tamil Nadu</span>
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mx-auto mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-400 sm:text-lg"
              >
                We create custom, memorable logos that build trust and recognition for businesses — from local startups to established exporters.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-col items-center sm:flex-row justify-center gap-3 sm:gap-4"
              >
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={`https://wa.me/917871120415?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[180px] sm:w-[195px] inline-flex items-center justify-center bg-red-600 font-bold px-4 py-2.5 rounded-[10px] transition-all duration-300 text-[11px] sm:text-xs uppercase tracking-wider text-center text-white"
                >
                  Start a project
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#portfolio"
                  className="w-[160px] sm:w-[175px] inline-flex items-center justify-center border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black font-semibold px-4 py-2.5 rounded-[10px] transition-all duration-300 hover:border-red-400 hover:text-red-600 dark:text-zinc-200 text-[11px] sm:text-xs uppercase tracking-wider text-center text-zinc-700"
                >
                  View portfolio
                </motion.a>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-xs text-zinc-500"
              >
                Trusted by 100+ businesses across India
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ===== WHY IT MATTERS ===== */}
        <section className="px-4 sm:px-6 py-16 bg-zinc-50 dark:bg-zinc-950/50">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="order-2 md:order-1"
              >
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">Why it matters</span>
                <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Your logo is your first impression</h2>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                  In competitive markets like Karur, a professional logo helps you stand out, build credibility, and communicate quality instantly.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {["Instant recognition", "Builds trust", "Professional edge", "Consistent branding"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <span className="text-red-500">✓</span> {item}
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1 md:order-2 flex justify-center"
              >
                <div className="w-64 h-64 rounded-[10px] bg-gradient-to-br from-red-100 to-amber-100 dark:from-red-950/40 dark:to-amber-950/40 flex items-center justify-center">
                  <img src="https://www.vgotyou.com/assets/logo.png" alt="VGot You logo" className="w-48 h-48 object-contain opacity-90 invert dark:invert-0 transition-all duration-500" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== SERVICES ===== */}
        <section className="px-4 sm:px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center max-w-2xl mx-auto"
            >
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">Services</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">What we offer</h2>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[
                { title: "Custom Logo Design", desc: "Original concepts tailored to your brand DNA." },
                { title: "Textile Industry Focus", desc: "Specialised designs for Karur's textile sector." },
                { title: "Startup Packages", desc: "Affordable branding for new ventures." },
                { title: "Corporate Identity", desc: "Full brand systems for established companies." },
                { title: "Logo Redesign", desc: "Modernise your existing logo while retaining equity." },
                { title: "Brand Guidelines", desc: "Consistent usage rules for all platforms." }
              ].map((service, idx) => (
                <motion.div
                  key={service.title}
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  className="rounded-[10px] border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-md transition-all"
                >
                  <div className="h-10 w-10 rounded-[10px] bg-red-100 dark:bg-red-950/30 flex items-center justify-center text-red-600 mb-4">
                    <SparklesIcon />
                  </div>
                  <h3 className="text-lg font-bold">{service.title}</h3>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{service.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== PORTFOLIO GALLERY ===== */}
        <section id="portfolio" className="px-4 sm:px-6 py-20 bg-zinc-50 dark:bg-zinc-950/30">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-12"
            >
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">Portfolio</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Recent work</h2>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {logos.map((logo, idx) => (
                <motion.div
                  key={logo.id}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  onMouseEnter={() => setActiveLogo(logo.id)}
                  onMouseLeave={() => setActiveLogo(null)}
                  className="group rounded-[10px] bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  <div className="aspect-square p-8 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50">
                    <img src={logo.src} alt={logo.title} className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4 border-t border-zinc-100 dark:border-zinc-800">
                    <h3 className="font-bold">{logo.title}</h3>
                    <p className="text-xs text-red-600">{logo.category}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== PROCESS ===== */}
        <section className="px-4 sm:px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-12"
            >
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">Process</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">How we work</h2>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-4 sm:grid-cols-5"
            >
              {["Discovery", "Concepts", "Refine", "Feedback", "Deliver"].map((step, i) => (
                <motion.div
                  key={step}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  className="text-center p-4 rounded-[10px] border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="text-2xl font-black text-red-600/60">0{i+1}</div>
                  <p className="mt-2 text-sm font-medium">{step}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== REGIONAL FOCUS (Karur) ===== */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="px-4 sm:px-6 py-20 bg-red-600 text-white"
        >
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Based in Karur, serving Tamil Nadu & India</h2>
            <p className="mt-4 max-w-2xl mx-auto text-red-100">
              We understand the local business landscape — from textile mills to modern startups. Get a logo that resonates with your audience.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {["Karur", "Chennai", "Coimbatore", "Madurai", "Bangalore", "Mumbai"].map(city => (
                <span key={city} className="px-3 py-1 rounded-full bg-white/20 text-sm">{city}</span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ===== FAQ ===== */}
        <section className="px-4 sm:px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-10"
            >
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">FAQ</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight">Common questions</h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-0"
            >
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  title={faq.q}
                  isOpen={openFaq === idx}
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  {faq.a}
                </AccordionItem>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section className="px-4 sm:px-6 py-20 border-t border-zinc-200 dark:border-zinc-800">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl text-center"
          >
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Ready to build your brand?</h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">Let's create a logo that leaves a lasting impression.</p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mt-8 flex flex-col items-center sm:flex-row justify-center gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`https://wa.me/917871120415?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[180px] sm:w-[195px] inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-[10px] transition-all duration-300 text-[11px] sm:text-xs uppercase tracking-wider"
              >
                Get a free quote
              </motion.a>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-[160px] sm:w-[175px]">
                <Link
                  to="/contact"
                  className="block w-full inline-flex items-center justify-center border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black font-semibold px-4 py-2.5 rounded-[10px] transition-all duration-300 hover:border-red-400 hover:text-red-600 dark:text-zinc-200 text-[11px] sm:text-xs uppercase tracking-wider text-center text-zinc-700"
                >
                  Contact us
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LogoDesign;