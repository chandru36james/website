import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProjectCarousel from '../components/common/CarouselManual';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as any } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const WebDesign: React.FC = () => {
  // Data
  const services = [
    { name: 'Business Website', desc: 'SME & corporate presence', accent: 'bg-amber-500' },
    { name: 'E‑commerce', desc: 'High‑conversion stores', accent: 'bg-emerald-500' },
    { name: 'Landing Page', desc: 'Campaign focused', accent: 'bg-red-500' },
    { name: 'B2B Portal', desc: 'Lead generation engine', accent: 'bg-indigo-500' },
    { name: 'Redesign', desc: 'Modernisation & speed', accent: 'bg-sky-500' },
    { name: 'UI/UX', desc: 'Figma to frontend', accent: 'bg-purple-500' }
  ];

  const process = [
    'Discovery & audit',
    'Wireframing (Figma)',
    'Design & development',
    'SEO + performance tuning',
    'Launch & support'
  ];

  const tech = ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Figma', 'Shopify', 'Node.js'];

  return (
    <div className="bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 selection:bg-red-200 dark:selection:bg-red-800 overflow-x-hidden">
      <Header />

      <Helmet>
        <html lang="en" />
        <title>Web Design | VGot You – Digital Products That Perform</title>
        <meta
          name="description"
          content="VGot You delivers high‑performance, custom websites for global businesses. Fast, SEO‑ready, and built to convert."
        />
        <meta property="og:title" content="Web Design | VGot You" />
        <meta property="og:description" content="Custom websites that scale with your business." />
        <meta property="og:image" content="https://www.vgotyou.com/assets/og-web.jpg" />
      </Helmet>

      <main className="relative">
        {/* ===== HERO ===== */}
        <section className="relative isolate overflow-hidden bg-white dark:bg-black px-4 sm:px-6 pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-block rounded-[10px] bg-red-50 dark:bg-red-950/40 px-3 py-1 text-xs font-mono font-medium uppercase tracking-wider text-red-600 dark:text-red-400"
              >
                VGot You Studio
              </motion.span>

              <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Web Design That
                <span className="block text-red-600">Performs & Converts</span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mx-auto mt-6 max-w-2xl text-base text-zinc-600 dark:text-zinc-400 sm:text-lg"
              >
                Custom, fast, and SEO‑optimised websites for businesses worldwide. 
                From startups to enterprises — we build digital experiences that scale.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-[180px] sm:w-[195px]">
                  <Link
                    to="/contact?message=Hi VGot You, I'd like a free consultation for my website."
                    className="block w-full inline-flex items-center justify-center bg-red-600 font-bold px-4 py-2.5 rounded-[10px] transition-all duration-300 text-[11px] sm:text-xs uppercase tracking-wider text-center text-white"
                  >
                    Start a project
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-[160px] sm:w-[175px]">
                  <Link
                    to="#services"
                    className="block w-full inline-flex items-center justify-center border border-zinc-300 bg-white font-semibold px-4 py-2.5 rounded-[10px] transition-all duration-300 hover:border-red-300 hover:text-red-600 dark:border-zinc-700 dark:bg-black dark:text-zinc-200 text-[11px] sm:text-xs uppercase tracking-wider text-center"
                  >
                    Explore services
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex flex-col items-center gap-4"
              >
                <p className="text-xs text-zinc-500 dark:text-zinc-550 font-mono tracking-widest uppercase">
                  Trusted by 100+ businesses globally
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 mt-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-650">We Serve:</span>
                  <Link
                    to="/web-design-india"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-700 hover:text-red-650 dark:text-zinc-300 dark:hover:text-red-400 transition-all bg-zinc-55/60 dark:bg-zinc-900/40 hover:bg-red-50/50 dark:hover:bg-red-950/10 px-3 py-1.5 rounded-[10px] border border-zinc-100 dark:border-zinc-800/80 active:scale-95"
                  >
                    <span>🇮🇳</span> India
                  </Link>
                  <Link
                    to="/web-design-uk"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-700 hover:text-red-650 dark:text-zinc-300 dark:hover:text-red-400 transition-all bg-zinc-55/60 dark:bg-zinc-900/40 hover:bg-red-50/50 dark:hover:bg-red-950/10 px-3 py-1.5 rounded-[10px] border border-zinc-100 dark:border-zinc-800/80 active:scale-95"
                  >
                    <span>🇬🇧</span> United Kingdom
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ===== SERVICES SECTION ===== */}
        <section id="services" className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center max-w-2xl mx-auto"
            >
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">/ services</span>
              <h2 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Expertise that delivers</h2>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400">Tailored solutions for every business stage.</p>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {services.map((s, i) => (
                <motion.div
                  key={s.name}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="group relative rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-6 transition-all hover:shadow-md"
                >
                  <div className={`absolute top-4 right-4 h-2 w-2 rounded-full ${s.accent}`} />
                  <h3 className="text-xl font-bold tracking-tight">{s.name}</h3>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{s.desc}</p>
                  <div className="mt-4 text-2xl opacity-20 group-hover:opacity-100 transition">→</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== FEATURE SHOWCASE ===== */}
        <section className="relative overflow-hidden bg-zinc-50 dark:bg-zinc-950 py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">/ e‑commerce & b2b</span>
                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Built to convert, engineered to scale</h2>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                  We blend conversion‑centric design with bulletproof performance. Our stores and portals load fast, rank well, and turn visitors into customers.
                </p>
                <ul className="mt-6 space-y-2">
                  {['Optimised checkout flows', 'Mobile‑first responsive', 'SEO architecture included', 'Analytics & heatmaps'].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-red-500 text-lg">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative z-10 rounded-[10px] border-4 border-white dark:border-black shadow-xl overflow-hidden">
                  <img src="https://www.vgotyou.com/assets/data.png" alt="dashboard" className="w-full transition-all duration-500" />
                </div>
                <div className="absolute -bottom-6 -left-6 z-0 h-48 w-48 rounded-[10px] bg-gradient-to-tr from-red-600 to-amber-500 opacity-20 blur-2xl" />
                <div className="absolute -top-6 -right-6 z-0 h-32 w-32 rounded-[10px] bg-gradient-to-bl from-indigo-600 to-sky-500 opacity-20 blur-2xl" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== CAROUSEL ===== */}
        <div className="border-y border-zinc-100 dark:border-zinc-800 bg-white dark:bg-black py-16">
          <ProjectCarousel />
        </div>

        {/* ===== PROCESS TIMELINE ===== */}
        <section className="px-4 sm:px-6 py-20 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center"
            >
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">/ methodology</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">How we build</h2>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5"
            >
              {process.map((step, idx) => (
                <motion.div
                  key={step}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  className="relative rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-4 text-center group hover:border-red-300 transition"
                >
                  <div className="text-2xl font-black text-red-600/40 group-hover:text-red-600 transition">0{idx + 1}</div>
                  <p className="mt-2 text-sm font-medium">{step}</p>
                  {idx < process.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-zinc-300 dark:text-zinc-700">→</div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== PORTFOLIO MINI GRID ===== */}
        <section id="work" className="bg-zinc-50 dark:bg-zinc-950 px-4 sm:px-6 py-20 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end text-center sm:text-left gap-4 mb-12">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">/ recent launches</span>
                <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Websites we're proud of</h2>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} className="w-full sm:w-auto">
                <Link to="/portfolio" className="inline-block rounded-[10px] border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm transition hover:border-red-400 hover:text-red-600">
                  View all →
                </Link>
              </motion.div>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6"
            >
              {[
                { title: 'BloomGreen – landing page', img: '/assets/bloomgreen_home.png', result: '+300% conv.' },
                { title: 'Arctic – brand portfolio', img: '/assets/arctic.png', result: '2x inquiries' }
              ].map(project => (
                <motion.div
                  key={project.title}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  className="group rounded-[10px] bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm"
                >
                  <div className="aspect-video overflow-hidden">
                    <img src={project.img} alt={project.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg">{project.title}</h3>
                    <p className="mt-1 text-sm text-red-600">{project.result}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== TECH STACK ===== */}
        <section className="px-4 sm:px-6 py-20">
          <div className="mx-auto max-w-7xl text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">/ toolchain</span>
              <h2 className="mt-2 text-3xl font-black tracking-tight">Modern stack, modern results</h2>
            </motion.div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-10 flex flex-wrap justify-center gap-3"
            >
              {tech.map((t, idx) => (
                <motion.span
                  key={t}
                  variants={fadeUp}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-[10px] bg-zinc-100 dark:bg-zinc-900 px-4 py-2 text-sm font-mono font-medium"
                >
                  {t}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section className="relative isolate overflow-hidden bg-red-600 px-4 sm:px-6 py-20 sm:py-32 text-white">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_70%)]" />
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-black tracking-tight sm:text-5xl">Launch your next website</h2>
              <p className="mt-4 text-base sm:text-lg text-red-100">
                Stop settling for slow, outdated sites. Let's build a digital asset that works for you.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-[180px] sm:w-[195px]">
                  <Link
                    to="/contact?message=Hi VGot You, let's build a website."
                    className="block w-full inline-flex items-center justify-center bg-white text-red-600 font-bold px-4 py-2.5 rounded-[10px] transition-all duration-300 text-[11px] sm:text-xs uppercase tracking-wider text-center"
                  >
                    Get a free quote →
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-[160px] sm:w-[175px]">
                  <a
                    href="https://wa.me/917871120415?text=Hi%20VGot%20You%2C%20I%20need%20a%20website."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full inline-flex items-center justify-center border border-white/30 text-white font-semibold px-4 py-2.5 rounded-[10px] transition-all duration-300 hover:bg-white/10 text-[11px] sm:text-xs uppercase tracking-wider text-center"
                  >
                    WhatsApp us
                  </a>
                </motion.div>
              </div>
              <p className="mt-6 text-xs text-red-200">No obligation, just a conversation.</p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WebDesign;