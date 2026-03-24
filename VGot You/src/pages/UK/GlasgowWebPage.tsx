import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    SparklesIcon, 
    UserGroupIcon, 
    RocketLaunchIcon,
    ChevronRightIcon
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

const GlasgowWebPage: React.FC = () => {
    return (
        <div className="bg-[#020202] text-white selection:bg-red-600/30 overflow-x-hidden pt-20">
            <Helmet>
  <html lang="en-GB" />
  <title>Web Design Company in Glasgow | SEO-Ready Websites | VGot You</title>
  <meta name="description" content="VGot You provides professional web design for Glasgow businesses — from West End creatives to financial district firms. Fast, affordable websites from £1,499." />
  <meta name="author" content="VGot You" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://www.vgotyou.com/web-design-glasgow" />
  <link rel="alternate" hreflang="en-GB" href="https://www.vgotyou.com/web-design-glasgow" />
  <link rel="alternate" hreflang="en-IN" href="https://www.vgotyou.com/" />
  <link rel="alternate" hreflang="x-default" href="https://www.vgotyou.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="VGot You" />
  <meta property="og:title" content="Web Design Company in Glasgow | SEO-Ready Websites | VGot You" />
  <meta property="og:description" content="Professional web design for Glasgow businesses — from West End creatives to financial district firms. Fast, affordable websites from £1,499." />
  <meta property="og:url" content="https://www.vgotyou.com/web-design-glasgow" />
  <meta property="og:image" content="https://www.vgotyou.com/assets/og-home.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Web Design Services in Glasgow – VGot You" />
  <meta property="og:locale" content="en_GB" />
  <meta property="og:locale:alternate" content="en_IN" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Web Design Company in Glasgow | SEO-Ready Websites | VGot You" />
  <meta name="twitter:description" content="Professional web design for Glasgow businesses. Fast, affordable websites from £1,499." />
  <meta name="twitter:image" content="https://www.vgotyou.com/assets/og-home.png" />
  <meta name="twitter:site" content="@vgotyou" />
  <meta name="twitter:creator" content="@vgotyou" />
  <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"WebPage","@id":"https://www.vgotyou.com/web-design-glasgow#webpage","url":"https://www.vgotyou.com/web-design-glasgow","name":"Web Design Company in Glasgow | SEO-Ready Websites | VGot You","description":"Professional web design for Glasgow businesses — from West End creatives to financial district firms. Fast, affordable websites from £1,499.","inLanguage":"en-GB","isPartOf":{"@id":"https://www.vgotyou.com/#website"},"publisher":{"@id":"https://www.vgotyou.com/#organization"},"about":{"@id":"https://www.vgotyou.com/web-design-glasgow#service"}}`}</script>
  <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"Service","@id":"https://www.vgotyou.com/web-design-glasgow#service","name":"Web Design Services in Glasgow","url":"https://www.vgotyou.com/web-design-glasgow","description":"Professional web design for Glasgow businesses — custom websites, e-commerce and SEO-optimised development across Greater Glasgow and Scotland.","serviceType":["Web Design Glasgow","Custom Website Design","E-commerce Website Development Glasgow","SEO-Optimised Web Design","Mobile-First Website Design","Small Business Website Design Glasgow"],"provider":{"@id":"https://www.vgotyou.com/#organization"},"areaServed":[{"@type":"City","name":"Glasgow"},{"@type":"Country","name":"United Kingdom"}],"offers":{"@type":"Offer","priceSpecification":{"@type":"PriceSpecification","priceCurrency":"GBP","minPrice":"1499","description":"Web design packages for Glasgow businesses starting from £1,499"}}}`}</script>
  <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Do you provide web design services in Glasgow?","acceptedAnswer":{"@type":"Answer","text":"Yes, VGot You provides professional web design for businesses across Glasgow including the city centre, West End, Merchant City and across Greater Glasgow and Scotland."}},{"@type":"Question","name":"How much does web design cost in Glasgow?","acceptedAnswer":{"@type":"Answer","text":"Our Glasgow web design packages start from £1,499. Fixed-price quotes, no hidden fees."}},{"@type":"Question","name":"Do you build e-commerce websites for Glasgow retailers?","acceptedAnswer":{"@type":"Answer","text":"Yes, we build high-converting e-commerce websites for Glasgow retailers and brands selling across Scotland and the UK."}},{"@type":"Question","name":"Can you help Glasgow creative agencies with their website?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. We specialise in building visually striking, portfolio-focused websites for Glasgow's creative community — designers, photographers, studios and agencies."}}]}`}</script>
  <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://www.vgotyou.com/"},{"@type":"ListItem","position":2,"name":"Web Design UK","item":"https://www.vgotyou.com/web-design-uk"},{"@type":"ListItem","position":3,"name":"Web Design Glasgow","item":"https://www.vgotyou.com/web-design-glasgow"}]}`}</script>
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

            {/* Breadcrumbs */}
            <div className="absolute top-24 left-6 z-20 hidden md:block">
                <nav className="flex text-[10px] font-mono uppercase tracking-widest text-zinc-600">
                    <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
                    <span className="mx-2">/</span>
                    <Link to="/web-design-uk" className="hover:text-red-600 transition-colors">Web Design UK</Link>
                    <span className="mx-2">/</span>
                    <span className="text-zinc-400">Glasgow</span>
                </nav>
            </div>

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
                            Location: Glasgow / Scottish_Node
                        </span>
                        <h1 className="text-5xl sm:text-7xl md:text-[6vw] font-black mb-6 md:mb-8 tracking-tighter uppercase leading-[0.9]">
                            Web Design <br/>
                            <span className="text-red-600">Glasgow.</span>
                        </h1>
                        <p className="text-sm sm:text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed mb-8 md:mb-12">
                            Combining heritage with modern digital strategy. We help Glasgow businesses bridge the gap between traditional values and modern online expectations.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link to="/contact" className="px-10 py-5 bg-red-600 text-white font-bold rounded-sm uppercase tracking-[0.2em] hover:bg-red-700 transition-all shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                                Request Quote
                            </Link>
                            <Link to="/portfolio" className="px-10 py-5 border border-zinc-800 text-white font-bold rounded-sm uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
                                Our Work
                            </Link>
                        </div>
                    </m.div>
                </div>
            </section>

            {/* Local Authority Section */}
            <section className="py-24 px-6 border-b border-zinc-900">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <TechnicalHeader label="Scottish Authority" code="VGY_GLASGOW_NODE_05" />
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8">Helping Glasgow Businesses <span className="text-red-600">Scale.</span></h2>
                            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                                As a specialized <strong className="text-white">web design agency in Glasgow</strong>, we help local businesses bridge the gap between traditional values and modern online expectations.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <div className="text-3xl font-black text-white mb-1">15+</div>
                                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Scottish Clients</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-white mb-1">100%</div>
                                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Mobile Ready</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-zinc-900 aspect-video rounded-sm border border-zinc-800 overflow-hidden relative grayscale group hover:grayscale-0 transition-all duration-700">
                            <img src="https://picsum.photos/seed/glasgow/800/450" alt="Glasgow Web Design" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-6 text-center bg-black relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.1)_0%,transparent_70%)]"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">
                        Start Your Glasgow <br/>
                        <span className="text-red-600">Project Today.</span>
                    </h2>
                    <Link to="/contact" className="px-12 py-5 bg-red-600 text-white font-bold rounded-sm uppercase tracking-[0.3em] shadow-[0_0_50px_rgba(220,38,38,0.3)] hover:bg-red-700 transition-all inline-block">
                        Get Started
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default GlasgowWebPage;
