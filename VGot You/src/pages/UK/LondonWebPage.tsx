// ============================================================
// VGot You — Web Design London Page
// File: src/pages/uk/LondonWebPage.tsx
// ============================================================

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from "react-helmet-async";

const m = motion as any;

const LondonWebPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Do you provide web design services in London?",
      a: "Yes, VGot You provides professional web design for businesses across London including the City of London, Shoreditch, Canary Wharf and all London boroughs. We work fully remotely with a fast, transparent process."
    },
    {
      q: "How much does web design cost in London?",
      a: "Our London web design packages start from £1,499 for a standard business website. Bespoke e-commerce or enterprise platforms are priced based on scope. We provide fixed-price quotes with no hidden fees."
    },
    {
      q: "How long does it take to build a website for a London business?",
      a: "Most London business websites are delivered within 4-8 weeks from the start of the project. Simple landing pages can be completed in 2 weeks. We always provide a clear timeline before we begin."
    },
    {
      q: "Can you help a London startup with web design and SEO?",
      a: "Absolutely. We specialise in working with London startups — providing affordable, professional web design with foundational SEO built in from day one to help you rank on Google UK."
    }
  ];

  const industries = [
    { code: "FIN-01", name: "Finance & Fintech", desc: "Websites for City of London financial firms, wealth managers and fintech startups." },
    { code: "RET-02", name: "Retail & E-commerce", desc: "High-converting online stores for London retailers targeting UK and global buyers." },
    { code: "HOS-03", name: "Hospitality & Tourism", desc: "Booking-optimised websites for London hotels, restaurants and travel businesses." },
    { code: "TEC-04", name: "Tech & Startups", desc: "Scalable web platforms for Shoreditch and East London's thriving startup ecosystem." }
  ];

  return (
    <div className="bg-[#020202] text-white selection:bg-red-600/30 overflow-x-hidden pt-20">

     <Helmet>
  <html lang="en-GB" />
  <title>Web Design Company in London | Affordable SEO-Ready Websites | VGot You</title>
  <meta name="description" content="VGot You is a professional web design company serving London businesses — from Shoreditch startups to City of London enterprises. Fast, SEO-optimised websites from £1,499." />
  <meta name="author" content="VGot You" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://www.vgotyou.com/web-design-london" />
  <link rel="alternate" hrefLang="en-GB" href="https://www.vgotyou.com/web-design-london" />
  <link rel="alternate" hrefLang="en-IN" href="https://www.vgotyou.com/" />
  <link rel="alternate" hrefLang="x-default" href="https://www.vgotyou.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="VGot You" />
  <meta property="og:title" content="Web Design Company in London | Affordable SEO-Ready Websites | VGot You" />
  <meta property="og:description" content="Professional web design for London businesses — from Shoreditch startups to City of London enterprises. Fast, SEO-optimised websites from £1,499." />
  <meta property="og:url" content="https://www.vgotyou.com/web-design-london" />
  <meta property="og:image" content="https://www.vgotyou.com/assets/og-home.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Web Design Services in London – VGot You" />
  <meta property="og:locale" content="en_GB" />
  <meta property="og:locale:alternate" content="en_IN" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Web Design Company in London | Affordable SEO-Ready Websites | VGot You" />
  <meta name="twitter:description" content="Professional web design for London businesses. Fast, SEO-optimised websites from £1,499." />
  <meta name="twitter:image" content="https://www.vgotyou.com/assets/og-home.png" />
  <meta name="twitter:site" content="@vgotyou" />
  <meta name="twitter:creator" content="@vgotyou" />
  <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"WebPage","@id":"https://www.vgotyou.com/web-design-london#webpage","url":"https://www.vgotyou.com/web-design-london","name":"Web Design Company in London | Affordable SEO-Ready Websites | VGot You","description":"Professional web design for London businesses — from Shoreditch startups to City of London enterprises. Fast, SEO-optimised websites from £1,499.","inLanguage":"en-GB","isPartOf":{"@id":"https://www.vgotyou.com/#website"},"publisher":{"@id":"https://www.vgotyou.com/#organization"},"about":{"@id":"https://www.vgotyou.com/web-design-london#service"}}`}</script>
  <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"Service","@id":"https://www.vgotyou.com/web-design-london#service","name":"Web Design Services in London","url":"https://www.vgotyou.com/web-design-london","description":"Professional web design for London businesses — custom websites, e-commerce and SEO-optimised development for startups and enterprises across London.","serviceType":["Web Design London","Custom Website Design","E-commerce Website Development London","SEO-Optimised Web Design","Mobile-First Website Design","Small Business Website Design London","Startup Website Design London"],"provider":{"@id":"https://www.vgotyou.com/#organization"},"areaServed":[{"@type":"City","name":"London"},{"@type":"Country","name":"United Kingdom"}],"offers":{"@type":"Offer","priceSpecification":{"@type":"PriceSpecification","priceCurrency":"GBP","minPrice":"1499","description":"Web design packages for London businesses starting from £1,499"}}}`}</script>
  <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Do you provide web design services in London?","acceptedAnswer":{"@type":"Answer","text":"Yes, VGot You provides professional web design for businesses across London including the City of London, Shoreditch, Canary Wharf and all London boroughs. We work fully remotely."}},{"@type":"Question","name":"How much does web design cost in London?","acceptedAnswer":{"@type":"Answer","text":"Our London web design packages start from £1,499. Bespoke e-commerce or enterprise platforms are priced based on scope. Fixed-price quotes with no hidden fees."}},{"@type":"Question","name":"How long does it take to build a website for a London business?","acceptedAnswer":{"@type":"Answer","text":"Most London business websites are delivered within 4-8 weeks. Simple landing pages can be completed in 2 weeks. We always provide a clear timeline before we begin."}},{"@type":"Question","name":"Can you help a London startup with web design and SEO?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. We specialise in working with London startups — providing affordable web design with foundational SEO built in from day one to help you rank on Google UK."}}]}`}</script>
  <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.vgotyou.com/"},{"@type":"ListItem","position":2,"name":"Web Design UK","item":"https://www.vgotyou.com/web-design-uk"},{"@type":"ListItem","position":3,"name":"Web Design London","item":"https://www.vgotyou.com/web-design-london"}]}`}</script>
</Helmet>

      {/* Breadcrumbs */}
      <div className="absolute top-24 left-6 z-20 hidden md:block">
        <nav className="flex text-[10px] font-mono uppercase tracking-widest text-zinc-600">
          <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/web-design-uk" className="hover:text-red-600 transition-colors">Web Design UK</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-400">London</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative h-[80dvh] w-full flex items-center justify-center overflow-hidden border-b border-zinc-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05)_0%,transparent_70%)]"></div>
        <div className="relative z-10 px-6 max-w-7xl mx-auto text-center">
          <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="inline-block px-3 py-1 mb-6 border border-zinc-800 rounded-sm bg-black/50 text-[10px] font-mono tracking-[0.4em] uppercase text-zinc-500">
              Location: London / Global_Hub
            </span>
            <h1 className="text-5xl sm:text-7xl md:text-[6vw] font-black mb-6 tracking-tighter uppercase leading-[0.9]">
              Web Design <br/><span className="text-red-600">London.</span>
            </h1>
            <h2 className="sr-only">Web Design Company in London – Affordable, SEO-Ready Websites for London Businesses | VGot You</h2>
            <p className="text-sm sm:text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed mb-8 md:mb-12">
              London's most competitive market demands digital excellence. We build high-performance, SEO-optimised websites for London startups, SMEs and enterprises — designed to convert and built to rank on Google UK.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/contact?message=Hi VGot You, I'm interested in a web design quote for my London-based business." className="px-10 py-5 bg-red-600 text-white font-bold rounded-sm uppercase tracking-[0.2em] hover:bg-red-700 transition-all shadow-[0_0_30px_rgba(220,38,38,0.2)]">Request Quote</Link>
              <Link to="/portfolio" className="px-10 py-5 border border-zinc-800 text-white font-bold rounded-sm uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">Our Work</Link>
            </div>
          </m.div>
        </div>
      </section>

      {/* Local Authority */}
      <section className="py-24 px-6 border-b border-zinc-900">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8">Web Design for <span className="text-red-600">London Businesses.</span></h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">London is one of the world's most competitive business environments. Whether you're a Shoreditch tech startup, a City of London financial firm, or a Canary Wharf enterprise, your website is your most powerful business asset. VGot You specialises in building fast, conversion-focused websites that help London businesses stand out and grow.</p>
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div><div className="text-3xl font-black text-white mb-1">£1,499</div><div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Starting Price</div></div>
                <div><div className="text-3xl font-black text-white mb-1">4-8 Wks</div><div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Delivery Time</div></div>
              </div>
              <Link to="/contact?message=Hi VGot You, I'd like to start a new web design project in London. Let's talk!" className="inline-flex items-center gap-3 text-[10px] font-bold text-red-600 uppercase tracking-widest hover:gap-5 transition-all">Start Your London Project →</Link>
            </div>
            <div className="space-y-4">
              {industries.map((ind, i) => (
                <div key={i} className="p-6 border border-zinc-900 bg-zinc-950/30 hover:border-red-600/30 transition-all group">
                  <div className="text-[8px] font-mono text-zinc-700 group-hover:text-red-600 mb-2 transition-colors">[{ind.code}]</div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-1">{ind.name}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed">{ind.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6 bg-[#050505] border-b border-zinc-900">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-16 text-center">Web Design Services in London</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: "Custom Website Design", d: "Bespoke websites tailored for London businesses. Stand out in one of the world's most competitive markets." },
              { t: "SEO-Optimised Development", d: "Built to rank on Google London. Technical SEO integrated from day one of development." },
              { t: "E-commerce Development", d: "Sell online across London and beyond. High-converting stores built for UK buyers." },
              { t: "Mobile-First Design", d: "Over 60% of UK traffic is mobile. Every site we build works perfectly on all devices." },
              { t: "Landing Page Design", d: "High-conversion pages for London businesses running PPC or social campaigns." },
              { t: "Website Redesign", d: "Modernise your existing site and improve your London search visibility." }
            ].map((s, i) => (
              <div key={i} className="p-8 bg-[#080808] border border-zinc-900 rounded-sm hover:border-red-600/30 transition-all group">
                <div className="text-[8px] font-mono text-zinc-700 group-hover:text-red-600 mb-4 transition-colors">[SVC-0{i+1}]</div>
                <h3 className="text-lg font-bold uppercase tracking-tight text-white mb-3">{s.t}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 border-b border-zinc-900 bg-[#050505]">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-16 text-center">Web Design London – FAQs</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-zinc-900">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full py-6 flex justify-between items-center text-left">
                  <h4 className={`text-sm font-bold uppercase tracking-widest transition-colors ${openFaq === i ? 'text-red-600' : 'text-white'}`}>{faq.q}</h4>
                  <span className="text-red-600 ml-4">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && <p className="pb-6 text-zinc-500 text-sm leading-relaxed font-light">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other UK Cities */}
      <section className="py-16 px-6 border-b border-zinc-900 bg-black">
        <div className="container mx-auto max-w-7xl text-center">
          <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest mb-6">We also serve</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[{n:"Manchester",s:"manchester"},{n:"Birmingham",s:"birmingham"},{n:"Leeds",s:"leeds"},{n:"Glasgow",s:"glasgow"},{n:"Liverpool",s:"liverpool"},{n:"Bristol",s:"bristol"},{n:"Sheffield",s:"sheffield"},{n:"Edinburgh",s:"edinburgh"},{n:"Leicester",s:"leicester"},{n:"Cardiff",s:"cardiff"},{n:"Belfast",s:"belfast"}].map(c => (
              <Link key={c.s} to={`/web-design-${c.s}`} className="px-5 py-2 border border-zinc-900 text-zinc-500 text-[10px] font-mono uppercase tracking-widest hover:border-red-600/30 hover:text-white transition-all">{c.n}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.1)_0%,transparent_70%)]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">Start Your London <br/><span className="text-red-600">Web Design Project.</span></h2>
          <p className="text-zinc-500 mb-12 text-lg max-w-2xl mx-auto">Join London businesses already growing their digital presence with VGot You. Get a free quote today — no commitment required.</p>
          <Link to="/contact?message=Hi VGot You, I'm looking for a free quote for my London web design project." className="px-12 py-5 bg-red-600 text-white font-bold rounded-sm uppercase tracking-[0.3em] shadow-[0_0_50px_rgba(220,38,38,0.3)] hover:bg-red-700 transition-all inline-block">Get Free Quote</Link>
        </div>
      </section>
    </div>
  );
};

export default LondonWebPage;

