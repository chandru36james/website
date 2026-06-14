import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useTheme } from '../components/common/ThemeProvider';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as any } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800 group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left text-zinc-900 dark:text-white hover:text-red-600 transition-colors"
      >
        <span className="text-sm md:text-base font-semibold pr-4">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-zinc-400 dark:text-zinc-500 flex-shrink-0"
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
            <p className="pb-5 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DigitalMarketing: React.FC = () => {
  return (
    <div className="bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 selection:bg-red-200 dark:selection:bg-red-800 overflow-x-hidden">
      <Header />

      <Helmet>
        <html lang="en-IN" />
        <title>Digital Marketing Services | SEO, Google Ads & Social Media – VGot You</title>
        <meta
          name="description"
          content="VGot You offers performance-driven digital marketing services including SEO, Google Ads, Meta Ads, and social media marketing. Helping businesses across India and the UK grow online and generate consistent leads."
        />
        <meta name="author" content="VGot You" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.vgotyou.com/digital-marketing" />
        <link rel="alternate" hrefLang="en-IN" href="https://www.vgotyou.com/digital-marketing" />
        <link rel="alternate" hrefLang="en-GB" href="https://www.vgotyou.com/digital-marketing-uk" />
        <link rel="alternate" hrefLang="x-default" href="https://www.vgotyou.com/digital-marketing" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="VGot You" />
        <meta property="og:title" content="Digital Marketing Services | SEO, Google Ads & Social Media – VGot You" />
        <meta property="og:description" content="Performance-driven digital marketing services including SEO, Google Ads, Meta Ads, and social media marketing by VGot You. Helping businesses across India and the UK grow online." />
        <meta property="og:url" content="https://www.vgotyou.com/digital-marketing" />
        <meta property="og:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Digital Marketing Services – SEO, Google Ads & Social Media by VGot You" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:locale:alternate" content="en_GB" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Digital Marketing Services | SEO, Google Ads & Social Media – VGot You" />
        <meta name="twitter:description" content="Performance-driven digital marketing services including SEO, Google Ads, Meta Ads and social media marketing by VGot You — India & UK." />
        <meta name="twitter:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
        <meta name="twitter:site" content="@vgotyou" />
        <meta name="twitter:creator" content="@vgotyou" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://www.vgotyou.com/digital-marketing#webpage",
            "url": "https://www.vgotyou.com/digital-marketing",
            "name": "Digital Marketing Services | SEO, Google Ads & Social Media – VGot You",
            "description": "Performance-driven digital marketing services including SEO, Google Ads, Meta Ads, and social media marketing by VGot You for businesses across India and the UK."
          }
        `}</script>
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://www.vgotyou.com/digital-marketing#service",
            "name": "Digital Marketing Services",
            "description": "Performance-driven digital marketing services including SEO, Google Ads PPC, Meta Ads, social media marketing, content marketing and lead generation.",
            "provider": { "@id": "https://www.vgotyou.com/#localbusiness" },
            "areaServed": [
              { "@type": "Country", "name": "India" },
              { "@type": "Country", "name": "United Kingdom" },
              { "@type": "State", "name": "Tamil Nadu" }
            ]
          }
        `}</script>
      </Helmet>

      <main>
        {/* ===== HERO – asymmetric split ===== */}
        <section className="relative overflow-hidden px-4 sm:px-6 pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-100 via-white to-amber-50 dark:from-red-950/20 dark:via-black dark:to-amber-950/10 pointer-events-none" />
          <div className={`absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-30 pointer-events-none`} />

          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 rounded-[10px] bg-red-100/80 dark:bg-red-950/40 px-3 py-1 text-xs font-mono font-bold text-red-700 dark:text-red-300 mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-600 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
                  </span>
                  VGot You Performance Engine
                </div>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] text-zinc-900 dark:text-white">
                  Digital Marketing
                  <span className="block text-red-600">That Scales.</span>
                </h1>
                <p className="mt-6 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-lg">
                  We turn ad spend into revenue. Data‑driven Google Ads, Meta campaigns, and SEO that deliver measurable ROI for businesses across India and the UK.
                </p>
                <div className="mt-8 flex flex-col items-center sm:flex-row gap-4">
                  <Link
                    to="/contact?message=Hi VGot You, I'm interested in scaling my business with your digital marketing expertise."
                    className="w-[180px] sm:w-[195px] inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-[10px] transition-all duration-300 text-[11px] sm:text-xs uppercase tracking-wider text-center"
                  >
                    Get a Free Audit →
                  </Link>
                  <a
                    href="#services"
                    className="w-[160px] sm:w-[175px] inline-flex items-center justify-center gap-2 border border-zinc-300 dark:border-zinc-700 hover:border-red-400 hover:text-red-600 text-zinc-700 dark:text-zinc-200 font-semibold px-4 py-2.5 rounded-[10px] transition-all duration-300 text-[11px] sm:text-xs uppercase tracking-wider text-center"
                  >
                    Explore Services
                  </a>
                </div>
                <div className="mt-8 flex items-center gap-4 text-xs text-zinc-500">
                  <div className="flex -space-x-2">
                    {["/assets/venkat.png", "/assets/santhosh.png", "/assets/aravind.png"].map((src, i) => (
                      <img key={i} src={src} alt="Client" className="w-8 h-8 rounded-full border-2 border-white dark:border-black" />
                    ))}
                  </div>
                  <span>Trusted by 50+ growing brands</span>
                </div>
              </motion.div>

              {/* Right side – floating stats card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative flex justify-center lg:justify-end"
              >
                <div className="relative w-full max-w-md rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm p-6 shadow-xl">
                  <div className="absolute -top-3 -right-3 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">+62% ROI</div>
                  <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-4">
                    <div className="h-10 w-10 rounded-[10px] bg-red-100 dark:bg-red-950/40 flex items-center justify-center text-red-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase text-zinc-500">Average ROAS</p>
                      <p className="text-2xl font-black text-red-600">4.2x</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-600 dark:text-zinc-400">Conversion Rate Lift</span>
                      <span className="font-bold text-zinc-900 dark:text-white">+38%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "38%" }} transition={{ duration: 1 }} className="h-full bg-red-500 rounded-full" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-600 dark:text-zinc-400">CPA Reduction</span>
                      <span className="font-bold text-zinc-900 dark:text-white">-28%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: "28%" }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-red-500 rounded-full" />
                    </div>
                  </div>
                  <div className="mt-5 pt-3 text-center text-[9px] font-mono text-zinc-400">Google Premier Partner • Meta Business Partner</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== STATS ROW – minimal ===== */}
        <section className="px-4 sm:px-6 py-12 bg-zinc-50 dark:bg-zinc-950/50">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "150+", label: "Campaigns Managed" },
                { value: "₹12Cr+", label: "Ad Spend Optimized" },
                { value: "94%", label: "Client Retention" },
                { value: "24/7", label: "Support" }
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center p-4 rounded-[10px] bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800"
                >
                  <p className="text-2xl font-black text-red-600">{stat.value}</p>
                  <p className="text-[10px] font-mono uppercase text-zinc-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SERVICES – card grid with icons ===== */}
        <section id="services" className="px-4 sm:px-6 py-20 md:py-28 bg-white dark:bg-black">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">What we deliver</span>
                <h2 className="mt-2 text-3xl md:text-4xl font-black tracking-tight">Performance Marketing Suite</h2>
              </motion.div>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                { icon: "🔍", title: "Search Ads (Google)", desc: "Capture high‑intent buyers with precise keyword targeting and smart bidding." },
                { icon: "📱", title: "Social Ads (Meta)", desc: "Build brand desire and scale D2C sales with AI‑optimised creative." },
                { icon: "📈", title: "SEO & Content", desc: "Organic growth engine that reduces long‑term customer acquisition costs." },
                { icon: "🛍️", title: "E‑commerce Marketing", desc: "Shopify & WooCommerce campaigns that drive consistent ROAS." },
                { icon: "🎯", title: "Retargeting", desc: "Win back lost visitors with dynamic product ads and smart segmentation." },
                { icon: "📊", title: "Analytics & CRO", desc: "Data‑backed funnel optimisation to maximise conversion rates." }
              ].map((service, idx) => (
                <motion.div
                  key={service.title}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="rounded-[10px] border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-md transition"
                >
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{service.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== HOW WE WORK – process steps ===== */}
        <section className="px-4 sm:px-6 py-20 md:py-28 bg-zinc-50 dark:bg-zinc-950/30">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">Methodology</span>
                <h2 className="mt-2 text-3xl md:text-4xl font-black tracking-tight">Data‑Driven Process</h2>
              </motion.div>
            </div>
            <div className="grid gap-6 md:grid-cols-4">
              {[
                { step: "01", title: "Audit", desc: "Deep analysis of current performance, tracking, and funnel." },
                { step: "02", title: "Strategy", desc: "Custom media plan based on business goals and audience." },
                { step: "03", title: "Execute", desc: "Launch campaigns with continuous A/B testing." },
                { step: "04", title: "Optimize", desc: "Daily adjustments to improve ROAS and lower CPA." }
              ].map((item, idx) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center p-6 rounded-[10px] bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="text-3xl font-black text-red-600/50">{item.step}</div>
                  <h3 className="mt-2 font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CASE STUDY / SUCCESS METRIC ===== */}
        <section className="px-4 sm:px-6 py-20 md:py-28 bg-red-600 text-white">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="inline-block px-3 py-1 rounded-[10px] bg-white/20 text-xs font-mono mb-4">Case Study</span>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight">+312% Revenue Growth in 6 Months</h2>
                  <p className="mt-4 text-red-100 leading-relaxed">
                    A leading textile exporter in Karur partnered with VGot You to scale their B2B leads. Through a combination of Google Ads, LinkedIn outreach, and SEO, we achieved a 312% increase in qualified leads and reduced cost per lead by 45%.
                  </p>
                  <div className="mt-6 flex gap-6">
                    <div>
                      <p className="text-2xl font-black">+312%</p>
                      <p className="text-xs uppercase opacity-80">Lead Growth</p>
                    </div>
                    <div>
                      <p className="text-2xl font-black">-45%</p>
                      <p className="text-xs uppercase opacity-80">Cost Per Lead</p>
                    </div>
                  </div>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-[10px] overflow-hidden border-2 border-white/20 shadow-xl"
              >
                <img src="/assets/digital-marketing.png" alt="Dashboard preview" className="w-full object-cover" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== INTEGRATION ECOLOGY ===== */}
        <section className="px-4 sm:px-6 py-20 md:py-28 bg-white dark:bg-black">
          <div className="container mx-auto max-w-7xl text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">Full‑funnel integration</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-black tracking-tight">Paid Ads + SEO + Web Design</h2>
              <p className="mt-4 max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400">
                Our marketing engine works hand‑in‑hand with your website and organic search. We don't just drive traffic — we convert it.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to="/web-design" className="rounded-[10px] border border-zinc-200 dark:border-zinc-800 px-5 py-2 text-sm hover:border-red-400 hover:text-red-600 transition">
                  Web Design →
                </Link>
                <Link to="/seo-services" className="rounded-[10px] border border-zinc-200 dark:border-zinc-800 px-5 py-2 text-sm hover:border-red-400 hover:text-red-600 transition">
                  SEO Services →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="px-4 sm:px-6 py-20 md:py-28 bg-zinc-50 dark:bg-zinc-950/30">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600">FAQ</span>
                <h2 className="mt-2 text-3xl font-black tracking-tight">Common Questions</h2>
              </motion.div>
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-1"
            >
              <FAQItem
                question="What is the minimum ad spend required?"
                answer="At VGot You, we recommend an optimized daily ad spend tailored to your business model and market. Our management fee is separate from the ad spend, and we work with budgets starting from ₹50,000/month for India campaigns."
              />
              <FAQItem
                question="How soon will I see results?"
                answer="Google Ads typically show initial results within 7–14 days. Meta campaigns require a 2–4 week learning phase. Full ROAS optimization usually stabilises within 60 days."
              />
              <FAQItem
                question="Do you create ad creatives (images, videos)?"
                answer="Yes. We provide creative direction and design services. High‑performing creative is critical, and we handle everything from concept to final asset."
              />
              <FAQItem
                question="How do you report performance?"
                answer="You get real‑time dashboard access and monthly reports covering ROAS, CPA, lead quality, and actionable insights. No jargon, just data."
              />
            </motion.div>
          </div>
        </section>

        {/* ===== FINAL CTA – bold ===== */}
        <section className="px-4 sm:px-6 py-20 md:py-32 text-center bg-white dark:bg-black">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Ready to scale your revenue?</h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">Let's build a data‑driven marketing machine for your business.</p>
            <div className="mt-8 flex flex-col items-center sm:flex-row justify-center gap-4">
              <Link
                to="/contact?message=Hi VGot You, I'm ready to dominate my market. Let's build a data-driven marketing strategy."
                className="w-[180px] sm:w-[195px] inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-[10px] transition-all duration-300 text-[11px] sm:text-xs uppercase tracking-wider shadow-md text-center"
              >
                Request Free Audit →
              </Link>
              <a
                href="https://wa.me/917871120415?text=Hi%20VGot%20You%2C%20I%20need%20a%20digital%20marketing%20strategy%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="w-[160px] sm:w-[175px] inline-flex items-center justify-center gap-2 border border-zinc-300 dark:border-zinc-700 hover:border-red-400 hover:text-red-600 text-zinc-700 dark:text-zinc-300 font-semibold px-4 py-2.5 rounded-[10px] transition-all duration-300 text-[11px] sm:text-xs uppercase tracking-wider text-center"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DigitalMarketing;