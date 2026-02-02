import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProjectCarousel from '../components/CarouselManual';
import { Helmet } from "react-helmet";   // ✅ SEO

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
      
      <div className="absolute top-4 left-4 text-[8px] font-mono text-zinc-700 uppercase tracking-widest">VGot_You_ANALYSIS: V.4.0</div>
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
      <Helmet>
  {/* ================= BASIC SEO ================= */}
  <title>Website Design Company in Karur, India | Web Design Services – VGot You</title>

  <meta
    name="description"
    content="VGot You is a professional website design company in Karur, India, offering custom, responsive, and SEO-optimized web design services for startups and growing businesses across India and worldwide."
  />

  <meta
    name="keywords"
    content="website design company in karur, web design services india, responsive website design, seo web development, ui ux design company, business website designers, professional web designers, ecommerce website development"
  />

  <link rel="canonical" href="https://www.vgotyou.com/web-design" />
  <meta name="robots" content="index, follow" />

  {/* ================= OPEN GRAPH ================= */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Website Design Company in Karur, India | VGot You" />
  <meta
    property="og:description"
    content="Custom, fast, and SEO-friendly website design services by VGot You, a leading web design company serving Karur and businesses across India."
  />
  <meta property="og:image" content="https://www.vgotyou.com/assets/web-designer.png" />
  <meta property="og:url" content="https://www.vgotyou.com/web-design" />
  <meta property="og:site_name" content="VGot You" />
  <meta property="og:locale" content="en_IN" />

  {/* ================= TWITTER ================= */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Website Design Company in Karur, India | VGot You" />
  <meta
    name="twitter:description"
    content="Professional website design, UI/UX, and SEO services for startups and businesses by VGot You."
  />
  <meta name="twitter:image" content="https://www.vgotyou.com/assets/web-designer.png" />

  {/* ================= SERVICE SCHEMA ================= */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://www.vgotyou.com/web-design#service",
      name: "Website Design Services",
      serviceType: "Web Design & Development",
      url: "https://www.vgotyou.com/web-design",
      description:
        "Professional website design and development services offering responsive, SEO-optimized, and conversion-focused websites for businesses across India and worldwide.",
      provider: {
        "@type": "Organization",
        "@id": "https://www.vgotyou.com/#organization",
        name: "VGot You",
        url: "https://www.vgotyou.com/",
        logo: "https://www.vgotyou.com/assets/vgotyou.png"
      },
      areaServed: {
        "@type": "Place",
        name: "Worldwide"
      }
    })}
  </script>

  {/* ================= BREADCRUMB SCHEMA ================= */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.vgotyou.com/"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Web Design",
          item: "https://www.vgotyou.com/web-design"
        }
      ]
    })}
  </script>
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

      {/* Industrial Hero Section */}
      <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden border-b border-zinc-900">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover grayscale opacity-40">
          <source src="https://www.vgotyou.com/assets/web.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="relative z-10 px-6 max-w-7xl mx-auto text-center mt-12 sm:mt-20">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block px-3 py-1 mb-6 border border-zinc-800 rounded-sm bg-black/50 text-[9px] sm:text-[10px] font-mono tracking-[0.4em] uppercase text-zinc-500">
              Module: Core_Architecture / VGot_You_Phase_02
            </span>
            <h1 className="text-[14vw] sm:text-[10vw] md:text-[8vw] font-black mb-8 tracking-tighter uppercase leading-[0.8]">
              <span className="text-red-800">VGot You:</span> <br/>
              Strategic Web Design.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-zinc-500 max-w-3xl mx-auto font-light leading-relaxed">
              <strong className="text-white font-bold">VGot You</strong> provides <strong className="text-zinc-300">professional web design services</strong> and <strong className="text-zinc-300">e-commerce website development</strong> for brands in <Link to="/web-design-karur" className="text-zinc-400 hover:text-red-600 underline decoration-zinc-800 hover:decoration-red-600 transition-all underline-offset-4">Karur</Link>, <Link to="/web-design-tamil-nadu" className="text-zinc-400 hover:text-red-600 underline decoration-zinc-800 hover:decoration-red-600 transition-all underline-offset-4">Tamil Nadu</Link>, and across <Link to="/web-design-india" className="text-zinc-300 hover:text-red-600 underline decoration-zinc-800 hover:decoration-red-600 transition-all underline-offset-4">India</Link>.
            </p>
          </m.div>
        </div>
        
        <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 sm:gap-4">
          <div className="w-[1px] h-12 sm:h-20 bg-gradient-to-b from-red-600/50 to-transparent"></div>
          <span className="text-[8px] font-mono uppercase tracking-[0.5em] text-zinc-700">Initialize VGot You Diagnostics</span>
        </div>
      </section>
      
      {/* E-commerce Logic Module */}
      <section className="py-20 sm:py-32 px-6 relative border-b border-zinc-900">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16 sm:mb-24 text-center">
            <h2 className="text-[9px] sm:text-[10px] font-mono text-red-600 font-bold uppercase tracking-[0.4em] mb-4">Phase: Conversion_Alpha</h2>
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 sm:mb-6">VGot You E-commerce</h3>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-700 italic uppercase">High-Performance E-commerce Website Development.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-24">
            <DiagnosticStat value="+60%" label="Conversion Increase" delay={0.1} />
            <DiagnosticStat value="2.5x" label="Faster Load Times" delay={0.2} />
            <DiagnosticStat value="-45%" label="Cart Recovery Rate" delay={0.3} />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 sm:gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <TechnicalHeader label="Performance Data" code="VGot_You_BLOCK_01" />
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-8">
                A slow site costs sales. <strong className="text-zinc-300 font-bold">VGot You</strong> delivers <strong className="text-zinc-300">professional web design services</strong> that build lightning-fast, intuitive e-commerce experiences to guide users seamlessly from browsing to buying.
              </p>
              <h4 className="text-xl font-bold mb-6 text-white uppercase tracking-tight">The VGot You Difference</h4>
              <p className="text-zinc-500 mb-8 leading-relaxed">By overhauling platforms with modern, performance-focused technology, the VGot You team achieves significant uplifts in key e-commerce metrics for every client.</p>
              
              <ul className="space-y-4">
                {[
                  "VGot You optimized checkout flows.",
                  "Seamless payment gateway integration.",
                  "Mobile-first design protocol."
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600 group-hover:scale-150 transition-transform"></div>
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

      {/* Mid-page SEO Section */}
      <section className="py-20 px-6 bg-zinc-950 border-b border-zinc-900">
        <div className="container mx-auto max-w-7xl text-center">
           <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">
             The VGot You Web Approach <br/>
             <span className="text-zinc-800">for Karur and Tamil Nadu Businesses</span>
           </h2>
           <p className="text-zinc-500 max-w-4xl mx-auto text-sm md:text-lg leading-relaxed font-light">
             At <strong className="text-zinc-400 font-bold">VGot You</strong>, we understand the local industrial landscape. We provide specialized <strong className="text-zinc-400">B2B website design for manufacturers and exporters</strong> in South India, ensuring your business is ready to compete globally.
           </p>
        </div>
      </section>

      {/* B2B Terminal Module */}
      <section className="py-20 sm:py-32 px-6 bg-[#050505] relative border-b border-zinc-900">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-start sm:items-end justify-between gap-12 mb-16 sm:mb-24">
            <div className="max-w-2xl text-left">
              <h2 className="text-[9px] sm:text-[10px] font-mono text-red-600 font-bold uppercase tracking-[0.4em] mb-4">Phase: Authority_Nodes</h2>
              <h3 className="text-3xl sm:text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4 sm:mb-6">VGot You B2B Portals</h3>
              <p className="text-xl sm:text-2xl font-bold text-zinc-700 italic uppercase">B2B Website Design for Manufacturers and Exporters.</p>
            </div>
            <div className="text-right font-mono text-[10px] text-zinc-600 uppercase tracking-widest leading-loose hidden lg:block border-l border-zinc-800 pl-8">
              // LEAD_GEN: ENABLED <br/>
              // VGot_You_VERIFIED <br/>
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
                <img src={"https://www.vgotyou.com/assets/data.png"} alt="VGot You B2B Website UI" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 font-mono text-[8px] text-red-600 tracking-[0.5em] uppercase">VGot_You_INTERFACE_RENDER</div>
              </div>
            </div>

            <div className="relative">
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-8">
                In the B2B world, your website is your primary tool. <strong className="text-zinc-300 font-bold">VGot You</strong> creates professional, polished, and information-rich websites that establish you as an industry authority and function as a 24/7 lead generation engine.
              </p>
              <h4 className="text-xl font-bold mb-6 text-white uppercase tracking-tight">VGot You Engineering</h4>
              <p className="text-zinc-500 mb-10 leading-relaxed">These results are the direct outcome of a meticulous VGot You development process focused on tangible business outcomes.</p>
              
              <div className="space-y-8">
                {[
                  { t: "VGot You Value Props", d: "We ensure your unique selling points are communicated with absolute clarity." },
                  { t: "Search Authority", d: "VGot You builds a robust SEO foundation into every corporate project." },
                  { t: "Node Integration", d: "Integrated knowledge hubs with case studies and international inquiry portals." }
                ].map((item, i) => (
                  <div key={i} className="group flex gap-4 sm:gap-6">
                    <div className="text-[10px] font-mono text-red-600 font-bold mt-1 opacity-40 group-hover:opacity-100 transition-opacity">0{i+1}</div>
                    <div>
                      <h5 className="font-bold uppercase tracking-widest text-white mb-2 group-hover:text-red-600 transition-colors">{item.t}</h5>
                      <p className="text-zinc-500 text-sm leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Creative Page Grid */}
      <section className="py-20 sm:py-32 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <TechnicalHeader label="VGot You Creative" code="RENDER_MODULE_03" />
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-center uppercase tracking-tighter mb-16 sm:mb-24">VGot You Experiences</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
            {[
              { 
                title: "VGot You Landing Pages", 
                img: "https://www.vgotyou.com/assets/bloomgreen_home.png",
                desc: "Laser-focused landing pages built by VGot You to convert visitors into leads or customers.",
                stat: "300% Boost",
                alt: "VGot You landing page design",
                path: "/blog/from-local-brand-to-online-authority"
              },
              { 
                title: "VGot You Portfolio Sites", 
                img: "https://www.vgotyou.com/assets/arctic.png",
                desc: "Visually-driven, elegant portfolio sites designed by VGot You to tell your unique brand story.",
                stat: "Inquiry Growth",
                alt: "VGot You portfolio website",
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
                    <span className="px-6 py-2 border border-white text-white text-[10px] uppercase tracking-widest font-bold">VGot You Case Study</span>
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

      <section className="py-20 sm:py-32 px-6">
        <div className="container mx-auto max-w-7xl text-center">
          <h2 className="text-[9px] sm:text-[10px] font-mono text-red-600 font-bold uppercase tracking-[0.4em] mb-4">Phase: Logic_Library</h2>
          <h3 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">VGot You Tech Stack</h3>
          <p className="text-zinc-500 max-w-2xl mx-auto mb-16 text-base sm:text-lg font-light italic">"We use a modern, robust technology stack to ensure your VGot You website is fast, secure, and scalable."</p>
          
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center max-w-4xl mx-auto">
            {techStack.map((tech, i) => (
              <m.div 
                key={tech}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-[#080808] border border-zinc-900 rounded-sm font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-zinc-400 hover:text-white hover:border-red-600/50 transition-all cursor-default"
              >
                <span className="text-red-600 mr-2 opacity-50">VGY-0{i+1}</span>
                {tech}
              </m.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-32 sm:py-48 px-6 text-center bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.1)_0%,transparent_70%)]"></div>
        
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <div className="text-[9px] sm:text-[10px] font-mono text-red-600 font-bold uppercase tracking-[0.5em] mb-12">Action: VGot_You_Deployment</div>
          <h2 className="text-[12vw] sm:text-[10vw] md:text-[8vw] font-black uppercase leading-[0.8] mb-16 tracking-tighter">
            Build Your <br/>
            <span className="text-zinc-800">Digital Realm.</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
            <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group w-full sm:w-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-sm blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <Link
                to="/contact"
                className="relative w-full sm:w-auto px-10 sm:px-16 py-5 sm:py-6 bg-red-600 text-white font-bold rounded-sm text-base sm:text-lg uppercase tracking-[0.3em] shadow-[0_0_50px_rgba(220,38,38,0.3)] transition-all flex items-center justify-center"
              >
                Start VGot You Project
              </Link>
            </m.div>
            
            <div className="text-technical text-[9px] sm:text-[10px] text-zinc-600 uppercase tracking-widest text-left hidden sm:block leading-loose border-l border-zinc-800 pl-8">
              // VGot_You_READY <br/>
              // ENGINEER_ASSIGNED <br/>
              // PORT: 8080
            </div>
          </div>
        </m.div>
      </section>

      
    </div>
  );
};

export default WebDesign;