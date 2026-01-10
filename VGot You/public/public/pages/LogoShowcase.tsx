import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BulbIcon, PenToolIcon, RocketIcon, SparklesIcon } from '../components/Icons';
import { Helmet } from "react-helmet";   // ✅ SEO

// Enhanced Logo Assets with Technical Metadata
const logos = [
  { id: 1, src: "https://www.vgotyou.com/assets/arctictextiles.png", title: "Arctic Textiles", category: "Geometric", specs: { geometry: "Euclidean", complexity: "2.4", ratio: "1:1.618" } },
  { id: 2, src: "https://www.vgotyou.com/assets/rudhraaexim.png", title: "Rudhraa Exports and Imports", category: "Organic", specs: { geometry: "Fibonacci", complexity: "1.8", ratio: "1:1" } },
  { id: 3, src: "https://www.vgotyou.com/assets/bloomgreen.png", title: "BloomGreen Developers", category: "Abstract", specs: { geometry: "Dynamic", complexity: "3.1", ratio: "4:3" } },
  { id: 4, src: "https://www.vgotyou.com/assets/akshaya.png", title: "Akshaya Tours And Travels", category: "Minimalist", specs: { geometry: "Linear", complexity: "1.2", ratio: "16:9" } },
  { id: 5, src: "https://www.vgotyou.com/assets/pixel.png", title: "Pixels", category: "Luxury", specs: { geometry: "Symmetrical", complexity: "4.0", ratio: "1:1" } },
  ];

const DiagnosticOverlay = ({ isActive }: { isActive: boolean }) => (
  <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${isActive ? 'opacity-40' : 'opacity-0'}`}>
    <div className="absolute top-0 left-0 w-full h-[1px] bg-red-600/50 animate-scan"></div>
    <div className="absolute top-0 left-0 w-[1px] h-full bg-red-600/20"></div>
    <div className="absolute top-0 right-0 w-[1px] h-full bg-red-600/20"></div>
    <div className="absolute top-1/2 left-0 w-full h-[1px] border-t border-dashed border-red-600/10"></div>
    <div className="absolute top-0 left-1/2 w-[1px] h-full border-l border-dashed border-red-600/10"></div>
    {/* Geometric markers */}
    <div className="absolute top-4 left-4 w-2 h-2 border border-red-600"></div>
    <div className="absolute top-4 right-4 w-2 h-2 border border-red-600"></div>
    <div className="absolute bottom-4 left-4 w-2 h-2 border border-red-600"></div>
    <div className="absolute bottom-4 right-4 w-2 h-2 border border-red-600"></div>
  </div>
);

const LogoDesign: React.FC = () => {
  const [activeLogo, setActiveLogo] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const scrollToArchive = () => {
    document.getElementById('specimen-lab')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Professional WhatsApp message with context
  const whatsappMessage = encodeURIComponent("Hello VGot You! I've been exploring the Kinetic Identity Lab and I'm very impressed with your logo work. I'd like to request more details and a quote for a custom brand identity project. Let's connect!");

  return (
    <div className="bg-[#020202] text-white selection:bg-red-600/30 overflow-x-hidden font-sans">
      

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
      <Helmet>
  {/* ================= BASIC SEO ================= */}
  <title>Logo Design Portfolio | Creative Branding by VGot You</title>

  <meta
    name="description"
    content="Explore the logo design portfolio of VGot You. Discover creative, professional, and custom logo designs crafted to build strong brand identities."
  />

  <link rel="canonical" href="https://www.vgotyou.com/logo-showcase" />
  <meta name="robots" content="index, follow" />

  {/* ================= OPEN GRAPH ================= */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Logo Design Portfolio | VGot You" />
  <meta
    property="og:description"
    content="Browse professional logo designs and branding work created by VGot You."
  />
  <meta
    property="og:image"
    content="https://www.vgotyou.com/assets/logo-designer.png"
  />
  <meta property="og:url" content="https://www.vgotyou.com/logo-showcase" />
  <meta property="og:site_name" content="VGot You" />
  <meta property="og:locale" content="en_IN" />

  {/* ================= TWITTER ================= */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Logo Design Portfolio | VGot You" />
  <meta
    name="twitter:description"
    content="Creative logo design and branding portfolio by VGot You."
  />
  <meta
    name="twitter:image"
    content="https://www.vgotyou.com/assets/logo-designer.png"
  />

  {/* ================= COLLECTION PAGE SCHEMA ================= */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://www.vgotyou.com/logo-showcase#collection",
      name: "Logo Design Portfolio",
      url: "https://www.vgotyou.com/logo-showcase",
      description:
        "A curated collection of professional logo designs and branding projects by VGot You.",
      isPartOf: {
        "@type": "Organization",
        name: "VGot You",
        url: "https://www.vgotyou.com"
      },
      about: {
        "@type": "Service",
        name: "Logo Design & Branding",
        provider: {
          "@type": "LocalBusiness",
          name: "VGot You",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Karur",
            addressRegion: "Tamil Nadu",
            addressCountry: "IN"
          }
        }
      }
    })}
  </script>
</Helmet>

      {/* Industrial Hero */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden border-b border-zinc-900">
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.05)_0%,transparent_70%)]"></div>
          {/* Technical Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse:60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            className="mb-8 p-4 border border-red-600/30 rounded-sm bg-red-600/5 text-technical text-[10px] tracking-[0.4em] uppercase text-red-500"
          >
            Laboratory Phase: Visual Forging 01
          </motion.div>

          <h1 className="text-[12vw] md:text-[10vw] font-black leading-[0.75] tracking-tighter uppercase mb-12 text-center">
            Forge <br/>
            <span className="text-zinc-800">Identity</span>
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-24 w-full max-w-4xl mt-12 border-t border-zinc-900 pt-12">
            {[
              { label: "Core Geometry", val: "Vector" },
              { label: "Design Depth", val: "N-Dim" },
              { label: "Studio Hub", val: "VGOT" },
              { label: "Process", val: "Kinetic" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center md:items-start">
                <span className="text-technical text-[8px] uppercase tracking-widest text-zinc-600 mb-1">{stat.label}</span>
                <span className="text-xl font-bold uppercase tracking-tighter">{stat.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnostic Scroll Button */}
        <motion.button 
          onClick={scrollToArchive}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 flex flex-col items-center gap-4 group cursor-pointer"
          aria-label="Scroll to archive"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-red-600 to-transparent group-hover:from-red-400 transition-colors"></div>
          <span className="text-technical text-[8px] uppercase tracking-[0.5em] text-red-500 group-hover:text-red-400">Initiate Analysis</span>
        </motion.button>
      </section>

      {/* The Specimen Lab (Gallery) */}
      <section id="specimen-lab" className="py-24 px-4 md:px-12 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-technical text-red-600 text-xs font-bold uppercase tracking-[0.3em] mb-4">Diagnostic Archive</h2>
              <p className="text-3xl md:text-5xl font-bold tracking-tight">Examination of <span className="italic text-zinc-500">Singular Marks.</span></p>
            </div>
            <div className="text-technical text-[10px] text-zinc-600 uppercase tracking-widest leading-relaxed text-right md:text-right hidden sm:block">
              [Status: Online] <br/>
              [Encrypted: True] <br/>
              [Scale: Multi-Node]
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {logos.map((logo, index) => (
              <motion.div
                key={logo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: (index % 3) * 0.1 }}
                onMouseEnter={() => setActiveLogo(logo.id)}
                onMouseLeave={() => setActiveLogo(null)}
                className="group relative flex flex-col"
              >
                {/* Header Metadata */}
                <div className="flex justify-between items-center mb-4 px-2 text-technical text-[9px] text-zinc-500 uppercase tracking-widest">
                  <span>REF_ID: 00{logo.id}</span>
                  <span className="text-red-600 font-bold">{logo.category}</span>
                </div>

                {/* Main Visual Container */}
                <div className="relative aspect-square bg-[#080808] border border-zinc-900 rounded-lg overflow-hidden transition-all duration-700 group-hover:border-red-600/40">
                  <DiagnosticOverlay isActive={activeLogo === logo.id} />
                  
                  <img
                    src={logo.src}
                    alt={logo.title}
                    className="w-full h-full object-contain p-12 transition-all duration-1000 group-hover:scale-105 filter grayscale contrast-125 group-hover:grayscale-0"
                  />

                  {/* Corner Coordinates */}
                  <div className="absolute top-4 left-4 text-technical text-[8px] text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity">LAT_X: 42.8</div>
                  <div className="absolute bottom-4 right-4 text-technical text-[8px] text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity">LNG_Y: -71.2</div>
                </div>

                {/* Footer Data */}
                <div className="mt-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold uppercase tracking-tight mb-2">{logo.title}</h3>
                    <div className="flex gap-4">
                      {Object.entries(logo.specs).map(([key, val]) => (
                        <div key={key}>
                          <p className="text-technical text-[7px] text-zinc-600 uppercase mb-1">{key}</p>
                          <p className="text-technical text-[9px] font-bold text-zinc-300">{val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link 
                    to="/contact"
                    className="w-10 h-10 border border-zinc-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-300"
                    title="Inquire about this project"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Methodology Lab (Process) */}
      <section className="py-40 bg-[#050505] border-y border-zinc-900 overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="absolute -top-24 -left-12 text-[15vw] font-black text-zinc-900/50 pointer-events-none select-none">SYSTEM</div>
              <h2 className="text-5xl md:text-8xl font-black uppercase leading-[0.85] mb-12 relative z-10">
                The <span className="text-red-600">Forge</span> <br/>
                Logic.
              </h2>
              <p className="text-zinc-500 text-lg md:text-xl leading-relaxed mb-12 max-w-lg">
                We treat identity as an engineering challenge. Our marks are stress-tested across resolutions, mediums, and emotional contexts to ensure permanent resonance.
              </p>
              
              <Link to="/contact" className="group flex items-center gap-4 text-technical text-xs font-bold uppercase tracking-[0.3em] hover:text-red-600 transition-colors">
                Initiate Project Phase
                <span className="w-12 h-[1px] bg-zinc-800 group-hover:bg-red-600 transition-all group-hover:w-20"></span>
              </Link>
            </div>

            <div className="grid gap-4">
              {[
                { title: "Geometric Purity", icon: <PenToolIcon className="w-6 h-6" />, desc: "Every curve is calculated using non-linear math." },
                { title: "Stress Legibility", icon: <BulbIcon className="w-6 h-6" />, desc: "Tested at 16px to ensure total recognition." },
                { title: "Brand DNA", icon: <SparklesIcon className="w-6 h-6" />, desc: "Extracting the core ethos into static form." },
                { title: "Vector Permanence", icon: <RocketIcon className="w-6 h-6" />, desc: "Indefinitely scalable digital assets." }
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 10 }}
                  className="p-8 bg-[#020202] border border-zinc-900 rounded-lg group transition-colors hover:border-red-600/30 flex items-center gap-8"
                >
                  <div className="w-14 h-14 bg-zinc-950 rounded-md flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500 shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-technical text-sm font-bold uppercase tracking-widest mb-2">{step.title}</h3>
                    <p className="text-zinc-500 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Diagnostic Finalization (CTA) */}
      <section className="py-48 px-6 text-center bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(220,38,38,0.1)_0%,transparent_50%)]"></div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <div className="text-technical text-xs text-red-600 font-bold uppercase tracking-[0.5em] mb-12">System Output: Signature Needed</div>
          <h2 className="text-6xl md:text-9xl font-black uppercase leading-[0.8] mb-16 tracking-tighter">
            Build Your <br/>
            <span className="text-zinc-800">Legacy.</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-sm blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <a 
                  href={`https://wa.me/917871120415?text=${whatsappMessage}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative px-16 py-6 bg-red-600 text-white font-bold rounded-sm text-lg uppercase tracking-[0.3em] shadow-[0_0_50px_rgba(220,38,38,0.3)] transition-all flex items-center justify-center"
              >
                  Launch Lab
              </a>
            </motion.div>
            
            <div className="text-technical text-[10px] text-zinc-500 uppercase tracking-widest text-left hidden sm:block leading-loose">
              // READY FOR DEPLOYMENT <br/>
              // WAITING FOR SIGNAL <br/>
              // PORT: 8080
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default LogoDesign;