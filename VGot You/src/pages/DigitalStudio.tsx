
import React, { useState } from 'react';
import { motion } from 'framer-motion';
// FIX: Using namespace import for react-router-dom to resolve "no exported member" errors
import * as ReactRouterDOM from 'react-router-dom';
import { Helmet } from "react-helmet";
import { SparklesIcon, RocketIcon, CodeBracketIcon, PenToolIcon, ChevronRightIcon, DesktopIcon } from '../components/Icons';

const { Link } = ReactRouterDOM as any;
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

const GrowthGraph = () => (
  <div className="relative w-full h-64 bg-zinc-950 border border-zinc-900 p-6 flex items-end gap-2 overflow-hidden group">
    <div className="absolute top-4 left-4 flex flex-col gap-1">
        <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Visibility_Pulse</span>
        <span className="text-xs font-bold text-red-600 uppercase tracking-tighter">+240% Lift</span>
    </div>
    {[40, 25, 60, 45, 80, 55, 95, 70, 100, 85].map((h, i) => (
      <m.div 
        key={i}
        initial={{ height: 0 }}
        whileInView={{ height: `${h}%` }}
        transition={{ duration: 1, delay: i * 0.05 }}
        className="flex-1 bg-zinc-900 border-t border-red-600/30 relative group-hover:bg-red-600/10 transition-colors"
      >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </m.div>
    ))}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
  </div>
);

const ImageSpecimen = ({ src, title, specs, alt }: { src: string, title: string, specs: string[], alt: string }) => (
    <div className="group relative aspect-square bg-zinc-900 border border-zinc-800 overflow-hidden">
        <img src={src} alt={alt} className="w-full h-full object-cover transition-all duration-700 opacity-80 group-hover:opacity-100 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
        <div className="absolute top-4 left-4 flex flex-col gap-1">
            <span className="text-[8px] font-mono text-white/60 uppercase tracking-[0.2em]">{title}</span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="flex flex-col gap-1">
                {specs.map(s => <span key={s} className="text-[7px] font-mono text-red-500 uppercase tracking-widest">{s}</span>)}
            </div>
            <div className="w-6 h-6 border border-white/20 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-white animate-pulse"></div>
            </div>
        </div>
    </div>
);

const AccordionItem: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onClick: () => void; id: string }> = ({ title, children, isOpen, onClick, id }) => {
    return (
        <div className="border-b border-zinc-900">
            <button 
                onClick={onClick} 
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${id}`}
                className="w-full flex justify-between items-center text-left py-6 text-sm md:text-base font-bold text-white hover:text-red-500 transition-colors uppercase tracking-widest font-mono"
            >
                <span className="pr-4">{title}</span>
                <svg className={`w-4 h-4 shrink-0 transition-transform transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <div 
                id={`faq-panel-${id}`}
                role="region"
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="pb-8 text-zinc-500 text-sm leading-relaxed font-light">{children}</div>
            </div>
        </div>
    );
};

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
        },
        {
            q: "Is your digital studio suitable for small businesses and startups?",
            a: "Yes. We work with startups, MSMEs, manufacturers, exporters, and established businesses. Our solutions are scalable and tailored to your business size and goals."
        },
        {
            q: "How can I get started with your digital studio services?",
            a: "You can contact us directly through our website or Google Business Profile. We offer a free consultation to understand your requirements and recommend the right digital strategy."
        }
    ];

    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-red-600/30 overflow-x-hidden pt-24">


<Helmet>
  {/* ================= PRIMARY SEO ================= */}
  <title> Digital Studio in Tamil Nadu | Web Design, SEO & Branding – VGot You</title>

  <meta
    name="description"
    content="VGot You is a full-service digital studio in Tamil Nadu offering web design, SEO, branding, digital marketing, photography, and creative services for businesses across all districts."
  />

  <meta
    name="keywords"
    content="digital studio in tamil nadu, web design tamil nadu, seo services tamil nadu, branding agency tamil nadu, digital marketing tamil nadu, product photoshoot tamil nadu, graphic design studio tamil nadu"
  />

  <meta name="robots" content="index, follow" />
  <meta name="author" content="VGot You" />
  <link
    rel="canonical"
    href="https://www.vgotyou.com/digital-studio-tamil-nadu"
  />

  {/* ================= OPEN GRAPH ================= */}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="VGot You" />
  <meta
    property="og:title"
    content="Digital Studio in Tamil Nadu | VGot You"
  />
  <meta
    property="og:description"
    content="A full-service digital studio in Tamil Nadu delivering web design, SEO, branding, digital marketing, and photography services."
  />
  <meta
    property="og:url"
    content="https://www.vgotyou.com/digital-studio-tamil-nadu"
  />
  <meta
    property="og:image"
    content="https://www.vgotyou.com/assets/vgotyou.png"
  />
  <meta property="og:locale" content="en_IN" />

  {/* ================= TWITTER ================= */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta
    name="twitter:title"
    content="Digital Studio in Tamil Nadu | VGot You"
  />
  <meta
    name="twitter:description"
    content="Web design, SEO, branding, digital marketing & photography services across Tamil Nadu."
  />
  <meta
    name="twitter:image"
    content="https://www.vgotyou.com/assets/vgotyou.png"
  />

  {/* ================= BREADCRUMB SCHEMA ================= */}
  <script type="application/ld+json">
    {JSON.stringify({
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
    })}
  </script>

  {/* ================= FAQ SCHEMA ================= */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What services does your digital studio offer in Tamil Nadu?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer web design, website development, SEO, digital marketing, branding, graphic design, product and site photoshoots, and photo editing services across Tamil Nadu."
          }
        },
        {
          "@type": "Question",
          "name": "Do you work with businesses across all districts of Tamil Nadu?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we work with businesses across all districts including Chennai, Coimbatore, Madurai, Trichy, Salem, Tiruppur, Erode, and Karur."
          }
        },
        {
          "@type": "Question",
          "name": "Is VGot You suitable for startups and small businesses?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we work with startups, MSMEs, manufacturers, exporters, and established businesses, offering scalable digital solutions."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide Google Business Profile and local SEO services?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we provide Google Business Profile optimization and local SEO services to help businesses rank higher across Tamil Nadu."
          }
        }
      ]
    })}
  </script>
</Helmet>


            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 overflow-hidden border-b border-zinc-900">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop" className="w-full h-full object-cover opacity-30" alt="VGot You Digital Studio interior in Karur, Tamil Nadu" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
                
                <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 mb-8 border border-zinc-800 rounded-sm bg-black/50 text-[9px] font-mono tracking-[0.5em] uppercase text-red-600 font-black">
                            // Matrix_Connection: Established
                        </span>
                        <h1 className="text-[12vw] sm:text-[10vw] md:text-[7vw] font-black leading-[0.8] tracking-tighter uppercase mb-8">
                            Digital Studio <br/>
                            <span className="text-zinc-800">Tamil Nadu.</span>
                        </h1>
                        <p className="text-sm md:text-xl text-zinc-500 max-w-3xl mx-auto font-light leading-relaxed uppercase tracking-widest border-t border-zinc-900 pt-8 mt-8">
                            VGot You is a digital studio in Karur, Tamil Nadu, serving businesses in every district with web design, SEO, branding, digital marketing and photography.
                        </p>
                    </m.div>
                </div>
            </section>

            {/* Company Intro / Brief */}
            <section className="py-20 px-6 border-b border-zinc-900 bg-black">
                <div className="container mx-auto max-w-5xl text-center">
                    <m.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-red-600 text-[10px] font-mono font-bold uppercase tracking-[0.4em] mb-6">Briefing_Node: Overview</h2>
                        <p className="text-xl md:text-3xl font-light leading-relaxed text-zinc-300">
                            VGot You is a technical-first digital excellence laboratory. As a leading <Link to="/web-design-karur" className="text-white font-bold underline decoration-red-600 underline-offset-8 hover:text-red-500 transition-colors">web design company in Karur, Tamil Nadu</Link>, we engineer high-performance visual systems and search-grounded infrastructure for the industrial and export sectors.
                        </p>
                    </m.div>
                </div>
            </section>

            {/* Content & Graph Section */}
            <section className="py-24 px-6 relative border-b border-zinc-900 bg-[#050505]">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="max-w-xl">
                            <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-6">Unified Strategy <span className="text-zinc-800">For Modern Growth.</span></h2>
                            <p className="text-lg text-zinc-400 leading-relaxed font-light mb-8">
                                Across Tamil Nadu, from Chennai, Coimbatore and Madurai to Salem, Tiruppur, Trichy and every other district, businesses need a full-service digital studio that understands branding, technology and marketing together.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "Reach", val: "State-Wide" },
                                    { label: "Sync", val: "Full-Stack" },
                                    { label: "Node", val: "Karur_HQ" },
                                    { label: "Auth", val: "Digital_V4" }
                                ].map(s => (
                                    <div key={s.label} className="p-4 border border-zinc-900 bg-black">
                                        <p className="text-[8px] font-mono text-zinc-600 uppercase mb-1">{s.label}</p>
                                        <p className="text-xs font-bold text-white uppercase">{s.val}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <GrowthGraph />
                            <div className="p-6 border border-zinc-900 bg-zinc-950/50 flex justify-between items-center">
                                <span className="text-[10px] font-mono text-zinc-500 uppercase">Algorithmic_Deployment_Status</span>
                                <span className="text-[10px] font-mono text-green-500 uppercase">Active_Optimizing</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2x2 Services Matrix */}
            <section className="py-24 px-6 border-b border-zinc-900">
                <div className="container mx-auto max-w-7xl">
                    <TechnicalHeader label="Service_Quadrant" code="ARCH_2X2_MODE" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
                        {[
                            { title: "Web Architecture", desc: "Fast, mobile-friendly, and SEO-ready platforms.", icon: <CodeBracketIcon className="w-8 h-8" />, path: "/web-design" },
                            { title: "Brand Identity", desc: "Logical visual systems that command authority.", icon: <PenToolIcon className="w-8 h-8" />, path: "/logo-design" },
                            { title: "Search Engineering", desc: "Local SEO & Technical indexing optimization.", icon: <RocketIcon className="w-8 h-8" />, path: "/seo" },
                            { title: "Digital Marketing", desc: "Targeted Paid media and intent-based growth.", icon: <DesktopIcon className="w-8 h-8" />, path: "/marketing" },
                        ].map((s) => (
                            <Link key={s.title} to={s.path} className="group p-12 bg-black hover:bg-zinc-950 transition-all relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 text-[8px] font-mono text-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity">NODE_MODULE_ACCESS</div>
                                <div className="text-zinc-700 group-hover:text-red-600 transition-colors mb-8">{s.icon}</div>
                                <h4 className="text-2xl font-black uppercase tracking-tight text-white group-hover:text-red-500 transition-colors mb-4">{s.title}</h4>
                                <p className="text-zinc-500 text-sm font-light max-w-xs">{s.desc}</p>
                                <div className="mt-8 flex items-center gap-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                                    Initiate_Project <ChevronRightIcon className="w-3 h-3" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industrial Photoshoot Gallery - 2x2 Grid */}
            <section className="py-24 px-6 bg-[#050505] border-b border-zinc-900">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-4">Visual <span className="text-zinc-800">Intelligence.</span></h2>
                            <p className="text-zinc-500 font-light leading-relaxed">High-quality product and site photoshoots engineered for manufacturing and textile industries across Tamil Nadu.</p>
                        </div>
                        <div className="text-right hidden lg:block">
                            <span className="text-[10px] font-mono text-zinc-700 block mb-1">OPTICS_READY</span>
                            <div className="w-32 h-[1px] bg-red-600"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ImageSpecimen 
                            src="https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=1974&auto=format&fit=crop" 
                            title="Product_Specimen_01" 
                            specs={["ISO_100", "F/2.8", "50MM"]} 
                            alt="Professional product photography for Karur textile exporters"
                        />
                        <ImageSpecimen 
                            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
                            title="Factory_Node_02" 
                            specs={["ISO_400", "F/4.0", "24MM"]} 
                            alt="Industrial site photoshoot of a manufacturing plant in Tamil Nadu"
                        />
                        <ImageSpecimen 
                            src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop" 
                            title="Studio_Asset_03" 
                            specs={["ISO_200", "F/1.8", "85MM"]} 
                            alt="VGot You Digital Studio workspace in Karur Tamil Nadu"
                        />
                        <ImageSpecimen 
                            src="https://images.unsplash.com/photo-1600518464441-9154a4dea21b?q=80&w=2070&auto=format&fit=crop" 
                            title="Site_Analysis_04" 
                            specs={["ISO_100", "F/8.0", "16MM"]} 
                            alt="Architectural photoshoot of a real estate project in Chennai"
                        />
                    </div>
                </div>
            </section>

            {/* Serving City Nodes */}
            <section className="py-24 px-6 bg-black border-b border-zinc-900 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-red-600/[0.02] -skew-x-12"></div>
                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">Serving Tamil Nadu <br/><span className="text-zinc-800">& Beyond.</span></h2>
                            <p className="text-zinc-500 font-light mb-10 leading-relaxed uppercase text-sm tracking-wide">
                                We work remotely with clients in all 38 districts of Tamil Nadu, including major hubs like Chennai, Coimbatore, Madurai, Tiruppur, Salem, Trichy, Erode and Karur.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {["Chennai", "Coimbatore", "Karur", "Trichy", "Madurai", "Salem", "Tiruppur", "Erode"].map(city => (
                                    <span key={city} className="px-4 py-2 border border-zinc-900 bg-zinc-950 text-[10px] font-mono text-zinc-400 uppercase tracking-widest hover:border-red-600/30 transition-colors cursor-default">{city}</span>
                                ))}
                            </div>
                        </div>
                        <div className="relative aspect-video border border-zinc-900 p-8 flex items-center justify-center bg-black/50 backdrop-blur-xl">
                             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05)_0%,transparent_70%)]"></div>
                             <div className="text-center">
                                <span className="text-8xl font-black italic text-zinc-900">TN</span>
                                <p className="text-[9px] font-mono text-zinc-700 tracking-[0.5em] uppercase mt-2">State_Connectivity_Layer</p>
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-24 px-6 border-b border-zinc-900 bg-[#020202]">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <TechnicalHeader label="Diagnostics" code="FREQ_QUERY_LOG" />
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Frequent Queries</h2>
                    </div>
                    <div className="space-y-2">
                        {faqs.map((faq, index) => (
                            <AccordionItem 
                                key={index} 
                                id={`faq-${index}`}
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

            {/* CTA */}
            <section className="py-32 px-6 text-center bg-black relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(220,38,38,0.1)_0%,transparent_50%)]"></div>
                <m.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="max-w-4xl mx-auto relative z-10"
                >
                    <div className="text-[10px] font-mono text-red-600 font-bold uppercase tracking-[0.5em] mb-12">Action: Initiate_Deployment</div>
                    <h2 className="text-[12vw] sm:text-[10vw] md:text-[8vw] font-black uppercase leading-[0.8] mb-16 tracking-tighter text-white">
                        Deploy Your <br/>
                        <span className="text-zinc-800">Presence.</span>
                    </h2>
                    <Link
                        to="/contact"
                        className="bg-red-600 text-white px-16 py-6 font-bold text-lg uppercase tracking-[0.3em] shadow-[0_0_50px_rgba(220,38,38,0.3)] hover:bg-red-700 transition-all inline-block rounded-sm active:scale-95"
                    >
                        Contact Studio
                    </Link>
                    <p className="text-[11px] mt-12 text-zinc-600 uppercase tracking-widest">
                        Need a digital studio anywhere in Tamil Nadu? Start from our Karur HQ and remote team coverage across all districts.
                    </p>
                    <div className="mt-16 text-[9px] font-mono text-zinc-700 uppercase tracking-widest">// Monitoring_Signal: Active // Latency: 24ms</div>
                </m.div>
            </section>
        </div>
    );
};

export default DigitalStudio;
