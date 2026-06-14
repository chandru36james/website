import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
    SparklesIcon, 
    UserGroupIcon, 
    RocketLaunchIcon,
    ChevronRightIcon
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

const LondonWebPage: React.FC = () => {
    const { theme } = useTheme();
    const location = useLocation();

    return (
        <div className="bg-white dark:bg-[#020202] text-zinc-900 dark:text-white selection:bg-red-600/30 overflow-x-hidden transition-colors duration-300">
            <Header />
            <Helmet>
  <html lang="en-GB" />
  <title>Web Design Company in London | Premium Website Design | VGot You</title>
  <meta name="description" content="VGot You delivers premium web design for London businesses — from fintech startups in the City to creative brands in Shoreditch. SEO-optimised, world-class websites." />
  <meta name="author" content="VGot You" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://www.vgotyou.com/web-design-london" />
  <link rel="alternate" hrefLang="en-GB" href="https://www.vgotyou.com/web-design-london" />
  <link rel="alternate" hrefLang="en-IN" href="https://www.vgotyou.com/" />
  <link rel="alternate" hrefLang="x-default" href="https://www.vgotyou.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="VGot You" />
  <meta property="og:title" content="Web Design Company in London | Premium Website Design | VGot You" />
  <meta property="og:description" content="Premium web design for London businesses — from fintech startups to creative brands. SEO-optimised, world-class websites." />
  <meta property="og:url" content="https://www.vgotyou.com/web-design-london" />
  <meta property="og:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Web Design Services in London – VGot You" />
  <meta property="og:locale" content="en_GB" />
  <meta property="og:locale:alternate" content="en_IN" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Web Design Company in London | Premium Website Design | VGot You" />
  <meta name="twitter:description" content="Premium web design for London businesses. SEO-optimised, world-class websites." />
  <meta name="twitter:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
  <meta name="twitter:site" content="@vgotyou" />
  <meta name="twitter:creator" content="@vgotyou" />
  <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"WebPage","@id":"https://www.vgotyou.com/web-design-london#webpage","url":"https://www.vgotyou.com/web-design-london","name":"Web Design Company in London | Premium Website Design | VGot You","description":"Premium web design for London businesses — from fintech startups to creative brands. SEO-optimised, world-class websites.","inLanguage":"en-GB","isPartOf":{"@id":"https://www.vgotyou.com/#website"},"publisher":{"@id":"https://www.vgotyou.com/#organization"},"about":{"@id":"https://www.vgotyou.com/web-design-london#service"}}`}</script>
  <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"Service","@id":"https://www.vgotyou.com/web-design-london#service","name":"Web Design Services in London","url":"https://www.vgotyou.com/web-design-london","description":"Premium web design for London businesses — custom websites, fintech solutions and enterprise-level SEO-optimised development.","serviceType":["Web Design London","Custom Website Design","Enterprise Web Development London","Fintech Web Design","SEO-Optimised Web Design","Mobile-First Website Design"],"provider":{"@id":"https://www.vgotyou.com/#organization"},"areaServed":[{"@type":"City","name":"London"},{"@type":"Country","name":"United Kingdom"}],"offers":{"@type":"Offer","description":"Premium, bespoke web design solutions and custom systems for London businesses on request"}}`}</script>
  <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Do you provide web design services in London?","acceptedAnswer":{"@type":"Answer","text":"Yes, VGot You provides premium web design for businesses across London including the City, Shoreditch, Canary Wharf, and all Greater London boroughs."}},{"@type":"Question","name":"How much does web design cost in London?","acceptedAnswer":{"@type":"Answer","text":"Our London web design projects are fully customized and based on individual scope. We provide tailored, fixed-price quotes for startup, fintech, and enterprise requirements upon request."}},{"@type":"Question","name":"Do you work with London fintech startups?","acceptedAnswer":{"@type":"Answer","text":"Yes, we specialize in high-performance, security-focused websites for London's fintech and tech sectors, ensuring world-class UI/UX and technical SEO."}},{"@type":"Question","name":"Can you help my London business with SEO?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Every website we build is ground-up optimized for search, and we offer dedicated SEO services UK to help your London brand dominate competitive search results."}}]}`}</script>
  <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.vgotyou.com/"},{"@type":"ListItem","position":2,"name":"Web Design UK","item":"https://www.vgotyou.com/web-design-uk"},{"@type":"ListItem","position":3,"name":"Web Design London","item":"https://www.vgotyou.com/web-design-london"}]}`}</script>
</Helmet>

            <style>{`
                .text-technical { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
            `}</style>
                {/* Hero Section – Reduced mobile height with higher padding-top to clear header, darker overlay, smoother animations */}
            <section className="relative px-4 sm:px-6 pt-24 pb-6 md:pt-32 md:pb-24 overflow-hidden bg-cover bg-center bg-white dark:bg-black" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?auto=format&fit=crop&w=1600&q=80')" }}>
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
                                Location: London / Global_Financial_Node
                            </span>
                        </m.div>

                        {/* Headline */}
                        <m.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.2] mb-3 md:mb-4"
                        >
                            Web Design
                            <br />
                            <span className="text-red-500">London.</span>
                        </m.h1>

                        {/* Description */}
                        <m.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-sm md:text-base text-zinc-200 dark:text-zinc-300 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed"
                        >
                            The world converges in London. We help the city's most ambitious brands stand out with world-class digital experiences and technical SEO excellence.
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
                                    to="/contact?message=Hi VGot You, I'm interested in a web design quote for my London-based business."
                                    className="block w-full inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-[10px] transition-all duration-300 text-[11px] sm:text-xs uppercase tracking-wider text-center"
                                >
                                    Request Quote
                                </Link>
                            </m.div>
                            <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-[150px] sm:w-[175px]">
                                <Link
                                    to="/portfolio"
                                    className="block w-full inline-flex items-center justify-center border border-white/40 hover:border-white/70 bg-transparent backdrop-blur-sm font-semibold px-4 py-2.5 rounded-[10px] transition-all duration-300 hover:bg-white/10 text-white text-[11px] sm:text-xs uppercase tracking-wider text-center"
                                >
                                    Our Work
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
                                { name: "London", path: "/web-design-london" },
                                { name: "Manchester", path: "/web-design-manchester" },
                                { name: "Birmingham", path: "/web-design-birmingham" }
                            ].map((item) => {
                                const isActive = item.name === "London";
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

            {/* Local Authority Section */}
            <section className="py-12 md:py-16 px-6 border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-[#050505]/40 animate-fadeIn transition-colors duration-300">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <TechnicalHeader label="Greater London Authority" code="VGY_LONDON_NODE_01" />
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-zinc-900 dark:text-white">Helping London Brands <span className="text-red-600">Lead.</span></h2>
                            <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed mb-8">
                                As a leading <strong className="text-zinc-900 dark:text-white">web design agency in London</strong>, we combine creative flair with technical precision to deliver websites that exceed global standards.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <div className="text-3xl font-black text-zinc-900 dark:text-white mb-1">50+</div>
                                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">London Successes</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-zinc-900 dark:text-white mb-1">Top 1%</div>
                                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Technical Performance</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-zinc-100 dark:bg-zinc-900 aspect-video rounded-[10px] border border-zinc-200 dark:border-zinc-800 overflow-hidden relative group transition-all duration-500">
                            <img src="https://picsum.photos/seed/london-skyline/800/450" alt="London Web Design" className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-all duration-500" referrerPolicy="no-referrer" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 md:py-20 px-6 text-center bg-zinc-50 dark:bg-[#080808] border-b border-zinc-100 dark:border-zinc-900 relative transition-colors duration-300">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.05)_0%,transparent_70%)]"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-zinc-900 dark:text-white">
                        Start Your London <br/>
                        <span className="text-red-600">Project Today.</span>
                    </h2>
                    <m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-[180px] sm:w-[195px] mx-auto">
                        <Link to="/contact?message=Hi VGot You, I'm ready to start my London web design project. Let's get started!" className="w-full inline-flex items-center justify-center bg-red-600 hover:bg-red-705 bg-red-650 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-[10px] transition-all duration-300 text-[11px] sm:text-xs uppercase tracking-wider shadow-lg shadow-red-600/20 text-center">
                            Get Started
                        </Link>
                    </m.div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default LondonWebPage;
