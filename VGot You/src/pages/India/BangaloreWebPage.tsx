import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";

const m = motion as any;

const TechnicalBadge = ({ children, className }: { children?: React.ReactNode, className?: string }) => (
  <span className={`inline-block px-3 py-1 border border-zinc-800 rounded-sm bg-black/50 text-[8px] md:text-[9px] font-mono tracking-[0.3em] uppercase text-zinc-500 ${className}`}>
    {children}
  </span>
);

const HUDMarker = () => (
  <div className="absolute w-4 h-4 pointer-events-none">
    <div className="absolute top-0 left-0 w-full h-[1px] bg-red-600/30"></div>
    <div className="absolute top-0 left-0 w-[1px] h-full bg-red-600/30"></div>
  </div>
);

const MetricBlock = ({ label, value, sub }: { label: string, value: string, sub: string }) => (
  <div className="flex flex-col items-center px-4 md:px-8 border-x border-zinc-900 group">
    <span className="text-technical text-[6px] md:text-[7px] text-zinc-600 uppercase tracking-widest mb-1.5 md:mb-2 group-hover:text-red-600 transition-colors">{label}</span>
    <span className="text-2xl md:text-5xl font-black text-white mb-1">{value}</span>
    <span className="text-technical text-[7px] md:text-[8px] text-zinc-800 uppercase font-bold">{sub}</span>
  </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-900 group">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 md:py-6 flex justify-between items-center text-left hover:text-red-500 transition-colors"
      >
        <span className="text-xs md:text-base font-bold uppercase tracking-tight pr-4">{question}</span>
        <span className={`text-red-600 transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-5 md:pb-6 text-zinc-500 text-xs md:text-sm leading-relaxed max-w-3xl">
              {answer}
            </p>
          </m.div>
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
      a: "Our Bangalore web design packages start from ₹4,999 — significantly more affordable than most Bangalore-based agencies. We provide fixed-price quotes with no hidden fees."
    },
    {
      q: "Do you build websites for Bangalore tech startups?",
      a: "Absolutely. We specialise in building clean, modern, conversion-focused websites for Bangalore's startup ecosystem — designed to impress investors and convert customers from day one."
    },
    {
      q: "Can you compete with Bangalore web design agencies on quality?",
      a: "Yes. We deliver the same technical quality and design standards as top Bangalore agencies — at a fraction of the cost. Our clients get premium results without the premium Bangalore price tag."
    }
  ];

  return (
    <div className="bg-[#020202] text-white selection:bg-red-600/30 overflow-x-hidden pt-16 md:pt-20">
      <Helmet>
        <html lang="en-IN" />
        <title>Web Design Company in Bangalore | Affordable Websites for Startups | VGot You</title>
        <meta name="description" content="VGot You offers professional web design for Bangalore businesses — from Koramangala startups to Whitefield IT firms. Fast, SEO-optimised websites from ₹4,999." />
        <meta name="author" content="VGot You" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.vgotyou.com/web-design-bangalore" />
        <link rel="alternate" hrefLang="en-IN" href="https://www.vgotyou.com/web-design-bangalore" />
        <link rel="alternate" hrefLang="en-GB" href="https://www.vgotyou.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.vgotyou.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="VGot You" />
        <meta property="og:title" content="Web Design Company in Bangalore | Affordable Websites for Startups | VGot You" />
        <meta property="og:description" content="VGot You offers professional web design for Bangalore businesses — from Koramangala startups to Whitefield IT firms. Fast, SEO-optimised websites from ₹4,999." />
        <meta property="og:url" content="https://www.vgotyou.com/web-design-bangalore" />
        <meta property="og:image" content="https://www.vgotyou.com/assets/og-home.png" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Web Design Company in Bangalore | Affordable Websites for Startups | VGot You" />
        <meta name="twitter:description" content="VGot You offers professional web design for Bangalore businesses — from Koramangala startups to Whitefield IT firms. Fast, SEO-optimised websites from ₹4,999." />
        <meta name="twitter:image" content="https://www.vgotyou.com/assets/og-home.png" />
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

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 border-b border-zinc-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <TechnicalBadge className="mb-6">Location: Bangalore, KA</TechnicalBadge>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              WEB DESIGN <br />
              <span className="text-red-600">BANGALORE.</span>
            </h1>
            <h2 className="sr-only">Web Design Company in Bangalore – Affordable, SEO-Ready Websites for Startups & Tech Companies | VGot You</h2>
            <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              Bangalore — India's Silicon Valley — is the most competitive digital market in the country. Home to thousands of tech startups, global IT giants, e-commerce brands and innovative businesses across every sector, Bangalore demands the highest standards of web design. VGot You delivers high-performance, conversion-focused websites for Bangalore businesses — from Koramangala's startup scene to Whitefield's IT corridor and Indiranagar's thriving retail market.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-zinc-900 bg-black/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 py-12">
            <MetricBlock label="Pricing" value="₹4,999" sub="Starting From" />
            <MetricBlock label="Delivery" value="7-14" sub="Days Timeline" />
            <MetricBlock label="Quality" value="Premium" sub="Bangalore Standard" />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-32 border-b border-zinc-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8 uppercase">Web Design for <br /><span className="text-red-600">Bangalore Businesses</span></h2>
              <div className="space-y-6 text-zinc-400 text-sm md:text-base leading-relaxed">
                <p>Bangalore's startup ecosystem is the most mature in India — and the most demanding. Investors, clients and talent judge your business by your digital presence. A poorly designed website in Bangalore's competitive market means losing business to a competitor every single day.</p>
                <p>VGot You builds websites that match Bangalore's ambition — fast, beautifully designed, technically sound and optimised to rank on Google from day one. We work with Bangalore businesses remotely with the same level of communication and transparency as a local agency — but without the Bangalore agency price tag.</p>
                <div className="p-6 border border-red-600/20 bg-red-600/5 rounded-sm">
                  <p className="text-red-600 font-bold uppercase tracking-widest text-xs mb-2">The VGot You Advantage</p>
                  <p className="text-white text-sm">Premium Bangalore-quality web design. South India prices. The smart choice for growing tech companies.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {industries.map((ind, i) => (
                <div key={i} className="p-8 border border-zinc-900 bg-zinc-950/50 group hover:border-red-600/50 transition-colors">
                  <h3 className="text-white font-bold uppercase tracking-tight mb-4 group-hover:text-red-600 transition-colors">{ind.title}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed">{ind.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 border-b border-zinc-900 bg-zinc-950/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <TechnicalBadge className="mb-4">Common Questions</TechnicalBadge>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Bangalore <span className="text-red-600">FAQ</span></h2>
            </div>
            <div className="divide-y divide-zinc-900">
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="bg-red-600 p-12 md:p-24 text-center relative overflow-hidden group">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 uppercase">Join Bangalore Businesses <br />Growing with VGot You</h2>
              <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto">Premium web design. South India prices. Get a professional, SEO-optimised website that drives results.</p>
              <Link 
                to="/contact?message=Hi VGot You, I'm interested in a web design quote for my Bangalore-based business." 
                className="inline-block bg-white text-red-600 px-10 py-4 font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Links Footer */}
      <section className="py-12 border-t border-zinc-900 bg-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-6 text-[10px] uppercase tracking-widest font-bold text-zinc-600">
            <Link to="/web-design-karur" className="hover:text-red-600 transition-colors">Karur</Link>
            <Link to="/web-design-tamil-nadu" className="hover:text-red-600 transition-colors">Tamil Nadu</Link>
            <Link to="/web-design-india" className="hover:text-red-600 transition-colors">India</Link>
            <Link to="/seo-services" className="hover:text-red-600 transition-colors">SEO Services</Link>
            <Link to="/portfolio" className="hover:text-red-600 transition-colors">Portfolio</Link>
            <Link to="/contact?message=Hi VGot You, I'd like to discuss a project for my business." className="hover:text-red-600 transition-colors">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BangaloreWebPage;
