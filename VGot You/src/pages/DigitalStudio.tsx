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
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useTheme } from '../components/common/ThemeProvider';

const { Link } = ReactRouterDOM as any;
const m = motion as any;

// --- Components ---

const GridBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.05)_0%,transparent_100%)]"></div>
  </div>
);

const SystemTicker = () => (
  <div className="w-full bg-zinc-50 dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-900 py-2 overflow-hidden whitespace-nowrap">
    <div className="inline-block animate-marquee">
      {[...Array(10)].map((_, i) => (
        <span key={i} className="text-[8px] font-mono text-zinc-500 uppercase tracking-[0.4em] mx-8">
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
  <div className="p-8 border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950/50 backdrop-blur-sm rounded-[10px] group hover:border-red-600/30 transition-all duration-500">
    <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4 group-hover:text-red-500 transition-colors">{label}</p>
    <h3 className="text-4xl font-black text-zinc-900 dark:text-white mb-2 tracking-tighter">{value}</h3>
    <p className="text-xs text-zinc-500 uppercase tracking-wider">{sub}</p>
  </div>
);

const BentoCard = ({ title, desc, icon: Icon, path, size = "small" }: { title: string; desc: string; icon: any; path: string; size?: "small" | "large" }) => (
  <Link 
    to={path} 
    className={`group relative p-8 md:p-12 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-900 rounded-[10px] overflow-hidden transition-all duration-500 hover:bg-zinc-50 dark:hover:bg-zinc-950 ${size === "large" ? "md:col-span-2" : ""}`}
  >
    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
      <ArrowUpRight className="w-5 h-5 text-red-600" />
    </div>
    <div className="relative z-10 h-full flex flex-col justify-between">
      <div>
        <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-[10px] flex items-center justify-center mb-8 group-hover:bg-red-600 transition-colors duration-500">
          <Icon className="w-6 h-6 text-zinc-900 dark:text-white" />
        </div>
        <h4 className="text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white mb-4 group-hover:text-red-500 transition-colors">{title}</h4>
        <p className="text-zinc-500 text-sm font-light leading-relaxed max-w-xs">{desc}</p>
      </div>
      <div className="mt-12 flex items-center gap-2 text-[10px] font-bold text-zinc-400 dark:text-zinc-700 uppercase tracking-[0.3em] group-hover:text-zinc-900 dark:group-hover:text-white transition-colors animate-pulse">
        Initialize_Node <ChevronRight className="w-3 h-3" />
      </div>
    </div>
    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
  </Link>
);

const AccordionItem = ({ title, content, isOpen, onClick }: { title: string; content: string; isOpen: boolean; onClick: () => void }) => (
  <div className="border-b border-zinc-200 dark:border-zinc-900">
    <button 
      onClick={onClick}
      className="w-full py-8 flex items-center justify-between text-left group"
    >
      <span className={`text-sm md:text-lg font-bold uppercase tracking-widest transition-colors duration-300 ${isOpen ? 'text-red-600' : 'text-zinc-900 dark:text-white group-hover:text-red-500'}`}>
        {title}
      </span>
      <div className={`w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-850 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-red-600 border-red-600 rotate-90 animate-pulse' : ''}`}>
        {isOpen ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />}
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
          <div className="pb-8 text-zinc-550 text-sm md:text-base leading-relaxed font-light max-w-3xl">
            {content}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  </div>
);

// --- Main Page ---

const DigitalStudio: React.FC = () => {
  const { theme } = useTheme();
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
    <div className="min-h-screen bg-white dark:bg-[#020202] text-zinc-900 dark:text-white selection:bg-red-600/30 overflow-x-hidden pt-16 md:pt-20 transition-colors duration-300">
        <Header />
<Helmet>

  {/* ================= BASIC SEO ================= */}
  <html lang="en-IN" />
  <title>Digital Studio in Tamil Nadu | Web Design, SEO & Branding – VGot You</title>
  <meta
    name="description"
    content="VGot You is a full-service digital studio in Tamil Nadu offering web design, SEO, branding, digital marketing, photography and creative services for businesses across all 38 districts. Based in Karur."
  />
  <meta name="robots" content="index, follow" />
  <meta name="author" content="VGot You" />
  <link rel="canonical" href="https://www.vgotyou.com/digital-studio-tamil-nadu" />

  {/* ================= HREFLANG ================= */}
  <link rel="alternate" hrefLang="en-IN" href="https://www.vgotyou.com/digital-studio-tamil-nadu" />
  <link rel="alternate" hrefLang="en-GB" href="https://www.vgotyou.com/digital-studio-tamil-nadu" />
  <link rel="alternate" hrefLang="x-default" href="https://www.vgotyou.com/digital-studio-tamil-nadu" />

  {/* ================= OPEN GRAPH ================= */}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="VGot You" />
  <meta property="og:title" content="Digital Studio in Tamil Nadu | Web Design, SEO & Branding – VGot You" />
  <meta
    property="og:description"
    content="VGot You is a full-service digital studio in Tamil Nadu offering web design, SEO, branding, digital marketing, photography and creative services for businesses across all 38 districts."
  />
  <meta property="og:url" content="https://www.vgotyou.com/digital-studio-tamil-nadu" />
  <meta property="og:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="VGot You Digital Studio in Tamil Nadu – Web Design, SEO & Branding" />
  <meta property="og:locale" content="en_IN" />
  <meta property="og:locale:alternate" content="en_GB" />

  {/* ================= TWITTER / X ================= */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Digital Studio in Tamil Nadu | Web Design, SEO & Branding – VGot You" />
  <meta
    name="twitter:description"
    content="Full-service digital studio in Tamil Nadu — web design, SEO, branding, digital marketing and photography for businesses across all 38 districts. Based in Karur."
  />
  <meta name="twitter:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
  <meta name="twitter:site" content="@vgotyou" />
  <meta name="twitter:creator" content="@vgotyou" />

</Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden pt-12">
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
              className="inline-flex items-center gap-3 px-4 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 rounded-full mb-12"
            >
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">Core_Engine: Initialized</span>
            </m.div>
            
            <m.h1 
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-[16vw] sm:text-[14vw] md:text-[11vw] font-black leading-[0.7] tracking-tighter uppercase mb-12 text-zinc-900 dark:text-white"
            >
              Digital <br />
              <span className="text-zinc-400 dark:text-zinc-800 outline-text italic">Studio.</span>
            </m.h1>

            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto border-t border-zinc-200 dark:border-zinc-900 pt-12 mt-12">
              <div className="text-left">
                <p className="text-[10px] font-mono text-red-600 uppercase tracking-widest mb-4">Node_ID</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed uppercase tracking-wider font-light">
                  TN-KAR-01 <br />
                  Karur
                </p>
              </div>
              <div className="text-left">
                <p className="text-[10px] font-mono text-red-600 uppercase tracking-widest mb-4">Capabilities</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed uppercase tracking-wider font-light">
                  Web Architecture <br />
                  SEO Engineering
                </p>
              </div>
              <div className="text-left">
                <p className="text-[10px] font-mono text-red-600 uppercase tracking-widest mb-4">Optics</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed uppercase tracking-wider font-light">
                  Industrial Shoot <br />
                  Brand Identity
                </p>
              </div>
              <div className="text-left">
                <p className="text-[10px] font-mono text-red-600 uppercase tracking-widest mb-4">Timestamp</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed uppercase tracking-wider font-light">
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
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hidden md:flex"
        >
          <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-[0.5em]">Initialize_Sequence</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-red-600 to-transparent"></div>
        </m.div>
      </section>

      <SystemTicker />

      {/* Stats Section */}
      <section className="py-24 px-6 border-y border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950/25">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-250 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900 rounded-[10px] overflow-hidden">
            <StatCard label="Deployment_Count" value="250+" sub="Projects Delivered" />
            <StatCard label="Client_Retention" value="98%" sub="Success Rate" />
            <StatCard label="Node_Coverage" value="38" sub="TN Districts" />
            <StatCard label="Uptime_Metric" value="99.9%" sub="System Reliability" />
          </div>
        </div>
      </section>

      {/* About / Brief */}
      <section className="py-24 md:py-32 px-6 relative overflow-hidden bg-white dark:bg-[#020202] transition-colors duration-300">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <m.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <SectionLabel text="Briefing_Node" />
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 leading-none text-zinc-900 dark:text-white transition-colors duration-300">
                Technical-First <br />
                <span className="text-zinc-405 dark:text-zinc-750">Excellence Lab.</span>
              </h2>
              <p className="text-base md:text-xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed mb-12">
                VGot You is not just a creative agency. We are a premier <strong className="text-zinc-900 dark:text-white">digital studio in Karur, Tamil Nadu</strong>, engineered for businesses that demand high-performance visual systems, elite interface development, and search-grounded infrastructure.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link to="/web-design-karur" className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-zinc-900 dark:text-white hover:text-red-600 transition-colors">
                  Explore_Local_Node <ChevronRight className="w-4 h-4 text-red-600 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/about" className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Studio_Profile <ChevronRight className="w-4 h-4 text-zinc-400 dark:text-zinc-700 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </m.div>

            <div className="relative">
              <div className="aspect-square bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-900 p-8 flex items-center justify-center relative overflow-hidden group rounded-[10px] transition-colors duration-300">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1)_0%,transparent_70%)]"></div>
                <div className="relative z-10 text-center">
                  <div className="text-8xl font-black italic text-zinc-200 dark:text-zinc-800 group-hover:text-red-600/20 transition-colors duration-700">VG</div>
                  <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 tracking-[0.5em] uppercase mt-4">Digital_Core_v4.0</p>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-zinc-300 dark:border-zinc-700 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-zinc-300 dark:border-zinc-700 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="py-24 md:py-32 px-6 bg-zinc-50/50 dark:bg-zinc-950/30 border-y border-zinc-250 dark:border-zinc-900 transition-colors duration-300">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-8">
            <div className="max-w-2xl">
              <SectionLabel text="Service_Matrix" />
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none text-zinc-900 dark:text-white transition-colors duration-300">
                Unified <br />
                <span className="text-zinc-405 dark:text-zinc-750">Capabilities.</span>
              </h2>
            </div>
            <div className="text-right">
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light max-w-xs uppercase tracking-widest leading-relaxed font-mono">
                Integrated digital solutions for manufacturing, export, and modern enterprise.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
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
      <section className="py-24 md:py-32 px-6 bg-white dark:bg-zinc-950/20 transition-colors duration-300">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center mb-24">
            <m.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <SectionLabel text="Visual_Intelligence" />
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none text-zinc-900 dark:text-white transition-colors duration-300">
                Optics <br />
                <span className="text-zinc-405 dark:text-zinc-750 italic">Engineered.</span>
              </h2>
              <p className="text-base md:text-xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed mb-12 max-w-xl transition-colors">
                We provide professional product and industrial site photoshoots across Tamil Nadu. Our visual assets are engineered to integrate perfectly with your digital infrastructure.
              </p>
              <div className="grid grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900 rounded-[10px] overflow-hidden">
                <div className="p-8 bg-white dark:bg-black group hover:bg-zinc-50 dark:hover:bg-zinc-950 transition-colors">
                  <Camera className="w-8 h-8 text-red-600 mb-6" />
                  <p className="text-[8px] font-mono text-zinc-400 dark:text-zinc-500 uppercase mb-2">Service_Type</p>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest">Product_Shoot</p>
                </div>
                <div className="p-8 bg-white dark:bg-black group hover:bg-zinc-50 dark:hover:bg-zinc-950 transition-colors">
                  <Layers className="w-8 h-8 text-red-600 mb-6" />
                  <p className="text-[8px] font-mono text-zinc-400 dark:text-zinc-500 uppercase mb-2">Service_Type</p>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-widest">Site_Optics</p>
                </div>
              </div>
            </m.div>
            <div className="grid grid-cols-2 gap-6 relative">
              <div className="absolute -top-12 -right-12 w-48 h-48 border border-red-600/10 rounded-full animate-pulse pointer-events-none"></div>
              <m.div 
                whileHover={{ scale: 1.02 }}
                className="aspect-[3/4] bg-zinc-100 dark:bg-zinc-900 rounded-[10px] overflow-hidden relative group border border-zinc-200 dark:border-zinc-800"
              >
                <img 
                  src="https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=1000&auto=format&fit=crop" 
                  alt="Product Photoshoot" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                {/* Black overlay - stays black in both themes */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700 pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 text-[8px] font-mono text-white/50 uppercase tracking-widest">Ref: PRD_001</div>
              </m.div>
              <m.div 
                whileHover={{ scale: 1.02 }}
                className="aspect-[3/4] bg-zinc-100 dark:bg-zinc-900 rounded-[10px] overflow-hidden relative group mt-12 border border-zinc-200 dark:border-zinc-800"
              >
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop" 
                  alt="Industrial Site Photoshoot" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                {/* Black overlay - stays black in both themes */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700 pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 text-[8px] font-mono text-white/50 uppercase tracking-widest">Ref: IND_042</div>
              </m.div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32 px-6 border-y border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-black/20">
        <div className="container mx-auto max-w-7xl">
          <SectionLabel text="Workflow_Protocol" />
          <div className="grid md:grid-cols-4 gap-px bg-zinc-200 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900 rounded-[10px] overflow-hidden shadow-sm dark:shadow-none">
            {[
              { step: "01", title: "Audit", desc: "Deep analysis of current digital footprint and market nodes." },
              { step: "02", title: "Blueprint", desc: "Engineering the architecture and visual logic for the project." },
              { step: "03", title: "Deploy", desc: "High-performance execution and system integration." },
              { step: "04", title: "Optimize", desc: "Continuous monitoring and performance scaling." }
            ].map((item, i) => (
              <div key={i} className="p-12 bg-white dark:bg-black hover:bg-zinc-50/70 dark:hover:bg-zinc-950 transition-all group">
                <span className="text-4xl font-black text-zinc-200 dark:text-zinc-900 group-hover:text-red-600/20 transition-colors mb-8 block font-mono">{item.step}</span>
                <h4 className="text-xl font-bold uppercase tracking-widest text-zinc-900 dark:text-white mb-4 transition-colors font-black">{item.title}</h4>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light leading-relaxed transition-colors">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Readout Section */}
      <section className="py-24 md:py-32 px-6 bg-zinc-50 dark:bg-zinc-950/20 relative overflow-hidden transition-colors duration-300">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="order-2 lg:order-1">
              <div className="p-8 border border-zinc-200 dark:border-zinc-900 bg-zinc-100 dark:bg-black font-mono text-[10px] leading-relaxed text-zinc-500 dark:text-zinc-450 overflow-hidden h-[400px] relative rounded-[10px]">
                <div className="absolute top-0 left-0 w-full h-full p-8 animate-scroll-text pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="mb-2">
                      <span className="text-red-600 font-bold">[{new Date().toLocaleTimeString()}]</span> INITIALIZING_NODE_TN_{i}... <br />
                      <span className="text-zinc-500 dark:text-zinc-700">{" >> "}LOAD_PROTOCOL: VGot_v4.2</span> <br />
                      <span className="text-zinc-500 dark:text-zinc-700">{" >> "}STATUS: OPTIMAL</span> <br />
                      <span className="text-zinc-500 dark:text-zinc-700">{" >> "}LATENCY: {Math.floor(Math.random() * 20)}ms</span> <br />
                    </div>
                  ))}
                </div>
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-100 dark:from-black to-transparent pointer-events-none"></div>
                <div className="absolute top-4 right-4 px-2 py-1 bg-red-600 text-white text-[8px] animate-pulse rounded-[4px] font-bold">LIVE_FEED</div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <SectionLabel text="System_Specs" />
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none text-zinc-900 dark:text-white transition-colors duration-300">
                Data-Driven <br />
                <span className="text-zinc-405 dark:text-zinc-750">Infrastructure.</span>
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 font-light leading-relaxed mb-12">
                Our studio operates on dynamic modern infrastructure engineered for maximum speed, reliable compliance, and rapid distribution. We process every project like a custom high-performance engine.
              </p>
              <div className="space-y-4">
                {[
                  { label: "Architecture", value: "Next-Gen SPA / SSR" },
                  { label: "Optimization", value: "Core Web Vitals Focused" },
                  { label: "Security", value: "SSL / End-to-End Encryption" },
                  { label: "Scaling", value: "Global CDN Deployment" }
                ].map((spec, i) => (
                  <div key={i} className="flex items-center justify-between py-4 border-b border-zinc-200 dark:border-zinc-900">
                    <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">{spec.label}</span>
                    <span className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Node Map */}
      <section className="py-24 md:py-32 px-6 bg-zinc-50 dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-900 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-red-600/[0.01] dark:bg-red-600/[0.02] -skew-x-12 pointer-events-none"></div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 md:gap-20 items-center">
            <div className="flex-1">
              <SectionLabel text="Regional_Nodes" />
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none text-zinc-900 dark:text-white transition-colors">
                Serving <br />
                <span className="text-zinc-405 dark:text-zinc-750">Tamil Nadu.</span>
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 font-light mb-12 leading-relaxed uppercase text-sm tracking-[0.2em] font-mono">
                Remote-oriented delivery modules active across all 38 districts. Major corporate nodes launched in Chennai, Coimbatore, Karur, Tiruppur, Salem, Madurai, and Trichy.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Chennai", "Coimbatore", "Karur", "Trichy", "Madurai", "Salem", "Tiruppur", "Erode", "Vellore", "Thanjavur"].map(city => (
                  <span key={city} className="px-4 py-2 border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-black text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest rounded-[10px] hover:border-red-600/30 hover:text-zinc-900 dark:hover:text-white transition-all cursor-default">
                    {city}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="aspect-video bg-white dark:bg-black border border-zinc-200 dark:border-zinc-900 p-12 flex items-center justify-center relative overflow-hidden rounded-[10px] transition-colors">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05)_0%,transparent_70%)]"></div>
                <div className="text-center relative z-10 pointer-events-none">
                  <Globe className="w-16 h-16 md:w-20 md:h-20 text-zinc-300 dark:text-zinc-800 mb-6 mx-auto animate-pulse" />
                  <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.4em]">Statewide_Connectivity_Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 px-6 bg-white dark:bg-black transition-colors duration-300">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 md:mb-20">
            <SectionLabel text="Diagnostics" />
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white font-black">Frequent Queries</h2>
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
      <section className="py-32 md:py-48 px-6 text-center relative overflow-hidden bg-zinc-50 dark:bg-black transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.08)_0%,transparent_70%)]"></div>
        <m.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto relative z-10"
        >
          <p className="text-[10px] font-mono text-red-600 font-bold uppercase tracking-[0.5em] mb-12">Action: Initiate_Deployment</p>
          <h2 className="text-[12vw] sm:text-[10vw] md:text-[8vw] font-black uppercase leading-[0.8] mb-16 tracking-tighter text-zinc-900 dark:text-white">
            Deploy Your <br />
            <span className="text-zinc-400 dark:text-zinc-800 outline-text">Presence.</span>
          </h2>
          <Link
            to="/contact?message=Hi VGot You, I'm interested in the services of your Digital Studio in Tamil Nadu."
            className="group relative inline-flex items-center justify-center px-16 py-6 md:py-8 bg-red-600 text-white font-black uppercase tracking-[0.3em] text-xs md:text-sm overflow-hidden transition-all hover:bg-zinc-906 shadow-[0_0_50px_rgba(220,38,38,0.3)] rounded-[10px]"
          >
            <span className="relative z-10">Contact Studio</span>
            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </Link>
          <div className="mt-24 flex flex-col items-center gap-4">
            <div className="w-12 h-[1px] bg-zinc-300 dark:bg-zinc-800"></div>
            <p className="text-[8px] md:text-[9px] font-mono text-zinc-500 dark:text-zinc-700 uppercase tracking-[0.4em] md:tracking-[0.5em] leading-relaxed">Monitoring_Signal: Active // Karur_Node: Online</p>
          </div>
        </m.div>
      </section>

      <style>{`
        .outline-text {
          -webkit-text-stroke: 1px currentColor;
          opacity: 0.15;
          color: transparent;
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
      <Footer />
    </div>
  );
};

export default DigitalStudio;
