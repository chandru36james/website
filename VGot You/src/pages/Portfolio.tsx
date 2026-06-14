import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as ReactRouterDOM from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
const { Link } = ReactRouterDOM as any;
const m = motion as any;


interface LocalProject {
    id: string;
    title: string;
    category: string;
    imageUrl: string;
    liveUrl?: string;
    alt: string;
    filterGroup: 'corporate' | 'ecommerce' | 'services';
}

const portfolioProjects: LocalProject[] = [
    {
        id: '1',
        title: 'Rudhraa Exim',
        category: 'B2B Exports',
        imageUrl: '/assets/portfolio/9.jpg',
        liveUrl: 'https://rudhraaexportsandimports.com/',
        alt: 'Rudhraa Exim B2B export and import company website',
        filterGroup: 'corporate'
    },
    {
        id: '2',
        title: 'Oskar',
        category: 'Freelancer',
        imageUrl: '/assets/portfolio/1.jpg',
        liveUrl: 'https://oskardesigner.netlify.app/',
        alt: 'freelance services website designer portfolio',
        filterGroup: 'services'
    },
    {
        id: '3',
        title: 'Bloomgreen Developers',
        category: 'Construction & Interior',
        imageUrl: '/assets/portfolio/4.jpg',
        liveUrl: 'https://bloomgreendevs.netlify.app/',
        alt: 'Bloomgreen Developers construction and interior design website',
        filterGroup: 'services'
    },
    {
        id: '4',
        title: 'Akshaya Travels',
        category: 'Travels Services',
        imageUrl: '/assets/portfolio/8.jpg',
        liveUrl: 'https://akshayatoursandtravels.com/',
        alt: 'Akshaya Tours and Travels booking and services website',
        filterGroup: 'services'
    },
    {
        id: '5',
        title: 'eNno',
        category: 'Service Provider',
        imageUrl: '/assets/portfolio/2.jpg',
        liveUrl: 'https://ennodesign.netlify.app/',
        alt: 'web design and digital marketing service provider website',
        filterGroup: 'services'
    },
    {
        id: '6',
        title: 'VesaHomes',
        category: 'E-commerce',
        imageUrl: '/assets/portfolio/7.jpg',
        liveUrl: 'https://vesahomes.com/',
        alt: 'VesaHomes home textile website',
        filterGroup: 'ecommerce'
    },
    {
        id: '7',
        title: 'Destech Industry',
        category: 'B2B Services',
        imageUrl: '/assets/portfolio/3.jpg',
        liveUrl: 'https://destechindustry.netlify.app/',
        alt: 'Destech Industry B2B industrial services website',
        filterGroup: 'corporate'
    },
    {
        id: '8',
        title: 'Arctic Textiles',
        category: 'B2B Manufacturing',
        imageUrl: '/assets/portfolio/10.jpg',
        liveUrl: 'https://arctictextiles.com/',
        alt: 'Arctic Textiles B2B textile manufacturing company website',
        filterGroup: 'corporate'
    },
    {
        id: '9',
        title: 'INDICO',
        category: 'Construction & Real Estate',
        imageUrl: '/assets/portfolio/5.jpg',
        liveUrl: 'https://indicobuilds.netlify.app/',
        alt: 'INDICO construction and real estate company website',
        filterGroup: 'services'
    },
    {
        id: '10',
        title: 'Violet Store',
        category: 'E-commerce',
        imageUrl: '/assets/portfolio/6.jpg',
        liveUrl: 'https://violet-scorpion-690121.hostingersite.com/',
        alt: 'Violet Store ecommerce fashion and retail website',
        filterGroup: 'ecommerce'
    },
    {
        id: '11',
        title: 'Advocate Ranjith',
        category: 'Legal Services',
        imageUrl: '/assets/portfolio/11.jpg',
        liveUrl: 'https://advocateranjith.netlify.app/',
        alt: 'Advocate Ranjith legal services website',
        filterGroup: 'services'
    }
];

// --- Project Card (unchanged) ---
const ProjectCard = React.forwardRef<HTMLDivElement, { project: LocalProject; index: number }>(
    ({ project, index }, ref) => (
        <m.div
            ref={ref}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="group relative"
        >
            <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 rounded-[10px]"
            >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-800/40 dark:to-zinc-900/60 rounded-[10px] shadow-sm transition-all duration-500 ease-out group-hover:shadow-xl group-hover:shadow-zinc-200/50 dark:group-hover:shadow-black/30 group-hover:-translate-y-1">
                    <img 
                        src={project.imageUrl} 
                        alt={project.alt} 
                        className="w-full h-full object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="mt-5 px-1 flex justify-between items-start gap-3">
                    <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 transition-colors duration-300 group-hover:text-red-600 dark:group-hover:text-red-400 truncate">
                            {project.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            <span className="text-[11px] sm:text-xs font-mono font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                {project.category}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                            <span className="text-[11px] sm:text-xs font-mono text-zinc-400 dark:text-zinc-500">
                                Live Project
                            </span>
                        </div>
                    </div>
                    
                    <div className="w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 flex items-center justify-center shrink-0 text-zinc-500 group-hover:text-white group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300 ease-out shadow-sm group-hover:shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H9M17 7V15" />
                        </svg>
                    </div>
                </div>
            </a>
        </m.div>
    )
);
ProjectCard.displayName = "ProjectCard";

// --- Main Portfolio Component ---
const Portfolio: React.FC = () => {
    const [visibleCount, setVisibleCount] = useState(6);
    const [activeFilter, setActiveFilter] = useState<'All' | 'corporate' | 'ecommerce' | 'services'>('All');

    const filterCounts = useMemo(() => {
        return {
            All: portfolioProjects.length,
            corporate: portfolioProjects.filter(p => p.filterGroup === 'corporate').length,
            ecommerce: portfolioProjects.filter(p => p.filterGroup === 'ecommerce').length,
            services: portfolioProjects.filter(p => p.filterGroup === 'services').length,
        };
    }, []);

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'All') return portfolioProjects;
        return portfolioProjects.filter(p => p.filterGroup === activeFilter);
    }, [activeFilter]);

    const visibleProjects = useMemo(() => {
        return filteredProjects.slice(0, visibleCount);
    }, [filteredProjects, visibleCount]);

    const handleLoadMore = () => setVisibleCount(prev => prev + 6);

    const handleFilterChange = (filter: 'All' | 'corporate' | 'ecommerce' | 'services') => {
        setActiveFilter(filter);
        setVisibleCount(6);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 selection:bg-red-500/10 transition-colors duration-300 overflow-x-hidden">
            <Header />
            <Helmet>
                <html lang="en-IN" />
                <title>Web Design Portfolio | Client Projects & Case Studies | VGot You – Karur, India</title>
                <meta name="description" content="Explore VGot You's web design portfolio — websites, branding, e-commerce and digital projects built for businesses across India and the UK. Based in Karur, Tamil Nadu." />
                <meta name="author" content="VGot You" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://www.vgotyou.com/portfolio" />
                <link rel="alternate" hrefLang="en-IN" href="https://www.vgotyou.com/portfolio" />
                <link rel="alternate" hrefLang="en-GB" href="https://www.vgotyou.com/portfolio" />
                <link rel="alternate" hrefLang="x-default" href="https://www.vgotyou.com/portfolio" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="VGot You" />
                <meta property="og:title" content="Web Design Portfolio | Client Projects & Case Studies | VGot You – Karur, India" />
                <meta property="og:description" content="Explore VGot You's web design portfolio — websites, branding, e-commerce and digital projects built for businesses across India and the UK." />
                <meta property="og:url" content="https://www.vgotyou.com/portfolio" />
                <meta property="og:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="VGot You Web Design Portfolio – Client Projects from India & UK" />
                <meta property="og:locale" content="en_IN" />
                <meta property="og:locale:alternate" content="en_GB" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Web Design Portfolio | Client Projects & Case Studies | VGot You – Karur, India" />
                <meta name="twitter:description" content="Explore VGot You's web design portfolio — websites, branding, e-commerce and digital projects built for businesses across India and the UK." />
                <meta name="twitter:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
                <meta name="twitter:site" content="@vgotyou" />
                <meta name="twitter:creator" content="@vgotyou" />
                <script type="application/ld+json">{`
                    {
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        "@id": "https://www.vgotyou.com/portfolio#webpage",
                        "url": "https://www.vgotyou.com/portfolio",
                        "name": "Web Design Portfolio | Client Projects & Case Studies | VGot You",
                        "description": "Portfolio of web design, branding, e-commerce, and digital projects by VGot You, based in Karur, Tamil Nadu, serving clients across India and the UK.",
                        "inLanguage": "en-IN",
                        "isPartOf": { "@id": "https://www.vgotyou.com/#website" },
                        "publisher": { "@id": "https://www.vgotyou.com/#organization" }
                    }
                `}</script>
                <script type="application/ld+json">{`
                    {
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "@id": "https://www.vgotyou.com/portfolio#itemlist",
                        "name": "VGot You Web Design Portfolio",
                        "description": "A curated list of web design, branding, and digital projects delivered by VGot You.",
                        "url": "https://www.vgotyou.com/portfolio",
                        "numberOfItems": 11,
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "item": { "@type": "CreativeWork", "name": "Rudhraa Exim", "description": "B2B export and import company website designed by VGot You.", "url": "https://rudhraaexportsandimports.com/", "image": "https://www.vgotyou.com/assets/portfolio/9.jpg", "creator": { "@id": "https://www.vgotyou.com/#organization" }, "genre": "B2B Exports" } },
                            { "@type": "ListItem", "position": 2, "item": { "@type": "CreativeWork", "name": "Oskar", "description": "Freelancer portfolio and services website designed by VGot You.", "url": "https://oskardesigner.netlify.app/", "image": "https://www.vgotyou.com/assets/portfolio/1.jpg", "creator": { "@id": "https://www.vgotyou.com/#organization" }, "genre": "Freelancer Portfolio" } },
                            { "@type": "ListItem", "position": 3, "item": { "@type": "CreativeWork", "name": "Bloomgreen Developers", "description": "Construction and interior design company website by VGot You.", "url": "https://bloomgreendevs.netlify.app/", "image": "https://www.vgotyou.com/assets/portfolio/4.jpg", "creator": { "@id": "https://www.vgotyou.com/#organization" }, "genre": "Construction & Interior" } },
                            { "@type": "ListItem", "position": 4, "item": { "@type": "CreativeWork", "name": "Akshaya Travels", "description": "Tours and travels booking and services website by VGot You.", "url": "https://akshayatoursandtravels.com/", "image": "https://www.vgotyou.com/assets/portfolio/8.jpg", "creator": { "@id": "https://www.vgotyou.com/#organization" }, "genre": "Travel Services" } },
                            { "@type": "ListItem", "position": 5, "item": { "@type": "CreativeWork", "name": "eNno", "description": "Web design and digital marketing service provider website by VGot You.", "url": "https://ennodesign.netlify.app/", "image": "https://www.vgotyou.com/assets/portfolio/2.jpg", "creator": { "@id": "https://www.vgotyou.com/#organization" }, "genre": "Service Provider" } },
                            { "@type": "ListItem", "position": 6, "item": { "@type": "CreativeWork", "name": "VesaHomes", "description": "Home textile e-commerce website designed by VGot You.", "url": "https://vesahomes.com/", "image": "https://www.vgotyou.com/assets/portfolio/7.jpg", "creator": { "@id": "https://www.vgotyou.com/#organization" }, "genre": "E-commerce" } },
                            { "@type": "ListItem", "position": 7, "item": { "@type": "CreativeWork", "name": "Destech Industry", "description": "B2B industrial services website designed by VGot You.", "url": "https://destechindustry.netlify.app/", "image": "https://www.vgotyou.com/assets/portfolio/3.jpg", "creator": { "@id": "https://www.vgotyou.com/#organization" }, "genre": "B2B Services" } },
                            { "@type": "ListItem", "position": 8, "item": { "@type": "CreativeWork", "name": "Arctic Textiles", "description": "B2B textile manufacturing company website by VGot You — serving Karur textile industry.", "url": "https://arctictextiles.com/", "image": "https://www.vgotyou.com/assets/portfolio/10.jpg", "creator": { "@id": "https://www.vgotyou.com/#organization" }, "genre": "B2B Manufacturing" } },
                            { "@type": "ListItem", "position": 9, "item": { "@type": "CreativeWork", "name": "INDICO", "description": "Construction and real estate company website designed by VGot You.", "url": "https://indicobuilds.netlify.app/", "image": "https://www.vgotyou.com/assets/portfolio/5.jpg", "creator": { "@id": "https://www.vgotyou.com/#organization" }, "genre": "Construction & Real Estate" } },
                            { "@type": "ListItem", "position": 10, "item": { "@type": "CreativeWork", "name": "Violet Store", "description": "Fashion and retail e-commerce website designed by VGot You.", "url": "https://violet-scorpion-690121.hostingersite.com/", "image": "https://www.vgotyou.com/assets/portfolio/6.jpg", "creator": { "@id": "https://www.vgotyou.com/#organization" }, "genre": "E-commerce" } },
                            { "@type": "ListItem", "position": 11, "item": { "@type": "CreativeWork", "name": "Ranjith Advocate", "description": "Legal services website for Advocate Ranjith.", "url": "https://advocateranjith.netlify.app/", "image": "https://www.vgotyou.com/assets/portfolio/11.jpg", "creator": { "@id": "https://www.vgotyou.com/#organization" }, "genre": "Legal Services" } }
                        ]
                    }
                `}</script>
                <script type="application/ld+json">{`
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.vgotyou.com/" },
                            { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://www.vgotyou.com/portfolio" }
                        ]
                    }
                `}</script>
            </Helmet>

            {/* --- HERO SECTION: Pure Typographic Masterpiece --- */}
            <section className="relative px-6 pt-28 pb-16 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32 bg-white dark:bg-zinc-950 overflow-hidden" id="portfolio-hero">
                {/* Soft ambient background gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-500/[0.06] via-transparent to-transparent dark:from-red-950/[0.12] dark:via-transparent dark:to-transparent pointer-events-none" />
                
                <div className="container mx-auto max-w-4xl relative z-10 text-center">
                    <m.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link 
                            to="/" 
                            className="inline-flex items-center gap-2 text-red-600 dark:text-red-500 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] mb-6 hover:opacity-80 transition-opacity"
                            id="portfolio-hero-breadcrumb"
                        >
                            <span>← VGot You Studio</span>
                        </Link>
                        
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-[0.95] text-zinc-900 dark:text-white mb-6">
                            Selected <br className="sm:hidden" />
                            <span className="text-red-600 bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Works</span>
                        </h1>
                        
                        <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto font-medium">
                            A curated repository of websites, branding, e-commerce platforms, and custom digital software built for clients across India and the UK.
                        </p>
                    </m.div>
                </div>
                
                {/* Aesthetic bottom divider line */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200/80 dark:via-zinc-800/60 to-transparent" />
            </section>

            {/* --- FILTER & GRID SECTION --- */}
            <section className="px-6 py-12 md:py-20 bg-white dark:bg-zinc-950 transition-colors duration-300">
                <div className="container mx-auto max-w-6xl">
                    {/* Filter Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12 md:mb-16 pb-2 border-b border-zinc-100 dark:border-zinc-900">
                        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-8 gap-y-4 w-full">
                            {[
                                { id: 'All', label: 'All Projects' },
                                { id: 'corporate', label: 'B2B & Corporate' },
                                { id: 'ecommerce', label: 'E-Commerce' },
                                { id: 'services', label: 'Services & Retail' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleFilterChange(tab.id as any)}
                                    className={`relative text-[13px] sm:text-sm font-medium uppercase tracking-wide pb-3 transition-all duration-300 focus:outline-none ${
                                        activeFilter === tab.id
                                            ? 'text-red-600 dark:text-red-500 font-semibold'
                                            : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                                    }`}
                                >
                                    <span className="flex items-center gap-1.5">
                                        {tab.label}
                                        <span className="text-[11px] font-mono opacity-70">
                                            ({filterCounts[tab.id as keyof typeof filterCounts]})
                                        </span>
                                    </span>
                                    {activeFilter === tab.id && (
                                        <m.div 
                                            layoutId="activeFilterIndicator"
                                            className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-red-600 dark:bg-red-500 rounded-full"
                                            transition={{ type: "spring", stiffness: 400, damping: 35 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                        
                        <div className="text-[11px] font-mono font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider bg-zinc-50 dark:bg-zinc-900/50 px-3 py-1.5 rounded-full self-start sm:self-auto">
                            Showing {filteredProjects.length} of {portfolioProjects.length} total works
                        </div>
                    </div>

                    {/* Project Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
                        <AnimatePresence mode="popLayout">
                            {visibleProjects.map((project, idx) => (
                                <ProjectCard key={project.id} project={project} index={idx} />
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Load More */}
                    {visibleCount < filteredProjects.length && (
                        <m.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-16 md:mt-24 flex justify-center"
                        >
                            <button 
                                onClick={handleLoadMore}
                                className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-transparent border-2 border-zinc-200 dark:border-zinc-800 hover:border-red-500 dark:hover:border-red-500 rounded-[10px] text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 hover:shadow-md active:scale-95 overflow-hidden"
                            >
                                <span>Load More Works</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </m.div>
                    )}
                </div>
            </section>

            {/* --- CTA SECTION --- */}
            <section className="relative py-20 md:py-32 px-6 text-center bg-gradient-to-b from-white to-zinc-50/80 dark:from-zinc-950 dark:to-zinc-900/30 border-t border-zinc-100 dark:border-zinc-900/50">
                <div className="container mx-auto max-w-4xl relative z-10">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-red-600 text-[11px] font-mono font-extrabold uppercase tracking-[0.3em] mb-5 inline-block">
                            Start a conversation
                        </span>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight mb-8 leading-[1.15] text-zinc-900 dark:text-white">
                            Ready to build your <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500">digital milestone?</span>
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400 text-base max-w-xl mx-auto mb-12">
                            Let’s collaborate to create a powerful digital presence that sets you apart.
                        </p>
                        <Link
                            to="/contact?message=Hi VGot You, I've seen your portfolio and I'm interested in starting a project."
                            className="w-[180px] sm:w-[195px] inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-[10px] transition-all duration-300 text-[11px] sm:text-xs uppercase tracking-wider shadow-lg shadow-red-600/20 active:scale-95 group"
                        >
                            Start Your Project
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </m.div>
                </div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-500/5 rounded-full blur-2xl -z-0" />
            </section>
            
            <Footer />
        </div>
    );
};

export default Portfolio;