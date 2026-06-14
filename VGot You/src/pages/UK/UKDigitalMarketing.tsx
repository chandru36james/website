import React from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { 
    CheckCircleIcon, 
    RocketLaunchIcon, 
    UserGroupIcon, 
    SparklesIcon, 
    CodeBracketIcon,
    ChevronRightIcon,
    StarIcon
} from '../../components/common/Icons';
import { Helmet } from "react-helmet-async";
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { useTheme } from '../../components/common/ThemeProvider';

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

const UKDigitalMarketing: React.FC = () => {
    const { theme } = useTheme();
    const location = useLocation();

    return (
        <div className="bg-white dark:bg-[#020202] text-zinc-900 dark:text-white selection:bg-red-600/30 overflow-x-hidden transition-colors duration-300">
            <Header />
            <Helmet>
  {/* ================= BASIC SEO ================= */}
  <title>Digital Marketing Company UK | Online Marketing Services | VGot You</title>

  <meta
    name="description"
    content="Leading digital marketing company in the UK. VGot You offers SEO, Google Ads, social media marketing, and lead generation services to help businesses grow online."
  />

  <meta
    name="keywords"
    content="digital marketing company UK, online marketing UK, SEO services UK, Google Ads UK, social media marketing UK, lead generation UK, performance marketing UK"
  />

  <link rel="canonical" href="https://www.vgotyou.com/digital-marketing-uk" />
  <meta name="robots" content="index, follow" />

  {/* ================= OPEN GRAPH ================= */}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="VGot You" />
  <meta property="og:title" content="Digital Marketing Company UK | VGot You" />
  <meta
    property="og:description"
    content="Grow your business with expert digital marketing services in the UK including SEO, PPC, and social media marketing."
  />
  <meta property="og:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
  <meta property="og:url" content="https://www.vgotyou.com/digital-marketing-uk" />
  <meta property="og:locale" content="en_GB" />

  {/* ================= TWITTER ================= */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Digital Marketing Company UK | VGot You" />
  <meta
    name="twitter:description"
    content="Performance-driven digital marketing services for UK businesses including SEO, PPC, and social media marketing."
  />
  <meta name="twitter:image" content="https://www.vgotyou.com/assets/vgotyou.png" />

  {/* ================= SERVICE SCHEMA ================= */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": "https://www.vgotyou.com/digital-marketing-uk#service",
      name: "Digital Marketing Services UK",
      serviceType: "Online Marketing & Growth Strategy",
      url: "https://www.vgotyou.com/digital-marketing-uk",
      description:
        "Professional digital marketing services for UK businesses including SEO, PPC, social media marketing, and lead generation.",
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
          name: "Digital Marketing",
          item: "https://www.vgotyou.com/digital-marketing"
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Digital Marketing UK",
          item: "https://www.vgotyou.com/digital-marketing-uk"
        }
      ]
    })}
  </script>
</Helmet>

            <style>{`
                .text-technical { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
            `}</style>
            

            {/* Hero Section – Reduced mobile height with higher padding-top to clear header, darker overlay, smoother animations */}
            <section className="relative px-4 sm:px-6 pt-24 pb-6 md:pt-32 md:pb-24 overflow-hidden bg-cover bg-center bg-white dark:bg-black" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80')" }}>
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
                                Service: Digital_Marketing / UK_Market
                            </span>
                        </m.div>

                        {/* Headline */}
                        <m.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.2] mb-3 md:mb-4"
                        >
                            Scale Your
                            <br />
                            <span className="text-red-500">UK Brand.</span>
                        </m.h1>

                        {/* Description */}
                        <m.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-sm md:text-base text-zinc-200 dark:text-zinc-300 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed"
                        >
                            Performance-driven <strong className="text-white font-bold">digital marketing UK</strong>. We combine data science with creative excellence to deliver measurable growth for British businesses.
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
                                    to="/contact?message=Hi VGot You, I'd like to schedule a strategy call for my UK digital marketing campaign."
                                    className="block w-full inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-[10px] transition-all duration-300 text-[11px] sm:text-xs uppercase tracking-wider text-center"
                                >
                                    Get Strategy Call
                                </Link>
                            </m.div>
                            <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-[150px] sm:w-[175px]">
                                <Link
                                    to="/portfolio"
                                    className="block w-full inline-flex items-center justify-center border border-white/40 hover:border-white/70 bg-transparent backdrop-blur-sm font-semibold px-4 py-2.5 rounded-[10px] transition-all duration-300 hover:bg-white/10 text-white text-[11px] sm:text-xs uppercase tracking-wider text-center"
                                >
                                    View Results
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

            {/* Marketing Channels */}
            <section className="py-12 md:py-16 px-6 border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-[#050505]/40 animate-fadeIn transition-colors duration-300">
                <div className="container mx-auto max-w-7xl">
                    <TechnicalHeader label="Marketing Channels" code="UK_GROWTH_ENGINE" />
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Paid Search (PPC)",
                                desc: "High-ROI Google Ads and Bing Ads campaigns designed for the UK market. We focus on conversion, not just clicks.",
                                icon: <RocketLaunchIcon className="w-6 h-6" />
                            },
                            {
                                title: "Social Media Ads",
                                desc: "Targeted Meta, LinkedIn, and TikTok campaigns that build brand awareness and drive sales for UK audiences.",
                                icon: <UserGroupIcon className="w-6 h-6" />
                            },
                            {
                                title: "Content Marketing",
                                desc: "Strategic content that educates, inspires, and converts. We build your UK brand's authority through storytelling.",
                                icon: <SparklesIcon className="w-6 h-6" />
                            }
                        ].map((channel, i) => (
                            <div key={i} className="p-8 bg-zinc-100 dark:bg-[#080808] border border-zinc-200 dark:border-zinc-900 rounded-[10px]">
                                <div className="text-red-600 mb-6">{channel.icon}</div>
                                <h3 className="text-xl font-bold mb-4 uppercase tracking-tight text-zinc-900 dark:text-white">{channel.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">{channel.desc}</p>
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
                        Ready to <br/>
                        <span className="text-red-600">Accelerate?</span>
                    </h2>
                    <p className="text-zinc-500 mb-12 text-lg max-w-xl mx-auto">
                        Don't leave your UK growth to chance. Partner with VGot You and build a predictable lead generation machine.
                    </p>
                    <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-[180px] sm:w-[195px] mx-auto">
                        <Link to="/contact?message=Hi VGot You, I'm ready to accelerate my UK growth. Let's start a digital marketing campaign together!" className="w-full inline-flex items-center justify-center bg-red-650 hover:bg-red-705 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-[10px] transition-all duration-300 text-[11px] sm:text-xs uppercase tracking-wider shadow-lg shadow-red-600/20 text-center">
                            Start Campaign
                        </Link>
                    </m.div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default UKDigitalMarketing;
