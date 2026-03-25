import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";   // ✅ SEO
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

const WebDesignKarur: React.FC = () => {
  const sectors = [
    { name: "Textile Export", code: "TX-01", growth: "+45%" },
    { name: "Spinning Mills", code: "SM-02", growth: "+32%" },
    { name: "Real Estate", code: "RE-03", growth: "+28%" },
    { name: "Retail Hubs", code: "RH-04", growth: "+50%" }
  ];

  return (
    <div className="bg-[#020202] text-white selection:bg-red-600/30 overflow-x-hidden pt-16 md:pt-20">
      <Helmet>

  {/* ================= BASIC SEO ================= */}
  <html lang="en-IN" />

  {/* FIXED: Trimmed from 74 chars to under 60 */}
  <title>Web Design Company in Karur, Tamil Nadu | VGot You</title>

  <meta
    name="description"
    content="VGot You is a leading web design company in Karur, Tamil Nadu offering custom, responsive, and SEO-optimised websites for textile exporters, MSME businesses, and startups across India."
  />

  {/* FIXED: Removed meta keywords */}

  <meta name="author" content="VGot You" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://www.vgotyou.com/web-design-karur" />

  {/* ================= HREFLANG ================= */}
  {/* ADDED: Was completely missing */}
  <link rel="alternate" hrefLang="en-IN" href="https://www.vgotyou.com/web-design-karur" />
  <link rel="alternate" hrefLang="en-GB" href="https://www.vgotyou.com/web-design-karur" />
  <link rel="alternate" hrefLang="x-default" href="https://www.vgotyou.com/web-design-karur" />

  {/* ================= OPEN GRAPH ================= */}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="VGot You" />
  {/* FIXED: og:title now matches <title> exactly */}
  <meta property="og:title" content="Web Design Company in Karur, Tamil Nadu | VGot You" />
  <meta
    property="og:description"
    content="VGot You is a leading web design company in Karur, Tamil Nadu offering custom, responsive, and SEO-optimised websites for textile exporters, MSME businesses, and startups across India."
  />
  <meta property="og:url" content="https://www.vgotyou.com/web-design-karur" />
  <meta property="og:image" content="https://www.vgotyou.com/assets/web-designer.png" />
  {/* FIXED: width, height and alt were missing */}
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Web Design Company in Karur, Tamil Nadu – VGot You" />
  <meta property="og:locale" content="en_IN" />
  {/* FIXED: og:locale:alternate was missing */}
  <meta property="og:locale:alternate" content="en_GB" />

  {/* ================= TWITTER / X ================= */}
  <meta name="twitter:card" content="summary_large_image" />
  {/* FIXED: twitter:title now matches <title> exactly */}
  <meta name="twitter:title" content="Web Design Company in Karur, Tamil Nadu | VGot You" />
  <meta
    name="twitter:description"
    content="Leading web design company in Karur, Tamil Nadu. Custom, SEO-optimised websites for textile exporters, MSME businesses and startups across India."
  />
  <meta name="twitter:image" content="https://www.vgotyou.com/assets/web-designer.png" />
  {/* FIXED: twitter:site and twitter:creator were missing */}
  <meta name="twitter:site" content="@vgotyou" />
  <meta name="twitter:creator" content="@vgotyou" />

  {/* ================= SCHEMA: WEB PAGE ================= */}
 
  <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://www.vgotyou.com/web-design-karur#webpage",
      "url": "https://www.vgotyou.com/web-design-karur",
      "name": "Web Design Company in Karur, Tamil Nadu | VGot You",
      "description": "Professional web design company in Karur, Tamil Nadu offering custom, responsive, and SEO-optimised websites for textile exporters, MSME businesses and startups.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@id": "https://www.vgotyou.com/#website"
      },
      "publisher": {
        "@id": "https://www.vgotyou.com/#organization"
      },
      "about": {
        "@id": "https://www.vgotyou.com/web-design-karur#service"
      }
    }
  `}</script>

  {/* ================= SCHEMA: SERVICE ================= */}
  
  <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://www.vgotyou.com/web-design-karur#service",
      "name": "Web Design Services in Karur, Tamil Nadu",
      "url": "https://www.vgotyou.com/web-design-karur",
      "description": "Professional website design and development services in Karur, Tamil Nadu — offering responsive, SEO-optimised, and conversion-focused websites for textile exporters, MSME businesses, and startups.",
      "serviceType": [
        "Web Design",
        "Website Development",
        "UI UX Design",
        "Responsive Web Design",
        "E-commerce Website Design",
        "SEO-Optimised Web Design",
        "Website Redesign",
        "B2B Export Catalog Websites"
      ],
      "provider": {
        "@id": "https://www.vgotyou.com/#localbusiness"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Karur",
          "containedInPlace": {
            "@type": "State",
            "name": "Tamil Nadu"
          }
        },
        {
          "@type": "State",
          "name": "Tamil Nadu"
        },
        {
          "@type": "Country",
          "name": "India"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Web Design Services in Karur",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Business Website Design for Karur SMEs" }
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Textile Export Catalog Websites" }
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "E-commerce Website Design" }
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "SEO Services for Karur Businesses" }
          }
        ]
      },
      "offers": {
        "@type": "Offer",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "INR",
          "description": "Affordable web design packages for Karur businesses — custom pricing based on project scope"
        }
      }
    }
  `}</script>

  {/* ================= SCHEMA: FAQ PAGE ================= */}
  
  <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I start a project if you are an online service?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Starting is easy. You can contact us via WhatsApp or our online form. We then schedule a video call to discuss your vision and requirements, providing a full digital proposal within 24 hours."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide maintenance for Karur textile websites?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our ongoing support packages are specifically designed for manufacturers, ensuring your international inquiry portals stay online and perform at 100% efficiency."
          }
        },
        {
          "@type": "Question",
          "name": "Can you handle large-scale e-commerce projects remotely?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. Our entire development pipeline is built for remote collaboration. We use shared staging environments where you can review progress in real-time from anywhere."
          }
        }
      ]
    }
  `}</script>

  {/* ================= SCHEMA: BREADCRUMB ================= */}

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
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Tamil Nadu",
          "item": "https://www.vgotyou.com/web-design-tamil-nadu"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Karur",
          "item": "https://www.vgotyou.com/web-design-karur"
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

      {/* Hero Section */}
      <section className="relative min-h-[80vh] md:min-h-[80vh] flex items-center justify-center border-b border-zinc-900 bg-grid overflow-hidden px-6">
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
                <TechnicalBadge className="mb-0">Node_Active: Karur_Service_Center</TechnicalBadge>
              </div>
              
             <h1 className="text-[8vw] sm:text-[6vw] md:text-[3.3vw] font-black leading-[0.9] tracking-tight uppercase mb-6 md:mb-8">
  Built for Karur. <br/>
  <span className="text-zinc-800">Built for Growth.</span>
</h1>
              
              <p className="text-base md:text-xl text-zinc-500 font-light leading-relaxed mb-10 md:mb-12 max-w-xl">
                VGot You is a top-rated affordable <Link to="/web-design" className="text-zinc-300 hover:text-red-600 transition-colors">online web design agency for Karur</Link>, specializing in digital platforms for the city's global textile export backbone.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
                <Link to="/contact?message=Hi VGot You, I'm interested in a web design quote for my Karur-based business." className="w-full sm:w-auto group relative px-10 md:px-12 py-4 md:py-5 bg-red-600 text-white font-bold rounded-sm text-[10px] md:text-xs uppercase tracking-[0.4em] overflow-hidden transition-all shadow-[0_0_40px_rgba(220,38,38,0.2)] hover:shadow-red-600/40 text-center">
                  <span className="relative z-10">Initiate Project</span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="absolute inset-0 z-10 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">Contact Now</span>
                </Link>
                
                <div className="flex flex-col justify-center text-center sm:text-left">
                  <span className="text-technical text-[6px] md:text-[7px] text-zinc-700 uppercase tracking-widest mb-1">Service_Status</span>
                  <span className="text-technical text-[9px] md:text-[10px] text-red-600 font-bold uppercase tracking-widest">REMOTE_SUPPORT_ACTIVE</span>
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
                    src="https://www.vgotyou.com/assets/Karur.jpg" 
                    alt="Karur textile industry – web design services for exporters by VGot You" 
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" 
                  />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 border border-red-600/30 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                      </div>
                      <span className="text-technical text-[8px] text-zinc-600 uppercase">Region: Karur_Industrial_Core</span>
                    </div>
                    
                    <div className="bg-black/80 backdrop-blur-md border border-zinc-800 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <div className="flex justify-between text-[8px] font-mono text-zinc-500 mb-2 uppercase tracking-widest">
                        <span>Local_Market_Impact</span>
                        <span className="text-red-600">94%</span>
                      </div>
                      <div className="h-[2px] w-full bg-zinc-950 overflow-hidden">
                        <m.div 
                          initial={{ width: 0 }}
                          animate={{ width: "94%" }}
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

      {/* SEO Section */}
      <section className="py-16 md:py-24 px-6 border-b border-zinc-950 bg-[#000000]">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-10 md:gap-16">
            <div className="lg:col-span-1">
              <TechnicalBadge>Diagnostic_Log</TechnicalBadge>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 md:mb-8 leading-none">
                SEO <br/> Domination.
              </h2>
              <p className="text-zinc-500 text-xs md:text-sm leading-relaxed mb-6 md:mb-8">
                As a leading <strong className="text-zinc-300 font-bold">SEO service for Karur businesses</strong>, we build marketing engines that rank for terms that drive B2B growth, helping textile exporters reach new global markets through specialized online search visibility.
              </p>
              <Link to="/web-design-tamil-nadu" className="text-technical text-[8px] md:text-[9px] font-bold text-red-600 hover:text-white transition-colors uppercase tracking-[0.3em] inline-flex items-center gap-3">
                Tamil_Nadu_Network
                <span className="w-6 h-[1px] bg-red-600"></span>
              </Link>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {[
                { t: "Market Search Visibility", d: "Targeting 'Karur textile exporters' and 'Best web designers' to place your brand in front of global decision-makers.", code: "MKT-SEO" },
                { t: "Efficient Online Delivery", d: "Our 100% remote workflow means we build and deploy your project with total digital transparency.", code: "REMOTE-X" },
                { t: "Export Protocol", d: "Digital catalog systems designed for international textile buyers with instant inquiry tools.", code: "EXP-PR" },
                { t: "Rapid Scaling", d: "High-speed deployment ensuring your Karur business goes live and starts ranking faster.", code: "SPEED" }
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

      {/* Blueprint */}
      <section className="py-16 md:py-24 px-6 border-b border-zinc-900 bg-black">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 md:mb-16">
            <TechnicalBadge>Market_Integration</TechnicalBadge>
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mt-4">Karur Industry Focus</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {sectors.map((sector, i) => (
              <m.div 
                key={i}
                whileHover={{ y: -5 }}
                className="relative p-5 md:p-6 border border-zinc-900 bg-zinc-950 flex flex-col items-center text-center group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/20 to-transparent"></div>
                <span className="text-technical text-[7px] md:text-[8px] text-zinc-600 mb-2">{sector.code}</span>
                <h4 className="text-sm md:text-lg font-bold uppercase tracking-tight text-zinc-300 group-hover:text-white transition-colors">{sector.name}</h4>
                <div className="mt-3 md:mt-4 text-technical text-[9px] md:text-xs font-bold text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                   REMOTE_READY
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-16 md:py-24 px-6 border-b border-zinc-900 bg-black overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-24">
            <div className="flex-1 order-2 lg:order-1">
              <div className="relative aspect-[16/10] rounded-sm overflow-hidden border border-zinc-800 shadow-2xl group">
                <img 
                  src="https://www.vgotyou.com/assets/arctic.png" 
                  alt="Arctic Textiles website design – Karur textile exporter case study by VGot You" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 flex flex-col">
                  <TechnicalBadge className="w-fit mb-2 border-red-600/30 text-red-500">Project: Arctic_Textiles_Archive</TechnicalBadge>
                  <span className="text-technical text-[9px] md:text-[10px] uppercase font-bold text-white tracking-widest">Global_Export_Node</span>
                </div>
              </div>
            </div>

            <div className="flex-1 order-1 lg:order-2">
              <TechnicalBadge>Portfolio_Insight</TechnicalBadge>
              <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-6 md:mb-8 leading-none">Global Standards, <br/> Online Excellence.</h2>
              <p className="text-zinc-500 text-sm md:text-lg leading-relaxed mb-8 md:mb-10">
                We've partnered with Karur manufacturing leaders to build B2B digital showrooms that connect factory floor quality directly to the international stage—all through our streamlined virtual consultation and development model.
              </p>
              <div className="grid grid-cols-2 gap-6 md:gap-8 border-t border-zinc-900 pt-8 md:pt-10">
                <div>
                  <span className="text-technical text-[7px] md:text-[8px] text-zinc-700 uppercase block mb-1">Service_Satisfaction</span>
                  <span className="text-2xl md:text-3xl font-black text-white">100%</span>
                </div>
                <div>
                  <span className="text-technical text-[7px] md:text-[8px] text-zinc-700 uppercase block mb-1">Global_Node_Uptime</span>
                  <span className="text-2xl md:text-3xl font-black text-white">99.9%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Linking: Success Stories / Cluster Nodes */}
      <section className="py-16 md:py-24 px-6 border-b border-zinc-900 bg-black overflow-hidden relative">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="mb-12 md:mb-20">
            <TechnicalBadge>Cluster_Nodes</TechnicalBadge>
            <h2 className="text-3xl md:text-7xl font-black uppercase tracking-tighter mt-4">Regional Success Archives</h2>
            <p className="text-zinc-500 mt-3 md:mt-4 text-xs md:text-base max-w-2xl italic">Deep dives into how we scale Karur's local icons into global digital authorities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
              <div key={i} className="p-6 md:p-8 border border-zinc-800 bg-[#080808] hover:border-red-600/50 transition-all group rounded-sm flex flex-col justify-between min-h-[220px] md:min-h-[250px]">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold uppercase text-white mb-3 md:mb-4 group-hover:text-red-500 transition-colors leading-tight">{caseStudy.title}</h3>
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

      {/* Services Register */}
      <section className="py-16 md:py-24 px-6 relative bg-[#050505] border-b border-zinc-900">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-6 md:gap-8">
            <div className="max-w-2xl">
              <TechnicalBadge>Protocol_List</TechnicalBadge>
              <h2 className="text-3xl md:text-7xl font-black uppercase tracking-tighter mt-4">Online <span className="text-zinc-800">Capabilities</span></h2>
            </div>
            <p className="text-zinc-600 text-technical text-[8px] md:text-[9px] uppercase tracking-widest leading-loose text-right hidden lg:block border-l border-zinc-900 pl-8">
              // NO_STOREFRONT_REQUIRED <br/>
              // MSME_PROTOCOL_READY <br/>
              // REMOTE_ONLY_OPERATIONS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {[
              { t: "Export Catalogs", d: "High-conversion digital catalogs designed for Karur textile exporters.", code: "EC-01" },
              { t: "Shopify Solutions", d: "Complete online store setups handled entirely through digital collaboration.", code: "SH-02" },
              { t: "Strategic SEO", d: "Technical analysis and keyword targeting to help your brand rank nationally.", code: "SF-03" },
              { t: "Visual Forging", d: "Modern logo design and branding services provided through our online laboratory.", code: "IL-04" },
              { t: "Content Creation", d: "Editing and creative direction to make your existing textile assets look world-class.", code: "PS-05" },
              { t: "Terminal Support", d: "24/7 technical assistance for your digital assets from our remote support nodes.", code: "SM-06" }
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

      {/* Internal SEO Hub Link */}
      <section className="py-16 md:py-20 px-6 border-b border-zinc-900 bg-zinc-950/20">
        <div className="container mx-auto max-w-7xl">
           <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 border border-zinc-800 p-8 md:p-12 rounded-sm relative overflow-hidden text-center md:text-left">
              <div className="absolute top-0 right-0 p-8 opacity-5 hidden sm:block">
                <svg width="200" height="200" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" stroke="white" strokeWidth="0.1" fill="none" /></svg>
              </div>
              <div className="relative z-10">
                 <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2">Regional Expansion</h2>
                 <p className="text-zinc-500 text-[10px] md:text-sm uppercase tracking-widest font-mono">Scaling digital growth across the entire Southern network.</p>
                 <div className="flex flex-wrap gap-4 mt-4">
                    <Link to="/web-design-chennai" className="text-technical text-[8px] text-zinc-600 hover:text-red-600 transition-colors uppercase tracking-widest">Also serving Chennai &rarr;</Link>
                    <Link to="/web-design-coimbatore" className="text-technical text-[8px] text-zinc-600 hover:text-red-600 transition-colors uppercase tracking-widest">Also serving Coimbatore &rarr;</Link>
                 </div>
              </div>
              <Link to="/web-design-tamil-nadu" className="relative z-10 group flex items-center gap-4 md:gap-6 text-technical text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-red-600 hover:text-white transition-all">
                Access Tamil Nadu Hub
                <div className="w-10 md:w-16 h-[1px] bg-red-600 group-hover:w-24 group-hover:bg-white transition-all"></div>
              </Link>
           </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 px-6 relative bg-black border-b border-zinc-900">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 md:mb-16">
            <TechnicalBadge>Diagnostic_QA</TechnicalBadge>
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-4 mt-4">Service FAQ</h2>
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
      <section className="py-24 md:py-48 px-6 text-center bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.1)_0%,transparent_70%)] opacity-50"></div>
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto relative z-10"
        >
          <div className="text-technical text-[8px] md:text-[10px] text-red-600 font-bold uppercase tracking-[0.5em] mb-10 md:mb-12">Action_Matrix: Online_Consultation</div>
          <h2 className="text-[12vw] sm:text-[10vw] md:text-[8.5vw] font-black uppercase leading-[0.8] mb-12 md:mb-16 tracking-tighter">
            Elevate Your <br/>
            <span className="text-zinc-800">Regional Brand.</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-10">
            <Link to="/contact?message=Hi VGot You, I'm interested in a web design quote for my Karur-based business." className="relative w-full sm:w-auto px-12 md:px-16 py-5 md:py-6 bg-red-600 text-white font-bold rounded-sm text-xs md:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em] shadow-[0_0_50px_rgba(220,38,38,0.3)] hover:scale-105 transition-all">
              Initialize Consultation
            </Link>
            <p className="text-technical text-[8px] md:text-[9px] text-zinc-600 uppercase tracking-widest text-left hidden sm:block border-l border-zinc-800 pl-8 leading-loose">
              // VIRTUAL_NODE_STABLE <br/>
              // GLOBAL_REACH_ENABLED <br/>
              // TERMINAL: ACTIVE
            </p>
          </div>
        </m.div>
      </section>
    </div>
  );
};

export default WebDesignKarur;