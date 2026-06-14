import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const m = motion as any;

// Animation variants for smooth, hardware-accelerated transitions
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: delay,
      ease: [0.16, 1, 0.3, 1] // OutQuint for natural deceleration
    }
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15
    }
  }
};

// FAQ Item with smooth slide down and hover state
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-200/80 dark:border-zinc-800/80 transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-50 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 group"
      >
        <span className="pr-4 leading-snug group-hover:translate-x-1 transition-transform duration-300">{question}</span>
        <m.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-zinc-400 dark:text-zinc-500 group-hover:text-red-500 flex-shrink-0"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </m.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-3xl">
              {answer}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Stat card – custom styled, mobile & desktop optimized
const StatCard = ({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) => (
  <m.div
    variants={fadeUp}
    custom={delay}
    whileHover={{ y: -5, duration: 0.2 }}
    className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/40 backdrop-blur-md p-5 sm:p-6 text-center transition-all duration-300 shadow-sm hover:shadow-md hover:border-red-500/30 dark:hover:border-red-500/20"
  >
    <m.p
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay + 0.1, type: 'spring', stiffness: 180, damping: 15 }}
      className="text-3xl sm:text-4xl font-extrabold text-red-600 dark:text-red-500 tracking-tight"
    >
      {value}
    </m.p>
    <p className="mt-2 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 leading-none">
      {label}
    </p>
  </m.div>
);

// Service card – custom styled, mobile & desktop optimized
const ServiceCard = ({ title, desc, icon, delay = 0 }: { title: string; desc: string; icon: string; delay?: number }) => (
  <m.div
    variants={fadeUp}
    custom={delay}
    whileHover={{ y: -6 }}
    className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-950/40 backdrop-blur-md p-6 transition-all duration-300 shadow-sm hover:shadow-md hover:border-red-500/30 dark:hover:border-red-500/20"
  >
    <m.div
      initial={{ scale: 0.85, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay + 0.15, type: 'spring', damping: 12 }}
      className="text-3xl mb-4 text-red-600 dark:text-red-500 block"
    >
      {icon}
    </m.div>
    <h3 className="text-sm sm:text-base font-semibold uppercase tracking-tight text-zinc-900 dark:text-zinc-50">
      {title}
    </h3>
    <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
      {desc}
    </p>
  </m.div>
);

const SeoServices: React.FC = () => {
  return (
    <div className="bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 selection:bg-red-200 dark:selection:bg-red-800 overflow-x-hidden">
      <Header />

      <Helmet>
        <html lang="en-IN" />
        <title>SEO Services in India & UK | Search Engine Optimization – VGot You</title>
        <meta
          name="description"
          content="VGot You offers professional SEO services in India and the UK — helping businesses rank higher on Google, increase organic traffic, and generate quality leads through technical SEO, local SEO and content strategy."
        />
        <meta name="author" content="VGot You" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.vgotyou.com/seo-services" />
        <link rel="alternate" hrefLang="en-IN" href="https://www.vgotyou.com/seo-services" />
        <link rel="alternate" hrefLang="en-GB" href="https://www.vgotyou.com/seo-services-uk" />
        <link rel="alternate" hrefLang="x-default" href="https://www.vgotyou.com/seo-services" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="VGot You" />
        <meta property="og:title" content="SEO Services in India & UK | Search Engine Optimization – VGot You" />
        <meta property="og:description" content="Professional SEO services in India and the UK by VGot You — technical SEO, local SEO, e-commerce SEO and content strategy to improve Google rankings and drive organic growth." />
        <meta property="og:url" content="https://www.vgotyou.com/seo-services" />
        <meta property="og:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="SEO Services in India and UK – VGot You Search Engine Optimization" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:locale:alternate" content="en_GB" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SEO Services in India & UK | Search Engine Optimization – VGot You" />
        <meta name="twitter:description" content="Professional SEO services in India and the UK by VGot You — technical SEO, local SEO and content strategy to improve Google rankings and drive organic growth." />
        <meta name="twitter:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
        <meta name="twitter:site" content="@vgotyou" />
        <meta name="twitter:creator" content="@vgotyou" />
      </Helmet>

      <main>
        {/* ===== HERO – enhanced premium visual theme ===== */}
        <section className="relative overflow-hidden px-4 sm:px-6 pt-28 pb-16 sm:pt-32 sm:pb-24 md:pt-36 md:pb-32">
          {/* Enhanced Backdrop Gradients */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.08),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.16),transparent_60%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.06),transparent_50%)] bg-white dark:bg-[#09090b]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.01)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] -z-10" />

          <div className="mx-auto max-w-4xl text-center">
            <m.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <m.span
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
                className="inline-block rounded-full bg-red-100 dark:bg-red-950/50 border border-red-200/50 dark:border-red-900/40 px-4 py-1.5 text-[10px] sm:text-xs font-mono font-semibold tracking-wider text-red-700 dark:text-red-300"
              >
                VGot You SEO Protocol
              </m.span>
              <h1 className="mt-6 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none text-zinc-900 dark:text-zinc-50">
                Rank Higher,
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500 dark:from-red-500 dark:to-orange-400">Get More Leads.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                <span className="font-semibold text-zinc-900 dark:text-white">VGot You</span> is a results-driven search modernization engine. We help global hubs, manufacturers, and scale-ups align with modern crawl paradigms to convert intent into loyal organic acquisition.
              </p>
              
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-[180px] sm:w-[195px]">
                  <Link
                    to="/contact?message=Hi VGot You, I'm interested in your SEO services and would love a free audit."
                    className="block w-full inline-flex items-center justify-center bg-red-600 font-bold px-4 py-2.5 rounded-[10px] transition-all duration-300 text-[11px] sm:text-xs uppercase tracking-wider text-center text-white"
                  >
                    Request a free audit →
                  </Link>
                </m.div>
                <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-[160px] sm:w-[175px]">
                  <a
                    href="#services"
                    className="block w-full inline-flex items-center justify-center border border-zinc-250 dark:border-zinc-800 bg-white/50 dark:bg-black/30 backdrop-blur-sm font-semibold px-4 py-2.5 rounded-[10px] transition-all duration-300 hover:border-red-400 hover:text-red-600 text-[11px] sm:text-xs uppercase tracking-wider text-center text-zinc-700 dark:text-zinc-200"
                  >
                    Explore services
                  </a>
                </m.div>
              </div>
            </m.div>
          </div>
        </section>

        {/* ===== STATS ROW – staggered visual grid ===== */}
        <section className="px-4 sm:px-6 py-12 sm:py-16 bg-zinc-50/50 dark:bg-zinc-950/20 border-y border-zinc-100 dark:border-zinc-900">
          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="mx-auto max-w-7xl grid grid-cols-2 gap-4 lg:grid-cols-4"
          >
            <StatCard value="280%" label="Avg. Traffic Increase" delay={0} />
            <StatCard value="#1" label="Goal on Google" delay={0.1} />
            <StatCard value="14ms" label="Server Core Vitals" delay={0.2} />
            <StatCard value="94/100" label="Technical SEO Score" delay={0.3} />
          </m.div>
        </section>

        {/* ===== LOCAL SEO – vertically center-aligned layout ===== */}
        <section className="px-4 sm:px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
              
              {/* Text Side */}
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeUp}
                className="lg:col-span-7 order-2 lg:order-1 flex flex-col justify-center mt-8 lg:mt-0"
              >
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
                  Precision Authority Location
                </span>
                <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
                  SEO in Karur & Tamil Nadu
                </h2>
                <p className="mt-4 text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                  As the primary SEO company in Karur, we specialize in helping local businesses, exporters, and manufacturers rank for high-intent queries, expanding regional footprints to global proportions.
                </p>
                
                <m.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {[
                    { title: "GBP Domination", desc: "Push your enterprise directly to the Google Maps top 3." },
                    { title: "Local Intent Mapping", desc: "Gain massive visibility on geo-targeted 'near me' phrases." },
                    { title: "Structured Snippets", desc: "Rich schema integrations tailored for product listings." },
                    { title: "Authority Citations", desc: "Establish permanent regional search validation patterns." }
                  ].map((item, idx) => (
                    <m.div
                      key={item.title}
                      variants={fadeUp}
                      custom={idx * 0.15}
                      whileHover={{ y: -3 }}
                      className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-950/20 backdrop-blur-sm p-4 transition-all duration-300 hover:border-red-500/30 dark:hover:border-red-500/20 hover:shadow-xs"
                    >
                      <h3 className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-50">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </m.div>
                  ))}
                </m.div>
              </m.div>

              {/* Graphical Aspect Side (Lighter overlay, beautiful shadow glows) */}
              <m.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 order-1 lg:order-2 w-full flex justify-center relative aspect-square group"
              >
                {/* Visual Backdrop red Glow Glows */}
                <div className="absolute inset-0 bg-red-500/10 dark:bg-red-500/5 rounded-2xl blur-3xl transition duration-500 group-hover:blur-4xl group-hover:scale-105" />
                <div className="relative h-full w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-250/60 dark:border-zinc-800/70 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=2070&auto=format&fit=crop"
                    alt="Local SEO strategy"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-95 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/40 to-transparent" />
                </div>
              </m.div>

            </div>
          </div>
        </section>

        {/* ===== SERVICES GRID – grid-to-cols spacing aligned ===== */}
        <section id="services" className="px-4 sm:px-6 py-20 sm:py-28 bg-zinc-50/50 dark:bg-zinc-950/20 border-y border-zinc-100 dark:border-zinc-900">
          <div className="mx-auto max-w-7xl">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center max-w-2xl mx-auto"
            >
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
                Core Capabilities
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                Custom SEO Packages
              </h2>
              <p className="mt-4 text-zinc-500 dark:text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
                Carefully aligned strategies matching industry benchmarks to scale visibility.
              </p>
            </m.div>

            <m.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {[
                { title: "On-Page Metrics", desc: "Symphonic keywords adaptation and HTML structural mapping.", icon: "📄" },
                { title: "Technical Core", desc: "Indexation optimization, server response fixes, and Core Web Vitals refinement.", icon: "⚙️" },
                { title: "Content Engines", desc: "Data insights targeting user intent for regional positioning and industry authority.", icon: "🗺️" },
                { title: "Rich Snippets Schema", desc: "Microdata and JSON-LD modeling to establish visual prominence on SERPs.", icon: "📊" }
              ].map((s, idx) => (
                <ServiceCard key={s.title} {...s} delay={idx * 0.1} />
              ))}
            </m.div>
          </div>
        </section>

        {/* ===== NATIONAL & INTERNATIONAL – clean 3-col bento look ===== */}
        <section className="px-4 sm:px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-12 sm:gap-16 items-start">
              
              <m.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="lg:col-span-1 lg:sticky lg:top-24"
              >
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
                  Global Expansion Protocol
                </span>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
                  SEO Services India & UK
                </h2>
                <p className="mt-4 text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                  Overcoming geographic friction with advanced multilingual schemas and localized PR architectures to place export manufacturers directly before European and international buyers.
                </p>
                <m.div 
                  whileHover={{ x: 4 }} 
                  className="mt-6 sm:mt-8"
                >
                  <Link 
                    to="/web-design-india"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider border border-zinc-250 dark:border-zinc-800 hover:border-red-500 hover:text-red-600 transition bg-white dark:bg-black/50 text-zinc-700 dark:text-zinc-300 shadow-xs"
                  >
                    Explore our hub <span className="text-sm font-sans font-normal">→</span>
                  </Link>
                </m.div>
              </m.div>

              <m.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                {[
                  { title: "Subcontinent Ranking", desc: "Gain search authority on competitive generic categories across India.", icon: "🇮🇳" },
                  { title: "E-Commerce Velocity", desc: "Scale organic funnels for headless platforms and custom Shopify pipelines.", icon: "🛍️" },
                  { title: "B2B Export Bridges", desc: "Target custom international search variations in the UK, Europe, and UAE.", icon: "🌍" },
                  { title: "Permanent Link Graph", desc: "Genuine editorial mentions and PR placement to build lifelong domain authority.", icon: "🔗" }
                ].map((s, idx) => (
                  <ServiceCard key={s.title} {...s} delay={idx * 0.15} />
                ))}
              </m.div>

            </div>
          </div>
        </section>

        {/* ===== FAQ – accordions optimized ===== */}
        <section className="px-4 sm:px-6 py-20 sm:py-28 bg-zinc-50/50 dark:bg-zinc-950/20 border-t border-zinc-100 dark:border-zinc-900">
          <div className="mx-auto max-w-3xl">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-10 sm:mb-12"
            >
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
                Diagnostic Q&A
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                SEO Knowledge base
              </h2>
            </m.div>
            
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-1 divide-y divide-zinc-100 dark:divide-zinc-800"
            >
              <FAQItem
                question="How long does it take to see SEO results?"
                answer="SEO is an iterative structural build. While hyper-localized queries (Karur map pack) manifest initial movement in 1-3 months, competitive state-level or generic national categories commonly require 4-8 months to gain stable Page-1 acquisition."
              />
              <FAQItem
                question="Do you provide monthly SEO reports?"
                answer="Yes. We deliver clean, data-focused acquisition maps displaying crawl health, keyword trajectory changes, search impressions, backlink profile changes, and micro-conversion values under custom ROI formulas."
              />
              <FAQItem
                question="Can you help my Shopify store rank in India?"
                answer="Absolutely. We carry out structured collections mapping, rich snippet injections, custom product variants optimization, and fast headless rendering setups to feed crawl budget natively to Shopify platforms."
              />
            </m.div>
          </div>
        </section>

        {/* ===== FINAL CTA – premium layout visual card ===== */}
        <section className="px-4 sm:px-6 py-20 sm:py-28 relative overflow-hidden">
          <div className="mx-auto max-w-5xl relative z-10">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/25 backdrop-blur-md px-6 py-12 sm:py-20 text-center relative overflow-hidden group hover:border-red-500/30 transition-all duration-500"
            >
              {/* Subtle inner radial glow */}
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.06),transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.1),transparent_55%)]" />
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 max-w-2xl mx-auto leading-tight">
                Ready to elevate your <span className="text-red-600 dark:text-red-500">search presence?</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                Let's audit your website and craft a bespoke SEO protocol to drive qualified organic acquisition.
              </p>
              
              <m.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
              >
                <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-[180px] sm:w-[195px]">
                  <Link
                    to="/contact?message=Hi VGot You, I'm ready to elevate my search presence. Requesting an SEO audit."
                    className="block w-full inline-flex items-center justify-center bg-red-600 font-bold px-4 py-2.5 rounded-[10px] transition-all duration-300 text-[11px] sm:text-xs uppercase tracking-wider text-center text-white shadow-md shadow-red-500/10"
                  >
                    Request a free audit →
                  </Link>
                </m.div>
                <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-[160px] sm:w-[175px]">
                  <a
                    href="https://wa.me/917871120415?text=Hi%20VGot%20You%2C%20I%20need%20SEO%20services%20for%20my%20business."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full inline-flex items-center justify-center border border-zinc-250 dark:border-zinc-800 bg-white dark:bg-black/40 font-semibold px-4 py-2.5 rounded-[10px] transition-all duration-300 hover:border-red-500/30 text-[11px] sm:text-xs uppercase tracking-wider text-center text-zinc-700 dark:text-zinc-200 hover:text-red-600"
                  >
                    WhatsApp us
                  </a>
                </m.div>
              </m.div>
            </m.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SeoServices;
