import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";   // ✅ SEO
// FIX: Cast motion to any to resolve IntrinsicAttributes prop errors for motion components
const m = motion as any;

const TechnicalBadge = ({ children, className }: { children?: React.ReactNode, className?: string }) => (
  <span className={`inline-block px-3 py-1 border border-zinc-800 rounded-sm bg-black/50 text-[8px] md:text-[9px] font-mono tracking-[0.4em] uppercase text-zinc-500 ${className}`}>
    {children}
  </span>
);

const DiagnosticStat = ({ value, label }: { value: string; label: string }) => (
  <div className="p-5 md:p-6 border border-zinc-900 bg-black/50 rounded-sm hover:border-red-600/30 transition-all group">
    <div className="text-technical text-[6px] md:text-[7px] text-zinc-700 uppercase mb-2 group-hover:text-red-600 transition-colors">METRIC_LOG</div>
    <div className="text-3xl md:text-4xl font-black text-white mb-1">{value}</div>
    <div className="text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{label}</div>
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

const SeoServices: React.FC = () => {
  return (
    <div className="bg-[#020202] text-white selection:bg-red-600/30 overflow-x-hidden pt-16 md:pt-20">
      
<Helmet>

  {/* ================= BASIC SEO ================= */}
  <html lang="en-IN" />

  {/* FIXED: Added India & UK location signal */}
  <title>SEO Services in India & UK | Search Engine Optimization – VGot You</title>

  <meta
    name="description"
    content="VGot You offers professional SEO services in India and the UK — helping businesses rank higher on Google, increase organic traffic, and generate quality leads through technical SEO, local SEO and content strategy."
  />

  {/* FIXED: Removed meta keywords */}

  <meta name="author" content="VGot You" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://www.vgotyou.com/seo-services" />

  {/* ================= HREFLANG ================= */}
  {/* ADDED: Was completely missing */}
  <link rel="alternate" hrefLang="en-IN" href="https://www.vgotyou.com/seo-services" />
  <link rel="alternate" hrefLang="en-GB" href="https://www.vgotyou.com/seo-services-uk" />
  <link rel="alternate" hrefLang="x-default" href="https://www.vgotyou.com/seo-services" />

  {/* ================= OPEN GRAPH ================= */}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="VGot You" />
  {/* FIXED: og:title now matches <title> exactly */}
  <meta property="og:title" content="SEO Services in India & UK | Search Engine Optimization – VGot You" />
  <meta
    property="og:description"
    content="Professional SEO services in India and the UK by VGot You — technical SEO, local SEO, e-commerce SEO and content strategy to improve Google rankings and drive organic growth."
  />
  <meta property="og:url" content="https://www.vgotyou.com/seo-services" />
  {/* FIXED: logo.png → og-home.png, consistent across all pages */}
  <meta property="og:image" content="https://www.vgotyou.com/assets/og-home.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  {/* FIXED: og:image:alt was missing */}
  <meta property="og:image:alt" content="SEO Services in India and UK – VGot You Search Engine Optimization" />
  <meta property="og:locale" content="en_IN" />
  {/* FIXED: og:locale:alternate was missing */}
  <meta property="og:locale:alternate" content="en_GB" />

  {/* ================= TWITTER / X ================= */}
  <meta name="twitter:card" content="summary_large_image" />
  {/* FIXED: twitter:title now matches <title> exactly */}
  <meta name="twitter:title" content="SEO Services in India & UK | Search Engine Optimization – VGot You" />
  <meta
    name="twitter:description"
    content="Professional SEO services in India and the UK by VGot You — technical SEO, local SEO and content strategy to improve Google rankings and drive organic growth."
  />
  {/* FIXED: Unified image — og and twitter now use same image */}
  <meta name="twitter:image" content="https://www.vgotyou.com/assets/og-home.png" />
  {/* FIXED: twitter:site and twitter:creator were missing */}
  <meta name="twitter:site" content="@vgotyou" />
  <meta name="twitter:creator" content="@vgotyou" />

  {/* ================= SCHEMA: WEB PAGE ================= */}
  {/* ADDED: Was completely missing */}
  <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://www.vgotyou.com/seo-services#webpage",
      "url": "https://www.vgotyou.com/seo-services",
      "name": "SEO Services in India & UK | Search Engine Optimization – VGot You",
      "description": "Professional SEO services in India and the UK by VGot You — technical SEO, local SEO, e-commerce SEO and content strategy.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@id": "https://www.vgotyou.com/#website"
      },
      "publisher": {
        "@id": "https://www.vgotyou.com/#organization"
      },
      "about": {
        "@id": "https://www.vgotyou.com/seo-services#service"
      }
    }
  `}</script>

  {/* ================= SCHEMA: SERVICE ================= */}
  
  <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://www.vgotyou.com/seo-services#service",
      "name": "Search Engine Optimization Services",
      "url": "https://www.vgotyou.com/seo-services",
      "description": "Professional SEO services to improve website rankings, organic traffic, and online visibility for businesses across India and the UK.",
      "serviceType": [
        "Search Engine Optimization",
        "Local SEO",
        "Technical SEO",
        "On-Page SEO",
        "Off-Page SEO",
        "E-commerce SEO",
        "Google Business Profile Optimization",
        "SEO Audit",
        "Keyword Research",
        "Link Building",
        "Content Strategy"
      ],
      "provider": {
        "@id": "https://www.vgotyou.com/#localbusiness"
      },
      "areaServed": [
        { "@type": "Country", "name": "India" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "State", "name": "Tamil Nadu" },
        { "@type": "City", "name": "Karur" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "SEO Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Local SEO for Indian Businesses" }
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Technical SEO Audit and Fixes" }
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "E-commerce SEO India and UK" }
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Google Business Profile Optimization" }
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "SEO Services for UK Businesses" }
          }
        ]
      },
      "offers": {
        "@type": "Offer",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "INR",
          "description": "Custom SEO packages based on business size, competition and target keywords"
        }
      }
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
          "name": "SEO Services",
          "item": "https://www.vgotyou.com/seo-services"
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
      <section className="relative min-h-[80vh] md:min-h-[85vh] flex items-center justify-center border-b border-zinc-900 bg-grid overflow-hidden px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-90"></div>
        
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="w-full h-1 bg-red-600/50 shadow-[0_0_15px_rgba(220,38,38,0.5)] animate-scan"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <TechnicalBadge className="mb-6 md:mb-8">Protocol: Visibility_Engine / VGot_You_SEO_4.0</TechnicalBadge>
            <h1 className="text-[12vw] sm:text-[10vw] md:text-[6.5vw] font-black leading-[0.85] tracking-tighter uppercase mb-8 md:mb-10">
              <span className="text-red-600">VGot You:</span> <br/>
              Rank Higher, <span className="text-zinc-800">Get Leads.</span>
            </h1>
            <h2 className="sr-only">
              SEO Services in India & UK – Technical SEO, Local SEO & Google Rankings | VGot You
            </h2>
            <p className="text-base md:text-xl text-zinc-500 font-light leading-relaxed mb-10 md:mb-12 max-w-3xl mx-auto px-4 md:px-0">
              <strong className="text-white font-bold">VGot You</strong> is a results-driven <strong className="text-zinc-300">SEO company in Tamil Nadu</strong> helping businesses improve Google rankings, generate organic traffic, and convert visitors into loyal customers.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8">
              <Link to="/contact" className="w-full sm:w-auto px-10 md:px-12 py-4 md:py-5 bg-red-600 text-white font-bold rounded-sm text-[10px] md:text-xs uppercase tracking-[0.4em] shadow-[0_0_40px_rgba(220,38,38,0.2)] hover:bg-red-500 transition-all">
                Audit With VGot You
              </Link>
              <div className="text-technical text-[9px] text-zinc-600 uppercase tracking-widest text-left hidden sm:block border-l border-zinc-800 pl-8 leading-loose">
                // SYSTEM_STATUS: RANKING <br/>
                // ALGORITHM_SYNC: ACTIVE <br/>
                // NODE: VGot_You_TAMIL_NADU
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Diagnostic Metrics */}
      <section className="py-16 md:py-20 border-b border-zinc-900 bg-black px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <DiagnosticStat value="280%" label="Avg. Traffic Increase" />
            <DiagnosticStat value="#1" label="VGot You Goal" />
            <DiagnosticStat value="14ms" label="Server Core Vitals" />
            <DiagnosticStat value="94/100" label="Technical SEO Score" />
          </div>
        </div>
      </section>

      {/* Local SEO Section */}
      <section className="py-20 md:py-24 px-6 border-b border-zinc-900 bg-[#050505]">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <TechnicalBadge>Target_Node: Karur</TechnicalBadge>
              <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-6 md:mb-8 mt-4">VGot You <br/><span className="text-zinc-800">SEO In Karur</span></h2>
              <p className="text-zinc-400 text-sm md:text-lg leading-relaxed mb-8 md:mb-10">
                As a leading <strong className="text-white font-bold">VGot You SEO company in Karur</strong>, we help local businesses, textile exporters, and service providers rank for high-intent keywords that drive real revenue.
              </p>
              
              <div className="space-y-3 mb-10 md:mb-12">
                {['Web design', 'SEO services', 'Website developer'].map((keyword, i) => (
                  <div key={i} className="flex items-center gap-3 md:gap-4 text-technical text-[10px] md:text-xs text-red-600">
                    <span className="w-4 md:w-6 h-[1px] bg-zinc-800"></span>
                    <span className="font-bold uppercase tracking-widest italic">{keyword}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {[
                  { t: "GBP Optimization", d: "VGot You dominates the map pack with verified Google Business Profiles." },
                  { t: "Local Intent Targeting", d: "Capturing users searching for your services 'near me'." },
                  { t: "Map Pack Ranking", d: "Strategic citation building to push you to the top 3 results." },
                  { t: "Reviews & Citations", d: "Building trust signals that Google's algorithm rewards." }
                ].map((item, i) => (
                  <div key={i} className="p-5 md:p-6 border border-zinc-900 bg-black rounded-sm">
                    <h3 className="font-bold uppercase text-[10px] md:text-xs tracking-widest text-white mb-2">{item.t}</h3>
                    <p className="text-zinc-500 text-[10px] md:text-[11px] leading-relaxed">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 relative aspect-square border border-zinc-900 bg-zinc-950/50 rounded-sm p-4 md:p-8 overflow-hidden group">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1)_0%,transparent_70%)]"></div>
               <img src="https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 transition-all duration-1000" alt="Local SEO Karur Strategy" />
               <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 right-6 md:right-12 bg-black/80 backdrop-blur-md border border-zinc-800 p-4 md:p-6">
                 <span className="text-technical text-[6px] md:text-[7px] text-zinc-600 uppercase block mb-2">VGot_You_Authority_Verification</span>
                 <div className="flex items-center gap-3 md:gap-4">
                    <div className="h-1 flex-grow bg-zinc-900 overflow-hidden">
                       <m.div initial={{ width: 0 }} whileInView={{ width: "98%" }} transition={{ duration: 2 }} className="h-full bg-red-600"></m.div>
                    </div>
                    <span className="text-technical text-[10px] font-bold text-white">98%</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* State-Level SEO Section */}
      <section className="py-20 md:py-24 px-6 border-b border-zinc-900 bg-black overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 md:mb-20">
            <TechnicalBadge>Regional_Expansion</TechnicalBadge>
            <h2 className="text-3xl md:text-7xl font-black uppercase tracking-tighter mt-4">VGot You SEO <br/><span className="text-zinc-800">Across Tamil Nadu</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {[
              { t: "On-page SEO", d: "Meticulous content optimization by VGot You for regional dominance.", code: "OPT-01" },
              { t: "Technical SEO", d: "Fixing core vitals, crawl errors, and indexation logic by VGot You engineers.", code: "SYS-02" },
              { t: "Content Mapping", d: "Strategic keyword integration for Coimbatore, Chennai, and Madurai hubs.", code: "CONT-03" },
              { t: "Schema Nodes", d: "Structured data implementation for rich snippets and local authority.", code: "DATA-04" }
            ].map((s, i) => (
              <div key={i} className="p-8 md:p-10 border border-zinc-900 bg-[#050505] hover:bg-black transition-all group">
                <span className="text-technical text-[7px] md:text-[8px] text-zinc-800 group-hover:text-red-600 mb-4 md:mb-6 block">[{s.code}]</span>
                <h3 className="text-base md:text-lg font-bold uppercase mb-3 md:mb-4 text-white group-hover:text-red-500 transition-colors">{s.t}</h3>
                <p className="text-zinc-600 text-[10px] md:text-xs leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 md:mt-20 flex flex-wrap justify-center gap-3 md:gap-6 opacity-40">
             {['vgot you seo', 'vgot you services tamil nadu', 'vgot you digital marketing'].map((kw) => (
               <span key={kw} className="text-technical text-[8px] md:text-[10px] uppercase tracking-widest text-zinc-500 italic px-3 py-1.5 md:px-4 md:py-2 border border-zinc-900 rounded-full"># {kw}</span>
             ))}
          </div>
        </div>
      </section>

      {/* National SEO Section */}
      <section className="py-20 md:py-24 px-6 border-b border-zinc-900 bg-[#050505]">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-12 md:gap-16">
            <div className="lg:col-span-1">
              <TechnicalBadge>Global_Uplink</TechnicalBadge>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 md:mb-8 mt-4">VGot You <br/><span className="text-zinc-800">SEO Services India</span></h2>
              <p className="text-zinc-500 text-xs md:text-sm leading-relaxed mb-6 md:mb-8">
                As a trusted <strong className="text-white font-bold">VGot You SEO agency in India</strong>, we handle complex national and international requirements for global manufacturing hubs and digital-first startups.
              </p>
              <Link to="/web-design-india" className="text-technical text-[8px] md:text-[9px] font-bold text-red-600 hover:text-white transition-colors uppercase tracking-[0.3em] inline-flex items-center gap-3 md:gap-4">
                Access VGot You Hub
                <div className="w-8 md:w-12 h-[1px] bg-red-600"></div>
              </Link>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {[
                { t: "National Ranking", d: "VGot You competes for highly competitive industry terms across the entire subcontinent.", icon: "🇮🇳" },
                { t: "E-commerce SEO", d: "Driving sales for Shopify and custom stores through massive organic visibility.", icon: "🛍️" },
                { t: "International SEO", d: "Bridging Indian excellence with global buyers in Europe, US, and Middle East.", icon: "🌍" },
                { t: "Authority Backlinks", d: "High-quality PR and link building by VGot You that builds permanent authority.", icon: "🔗" }
              ].map((item, i) => (
                <div key={i} className="p-6 md:p-8 border border-zinc-900 bg-black group hover:border-red-600/30 transition-all">
                  <span className="text-xl md:text-2xl mb-3 md:mb-4 block grayscale group-hover:grayscale-0 transition-all">{item.icon}</span>
                  <h3 className="text-base md:text-lg font-bold uppercase mb-2 md:mb-3 text-white">{item.t}</h3>
                  <p className="text-zinc-500 text-[10px] md:text-xs leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 md:mt-16 flex flex-wrap gap-2 md:gap-3 opacity-30 text-[8px] md:text-[9px] font-mono text-zinc-700 uppercase tracking-widest border-t border-zinc-900 pt-8">
             <span>VGot You SEO India</span> | <span>VGot You SEO Services</span> | <span>Search Engine Optimization India</span> | <span>SEO in Karur</span> | <span>SEO in Tamil Nadu</span> | <span>SEO Near Me</span> | <span>VGot You Strategy</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24 px-6 relative bg-black border-b border-zinc-900">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 md:mb-16">
            <TechnicalBadge>Diagnostic_QA</TechnicalBadge>
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-4 mt-4">VGot You SEO FAQ</h2>
          </div>
          
          <div className="space-y-1">
            <FAQItem 
              question="How long does it take VGot You to see SEO results?" 
              answer="SEO is a long-term strategy. While local SEO in smaller cities like Karur can show results within 1-3 months, competitive state-level or national keywords usually take 4-8 months to achieve stable page-1 rankings under VGot You's management."
            />
            <FAQItem 
              question="Does VGot You provide monthly SEO reports?" 
              answer="Yes. VGot You provides transparent, technical reports covering keyword movement, organic traffic growth, backlink profiles, and conversion tracking so you can see the direct ROI."
            />
            <FAQItem 
              question="Can VGot You help my Shopify store rank in India?" 
              answer="Absolutely. VGot You specializes in e-commerce SEO, including collection page optimization, product schema, and technical fixes for Shopify platforms that drive consistent sales."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-48 px-6 text-center bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.1)_0%,transparent_70%)] opacity-50"></div>
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto relative z-10"
        >
          <div className="text-technical text-[8px] md:text-[10px] text-red-600 font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] mb-10 md:mb-12">Action_Matrix: VGot_You_SEO_Audit</div>
          <h2 className="text-[12vw] sm:text-[10vw] md:text-[8.5vw] font-black uppercase leading-[0.8] mb-12 md:mb-16 tracking-tighter">
            Elevate Your <br/>
            <span className="text-zinc-800">Search Presence.</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-10">
            <Link to="/contact" className="relative w-full sm:w-auto px-12 md:px-16 py-5 md:py-6 bg-red-600 text-white font-bold rounded-sm text-xs md:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em] shadow-[0_0_50px_rgba(220,38,38,0.3)] hover:scale-105 transition-all">
              Request VGot You Audit
            </Link>
            <p className="text-technical text-[8px] md:text-[9px] text-zinc-600 uppercase tracking-widest text-left hidden sm:block border-l border-zinc-800 pl-8 leading-loose">
              // VGot_You_DATA_DRIVEN <br/>
              // ORGANIC_GROWTH_READY <br/>
              // TERMINAL: ACTIVE
            </p>
          </div>
        </m.div>
      </section>
    </div>
  );
};

export default SeoServices;