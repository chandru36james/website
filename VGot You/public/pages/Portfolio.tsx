
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as ReactRouterDOM from 'react-router-dom';
import { Helmet } from "react-helmet";   // ✅ SEO

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
        title: 'Oskar',
        category: 'Freelancer',
        imageUrl: 'https://www.vgotyou.com/assets/portfolio/1.jpg',
        liveUrl: 'https://oskardesigner.netlify.app/',
        alt: 'freelance services website designer portfolio'
    },
    {
        id: '2',
        title: 'Rudhraa Exim',
        category: 'B2B Exports',
        imageUrl: 'https://www.vgotyou.com/assets/portfolio/9.jpg',
        liveUrl: 'https://rudhraaexportsandimports.com/',
        alt: 'Rudhraa Exim B2B export and import company website'
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="group relative bg-zinc-950 border border-zinc-900 overflow-hidden transition-all duration-300 hover:border-red-600/40"
    >
        <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block h-full"
        >
            <div className="relative aspect-[9/16] overflow-hidden bg-black">
                <img 
                    src={project.imageUrl} 
                    alt={project.alt} 
                    className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="p-5">
                <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-1 group-hover:text-red-500 transition-colors">
                    {project.title}
                </h3>
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.1em]">
                    {project.category}
                </p>
            </div>
        </a>
    </m.div>
);

const Portfolio: React.FC = () => {
    const [visibleCount, setVisibleCount] = useState(6);
    
    const visibleProjects = useMemo(() => {
        return portfolioProjects.slice(0, visibleCount);
    }, [visibleCount]);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 6);
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-red-600/30 pt-24 pb-20">
            <Helmet>
  {/* Primary SEO */}
  <title>
    Portfolio | Web Design, Branding & Digital Projects in India – VGot You
  </title>

  <meta
    name="description"
    content="Explore our portfolio of web design, branding, SEO, and digital marketing projects by VGot You. Helping businesses across India and globally grow through design and strategy."
  />

  <link rel="canonical" href="https://www.vgotyou.com/portfolio" />
  <meta name="robots" content="index, follow" />

  {/* Open Graph */}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="VGot You" />
  <meta
    property="og:title"
    content="Portfolio | Web Design & Digital Projects by VGot You"
  />
  <meta
    property="og:description"
    content="A curated portfolio of web design, branding, SEO, and digital projects delivered by VGot You for growing businesses."
  />
  <meta property="og:url" content="https://www.vgotyou.com/portfolio" />
  <meta
    property="og:image"
    content="https://www.vgotyou.com/assets/vgotyou.png"
  />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  {/* Twitter / X */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta
    name="twitter:title"
    content="Portfolio | VGot You Web Design & Digital Studio"
  />
  <meta
    name="twitter:description"
    content="View selected web design, branding, SEO, and digital projects delivered by VGot You."
  />
  <meta
    name="twitter:image"
    content="https://www.vgotyou.com/assets/vgotyou.png"
  />

  {/* Structured Data */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://www.vgotyou.com/portfolio#collection",
      name: "VGot You Portfolio",
      description:
        "Portfolio of web design, branding, SEO, and digital projects by VGot You.",
      isPartOf: {
        "@id": "https://www.vgotyou.com/#website"
      }
    })}
  </script>
</Helmet>


            <section className="px-6 py-12 md:py-20">
                <div className="container mx-auto max-w-6xl">
                    <m.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-red-600 text-[10px] font-mono font-black uppercase tracking-[0.5em] mb-4 block">Archive_Access</span>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] mb-8">
                            The <span className="text-red-800">Archive.</span>
                        </h1>
                        <div className="h-[1px] w-24 bg-red-600 mb-8"></div>
                        <p className="text-zinc-400 text-sm md:text-lg max-w-3xl leading-relaxed font-light mb-4">
                            Welcome to our digital repository. This space showcases a collection of technical specimens and visual architectures we've deployed for businesses across Tamil Nadu and beyond.
                        </p>
                        <p className="text-zinc-500 text-xs md:text-sm max-w-2xl leading-relaxed font-mono uppercase tracking-widest opacity-80">
                            Each entry represents a unique solution in web engineering, SEO infrastructure, and logical branding. Filtered for high-impact performance and structural integrity.
                        </p>
                    </m.div>
                </div>
            </section>

            <section className="px-6">
                <div className="container mx-auto max-w-5xl">
                    {/* 3-stack grid with gaps, fully responsive */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
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
                            className="mt-20 flex justify-center"
                        >
                            <button 
                                onClick={handleLoadMore}
                                className="group flex items-center gap-4 px-10 py-4 border border-zinc-800 hover:border-red-600 transition-all text-[10px] font-bold uppercase tracking-[0.3em] active:scale-95"
                            >
                                <span>Load_More_Nodes</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-red-600 group-hover:animate-ping"></div>
                            </button>
                        </m.div>
                    )}
                </div>
            </section>

            <section className="py-24 px-6 border-t border-zinc-900 mt-32 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.03)_0%,transparent_70%)] pointer-events-none"></div>
                <div className="container mx-auto max-w-4xl relative z-10">
                    <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-10 leading-none">Ready for <br/><span className="text-zinc-800">Deployment?</span></h2>
                    <Link to="/contact" className="bg-white text-black px-12 py-5 font-bold text-[10px] uppercase tracking-[0.4em] hover:bg-red-600 hover:text-white transition-all inline-block rounded-sm active:scale-95 shadow-xl">
                        Initiate Consultation
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
