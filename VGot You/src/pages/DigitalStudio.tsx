
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as ReactRouterDOM from 'react-router-dom';
import { 
  RocketIcon as Rocket, 
  CodeBracketIcon as Code2, 
  PenToolIcon as PenTool, 
  ChevronRightIcon as ChevronRight, 
  MonitorIcon as Monitor, 
  CameraIcon as Camera, 
  ZapIcon as Zap, 
  TargetIcon as Target, 
  LayersIcon as Layers,
  GlobeIcon as Globe,
  ArrowUpRightIcon as ArrowUpRight,
  PlusIcon as Plus,
  MinusIcon as Minus
} from '../components/common/Icons';
import { Helmet } from "react-helmet-async";

const { Link } = ReactRouterDOM as any;
const m = motion as any;

// --- Components ---

const GridBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.08)_0%,transparent_100%)]"></div>
    {/* Scanning line */}
    <div className="absolute top-0 left-0 w-full h-[2px] bg-red-600/10 animate-scan opacity-30"></div>
  </div>
);

const SystemTicker = () => (
  <div className="w-full bg-zinc-950 border-y border-zinc-900 py-2 overflow-hidden whitespace-nowrap">
    <div className="inline-block animate-marquee">
      {[...Array(10)].map((_, i) => (
        <span key={i} className="text-[8px] font-mono text-zinc-700 uppercase tracking-[0.4em] mx-8">
          System_Status: Optimal // Node: Karur_HQ // Latency: 12ms // Protocol: VGot_v4.2 // Deployment: Active
        </span>
      ))}
    </div>
  </div>
);

const SectionLabel = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3 mb-8">
    <div className="w-8 h-[1px] bg-red-600"></div>
    <span className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-[0.5em]">{text}</span>
  </div>
);

const StatCard = ({ label, value, sub }: { label: string; value: string; sub: string }) => (
  <div className="p-8 border border-zinc-900 bg-zinc-950/50 backdrop-blur-sm group hover:border-red-600/30 transition-all duration-500">
    <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-4 group-hover:text-red-500 transition-colors">{label}</p>
    <h3 className="text-4xl font-black text-white mb-2 tracking-tighter">{value}</h3>
    <p className="text-xs text-zinc-500 uppercase tracking-wider">{sub}</p>
  </div>
);

const BentoCard = ({ title, desc, icon: Icon, path, size = "small" }: { title: string; desc: string; icon: any; path: string; size?: "small" | "large" }) => (
  <Link 
    to={path} 
    className={`group relative p-8 md:p-12 bg-black border border-zinc-900 overflow-hidden transition-all duration-500 hover:bg-zinc-950 ${size === "large" ? "md:col-span-2" : ""}`}
  >
    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
      <ArrowUpRight className="w-5 h-5 text-red-600" />
    </div>
    <div className="relative z-10 h-full flex flex-col justify-between">
      <div>
        <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center mb-8 group-hover:bg-red-600 transition-colors duration-500">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h4 className="text-2xl font-black uppercase tracking-tight text-white mb-4 group-hover:text-red-500 transition-colors">{title}</h4>
        <p className="text-zinc-500 text-sm font-light leading-relaxed max-w-xs">{desc}</p>
      </div>
      <div className="mt-12 flex items-center gap-2 text-[10px] font-bold text-zinc-700 uppercase tracking-[0.3em] group-hover:text-white transition-colors">
        Initialize_Node <ChevronRight className="w-3 h-3" />
      </div>
    </div>
    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
  </Link>
);

const AccordionItem = ({ title, content, isOpen, onClick }: { title: string; content: string; isOpen: boolean; onClick: () => void }) => (
  <div className="border-b border-zinc-900">
    <button 
      onClick={onClick}
      className="w-full py-8 flex items-center justify-between text-left group"
    >
      <span className={`text-sm md:text-lg font-bold uppercase tracking-widest transition-colors duration-300 ${isOpen ? 'text-red-600' : 'text-white group-hover:text-red-500'}`}>
        {title}
      </span>
      <div className={`w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-red-600 border-red-600 rotate-90' : ''}`}>
        {isOpen ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-zinc-500" />}
      </div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pb-8 text-zinc-500 text-sm md:text-base leading-relaxed font-light max-w-3xl">
            {content}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  </div>
);

// --- Main Page ---

const DigitalStudio: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What services does your digital studio offer in Tamil Nadu?",
      a: "We are a full-service digital studio offering web design, website development, SEO, digital marketing, branding, graphic design, product photoshoots, site photoshoots, photo editing, and creative content services for businesses across Tamil Nadu."
    },
    {
      q: "Do you work with businesses outside Karur?",
      a: "Yes. While we are based in Karur, we work with clients across Tamil Nadu including Chennai, Coimbatore, Madurai, Trichy, Salem, Tiruppur, and other districts, as well as businesses across India."
    },
    {
      q: "Can I get all digital services from one place?",
      a: "Absolutely. Our digital studio is designed to handle everything under one roof — from website creation and SEO to branding, marketing, and professional photography — ensuring consistency and better results for your brand."
    },
    {
      q: "Do you provide SEO and Google Business Profile optimization?",
      a: "Yes. We provide local SEO, on-page SEO, technical SEO, and Google Business Profile (GBP) optimization to help businesses rank higher on Google and attract more local customers across Tamil Nadu."
    },
    {
      q: "Do you offer product and site photoshoots?",
      a: "Yes. We provide professional product photoshoots, factory and office site photoshoots, and high-quality photo editing services for websites, e-commerce platforms, and digital marketing campaigns."
    },
    {
      q: "How long does it take to complete a project?",
      a: "Project timelines depend on the scope. A standard website usually takes 7–14 days, while branding, SEO, and photography projects are planned based on requirements. We always provide a clear timeline before starting."
    }
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-red-600/30 overflow-x-hidden">
        
<Helmet>

  {/* ================= BASIC SEO ================= */}
  <html lang="en-IN" />

  {/* FIXED: Removed leading space before "Digital Studio..." */}
  <title>Digital Studio in Tamil Nadu | Web Design, SEO & Branding – VGot You</title>

  <meta
    name="description"
    content="VGot You is a full-service digital studio in Tamil Nadu offering web design, SEO, branding, digital marketing, photography and creative services for businesses across all 38 districts. Based in Karur."
  />

  {/* FIXED: Removed meta keywords */}

  <meta name="robots" content="index, follow" />
  <meta name="author" content="VGot You" />
  <link rel="canonical" href="https://www.vgotyou.com/digital-studio-tamil-nadu" />

  {/* ================= HREFLANG ================= */}
  {/* ADDED: Was completely missing */}
  <link rel="alternate" hrefLang="en-IN" href="https://www.vgotyou.com/digital-studio-tamil-nadu" />
  <link rel="alternate" hrefLang="en-GB" href="https://www.vgotyou.com/digital-studio-tamil-nadu" />
  <link rel="alternate" hrefLang="x-default" href="https://www.vgotyou.com/digital-studio-tamil-nadu" />

  {/* ================= OPEN GRAPH ================= */}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="VGot You" />
  {/* FIXED: og:title now matches <title> exactly */}
  <meta property="og:title" content="Digital Studio in Tamil Nadu | Web Design, SEO & Branding – VGot You" />
  <meta
    property="og:description"
    content="VGot You is a full-service digital studio in Tamil Nadu offering web design, SEO, branding, digital marketing, photography and creative services for businesses across all 38 districts."
  />
  <meta property="og:url" content="https://www.vgotyou.com/digital-studio-tamil-nadu" />
  {/* FIXED: vgotyou.png → vgotyou.png */}
  <meta property="og:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  {/* FIXED: og:image:alt was missing */}
  <meta property="og:image:alt" content="VGot You Digital Studio in Tamil Nadu – Web Design, SEO & Branding" />
  <meta property="og:locale" content="en_IN" />
  {/* FIXED: og:locale:alternate was missing */}
  <meta property="og:locale:alternate" content="en_GB" />

  {/* ================= TWITTER / X ================= */}
  <meta name="twitter:card" content="summary_large_image" />
  {/* FIXED: twitter:title now matches <title> exactly */}
  <meta name="twitter:title" content="Digital Studio in Tamil Nadu | Web Design, SEO & Branding – VGot You" />
  <meta
    name="twitter:description"
    content="Full-service digital studio in Tamil Nadu — web design, SEO, branding, digital marketing and photography for businesses across all 38 districts. Based in Karur."
  />
  {/* FIXED: vgotyou.png → vgotyou.png */}
  <meta name="twitter:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
  {/* FIXED: twitter:site and twitter:creator were missing */}
  <meta name="twitter:site" content="@vgotyou" />
  <meta name="twitter:creator" content="@vgotyou" />

  {/* ================= SCHEMA: WEB PAGE ================= */}
 
  <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://www.vgotyou.com/digital-studio-tamil-nadu#webpage",
      "url": "https://www.vgotyou.com/digital-studio-tamil-nadu",
      "name": "Digital Studio in Tamil Nadu | Web Design, SEO & Branding – VGot You",
      "description": "Full-service digital studio in Tamil Nadu offering web design, SEO, branding, digital marketing and photography for businesses across all 38 districts.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@id": "https://www.vgotyou.com/#website"
      },
      "publisher": {
        "@id": "https://www.vgotyou.com/#organization"
      },
      "about": {
        "@id": "https://www.vgotyou.com/digital-studio-tamil-nadu#service"
      }
    }
  `}</script>

  {/* ================= SCHEMA: SERVICE ================= */}
  
  <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://www.vgotyou.com/digital-studio-tamil-nadu#service",
      "name": "Digital Studio Services in Tamil Nadu",
      "url": "https://www.vgotyou.com/digital-studio-tamil-nadu",
      "description": "Full-service digital studio in Tamil Nadu offering web design, website development, SEO, digital marketing, branding, graphic design, product photography, site photography and photo editing for businesses across all 38 districts.",
      "serviceType": [
        "Web Design",
        "Website Development",
        "SEO Services Tamil Nadu",
        "Local SEO",
        "Google Business Profile Optimization",
        "Digital Marketing",
        "Branding and Logo Design",
        "Graphic Design",
        "Product Photography",
        "Industrial Site Photography",
        "Photo Editing",
        "Social Media Marketing"
      ],
      "provider": {
        "@id": "https://www.vgotyou.com/#localbusiness"
      },
      "areaServed": [
        { "@type": "State", "name": "Tamil Nadu" },
        { "@type": "City", "name": "Karur" },
        { "@type": "City", "name": "Chennai" },
        { "@type": "City", "name": "Coimbatore" },
        { "@type": "City", "name": "Madurai" },
        { "@type": "City", "name": "Trichy" },
        { "@type": "City", "name": "Salem" },
        { "@type": "City", "name": "Tiruppur" },
        { "@type": "City", "name": "Erode" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Digital Studio Services Tamil Nadu",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Web Design Tamil Nadu" }
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "SEO Services Tamil Nadu" }
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Branding and Logo Design Tamil Nadu" }
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Product and Industrial Photography Tamil Nadu" }
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Digital Marketing Tamil Nadu" }
          }
        ]
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
          "name": "What services does your digital studio offer in Tamil Nadu?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We are a full-service digital studio offering web design, website development, SEO, digital marketing, branding, graphic design, product photoshoots, site photoshoots, photo editing, and creative content services for businesses across Tamil Nadu."
          }
        },
        {
          "@type": "Question",
          "name": "Do you work with businesses outside Karur?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. While we are based in Karur, we work with clients across Tamil Nadu including Chennai, Coimbatore, Madurai, Trichy, Salem, Tiruppur, and other districts, as well as businesses across India."
          }
        },
        {
          "@type": "Question",
          "name": "Can I get all digital services from one place?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. Our digital studio is designed to handle everything under one roof — from website creation and SEO to branding, marketing, and professional photography — ensuring consistency and better results for your brand."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide SEO and Google Business Profile optimization?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We provide local SEO, on-page SEO, technical SEO, and Google Business Profile optimization to help businesses rank higher on Google and attract more local customers across Tamil Nadu."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer product and site photoshoots?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We provide professional product photoshoots, factory and office site photoshoots, and high-quality photo editing services for websites, e-commerce platforms, and digital marketing campaigns."
          }
        },
        {
          "@type": "Question",
          "name": "How long does it take to complete a project?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Project timelines depend on the scope. A standard website usually takes 7–14 days, while branding, SEO, and photography projects are planned based on requirements. We always provide a clear timeline before starting."
          }
        },
        {
          "@type": "Question",
          "name": "Is your digital studio suitable for small businesses and startups?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We work with startups, MSMEs, manufacturers, exporters, and established businesses. Our solutions are scalable and tailored to your business size and goals."
          }
        },
        {
          "@type": "Question",
          "name": "How can I get started with your digital studio services?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can contact us directly through our website or Google Business Profile. We offer a free consultation to understand your requirements and recommend the right digital strategy."
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
          "name": "Digital Studio Tamil Nadu",
          "item": "https://www.vgotyou.com/digital-studio-tamil-nadu"
        }
      ]
    }
  `}</script>

</Helmet>

      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-24">
        <GridBackground />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <m.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-zinc-950 border border-zinc-900 rounded-full mb-12"
            >
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400">Core_Engine: Initialized</span>
            </m.div>
            
            <m.h1 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-[16vw] sm:text-[14vw] md:text-[12vw] font-black leading-[0.7] tracking-tighter uppercase mb-12"
            >
              Digital <br />
              <span className="text-zinc-900 outline-text italic">Studio.</span>
            </m.h1>

            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto border-t border-zinc-900 pt-12 mt-12">
              <div className="text-left">
                <p className="text-[10px] font-mono text-red-600 uppercase tracking-widest mb-4">Node_ID</p>
                <p className="text-xs text-zinc-500 leading-relaxed uppercase tracking-wider">
                  TN-KAR-01 <br />
                  Karur HQ
                </p>
              </div>
              <div className="text-left">
                <p className="text-[10px] font-mono text-red-600 uppercase tracking-widest mb-4">Capabilities</p>
                <p className="text-xs text-zinc-500 leading-relaxed uppercase tracking-wider">
                  Web Architecture <br />
                  SEO Engineering
                </p>
              </div>
              <div className="text-left">
                <p className="text-[10px] font-mono text-red-600 uppercase tracking-widest mb-4">Optics</p>
                <p className="text-xs text-zinc-500 leading-relaxed uppercase tracking-wider">
                  Industrial Shoot <br />
                  Brand Identity
                </p>
              </div>
              <div className="text-left">
                <p className="text-[10px] font-mono text-red-600 uppercase tracking-widest mb-4">Timestamp</p>
                <p className="text-xs text-zinc-500 leading-relaxed uppercase tracking-wider">
                  {new Date().toISOString().split('T')[0]} <br />
                  {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          </m.div>
        </div>

        <m.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-[0.5em]">Initialize_Sequence</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-red-600 to-transparent"></div>
        </m.div>
      </section>

      <SystemTicker />

      {/* Stats Section */}
      <section className="py-24 px-6 border-y border-zinc-900 bg-zinc-950/20">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900">
            <StatCard label="Deployment_Count" value="250+" sub="Projects Delivered" />
            <StatCard label="Client_Retention" value="98%" sub="Success Rate" />
            <StatCard label="Node_Coverage" value="38" sub="TN Districts" />
            <StatCard label="Uptime_Metric" value="99.9%" sub="System Reliability" />
          </div>
        </div>
      </section>

      {/* About / Brief */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <m.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <SectionLabel text="Briefing_Node" />
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 leading-none">
                Technical-First <br />
                <span className="text-zinc-800">Excellence Lab.</span>
              </h2>
              <p className="text-xl text-zinc-400 font-light leading-relaxed mb-12">
                VGot You is not just a creative agency. We are a digital studio in Karur, Tamil Nadu, engineered for businesses that demand high-performance visual systems and search-grounded infrastructure.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link to="/web-design-karur" className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-white hover:text-red-600 transition-colors">
                  Explore_Local_Node <ChevronRight className="w-4 h-4 text-red-600 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/about" className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors">
                  Studio_Profile <ChevronRight className="w-4 h-4 text-zinc-800 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </m.div>

            <div className="relative">
              <div className="aspect-square bg-zinc-900 border border-zinc-800 p-8 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1)_0%,transparent_70%)]"></div>
                <div className="relative z-10 text-center">
                  <div className="text-8xl font-black italic text-zinc-800 group-hover:text-red-600/20 transition-colors duration-700">VG</div>
                  <p className="text-[10px] font-mono text-zinc-600 tracking-[0.5em] uppercase mt-4">Digital_Core_v4.0</p>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-zinc-700"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-zinc-700"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="py-32 px-6 bg-zinc-950/30 border-y border-zinc-900">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <SectionLabel text="Service_Matrix" />
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">
                Unified <br />
                <span className="text-zinc-800">Capabilities.</span>
              </h2>
            </div>
            <div className="text-right">
              <p className="text-zinc-500 text-sm font-light max-w-xs uppercase tracking-widest leading-relaxed">
                Integrated digital solutions for manufacturing, export, and modern enterprise.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900">
            <BentoCard 
              title="Web Architecture" 
              desc="High-performance, SEO-grounded platforms built for speed and conversion." 
              icon={Code2} 
              path="/web-design"
              size="large"
            />
            <BentoCard 
              title="Brand Identity" 
              desc="Logical visual systems that command authority and market presence." 
              icon={PenTool} 
              path="/logo-showcase"
            />
            <BentoCard 
              title="Search Engineering" 
              desc="Technical SEO and local indexing optimization for maximum visibility." 
              icon={Rocket} 
              path="/seo-services"
            />
            <BentoCard 
              title="Digital Marketing" 
              desc="Intent-based growth strategies and targeted paid media deployment." 
              icon={Monitor} 
              path="/digital-marketing"
            />
            <BentoCard 
              title="Visual Optics" 
              desc="Professional industrial and product photography for high-end assets." 
              icon={Camera} 
              path="/portfolio"
              size="large"
            />
          </div>
        </div>
      </section>

      {/* Visual Intelligence Section */}
      <section className="py-32 px-6 bg-zinc-950/20">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-24 items-center mb-24">
            <m.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <SectionLabel text="Visual_Intelligence" />
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">
                Optics <br />
                <span className="text-zinc-800 italic">Engineered.</span>
              </h2>
              <p className="text-xl text-zinc-400 font-light leading-relaxed mb-12 max-w-xl">
                We provide professional product and industrial site photoshoots across Tamil Nadu. Our visual assets are engineered to integrate perfectly with your digital infrastructure.
              </p>
              <div className="grid grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
                <div className="p-8 bg-black group hover:bg-zinc-950 transition-colors">
                  <Camera className="w-8 h-8 text-red-600 mb-6" />
                  <p className="text-[8px] font-mono text-zinc-600 uppercase mb-2">Service_Type</p>
                  <p className="text-sm font-bold text-white uppercase tracking-widest">Product_Shoot</p>
                </div>
                <div className="p-8 bg-black group hover:bg-zinc-950 transition-colors">
                  <Layers className="w-8 h-8 text-red-600 mb-6" />
                  <p className="text-[8px] font-mono text-zinc-600 uppercase mb-2">Service_Type</p>
                  <p className="text-sm font-bold text-white uppercase tracking-widest">Site_Optics</p>
                </div>
              </div>
            </m.div>
            <div className="grid grid-cols-2 gap-6 relative">
              <div className="absolute -top-12 -right-12 w-48 h-48 border border-red-600/10 rounded-full animate-pulse"></div>
              <m.div 
                whileHover={{ scale: 1.02 }}
                className="aspect-[3/4] bg-zinc-900 overflow-hidden relative group border border-zinc-800"
              >
                <img 
                  src="https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=1000&auto=format&fit=crop" 
                  alt="Product Photoshoot" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute bottom-4 left-4 text-[8px] font-mono text-white/50 uppercase tracking-widest">Ref: PRD_001</div>
              </m.div>
              <m.div 
                whileHover={{ scale: 1.02 }}
                className="aspect-[3/4] bg-zinc-900 overflow-hidden relative group mt-12 border border-zinc-800"
              >
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop" 
                  alt="Industrial Site Photoshoot" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute bottom-4 left-4 text-[8px] font-mono text-white/50 uppercase tracking-widest">Ref: IND_042</div>
              </m.div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 px-6 border-y border-zinc-900">
        <div className="container mx-auto max-w-7xl">
          <SectionLabel text="Workflow_Protocol" />
          <div className="grid md:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900">
            {[
              { step: "01", title: "Audit", desc: "Deep analysis of current digital footprint and market nodes." },
              { step: "02", title: "Blueprint", desc: "Engineering the architecture and visual logic for the project." },
              { step: "03", title: "Deploy", desc: "High-performance execution and system integration." },
              { step: "04", title: "Optimize", desc: "Continuous monitoring and performance scaling." }
            ].map((item, i) => (
              <div key={i} className="p-12 bg-black hover:bg-zinc-950 transition-all group">
                <span className="text-4xl font-black text-zinc-900 group-hover:text-red-600/20 transition-colors mb-8 block">{item.step}</span>
                <h4 className="text-xl font-bold uppercase tracking-widest text-white mb-4">{item.title}</h4>
                <p className="text-zinc-500 text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Readout Section */}
      <section className="py-32 px-6 bg-zinc-950/50 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1">
              <div className="p-8 border border-zinc-900 bg-black font-mono text-[10px] leading-relaxed text-zinc-500 overflow-hidden h-[400px] relative">
                <div className="absolute top-0 left-0 w-full h-full p-8 animate-scroll-text">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="mb-2">
                      <span className="text-red-600">[{new Date().toLocaleTimeString()}]</span> INITIALIZING_NODE_TN_{i}... <br />
                      <span className="text-zinc-700">{" >> "}LOAD_PROTOCOL: VGot_v4.2</span> <br />
                      <span className="text-zinc-700">{" >> "}STATUS: OPTIMAL</span> <br />
                      <span className="text-zinc-700">{" >> "}LATENCY: {Math.floor(Math.random() * 20)}ms</span> <br />
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4 px-2 py-1 bg-red-600 text-white text-[8px] animate-pulse">LIVE_FEED</div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <SectionLabel text="System_Specs" />
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
                Data-Driven <br />
                <span className="text-zinc-800">Infrastructure.</span>
              </h2>
              <p className="text-zinc-400 font-light leading-relaxed mb-12">
                Our studio operates on a high-performance infrastructure designed for maximum uptime and rapid deployment. We treat every project as a mission-critical node in the digital matrix.
              </p>
              <div className="space-y-4">
                {[
                  { label: "Architecture", value: "Next-Gen SPA / SSR" },
                  { label: "Optimization", value: "Core Web Vitals Focused" },
                  { label: "Security", value: "SSL / End-to-End Encryption" },
                  { label: "Scaling", value: "Global CDN Deployment" }
                ].map((spec, i) => (
                  <div key={i} className="flex items-center justify-between py-4 border-b border-zinc-900">
                    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{spec.label}</span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Node Map */}
      <section className="py-32 px-6 bg-zinc-950 border-y border-zinc-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-red-600/[0.02] -skew-x-12"></div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1">
              <SectionLabel text="Regional_Nodes" />
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
                Serving <br />
                <span className="text-zinc-800">Tamil Nadu.</span>
              </h2>
              <p className="text-zinc-500 font-light mb-12 leading-relaxed uppercase text-sm tracking-[0.2em]">
                Remote-first deployment across all 38 districts. Major hubs include Chennai, Coimbatore, Madurai, Tiruppur, Salem, Trichy, and Karur.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Chennai", "Coimbatore", "Karur", "Trichy", "Madurai", "Salem", "Tiruppur", "Erode", "Vellore", "Thanjavur"].map(city => (
                  <span key={city} className="px-4 py-2 border border-zinc-900 bg-black text-[10px] font-mono text-zinc-500 uppercase tracking-widest hover:border-red-600/30 hover:text-white transition-all cursor-default">
                    {city}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="aspect-video bg-black border border-zinc-900 p-12 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05)_0%,transparent_70%)]"></div>
                <div className="text-center relative z-10">
                  <Globe className="w-24 h-24 text-zinc-900 mb-6 mx-auto" />
                  <p className="text-xs font-mono text-zinc-700 uppercase tracking-[0.5em]">Statewide_Connectivity_Active</p>
                </div>
                {/* Scanning line effect */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-red-600/20 animate-scan"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 bg-black">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-24">
            <SectionLabel text="Diagnostics" />
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Frequent Queries</h2>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                title={faq.q} 
                content={faq.a} 
                isOpen={openFaq === index} 
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-48 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1)_0%,transparent_70%)]"></div>
        <m.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto relative z-10"
        >
          <p className="text-[10px] font-mono text-red-600 font-bold uppercase tracking-[0.5em] mb-12">Action: Initiate_Deployment</p>
          <h2 className="text-[12vw] sm:text-[10vw] md:text-[8vw] font-black uppercase leading-[0.8] mb-16 tracking-tighter text-white">
            Deploy Your <br />
            <span className="text-zinc-900 outline-text">Presence.</span>
          </h2>
          <Link
            to="/contact?message=Hi VGot You, I'm interested in the services of your Digital Studio."
            className="group relative inline-flex items-center justify-center px-16 py-8 bg-red-600 text-white font-black uppercase tracking-[0.3em] text-sm overflow-hidden transition-all hover:bg-red-700 shadow-[0_0_50px_rgba(220,38,38,0.3)]"
          >
            <span className="relative z-10">Contact Studio</span>
            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </Link>
          <div className="mt-24 flex flex-col items-center gap-4">
            <div className="w-12 h-[1px] bg-zinc-800"></div>
            <p className="text-[9px] font-mono text-zinc-700 uppercase tracking-[0.5em]">Monitoring_Signal: Active // Karur_Node: Online</p>
          </div>
        </m.div>
      </section>

      <style>{`
        .outline-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
          color: transparent;
        }
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes scroll-text {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-scroll-text {
          animation: scroll-text 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default DigitalStudio;
