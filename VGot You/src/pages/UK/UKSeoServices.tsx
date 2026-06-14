import React from 'react';
import { motion } from 'motion/react';
import { 
  RocketLaunchIcon, 
  MapPinIcon, 
  MagnifyingGlassIcon,
  PresentationChartLineIcon,
  ChevronRightIcon
} from '../../components/common/Icons';
import { Helmet } from "react-helmet-async";
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { useTheme } from '../../components/common/ThemeProvider';
import { Link, useLocation } from 'react-router-dom';

const m = motion as any;

const TechnicalHeader = ({ label, code }: { label: string; code: string }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="h-[1px] flex-grow bg-zinc-200 dark:bg-zinc-800"></div>
    <div className="flex flex-col items-center">
      <span className="text-[10px] font-mono text-red-600 tracking-[0.4em] uppercase">{label}</span>
      <span className="text-[8px] font-mono text-zinc-400 dark:text-zinc-600 mt-1">{code}</span>
    </div>
    <div className="h-[1px] flex-grow bg-zinc-200 dark:bg-zinc-800"></div>
  </div>
);

const UKSeoServices: React.FC = () => {
    const { theme } = useTheme();
    const location = useLocation();

    return (
        <div className="bg-white dark:bg-[#020202] text-zinc-900 dark:text-white selection:bg-red-600/30 overflow-x-hidden transition-colors duration-300">
            <Header />
            <Helmet>
  {/* ================= BASIC SEO ================= */}
  <title>SEO Agency UK | Search Engine Optimisation Services | VGot You</title>

  <meta
    name="description"
    content="Leading SEO agency in the UK. VGot You delivers data-driven search engine optimisation services to help UK businesses rank higher, drive traffic, and increase leads."
  />

  <meta
    name="keywords"
    content="SEO agency UK, UK SEO services, small business SEO UK, ecommerce SEO UK, local SEO UK, technical SEO UK, SEO audit UK"
  />

  <link rel="canonical" href="https://www.vgotyou.com/seo-services-uk" />
  <meta name="robots" content="index, follow" />

  {/* ================= OPEN GRAPH ================= */}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="VGot You" />
  <meta property="og:title" content="Expert SEO Agency UK | VGot You" />
  <meta
    property="og:description"
    content="Dominate search results with expert SEO services in the UK. We focus on technical SEO, content strategy, and authority building."
  />
  <meta property="og:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
  <meta property="og:url" content="https://www.vgotyou.com/seo-services-uk" />
  <meta property="og:locale" content="en_GB" />

  {/* ================= TWITTER ================= */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="SEO Services UK | VGot You" />
  <meta
    name="twitter:description"
    content="Boost your search rankings with performance-driven SEO services for UK businesses."
  />
  <meta name="twitter:image" content="https://www.vgotyou.com/assets/vgotyou.png" />

  {/* ================= SERVICE SCHEMA ================= */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://www.vgotyou.com/seo-services-uk#service",
      name: "SEO Services UK",
      serviceType: "Search Engine Optimisation",
      url: "https://www.vgotyou.com/seo-services-uk",
      description:
        "Comprehensive SEO services for UK businesses including technical SEO audits, keyword research, on-page optimisation, and link building.",
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
          name: "SEO UK",
          item: "https://www.vgotyou.com/seo-services-uk"
        }
      ]
    })}
  </script>
</Helmet>

            <style>{`
                .text-technical { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
            `}</style>
            

            {/* Hero Section – Reduced mobile height with higher padding-top to clear header, darker overlay, smoother animations */}
            <section className="relative px-4 sm:px-6 pt-24 pb-6 md:pt-32 md:pb-24 overflow-hidden bg-cover bg-center bg-white dark:bg-black" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80')" }}>
                {/* Darker overlay – stronger contrast */}
                <div className="absolute inset-0 bg-black/75 dark:bg-black/85 transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-br from-red-50/10 via-transparent to-transparent dark:from-red-950/20 dark:via-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#dc2626_0.5px,_transparent_0.5px)] [background-size:24px_24px] opacity-[0.04] dark:opacity-[0.06] pointer-events-none" />

                <div className="container mx-auto max-w-6xl relative z-10 py-1 md:py-2">
                    <div className="max-w-3xl mx-auto text-center">
                        {/* Tiny badge */}
                        <m.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-[10px] bg-red-50/90 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 mb-3 md:mb-4 backdrop-blur-sm"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            <span className="text-[10px] font-mono tracking-wider text-red-700 dark:text-red-300 uppercase">
                                Service: Search_Optimisation / UK_Node
                            </span>
                        </m.div>

                        {/* Headline */}
                        <m.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.2] mb-3 md:mb-4"
                        >
                            SEO Services
                            <br />
                            <span className="text-red-500">UK.</span>
                        </m.h1>

                        {/* Description */}
                        <m.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-sm md:text-base text-zinc-200 dark:text-zinc-300 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed"
                        >
                            Rank higher. Sell more. Our <strong className="text-white font-bold">UK SEO services</strong> combine technical precision with content strategy to dominate your niche in the British market.
                        </m.p>

                        {/* CTA Buttons */}
                        <m.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-5 md:mb-6"
                        >
                            <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-[170px] sm:w-[195px]">
                                <Link
                                    to="/contact?message=Hi VGot You, I'm interested in an SEO audit for my UK-based website."
                                    className="block w-full inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-[10px] transition-all duration-300 text-[11px] sm:text-xs uppercase tracking-wider text-center"
                                >
                                    Claim Free Audit
                                </Link>
                            </m.div>
                            <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-[150px] sm:w-[175px]">
                                <Link
                                    to="/portfolio"
                                    className="block w-full inline-flex items-center justify-center border border-white/40 hover:border-white/70 bg-transparent backdrop-blur-sm font-semibold px-4 py-2.5 rounded-[10px] transition-all duration-300 hover:bg-white/10 text-white text-[11px] sm:text-xs uppercase tracking-wider text-center"
                                >
                                    Case Studies
                                </Link>
                            </m.div>
                        </m.div>

                        {/* City switcher - minimal inline */}
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 pt-3 border-t border-white/20"
                        >
                            <span className="text-[10px] font-mono tracking-wider text-zinc-300 uppercase">
                                Presence:
                            </span>
                            {[
                                { name: "UK", path: "/web-design-uk" },
                                { name: "London", path: "/web-design-london" },
                                { name: "Manchester", path: "/web-design-manchester" }
                            ].map((item) => {
                                const isActive = item.name === "UK";
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className={`text-xs font-mono tracking-wide transition-colors ${isActive ? "text-red-500 font-bold pointer-events-none" : "text-zinc-200 hover:text-white"}`}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </m.div>
                    </div>
                </div>
            </section>

            {/* Core Strategy */}
            <section className="py-12 md:py-16 px-6 border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-[#050505]/40 animate-fadeIn transition-colors duration-300">
                <div className="container mx-auto max-w-7xl">
                    <TechnicalHeader label="SEO Strategy" code="VGY_UK_SEO_STK_02" />
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: "Technical SEO",
                                desc: "Fixing crawl errors, improving site speed, and ensuring a robust mobile-first architecture for the UK market.",
                                icon: <RocketLaunchIcon className="w-5 h-5" />
                            },
                            {
                                title: "Keyword Intel",
                                desc: "Deep-dive research into high-intent British search terms that actually lead to conversions for your UK business.",
                                icon: <MagnifyingGlassIcon className="w-5 h-5" />
                            },
                            {
                                title: "Local Visibility",
                                desc: "Dominating local search results across UK cities through strategic GMB optimisation and local citation building.",
                                icon: <MapPinIcon className="w-5 h-5" />
                            },
                            {
                                title: "Growth Analytics",
                                desc: "Monthly data-backed reporting that shows exactly where your traffic is coming from and how it's converting.",
                                icon: <PresentationChartLineIcon className="w-5 h-5" />
                            }
                        ].map((item, i) => (
                            <div key={i} className="p-8 bg-zinc-100 dark:bg-[#080808] border border-zinc-200 dark:border-zinc-900 rounded-[10px] hover:border-red-600 transition-colors">
                                <div className="text-red-600 mb-6">{item.icon}</div>
                                <h3 className="font-bold text-zinc-900 dark:text-white uppercase mb-4">{item.title}</h3>
                                <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 md:py-20 px-6 text-center bg-zinc-50 dark:bg-[#080808] border-b border-zinc-100 dark:border-zinc-900 relative transition-colors duration-300">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.05)_0%,transparent_70%)]"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-zinc-900 dark:text-white">
                        Get Your Brand <br/>
                        <span className="text-red-600">On Page One.</span>
                    </h2>
                    <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-[180px] sm:w-[195px] mx-auto">
                        <Link to="/contact?message=Hi VGot You, I'm ready to dominate UK search results. Let's talk about my SEO strategy!" className="w-full inline-flex items-center justify-center bg-red-650 hover:bg-red-705 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-[10px] transition-all duration-300 text-[11px] sm:text-xs uppercase tracking-wider shadow-lg shadow-red-600/20 text-center">
                            Talk To An Expert
                        </Link>
                    </m.div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default UKSeoServices;
