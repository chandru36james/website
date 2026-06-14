import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

// Animation variants
const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const TechnicalBadge = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <span className={`inline-block px-3 py-1 rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/50 text-[8px] md:text-[9px] font-mono tracking-[0.3em] uppercase text-red-600 dark:text-red-400 ${className}`}>
    {children}
  </span>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-200 dark:border-zinc-805">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left text-zinc-900 dark:text-white hover:text-red-600 transition-colors"
      >
        <span className="text-sm md:text-base font-semibold pr-4">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-red-600 flex-shrink-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-zinc-650 dark:text-zinc-400 text-sm leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const WebDesignKarur: React.FC = () => {
  const sectors = [
    { name: "Textile Exports", code: "TX-01" },
    { name: "Bus Coachworks", code: "BC-02" },
    { name: "Paper & TNPL", code: "PA-03" },
    { name: "Financial Hubs", code: "FH-04" }
  ];

  return (
    <div className="bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 selection:bg-red-200 dark:selection:bg-red-800 overflow-x-hidden transition-colors duration-300">
      <Header />
      <Helmet>
        <html lang="en-IN" />
        <title>Web Design Company in Karur | VGot You – Tamil Nadu</title>
        <meta name="description" content="VGot You is a leading web design company in Karur, Tamil Nadu offering custom, responsive, and SEO-optimised websites for textile exporters, MSME businesses, and startups." />
        <meta name="author" content="VGot You" />
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Karur" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.vgotyou.com/web-design-karur" />
        <link rel="alternate" hrefLang="en-IN" href="https://www.vgotyou.com/web-design-karur" />
        <link rel="alternate" hrefLang="en-GB" href="https://www.vgotyou.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.vgotyou.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="VGot You" />
        <meta property="og:title" content="Web Design Company in Karur | VGot You – Tamil Nadu" />
        <meta property="og:description" content="VGot You is a leading web design company in Karur, Tamil Nadu offering custom, responsive, and SEO-optimised websites for textile exporters, MSME businesses, and startups." />
        <meta property="og:url" content="https://www.vgotyou.com/web-design-karur" />
        <meta property="og:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Web Design Company in Karur | VGot You – Tamil Nadu" />
        <meta name="twitter:description" content="Leading web design company in Karur, Tamil Nadu. Custom, SEO-optimised websites for textile exporters, MSME businesses and startups." />
        <meta name="twitter:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Web Design Company in Karur",
            "description": "Professional web design services in Karur, Tamil Nadu.",
            "url": "https://www.vgotyou.com/web-design-karur",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.vgotyou.com/" },
                { "@type": "ListItem", "position": 2, "name": "Web Design", "item": "https://www.vgotyou.com/web-design-india" },
                { "@type": "ListItem", "position": 3, "name": "India", "item": "https://www.vgotyou.com/web-design-india" },
                { "@type": "ListItem", "position": 4, "name": "Tamil Nadu", "item": "https://www.vgotyou.com/web-design-tamil-nadu" },
                { "@type": "ListItem", "position": 5, "name": "Karur", "item": "https://www.vgotyou.com/web-design-karur" }
              ]
            }
          })}
        </script>
      </Helmet>

      <main>
        {/* Hero Section – Reduced mobile height with higher padding-top to clear header, darker overlay, smoother animations */}
        <section className="relative px-4 sm:px-6 pt-24 pb-6 md:pt-24 md:pb-16 overflow-hidden bg-white dark:bg-black">
  <img
    src="/assets/karur.jpg"
    alt="Karur"
    className="absolute inset-0 w-full h-full object-cover"
  />

          {/* Darker overlay – stronger contrast */}
          <div className="absolute inset-0 bg-black/75 dark:bg-black/85 transition-colors duration-300" />
          <div className="absolute inset-0 bg-gradient-to-br from-red-50/10 via-transparent to-transparent dark:from-red-950/20 dark:via-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#dc2626_0.5px,_transparent_0.5px)] [background-size:24px_24px] opacity-[0.04] dark:opacity-[0.06] pointer-events-none" />

          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[10px] bg-red-50/90 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 mb-3 md:mb-4 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                  </span>
                  <span className="text-[10px] font-mono tracking-wider text-red-700 dark:text-red-300 uppercase">Karur — Textile Hub of Tamil Nadu</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.2] mb-3 md:mb-4">
                  Digital craft for
                  <span className="block text-red-500">global makers.</span>
                </h1>

                <p className="text-sm md:text-base text-zinc-200 dark:text-zinc-300 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed">
                  Bespoke websites for textile exporters, spinning mills, and industrial leaders — built right here in Karur, trusted worldwide.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-5 md:mb-6">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-[170px] sm:w-[195px]">
                    <Link
                      to="/contact?message=Hi VGot You, I'm interested in professional web design services for my Karur-based business."
                      className="block w-full inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-[10px] transition-all duration-300 text-[11px] sm:text-xs uppercase tracking-wider text-center"
                    >
                      Start a project
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-[150px] sm:w-[175px]">
                    <Link
                      to="/portfolio"
                      className="block w-full inline-flex items-center justify-center border border-white/40 hover:border-white/70 bg-transparent backdrop-blur-sm font-semibold px-4 py-2.5 rounded-[10px] transition-all duration-300 hover:bg-white/10 text-white text-[11px] sm:text-xs uppercase tracking-wider text-center"
                    >
                      See our work
                    </Link>
                  </motion.div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-3 border-t border-white/20">
                  <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-wider">Presence:</span>
                  {["Chennai", "Mumbai", "Bangalore", "Coimbatore", "Karur"].map((city) => (
                    <Link
                      key={city}
                      to={`/web-design-${city.toLowerCase().replace(" hq", "")}`}
                      className={`text-xs font-medium transition ${
                        city === "Karur"
                          ? "text-red-500 font-bold"
                          : "text-zinc-200 hover:text-white"
                      }`}
                    >
                      {city}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-20 md:py-28 px-4 sm:px-6 bg-zinc-50 dark:bg-zinc-950/30 border-y border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
          <div className="container mx-auto max-w-4xl text-center">
            <TechnicalBadge className="mb-4">Local Leadership</TechnicalBadge>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-zinc-900 dark:text-white">Web Design Services in Karur</h2>
            <p className="text-zinc-600 dark:text-zinc-300 text-base md:text-lg leading-relaxed">
              We build professional websites for Karur businesses including textile exporters, manufacturers, and retail leaders. Our websites are designed to generate enquiries, build trust, and rank on Google with peak technical SEO.
            </p>
          </div>
        </section>

        {/* SEO Section */}
        <section className="py-20 md:py-28 px-4 sm:px-6 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black transition-colors duration-300">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1">
                <TechnicalBadge>Diagnostic_Log</TechnicalBadge>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-4 mb-8 leading-none text-zinc-900 dark:text-white">
                  SEO <br /> Domination.
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-8">
                  As a leading <strong className="font-bold text-zinc-800 dark:text-zinc-200">SEO service in Karur</strong>, we build marketing engines that rank for terms that drive B2B growth, helping textile exporters reach new global markets through specialized online search visibility.
                </p>
                <Link
                  to="/web-design-tamil-nadu"
                  className="font-mono text-[9px] font-bold text-red-600 dark:text-red-400 hover:text-zinc-900 dark:hover:text-white transition uppercase tracking-[0.3em] inline-flex items-center gap-3"
                >
                  Tamil_Nadu_Network
                  <span className="w-6 h-[1px] bg-red-600 dark:bg-red-400" />
                </Link>
              </div>

              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { t: "Market Search Visibility", d: "Targeting 'Karur textile exporters' and 'Best web designers' to place your brand in front of global decision-makers.", code: "MKT-SEO" },
                  { t: "Efficient Online Delivery", d: "Our 100% remote workflow means we build and deploy your project with total digital transparency.", code: "REMOTE-X" },
                  { t: "Export Protocol", d: "Digital catalog systems designed for international textile buyers with instant inquiry tools.", code: "EXP-PR" },
                  { t: "Rapid Scaling", d: "High-speed deployment ensuring your Karur business goes live and starts ranking faster.", code: "SPEED" }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-6 border border-zinc-200 dark:border-zinc-805 bg-white dark:bg-black rounded-[10px] group hover:border-red-300 transition"
                  >
                    <span className="font-mono text-[8px] text-zinc-500 block mb-4">[{item.code}]</span>
                    <h3 className="text-base font-bold uppercase mb-3 text-zinc-900 dark:text-white">{item.t}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blueprint */}
        <section className="py-20 md:py-28 px-4 sm:px-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/30 transition-colors duration-300">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <TechnicalBadge>Market_Integration</TechnicalBadge>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-4 text-zinc-900 dark:text-white">Karur Industry Focus</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {sectors.map((sector, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="relative p-6 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black rounded-[10px] flex flex-col items-center text-center group transition"
                >
                  <span className="font-mono text-[8px] text-zinc-500 mb-2">{sector.code}</span>
                  <h4 className="text-sm md:text-base font-bold uppercase tracking-tight text-zinc-700 dark:text-zinc-300 group-hover:text-red-650 transition">{sector.name}</h4>
                  <div className="mt-4 font-mono text-[10px] font-bold text-red-600">
                    REMOTE_READY
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Showcase */}
        <section className="py-20 md:py-28 px-4 sm:px-6 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black transition-colors duration-300">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row items-center gap-24">
              <div className="flex-1 order-2 lg:order-1">
                <div className="relative aspect-[16/10] rounded-[10px] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl group bg-white dark:bg-black">
                  <img
                    referrerPolicy="no-referrer"
                    src="https://www.vgotyou.com/assets/arctic.png"
                    alt="Arctic Textiles website design – Karur textile exporter case study by VGot You"
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-black via-transparent to-transparent opacity-60 pointer-events-none" />
                  <div className="absolute bottom-6 left-6 flex flex-col pointer-events-none">
                    <TechnicalBadge className="w-fit mb-2">Project: Arctic_Textiles_Archive</TechnicalBadge>
                    <span className="font-mono text-[10px] uppercase font-bold text-zinc-900 dark:text-white tracking-widest">Global_Export_Node</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 order-1 lg:order-2">
                <TechnicalBadge>Portfolio_Insight</TechnicalBadge>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-4 mb-8 leading-none text-zinc-900 dark:text-white">Global Standards, <br /> Online Excellence.</h2>
                <p className="text-zinc-650 dark:text-zinc-400 text-sm md:text-base leading-relaxed mb-10">
                  We've partnered with Karur manufacturing leaders to build B2B digital showrooms that connect factory floor quality directly to the international stage—all through our streamlined virtual consultation and development model.
                </p>
                <div className="grid grid-cols-2 gap-8 border-t border-zinc-200 dark:border-zinc-800 pt-10">
                  <div>
                    <span className="font-mono text-[8px] text-zinc-500 uppercase block mb-1">Service_Satisfaction</span>
                    <span className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white">100%</span>
                  </div>
                  <div>
                    <span className="font-mono text-[8px] text-zinc-500 uppercase block mb-1">Global_Node_Uptime</span>
                    <span className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white">99.9%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 md:py-28 px-4 sm:px-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/30 transition-colors duration-300">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-16">
              <TechnicalBadge>Cluster_Nodes</TechnicalBadge>
              <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mt-4 text-zinc-900 dark:text-white">Regional Success Archives</h2>
              <p className="text-zinc-650 dark:text-zinc-400 mt-4 text-sm max-w-2xl">Deep dives into how we scale Karur's local icons into global digital authorities.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Global Export Growth",
                  desc: "Learn how we built the technical architecture for Arctic Textiles to reach European and Asian buyers.",
                  link: "/blog/arctic-textiles",
                  label: "Read Case Study"
                },
                {
                  title: "Local Brand Authority",
                  desc: "Strategic guide on moving from word-of-mouth to a trusted online authority in the Karur manufacturing belt.",
                  link: "/blog/from-local-brand-to-online-authority",
                  label: "View Strategy"
                }
              ].map((caseStudy, i) => (
                <div key={i} className="p-8 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black rounded-[10px] flex flex-col justify-between min-h-[220px] group transition duration-300">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold uppercase text-zinc-900 dark:text-white mb-4 group-hover:text-red-500 transition leading-tight">{caseStudy.title}</h3>
                    <p className="text-zinc-650 dark:text-zinc-400 text-xs leading-relaxed mb-6">{caseStudy.desc}</p>
                  </div>
                  <Link to={caseStudy.link} className="inline-flex items-center gap-4 font-mono text-[9px] font-bold text-zinc-900 dark:text-zinc-200 uppercase tracking-[0.3em] hover:text-red-650 transition">
                    {caseStudy.label}
                    <div className="w-8 h-[1px] bg-zinc-200 dark:bg-zinc-800 group-hover:w-12 group-hover:bg-red-600 transition-all" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Register */}
        <section className="py-20 md:py-28 px-4 sm:px-6 relative bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-805 transition-colors duration-300">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <TechnicalBadge>Protocol_List</TechnicalBadge>
                <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mt-4 text-zinc-900 dark:text-white">Online <span className="text-zinc-405">Capabilities</span></h2>
              </div>
              <p className="text-zinc-505 dark:text-zinc-400 font-mono text-[8px] uppercase tracking-widest leading-loose text-right hidden lg:block border-l border-zinc-200 dark:border-zinc-800 pl-8">
                // NO_STOREFRONT_REQUIRED <br />
                // MSME_PROTOCOL_READY <br />
                // REMOTE_ONLY_OPERATIONS
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { t: "Export Catalogs", d: "High-conversion digital catalogs designed for Karur textile exporters.", code: "EC-01" },
                { t: "Shopify Solutions", d: "Complete online store setups handled entirely through digital collaboration.", code: "SH-02" },
                { t: "Strategic SEO", d: "Technical analysis and keyword targeting to help your brand rank nationally.", code: "SF-03" },
                { t: "Visual Forging", d: "Modern logo design and branding services provided through our online laboratory.", code: "IL-04" },
                { t: "Content Creation", d: "Editing and creative direction to make your existing textile assets look world-class.", code: "PS-05" },
                { t: "Terminal Support", d: "24/7 technical assistance for your digital assets from our remote support nodes.", code: "SM-06" }
              ].map((s, i) => (
                <div key={i} className="p-8 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black hover:border-red-300 rounded-[10px] transition group">
                  <span className="font-mono text-[8px] text-zinc-500 mb-6 block group-hover:text-red-600 transition-colors">[{s.code}]</span>
                  <h3 className="text-lg md:text-xl font-bold uppercase mb-4 text-zinc-900 dark:text-white group-hover:text-red-500 transition">{s.t}</h3>
                  <p className="text-zinc-650 dark:text-zinc-400 text-xs leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Regional Hub Connection Link */}
        <section className="py-12 px-4 sm:px-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/30 transition-colors duration-300">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 border border-zinc-200 dark:border-zinc-800 p-12 rounded-[10px] bg-white dark:bg-black transition-colors duration-300 text-center md:text-left">
              <div>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 text-zinc-900 dark:text-white">Regional Expansion</h2>
                <p className="text-zinc-600 dark:text-zinc-450 text-xs md:text-sm uppercase tracking-widest font-mono">Scaling digital growth across the entire Southern network.</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                  <Link to="/web-design-chennai" className="font-mono text-[9px] text-zinc-500 dark:text-zinc-400 hover:text-red-500 transition uppercase tracking-widest">Chennai &rarr;</Link>
                  <Link to="/web-design-coimbatore" className="font-mono text-[9px] text-zinc-500 dark:text-zinc-400 hover:text-red-500 transition uppercase tracking-widest">Coimbatore &rarr;</Link>
                  <Link to="/web-design-bangalore" className="font-mono text-[9px] text-zinc-500 dark:text-zinc-400 hover:text-red-500 transition uppercase tracking-widest">Bangalore &rarr;</Link>
                </div>
              </div>
              <Link to="/web-design-tamil-nadu" className="group flex items-center gap-6 font-mono text-xs font-bold uppercase tracking-[0.4em] text-red-600 hover:text-zinc-900 dark:hover:text-white transition">
                Tamil Nadu Hub
                <div className="w-16 h-[1px] bg-red-600 group-hover:w-24 group-hover:bg-zinc-900 dark:group-hover:bg-zinc-100 transition-all" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-28 px-4 sm:px-6 relative bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <TechnicalBadge>Diagnostic_QA</TechnicalBadge>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-4 text-zinc-900 dark:text-white">Service FAQ</h2>
            </div>

            <div className="space-y-1">
              <FAQItem
                question="How do I start a project if you are an online service?"
                answer="Starting is easy. You can contact us via WhatsApp or our online form. We then schedule a video call to discuss your vision and requirements, providing a full digital proposal within 24 hours."
              />
              <FAQItem
                question="Do you provide maintenance for Karur textile websites?"
                answer="Yes, our ongoing support packages are specifically designed for manufacturers, ensuring your international inquiry portals stay online and perform at 100% efficiency."
              />
              <FAQItem
                question="Can you handle large-scale e-commerce projects remotely?"
                answer="Absolutely. Our entire development pipeline is built for remote collaboration. We use shared staging environments where you can review progress in real-time from anywhere."
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 sm:px-6 py-20 md:py-32 text-center bg-gradient-to-b from-red-50/20 to-transparent dark:from-red-950/10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-[10px] font-mono text-red-650 font-bold uppercase tracking-[0.4em] mb-6">Action_Matrix: National_Deployment</div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white mb-8">
              Elevate Your <span className="text-red-600">Karur Brand.</span>
            </h2>
            <Link
              to="/contact?message=Hi VGot You, I'm interested in starting a project for my business in Karur."
              className="inline-block rounded-[10px] bg-red-650 px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-red-500 transition"
            >
              Get Started →
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WebDesignKarur;
