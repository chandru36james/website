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

const MumbaiWebPage: React.FC = () => {
  const industries = [
    {
      title: "Financial Services & Fintech",
      desc: "Professional websites for Mumbai's banks, investment firms, insurance companies and fintech startups in BKC and Nariman Point."
    },
    {
      title: "Media, Entertainment & Fashion",
      desc: "Creative, visually stunning websites for Mumbai's media production houses, fashion brands and entertainment companies."
    },
    {
      title: "Export & Trade",
      desc: "B2B export websites for Mumbai's Dharavi manufacturers, JNPT exporters and international trading companies."
    },
    {
      title: "Real Estate & Construction",
      desc: "Lead generation websites for Mumbai's premium real estate developers, builders and property consultants."
    }
  ];

  const faqs = [
    {
      q: "Do you provide web design services in Mumbai?",
      a: "Yes, VGot You provides professional web design for businesses across Mumbai including Bandra Kurla Complex, Andheri, Powai, Worli, Nariman Point, Thane and across the Mumbai Metropolitan Region. We work fully remotely."
    },
    {
      q: "How much does web design cost in Mumbai?",
      a: "Our Mumbai web design packages start from ₹4,999 — far more affordable than most Mumbai-based agencies. We provide fixed-price quotes with no hidden fees and no city surcharges."
    },
    {
      q: "Do you build e-commerce websites for Mumbai fashion and retail businesses?",
      a: "Yes, we specialise in high-converting e-commerce websites for Mumbai's fashion, retail and lifestyle brands — built to sell across India and internationally."
    },
    {
      q: "Can a Tamil Nadu company really serve Mumbai businesses effectively?",
      a: "Absolutely. We work remotely with clients across India and the UK. Our Mumbai clients get the same quality, communication and results as our local clients — with the added advantage of significantly lower pricing than Mumbai agencies."
    }
  ];

  return (
    <div className="bg-[#020202] text-white selection:bg-red-600/30 overflow-x-hidden pt-16 md:pt-20">
      <Helmet>
        <html lang="en-IN" />
        <title>Web Design Company in Mumbai | Affordable Websites | VGot You</title>
        <meta name="description" content="VGot You offers professional web design for Mumbai businesses — from BKC financial firms to Andheri startups. Fast, SEO-optimised websites from ₹4,999." />
        <meta name="author" content="VGot You" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.vgotyou.com/web-design-mumbai" />
        <link rel="alternate" hrefLang="en-IN" href="https://www.vgotyou.com/web-design-mumbai" />
        <link rel="alternate" hrefLang="en-GB" href="https://www.vgotyou.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.vgotyou.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="VGot You" />
        <meta property="og:title" content="Web Design Company in Mumbai | Affordable Websites | VGot You" />
        <meta property="og:description" content="VGot You offers professional web design for Mumbai businesses — from BKC financial firms to Andheri startups. Fast, SEO-optimised websites from ₹4,999." />
        <meta property="og:url" content="https://www.vgotyou.com/web-design-mumbai" />
        <meta property="og:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Web Design Company in Mumbai | Affordable Websites | VGot You" />
        <meta name="twitter:description" content="VGot You offers professional web design for Mumbai businesses — from BKC financial firms to Andheri startups. Fast, SEO-optimised websites from ₹4,999." />
        <meta name="twitter:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Web Design Company in Mumbai",
            "description": "Professional web design services for Mumbai businesses.",
            "url": "https://www.vgotyou.com/web-design-mumbai",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.vgotyou.com/" },
                { "@type": "ListItem", "position": 2, "name": "Web Design", "item": "https://www.vgotyou.com/web-design-india" },
                { "@type": "ListItem", "position": 3, "name": "India", "item": "https://www.vgotyou.com/web-design-india" },
                { "@type": "ListItem", "position": 4, "name": "Mumbai", "item": "https://www.vgotyou.com/web-design-mumbai" }
              ]
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 border-b border-zinc-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <TechnicalBadge className="mb-6">Location: Mumbai, MH</TechnicalBadge>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              WEB DESIGN <br />
              <span className="text-red-600">MUMBAI.</span>
            </h1>
            <h2 className="sr-only">Web Design Company in Mumbai – Affordable, SEO-Ready Websites for Mumbai Businesses | VGot You</h2>
            <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              Mumbai — India's financial capital and commercial heartbeat — is one of the world's most competitive business cities. From the gleaming towers of Bandra Kurla Complex to the startup hubs of Andheri and the fashion district of Linking Road, Mumbai businesses need websites that match the city's pace, ambition and global standards. VGot You delivers high-performance, SEO-optimised websites for Mumbai businesses — at prices that make sense outside of Mumbai's expensive agency market.
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
            <MetricBlock label="Value" value="Mumbai" sub="Quality Standards" />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-32 border-b border-zinc-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8 uppercase">Web Design for <br /><span className="text-red-600">Mumbai Businesses</span></h2>
              <div className="space-y-6 text-zinc-400 text-sm md:text-base leading-relaxed">
                <p>Mumbai's business landscape is India's most diverse — spanning financial services, media, entertainment, fashion, exports, real estate and one of India's fastest-growing startup ecosystems. Every Mumbai business, regardless of size or sector, needs a website that works as hard as the city itself.</p>
                <p>VGot You brings Tamil Nadu's technical excellence and work ethic to Mumbai's market — delivering premium web design, branding and SEO services at transparent, affordable prices. No Mumbai agency overheads. No inflated city pricing. Just excellent work.</p>
                <div className="p-6 border border-red-600/20 bg-red-600/5 rounded-sm">
                  <p className="text-red-600 font-bold uppercase tracking-widest text-xs mb-2">The VGot You Advantage</p>
                  <p className="text-white text-sm">Mumbai-quality results. Tamil Nadu pricing. The smart choice for growing businesses in the financial capital.</p>
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
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Mumbai <span className="text-red-600">FAQ</span></h2>
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
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 uppercase">Join Mumbai Businesses <br />Growing with VGot You</h2>
              <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto">Premium web design. Transparent pricing. Get a professional, SEO-optimised website that drives results.</p>
              <Link 
                to="/contact?message=Hi VGot You, I'm interested in a web design quote for my Mumbai-based business." 
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

export default MumbaiWebPage;
