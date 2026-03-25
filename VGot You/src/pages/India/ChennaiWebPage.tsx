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

const ChennaiWebPage: React.FC = () => {
  const industries = [
    {
      title: "IT & Technology",
      desc: "Websites for Chennai's world-class IT companies, SaaS startups and tech service providers on the OMR corridor."
    },
    {
      title: "Manufacturing & Export",
      desc: "Professional B2B websites for Chennai's Ambattur Industrial Estate manufacturers and export businesses targeting global buyers."
    },
    {
      title: "Healthcare & Education",
      desc: "Trust-building websites for Chennai's top hospitals, clinics, schools and educational institutions."
    },
    {
      title: "Retail & E-commerce",
      desc: "High-converting online stores for Chennai retailers targeting customers across Tamil Nadu and India."
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
      a: "Our Chennai web design packages start from ₹4,999 for a standard business website. Custom e-commerce or corporate portals are priced based on scope. We provide fixed-price quotes with no hidden fees."
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
    <div className="bg-[#020202] text-white selection:bg-red-600/30 overflow-x-hidden pt-16 md:pt-20">
      <Helmet>
        <html lang="en-IN" />
        <title>Web Design Company in Chennai | VGot You – Tamil Nadu</title>
        <meta name="description" content="VGot You is a professional web design company serving Chennai businesses — from Anna Nagar startups to OMR tech firms. Fast, SEO-optimised websites from ₹4,999." />
        <meta name="author" content="VGot You" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.vgotyou.com/web-design-chennai" />
        <link rel="alternate" hrefLang="en-IN" href="https://www.vgotyou.com/web-design-chennai" />
        <link rel="alternate" hrefLang="en-GB" href="https://www.vgotyou.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.vgotyou.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="VGot You" />
        <meta property="og:title" content="Web Design Company in Chennai | VGot You – Tamil Nadu" />
        <meta property="og:description" content="VGot You is a professional web design company serving Chennai businesses — from Anna Nagar startups to OMR tech firms. Fast, SEO-optimised websites from ₹4,999." />
        <meta property="og:url" content="https://www.vgotyou.com/web-design-chennai" />
        <meta property="og:image" content="https://www.vgotyou.com/assets/og-home.png" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Web Design Company in Chennai | VGot You – Tamil Nadu" />
        <meta name="twitter:description" content="VGot You is a professional web design company serving Chennai businesses — from Anna Nagar startups to OMR tech firms. Fast, SEO-optimised websites from ₹4,999." />
        <meta name="twitter:image" content="https://www.vgotyou.com/assets/og-home.png" />
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

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 border-b border-zinc-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <TechnicalBadge className="mb-6">Location: Chennai, TN</TechnicalBadge>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              WEB DESIGN <br />
              <span className="text-red-600">CHENNAI.</span>
            </h1>
            <h2 className="sr-only">Web Design Company in Chennai, Tamil Nadu – Affordable, SEO-Ready Websites for Chennai Businesses | VGot You</h2>
            <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              Chennai is Tamil Nadu's capital and India's fourth largest city — home to a thriving IT corridor, a booming startup ecosystem and one of India's strongest export economies. VGot You builds high-performance, SEO-optimised websites for Chennai businesses — from Anna Nagar retailers to OMR tech companies and Mylapore service providers.
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
            <MetricBlock label="Team" value="TN" sub="Based Experts" />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-32 border-b border-zinc-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8 uppercase">Web Design for <br /><span className="text-red-600">Chennai Businesses</span></h2>
              <div className="space-y-6 text-zinc-400 text-sm md:text-base leading-relaxed">
                <p>Chennai's business landscape is one of India's most diverse — spanning IT services, manufacturing, healthcare, retail, education and a world-class export sector. Whether you're a startup on the OMR tech corridor, a manufacturer in Ambattur, or a professional services firm in Anna Nagar, your website is your most important business asset.</p>
                <p>VGot You is a Karur-based web design company with deep roots in Tamil Nadu — which means we understand Chennai's business culture, its competitive landscape and what it takes to stand out in one of India's largest markets.</p>
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

      {/* Services Grid */}
      <section className="py-20 md:py-32 border-b border-zinc-900 bg-zinc-950/30">
        <div className="container mx-auto px-6">
          <div className="mb-20">
            <TechnicalBadge className="mb-4">Our Expertise</TechnicalBadge>
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase">Services for <span className="text-red-600">Chennai</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900">
            {services.map((service, i) => (
              <div key={i} className="bg-[#020202] p-10 group hover:bg-zinc-950 transition-colors">
                <h3 className="text-white font-bold uppercase tracking-tight mb-4 group-hover:text-red-600 transition-colors">{service.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why VGot You */}
      <section className="py-20 md:py-32 border-b border-zinc-900">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8 uppercase">Why VGot You for <span className="text-red-600">Chennai</span></h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              VGot You is based in Karur, Tamil Nadu — which means we're your local digital partner with an intimate understanding of Tamil Nadu's business culture and market dynamics. We deliver world-class web design at transparent, affordable prices — without the overhead of a Chennai city agency.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 border-b border-zinc-900 bg-zinc-950/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <TechnicalBadge className="mb-4">Common Questions</TechnicalBadge>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Chennai <span className="text-red-600">FAQ</span></h2>
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
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 uppercase">Join Chennai Businesses <br />Growing with VGot You</h2>
              <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto">Get a professional, SEO-optimised website that drives results. Free quote in 24 hours.</p>
              <Link 
                to="/contact?message=Hi VGot You, I'm interested in a web design quote for my Chennai-based business." 
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

export default ChennaiWebPage;
