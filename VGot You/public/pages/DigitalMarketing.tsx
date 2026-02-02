import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";   // ✅ SEO

const m = motion as any;

const TechnicalBadge = ({ children, className }: { children?: React.ReactNode, className?: string }) => (
  <span className={`inline-block px-3 py-1 border border-zinc-800 rounded-sm bg-black/50 text-[8px] md:text-[9px] font-mono tracking-[0.4em] uppercase text-zinc-500 ${className}`}>
    {children}
  </span>
);

const DiagnosticStat = ({ value, label, sub }: { value: string; label: string; sub?: string }) => (
  <div className="p-6 md:p-8 border border-zinc-900 bg-black/40 rounded-sm hover:border-red-600/30 transition-all group relative overflow-hidden">
    <div className="absolute top-0 left-0 w-1 h-full bg-red-600/10 group-hover:bg-red-600 transition-all duration-500"></div>
    <div className="text-technical text-[6px] md:text-[7px] text-zinc-700 uppercase mb-3 group-hover:text-red-600 transition-colors">AD_PERFORMANCE_NODE</div>
    <div className="text-3xl md:text-5xl font-black text-white mb-2">{value}</div>
    <div className="text-[9px] md:text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1">{label}</div>
    {sub && <div className="text-[7px] md:text-[8px] font-mono text-zinc-600 uppercase">{sub}</div>}
  </div>
);

const MarketingModule = ({ title, desc, icon, points, code }: { title: string, desc: string, icon: React.ReactNode, points: string[], code: string }) => (
  <m.div 
    whileHover={{ y: -5 }}
    className="p-8 md:p-10 bg-zinc-950 border border-zinc-900 rounded-sm group relative overflow-hidden h-full flex flex-col"
  >
    <div className="absolute top-0 right-0 p-4 md:p-6 opacity-5 group-hover:opacity-10 transition-opacity">
      <div className="text-6xl md:text-8xl font-black">{code.split('-')[1]}</div>
    </div>
    <div className="text-technical text-[7px] md:text-[8px] text-zinc-800 group-hover:text-red-600 mb-6 md:mb-8 block">[{code}]</div>
    <div className="mb-4 md:mb-6 text-red-600 group-hover:scale-110 transition-transform duration-500 origin-left">
      {icon}
    </div>
    <h3 className="text-xl md:text-2xl font-black uppercase mb-3 md:mb-4 text-white group-hover:text-red-500 transition-colors tracking-tighter">{title}</h3>
    <p className="text-zinc-500 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 flex-grow">{desc}</p>
    <ul className="space-y-2 md:space-y-3">
      {points.map((p, i) => (
        <li key={i} className="flex items-center gap-2 md:gap-3 text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-zinc-400">
          <span className="w-1 h-1 bg-red-600 rounded-full"></span>
          {p}
        </li>
      ))}
    </ul>
  </m.div>
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
            <p className="pb-5 md:pb-6 text-zinc-500 text-xs md:text-sm leading-relaxed max-w-3xl font-light">
              {answer}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DigitalMarketing: React.FC = () => {
  return (
    <div className="bg-[#020202] text-white selection:bg-red-600/30 overflow-x-hidden pt-16 md:pt-20">
      <style>{`
        .text-technical { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
        .bg-grid {
          background-image: linear-gradient(to right, #ffffff02 1px, transparent 1px),
                            linear-gradient(to bottom, #ffffff02 1px, transparent 1px);
          background-size: 30px 30px;
        }
        @media (min-width: 768px) {
          .bg-grid { background-size: 50px 50px; }
        }
        @keyframes flow {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        .animate-flow {
          animation: flow 20s linear infinite;
        }
      `}</style>

     <Helmet>
  {/* ================= BASIC SEO ================= */}
  <title>Digital Marketing Company | Online Marketing Services – VGot You</title>

  <meta
    name="description"
    content="VGot You is a professional digital marketing company offering SEO, Google Ads, social media marketing, and lead generation services to help businesses grow online and generate consistent enquiries."
  />

  <meta
    name="keywords"
    content="digital marketing company, online marketing services, internet marketing agency, social media marketing, google ads services, lead generation, performance marketing, content marketing"
  />

  <link rel="canonical" href="https://www.vgotyou.com/digital-marketing" />
  <meta name="robots" content="index, follow" />

  {/* ================= OPEN GRAPH ================= */}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="VGot You" />
  <meta property="og:title" content="Digital Marketing Company | Online Marketing Services – VGot You" />
  <meta
    property="og:description"
    content="Grow your business online with SEO, Google Ads, and social media marketing by VGot You, a results-driven digital marketing agency."
  />
  <meta property="og:image" content="https://www.vgotyou.com/assets/digital-marketing.png" />
  <meta property="og:url" content="https://www.vgotyou.com/digital-marketing" />
  <meta property="og:site_name" content="VGot You" />
  <meta property="og:locale" content="en_IN" />

  {/* ================= TWITTER ================= */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Digital Marketing Company | Online Marketing Services – VGot You" />
  <meta
    name="twitter:description"
    content="Performance-driven digital marketing services including SEO, PPC, and social media marketing by VGot You."
  />
  <meta name="twitter:image" content="https://www.vgotyou.com/assets/digital-marketing.png" />

  {/* ================= SERVICE SCHEMA ================= */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://www.vgotyou.com/digital-marketing#service",
      name: "Digital Marketing Services",
      serviceType: "Online Marketing & Growth Strategy",
      url: "https://www.vgotyou.com/digital-marketing",
      description:
        "Professional digital marketing services including SEO, PPC, social media marketing, and lead generation for businesses.",
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
          name: "Digital Marketing",
          item: "https://www.vgotyou.com/digital-marketing"
        }
      ]
    })}
  </script>
</Helmet>


      {/* Hero: The Growth Engine */}
      <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center border-b border-zinc-900 bg-grid overflow-hidden px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
        
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-red-600/20 rounded-full blur-[80px] md:blur-[160px] animate-pulse"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10 text-center">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <TechnicalBadge className="mb-8 md:mb-10">Protocol: VGot_You_Authority / AD_ENGINE_V4</TechnicalBadge>
            <h1 className="text-[14vw] sm:text-[10vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase mb-8 md:mb-12">
              <span className="text-zinc-800">VGot You:</span> <br/>
              Growth Engineered.
            </h1>
            <p className="text-base md:text-2xl text-zinc-500 font-light leading-relaxed mb-10 md:mb-16 max-w-4xl mx-auto px-4 md:px-0">
              <strong className="text-white font-bold">VGot You</strong> deploys data-driven <strong className="text-zinc-300">Digital Marketing</strong> strategies across <Link to="/web-design-india" className="text-zinc-400 hover:text-red-600 transition-colors underline decoration-zinc-800 underline-offset-4">India</Link>, <Link to="/web-design-tamil-nadu" className="text-zinc-400 hover:text-red-600 transition-colors underline decoration-zinc-800 underline-offset-4">Tamil Nadu</Link>, and <Link to="/web-design-karur" className="text-zinc-400 hover:text-red-600 transition-colors underline decoration-zinc-800 underline-offset-4">Karur</Link> that bridge the gap between high-intent traffic and consistent revenue.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12">
              <Link to="/contact" className="w-full sm:w-auto px-10 md:px-16 py-4 md:px-16 md:py-6 bg-red-600 text-white font-bold rounded-sm text-[10px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.5em] shadow-[0_0_50px_rgba(220,38,38,0.3)] hover:bg-red-500 transition-all hover:scale-105 active:scale-95">
                Scale With VGot You
              </Link>
              <div className="text-technical text-[8px] md:text-[10px] text-zinc-600 uppercase tracking-widest text-left hidden sm:block border-l border-zinc-800 pl-10 leading-loose">
                // VGot_You_ROI_FOCUSED <br/>
                // AD_SPEND_OPTIMIZED <br/>
                // MARKET_NODES: ACTIVE
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 md:py-24 border-b border-zinc-900 bg-black">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <DiagnosticStat value="4.2x" label="Average ROAS" sub="VGot You Optimization" />
            <DiagnosticStat value="-38%" label="CPA Reduction" sub="Efficiency Gain" />
            <DiagnosticStat value="150%" label="Lead Volume" sub="Qualified Inquiries" />
          </div>
        </div>
      </section>

      {/* Core Services: The Modules */}
      <section className="py-20 md:py-32 px-6 relative bg-[#050505] border-b border-zinc-900">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16 md:mb-24 text-left">
            <TechnicalBadge>Capabilities_Register</TechnicalBadge>
            <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter mt-4 md:mt-6 leading-none">The <span className="text-red-600">VGot You</span> <br/><span className="text-zinc-800">Framework.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <MarketingModule 
              code="SYS-01"
              title="Google Ads (PPC)"
              desc="Capturing high-intent users with the VGot You precision bidding methodology. Targeted conversion engines."
              points={["Search & Display", "YouTube Ads", "Remarketing", "Smart Bidding"]}
              icon={<svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.19,4.73C14.76,4.73 16.04,5.7 17.09,6.62L19.27,4.5C17.1,2.7 14.5,1.73 12.19,1.73C6.42,1.73 2.03,6.58 2.03,12C2.03,17.42 6.42,22.27 12.19,22.27C17.96,22.27 22.03,18.33 22.03,12.33C22.03,11.66 21.74,11.1 21.35,11.1Z"/></svg>}
            />
            <MarketingModule 
              code="SYS-02"
              title="Meta Ads"
              desc="Building brand desire through immersive visual storytelling curated by VGot You designers. Scaling D2C reach."
              points={["Audience Slicing", "Creative Strategy", "Conversion APIs", "Pixel Tracking"]}
              icon={<svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3l-.5 3H13v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>}
            />
            <MarketingModule 
              code="SYS-03"
              title="Content Growth"
              desc="VGot You SEO-optimized content engines that build permanent organic authority and reduce media spend."
              points={["Keyword Research", "Strategic Blogs", "Technical SEO", "Link Building"]}
              icon={<svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" /><path strokeLinecap="round" strokeLinejoin="round" d="M14 4v4h4" /><path strokeLinecap="round" strokeLinejoin="round" d="M7 12h10" /><path strokeLinecap="round" strokeLinejoin="round" d="M7 16h10" /></svg>}
            />
          </div>
        </div>
      </section>

      {/* The Strategy: How We Scale */}
      <section className="py-20 md:py-32 px-6 border-b border-zinc-900 bg-black overflow-hidden relative">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative aspect-video border border-zinc-900 bg-zinc-950 p-3 md:p-4 rounded-sm group overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent z-10"></div>
                <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-40 group-hover:opacity-90" alt="Engineered Growth Strategy" />
                <div className="absolute bottom-4 left-4 right-4 md:bottom-10 md:left-10 md:right-10 bg-black/90 backdrop-blur-lg border border-zinc-800 p-4 md:p-6 z-20">
                   <div className="flex justify-between items-center mb-3 md:mb-4">
                     <span className="text-technical text-[6px] md:text-[8px] text-zinc-500 uppercase tracking-widest">VGot_You_Architecture_Status</span>
                     <span className="text-red-600 text-[8px] md:text-[10px] font-bold">OPTIMIZED</span>
                   </div>
                   <div className="space-y-2 md:space-y-3">
                     {[94, 72, 88].map((w, i) => (
                       <div key={i} className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                         <m.div initial={{ width: 0 }} whileInView={{ width: `${w}%` }} transition={{ duration: 1.5, delay: i * 0.2 }} className="h-full bg-red-600"></m.div>
                       </div>
                     ))}
                   </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <TechnicalBadge>Operational_Methodology</TechnicalBadge>
              <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-6 md:mb-8 mt-4 md:mt-6">VGot You: <br/><span className="text-zinc-800">Data Over Intuition.</span></h2>
              <p className="text-zinc-500 text-sm md:text-lg leading-relaxed mb-8 md:mb-10">
                At <strong className="text-zinc-300 font-bold">VGot You</strong>, digital marketing is a science of incremental improvements. We don't guess; we test. Every campaign is a feedback loop designed to lower costs and increase conversion efficiency.
              </p>
              
              <div className="space-y-5 md:space-y-6">
                {[
                  { t: "Deep Technical Audit", d: "VGot You examines your current pixel health, tracking accuracy, and funnel leakage." },
                  { t: "Creative Resonance", d: "Developing ad visuals that stop the scroll and speak directly to user pain points." },
                  { t: "Aggressive Optimization", d: "Weekly bid adjustments and creative refreshes by the VGot You team." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 md:gap-6 group">
                    <div className="text-technical text-[10px] md:text-xs font-bold text-red-600 opacity-40 group-hover:opacity-100 transition-opacity mt-1">0{i+1}</div>
                    <div>
                      <h4 className="font-bold text-white uppercase text-xs md:text-sm tracking-widest mb-1">{step.t}</h4>
                      <p className="text-zinc-600 text-[10px] md:text-xs leading-relaxed">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Ecosystem Synergy */}
      <section className="py-20 md:py-32 px-6 bg-[#050505] border-b border-zinc-900">
        <div className="container mx-auto max-w-7xl">
           <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 border border-zinc-800 p-8 md:p-12 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 hidden sm:block">
                <svg width="200" height="200" viewBox="0 0 100 100"><rect width="80" height="80" x="10" y="10" stroke="white" strokeWidth="0.1" fill="none" /></svg>
              </div>
              <div className="relative z-10 text-center md:text-left">
                 <TechnicalBadge className="mb-4">Ecosystem_Integration</TechnicalBadge>
                 <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4"><span className="text-red-600">VGot You:</span> The Complete Funnel.</h2>
                 <p className="text-zinc-500 text-xs md:text-sm leading-relaxed max-w-xl">
                    <strong className="text-zinc-400 font-bold">VGot You’s</strong> paid ads capture immediate traffic, but high-converting <Link to="/web-design" className="text-zinc-300 hover:text-red-500 underline decoration-zinc-800">web design</Link> and long-term <Link to="/seo-services" className="text-zinc-300 hover:text-red-500 underline decoration-zinc-800">SEO services</Link> turn that traffic into permanent business equity.
                 </p>
              </div>
              <div className="flex flex-col gap-4 relative z-10 w-full md:w-auto">
                 <Link to="/web-design" className="group flex items-center justify-between gap-6 px-6 py-3 border border-zinc-800 hover:border-red-600/40 transition-all text-technical text-[10px] uppercase tracking-widest">
                    VGot_You_Architecture
                    <span className="text-red-600 group-hover:translate-x-1 transition-transform">→</span>
                 </Link>
                 <Link to="/seo-services" className="group flex items-center justify-between gap-6 px-6 py-3 border border-zinc-800 hover:border-red-600/40 transition-all text-technical text-[10px] uppercase tracking-widest">
                    VGot_You_Search_Dominance
                    <span className="text-red-600 group-hover:translate-x-1 transition-transform">→</span>
                 </Link>
              </div>
           </div>
        </div>
      </section>

      {/* Domain Logic: Who We Serve */}
      <section className="py-20 md:py-24 px-6 border-b border-zinc-900 bg-zinc-950/20">
        <div className="container mx-auto max-w-7xl text-center">
          <TechnicalBadge className="mb-6 md:mb-8">Market_Targeting</TechnicalBadge>
          <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-10 md:mb-12"><span className="text-red-600">VGot You:</span> Performance for Leaders.</h2>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {["Textile Exporters", "Real Estate Groups", "D2C E-commerce", "Industrial B2B", "Service Agencies", "Luxury Brands"].map((market) => (
              <m.div key={market} whileHover={{ scale: 1.05 }} className="px-5 py-3 md:px-8 md:py-4 border border-zinc-900 bg-black text-technical text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-zinc-500 hover:text-red-500 hover:border-red-600/30 transition-all cursor-default">
                {market}
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24 px-6 relative bg-black border-b border-zinc-900">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 md:mb-16">
            <TechnicalBadge>Diagnostic_QA</TechnicalBadge>
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-4 mt-4">VGot You Marketing FAQ</h2>
          </div>
          
          <div className="space-y-1">
            <FAQItem 
              question="What is the minimum ad spend required?" 
              answer="At VGot You, we recommend a minimum daily ad spend of ₹1,000 for local campaigns and ₹3,000+ for national/international campaigns to ensure we have enough data to optimize effectively. Our management fee is separate from the ad spend."
            />
            <FAQItem 
              question="How long until we see positive ROI?" 
              answer="For Google Ads managed by VGot You, results are often visible within 7-14 days. Meta Ads typically require a 2-4 week learning phase for the algorithm to properly identify your target audience. Scaling usually happens after the first 30 days of data collection."
            />
            <FAQItem 
              question="Do you handle creative (images/videos) for the ads?" 
              answer="Yes. VGot You provides creative direction and design services for all ad sets. High-converting creative is 70% of the success in modern digital marketing, so we take this phase very seriously."
            />
            <FAQItem 
              question="How do you report the performance?" 
              answer="VGot You provides real-time dashboard access plus detailed monthly reports covering ROAS (Return on Ad Spend), CPA (Cost Per Acquisition), and Lead Quality metrics."
            />
          </div>
        </div>
      </section>

      {/* CTA: Final Deployment */}
      <section className="py-24 md:py-48 px-6 text-center bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.1)_0%,transparent_70%)] opacity-50 animate-flow"></div>
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto relative z-10"
        >
          <div className="text-technical text-[8px] md:text-[10px] text-red-600 font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] mb-10 md:mb-12">Action_Matrix: VGot_You_Scale_Request</div>
          <h2 className="text-[12vw] sm:text-[10vw] md:text-[8.5vw] font-black uppercase leading-[0.8] mb-12 md:mb-16 tracking-tighter">
            Ready to <br/>
            <span className="text-zinc-800">Dominat_e.</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-10">
            <Link to="/contact" className="relative w-full sm:w-auto px-10 md:px-16 py-5 md:py-6 bg-red-600 text-white font-bold rounded-sm text-xs md:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em] shadow-[0_0_60px_rgba(220,38,38,0.4)] hover:scale-105 transition-all">
              Initialize VGot You Strategy
            </Link>
            <p className="text-technical text-[8px] md:text-[9px] text-zinc-600 uppercase tracking-widest text-left hidden sm:block border-l border-zinc-800 pl-10 leading-loose">
              // VGot_You_LOGIC_ACTIVE <br/>
              // PERFORMANCE_GUARANTEED <br/>
              // TERMINAL: ACTIVE_04
            </p>
          </div>
        </m.div>
      </section>
    </div>
  );
};

export default DigitalMarketing;