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

const BangaloreWebPage: React.FC = () => {
  const industries = [
    {
      title: "Tech Startups & SaaS",
      desc: "Websites for Koramangala and HSR Layout startups — built to impress investors, attract talent and convert customers."
    },
    {
      title: "IT Services & Consulting",
      desc: "Professional corporate websites for Bangalore IT services, consulting and outsourcing companies."
    },
    {
      title: "E-commerce & D2C",
      desc: "High-converting online stores for Bangalore's booming D2C and e-commerce brands targeting India and globally."
    },
    {
      title: "Professional Services",
      desc: "Authority-building websites for Bangalore's legal, financial, healthcare and professional service firms."
    }
  ];

  const faqs = [
    {
      q: "Do you provide web design services in Bangalore?",
      a: "Yes, VGot You provides professional web design for businesses across Bangalore including Koramangala, Indiranagar, Whitefield, HSR Layout, JP Nagar, Jayanagar and across Bengaluru. We work fully remotely."
    },
    {
      q: "How much does web design cost in Bangalore?",
      a: "Our Bangalore web design services are competitively priced and customized according to the size, complexity, and unique integration needs of your tech or startup company. We offer transparent, fixed pricing with zero hidden surcharges."
    },
    {
      q: "Do you build websites for Bangalore tech startups?",
      a: "Absolutely. We specialise in building clean, modern, conversion-focused websites for Bangalore's startup ecosystem — designed to impress investors and convert customers from day one."
    },
    {
      q: "Can you compete with Bangalore web design agencies on quality?",
      a: "Yes. We deliver the same technical quality and design standards as top Bangalore agencies. Our clients get premium, high-converting results tailored to rank well on Google."
    }
  ];

  return (
    <div className="bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 selection:bg-red-200 dark:selection:bg-red-800 overflow-x-hidden transition-colors duration-300">
      <Header />
      <Helmet>
        <html lang="en-IN" />
        <title>Web Design Company in Bangalore | Affordable Websites for Startups | VGot You</title>
        <meta name="description" content="VGot You offers professional web design for Bangalore businesses — from Koramangala startups to Whitefield IT firms. Fast, SEO-optimised websites with bespoke custom designs." />
        <meta name="author" content="VGot You" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.vgotyou.com/web-design-bangalore" />
        <link rel="alternate" hrefLang="en-IN" href="https://www.vgotyou.com/web-design-bangalore" />
        <link rel="alternate" hrefLang="en-GB" href="https://www.vgotyou.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.vgotyou.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="VGot You" />
        <meta property="og:title" content="Web Design Company in Bangalore | Affordable Websites for Startups | VGot You" />
        <meta property="og:description" content="VGot You offers professional web design for Bangalore businesses — from Koramangala startups to Whitefield IT firms. Fast, SEO-optimised websites with bespoke custom designs." />
        <meta property="og:url" content="https://www.vgotyou.com/web-design-bangalore" />
        <meta property="og:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Web Design Company in Bangalore | Affordable Websites for Startups | VGot You" />
        <meta name="twitter:description" content="VGot You offers professional web design for Bangalore businesses — from Koramangala startups to Whitefield IT firms. Fast, SEO-optimised websites with bespoke custom designs." />
        <meta name="twitter:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Web Design Company in Bangalore",
            "description": "Professional web design services for Bangalore businesses.",
            "url": "https://www.vgotyou.com/web-design-bangalore",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.vgotyou.com/" },
                { "@type": "ListItem", "position": 2, "name": "Web Design", "item": "https://www.vgotyou.com/web-design-india" },
                { "@type": "ListItem", "position": 3, "name": "India", "item": "https://www.vgotyou.com/web-design-india" },
                { "@type": "ListItem", "position": 4, "name": "Bangalore", "item": "https://www.vgotyou.com/web-design-bangalore" }
              ]
            }
          })}
        </script>
      </Helmet>

      <main>
        {/* Hero Section – Reduced mobile height with higher padding-top to clear header, darker overlay, smoother animations */}
        <section className="relative px-4 sm:px-6 pt-24 pb-6 md:pt-24 md:pb-16 overflow-hidden bg-white dark:bg-black">
  <img
    src="/assets/banglore.jpg"
    alt="Bangalore"
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
                  <span className="text-[10px] font-mono tracking-wider text-red-700 dark:text-red-300 uppercase">Bangalore — Silicon Valley of India</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.2] mb-3 md:mb-4">
                  Startup first class for
                  <span className="block text-red-500">Bangalore tech.</span>
                </h1>

                <p className="text-sm md:text-base text-zinc-200 dark:text-zinc-300 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed">
                  Bespoke high-performance layouts, search-dominant SaaS marketing campaigns, and elegant digital interfaces tailored specifically for Bangalore's elite product teams.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-5 md:mb-6">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-[170px] sm:w-[195px]">
                    <Link
                      to="/contact?message=Hi VGot You, I am interested in web design services for my Bangalore based startup."
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
                        city === "Bangalore"
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
              <MetricBlock label="Quality" value="Premium" sub="Bangalore Standard" />
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
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter mt-4 mb-8 uppercase text-zinc-900 dark:text-white">Web Design for <br /><span className="text-red-600">Bangalore Businesses</span></h2>
                <div className="space-y-6 text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
                  <p>Bangalore's startup ecosystem is the most mature in India — and the most demanding. Investors, clients and talent judge your business by your digital presence. A poorly designed website in Bangalore's competitive market means losing business to a competitor every single day.</p>
                  <p>VGot You builds websites that match Bangalore's ambition — fast, beautifully designed, technically sound and optimised to rank on Google from day one. We work with Bangalore businesses remotely with the same level of communication and transparency as a local agency — but without the Bangalore agency price tag.</p>
                  <div className="p-6 border border-red-600/20 bg-red-600/5 rounded-[10px]">
                    <p className="text-red-600 font-bold uppercase tracking-widest text-xs mb-2">The VGot You Advantage</p>
                    <p className="text-zinc-605 dark:text-zinc-305 text-sm leading-relaxed">Premium Bangalore-quality web design. South India prices. The smart choice for growing tech companies.</p>
                  </div>
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

        {/* FAQ Section */}
        <section className="py-20 md:py-28 border-b border-zinc-200 dark:border-zinc-805 bg-zinc-50/50 dark:bg-zinc-950/20 transition-colors duration-300">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-16">
              <TechnicalBadge className="mb-4">Common Questions</TechnicalBadge>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-zinc-900 dark:text-white">Bangalore <span className="text-red-600">FAQ</span></h2>
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
            <div className="text-[10px] font-mono text-red-605 font-bold uppercase tracking-[0.4em] mb-6">Action_Matrix: Regional_Deployment</div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white mb-8">
              Elevate Your <span className="text-red-600">Bangalore Brand.</span>
            </h2>
            <Link
              to="/contact?message=Hi VGot You, I'm interested in starting a project for my business in Bangalore."
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

export default BangaloreWebPage;
