
import { motion, useScroll, useTransform } from 'motion/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BulbIcon, PenToolIcon, RocketIcon, SparklesIcon, ChevronLeftIcon, ChevronRightIcon } from '../components/common/Icons';
import { Helmet } from "react-helmet-async";


// FIX: Cast motion to any to resolve IntrinsicAttributes prop errors for motion components
const m = motion as any;

// Enhanced Logo Assets with Technical Metadata
const logos = [
  { id: 1, src: "https://www.vgotyou.com/assets/arctictextiles.png", title: "Arctic Textiles", category: "Geometric", specs: { geometry: "Euclidean", complexity: "2.4", ratio: "1:1.618" } },
  { id: 2, src: "https://www.vgotyou.com/assets/rudhraaexim.png", title: "Rudhraa Exports", category: "Organic", specs: { geometry: "Fibonacci", complexity: "1.8", ratio: "1:1" } },
  { id: 3, src: "https://www.vgotyou.com/assets/bloomgreen.png", title: "BloomGreen Developers", category: "Abstract", specs: { geometry: "Dynamic", complexity: "3.1", ratio: "4:3" } },
  { id: 4, src: "https://www.vgotyou.com/assets/akshaya.png", title: "Akshaya Tours", category: "Minimalist", specs: { geometry: "Linear", complexity: "1.2", ratio: "16:9" } },
  { id: 5, src: "https://www.vgotyou.com/assets/pixel.png", title: "Pixels", category: "Luxury", specs: { geometry: "Symmetrical", complexity: "4.0", ratio: "1:1" } },
];

const DiagnosticOverlay = ({ isActive }: { isActive: boolean }) => (
  <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${isActive ? 'opacity-40' : 'opacity-0'}`}>
    <div className="absolute top-0 left-0 w-full h-[1px] bg-red-600/50 animate-scan"></div>
    <div className="absolute top-0 left-0 w-[1px] h-full bg-red-600/20"></div>
    <div className="absolute top-0 right-0 w-[1px] h-full bg-red-600/20"></div>
    <div className="absolute top-1/2 left-0 w-full h-[1px] border-t border-dashed border-red-600/10"></div>
    <div className="absolute top-0 left-1/2 w-[1px] h-full border-l border-dashed border-red-600/10"></div>
    <div className="absolute top-4 left-4 w-2 h-2 border border-red-600"></div>
    <div className="absolute top-4 right-4 w-2 h-2 border border-red-600"></div>
    <div className="absolute bottom-4 left-4 w-2 h-2 border border-red-600"></div>
    <div className="absolute bottom-4 right-4 w-2 h-2 border border-red-600"></div>
  </div>
);

const AccordionItem: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onClick: () => void; }> = ({ title, children, isOpen, onClick }) => {
    return (
        <div className="border-b border-zinc-900">
            <button onClick={onClick} className="w-full flex justify-between items-center text-left py-6 text-sm md:text-base font-bold text-white hover:text-red-500 transition-colors uppercase tracking-widest font-mono">
                <span className="pr-4">{title}</span>
                <svg className={`w-4 h-4 shrink-0 transition-transform transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pb-8 text-zinc-500 text-sm leading-relaxed font-light">{children}</div>
            </div>
        </div>
    );
};

const LogoDesign: React.FC = () => {
  const [activeLogo, setActiveLogo] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  const scrollToArchive = () => {
    document.getElementById('specimen-lab')?.scrollIntoView({ behavior: 'smooth' });
  };

  const whatsappMessage = encodeURIComponent(
    "Hello VGot You! I am interested in getting a professional logo designed for my business. I'm based in Tamil Nadu and looking for a custom branding solution. Let's talk!"
  );

  const faqs = [
    {
      q: "Do you provide logo design services in Karur?",
      a: "Yes, VGot You is a logo design company based in Karur, offering professional logo and branding services tailored to the specific needs of local businesses and international exporters alike."
    },
    {
      q: "Do you design logos for textile companies in Tamil Nadu?",
      a: "Yes, we specialize in logo design and branding for textile manufacturers and exporters across Tamil Nadu. We understand the heritage and visual cues required for the spinning, weaving, and garment industries."
    },
    {
      q: "Do you work with clients outside Tamil Nadu?",
      a: "Yes, while we focus on Karur and Tamil Nadu, we also serve clients across India. Our digital collaboration process is seamless, allowing us to deliver high-quality branding to businesses nationwide."
    }
  ];

  return (
    <div className="bg-[#020202] text-white selection:bg-red-600/30 overflow-x-hidden font-sans">
      

<Helmet>

  {/* ================= BASIC SEO ================= */}
  <html lang="en-IN" />

  <title>Logo Design Company in Karur, Tamil Nadu | VGot You – Portfolio & Services</title>

  <meta
    name="description"
    content="VGot You is a professional logo design company in Karur, Tamil Nadu. Explore our logo portfolio and branding services for textile manufacturers, MSMEs, startups and businesses across India."
  />

  {/* FIXED: Removed meta keywords */}

  <meta name="author" content="VGot You" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://www.vgotyou.com/logo-showcase" />

  {/* ================= HREFLANG ================= */}
  {/* ADDED: Was completely missing */}
  <link rel="alternate" hrefLang="en-IN" href="https://www.vgotyou.com/logo-showcase" />
  <link rel="alternate" hrefLang="en-GB" href="https://www.vgotyou.com/logo-showcase-uk" />
  <link rel="alternate" hrefLang="x-default" href="https://www.vgotyou.com/logo-showcase" />

  {/* ================= OPEN GRAPH ================= */}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="VGot You" />
  {/* FIXED: og:title now matches <title> exactly */}
  <meta property="og:title" content="Logo Design Company in Karur, Tamil Nadu | VGot You – Portfolio & Services" />
  <meta
    property="og:description"
    content="Professional logo design and branding services in Karur, Tamil Nadu. Explore VGot You's portfolio of custom logos for textile manufacturers, MSMEs, startups and businesses across India."
  />
  <meta property="og:url" content="https://www.vgotyou.com/logo-showcase" />
  {/* Keeping page-specific logo-designer.png — correct for this page */}
  <meta property="og:image" content="https://www.vgotyou.com/assets/logo-designer.png" />
  {/* FIXED: width, height and alt were missing */}
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Logo Design Portfolio – VGot You Branding Agency, Karur Tamil Nadu" />
  <meta property="og:locale" content="en_IN" />
  {/* FIXED: og:locale:alternate was missing */}
  <meta property="og:locale:alternate" content="en_GB" />

  {/* ================= TWITTER / X ================= */}
  <meta name="twitter:card" content="summary_large_image" />
  {/* FIXED: twitter:title now matches <title> exactly */}
  <meta name="twitter:title" content="Logo Design Company in Karur, Tamil Nadu | VGot You – Portfolio & Services" />
  <meta
    name="twitter:description"
    content="Professional logo design and branding services in Karur, Tamil Nadu. Custom logos for textile manufacturers, MSMEs and businesses across India."
  />
  <meta name="twitter:image" content="https://www.vgotyou.com/assets/logo-designer.png" />
  {/* FIXED: twitter:site and twitter:creator were missing */}
  <meta name="twitter:site" content="@vgotyou" />
  <meta name="twitter:creator" content="@vgotyou" />

  {/* ================= SCHEMA: WEB PAGE ================= */}
  {/* ADDED: Was completely missing */}
  <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://www.vgotyou.com/logo-showcase#webpage",
      "url": "https://www.vgotyou.com/logo-showcase",
      "name": "Logo Design Company in Karur, Tamil Nadu | VGot You – Portfolio & Services",
      "description": "Portfolio of professional logo designs and branding projects by VGot You for businesses in Karur, Tamil Nadu and across India.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@id": "https://www.vgotyou.com/#website"
      },
      "publisher": {
        "@id": "https://www.vgotyou.com/#organization"
      },
      "about": {
        "@id": "https://www.vgotyou.com/logo-showcase#service"
      }
    }
  `}</script>

  {/* ================= SCHEMA: SERVICE ================= */}
  
  <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://www.vgotyou.com/logo-showcase#service",
      "name": "Logo Design and Branding Services in Karur, Tamil Nadu",
      "url": "https://www.vgotyou.com/logo-showcase",
      "description": "Professional logo design and brand identity services in Karur, Tamil Nadu for textile manufacturers, MSMEs, startups and businesses across India.",
      "serviceType": [
        "Logo Design",
        "Brand Identity Design",
        "Custom Logo Design",
        "Textile Company Logo Design",
        "Startup Logo Design",
        "Corporate Identity Design",
        "Logo Redesign and Rebranding",
        "Minimalist Logo Design",
        "Business Branding India"
      ],
      "provider": {
        "@id": "https://www.vgotyou.com/#localbusiness"
      },
      "areaServed": [
        { "@type": "City", "name": "Karur" },
        { "@type": "State", "name": "Tamil Nadu" },
        { "@type": "Country", "name": "India" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Logo Design Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Custom Logo Design for Businesses" }
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Logo Design for Textile Companies Karur" }
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Startup and MSME Branding Packages" }
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Corporate Identity and Brand Systems" }
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Logo Redesign and Rebranding" }
          }
        ]
      }
    }
  `}</script>

  {/* ================= SCHEMA: ITEM LIST ================= */}
 
  <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": "https://www.vgotyou.com/logo-showcase#itemlist",
      "name": "VGot You Logo Design Portfolio",
      "description": "Curated portfolio of professional logo designs by VGot You for businesses in Karur and Tamil Nadu.",
      "url": "https://www.vgotyou.com/logo-showcase",
      "numberOfItems": 5,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "CreativeWork",
            "name": "Arctic Textiles Logo Design",
            "description": "Geometric logo design for Arctic Textiles, a B2B textile manufacturing company in Karur.",
            "image": "https://www.vgotyou.com/assets/arctictextiles.png",
            "creator": { "@id": "https://www.vgotyou.com/#organization" },
            "genre": "Geometric Logo Design"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "CreativeWork",
            "name": "Rudhraa Exports Logo Design",
            "description": "Organic logo design for Rudhraa Exports, a B2B export company.",
            "image": "https://www.vgotyou.com/assets/rudhraaexim.png",
            "creator": { "@id": "https://www.vgotyou.com/#organization" },
            "genre": "Organic Logo Design"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "CreativeWork",
            "name": "BloomGreen Developers Logo Design",
            "description": "Abstract logo design for BloomGreen Developers, a construction and interior design company.",
            "image": "https://www.vgotyou.com/assets/bloomgreen.png",
            "creator": { "@id": "https://www.vgotyou.com/#organization" },
            "genre": "Abstract Logo Design"
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "@type": "CreativeWork",
            "name": "Akshaya Tours Logo Design",
            "description": "Minimalist logo design for Akshaya Tours, a travel and tourism company.",
            "image": "https://www.vgotyou.com/assets/akshaya.png",
            "creator": { "@id": "https://www.vgotyou.com/#organization" },
            "genre": "Minimalist Logo Design"
          }
        },
        {
          "@type": "ListItem",
          "position": 5,
          "item": {
            "@type": "CreativeWork",
            "name": "Pixels Logo Design",
            "description": "Luxury symmetrical logo design for Pixels.",
            "image": "https://www.vgotyou.com/assets/pixel.png",
            "creator": { "@id": "https://www.vgotyou.com/#organization" },
            "genre": "Luxury Logo Design"
          }
        }
      ]
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
          "name": "Do you provide logo design services in Karur?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, VGot You is a logo design company based in Karur, offering professional logo and branding services tailored to the specific needs of local businesses and international exporters alike."
          }
        },
        {
          "@type": "Question",
          "name": "Do you design logos for textile companies in Tamil Nadu?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we specialise in logo design and branding for textile manufacturers and exporters across Tamil Nadu. We understand the heritage and visual cues required for the spinning, weaving, and garment industries."
          }
        },
        {
          "@type": "Question",
          "name": "Do you work with clients outside Tamil Nadu?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, while we focus on Karur and Tamil Nadu, we also serve clients across India. Our digital collaboration process is seamless, allowing us to deliver high-quality branding to businesses nationwide."
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
          "name": "Logo Showcase",
          "item": "https://www.vgotyou.com/logo-showcase"
        }
      ]
    }
  `}</script>

</Helmet>



      
      
      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
        .text-technical {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
        }
      `}</style>
      
      {/* Hero Section */}
      <section id="hero" className="relative min-h-[80dvh] pt-24 md:pt-32 flex flex-col items-center justify-center px-6 overflow-hidden border-b border-zinc-900">
        <m.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.05)_0%,transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse:60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </m.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="mb-8 p-3 sm:p-4 border border-red-600/30 rounded-sm bg-red-600/10 text-technical text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-red-500 font-bold"
          >
            System Node: Identity_Forge_Karur
          </m.div>

          <h1 className="text-4xl sm:text-6xl md:text-[6.5vw] font-black leading-[0.9] tracking-tighter uppercase mb-6 md:mb-12 text-center text-white">
            Logo Design Company <br/>
            <span className="text-zinc-800">Serving Tamil Nadu</span>
          </h1>
          
          <p className="max-w-3xl text-zinc-500 text-center text-xs sm:text-sm md:text-lg mt-4 md:mt-6 leading-relaxed font-light">
            Your logo is the foundation of your brand identity. For businesses in <strong>Karur, Tamil Nadu</strong>, a professionally designed logo helps build trust, recognition, and long-term value. <strong>VGot You</strong> is a trusted logo design company in Karur, delivering custom branding solutions for local businesses, textile manufacturers, and growing brands.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-8 md:mt-12">
            <a 
              href={`https://wa.me/917871120415?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white px-10 py-5 font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-red-700 transition-all shadow-[0_0_30px_rgba(220,38,38,0.2)]"
            >
              Start Consultation
            </a>
            <button 
              onClick={scrollToArchive}
              className="border border-zinc-800 text-white px-10 py-5 font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-zinc-900 transition-all"
            >
              View Specimens
            </button>
          </div>
        </div>

        {/* Enhanced Scroll Indicator - Hidden on Mobile */}
        <m.div 
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 z-20 pointer-events-none"
        >
            <div className="w-5 h-8 border-2 border-zinc-800 rounded-full flex justify-center p-1.5 overflow-hidden">
                <m.div 
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1 h-1.5 bg-red-600 rounded-full"
                />
            </div>
            <span className="text-technical text-[7px] tracking-[0.4em] text-zinc-600 uppercase font-black">Descend_Node</span>
        </m.div>
      </section>

      {/* Why Professional Logo Design Matters */}
      <section id="why-logo" className="py-24 sm:py-40 border-b border-zinc-900 bg-[#050505]">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div className="relative aspect-square border border-zinc-900 rounded-lg p-12 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.03)_0%,transparent_70%)]"></div>
                    <div className="relative z-10 w-full h-full border border-dashed border-zinc-800 rounded-full flex items-center justify-center">
                        <img src="https://www.vgotyou.com/assets/logo.png"  alt="VGot You Logo"  className="w-70 h-70 opacity-90 object-contain"/>

                        <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                            <div className="w-48 h-48 border border-red-600/10 rounded-full"></div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-technical text-red-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Regional Market Logic</h2>
                    <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">Why It Matters for Karur Businesses</h3>
                    <p className="text-zinc-400 text-lg leading-relaxed mb-10 font-light">
                        In competitive markets like Karur and across Tamil Nadu, customers form opinions quickly. A professionally designed logo helps your business stand out and appear credible from the first interaction.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { t: "Powerful First Impression", d: "Capture attention instantly." },
                            { t: "Build Trust & Recognition", d: "Position your brand as a reliable leader." },
                            { t: "Stand Out from Competitors", d: "Differentiate with unique visual logic." },
                            { t: "Platform Consistency", d: "Seamless scaling across web and print." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 p-4 border border-zinc-900 bg-black rounded-sm">
                                <div className="text-red-600 font-mono text-xs font-bold">0{i+1}</div>
                                <div>
                                    <h5 className="text-xs font-bold uppercase tracking-widest text-white mb-1">{item.t}</h5>
                                    <p className="text-[10px] text-zinc-500 leading-tight">{item.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 sm:py-40 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-20">
                <h2 className="text-technical text-red-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Forge Capabilities</h2>
                <h3 className="text-3xl sm:text-6xl font-black uppercase tracking-tighter mb-6">Logo Design Services in Karur</h3>
                <p className="text-zinc-500 max-w-2xl mx-auto font-light">As a creative logo design and branding studio in Karur, we focus on simplicity, clarity, and brand relevance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { t: "Custom Logo Design", d: "Original concepts with zero templates. Built specifically for your unique business DNA." },
                    { t: "Startups & MSMEs", d: "Professional branding packages designed to help new ventures scale and gain market trust." },
                    { t: "Textile Company Logo", d: "Specialized design for Karur textile exporters, spinning mills, and manufacturers." },
                    { t: "Corporate Identity", d: "Comprehensive brand systems for established businesses looking for global visual standards." },
                    { t: "Minimalist Styles", d: "Timeless, clean, and modern logo styles that remain effective for decades." },
                    { t: "Redesign & Rebranding", d: "Modernizing legacy brands for the digital age without losing their heritage." }
                ].map((service, i) => (
                    <div key={i} className="p-8 border border-zinc-900 bg-[#080808] group hover:border-red-600/30 transition-all">
                        <div className="w-10 h-10 bg-zinc-900 rounded-sm mb-6 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all">
                            <SparklesIcon className="w-5 h-5" />
                        </div>
                        <h4 className="text-lg font-bold uppercase tracking-tight text-white mb-3">{service.t}</h4>
                        <p className="text-zinc-500 text-sm leading-relaxed font-light">{service.d}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Regional Focus Section */}
      <section id="regional" className="py-24 sm:py-40 bg-red-600 text-white">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-technical text-white/60 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Regional Hub: Karur HQ</h2>
                    <h3 className="text-3xl sm:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">Logo Design Company in Tamil Nadu</h3>
                    <p className="text-red-100 text-lg leading-relaxed mb-8">
                        VGot You works with businesses across Tamil Nadu, including manufacturers, exporters, retailers, and service providers. As an experienced logo designer in Tamil Nadu, we understand regional industries while delivering branding that meets national standards.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {[
                            { label: "Websites & Platforms", link: "/web-design" },
                            { label: "Business Cards & Stationery" },
                            { label: "Packaging & Product Labels" },
                            { label: "Social Media & Marketing" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 font-bold uppercase tracking-widest text-[10px]">
                                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                {item.link ? (
                                    <Link to={item.link} className="hover:underline">{item.label}</Link>
                                ) : (
                                    <span>{item.label}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative aspect-video rounded-sm overflow-hidden bg-black/20 backdrop-blur-sm border border-white/20 p-8 flex items-center justify-center">
                    <div className="text-center">
                        <h4 className="text-6xl font-black mb-2 tracking-tighter italic">TN</h4>
                        <p className="text-xs uppercase tracking-[0.2em] font-bold">Native Digital Architect</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* The Specimen Lab (Gallery) */}
      <section id="specimen-lab" className="py-24 sm:py-40 px-4 md:px-12 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-20">
            <h2 className="text-technical text-red-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Archive Analysis</h2>
            <h3 className="text-3xl sm:text-6xl font-black uppercase tracking-tighter">Specimen Archive</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {logos.map((logo, index) => (
              <m.div
                key={logo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                onMouseEnter={() => setActiveLogo(logo.id)}
                onMouseLeave={() => setActiveLogo(null)}
                className="group relative flex flex-col"
              >
                <div className="flex justify-between items-center mb-4 px-2 text-technical text-[9px] text-zinc-400 uppercase tracking-widest font-bold">
                  <span>REF_ID: {logo.id}</span>
                  <span className="text-red-500">{logo.category}</span>
                </div>

                <div className="relative aspect-square bg-[#080808] border border-zinc-900 rounded-sm overflow-hidden transition-all duration-700 group-hover:border-red-600/40">
                  <DiagnosticOverlay isActive={activeLogo === logo.id} />
                  <img
                    src={logo.src}
                    alt={`${logo.title} custom logo design in Karur`}
                    className="w-full h-full object-contain p-12 transition-all duration-1000 group-hover:scale-105 filter grayscale contrast-125 group-hover:grayscale-0"
                  />
                </div>

                <div className="mt-6 px-2">
                    <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-2">{logo.title}</h3>
                    <div className="flex flex-wrap gap-4">
                        {Object.entries(logo.specs).map(([key, val]) => (
                        <div key={key}>
                            <p className="text-technical text-[7px] text-zinc-600 uppercase mb-0.5">{key}</p>
                            <p className="text-technical text-[9px] font-bold text-zinc-400">{val}</p>
                        </div>
                        ))}
                    </div>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 sm:py-40 bg-[#050505] border-y border-zinc-900">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-20">
                <h2 className="text-technical text-red-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Systematic Method</h2>
                <h3 className="text-3xl sm:text-6xl font-black uppercase tracking-tighter">Our Design Process</h3>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                    { s: "Understanding", d: "Learning about your business and audience.", i: "01" },
                    { s: "Concept Creation", d: "Developing unique visual explorations.", i: "02" },
                    { s: "Refinement", d: "Refining symbols, type and color systems.", i: "03" },
                    { s: "Feedback", d: "Improving based on your inputs.", i: "04" },
                    { s: "Final Delivery", d: "Complete format suite for all uses.", i: "05" }
                ].map((step, i) => (
                    <div key={i} className="p-8 border border-zinc-900 bg-black group hover:border-red-600/30 transition-all">
                        <div className="text-technical text-zinc-800 text-3xl font-black mb-6 group-hover:text-red-600 transition-colors">{step.i}</div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-3">{step.s}</h4>
                        <p className="text-[11px] text-zinc-600 leading-relaxed uppercase font-mono">{step.d}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Package & Why Us Section */}
      <section id="packages" className="py-24 sm:py-40 px-6">
        <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="bg-zinc-900 border border-zinc-800 p-8 sm:p-12 rounded-lg">
                    <h3 className="text-2xl font-bold uppercase tracking-tighter mb-8 text-white">Logo Design Packages</h3>
                    <ul className="space-y-6">
                        {[
                            "Primary Logo + Variations",
                            "Color & Monochrome Versions",
                            "High-Resolution Files (PNG, JPG, SVG, PDF)",
                            "Ready for Web & High-Quality Print",
                            "Branding Support for Consistency",
                            "Technical Usage Documentation"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-4 text-zinc-400 font-light">
                                <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text-technical text-red-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Quality Verification</h2>
                    <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">Why Choose VGot You for Logo Design in Karur?</h3>
                    <p className="text-zinc-500 text-lg leading-relaxed mb-8 font-light">
                        We don’t just design logos — we build strong brand identities. We combine local expertise in <strong>Karur & Tamil Nadu</strong> with global design standards and clear, smooth communication. Our approach is often aligned with our <Link to="/web-design" className="text-white hover:text-red-500 transition-colors underline decoration-zinc-700 underline-offset-4">web design strategies</Link> for total brand cohesion.
                    </p>
                    <div className="space-y-4">
                        <div className="flex gap-4 p-4 border border-zinc-900 rounded-sm">
                            <RocketIcon className="w-6 h-6 text-red-600" />
                            <div>
                                <h5 className="text-xs font-bold uppercase tracking-widest text-white">Digital Alignment</h5>
                                <p className="text-[10px] text-zinc-600 font-mono mt-1">OPTIMIZED FOR WEB & MARKETING.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-4 border border-zinc-900 rounded-sm">
                            <PenToolIcon className="w-6 h-6 text-red-600" />
                            <div>
                                <h5 className="text-xs font-bold uppercase tracking-widest text-white">Textile Experts</h5>
                                <p className="text-[10px] text-zinc-600 font-mono mt-1">PROVEN INDUSTRIAL EXPERIENCE.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* India Focus */}
      <section id="nationwide" className="py-24 sm:py-40 bg-[#050505] border-t border-zinc-900">
        <div className="container mx-auto px-6 max-w-7xl text-center">
            <h2 className="text-technical text-red-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Scope: Nationwide</h2>
            <h3 className="text-3xl sm:text-6xl font-black uppercase tracking-tighter mb-8">Logo Design Services Across India</h3>
            <p className="text-zinc-500 max-w-3xl mx-auto text-lg font-light leading-relaxed">
                While our primary focus is Karur and Tamil Nadu, VGot You also provides logo design services across India, working with clients remotely and delivering consistent branding support nationwide.
            </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 sm:py-40 bg-black border-t border-zinc-900">
        <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-16">
                <h2 className="text-technical text-red-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Diagnostics</h2>
                <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter">Frequent Queries</h3>
            </div>
            <div className="space-y-2">
                {faqs.map((faq, index) => (
                    <AccordionItem 
                        key={index} 
                        title={faq.q} 
                        isOpen={openFaq === index} 
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                        {faq.a}
                    </AccordionItem>
                ))}
            </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section id="cta" className="py-32 sm:py-48 px-6 text-center bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(220,38,38,0.1)_0%,transparent_50%)]"></div>
        
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto relative z-10"
        >
          <div className="text-technical text-[10px] sm:text-xs text-red-600 font-bold uppercase tracking-[0.5em] mb-12">Action: Initiate_Branding</div>
          <h2 className="text-[12vw] sm:text-[10vw] md:text-[8vw] font-black uppercase leading-[0.8] mb-16 tracking-tighter text-white">
            Get a Professional Logo <br/>
            <span className="text-zinc-800">Designed for Your Business</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
            <m.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group w-full sm:w-auto"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-sm blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
              <a 
                  href={`https://wa.me/917871120415?text=${whatsappMessage}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full sm:w-auto px-16 py-6 bg-red-600 text-white font-bold rounded-sm text-lg uppercase tracking-[0.3em] shadow-[0_0_50px_rgba(220,38,38,0.3)] transition-all flex items-center justify-center"
              >
                  Forge Logo Now
              </a>
            </m.div>
            
            <div className="text-technical text-[10px] text-zinc-500 uppercase tracking-widest text-left hidden sm:block leading-loose font-bold">
              // HUB: KARUR_HQ <br/>
              // NODE: TAMIL_NADU <br/>
              // STATUS: WAITING_SIGNAL
            </div>
          </div>
        </m.div>
      </section>
    </div>
  );
};

export default LogoDesign;
