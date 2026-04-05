import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import ProjectCarousel from '../components/common/CarouselManual';
import { Helmet } from "react-helmet-async";

// FIX: Cast motion to any to resolve IntrinsicAttributes prop errors for motion components
const m = motion as any;

const TechnicalHeader = ({ label, code }: { label: string; code: string }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="h-[1px] flex-grow bg-zinc-800"></div>
    <div className="flex flex-col items-center">
      <span className="text-[10px] font-mono text-red-600 tracking-[0.4em] uppercase">{label}</span>
      <span className="text-[8px] font-mono text-zinc-600 mt-1">{code}</span>
    </div>
    <div className="h-[1px] flex-grow bg-zinc-800"></div>
  </div>
);

const DiagnosticStat = ({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) => (
  <m.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="relative group p-6 border border-zinc-900 bg-[#050505] rounded-sm overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-full h-[1px] bg-red-600/20 group-hover:bg-red-600/50 transition-colors"></div>
    <p className="text-4xl lg:text-5xl font-black text-white tracking-tighter mb-2 group-hover:text-red-600 transition-colors">{value}</p>
    <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">{label}</p>
    <div className="absolute bottom-1 right-1 opacity-10">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 2h2v2H2V2zm4 0h2v2H6V2zm4 0h2v2h-2V2zm4 0h2v2h-2V2zM2 6h2v2H2V6zm4 0h2v2H6V6zm4 0h2v2h-2V6zm4 0h2v2h-2V6z" />
      </svg>
    </div>
  </m.div>
);

const PerformanceHUD: React.FC<{ data: { label: string, value: number, color: string }[] }> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.value)) * 1.2;
  return (
    <div className="relative p-4 sm:p-8 border border-zinc-900 bg-black rounded-sm overflow-hidden aspect-[4/5] sm:aspect-video md:aspect-square lg:aspect-video min-h-[350px] sm:min-h-[400px] flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.03)_0%,transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      <div className="relative w-full h-full flex items-end justify-around gap-2 sm:gap-4 pb-8 px-2 sm:px-4 z-10">
        {data.map((item, idx) => (
          <div key={item.label} className="h-full flex-1 flex flex-col justify-end items-center gap-4">
            <div className="relative w-full flex flex-col items-center flex-grow justify-end">
              <m.div 
                initial={{ height: 0 }}
                whileInView={{ height: `${(item.value / maxValue) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1], delay: idx * 0.15 }}
                className="w-full max-w-[30px] sm:max-w-[40px] rounded-t-sm relative shadow-xl"
                style={{ backgroundColor: item.color }}
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-white/20"></div>
                {item.label.includes("New") && (
                  <m.div 
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-white/10"
                  />
                )}
              </m.div>
              <m.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="absolute -top-10 text-[10px] sm:text-[12px] font-mono font-bold text-white bg-zinc-900/50 px-2 py-1 border border-zinc-800 rounded-sm whitespace-nowrap"
              >
                {item.value.toFixed(1)}
              </m.div>
            </div>
            <p className="text-[7px] sm:text-[8px] font-mono text-zinc-500 uppercase tracking-tighter text-center h-8 flex items-center leading-none">
              {item.label}
            </p>
          </div>
        ))}
      </div>
      <div className="absolute top-4 left-4 text-[8px] font-mono text-zinc-700 uppercase tracking-widest">PERFORMANCE_ANALYSIS: V.4.0</div>
      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-zinc-700 uppercase tracking-widest">OPTIMIZATION: ACTIVE</div>
      <div className="absolute top-1/2 left-0 w-full border-t border-zinc-900/50 pointer-events-none"></div>
    </div>
  );
};

const WebDesign: React.FC = () => {
  const techStack = ["React", "TypeScript", "Next.js", "Figma", "HTML", "CSS", "Shopify"];
  const chartData = [
    { label: "Old Site Conv.", value: 1.5, color: '#27272a' },
    { label: "New Site Conv.", value: 2.4, color: '#dc2626' },
    { label: "Old Site Speed", value: 1.2, color: '#27272a' },
    { label: "New Site Speed", value: 4.1, color: '#dc2626' }
  ];

  return (
    <div className="bg-[#020202] text-white selection:bg-red-600/30 overflow-x-hidden">

      {/* ─── HELMET ──────────────────────────────────────────────────────────── */}
      <Helmet>
        <html lang="en" />
        <title>Global Web Design Services | Custom Websites for Businesses Worldwide | VGot You</title>
        <meta
          name="description"
          content="VGot You crafts custom, fast, and SEO-optimised websites for businesses worldwide — built to rank, convert, and scale for startups, manufacturers, and growing enterprises."
        />
        <meta name="author" content="VGot You" />
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Karur" />
        <link rel="canonical" href="https://www.vgotyou.com/web-design" />

        <link rel="alternate" hrefLang="en-IN" href="https://www.vgotyou.com/web-design" />
        <link rel="alternate" hrefLang="en-GB" href="https://www.vgotyou.com/web-design" />
        <link rel="alternate" hrefLang="x-default" href="https://www.vgotyou.com/web-design" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="VGot You" />
        <meta property="og:title" content="Global Web Design Services | Custom Websites for Businesses Worldwide | VGot You" />
        <meta property="og:description" content="Custom, responsive, and SEO-optimised web design services for businesses worldwide by VGot You." />
        <meta property="og:url" content="https://www.vgotyou.com/web-design" />
        <meta property="og:image" content="https://www.vgotyou.com/assets/web-designer.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Professional Web Design Services by VGot You" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="en_IN" />
        <meta property="og:locale:alternate" content="en_GB" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Global Web Design Services | Custom Websites for Businesses Worldwide | VGot You" />
        <meta name="twitter:description" content="Custom, responsive, and SEO-optimised web design for startups and businesses worldwide." />
        <meta name="twitter:image" content="https://www.vgotyou.com/assets/web-designer.png" />
        <meta name="twitter:site" content="@vgotyou" />
        <meta name="twitter:creator" content="@vgotyou" />

        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://www.vgotyou.com/web-design#webpage",
            "url": "https://www.vgotyou.com/web-design",
            "name": "Global Web Design Services | VGot You",
            "description": "Professional web design services for businesses worldwide.",
            "inLanguage": "en",
            "isPartOf": { "@id": "https://www.vgotyou.com/#website" },
            "publisher": { "@id": "https://www.vgotyou.com/#organization" },
            "about": { "@id": "https://www.vgotyou.com/web-design#service" }
          }
        `}</script>

        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://www.vgotyou.com/web-design#service",
            "name": "Website Design Services",
            "url": "https://www.vgotyou.com/web-design",
            "description": "Custom, responsive, and SEO-optimised websites for businesses worldwide.",
            "serviceType": ["Web Design","Website Development","UI UX Design","Responsive Web Design","E-commerce Website Design","SEO-Optimised Web Design","Landing Page Design","Website Redesign"],
            "provider": { "@id": "https://www.vgotyou.com/#organization" },
            "areaServed": {
              "@type": "Place",
              "name": "Worldwide"
            }
          }
        `}</script>

        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.vgotyou.com/" },
              { "@type": "ListItem", "position": 2, "name": "Web Design", "item": "https://www.vgotyou.com/web-design" }
            ]
          }
        `}</script>
      </Helmet>

      <style>{`
        .text-technical { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .scanline-overlay {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 2px;
          background: linear-gradient(to bottom, transparent, rgba(220,38,38,0.1), transparent);
          z-index: 100; pointer-events: none;
          animation: scanline 10s linear infinite;
        }
      `}</style>

      <div className="scanline-overlay"></div>


      {/* ─── HERO ────────────────────────────────────────────────────────────── */}
<section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden border-b border-zinc-900">
  
  {/* Background Video */}
  <video
    autoPlay
    loop
    muted
    playsInline
    preload="none"
    className="absolute inset-0 w-full h-full object-cover grayscale opacity-40"
  >
    <source src="https://www.vgotyou.com/assets/web.mp4" type="video/mp4" />
  </video>

  {/* Overlays */}
  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-transparent"></div>
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]"></div>

  {/* Content */}
  <div className="relative z-10 px-6 max-w-7xl mx-auto text-center mt-16 sm:mt-20">
    
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-4 text-[9px] font-mono text-zinc-600 uppercase tracking-widest flex items-center justify-center gap-2"
      >
        <Link to="/" className="hover:text-zinc-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-zinc-500">Web Design</span>
      </nav>

      {/* Tagline */}
      <span className="inline-block px-3 py-1 mb-6 border border-zinc-800 rounded-sm bg-black/50 text-[9px] sm:text-[10px] font-mono tracking-[0.4em] uppercase text-zinc-500">
        Global Web Design Studio — Serving Businesses Worldwide
      </span>

      {/* Heading */}
      <h1 className="font-black mb-8 tracking-tighter uppercase leading-[0.85] sm:leading-[0.8]">
        <span className="text-red-600 text-[11vw] sm:text-[8vw] md:text-[7vw] block">
          Web Design
        </span>
        <span className="text-[4.5vw] sm:text-[3vw] md:text-[2.2vw] block mt-3 text-zinc-300">
          Professional Web Design Services for Businesses Worldwide
        </span>
      </h1>

      {/* Description */}
      <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed mb-10">
        <strong className="text-white font-bold">VGot You</strong> builds custom, fast, and SEO-optimised websites that turn visitors into customers — for startups, growing businesses, and enterprises across global markets.
      </p>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none mx-auto">
        <m.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
          <Link
            to="/contact?message=Hi VGot You, I'd like a free consultation for my website."
            className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-red-600 text-white font-bold rounded-sm text-sm uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(220,38,38,0.3)] hover:bg-red-500 hover:shadow-[0_0_60px_rgba(220,38,38,0.5)] transition-all"
          >
            Get Free Website Consultation
          </Link>
        </m.div>
      </div>

      {/* Trust line */}
      <p className="text-xs text-zinc-600 mt-4">
        Trusted by businesses across India & UK
      </p>

    </m.div>
  </div>

</section>

      {/* ─── PAGE POSITIONING BAND ───────────────────────────────────────────── */}
      {/* Helps Google understand this is the GLOBAL hub, not a city page */}
      <section className="py-12 px-6 bg-black border-b border-zinc-900 text-center">
        <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-4">Our coverage</p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          {[
            { label: "Global Hub", path: "/web-design", active: true },
            { label: "India", path: "/web-design-india" },
            { label: "Tamil Nadu", path: "/web-design-tamil-nadu" },
            { label: "Karur", path: "/web-design-karur" },
            { label: "Coimbatore", path: "/web-design-coimbatore" },
            { label: "UK", path: "/web-design-uk" },
          ].map(({ label, path, active }) => (
            <Link
              key={label}
              to={path}
              className={`px-4 py-2 border rounded-sm text-[10px] font-mono uppercase tracking-widest transition-all ${
                active
                  ? "border-red-600 text-red-600 bg-red-600/10"
                  : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
              }`}
            >
              {active ? `► ${label}` : label}
            </Link>
          ))}
        </div>
      </section>

      {/* ─── SERVICES SECTION ────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#050505] border-b border-zinc-900">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <p className="text-[10px] font-mono text-red-600 uppercase tracking-[0.4em] mb-3">What We Offer</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Our Web Design Services</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Everything your business needs to build a strong online presence — from a single landing page to a full e-commerce store.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: "🏢",
                title: "Business Websites",
                desc: "Professional websites for small businesses and service providers. Includes homepage, about, services, and contact pages.",
                tag: "Most Popular"
              },
              {
                icon: "🛒",
                title: "E-commerce Websites",
                desc: "Online stores with product listings, cart, and payment gateway integration — built to sell 24/7.",
                tag: "High ROI"
              },
              {
                icon: "🎯",
                title: "Landing Pages",
                desc: "High-converting single pages designed for ad campaigns, lead generation, or product launches.",
                tag: ""
              },
              {
                icon: "🔄",
                title: "Website Redesign",
                desc: "Upgrade your outdated website to a modern, fast, mobile-friendly design that ranks and converts.",
                tag: ""
              },
              {
                icon: "🏭",
                title: "B2B & Manufacturer Portals",
                desc: "Credibility-driven websites for factories, exporters, and industrial businesses across global markets.",
                tag: "B2B Specialist"
              },
              {
                icon: "🎨",
                title: "UI / UX Design",
                desc: "User research, wireframes, and prototypes in Figma before any code is written.",
                tag: ""
              },
            ].map((service) => (
              <m.div
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative p-6 sm:p-8 border border-zinc-900 bg-[#080808] rounded-sm group hover:border-red-600/30 transition-all"
              >
                {service.tag && (
                  <span className="absolute top-4 right-4 text-[8px] font-mono uppercase tracking-widest text-red-600 border border-red-600/30 px-2 py-0.5 rounded-sm">
                    {service.tag}
                  </span>
                )}
                <span className="text-2xl mb-4 block">{service.icon}</span>
                <h3 className="text-lg font-bold uppercase tracking-tight text-white mb-2 group-hover:text-red-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{service.desc}</p>
              </m.div>
            ))}
          </div>

          {/* ─── WHY CHOOSE US ─────────────────────────────────────────────── */}
          <div className="mt-16 grid md:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-[10px] font-mono text-red-600 uppercase tracking-[0.4em] mb-4">Why Us</p>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter mb-6 text-white">Why Choose VGot You?</h2>
              <ul className="space-y-4">
                {[
                  { icon: "₹", text: "Affordable pricing for small businesses and startups" },
                  { icon: "📈", text: "SEO-focused site structure built in from day one" },
                  { icon: "⚡", text: "Fast delivery — most projects completed in 7–14 days" },
                  { icon: "💬", text: "WhatsApp-first communication for quick, easy updates" },
                  { icon: "🏭", text: "Deep experience with B2B manufacturers and exporters" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <span className="text-lg flex-shrink-0 mt-0.5">{item.icon}</span>
                    <span className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-200 transition-colors">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 sm:p-8 border border-zinc-900 bg-[#080808] rounded-sm">
              <p className="text-[10px] font-mono text-red-600 uppercase tracking-[0.4em] mb-4">Learn More</p>
              <h3 className="text-lg font-bold uppercase tracking-tight text-white mb-6">Useful Resources</h3>
              <div className="space-y-4">
                <Link
                  to="/blog/web-design-company-in-karur-tamil-nadu"
                  className="flex items-center justify-between gap-4 group p-4 border border-zinc-800 rounded-sm hover:border-red-600/40 transition-all"
                >
                  <span className="text-zinc-400 text-sm group-hover:text-white transition-colors">What is web design — and why does it matter for your business?</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-700 group-hover:text-red-600 flex-shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
                <Link
                  to="/blog/from-local-brand-to-online-authority"
                  className="flex items-center justify-between gap-4 group p-4 border border-zinc-800 rounded-sm hover:border-red-600/40 transition-all"
                >
                  <span className="text-zinc-400 text-sm group-hover:text-white transition-colors">How SEO works — a plain-English guide for small business owners</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-700 group-hover:text-red-600 flex-shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── E-COMMERCE MODULE ───────────────────────────────────────────────── */}
      <section className="py-20 sm:py-32 px-6 relative border-b border-zinc-900">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16 sm:mb-24 text-center">
            <p className="text-[9px] sm:text-[10px] font-mono text-red-600 font-bold uppercase tracking-[0.4em] mb-4">E-commerce</p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 sm:mb-6">E-commerce Development</h2>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-700 italic uppercase">Built to convert visitors into buyers.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-24">
            <DiagnosticStat value="+60%" label="Conversion Increase" delay={0.1} />
            <DiagnosticStat value="2.5x" label="Faster Load Times" delay={0.2} />
            <DiagnosticStat value="-45%" label="Cart Abandonment Drop" delay={0.3} />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 sm:gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <TechnicalHeader label="Performance Data" code="ECOMMERCE_BLOCK_01" />
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-8">
                A slow site costs sales. We deliver lightning-fast, intuitive e-commerce experiences that guide users seamlessly from browsing to buying — with optimised checkout flows and seamless payment integration.
              </p>
              <h4 className="text-xl font-bold mb-6 text-white uppercase tracking-tight">What makes it work</h4>
              <ul className="space-y-4">
                {[
                  "Optimized checkout flows that reduce drop-off.",
                  "Seamless payment gateway integration (Razorpay, Stripe).",
                  "Mobile-first design — over 70% of shoppers are on mobile."
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600 group-hover:scale-150 transition-transform flex-shrink-0"></div>
                    <span className="text-zinc-300 font-mono text-[10px] sm:text-xs uppercase tracking-widest">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <PerformanceHUD data={chartData} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── GEO-FOCUSED B2B SECTION ─────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-zinc-950 border-b border-zinc-900">
        <div className="container mx-auto max-w-7xl text-center">
          <p className="text-[10px] font-mono text-red-600 uppercase tracking-[0.4em] mb-4">Global Expertise</p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">
            B2B Websites for Manufacturers &amp; Exporters Worldwide
          </h2>
          <p className="text-zinc-500 max-w-4xl mx-auto text-sm md:text-lg leading-relaxed font-light mb-8">
            We build high-performance B2B websites for manufacturers, exporters, and industrial businesses across global markets — designed to generate leads and scale internationally.
          </p>
          {/* Internal links — critical for SEO silo */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/web-design-karur" className="px-5 py-2 border border-zinc-800 text-zinc-400 text-[10px] font-mono uppercase tracking-widest hover:border-red-600 hover:text-red-600 transition-all rounded-sm">
              Web Design Karur →
            </Link>
            <Link to="/web-design-coimbatore" className="px-5 py-2 border border-zinc-800 text-zinc-400 text-[10px] font-mono uppercase tracking-widest hover:border-red-600 hover:text-red-600 transition-all rounded-sm">
              Web Design Coimbatore →
            </Link>
            <Link to="/web-design-tamil-nadu" className="px-5 py-2 border border-zinc-800 text-zinc-400 text-[10px] font-mono uppercase tracking-widest hover:border-red-600 hover:text-red-600 transition-all rounded-sm">
              Web Design Tamil Nadu →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── B2B PORTAL MODULE ───────────────────────────────────────────────── */}
      <section className="py-20 sm:py-32 px-6 bg-[#050505] relative border-b border-zinc-900">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-start sm:items-end justify-between gap-12 mb-16 sm:mb-24">
            <div className="max-w-2xl text-left">
              <p className="text-[9px] sm:text-[10px] font-mono text-red-600 font-bold uppercase tracking-[0.4em] mb-4">B2B Websites</p>
              <h2 className="text-3xl sm:text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4 sm:mb-6">B2B Portals &amp; Corporate Sites</h2>
              <p className="text-xl sm:text-2xl font-bold text-zinc-700 italic uppercase">Your website should work as a 24/7 sales team.</p>
            </div>
            <div className="text-right font-mono text-[10px] text-zinc-600 uppercase tracking-widest leading-loose hidden lg:block border-l border-zinc-800 pl-8">
              // LEAD_GEN: ENABLED <br/>
              // VERIFIED_RESULTS <br/>
              // UPTIME: 99.99%
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-24">
            <DiagnosticStat value="+150%" label="Lead Growth" delay={0.1} />
            <DiagnosticStat value="-50%" label="Bounce Reduction" delay={0.2} />
            <DiagnosticStat value="+75%" label="Engagement Boost" delay={0.3} />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 sm:gap-20 items-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
              <div className="relative aspect-video rounded-sm overflow-hidden border border-zinc-800 grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:border-red-600/30">
                <img src="https://www.vgotyou.com/assets/data.png" alt="B2B website UI for manufacturer" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 font-mono text-[8px] text-red-600 tracking-[0.5em] uppercase">INTERFACE_RENDER</div>
              </div>
            </div>

            <div className="relative">
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-8">
                In the B2B world, your website is your primary sales tool. We create professional, information-rich websites that establish you as an industry authority and function as a 24/7 lead generation engine.
              </p>
              <h3 className="text-xl font-bold mb-6 text-white uppercase tracking-tight">Our B2B Approach</h3>
              <p className="text-zinc-500 mb-10 leading-relaxed">Every element is designed around your buyer's journey — from first impression to inquiry.</p>
              <div className="space-y-8">
                {[
                  { t: "Clear Value Propositions", d: "Your unique selling points are communicated with absolute clarity to every visitor." },
                  { t: "Search Authority (SEO)", d: "A robust SEO foundation is built into every corporate project from day one." },
                  { t: "Inquiry & Lead Systems", d: "Integrated case studies, knowledge hubs, and international inquiry portals." }
                ].map((item, i) => (
                  <div key={i} className="group flex gap-4 sm:gap-6">
                    <div className="text-[10px] font-mono text-red-600 font-bold mt-1 opacity-40 group-hover:opacity-100 transition-opacity flex-shrink-0">0{i+1}</div>
                    <div>
                      <h4 className="font-bold uppercase tracking-widest text-white mb-2 group-hover:text-red-600 transition-colors">{item.t}</h4>
                      <p className="text-zinc-500 text-sm leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COUNTRIES WE SERVE ──────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 bg-white border-b border-zinc-100">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <p className="text-[9px] sm:text-[10px] font-mono text-red-600 font-bold uppercase tracking-[0.4em] mb-4">Global Reach</p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900">Countries We Serve</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { to: "/web-design-india", code: "IN", flag: "https://flagcdn.com/in.svg", flagAlt: "India Flag", name: "India", desc: "Strategic web design and SEO solutions for businesses across India.", currency: "Custom pricing based on project scope" },
              { to: "/web-design-uk", code: "UK", flag: "https://flagcdn.com/gb.svg", flagAlt: "UK Flag", name: "United Kingdom", desc: "Premium digital experiences and branding for the UK market.", currency: "Custom pricing based on project scope" },
            ].map((country) => (
              <Link
                key={country.code}
                to={country.to}
                className="group relative overflow-hidden rounded-3xl p-12 bg-zinc-50 border border-zinc-100 transition-all duration-500 hover:shadow-2xl hover:bg-white hover:border-red-600/10"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="text-8xl font-black">{country.code}</span>
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <img src={country.flag} alt={country.flagAlt} className="w-8 h-auto rounded-sm" />
                  </div>
                  <h3 className="text-2xl font-black text-zinc-900 mb-2 tracking-tighter uppercase">{country.name}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-2">{country.desc}</p>
                  <p className="text-zinc-400 text-xs font-mono mb-6">{country.currency}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-red-600 group-hover:gap-4 transition-all">
                    Explore Region
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CREATIVE GRID ───────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-32 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <TechnicalHeader label="Recent Work" code="RENDER_MODULE_03" />
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-center uppercase tracking-tighter mb-16 sm:mb-24">Websites We've Built</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
            {[
              { 
                title: "Landing Page Design", 
                img: "https://www.vgotyou.com/assets/bloomgreen_home.png",
                desc: "Laser-focused landing pages built to convert visitors into leads or customers — optimised for Google Ads and organic traffic.",
                stat: "300% Conversion Boost",
                alt: "Landing page design example",
                path: "/blog/from-local-brand-to-online-authority"
              },
              { 
                title: "Portfolio & Brand Sites", 
                img: "https://www.vgotyou.com/assets/arctic.png",
                desc: "Visually-driven, elegant portfolio sites that tell your brand story and drive inquiries from the right clients.",
                stat: "Inquiry Growth",
                alt: "Portfolio website design example",
                path: "/blog/arctic-textiles"
              }
            ].map((card, i) => (
              <m.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-[#080808] border border-zinc-900 rounded-sm p-6 sm:p-8 group relative flex flex-col"
              >
                <div className="absolute top-4 right-4 text-[8px] font-mono text-zinc-700 tracking-widest uppercase">{card.stat}</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white uppercase tracking-tight group-hover:text-red-600 transition-colors">{card.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-8">{card.desc}</p>
                <Link to={card.path} className="relative aspect-video overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-700 border border-zinc-800 group-hover:border-red-600/30">
                  <img src={card.img} alt={card.alt} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <span className="px-6 py-2 border border-white text-white text-[10px] uppercase tracking-widest font-bold">View Case Study</span>
                  </div>
                </Link>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      <div className="py-16 sm:py-24 border-y border-zinc-900 bg-[#050505]">
        <ProjectCarousel />
      </div>

      {/* ─── TECH STACK ──────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-32 px-6">
        <div className="container mx-auto max-w-7xl text-center">
          <p className="text-[9px] sm:text-[10px] font-mono text-red-600 font-bold uppercase tracking-[0.4em] mb-4">Technology</p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">Our Tech Stack</h2>
          <p className="text-zinc-500 max-w-2xl mx-auto mb-16 text-base sm:text-lg font-light italic">"Modern, robust technology that ensures your website is fast, secure, and scalable."</p>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center max-w-4xl mx-auto">
            {techStack.map((tech, i) => (
              <m.div 
                key={tech}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-[#080808] border border-zinc-900 rounded-sm font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-zinc-400 hover:text-white hover:border-red-600/50 transition-all cursor-default"
              >
                <span className="text-red-600 mr-2 opacity-50">0{i+1}</span>
                {tech}
              </m.div>
            ))}
          </div>
        </div>
      </section>

      

      {/* ─── FINAL CTA ───────────────────────────────────────────────────────── */}
      <section className="py-32 sm:py-48 px-6 text-center bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.1)_0%,transparent_70%)]"></div>
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <div className="text-[9px] sm:text-[10px] font-mono text-red-600 font-bold uppercase tracking-[0.5em] mb-12">Ready to start?</div>
          <h2 className="text-[12vw] sm:text-[10vw] md:text-[8vw] font-black uppercase leading-[0.8] mb-8 tracking-tighter">
            Build Your <br/>
            <span className="text-zinc-800">Website Today.</span>
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto mb-12 text-sm sm:text-base leading-relaxed">
            Get a high-performance website that ranks on Google and converts visitors — designed to scale your business globally.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group w-full sm:w-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-sm blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <Link
                to="/contact?message=Hi VGot You, I'd like a free consultation for my website."
                className="relative w-full sm:w-auto px-10 sm:px-16 py-5 sm:py-6 bg-red-600 text-white font-bold rounded-sm text-base sm:text-lg uppercase tracking-[0.3em] shadow-[0_0_50px_rgba(220,38,38,0.3)] hover:bg-red-500 transition-all flex items-center justify-center gap-3"
              >
                Start Free Consultation
              </Link>
            </m.div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/917871120415?text=Hi%2C%20I'm%20interested%20in%20your%20web%20design%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-5 bg-[#25D366] text-white font-bold rounded-sm text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#1ebe57] transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L.057 23.172a.75.75 0 0 0 .922.921l5.33-1.47A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.95 9.95 0 0 1-5.065-1.375l-.363-.217-3.762 1.038 1.04-3.761-.237-.375A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>

          <p className="text-zinc-600 text-xs mt-6 font-mono">
            Free consultation · No commitment required · WhatsApp support available
          </p>
        </m.div>
      </section>
    </div>
  );
};

export default WebDesign;