
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
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="relative group p-6 border border-zinc-900 bg-[#050505] rounded-sm overflow-hidden transform-gpu"
  >
    <div className="absolute top-0 left-0 w-full h-[1px] bg-red-600/20 group-hover:bg-red-600/50 transition-colors"></div>
    <p className="text-4xl lg:text-5xl font-black text-white tracking-tighter mb-2 group-hover:text-red-600 transition-colors">{value}</p>
    <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">{label}</p>
  </m.div>
);

const PerformanceHUD: React.FC<{ data: { label: string, value: number, color: string }[] }> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.value)) * 1.2;

  return (
    <div className="relative p-4 sm:p-8 border border-zinc-900 bg-black rounded-sm overflow-hidden aspect-[4/5] sm:aspect-video md:aspect-square lg:aspect-video min-h-[350px] sm:min-h-[400px] flex items-center justify-center transform-gpu">
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
                transition={{ duration: 1, ease: "easeOut", delay: idx * 0.1 }}
                className="w-full max-w-[30px] sm:max-w-[40px] rounded-t-sm relative shadow-xl"
                style={{ backgroundColor: item.color }}
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-white/20"></div>
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
      
      <div className="absolute top-4 left-4 text-[8px] font-mono text-zinc-700 uppercase tracking-widest">SYS_ANALYSIS: V.4.0</div>
      <div className="absolute bottom-4 right-4 text-[8px] font-mono text-zinc-700 uppercase tracking-widest">OPTIMIZATION: ACTIVE</div>
    </div>
  );
};

const WebDesign: React.FC = () => {
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
  <title>Website Design Company in Karur, India | Web Design Services by VGot You</title>

  <meta
    name="description"
    content="VGot You is a professional website design company in Karur, India, offering custom, responsive, and SEO-optimized web design services for startups and businesses across India and worldwide."
  />

  <meta
    name="keywords"
    content="website design company in Karur, web design services India, responsive website design, SEO web development, UI UX design company, business website designers, VGot You web design"
  />

  <link rel="canonical" href="https://www.vgotyou.com/web-design" />
  <meta name="robots" content="index, follow" />

  {/* ================= OPEN GRAPH ================= */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Website Design Company in Karur | VGot You" />
  <meta
    property="og:description"
    content="Custom, fast, and SEO-friendly website design services by VGot You, a leading web design company in Karur, Tamil Nadu."
  />
  <meta property="og:image" content="https://www.vgotyou.com/assets/web-designer.png" />
  <meta property="og:url" content="https://www.vgotyou.com/web-design" />
  <meta property="og:site_name" content="VGot You" />
  <meta property="og:locale" content="en_IN" />

  {/* ================= TWITTER ================= */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Website Design Company in Karur | VGot You" />
  <meta
    name="twitter:description"
    content="High-performance website design, UI/UX, and SEO services for business growth by VGot You."
  />
  <meta name="twitter:image" content="https://www.vgotyou.com/assets/web-designer.png" />

  {/* ================= SERVICE + LOCAL BUSINESS SCHEMA ================= */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://www.vgotyou.com/web-design#service",
      name: "Website Design Services",
      serviceType: "Web Design & Development",
      url: "https://www.vgotyou.com/web-design",
      description:
        "Professional website design and development services offering responsive, SEO-optimized, and conversion-focused websites for businesses in Karur and across India.",
      provider: {
        "@type": "LocalBusiness",
        "@id": "https://www.vgotyou.com/#localbusiness",
        name: "VGot You",
        url: "https://www.vgotyou.com/",
        logo: "https://www.vgotyou.com/assets/vgotyou.png",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Karur",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN"
        }
      },
      areaServed: ["India", "Worldwide"],
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: "4999",
        availability: "https://schema.org/InStock",
        url: "https://www.vgotyou.com/web-design"
      }
    })}
  </script>
</Helmet>

      <style>{`
        .text-technical { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
      `}</style>
      
      {/* Industrial Hero Section - Optimized LCP */}
      <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden border-b border-zinc-900 transform-gpu">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          {...({ fetchPriority: "high" } as any)}
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-30"
        >
          <source src="https://www.vgotyou.com/assets/web.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="relative z-10 px-6 max-w-7xl mx-auto text-center mt-12 sm:mt-20">
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 mb-6 border border-zinc-800 rounded-sm bg-black/50 text-[9px] sm:text-[10px] font-mono tracking-[0.4em] uppercase text-zinc-500">
              Module: Core_Architecture
            </span>
            <h1 className="text-[14vw] sm:text-[10vw] md:text-[8vw] font-black mb-8 tracking-tighter uppercase leading-[0.8]">
               Data-Driven  <br/>
              <span className="text-zinc-800">Web Design</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-zinc-500 max-w-3xl mx-auto font-light leading-relaxed">
              We are a professional <strong>web design company in Karur, Tamil Nadu</strong> providing 
<strong>custom website design, SEO services, e-commerce development, and B2B web solutions</strong> 
for startups, manufacturers, exporters, and growing businesses across India.
            </p>
          </m.div>
        </div>
      </section>
      
      {/* E-commerce Logic Module */}
      <section className="py-20 sm:py-32 px-6 relative border-b border-zinc-900">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16 sm:mb-24 text-center">
            <h2 className="text-[9px] sm:text-[10px] font-mono text-red-600 font-bold uppercase tracking-[0.4em] mb-4">Phase: Conversion_Alpha</h2>
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 sm:mb-6">E-commerce Website Design in Tamil Nadu</h3>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-700 italic uppercase">Turn Clicks into Customers.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-24">
            <DiagnosticStat value="+60%" label="Increase in Conversion Rate" delay={0.1} />
            <DiagnosticStat value="2.5x" label="Faster Page Load Times" delay={0.15} />
            <DiagnosticStat value="-45%" label="Reduction in Cart Abandonment" delay={0.2} />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 sm:gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <TechnicalHeader label="Performance Data" code="ANALYSIS_BLOCK_01" />
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-8 font-light">
                A slow, clunky site doesn't just frustrate users; it actively costs you sales. We build lightning-fast, intuitive e-commerce experiences that guide users seamlessly from browsing to buying.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Optimized, multi-step checkout flows.",
                  "Seamless integration with payment gateways.",
                  "Mobile-first design for shopping on the go."
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
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

      {/* B2B Terminal Module */}
      <section className="py-20 sm:py-32 px-6 bg-[#050505] relative border-b border-zinc-900">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-start sm:items-end justify-between gap-12 mb-16 sm:mb-24">
            <div className="max-w-2xl text-left">
              <h2 className="text-[9px] sm:text-[10px] font-mono text-red-600 font-bold uppercase tracking-[0.4em] mb-4">Phase: Authority_Nodes</h2>
              <h3 className="text-3xl sm:text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4 sm:mb-6">B2B Website Design Company in Tamil Nadu</h3>
              <p className="text-xl sm:text-2xl font-bold text-zinc-700 italic uppercase">Your Digital Headquarters.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 sm:gap-20 items-center">
            <div className="relative group">
              <div className="relative aspect-video rounded-sm overflow-hidden border border-zinc-800 transition-all duration-500 group-hover:border-red-600/30">
                <img 
                  src={"https://www.vgotyou.com/assets/data.png"} 
                  fetchPriority="high"
                  alt="B2B website design by VGot You in Karur Tamil Nadu" 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </div>

            <div className="relative">
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-8 font-light">
                In the B2B world, your website is your primary tool for building credibility and generating leads. We create professional, polished, and information-rich websites that establish you as an industry authority.
              </p>
              
              <div className="space-y-6">
                {[
                  { t: "Clear Value Propositions", d: "We ensure your unique selling points are communicated with absolute clarity." },
                  { t: "Targeted SEO Optimization", d: "From site architecture to content strategy, we build a robust SEO foundation." },
                  { t: "Resource Center Integration", d: "Integrated knowledge hubs with case studies and technical articles." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-[10px] font-mono text-red-600 font-bold mt-1 opacity-50">0{i+1}</div>
                    <div>
                      <h5 className="font-bold uppercase tracking-widest text-white mb-1 group-hover:text-red-600 transition-colors">{item.t}</h5>
                      <p className="text-zinc-500 text-sm leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Creative Page Grid - Linked to Blogs as requested */}
      <section className="py-20 sm:py-32 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <TechnicalHeader label="Creative Architecture" code="RENDER_MODULE_03" />
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-center uppercase tracking-tighter mb-16 sm:mb-24">Focused & Creative Pages</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
            {[
              { 
                title: "Landing Pages", 
                img: "https://www.vgotyou.com/assets/bloomgreen_home.png",
                desc: "Focused landing pages with a single objective: to convert visitors into customers.",
                slug: "from-local-brand-to-online-authority"
              },
              { 
                title: "Portfolio Sites", 
                img: "https://www.vgotyou.com/assets/arctic.png",
                desc: "Visually-driven portfolio sites that tell your story and let your talent shine.",
                slug: "beyond-the-logo-strategic-branding"
              }
            ].map((card, i) => (
              <m.div 
                key={i}
                className="bg-[#080808] border border-zinc-900 rounded-sm p-6 sm:p-8 group relative transform-gpu"
              >
                <Link to={`/blog/${card.slug}`} className="block">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white uppercase tracking-tight group-hover:text-red-600 transition-colors">{card.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-8 font-light">{card.desc}</p>
                    <div className="relative aspect-video overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-500 border border-zinc-800">
                      <img src={card.img} loading="lazy" alt={card.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-technical text-[10px] font-bold uppercase tracking-[0.2em] text-white border border-white/20 px-4 py-2 bg-black/60">View Case_Study</span>
                      </div>
                    </div>
                </Link>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      <div className="py-16 sm:py-24 border-y border-zinc-900 bg-[#050505] transform-gpu">
        <ProjectCarousel />
      </div>

      <section className="py-32 sm:py-48 px-6 text-center bg-black relative transform-gpu">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.05)_0%,transparent_70%)]"></div>
        
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <div className="text-[9px] sm:text-[10px] font-mono text-red-600 font-bold uppercase tracking-[0.5em] mb-12">Action: Initiate_Deployment</div>
          <h2 className="text-[12vw] sm:text-[10vw] md:text-[8vw] font-black uppercase leading-[0.8] mb-16 tracking-tighter">
            Build Your <br/>
            <span className="text-zinc-800">Digital Realm.</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
            <Link
              to="/contact"
              className="relative w-full sm:w-auto px-10 sm:px-16 py-5 sm:py-6 bg-red-600 text-white font-bold rounded-sm text-base sm:text-lg uppercase tracking-[0.3em] shadow-lg transition-all flex items-center justify-center hover:bg-red-700"
            >
              Start Web Project
            </Link>
          </div>
        </m.div>
      </section>
    </div>
  );
};

export default WebDesign;
