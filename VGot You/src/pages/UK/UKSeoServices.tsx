import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    CheckCircleIcon, 
    RocketLaunchIcon, 
    UserGroupIcon, 
    SparklesIcon, 
    CodeBracketIcon,
    ChevronRightIcon,
    StarIcon
} from '../../components/Icons';
import { Helmet } from "react-helmet";

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

const UKSeoServices: React.FC = () => {
    return (
        <div className="bg-[#020202] text-white selection:bg-red-600/30 overflow-x-hidden pt-20">
            

<Helmet>
  {/* ================= BASIC SEO ================= */}
  <title>SEO Company UK | Search Engine Optimization Services | VGot You</title>

  <meta
    name="description"
    content="Leading SEO company in the UK. VGot You provides result-driven SEO services to improve Google rankings, increase traffic, and generate high-quality leads."
  />

  <meta
    name="keywords"
    content="SEO company UK, SEO services UK, search engine optimization UK, London SEO agency, local SEO UK, ecommerce SEO UK, technical SEO UK"
  />

  <link rel="canonical" href="https://www.vgotyou.com/seo-services-uk" />
  <meta name="robots" content="index, follow" />

  {/* ================= OPEN GRAPH ================= */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="SEO Company UK | Professional SEO Services | VGot You" />
  <meta
    property="og:description"
    content="Professional SEO services for UK businesses. Improve rankings, traffic, and conversions with VGot You."
  />
  <meta property="og:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
  <meta property="og:url" content="https://www.vgotyou.com/seo-services-uk" />
  <meta property="og:site_name" content="VGot You" />
  <meta property="og:locale" content="en_GB" />

  {/* ================= TWITTER ================= */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="SEO Company UK | VGot You" />
  <meta
    name="twitter:description"
    content="Rank higher on Google with expert SEO services for UK businesses."
  />
  <meta name="twitter:image" content="https://www.vgotyou.com/assets/seo-services.png" />

  {/* ================= SERVICE SCHEMA ================= */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://www.vgotyou.com/seo-services-uk#service",
      name: "SEO Services UK",
      serviceType: "Search Engine Optimization",
      url: "https://www.vgotyou.com/seo-services-uk",
      description:
        "Professional SEO services for UK businesses including local SEO, technical SEO, and eCommerce SEO.",
      provider: {
        "@type": "Organization",
        "@id": "https://www.vgotyou.com/#organization",
        name: "VGot You",
        url: "https://www.vgotyou.com/",
        logo: "https://www.vgotyou.com/assets/vgotyou.png"
      },
      areaServed: {
        "@type": "Country",
        name: "United Kingdom"
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
          name: "SEO Services",
          item: "https://www.vgotyou.com/seo-services"
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "SEO Services UK",
          item: "https://www.vgotyou.com/seo-services-uk"
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

            {/* Hero Section */}
            <section className="relative h-[80dvh] w-full flex items-center justify-center overflow-hidden border-b border-zinc-950">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05)_0%,transparent_70%)]"></div>
                
                <div className="relative z-10 px-6 max-w-7xl mx-auto text-center">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="inline-block px-3 py-1 mb-6 border border-zinc-800 rounded-sm bg-black/50 text-[10px] font-mono tracking-[0.4em] uppercase text-zinc-500">
                            Service: SEO_Optimization / UK_Region
                        </span>
                        <h1 className="text-5xl sm:text-7xl md:text-[6vw] font-black mb-6 md:mb-8 tracking-tighter uppercase leading-[0.9]">
                            Dominate <br/>
                            <span className="text-red-600">Google UK.</span>
                        </h1>
                        <p className="text-sm sm:text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed mb-8 md:mb-12">
                            VGot You is a results-driven <strong className="text-white">UK SEO agency</strong>. We don't just rank keywords; we drive revenue for British businesses through strategic search engine dominance.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link to="/contact" className="px-10 py-5 bg-red-600 text-white font-bold rounded-sm uppercase tracking-[0.2em] hover:bg-red-700 transition-all shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                                Free SEO Audit
                            </Link>
                            <Link to="/portfolio" className="px-10 py-5 border border-zinc-800 text-white font-bold rounded-sm uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
                                Case Studies
                            </Link>
                        </div>
                    </m.div>
                </div>
            </section>

            {/* SEO Pillars */}
            <section className="py-24 px-6 border-b border-zinc-900">
                <div className="container mx-auto max-w-7xl">
                    <TechnicalHeader label="SEO Strategy" code="UK_SEARCH_PROTOCOL" />
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Technical SEO",
                                desc: "We fix the foundation. From Core Web Vitals to schema markup, we ensure Google UK can crawl and index your site perfectly.",
                                icon: <CodeBracketIcon className="w-6 h-6" />
                            },
                            {
                                title: "Content Strategy",
                                desc: "High-intent keyword research and editorial content that builds topical authority and converts UK visitors into customers.",
                                icon: <SparklesIcon className="w-6 h-6" />
                            },
                            {
                                title: "Authority Building",
                                desc: "Premium UK link building and digital PR that establishes your brand as a leader in your industry.",
                                icon: <RocketLaunchIcon className="w-6 h-6" />
                            }
                        ].map((pillar, i) => (
                            <div key={i} className="p-8 bg-[#080808] border border-zinc-900 rounded-sm">
                                <div className="text-red-600 mb-6">{pillar.icon}</div>
                                <h3 className="text-xl font-bold mb-4 uppercase tracking-tight text-white">{pillar.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-6 text-center bg-black relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.1)_0%,transparent_70%)]"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">
                        Ready to <br/>
                        <span className="text-red-600">Rank #1?</span>
                    </h2>
                    <p className="text-zinc-500 mb-12 text-lg max-w-xl mx-auto">
                        Stop letting your competitors take your UK market share. Partner with VGot You and dominate search results today.
                    </p>
                    <Link to="/contact" className="px-12 py-5 bg-red-600 text-white font-bold rounded-sm uppercase tracking-[0.3em] shadow-[0_0_50px_rgba(220,38,38,0.3)] hover:bg-red-700 transition-all inline-block">
                        Claim Your Audit
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default UKSeoServices;
