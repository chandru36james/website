import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";   // ✅ SEO

// FIX: Cast motion to any to resolve IntrinsicAttributes prop errors for motion components
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

const WebDesignIndia: React.FC = () => {
  const hubs = [
    "Tamil Nadu", "Karnataka", "Kerala", "Maharashtra", "Delhi NCR", "Telangana", "Andhra Pradesh", "Gujarat", "West Bengal"
  ];

  return (
    <div className="bg-[#020202] text-white selection:bg-red-600/30 overflow-x-hidden pt-16 md:pt-20">
      <Helmet>

  {/* ================= BASIC SEO ================= */}
  <html lang="en-IN" />


  {/* FIXED: Trimmed to under 60 chars */}
  <title>Web Design Company in India | VGot You – Karur, Tamil Nadu</title>

  <meta
    name="description"
    content="VGot You is a leading web design company in India offering custom, responsive, and SEO-optimised websites for startups, MSMEs, exporters and enterprises. Based in Karur, Tamil Nadu, serving clients nationwide."
  />

  {/* FIXED: Removed meta keywords */}

  <meta name="author" content="VGot You" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://www.vgotyou.com/web-design-india" />

  {/* ================= HREFLANG ================= */}
  {/* ADDED: Was completely missing */}
  <link rel="alternate" hrefLang="en-IN" href="https://www.vgotyou.com/web-design-india" />
  <link rel="alternate" hrefLang="en-GB" href="https://www.vgotyou.com/web-design-uk" />
  <link rel="alternate" hrefLang="x-default" href="https://www.vgotyou.com/" />

  {/* ================= OPEN GRAPH ================= */}
  <meta property="og:type" content="website" />
  
  <meta property="og:site_name" content="VGot You" />
  {/* FIXED: og:title now matches <title> exactly */}
  <meta property="og:title" content="Web Design Company in India | VGot You – Karur, Tamil Nadu" />
  <meta
    property="og:description"
    content="VGot You is a leading web design company in India offering custom, responsive, and SEO-optimised websites for startups, MSMEs, exporters and enterprises. Based in Karur, Tamil Nadu."
  />
  <meta property="og:url" content="https://www.vgotyou.com/web-design-india" />
  <meta property="og:image" content="https://www.vgotyou.com/assets/web-designer.png" />
  {/* FIXED: width, height and alt were missing */}
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Web Design Company in India – VGot You, Karur Tamil Nadu" />
  <meta property="og:locale" content="en_IN" />
  {/* FIXED: og:locale:alternate was missing */}
  <meta property="og:locale:alternate" content="en_GB" />

  {/* ================= TWITTER / X ================= */}
  <meta name="twitter:card" content="summary_large_image" />
  {/* FIXED: twitter:title now matches <title> exactly */}
  <meta name="twitter:title" content="Web Design Company in India | VGot You – Karur, Tamil Nadu" />
  <meta
    name="twitter:description"
    content="Leading web design company in India. Custom, SEO-optimised websites for startups, MSMEs, exporters and enterprises. Based in Karur, Tamil Nadu."
  />
  <meta name="twitter:image" content="https://www.vgotyou.com/assets/web-designer.png" />
  {/* FIXED: twitter:site and twitter:creator were missing */}
  <meta name="twitter:site" content="@vgotyou" />
  <meta name="twitter:creator" content="@vgotyou" />

  {/* ================= SCHEMA: WEB PAGE ================= */}
  {/* ADDED: Was completely missing — links page into schema graph */}
  <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://www.vgotyou.com/web-design-india#webpage",
      "url": "https://www.vgotyou.com/web-design-india",
      "name": "Web Design Company in India | VGot You – Karur, Tamil Nadu",
      "description": "Leading web design company in India offering custom, responsive, and SEO-optimised websites for startups, MSMEs, exporters and enterprises across all major cities and states.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@id": "https://www.vgotyou.com/#website"
      },
      "publisher": {
        "@id": "https://www.vgotyou.com/#organization"
      },
      "about": {
        "@id": "https://www.vgotyou.com/web-design-india#service"
      }
    }
  `}</script>

  {/* ================= SCHEMA: SERVICE ================= */}
  
  <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://www.vgotyou.com/web-design-india#service",
      "name": "Web Design Services in India",
      "url": "https://www.vgotyou.com/web-design-india",
      "description": "Professional website design and development services across India — offering responsive, SEO-optimised, and conversion-focused websites for startups, MSMEs, exporters and enterprises in Tamil Nadu, Karnataka, Maharashtra, Delhi, Kerala and all major states.",
      "serviceType": [
        "Web Design",
        "Website Development",
        "UI UX Design",
        "Responsive Web Design",
        "E-commerce Website Design",
        "SEO-Optimised Web Design",
        "Startup Website Design",
        "Corporate Website Development",
        "Lead Generation Website Design",
        "MSME Website Design India"
      ],
      "provider": {
        "@id": "https://www.vgotyou.com/#localbusiness"
      },
      "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "State", "name": "Tamil Nadu" },
        { "@type": "State", "name": "Karnataka" },
        { "@type": "State", "name": "Kerala" },
        { "@type": "State", "name": "Maharashtra" },
        { "@type": "State", "name": "Telangana" },
        { "@type": "State", "name": "Andhra Pradesh" },
        { "@type": "State", "name": "Gujarat" },
        { "@type": "State", "name": "West Bengal" },
        { "@type": "City", "name": "Chennai" },
        { "@type": "City", "name": "Mumbai" },
        { "@type": "City", "name": "Bengaluru" },
        { "@type": "City", "name": "Hyderabad" },
        { "@type": "City", "name": "Delhi" },
        { "@type": "City", "name": "Coimbatore" },
        { "@type": "City", "name": "Karur" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Web Design Services across India",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Business Website Design for Indian SMEs and MSMEs" }
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "E-commerce Website Development India" }
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Startup Branding and Website Design India" }
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "SEO Services for Indian Businesses" }
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "B2B Export Website Design India" }
          }
        ]
      },
      "offers": {
        "@type": "Offer",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "INR",
          "minPrice": "4999",
          "maxPrice": "200000",
          "description": "Web design packages for Indian businesses starting from ₹4,999 up to ₹2,00,000 for enterprise projects"
        }
      }
    }
  `}</script>

  {/* ================= SCHEMA: FAQ PAGE ================= */}
  {/*
    ADDED: Critical — 4 FAQ items on page with zero FAQ schema.
    Matches exact questions and answers in your FAQItem components.
    The pricing FAQ is especially powerful for Google rich results.
  */}
  <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are the web design costs in India?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Web design costs in India vary based on project scope. Basic custom sites start from ₹4,999, while large-scale corporate portals and e-commerce platforms can range from ₹25,000 to ₹2,00,000 depending on features and technical complexity."
          }
        },
        {
          "@type": "Question",
          "name": "Can an Indian web design agency handle international projects?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. VGot You specialises in building websites for Indian exporters and manufacturers that meet global design and performance standards, ensuring you look world-class to international buyers."
          }
        },
        {
          "@type": "Question",
          "name": "How do you handle SEO for Indian businesses?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We implement a multi-layered SEO strategy including technical optimisation, schema markup, and keyword-focused content that targets both national keywords like 'web development India' and city-level queries."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide website maintenance services in India?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we offer comprehensive 24/7 technical support and maintenance packages for businesses across India to ensure high uptime, security updates, and performance optimisation."
          }
        }
      ]
    }
  `}</script>

  {/* ================= SCHEMA: BREADCRUMB ================= */}
  {/* KEPT: Already correct — converted to template literal */}
  <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.vgotyou.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Web Design",
          "item": "https://www.vgotyou.com/web-design"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "India",
          "item": "https://www.vgotyou.com/web-design-india"
        }
      ]
    }
  `}</script>

</Helmet>


      <style>{`
        .text-technical { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
        .bg-grid {
          background-image: linear-gradient(to right, #ffffff03 1px, transparent 1px),
                            linear-gradient(to bottom, #ffffff03 1px, transparent 1px);
          background-size: 30px 30px;
        }
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>

      {/* Hero Section: The National Hub */}
      <section className="relative min-h-[85vh] md:min-h-[85vh] flex items-center justify-center border-b border-zinc-900 bg-grid overflow-hidden px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-90"></div>
        <div className="absolute top-1/4 right-0 w-1/2 h-1/2 bg-red-600/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="w-full h-1 bg-red-600/50 shadow-[0_0_15px_rgba(220,38,38,0.5)] animate-scan"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <m.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="w-6 md:w-10 h-[1px] bg-red-600"></div>
                <TechnicalBadge className="mb-0">Node_Active: Pan_India_Uplink</TechnicalBadge>
              </div>
              
              <h1 className="text-[14vw] sm:text-[9.5vw] md:text-[8vw] font-black leading-[0.75] tracking-tighter uppercase mb-8 md:mb-10">
                  Scaling <br/>
                  <span className="text-zinc-800">Digital India.</span>
                </h1>

                {/* ADDED: sr-only h2 for keyword support */}
                <h2 className="sr-only">
                  Web Design Company in India – Custom Websites for Startups, MSMEs & Exporters | VGot You
                </h2>

                <p className="text-base md:text-xl text-zinc-500 font-light leading-relaxed mb-10 md:mb-12 max-w-xl">
                  {/* FIXED: Self-link removed — page should not link to itself */}
                  VGot You is a premier <span className="text-zinc-300">web design company in India</span>, building high-performance digital assets for startups, MSMEs, and global exporters.
                </p>

              <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
                <Link to="/contact" className="w-full sm:w-auto group relative px-10 md:px-12 py-4 md:py-5 bg-red-600 text-white font-bold rounded-sm text-[10px] md:text-xs uppercase tracking-[0.4em] overflow-hidden transition-all shadow-[0_0_40px_rgba(220,38,38,0.2)] hover:shadow-red-600/40 text-center">
                  <span className="relative z-10">Launch Project</span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="absolute inset-0 z-10 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">Contact Now</span>
                </Link>
                
                <div className="flex flex-col justify-center text-center sm:text-left">
                  <span className="text-technical text-[6px] md:text-[7px] text-zinc-700 uppercase tracking-widest mb-1">Service_Node</span>
                  <span className="text-technical text-[9px] md:text-[10px] text-red-600 font-bold uppercase tracking-widest">India_Global_Active</span>
                </div>
              </div>
            </m.div>

            <div className="relative hidden lg:block">
              <m.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="relative aspect-square border border-zinc-900 bg-zinc-950/50 rounded-sm p-8 group"
              >
                <HUDMarker />
                <div className="absolute top-0 right-0 rotate-90"><HUDMarker /></div>
                <div className="absolute bottom-0 right-0 rotate-180"><HUDMarker /></div>
                <div className="absolute bottom-0 left-0 -rotate-90"><HUDMarker /></div>

                <div className="relative w-full h-full overflow-hidden border border-zinc-900 rounded-sm grayscale group-hover:grayscale-0 transition-all duration-1000">
                  <img 
                    src="https://www.vgotyou.com/assets/bse.jpg" 
                    alt="Web design services for Indian businesses – VGot You, Karur Tamil Nadu" 
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" 
                    loading="eager"
                    decoding="async"
                  />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 border border-red-600/30 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                      </div>
                      <span className="text-technical text-[8px] text-zinc-600 uppercase">Region: South_Asia_Core</span>
                    </div>
                    
                    <div className="bg-black/80 backdrop-blur-md border border-zinc-800 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <div className="flex justify-between text-[8px] font-mono text-zinc-500 mb-2 uppercase tracking-widest">
                        <span>National_Uplink</span>
                        <span className="text-red-600">Verified</span>
                      </div>
                      <div className="h-[2px] w-full bg-zinc-900 overflow-hidden">
                        <m.div 
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2, delay: 1 }}
                          className="h-full bg-red-600"
                        ></m.div>
                      </div>
                    </div>
                  </div>
                </div>
              </m.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Metrics Bar */}
      <section className="py-12 border-b border-zinc-900 bg-black px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10">
            <MetricBlock label="Global Reach" value="50+" sub="Deployed Nodes" />
            <MetricBlock label="Experience" value="02+" sub="Years Expertise" />
            <MetricBlock label="Authority" value="4.9/5" sub="Client Rating" />
            <MetricBlock label="Performance" value="99.9%" sub="System Uptime" />
          </div>
        </div>
      </section>

      {/* Strategic Intelligence: Why India */}
      <section className="py-20 md:py-24 px-6 border-b border-zinc-900 bg-[#050505]">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-10 md:gap-16">
            <div className="lg:col-span-1">
              <TechnicalBadge>Global_Standard</TechnicalBadge>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 md:mb-8 leading-none">
                India's <br/> Digital Advantage.
              </h2>
              <p className="text-zinc-500 text-xs md:text-sm leading-relaxed mb-6 md:mb-8">
                In India’s fast-paced digital economy, your website is your most powerful asset. We deliver world-class <strong>website design in India</strong> that combines affordable pricing with global quality standards.
              </p>
              <Link to="/web-design-tamil-nadu" className="text-technical text-[8px] md:text-[9px] font-bold text-red-600 hover:text-white transition-colors uppercase tracking-[0.3em] inline-flex items-center gap-3">
                Tamil_Nadu_Node
                <span className="w-6 h-[1px] bg-red-600"></span>
              </Link>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {[
                { t: "Global Design Standards", d: "Merging Indian market insights with international UI/UX trends to help you compete globally.", code: "GLB-STD" },
                { t: "Mobile-First Infrastructure", d: "India is mobile-first. Our designs are optimized for 5G speed and every mobile viewport.", code: "MOB-NET" },
                { t: "MSME Powerhouse", d: "Custom solutions designed to scale Indian MSMEs and exporters into digital leaders.", code: "MSME-X" },
                { t: "SEO Domination", d: "Technical SEO and schema markup to rank for national and local search queries across India.", code: "NAT-SEO" }
              ].map((item, i) => (
                <div key={i} className="p-6 md:p-8 border border-zinc-900 bg-black rounded-sm group hover:border-red-600/30 transition-all">
                  <span className="text-technical text-[7px] md:text-[8px] text-zinc-800 group-hover:text-red-600 transition-colors block mb-3 md:mb-4">[{item.code}]</span>
                  <h3 className="text-base md:text-lg font-bold uppercase mb-2 md:mb-3 text-white">{item.t}</h3>
                  <p className="text-zinc-500 text-[10px] md:text-xs leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cluster Case Studies (Pillar-Cluster Internal Linking) */}
      <section className="py-16 md:py-24 px-6 border-b border-zinc-900 bg-black overflow-hidden relative">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="mb-12 md:mb-20">
            <TechnicalBadge>Success_Archives</TechnicalBadge>
            <h2 className="text-3xl md:text-7xl font-black uppercase tracking-tighter mt-4">National Impact Cases</h2>
            <p className="text-zinc-500 mt-3 md:mt-4 text-xs md:text-base max-w-2xl">Examining how we scale Indian businesses through specialized web architecture and SEO frameworks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { 
                title: "B2B Manufacturing Scale", 
                desc: "Scaling Indian textile exporters for global buyers through technical SEO and authority building.", 
                link: "/blog/arctic-textiles",
                label: "Read Case Study"
              },
              { 
                title: "E-commerce Optimization", 
                desc: "Building a high-performance direct-to-consumer textile brand with custom checkout logic.", 
                link: "/blog/vesa-homes-ecommerce",
                label: "Explore Architecture"
              },
              { 
                title: "Strategic Brand Authority", 
                desc: "Transforming local service providers into national authorities through search-optimized design.", 
                link: "/blog/from-local-brand-to-online-authority",
                label: "View Strategy"
              }
            ].map((caseStudy, i) => (
              <div key={i} className="p-6 md:p-8 border border-zinc-800 bg-[#080808] hover:border-red-600/50 transition-all group rounded-sm flex flex-col justify-between min-h-[220px] md:min-h-[300px]">
                <div>
                  <h3 className="text-lg md:text-xl font-bold uppercase text-white mb-3 md:mb-4 group-hover:text-red-500 transition-colors leading-tight">{caseStudy.title}</h3>
                  <p className="text-zinc-500 text-[10px] md:text-xs leading-relaxed mb-6 md:mb-8">{caseStudy.desc}</p>
                </div>
                <Link to={caseStudy.link} className="inline-flex items-center gap-3 md:gap-4 text-technical text-[8px] md:text-[9px] font-bold text-white uppercase tracking-[0.3em] hover:text-red-600 transition-all">
                  {caseStudy.label}
                  <div className="w-6 md:w-8 h-[1px] bg-zinc-800 group-hover:w-12 group-hover:bg-red-600 transition-all"></div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domain Expertise Grid (Proof Elements) */}
      <section className="py-16 md:py-24 px-6 border-b border-zinc-900 bg-[#050505] overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-16 gap-4 md:gap-6">
            <div className="max-w-xl">
              <TechnicalBadge>Industry_E-E-A-T</TechnicalBadge>
              <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mt-4">Verified Sector Expertise</h2>
            </div>
            <span className="text-technical text-[6px] md:text-[8px] text-zinc-700 uppercase tracking-[0.4em] mb-2">B2B_PROTOCOL_V4.0</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {[
              { name: "Textile Exports", projects: "12+ Live", icon: "🧵" },
              { name: "Real Estate", projects: "08+ Live", icon: "🏠" },
              { name: "E-commerce", projects: "15+ Live", icon: "🛒" },
              { name: "Manufacturing", projects: "10+ Live", icon: "🏭" },
              { name: "Healthcare", projects: "05+ Live", icon: "🏥" },
              { name: "Edu-Tech", projects: "04+ Live", icon: "🎓" },
              { name: "Logistics", projects: "06+ Live", icon: "🚛" },
              { name: "Startups", projects: "20+ Live", icon: "🚀" }
            ].map((sector, i) => (
              <div key={i} className="p-4 md:p-6 border border-zinc-900 bg-zinc-950/30 rounded-sm hover:border-zinc-700 transition-all flex flex-col gap-3 md:gap-4 group">
                <span className="text-xl md:text-2xl grayscale group-hover:grayscale-0 transition-all">{sector.icon}</span>
                <div>
                  <h4 className="font-bold text-white uppercase text-[10px] md:text-xs tracking-wider mb-1">{sector.name}</h4>
                  <span className="text-technical text-[7px] md:text-[8px] text-red-600 font-bold">{sector.projects}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connectivity Hub: Regional Mapping */}
      <section className="py-16 md:py-24 px-6 border-b border-zinc-900 bg-black relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <TechnicalBadge>Regional_Integration</TechnicalBadge>
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mt-4">Serving Every Hub</h2>
            <p className="text-zinc-500 text-[8px] md:text-xs font-mono uppercase tracking-widest mt-3 md:mt-4">Connecting national business centers through digital excellence.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-5xl mx-auto">
            {hubs.map((hub, i) => (
              <m.div 
                key={i}
                whileHover={{ scale: 1.05, borderColor: '#dc2626' }}
                className="px-4 py-2 md:px-6 md:py-3 border border-zinc-800 bg-zinc-950/50 rounded-sm text-technical text-[8px] md:text-[10px] uppercase tracking-widest text-zinc-400 hover:text-white transition-all cursor-default"
              >
                {hub}
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Diagnostic Module: Capabilities */}
      <section className="py-16 md:py-24 px-6 relative bg-[#050505] border-b border-zinc-900">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6 md:gap-8">
            <div className="max-w-2xl">
              <TechnicalBadge>Service_Array</TechnicalBadge>
              <h2 className="text-3xl md:text-7xl font-black uppercase tracking-tighter mt-4">Indian <span className="text-zinc-800">Capabilities</span></h2>
            </div>
            <p className="text-zinc-600 text-technical text-[8px] md:text-[9px] uppercase tracking-widest leading-loose text-right hidden lg:block border-l border-zinc-900 pl-8">
              // PAN_INDIA_SUPPORT <br/>
              // STARTUP_FOCUSED <br/>
              // SEO_INTEGRATED
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {[
              { t: "Business Web Design", d: "Professional corporate websites that build trust and authority in the Indian market.", code: "CORP-01" },
              { t: "E-commerce Dev", d: "High-conversion online stores built with Shopify, WooCommerce, and custom Next.js platforms.", code: "SHOP-02" },
              { t: "UI/UX Engineering", d: "User-centric interfaces optimized for engagement and conversion across Indian demographics.", code: "UX-03" },
              { t: "SEO Mastery", d: "Strategic optimization to rank for 'Best web designers in India' and national industry keywords.", code: "SEO-04" },
              { t: "Startup Identity", d: "Complete branding and digital architecture for India's next generation of unicorns.", code: "STRT-05" },
              { t: "Lead Gen Portals", d: "Conversion-focused layouts engineered to turn website traffic into real business enquiries.", code: "LEAD-06" }
            ].map((s, i) => (
              <div key={i} className="p-8 md:p-10 border border-zinc-900 bg-zinc-950/30 hover:bg-black transition-colors group">
                <span className="text-technical text-[7px] md:text-[8px] text-red-600/40 mb-6 md:mb-8 block group-hover:text-red-600 transition-colors">[{s.code}]</span>
                <h3 className="text-lg md:text-xl font-bold uppercase mb-3 md:mb-4 text-white group-hover:text-red-500 transition-colors">{s.t}</h3>
                <p className="text-zinc-600 text-xs md:text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Indian Web FAQ Section */}
      <section className="py-16 md:py-24 px-6 relative bg-black border-b border-zinc-900">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 md:mb-16">
            <TechnicalBadge>Diagnostic_QA</TechnicalBadge>
            <h2 className="text-2xl md:text-6xl font-black uppercase tracking-tighter mb-2 md:mb-4 mt-4">India Web Services FAQ</h2>
            <p className="text-zinc-500 text-[8px] md:text-xs tracking-widest uppercase">Resolving common digital queries for Indian enterprises.</p>
          </div>
          
          <div className="space-y-1">
            <FAQItem 
              question="What are the web design costs in India?" 
              answer="Web design costs in India vary based on project scope. Basic custom sites start from ₹4,999, while large-scale corporate portals and e-commerce platforms can range from ₹25,000 to ₹2,00,000 depending on features and technical complexity."
            />
            <FAQItem 
              question="Can an Indian web design agency handle international projects?" 
              answer="Absolutely. VGot You specializes in building websites for Indian exporters and manufacturers that meet global design and performance standards, ensuring you look world-class to international buyers."
            />
            <FAQItem 
              question="How do you handle SEO for Indian businesses?" 
              answer="We implement a multi-layered SEO strategy including technical optimization, schema markup, and keyword-focused content that targets both national keywords ('web development India') and city-level queries."
            />
            <FAQItem 
              question="Do you provide website maintenance services in India?" 
              answer="Yes, we offer comprehensive 24/7 technical support and maintenance packages for businesses across India to ensure high uptime, security updates, and performance optimization."
            />
          </div>
        </div>
      </section>

      {/* Final Call to Action: The National Uplink */}
      <section className="py-24 md:py-48 px-6 text-center bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.1)_0%,transparent_70%)] opacity-50"></div>
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto relative z-10"
        >
          <div className="text-technical text-[8px] md:text-[10px] text-red-600 font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] mb-10 md:mb-12">Action_Matrix: National_Deployment</div>
          <h2 className="text-[12vw] sm:text-[10vw] md:text-[8.5vw] font-black uppercase leading-[0.8] mb-12 md:mb-16 tracking-tighter">
            Elevate Your <br/>
            <span className="text-zinc-800">Indian Brand.</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-10">
            <Link to="/contact" className="relative w-full sm:w-auto px-12 md:px-16 py-5 md:py-6 bg-red-600 text-white font-bold rounded-sm text-xs md:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em] shadow-[0_0_50px_rgba(220,38,38,0.3)] hover:scale-105 transition-all">
              Initiate India Node
            </Link>
            <p className="text-technical text-[8px] md:text-[9px] text-zinc-600 uppercase tracking-widest text-left hidden sm:block border-l border-zinc-800 pl-8 leading-loose">
              // PAN_INDIA_ACTIVE <br/>
              // STARTUP_READY <br/>
              // TERMINAL_NODE: 8080
            </p>
          </div>
        </m.div>
      </section>
    </div>
  );
};

export default WebDesignIndia;