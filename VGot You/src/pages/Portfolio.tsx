
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as ReactRouterDOM from 'react-router-dom';
import { Helmet } from "react-helmet";
const { Link } = ReactRouterDOM as any;
const m = motion as any;

interface LocalProject {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
    liveUrl?: string;
    alt: string;
}

const portfolioProjects: LocalProject[] = [
    {
        id: '1',
        title: 'Rudhraa Exim',
        category: 'B2B Exports',
        imageUrl: 'https://www.vgotyou.com/assets/portfolio/9.jpg',
        liveUrl: 'https://rudhraaexportsandimports.com/',
        alt: 'Rudhraa Exim B2B export and import company website'
    },
    {
        id: '2',
        title: 'Oskar',
        category: 'Freelancer',
        imageUrl: 'https://www.vgotyou.com/assets/portfolio/1.jpg',
        liveUrl: 'https://oskardesigner.netlify.app/',
        alt: 'freelance services website designer portfolio'
    },
    {
        id: '3',
        title: 'Bloomgreen Developers',
        category: 'Construction & Interior',
        imageUrl: 'https://www.vgotyou.com/assets/portfolio/4.jpg',
        liveUrl: 'https://bloomgreendevs.netlify.app/',
        alt: 'Bloomgreen Developers construction and interior design website'
    },
    {
        id: '4',
        title: 'Akshaya Travels',
        category: 'Travels Services',
        imageUrl: 'https://www.vgotyou.com/assets/portfolio/8.jpg',
        liveUrl: 'https://akshayatoursandtravels.com/',
        alt: 'Akshaya Tours and Travels booking and services website'
    },
    {
        id: '5',
        title: 'eNno',
        category: 'Service Provider',
        imageUrl: 'https://www.vgotyou.com/assets/portfolio/2.jpg',
        liveUrl: 'https://ennodesign.netlify.app/',
        alt: 'web design and digital marketing service provider website'
    },
    {
        id: '6',
        title: 'VesaHomes',
        category: 'E-commerce',
        imageUrl: 'https://www.vgotyou.com/assets/portfolio/7.jpg',
        liveUrl: 'https://vesahomes.com/',
        alt: 'VesaHomes home textile website'
    },
    {
        id: '7',
        title: 'Destech Industry',
        category: 'B2B Services',
        imageUrl: 'https://www.vgotyou.com/assets/portfolio/3.jpg',
        liveUrl: 'https://destechindustry.netlify.app/',
        alt: 'Destech Industry B2B industrial services website'
    },
    {
        id: '8',
        title: 'Arctic Textiles',
        category: 'B2B Manufacturing',
        imageUrl: 'https://www.vgotyou.com/assets/portfolio/10.jpg',
        liveUrl: 'https://arctictextiles.com/',
        alt: 'Arctic Textiles B2B textile manufacturing company website'
    },
    {
        id: '9',
        title: 'INDICO',
        category: 'Construction & Real Estate',
        imageUrl: 'https://www.vgotyou.com/assets/portfolio/5.jpg',
        liveUrl: 'https://indicobuilds.netlify.app/',
        alt: 'INDICO construction and real estate company website'
    },
    {
        id: '10',
        title: 'Violet Store',
        category: 'E-commerce',
        imageUrl: 'https://www.vgotyou.com/assets/portfolio/6.jpg',
        liveUrl: 'https://violet-scorpion-690121.hostingersite.com/',
        alt: 'Violet Store ecommerce fashion and retail website'
    }
];

const ProjectCard: React.FC<{ project: LocalProject }> = ({ project }) => (
    <m.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="group relative bg-white border border-zinc-100 overflow-hidden transition-all duration-500 hover:border-red-600/20 hover:shadow-2xl rounded-[2rem] md:rounded-[2.5rem] p-4 flex flex-col gap-4 md:gap-6 max-w-md mx-auto sm:max-w-none"
    >
        <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block h-full"
        >
            <div className="px-2 md:px-4 pt-2 md:pt-4 flex items-center justify-between">
                <div>
                    <h3 className="text-lg md:text-2xl font-black text-zinc-900 uppercase tracking-tighter group-hover:text-red-600 transition-colors duration-300">
                        {project.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></div>
                        <p className="text-[9px] md:text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-[0.2em]">
                            {project.category}
                        </p>
                    </div>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all duration-500 shadow-sm group-hover:shadow-lg group-hover:shadow-red-600/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
            </div>

            <div className="relative aspect-[4/5] md:aspect-[9/16] overflow-hidden bg-zinc-100 rounded-[1rem] md:rounded-[2rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.15)] group-hover:shadow-[0_40px_80px_-20px_rgba(220,38,38,0.25)] transition-all duration-700 mt-2">
                <img 
                    src={project.imageUrl} 
                    alt={project.alt} 
                    className="w-full h-full object-cover object-top transition-transform duration-[1.5s] group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none"></div>
                
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span className="text-[7px] md:text-[8px] font-mono font-bold text-white uppercase tracking-[0.4em] bg-black/40 backdrop-blur-md px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-white/10">
                        View_Live_Deployment
                    </span>
                </div>
            </div>
        </a>
    </m.div>
);

const Portfolio: React.FC = () => {
    const [visibleCount, setVisibleCount] = useState(6);
    const visibleProjects = useMemo(() => portfolioProjects.slice(0, visibleCount), [visibleCount]);
    const handleLoadMore = () => setVisibleCount(prev => prev + 6);

    return (
        <div className="min-h-screen bg-white text-zinc-900 selection:bg-red-600/10 pt-0 pb-1 overflow-hidden">
           <Helmet>

  {/* ================= BASIC SEO ================= */}
  <html lang="en-IN" />

  {/* FIXED: Title broadened to include UK, matches og:title and twitter:title */}
  <title>Web Design Portfolio | Client Projects & Case Studies | VGot You – Karur, India</title>

  <meta
    name="description"
    content="Explore VGot You's web design portfolio — websites, branding, e-commerce and digital projects built for businesses across India and the UK. Based in Karur, Tamil Nadu."
  />

  {/* No meta keywords — Google ignores them */}

  <meta name="author" content="VGot You" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://www.vgotyou.com/portfolio" />

  {/* ================= HREFLANG ================= */}
  <link rel="alternate" hrefLang="en-IN" href="https://www.vgotyou.com/portfolio" />
  <link rel="alternate" hrefLang="en-GB" href="https://www.vgotyou.com/portfolio" />
  <link rel="alternate" hrefLang="x-default" href="https://www.vgotyou.com/portfolio" />

  {/* ================= OPEN GRAPH ================= */}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="VGot You" />
  {/* FIXED: og:title now matches <title> exactly */}
  <meta property="og:title" content="Web Design Portfolio | Client Projects & Case Studies | VGot You – Karur, India" />
  <meta
    property="og:description"
    content="Explore VGot You's web design portfolio — websites, branding, e-commerce and digital projects built for businesses across India and the UK. Based in Karur, Tamil Nadu."
  />
  <meta property="og:url" content="https://www.vgotyou.com/portfolio" />
  {/* FIXED: Consistent og-home.png, removed vgotyou.png */}
  <meta property="og:image" content="https://www.vgotyou.com/assets/og-home.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  {/* FIXED: og:image:alt was missing */}
  <meta property="og:image:alt" content="VGot You Web Design Portfolio – Client Projects from India & UK" />
  {/* FIXED: og:locale was missing */}
  <meta property="og:locale" content="en_IN" />
  <meta property="og:locale:alternate" content="en_GB" />

  {/* ================= TWITTER / X ================= */}
  <meta name="twitter:card" content="summary_large_image" />
  {/* FIXED: twitter:title now matches <title> exactly */}
  <meta name="twitter:title" content="Web Design Portfolio | Client Projects & Case Studies | VGot You – Karur, India" />
  <meta
    name="twitter:description"
    content="Explore VGot You's web design portfolio — websites, branding, e-commerce and digital projects built for businesses across India and the UK."
  />
  <meta name="twitter:image" content="https://www.vgotyou.com/assets/og-home.png" />
  {/* FIXED: twitter:site and twitter:creator were missing */}
  <meta name="twitter:site" content="@vgotyou" />
  <meta name="twitter:creator" content="@vgotyou" />

  {/* ================= SCHEMA: COLLECTION PAGE ================= */}
  {/*
    FIXED:
    - Added @id, url, inLanguage, publisher
    - Linked properly into website schema graph via isPartOf
  */}
  <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://www.vgotyou.com/portfolio#webpage",
      "url": "https://www.vgotyou.com/portfolio",
      "name": "Web Design Portfolio | Client Projects & Case Studies | VGot You",
      "description": "Portfolio of web design, branding, e-commerce, and digital projects by VGot You, based in Karur, Tamil Nadu, serving clients across India and the UK.",
      "inLanguage": "en-IN",
      "isPartOf": {
        "@id": "https://www.vgotyou.com/#website"
      },
      "publisher": {
        "@id": "https://www.vgotyou.com/#organization"
      }
    }
  `}</script>

  {/* ================= SCHEMA: ITEM LIST ================= */}
  {/*
    ADDED: ItemList with all 10 portfolio projects as CreativeWork entries.
    This is a major SEO opportunity — Google can surface individual
    projects in search results and image search directly.
    Each project links to its live URL as the primary reference.
  */}
  <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": "https://www.vgotyou.com/portfolio#itemlist",
      "name": "VGot You Web Design Portfolio",
      "description": "A curated list of web design, branding, and digital projects delivered by VGot You.",
      "url": "https://www.vgotyou.com/portfolio",
      "numberOfItems": 10,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "CreativeWork",
            "name": "Rudhraa Exim",
            "description": "B2B export and import company website designed by VGot You.",
            "url": "https://rudhraaexportsandimports.com/",
            "image": "https://www.vgotyou.com/assets/portfolio/9.jpg",
            "creator": { "@id": "https://www.vgotyou.com/#organization" },
            "genre": "B2B Exports"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "CreativeWork",
            "name": "Oskar",
            "description": "Freelancer portfolio and services website designed by VGot You.",
            "url": "https://oskardesigner.netlify.app/",
            "image": "https://www.vgotyou.com/assets/portfolio/1.jpg",
            "creator": { "@id": "https://www.vgotyou.com/#organization" },
            "genre": "Freelancer Portfolio"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "CreativeWork",
            "name": "Bloomgreen Developers",
            "description": "Construction and interior design company website by VGot You.",
            "url": "https://bloomgreendevs.netlify.app/",
            "image": "https://www.vgotyou.com/assets/portfolio/4.jpg",
            "creator": { "@id": "https://www.vgotyou.com/#organization" },
            "genre": "Construction & Interior"
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "@type": "CreativeWork",
            "name": "Akshaya Travels",
            "description": "Tours and travels booking and services website by VGot You.",
            "url": "https://akshayatoursandtravels.com/",
            "image": "https://www.vgotyou.com/assets/portfolio/8.jpg",
            "creator": { "@id": "https://www.vgotyou.com/#organization" },
            "genre": "Travel Services"
          }
        },
        {
          "@type": "ListItem",
          "position": 5,
          "item": {
            "@type": "CreativeWork",
            "name": "eNno",
            "description": "Web design and digital marketing service provider website by VGot You.",
            "url": "https://ennodesign.netlify.app/",
            "image": "https://www.vgotyou.com/assets/portfolio/2.jpg",
            "creator": { "@id": "https://www.vgotyou.com/#organization" },
            "genre": "Service Provider"
          }
        },
        {
          "@type": "ListItem",
          "position": 6,
          "item": {
            "@type": "CreativeWork",
            "name": "VesaHomes",
            "description": "Home textile e-commerce website designed by VGot You.",
            "url": "https://vesahomes.com/",
            "image": "https://www.vgotyou.com/assets/portfolio/7.jpg",
            "creator": { "@id": "https://www.vgotyou.com/#organization" },
            "genre": "E-commerce"
          }
        },
        {
          "@type": "ListItem",
          "position": 7,
          "item": {
            "@type": "CreativeWork",
            "name": "Destech Industry",
            "description": "B2B industrial services website designed by VGot You.",
            "url": "https://destechindustry.netlify.app/",
            "image": "https://www.vgotyou.com/assets/portfolio/3.jpg",
            "creator": { "@id": "https://www.vgotyou.com/#organization" },
            "genre": "B2B Services"
          }
        },
        {
          "@type": "ListItem",
          "position": 8,
          "item": {
            "@type": "CreativeWork",
            "name": "Arctic Textiles",
            "description": "B2B textile manufacturing company website by VGot You — serving Karur textile industry.",
            "url": "https://arctictextiles.com/",
            "image": "https://www.vgotyou.com/assets/portfolio/10.jpg",
            "creator": { "@id": "https://www.vgotyou.com/#organization" },
            "genre": "B2B Manufacturing"
          }
        },
        {
          "@type": "ListItem",
          "position": 9,
          "item": {
            "@type": "CreativeWork",
            "name": "INDICO",
            "description": "Construction and real estate company website designed by VGot You.",
            "url": "https://indicobuilds.netlify.app/",
            "image": "https://www.vgotyou.com/assets/portfolio/5.jpg",
            "creator": { "@id": "https://www.vgotyou.com/#organization" },
            "genre": "Construction & Real Estate"
          }
        },
        {
          "@type": "ListItem",
          "position": 10,
          "item": {
            "@type": "CreativeWork",
            "name": "Violet Store",
            "description": "Fashion and retail e-commerce website designed by VGot You.",
            "url": "https://violet-scorpion-690121.hostingersite.com/",
            "image": "https://www.vgotyou.com/assets/portfolio/6.jpg",
            "creator": { "@id": "https://www.vgotyou.com/#organization" },
            "genre": "E-commerce"
          }
        }
      ]
    }
  `}</script>

  {/* ================= SCHEMA: BREADCRUMB ================= */}
  {/* ADDED: Was completely missing */}
  <script type="application/ld+json">{`
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.vgotyou.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Portfolio",
          "item": "https://www.vgotyou.com/portfolio"
        }
      ]
    }
  `}</script>

</Helmet>
            <style>{`
                .bg-dots {
                    background-image: radial-gradient(circle, #000 1px, transparent 1px);
                    background-size: 30px 30px;
                }
                .bg-grid-technical {
                    background-image: linear-gradient(to right, #00000005 1px, transparent 1px),
                                      linear-gradient(to bottom, #00000005 1px, transparent 1px);
                    background-size: 50px 50px;
                }
                @keyframes scanline-slow {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                .scanline-ui {
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 2px;
                    background: linear-gradient(to right, transparent, rgba(220,38,38,0.05), transparent);
                    animation: scanline-slow 8s linear infinite;
                    pointer-events: none;
                }
            `}</style>

            {/* Enhanced Hero Section with Patterns & Technical Language */}
            <section className="px-6 pt-32 pb-12 md:pt-44 md:pb-24 relative overflow-hidden bg-zinc-50/50 border-b border-zinc-100">
                {/* Patterns Layer */}
                <div className="absolute inset-0 bg-grid-technical pointer-events-none"></div>
                <div className="absolute inset-0 bg-dots pointer-events-none opacity-[0.03]"></div>
                <div className="scanline-ui"></div>
                
                {/* Visual Depth Elements */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/[0.02] rounded-full blur-[100px] pointer-events-none -translate-x-1/4 translate-y-1/4"></div>

                {/* Technical Markers (SVG Brackets) */}
                <svg className="absolute top-8 left-8 w-16 h-16 text-zinc-100 pointer-events-none" viewBox="0 0 100 100" fill="none">
                    <path d="M0 20 V0 H20" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <svg className="absolute top-8 right-8 w-16 h-16 text-zinc-100 pointer-events-none rotate-90" viewBox="0 0 100 100" fill="none">
                    <path d="M0 20 V0 H20" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <svg className="absolute bottom-8 left-8 w-16 h-16 text-zinc-100 pointer-events-none -rotate-90" viewBox="0 0 100 100" fill="none">
                    <path d="M0 20 V0 H20" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <svg className="absolute bottom-8 right-8 w-16 h-16 text-zinc-100 pointer-events-none rotate-180" viewBox="0 0 100 100" fill="none">
                    <path d="M0 20 V0 H20" stroke="currentColor" strokeWidth="1.5" />
                </svg>

                {/* Floating Crosshairs */}
                <div className="absolute top-[20%] left-[15%] w-4 h-4 text-zinc-200 pointer-events-none hidden md:block">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M10 0V20M0 10H20"/></svg>
                </div>
                <div className="absolute bottom-[30%] right-[10%] w-4 h-4 text-zinc-200 pointer-events-none hidden md:block">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M10 0V20M0 10H20"/></svg>
                </div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    <m.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Link to="/" className="text-red-600 text-[10px] font-mono font-black uppercase tracking-[0.5em] mb-4 block hover:text-red-700 transition-colors">
                        VGot_You </Link>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] mb-8 text-zinc-900">
                            Web Design <span className="text-red-600">Portfolio.</span>
                        </h1>
                        <div className="h-[1px] w-24 bg-red-600 mb-8 shadow-[0_0_15px_rgba(220,38,38,0.4)]"></div>
                        <p className="text-zinc-700 text-sm md:text-lg max-w-3xl leading-relaxed font-light mb-4">
                            Welcome to our digital repository. This space showcases a collection of websites, branding, and digital marketing projects we’ve built for clients across Tamil Nadu and beyond.
                        </p>
                        <p className="text-zinc-400 text-xs md:text-sm max-w-2xl leading-relaxed font-mono uppercase tracking-widest opacity-80 border-t border-zinc-100 pt-6">
                            Each entry represents a unique solution in web engineering, SEO infrastructure, and logical branding. Filtered for high-impact performance and structural integrity.
                        </p>
                    </m.div>
                </div>
            </section>

            {/* Project Grid Section */}
            <section className="px-6 py-10 md:py-24 relative bg-white">
                <div className="absolute inset-0 bg-dots opacity-[0.02] pointer-events-none"></div>
                <div className="absolute left-[-10%] bottom-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="container mx-auto max-w-7xl">
                    {/* SEO Heading for the Grid */}
                    <div className="mb-12 md:mb-24">
                        <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900 leading-tight">
                            Client Web Design Projects <br/>
                            <span className="text-zinc-300">& Case Studies</span>
                        </h2>
                        <div className="mt-6 w-16 h-1 bg-red-600"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14 lg:gap-16">
                        <AnimatePresence mode="popLayout">
                            {visibleProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Load More Button */}
                    {visibleCount < portfolioProjects.length && (
                        <m.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-20 md:mt-32 flex flex-col items-center gap-6"
                        >
                            <div className="h-[1px] w-12 bg-zinc-200"></div>
                            <button 
                                onClick={handleLoadMore}
                                className="group relative flex items-center gap-6 px-12 py-5 border border-zinc-200 hover:border-red-600 hover:text-red-600 transition-all text-[11px] font-black uppercase tracking-[0.4em] active:scale-95 bg-white shadow-xl hover:shadow-red-600/10 rounded-full overflow-hidden"
                            >
                                <span className="relative z-10">View_more</span>
                                <div className="relative z-10 w-2 h-2 rounded-full bg-red-600 group-hover:scale-150 transition-transform duration-500"></div>
                            </button>
                        </m.div>
                    )}
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-4 md:py-12 px-6 text-center relative overflow-hidden bg-white text-gray-900 border-t border-zinc-50">
                <div className="container mx-auto max-w-5xl relative z-10">
                    <span className="text-red-600 text-[10px] font-mono font-black uppercase tracking-[0.5em] mb-5 block">
                        Ready_For_Deployment?
                    </span>
                    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tight mb-14 leading-[0.9]">
                        Build Your <br/>
                        <span className="text-gray-500">Digital Legacy.</span>
                    </h2>
                    <Link
                        to="/contact"
                        className="bg-red-600 text-white px-14 py-5 font-bold text-sm uppercase tracking-[0.3em] hover:bg-zinc-900 transition-all inline-block rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95"
                    >
                        Start Your Project
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
