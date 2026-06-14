import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

// Animation variants – smoother easing
const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2, ease: "easeOut" } }
};

const TechnicalBadge = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <span className={`inline-block px-3 py-1 rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/50 text-[8px] md:text-[9px] font-mono tracking-[0.3em] uppercase text-red-600 dark:text-red-400 ${className}`}>
    {children}
  </span>
);

const MetricBlock = ({ label, value, sub }: { label: string; value: string; sub: string }) => (
  <motion.div variants={fadeUp} className="text-center">
    <span className="text-[10px] font-mono text-red-600 dark:text-red-400 uppercase tracking-wider">{label}</span>
    <p className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mt-1 mb-0.5">{value}</p>
    <span className="text-[9px] font-mono text-zinc-500 dark:text-zinc-400 uppercase">{sub}</span>
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left text-zinc-900 dark:text-white hover:text-red-600 transition-colors"
      >
        <span className="text-sm md:text-base font-semibold pr-4">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const WebDesignIndia: React.FC = () => {
  const hubs = [
    "Tamil Nadu", "Karnataka", "Kerala", "Maharashtra", "Delhi NCR", "Telangana", "Andhra Pradesh", "Gujarat", "West Bengal"
  ];

  return (
    <div className="bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 selection:bg-red-200 dark:selection:bg-red-800 overflow-x-hidden transition-colors duration-300">
      <Header />

      <Helmet>
        <html lang="en-IN" />
        <title>Web Design Company in India | VGot You – Karur, Tamil Nadu</title>
        <meta
          name="description"
          content="VGot You is a leading web design company in India offering custom, responsive, and SEO-optimised websites for startups, MSMEs, exporters and enterprises. Based in Karur, Tamil Nadu, serving clients nationwide."
        />
        <meta name="author" content="VGot You" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.vgotyou.com/web-design-india" />
        <link rel="alternate" hrefLang="en-IN" href="https://www.vgotyou.com/web-design-india" />
        <link rel="alternate" hrefLang="en-GB" href="https://www.vgotyou.com/web-design-uk" />
        <link rel="alternate" hrefLang="x-default" href="https://www.vgotyou.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="VGot You" />
        <meta property="og:title" content="Web Design Company in India | VGot You – Karur, Tamil Nadu" />
        <meta property="og:description" content="VGot You is a leading web design company in India offering custom, responsive, and SEO-optimised websites for startups, MSMEs, exporters and enterprises. Based in Karur, Tamil Nadu." />
        <meta property="og:url" content="https://www.vgotyou.com/web-design-india" />
        <meta property="og:image" content="https://www.vgotyou.com/assets/web-designer.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Web Design Company in India – VGot You, Karur Tamil Nadu" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:locale:alternate" content="en_GB" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Web Design Company in India | VGot You – Karur, Tamil Nadu" />
        <meta name="twitter:description" content="Leading web design company in India. Custom, SEO-optimised websites for startups, MSMEs, exporters and enterprises. Based in Karur, Tamil Nadu." />
        <meta name="twitter:image" content="https://www.vgotyou.com/assets/web-designer.png" />
        <meta name="twitter:site" content="@vgotyou" />
        <meta name="twitter:creator" content="@vgotyou" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://www.vgotyou.com/web-design-india#webpage",
            "url": "https://www.vgotyou.com/web-design-india",
            "name": "Web Design Company in India | VGot You – Karur, Tamil Nadu",
            "description": "Leading web design company in India offering custom, responsive, and SEO-optimised websites for startups, MSMEs, exporters and enterprises across all major cities and states.",
            "inLanguage": "en-IN",
            "isPartOf": { "@id": "https://www.vgotyou.com/#website" },
            "publisher": { "@id": "https://www.vgotyou.com/#organization" },
            "about": { "@id": "https://www.vgotyou.com/web-design-india#service" }
          }
        `}</script>
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://www.vgotyou.com/web-design-india#service",
            "name": "Web Design Services in India",
            "url": "https://www.vgotyou.com/web-design-india",
            "description": "Professional website design and development services across India — offering responsive, SEO-optimised, and conversion-focused websites for startups, MSMEs, exporters and enterprises.",
            "serviceType": ["Web Design", "Website Development", "UI UX Design", "Responsive Web Design", "E-commerce Website Design", "SEO-Optimised Web Design", "Startup Website Design", "Corporate Website Development", "Lead Generation Website Design", "MSME Website Design India"],
            "provider": { "@id": "https://www.vgotyou.com/#localbusiness" },
            "areaServed": [
              { "@type": "Country", "name": "India" },
              { "@type": "State", "name": "Tamil Nadu" },
              { "@type": "State", "name": "Karnataka" },
              { "@type": "State", "name": "Kerala" },
              { "@type": "State", "name": "Maharashtra" },
              { "@type": "State", "name": "Telangana" },
              { "@type": "State", "name": "Andhra Pradesh" },
              { "@type": "State", "name": "Gujarat" },
              { "@type": "State", "name": "West Bengal" }
            ]
          }
        `}</script>
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "What are the web design costs in India?", "acceptedAnswer": { "@type": "Answer", "text": "Web design costs in India are bespoke and depend on the project's unique scope, custom features, and special integrations. We provide tailored, transparent, fixed-price quotes on request." } },
              { "@type": "Question", "name": "Can an Indian web design agency handle international projects?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. VGot You specialises in building websites for Indian exporters and manufacturers that meet global design and performance standards, ensuring you look world-class to international buyers." } },
              { "@type": "Question", "name": "How do you handle SEO for Indian businesses?", "acceptedAnswer": { "@type": "Answer", "text": "We implement a multi-layered SEO strategy including technical optimisation, schema markup, and keyword-focused content that targets both national keywords and city-level queries." } },
              { "@type": "Question", "name": "Do you provide website maintenance services in India?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we offer comprehensive 24/7 technical support and maintenance packages for businesses across India to ensure high uptime, security updates, and performance optimisation." } }
            ]
          }
        `}</script>
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.vgotyou.com/" },
              { "@type": "ListItem", "position": 2, "name": "Web Design", "item": "https://www.vgotyou.com/web-design" },
              { "@type": "ListItem", "position": 3, "name": "India", "item": "https://www.vgotyou.com/web-design-india" }
            ]
          }
        `}</script>
      </Helmet>

      <main>
        {/* Hero Section – Reduced mobile height with higher padding-top to clear header, darker overlay, smoother animations */}
        <section className="relative px-4 sm:px-6 pt-24 pb-6 md:pt-24 md:pb-16 overflow-hidden bg-white dark:bg-black">
  <img
    src="/assets/india.avif"
    alt="India"
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
                  <span className="text-[10px] font-mono tracking-wider text-red-700 dark:text-red-300 uppercase">India — Global Digital Frontier</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.2] mb-3 md:mb-4">
                  Bespoke digital
                  <span className="block text-red-500">India experience.</span>
                </h1>

                <p className="text-sm md:text-base text-zinc-200 dark:text-zinc-300 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed">
                  India’s highest-rated bespoke design studio — engineering high-converting customer pathways, elegant visual architecture, and absolute brand prestige.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-5 md:mb-6">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-[170px] sm:w-[195px]">
                    <Link
                      to="/contact?message=Hi VGot You, I'm interested in starting a custom bespoke web design project with you."
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
                      className="text-xs font-medium text-zinc-200 hover:text-white transition"
                    >
                      {city}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Metrics Row */}
        <section className="px-4 sm:px-6 py-12 bg-zinc-50 dark:bg-zinc-950/30 border-y border-zinc-100 dark:border-zinc-800">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              <MetricBlock label="Global Reach" value="50+" sub="Deployed Nodes" />
              <MetricBlock label="Experience" value="2+" sub="Years Expertise" />
              <MetricBlock label="Authority" value="4.9/5" sub="Client Rating" />
              <MetricBlock label="Performance" value="99.9%" sub="System Uptime" />
            </motion.div>
          </div>
        </section>

        {/* Strategic Intelligence */}
        <section className="px-4 sm:px-6 py-20 md:py-28 bg-white dark:bg-black">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-12">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <TechnicalBadge>Global_Standard</TechnicalBadge>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mt-4 mb-6 text-zinc-900 dark:text-white">
                  India's <br /> Digital Advantage.
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                  In India’s fast-paced digital economy, your website is your most powerful asset. We deliver world-class website design that combines affordable pricing with global quality standards.
                </p>
                <Link
                  to="/web-design-tamil-nadu"
                  className="inline-flex items-center gap-2 text-sm font-mono font-bold text-red-600 hover:text-red-500 transition"
                >
                  Tamil Nadu Node →
                </Link>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="md:col-span-2 grid sm:grid-cols-2 gap-5"
              >
                {[
                  { t: "Global Design Standards", d: "Merging Indian market insights with international UI/UX trends.", code: "GLB-STD" },
                  { t: "Mobile-First Infrastructure", d: "Optimized for 5G speed and every mobile viewport.", code: "MOB-NET" },
                  { t: "MSME Powerhouse", d: "Custom solutions designed to scale Indian MSMEs and exporters.", code: "MSME-X" },
                  { t: "SEO Domination", d: "Technical SEO to rank for national and local search queries.", code: "NAT-SEO" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    whileHover={{ y: -4 }}
                    className="p-6 rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black hover:border-red-300 transition"
                  >
                    <span className="text-[10px] font-mono text-red-600 block mb-3">[{item.code}]</span>
                    <h3 className="text-base font-bold uppercase mb-2">{item.t}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.d}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="px-4 sm:px-6 py-20 md:py-28 bg-zinc-50 dark:bg-zinc-950/30">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-12"
            >
              <TechnicalBadge>Success_Archives</TechnicalBadge>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-4 text-zinc-900 dark:text-white">National Impact Cases</h2>
              <p className="text-zinc-600 dark:text-zinc-400 mt-3 max-w-2xl">Examining how we scale Indian businesses through specialized web architecture and SEO frameworks.</p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6"
            >
              {[
                { title: "B2B Manufacturing Scale", desc: "Scaling Indian textile exporters for global buyers through technical SEO.", link: "/blog/arctic-textiles", label: "Read Case Study" },
                { title: "E-commerce Optimization", desc: "Building a high-performance D2C textile brand with custom checkout.", link: "/blog/vesa-homes-ecommerce", label: "Explore Architecture" },
                { title: "Strategic Brand Authority", desc: "Transforming local service providers into national authorities.", link: "/blog/from-local-brand-to-online-authority", label: "View Strategy" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="p-6 rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black hover:border-red-300 transition flex flex-col h-full"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">{item.desc}</p>
                  </div>
                  <Link to={item.link} className="inline-flex items-center gap-2 text-sm font-mono font-bold text-red-600 hover:text-red-500 transition">
                    {item.label} →
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Sector Expertise */}
        <section className="px-4 sm:px-6 py-20 md:py-28 bg-white dark:bg-black">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <TechnicalBadge>Industry_E-E-A-T</TechnicalBadge>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-4 text-zinc-900 dark:text-white">Verified Sector Expertise</h2>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">B2B_PROTOCOL_V4.0</span>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { name: "Textile Exports", projects: "12+ Live", icon: "🧵" },
                { name: "Real Estate", projects: "8+ Live", icon: "🏠" },
                { name: "E-commerce", projects: "15+ Live", icon: "🛒" },
                { name: "Manufacturing", projects: "10+ Live", icon: "🏭" },
                { name: "Healthcare", projects: "5+ Live", icon: "🏥" },
                { name: "Edu-Tech", projects: "4+ Live", icon: "🎓" },
                { name: "Logistics", projects: "6+ Live", icon: "🚛" },
                { name: "Startups", projects: "20+ Live", icon: "🚀" }
              ].map((sector, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  className="p-5 rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black text-center hover:border-red-300 transition"
                >
                  <span className="text-2xl mb-2 block">{sector.icon}</span>
                  <h4 className="font-bold text-sm uppercase tracking-wide">{sector.name}</h4>
                  <span className="text-[10px] font-mono text-red-600">{sector.projects}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* City Nodes */}
        <section className="px-4 sm:px-6 py-20 md:py-28 bg-zinc-50 dark:bg-zinc-950/30">
          <div className="container mx-auto max-w-6xl text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-12"
            >
              <TechnicalBadge>City_Nodes</TechnicalBadge>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-4 text-zinc-900 dark:text-white">Major Digital Hubs</h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            >
              {[
                { name: "Chennai", link: "/web-design-chennai" },
                { name: "Coimbatore", link: "/web-design-coimbatore" },
                { name: "Bangalore", link: "/web-design-bangalore" },
                { name: "Mumbai", link: "/web-design-mumbai" }
              ].map((city, i) => (
                <motion.div key={i} variants={fadeUp} whileHover={{ scale: 1.02 }}>
                  <Link
                    to={city.link}
                    className="block p-5 rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black hover:border-red-300 transition text-center"
                  >
                    <span className="text-sm font-medium uppercase tracking-wide">{city.name}</span>
                    <div className="mt-2 h-px w-0 mx-auto bg-red-500 group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Regional Hubs (tag cloud) */}
        <section className="px-4 sm:px-6 py-20 md:py-28 bg-white dark:bg-black">
          <div className="container mx-auto max-w-6xl text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-10"
            >
              <TechnicalBadge>Regional_Integration</TechnicalBadge>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-4 text-zinc-900 dark:text-white">Serving Every Hub</h2>
              <p className="text-zinc-600 dark:text-zinc-400 mt-3">Connecting national business centers through digital excellence.</p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3"
            >
              {hubs.map((hub, i) => (
                <motion.span
                  key={i}
                  variants={fadeUp}
                  whileHover={{ scale: 1.05, borderColor: "#dc2626" }}
                  className="px-4 py-2 rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-red-600 transition cursor-default"
                >
                  {hub}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Services Capabilities */}
        <section className="px-4 sm:px-6 py-20 md:py-28 bg-zinc-50 dark:bg-zinc-950/30">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <TechnicalBadge>Service_Array</TechnicalBadge>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-4 text-zinc-900 dark:text-white">Indian <span className="text-zinc-400">Capabilities</span></h2>
              </div>
              <div className="text-right text-[10px] font-mono text-zinc-500 uppercase tracking-wider hidden md:block">
                // PAN_INDIA_SUPPORT<br />// STARTUP_FOCUSED
              </div>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {[
                { t: "Business Web Design", d: "Professional corporate websites that build trust and authority.", code: "CORP-01" },
                { t: "E-commerce Dev", d: "High-conversion online stores with Shopify, WooCommerce, or custom Next.js.", code: "SHOP-02" },
                { t: "UI/UX Engineering", d: "User-centric interfaces optimized for engagement and conversion.", code: "UX-03" },
                { t: "SEO Mastery", d: "Strategic optimisation to rank for national and local keywords.", code: "SEO-04" },
                { t: "Startup Identity", d: "Complete branding and digital architecture for new ventures.", code: "STRT-05" },
                { t: "Lead Gen Portals", d: "Conversion-focused layouts that turn traffic into enquiries.", code: "LEAD-06" }
              ].map((s, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black hover:border-red-300 transition"
                >
                  <span className="text-[10px] font-mono text-red-600 block mb-3">[{s.code}]</span>
                  <h3 className="text-base font-bold uppercase mb-2">{s.t}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{s.d}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 sm:px-6 py-20 md:py-28 bg-white dark:bg-black">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-10">
              <TechnicalBadge>Diagnostic_QA</TechnicalBadge>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mt-4 text-zinc-900 dark:text-white">India Web Services FAQ</h2>
              <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm">Resolving common digital queries for Indian enterprises.</p>
            </div>
            <div className="space-y-1">
              <FAQItem question="What are the web design costs in India?" answer="Web design costs in India are bespoke and depend on the project's unique scope, custom features, and special integrations. We provide tailored, transparent, fixed-price quotes on request." />
              <FAQItem question="Can an Indian web design agency handle international projects?" answer="Absolutely. VGot You specializes in building websites for Indian exporters and manufacturers that meet global design and performance standards, ensuring you look world-class to international buyers." />
              <FAQItem question="How do you handle SEO for Indian businesses?" answer="We implement a multi-layered SEO strategy including technical optimization, schema markup, and keyword-focused content that targets both national keywords and city-level queries." />
              <FAQItem question="Do you provide website maintenance services in India?" answer="Yes, we offer comprehensive 24/7 technical support and maintenance packages for businesses across India to ensure high uptime, security updates, and performance optimization." />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 sm:px-6 py-20 md:py-32 text-center bg-gradient-to-b from-red-50/20 to-transparent dark:from-red-950/10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-[10px] font-mono text-red-600 font-bold uppercase tracking-[0.4em] mb-6">Action_Matrix: National_Deployment</div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white mb-8">
              Elevate Your <span className="text-red-600">Indian Brand.</span>
            </h2>
            <Link
              to="/contact?message=Hi VGot You, I'm interested in starting a project for my business in India."
              className="inline-block rounded-[10px] bg-red-600 px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-red-500 transition"
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

export default WebDesignIndia;