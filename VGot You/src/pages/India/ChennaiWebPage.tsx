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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ChennaiWebPage: React.FC = () => {
  const industries = [
    {
      title: "SaaS & Tech Enterprises",
      desc: "World-class web architectures for Chennai's powerhouse IT sectors, SaaS champions on the OMR corridor, and deep-tech startups scaling globally."
    },
    {
      title: "Manufacturing & Automotive Hubs",
      desc: "High-integrity B2B web portals for Chennai's automotive giants, Guindy or Ambattur Industrial Estate manufacturers, and metal casting/export chambers."
    },
    {
      title: "Logistics, Shipping & Maritime",
      desc: "Custom operational interfaces and corporate websites for seaport shipping networks, freight forwarders, and logistics conglomerates trading globally."
    },
    {
      title: "Healthcare & Biotech Centres",
      desc: "Compliance-ready, highly secure web systems for multi-speciality medical networks, educational blocks, pharma brands, and medical tourism leaders."
    }
  ];

  const services = [
    { title: "Custom Website Design", desc: "Bespoke websites for Chennai businesses. Stand out in one of India's most competitive markets." },
    { title: "SEO-Optimised Development", desc: "Built to rank on Google Chennai. Technical SEO integrated from day one." },
    { title: "E-commerce Development", desc: "Sell online across Chennai and beyond. High-converting stores for Indian buyers." },
    { title: "Mobile-First Design", desc: "Over 70% of Indian web traffic is mobile. Every site we build works perfectly on all devices." },
    { title: "Landing Page Design", desc: "High-conversion pages for Chennai businesses running Google Ads or Meta campaigns." },
    { title: "Website Redesign", desc: "Modernise your existing Chennai website and improve your search visibility." }
  ];

  const faqs = [
    {
      q: "Do you provide web design services in Chennai?",
      a: "Yes, VGot You provides professional web design for businesses across Chennai including Anna Nagar, T Nagar, OMR, Velachery, Adyar, Mylapore, Ambattur and all Chennai districts. We work fully remotely from our Karur base."
    },
    {
      q: "How much does web design cost in Chennai?",
      a: "Our Chennai web design projects are custom priced based on project scope, features, and complex integrations. We provide transparent, fixed-price quotes after understanding your specific requirements."
    },
    {
      q: "How long does it take to build a website for a Chennai business?",
      a: "Most Chennai business websites are delivered within 7-14 days. Simple landing pages can be completed in 3-5 days. Complex e-commerce or corporate projects take 3-6 weeks. We always provide a clear timeline."
    },
    {
      q: "Can you help Chennai IT companies with web design and SEO?",
      a: "Absolutely. We specialise in building professional, high-performance websites for Chennai's IT sector — with technical SEO built in from day one to help you rank on Google for your target keywords."
    }
  ];

  return (
    <div className="bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 selection:bg-red-200 dark:selection:bg-red-800 overflow-x-hidden transition-colors duration-300">
      <Header />
      <Helmet>
        <html lang="en-IN" />
        <title>Web Design Company in Chennai | VGot You – Tamil Nadu</title>
        <meta name="description" content="VGot You is a professional web design company serving Chennai businesses — from Anna Nagar startups to OMR tech firms. Fast, SEO-optimised websites with bespoke designs." />
        <meta name="author" content="VGot You" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.vgotyou.com/web-design-chennai" />
        <link rel="alternate" hrefLang="en-IN" href="https://www.vgotyou.com/web-design-chennai" />
        <link rel="alternate" hrefLang="en-GB" href="https://www.vgotyou.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.vgotyou.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="VGot You" />
        <meta property="og:title" content="Web Design Company in Chennai | VGot You – Tamil Nadu" />
        <meta property="og:description" content="VGot You is a professional web design company serving Chennai businesses — from Anna Nagar startups to OMR tech firms. Fast, SEO-optimised websites with bespoke designs." />
        <meta property="og:url" content="https://www.vgotyou.com/web-design-chennai" />
        <meta property="og:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Web Design Company in Chennai | VGot You – Tamil Nadu" />
        <meta name="twitter:description" content="VGot You is a professional web design company serving Chennai businesses — from Anna Nagar startups to OMR tech firms. Fast, SEO-optimised websites with bespoke designs." />
        <meta name="twitter:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Web Design Company in Chennai",
            "description": "Professional web design services for Chennai businesses.",
            "url": "https://www.vgotyou.com/web-design-chennai",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.vgotyou.com/" },
                { "@type": "ListItem", "position": 2, "name": "Web Design", "item": "https://www.vgotyou.com/web-design-india" },
                { "@type": "ListItem", "position": 3, "name": "India", "item": "https://www.vgotyou.com/web-design-india" },
                { "@type": "ListItem", "position": 4, "name": "Tamil Nadu", "item": "https://www.vgotyou.com/web-design-tamil-nadu" },
                { "@type": "ListItem", "position": 5, "name": "Chennai", "item": "https://www.vgotyou.com/web-design-chennai" }
              ]
            }
          })}
        </script>
      </Helmet>

      <main>
        {/* Hero Section – Reduced mobile height with higher padding-top to clear header, darker overlay, smoother animations */}
        <section className="relative px-4 sm:px-6 pt-24 pb-6 md:pt-24 md:pb-16 overflow-hidden bg-white dark:bg-black">
  <img
    src="/assets/chennai.avif"
    alt="Chennai"
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
                  <span className="text-[10px] font-mono tracking-wider text-red-700 dark:text-red-300 uppercase">Chennai — IT & SaaS Capital</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.2] mb-3 md:mb-4">
                  Enterprise speed for
                  <span className="block text-red-500">Chennai brands.</span>
                </h1>

                <p className="text-sm md:text-base text-zinc-200 dark:text-zinc-300 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed">
                  Bespoke web architectures, custom SaaS elements, and ultra-high speed headless layouts — built for Chennai enterprises, trusted worldwide.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-5 md:mb-6">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-[170px] sm:w-[195px]">
                    <Link
                      to="/contact?message=Hi VGot You, I am interested in web design services for my Chennai based business."
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
                        city === "Chennai"
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

        {/* Metrics Row */}
        <section className="px-4 sm:px-6 py-12 bg-zinc-50 dark:bg-zinc-950/30 border-y border-zinc-100 dark:border-zinc-800">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
            >
              <MetricBlock label="Quote" value="Custom" sub="Bespoke Design" />
              <MetricBlock label="Delivery" value="7-14" sub="Days Timeline" />
              <MetricBlock label="Team" value="TN" sub="Based Experts" />
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 md:py-28 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <TechnicalBadge>Market_Context</TechnicalBadge>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter mt-4 mb-8 uppercase text-zinc-900 dark:text-white">Web Design for <br /><span className="text-red-600">Chennai Businesses</span></h2>
                <div className="space-y-6 text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
                  <p>Chennai's business landscape is one of India's most diverse — spanning IT services, manufacturing, healthcare, retail, education and a world-class export sector. Whether you're a startup on the OMR tech corridor, a manufacturer in Ambattur, or a professional services firm in Anna Nagar, your website is your most important business asset.</p>
                  <p>VGot You is a Karur-based web design company with deep roots in Tamil Nadu — which means we understand Chennai's business culture, its competitive landscape and what it takes to stand out in one of India's largest markets.</p>
                </div>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {industries.map((ind, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    className="p-6 rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black hover:border-red-300 transition"
                  >
                    <h3 className="text-zinc-900 dark:text-white font-bold uppercase tracking-tight text-sm mb-3 text-red-600 dark:text-red-400">{ind.title}</h3>
                    <p className="text-zinc-650 dark:text-zinc-400 text-xs leading-relaxed">{ind.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 md:py-28 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/30 transition-colors duration-300">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="mb-16">
              <TechnicalBadge className="mb-4">Our Expertise</TechnicalBadge>
              <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase text-zinc-900 dark:text-white">Services for <span className="text-red-600">Chennai</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="p-6 rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black hover:border-red-300 transition"
                >
                  <h3 className="text-zinc-900 dark:text-white font-bold uppercase tracking-tight text-base mb-3 text-red-600 dark:text-red-400">{service.title}</h3>
                  <p className="text-zinc-650 dark:text-zinc-400 text-sm leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why VGot You */}
        <section className="py-20 md:py-28 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black transition-colors duration-300">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <TechnicalBadge className="mb-4">Value Proposition</TechnicalBadge>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8 uppercase text-zinc-900 dark:text-white">Why VGot You for <span className="text-red-600">Chennai</span></h2>
            <p className="text-zinc-650 dark:text-zinc-300 text-base md:text-lg leading-relaxed">
              VGot You is based in Karur, Tamil Nadu — which means we're your local digital partner with an intimate understanding of Tamil Nadu's business culture and market dynamics. We deliver world-class web design at transparent, affordable prices — without the overhead of a Chennai city agency.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-28 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20 transition-colors duration-300">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-16">
              <TechnicalBadge className="mb-4">Common Questions</TechnicalBadge>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-zinc-900 dark:text-white">Chennai <span className="text-red-600">FAQ</span></h2>
            </div>
            <div className="space-y-1">
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
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
            <div className="text-[10px] font-mono text-red-650 font-bold uppercase tracking-[0.4em] mb-6">Action_Matrix: Regional_Deployment</div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white mb-8">
              Elevate Your <span className="text-red-600">Chennai Brand.</span>
            </h2>
            <Link
              to="/contact?message=Hi VGot You, I'm interested in starting a project for my business in Chennai."
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

export default ChennaiWebPage;
