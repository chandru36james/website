import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
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

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-900 group">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-red-500 transition-colors"
      >
        <span className="text-sm md:text-base font-bold uppercase tracking-tight">{question}</span>
        <span className={`text-red-600 transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
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
            <p className="pb-6 text-zinc-500 text-sm leading-relaxed max-w-3xl">
              {answer}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CityPill = ({ name }: { name: string }) => (
  <m.div 
    whileHover={{ scale: 1.05, borderColor: '#dc2626' }}
    className="px-4 py-2 border border-zinc-800 bg-zinc-950/50 rounded-sm text-technical text-[10px] uppercase tracking-widest text-zinc-400 hover:text-white transition-all cursor-default whitespace-nowrap"
  >
    {name}
  </m.div>
);

const WebDesignTN: React.FC = () => {
  const cities = [
    "Chennai", "Coimbatore", "Madurai", "Trichy", "Salem", "Tiruppur", "Erode", "Karur", 
    "Vellore", "Thanjavur", "Tirunelveli", "Thoothukudi", "Dindigul", "Hosur", "Nagercoil", 
    "Kanchipuram", "Chengalpattu", "Cuddalore", "Villupuram"
  ];

  const regionalTestimonials = [
    { name: "Murali", city: "Karur", text: "VGot You transformed our textile exports remotely. Their process is seamless.", business: "Textile Export House" },
    { name: "Karthik", city: "Coimbatore", text: "The best online developer in TN. Communication was perfect throughout the project.", business: "Manufacturing Hub" },
    { name: "Priya", city: "Chennai", text: "Strategic SEO that delivered results without needing an in-person meeting.", business: "Tech Startup" }
  ];

  const services = [
    {
      title: "Business Website Design",
      desc: "High-end corporate website development for industries looking to build global authority through a digital-first approach.",
      icon: "🏢",
      code: "CORP-TN"
    },
    {
      title: "E-commerce Development",
      desc: "Scalable online stores with remote setup and integration, optimized for the South Indian retail sector.",
      icon: "🛒",
      code: "ECOMM-X"
    },
    {
      title: "SEO Mastery",
      desc: "Strategic search engine optimization to help your brand rank at the top of national and regional searches.",
      icon: "🚀",
      code: "SEO-MAX"
    },
    {
      title: "Custom UI/UX Engineering",
      desc: "Digital interface designs crafted for maximum global resonance and local conversion rates.",
      icon: "🎨",
      code: "UX-LAB"
    }
  ];

  return (
    <div className="bg-[#020202] text-white selection:bg-red-600/30 overflow-x-hidden pt-20">
      <Helmet>
  {/* ================= BASIC SEO ================= */}
  <title>Web Design Company in Tamil Nadu | Professional Website Designers – VGot You</title>

  <meta
    name="description"
    content="VGot You is a leading web design company in Tamil Nadu offering custom, responsive, and SEO-optimized website design services for startups, manufacturers, exporters, and growing businesses."
  />

  <meta
    name="keywords"
    content="web design company in tamil nadu, website designer tamil nadu, web development company tamil nadu, responsive website design tamil nadu, seo web design tamil nadu, ui ux design agency tamil nadu, ecommerce website development tamil nadu"
  />

  <link rel="canonical" href="https://www.vgotyou.com/web-design-tamil-nadu" />
  <meta name="robots" content="index, follow" />

  {/* ================= OPEN GRAPH ================= */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Web Design Company in Tamil Nadu | VGot You" />
  <meta
    property="og:description"
    content="Professional website design, UI/UX, and SEO-ready development for businesses across Tamil Nadu by VGot You."
  />
  <meta property="og:image" content="https://www.vgotyou.com/assets/web-designer.png" />
  <meta property="og:url" content="https://www.vgotyou.com/web-design-tamil-nadu" />
  <meta property="og:site_name" content="VGot You" />
  <meta property="og:locale" content="en_IN" />

  {/* ================= TWITTER ================= */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Web Design Company in Tamil Nadu | VGot You" />
  <meta
    name="twitter:description"
    content="High-performance, SEO-optimized website design services for startups and enterprises across Tamil Nadu."
  />
  <meta name="twitter:image" content="https://www.vgotyou.com/assets/web-designer.png" />

  {/* ================= SERVICE SCHEMA ================= */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://www.vgotyou.com/web-design-tamil-nadu#service",
      name: "Website Design Services in Tamil Nadu",
      serviceType: "Web Design & Development",
      url: "https://www.vgotyou.com/web-design-tamil-nadu",
      description:
        "Professional website design and development services offering responsive, SEO-optimized, and conversion-focused websites for businesses across Tamil Nadu.",
      provider: {
        "@type": "Organization",
        "@id": "https://www.vgotyou.com/#organization",
        name: "VGot You",
        url: "https://www.vgotyou.com/",
        logo: "https://www.vgotyou.com/assets/vgotyou.png"
      },
      areaServed: {
        "@type": "State",
        name: "Tamil Nadu"
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
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "India",
          item: "https://www.vgotyou.com/web-design-india"
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Tamil Nadu",
          item: "https://www.vgotyou.com/web-design-tamil-nadu"
        }
      ]
    })}
  </script>
</Helmet>
      <style>{`
        .text-technical { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
        .grid-bg {
          background-image: linear-gradient(to right, #ffffff03 1px, transparent 1px),
                            linear-gradient(to bottom, #ffffff03 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden border-b border-zinc-900">
        <div className="absolute inset-0 grid-bg opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent"></div>
        
        <div className="absolute right-0 top-0 w-full h-full opacity-20 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" alt="Technology Network Grid" className="w-full h-full object-cover grayscale" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <m.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="inline-block px-3 py-1 mb-6 border border-zinc-800 rounded-sm bg-black/50 text-technical text-[10px] tracking-[0.4em] uppercase text-red-600 font-bold">
                Remote Node: TN_NETWORK_HUB
              </span>
              <h1 className="text-[10vw] sm:text-[8vw] md:text-[6.5vw] font-black mb-8 tracking-tighter uppercase leading-[0.85]">
                Powering <br/>
                <span className="text-zinc-800">Tamil Nadu's Digital Era.</span>
              </h1>
              <p className="text-sm md:text-xl text-zinc-400 max-w-xl font-light leading-relaxed mb-12">
                As a leading <Link to="/web-design" className="text-zinc-300 hover:text-red-600 transition-colors">web design agency for Tamil Nadu</Link>, we build digital systems for corporate giants and rising MSMEs across the state.
              </p>
              
              <div className="flex flex-wrap gap-6">
                <Link
                  to="/contact"
                  className="px-10 py-5 bg-red-600 text-white font-bold rounded-sm text-xs uppercase tracking-[0.3em] shadow-[0_0_30px_rgba(220,38,38,0.2)] hover:bg-red-700 transition-all active:scale-95"
                >
                  Initiate Deployment
                </Link>
                <div className="flex flex-col justify-center">
                  <span className="text-technical text-[8px] text-zinc-700 uppercase tracking-widest mb-1">Service_Model</span>
                  <span className="text-technical text-[10px] text-zinc-500 uppercase tracking-widest font-bold">VIRTUAL_CONSULT_ENABLED</span>
                </div>
              </div>
            </m.div>

            <m.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="hidden lg:block relative aspect-[4/5] max-w-md ml-auto"
            >
              <div className="absolute -inset-4 border border-zinc-800 rounded-sm opacity-50"></div>
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-red-600"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-red-600"></div>
              
              <div className="w-full h-full overflow-hidden border border-zinc-900 rounded-sm grayscale group hover:grayscale-0 transition-all duration-1000">
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" 
                  alt="Modern Corporate Infrastructure" 
                  className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                   <p className="text-technical text-[10px] font-bold text-white tracking-widest uppercase">Benchmark: Remote_First_Excellence</p>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 px-6 relative border-b border-zinc-900 bg-zinc-950/20">
        <div className="container mx-auto max-w-7xl">
          <TechnicalHeader label="Service Architecture" code="TN_REGIONAL_COVERAGE" />
          <h2 className="text-3xl md:text-5xl font-black text-center uppercase tracking-tighter mb-12">Premier Web Development Solutions for South India</h2>
          <div className="max-w-4xl mx-auto space-y-8 text-zinc-400 text-center text-sm md:text-lg leading-relaxed">
            <p>
              VGot You is your strategic partner for digital growth. We specialize in <strong>custom website development</strong> tailored for Tamil Nadu's industrial hubs—from the tech corridors of Chennai to the manufacturing excellence of Coimbatore and Karur. Our online-first model ensures rapid communication and efficient project delivery regardless of location.
            </p>
            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
              [Status: Serving all 38 districts through virtual collaboration nodes]
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 relative border-b border-zinc-900 bg-black">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-technical text-red-600 text-[10px] font-bold uppercase tracking-[0.4em] block mb-4">Regional_Success</span>
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter">Voices of TN Businesses</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {regionalTestimonials.map((t, i) => (
              <div key={i} className="p-8 border border-zinc-900 bg-zinc-950/30 rounded-sm relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="text-6xl font-serif">"</span>
                </div>
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6 italic relative z-10">"{t.text}"</p>
                <div className="flex items-center justify-between border-t border-zinc-900 pt-4">
                  <div>
                    <p className="font-bold text-white text-xs uppercase tracking-wider">{t.name}</p>
                    <p className="text-zinc-600 text-[9px] uppercase tracking-widest">{t.business}</p>
                  </div>
                  <span className="text-technical text-[8px] font-bold text-red-600 border border-red-600/30 px-2 py-1">{t.city.toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 relative border-b border-zinc-900 bg-black">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-20">
            <span className="text-technical text-red-600 text-[10px] font-bold uppercase tracking-[0.4em] block mb-4">Core_Capabilities</span>
            <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">Engineering <br/><span className="text-zinc-800">Business Growth.</span></h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <m.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-10 bg-[#050505] border border-zinc-900 rounded-sm hover:border-red-600/30 transition-all group"
              >
                <div className="text-technical text-[8px] text-zinc-800 group-hover:text-red-600 transition-colors mb-6 block">[{s.code}]</div>
                <h3 className="text-xl font-bold mb-4 uppercase tracking-tight text-white group-hover:text-red-500 transition-colors">{s.title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed">{s.desc}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Network Coverage */}
      <section className="py-24 px-6 relative border-b border-zinc-900 bg-[#050505]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <span className="text-technical text-red-600 text-[10px] font-bold uppercase tracking-[0.4em] block mb-4">Service_Area</span>
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">Remote Support for Every City.</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto mb-20">
            {cities.map(city => (
              <div key={city} className="group relative">
                <CityPill name={city} />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[7px] text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-mono">
                  {`VIRTUAL_NODE_${city.toUpperCase()}_READY`}
                </span>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-1 px-4">
            {[
              { t: "Chennai Hub", d: "Capital tech infrastructure and high-end software company portals.", node: "CH-044" },
              { t: "Coimbatore Node", d: "Leading industrial web design for the 'Manchester of South India'.", node: "CB-0422" },
              { t: "Karur Gateway", d: "Specialized export catalogs for the global textile trade.", node: "KR-04324", link: "/web-design-karur" }
            ].map((item, i) => (
              <div key={i} className="group border border-zinc-900 bg-black p-10 hover:border-red-600/20 transition-all">
                <span className="text-technical text-[7px] text-zinc-800 group-hover:text-red-600 block mb-4">[{item.node}]</span>
                <h3 className="text-lg font-bold mb-4 uppercase tracking-widest text-white">{item.t}</h3>
                <p className="text-zinc-500 text-[11px] leading-relaxed uppercase mb-8">{item.d}</p>
                {item.link ? (
                    <Link to={item.link} className="text-technical text-[9px] font-bold text-red-600 hover:text-white transition-colors uppercase tracking-[0.3em]">Access_Node &rarr;</Link>
                ) : (
                    <span className="text-technical text-[9px] font-bold text-zinc-800 uppercase tracking-[0.3em]">Online_Active</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 relative bg-black border-b border-zinc-900">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-technical text-red-600 text-[10px] font-bold uppercase tracking-[0.4em] block mb-4">QA_Module</span>
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-4">Tamil Nadu Web FAQ</h2>
          </div>
          
          <div className="space-y-2">
            <FAQItem 
              question="How do you work with clients remotely?" 
              answer="We use a structured digital workflow involving video consultations, collaborative design tools like Figma, and consistent updates via email or WhatsApp. This ensures transparency and efficiency without needing a physical office visit."
            />
            <FAQItem 
              question="What is the average web design cost in Tamil Nadu?" 
              answer="Pricing depends on scope. Basic sites start from ₹4,999, while custom e-commerce or large corporate portals range based on technical complexity."
            />
            <FAQItem 
              question="Can you design a multi-language website (Tamil & English)?" 
              answer="Yes, we specialize in bilingual website development, ensuring beautiful Tamil typography that is also optimized for search engines."
            />
            <FAQItem 
              question="Do you provide maintenance for TN businesses?" 
              answer="Absolutely. We offer 24/7 technical support packages for businesses across Tamil Nadu to ensure peak performance and zero downtime."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 sm:py-48 px-6 text-center bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.1)_0%,transparent_70%)]"></div>
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <div className="text-technical text-[10px] text-red-600 font-bold uppercase tracking-[0.5em] mb-12">Ready to Scale? Partner with VGot You.</div>
          <h2 className="text-[12vw] sm:text-[10vw] md:text-[8.5vw] font-black uppercase leading-[0.8] mb-16 tracking-tighter">
            Forge Your <br/>
            <span className="text-zinc-800">TN Digital Legacy.</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
            <Link
              to="/contact"
              className="relative w-full sm:w-auto px-16 py-6 bg-red-600 text-white font-bold rounded-sm text-sm uppercase tracking-[0.3em] shadow-[0_0_50px_rgba(220,38,38,0.3)] hover:scale-105 transition-all flex items-center justify-center"
            >
              Get Online Consultation
            </Link>
            <p className="text-technical text-[9px] text-zinc-600 uppercase tracking-widest text-left hidden sm:block border-l border-zinc-800 pl-8 leading-loose">
              // UPLINK_STABLE <br/>
              // MSME_PROTOCOL_READY <br/>
              // PORT: 8080_ACTIVE
            </p>
          </div>
        </m.div>
      </section>
    </div>
  );
};

export default WebDesignTN;