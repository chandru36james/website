import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const TechnicalBadge = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <span className={`inline-block px-3 py-1 rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/50 text-[8px] md:text-[9px] font-mono tracking-[0.3em] uppercase text-red-650 dark:text-red-400 ${className}`}>
    {children}
  </span>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-200 dark:border-zinc-805">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left text-zinc-900 dark:text-white hover:text-red-650 transition-colors"
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

const CityPill = ({ name }: { name: string }) => (
  <motion.div
    whileHover={{ scale: 1.05, borderColor: '#dc2626' }}
    className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/50 rounded-[10px] text-zinc-600 dark:text-zinc-400 text-[10px] font-mono uppercase tracking-widest hover:text-red-600 hover:border-red-400 transition cursor-default whitespace-nowrap"
  >
    {name}
  </motion.div>
);

const WebDesignTN: React.FC = () => {
  const cities = [
    "Chennai", "Coimbatore", "Madurai", "Trichy", "Salem", "Tiruppur", "Erode", "Karur",
    "Vellore", "Thanjavur", "Tirunelveli", "Thoothukudi", "Dindigul", "Hosur", "Nagercoil",
    "Kanchipuram", "Chengalpattu", "Cuddalore", "Villupuram"
  ];

  const regionalTestimonials = [
    { name: "Murali", city: "Karur", text: "VGot You transformed our textile exports remotely. Their process is seamless.", business: "Textile Export House" },
    { name: "Karthik", city: "Coimbatore", text: "The best online developer in TN. Communication was perfect throughout the project.", business: "Manufacturing Hub" },
    { name: "Priya", city: "Chennai", text: "Strategic SEO that delivered results without needing an in-person meeting.", business: "Tech Startup" }
  ];

  const services = [
    {
      title: "Business Website Design",
      desc: "High-end corporate website development for industries looking to build global authority through a digital-first approach.",
      icon: "🏢",
      code: "CORP-TN"
    },
    {
      title: "E-commerce Development",
      desc: "Scalable online stores with remote setup and integration, optimized for the South Indian retail sector.",
      icon: "🛒",
      code: "ECOMM-X"
    },
    {
      title: "SEO Mastery",
      desc: "Strategic search engine optimization to help your brand rank at the top of national and regional searches.",
      icon: "🚀",
      code: "SEO-MAX"
    },
    {
      title: "Custom UI/UX Engineering",
      desc: "Digital interface designs crafted for maximum global resonance and local conversion rates.",
      icon: "🎨",
      code: "UX-LAB"
    }
  ];

  return (
    <div className="bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 selection:bg-red-200 dark:selection:bg-red-800 overflow-x-hidden transition-colors duration-300">
      <Header />
      <Helmet>
        <html lang="en-IN" />
        <title>Web Design Company in Tamil Nadu | VGot You – Karur</title>
        <meta name="description" content="VGot You is a leading web design company in Tamil Nadu offering custom, responsive, and SEO-optimised websites for startups, manufacturers, exporters and MSMEs across all 38 districts. Based in Karur." />
        <meta name="author" content="VGot You" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.vgotyou.com/web-design-tamil-nadu" />
        <link rel="alternate" hrefLang="en-IN" href="https://www.vgotyou.com/web-design-tamil-nadu" />
        <link rel="alternate" hrefLang="en-GB" href="https://www.vgotyou.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.vgotyou.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="VGot You" />
        <meta property="og:title" content="Web Design Company in Tamil Nadu | VGot You – Karur" />
        <meta property="og:description" content="VGot You is a leading web design company in Tamil Nadu offering custom, responsive, and SEO-optimised websites for startups, manufacturers, exporters and MSMEs across all 38 districts." />
        <meta property="og:url" content="https://www.vgotyou.com/web-design-tamil-nadu" />
        <meta property="og:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Web Design Company in Tamil Nadu | VGot You – Karur" />
        <meta name="twitter:description" content="Leading web design company in Tamil Nadu. Custom, SEO-optimised websites for startups, manufacturers, exporters and MSMEs across all 38 districts. Based in Karur." />
        <meta name="twitter:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Web Design Company in Tamil Nadu",
            "description": "Professional web design services in Tamil Nadu.",
            "url": "https://www.vgotyou.com/web-design-tamil-nadu",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.vgotyou.com/" },
                { "@type": "ListItem", "position": 2, "name": "Web Design", "item": "https://www.vgotyou.com/web-design-india" },
                { "@type": "ListItem", "position": 3, "name": "India", "item": "https://www.vgotyou.com/web-design-india" },
                { "@type": "ListItem", "position": 4, "name": "Tamil Nadu", "item": "https://www.vgotyou.com/web-design-tamil-nadu" }
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
                  <span className="text-[10px] font-mono tracking-wider text-red-700 dark:text-red-300 uppercase">Tamil Nadu — Progressive Digital Frontier</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.2] mb-3 md:mb-4">
                  Digital craft for
                  <span className="block text-red-500">Tamil Nadu brands.</span>
                </h1>

                <p className="text-sm md:text-base text-zinc-200 dark:text-zinc-300 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed">
                  The premier website design firm in Tamil Nadu — building modern user experiences, high-performance commerce engines, and search-optimized digital pathways across all districts.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-5 md:mb-6">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-[170px] sm:w-[195px]">
                    <Link
                      to="/contact?message=Hi VGot You, I'm interested in website design services for my Tamil Nadu business."
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
                      className="text-xs font-medium transition text-zinc-200 hover:text-white"
                    >
                      {city}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-24 px-6 relative border-y border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20 transition-colors duration-300">
          <div className="container mx-auto max-w-4xl text-center">
            <TechnicalBadge className="mb-4">Service Architecture</TechnicalBadge>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-zinc-900 dark:text-white">Web Development Solutions across Tamil Nadu</h2>
            <div className="space-y-6 text-zinc-650 dark:text-zinc-300 text-base leading-relaxed">
              <p>
                VGot You is your strategic partner for digital growth. We specialize in <strong>custom website development</strong> tailored for Tamil Nadu's industrial hubs—from the tech corridors of Chennai to the manufacturing excellence of Coimbatore and Karur. Our online-first model ensures rapid communication and efficient project delivery regardless of location.
              </p>
              <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mt-4">
                [Serving all 38 districts through virtual collaboration nodes]
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 px-6 relative border-b border-zinc-200 dark:border-zinc-805 bg-white dark:bg-black transition-colors duration-300">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <TechnicalBadge className="mb-4">Regional_Success</TechnicalBadge>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-4 text-zinc-900 dark:text-white">Voices of TN Businesses</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {regionalTestimonials.map((t, i) => (
                <div key={i} className="p-8 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black rounded-[10px] hover:border-red-300 transition relative">
                  <p className="text-zinc-650 dark:text-zinc-400 text-sm md:text-base leading-relaxed mb-6 italic">"{t.text}"</p>
                  <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 pt-4">
                    <div>
                      <p className="font-bold text-zinc-900 dark:text-white text-xs uppercase tracking-wider">{t.name}</p>
                      <p className="text-zinc-500 dark:text-zinc-600 text-[9px] uppercase tracking-widest">{t.business}</p>
                    </div>
                    <span className="font-mono text-[8px] font-bold text-red-650 border border-red-600/30 px-2 py-1 uppercase rounded-sm">{t.city}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 px-6 relative border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/30 transition-colors duration-300">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-16">
              <TechnicalBadge>Core_Capabilities</TechnicalBadge>
              <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mt-4 text-zinc-900 dark:text-white">Engineering <span className="text-zinc-400">Business Growth.</span></h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-8 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-[10px] hover:border-red-300 transition group"
                >
                  <div className="font-mono text-[8px] text-zinc-500 group-hover:text-red-600 transition-colors mb-6 block">[{s.code}]</div>
                  <h3 className="text-xl font-bold mb-4 uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-red-500 transition-colors">{s.title}</h3>
                  <p className="text-zinc-650 dark:text-zinc-400 text-xs leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Network Coverage */}
        <section className="py-24 px-6 relative border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black transition-colors duration-300">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <TechnicalBadge>Service_Area</TechnicalBadge>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-4 text-zinc-900 dark:text-white">Remote Support for Every City</h2>
            </div>

            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-20">
              {cities.map(city => (
                <div key={city} className="group relative">
                  <CityPill name={city} />
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[7px] text-zinc-500 dark:text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-mono pointer-events-none">
                    {`VIRTUAL_NODE_${city.toUpperCase()}_READY`}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { t: "Chennai Hub", d: "Capital tech infrastructure and high-end software company portals.", node: "CH-044", link: "/web-design-chennai" },
                { t: "Coimbatore Node", d: "Leading industrial web design for the 'Manchester of South India'.", node: "CB-0422", link: "/web-design-coimbatore" },
                { t: "Karur Gateway", d: "Specialized export catalogs for the global textile trade.", node: "KR-04324", link: "/web-design-karur" }
              ].map((item, i) => (
                <div key={i} className="group border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-8 rounded-[10px] hover:border-red-300 transition">
                  <span className="font-mono text-[8px] text-zinc-500 group-hover:text-red-600 block mb-4">[{item.node}]</span>
                  <h3 className="text-lg font-bold mb-4 uppercase tracking-widest text-zinc-900 dark:text-white">{item.t}</h3>
                  <p className="text-zinc-650 dark:text-zinc-400 text-xs leading-relaxed mb-8">{item.d}</p>
                  <Link to={item.link} className="font-mono text-[9px] font-bold text-red-600 hover:text-red-550 transition uppercase tracking-widest">Access_Node &rarr;</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6 relative bg-zinc-50 dark:bg-zinc-950/20 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <TechnicalBadge>QA_Module</TechnicalBadge>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-4 text-zinc-900 dark:text-white">Tamil Nadu Web FAQ</h2>
            </div>

            <div className="space-y-1">
              <FAQItem
                question="How do you work with clients remotely?"
                answer="We use a structured digital workflow involving video consultations, collaborative design tools like Figma, and consistent updates via email or WhatsApp. This ensures transparency and efficiency without needing a physical office visit."
              />
              <FAQItem
                question="What is the average web design cost in Tamil Nadu?"
                answer="Pricing depends entirely on scope, features, and complex integrations. We offer customized, fixed-price quotes tailored to each business's requirements."
              />
              <FAQItem
                question="Can you design a multi-language website (Tamil & English)?"
                answer="Yes, we specialize in bilingual website development, ensuring beautiful Tamil typography that is also optimized for search engines."
              />
              <FAQItem
                question="Do you provide maintenance for TN businesses?"
                answer="Absolutely. We offer 24/7 technical support packages for businesses across Tamil Nadu to ensure peak performance and zero downtime."
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
            <div className="text-[10px] font-mono text-red-650 font-bold uppercase tracking-[0.4em] mb-6">Action_Matrix: Regional_Deployment</div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white mb-8">
              Forge Your <span className="text-red-600">TN Digital Legacy.</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact?message=Hi VGot You, I'm ready to start a web project for my business in Tamil Nadu."
                className="inline-block rounded-[10px] bg-red-650 px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-red-505 transition"
              >
                Get Started →
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WebDesignTN;
