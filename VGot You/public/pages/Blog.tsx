import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { blogs } from '../lib/data';
import { Helmet } from "react-helmet";   // ✅ SEO
// FIX: Cast motion to any to resolve IntrinsicAttributes prop errors for motion components
const m = motion as any;

const categories = ['All', 'Case Study', 'E-commerce', 'Branding', 'Strategy'];

const Blog: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredPosts = activeCategory === 'All' 
        ? blogs 
        : blogs.filter(post => post.category === activeCategory);

    return (
        <main className="min-h-screen bg-[#020202] text-white selection:bg-red-600/30 overflow-x-hidden pt-24 pb-32">
            <style>{`
                .text-technical { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
                @keyframes scanline {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                .scanline {
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 1px;
                    background: linear-gradient(to right, transparent, #dc2626, transparent);
                    animation: scanline 3s linear infinite;
                    z-index: 10;
                    opacity: 0;
                }
                .group:hover .scanline { opacity: 1; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
            <Helmet>
  {/* ================= BASIC SEO ================= */}
  <title>VGot You Blog | Web Design, SEO & Digital Growth Insights</title>

  <meta
    name="description"
    content="Explore in-depth case studies, web design insights, SEO strategies, and branding guides by VGot You, a digital agency in Karur, Tamil Nadu helping businesses grow online."
  />

  <link rel="canonical" href="https://www.vgotyou.com/blog" />
  <meta name="robots" content="index, follow" />

  {/* ================= OPEN GRAPH ================= */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="VGot You Blog | Digital Marketing & Web Design Insights" />
  <meta
    property="og:description"
    content="Actionable insights on web design, SEO, branding, and online business growth by VGot You."
  />
  <meta
    property="og:image"
    content="https://www.vgotyou.com/assets/logo.png"
  />
  <meta property="og:url" content="https://www.vgotyou.com/blog" />
  <meta property="og:site_name" content="VGot You" />
  <meta property="og:locale" content="en_IN" />

  {/* ================= TWITTER ================= */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="VGot You Blog | Web Design & SEO Knowledge Hub" />
  <meta
    name="twitter:description"
    content="Latest articles on web design, SEO, branding, and digital marketing by VGot You."
  />
  <meta
    name="twitter:image"
    content="https://www.vgotyou.com/assets/logo.png"
  />

  {/* ================= BLOG PAGE SCHEMA ================= */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": "https://www.vgotyou.com/blog#blog",
      name: "VGot You Blog",
      url: "https://www.vgotyou.com/blog",
      description:
        "Expert blog by VGot You covering web design, SEO, branding, digital marketing, and online business growth.",
      publisher: {
        "@type": "Organization",
        name: "VGot You",
        url: "https://www.vgotyou.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.vgotyou.com/assets/logo.png"
        }
      },
      about: {
        "@type": "Service",
        name: "Web Design, SEO & Digital Marketing",
        provider: {
          "@type": "LocalBusiness",
          name: "VGot You",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Karur",
            addressRegion: "Tamil Nadu",
            addressCountry: "IN"
          }
        }
      }
    })}
  </script>
</Helmet>


            {/* Header Section */}
            <section className="relative px-6 pt-16 pb-20 border-b border-zinc-900 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-600/5 to-transparent pointer-events-none"></div>
                
                <div className="container mx-auto max-w-7xl relative z-10">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-3 py-1 mb-4 border border-zinc-800 rounded-sm bg-black/50 text-technical text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-zinc-500">
                            Archive v.4.0 / Knowledge_Base
                        </span>
                        <h1 className="sr-only">
                        VGot You Blog – Web Design, SEO, Branding & Digital Growth Case Studies
                        </h1>

                        <h1 className="text-[14vw] sm:text-[10vw] md:text-[7vw] font-black leading-[0.85] tracking-tighter uppercase mb-6">
                            The <br/>
                            <span className="text-zinc-800">Journal</span>
                        </h1>
                        <p className="text-zinc-500 max-w-xl text-base md:text-lg font-light leading-relaxed">
                            A collection of technical case studies and digital growth strategies from the VGot You laboratory.
                        </p>
                    </m.div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="sticky top-[72px] md:top-[80px] z-40 bg-black/80 backdrop-blur-md border-b border-zinc-900 overflow-hidden">
                <div className="container mx-auto max-w-7xl relative">
                    <div className="px-6 py-4 flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth">
                        <span className="text-technical text-[8px] uppercase tracking-widest text-red-600 mr-2 font-bold whitespace-nowrap">Node:</span>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`text-technical text-[10px] uppercase tracking-[0.2em] whitespace-nowrap transition-all px-4 py-2 rounded-sm border active:scale-95 ${
                                    activeCategory === cat 
                                        ? 'bg-red-600 border-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]' 
                                        : 'border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="container mx-auto max-w-7xl px-4 py-12 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredPosts.map((post, index) => (
                            <m.article
                                key={post.slug}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="group flex flex-col h-full bg-[#080808] border border-zinc-900 hover:border-red-600/30 transition-all duration-500 rounded-sm overflow-hidden active:scale-[0.98] md:active:scale-100"
                            >
                                <div className="flex justify-between items-center px-4 py-3 border-b border-zinc-900 bg-zinc-950/50">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-red-600 group-hover:animate-pulse"></div>
                                        <span className="text-technical text-[8px] tracking-[0.2em] text-zinc-600 uppercase">{post.idCode || 'ENTRY'}</span>
                                    </div>
                                    <span className="text-technical text-[7px] text-zinc-800">READY</span>
                                </div>

                                <Link to={`/blog/${post.slug}`} className="relative aspect-video block overflow-hidden">
                                    <div className="scanline"></div>
                                    <img 
                                        src={post.imageUrl} 
                                        alt={post.title} 
                                        className="w-full h-full object-cover grayscale md:transition-all duration-700 md:group-hover:grayscale-0 md:group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                                    
                                    <div className="absolute bottom-3 left-4 flex gap-4 text-technical text-[7px] text-white/50 tracking-widest uppercase">
                                        <span>{post.readTime || '5 min'}</span>
                                        <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
                                    </div>
                                </Link>

                                <div className="p-5 md:p-6 flex flex-col flex-grow">
                                    <span className="text-technical text-[9px] font-bold text-red-600 uppercase tracking-[0.3em] mb-3 block">
                                        {post.category}
                                    </span>
                                    <h2 className="text-xl font-bold text-white mb-4 leading-tight group-hover:text-red-500 transition-colors">
                                        <Link to={`/blog/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </h2>
                                    <p className="text-zinc-500 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <Link 
                                            to={`/blog/${post.slug}`} 
                                            className="group/btn relative inline-flex items-center gap-3 text-technical text-[9px] font-bold uppercase tracking-[0.3em] text-white hover:text-red-500 transition-colors"
                                        >
                                            Read_Entry
                                            <span className="w-6 h-[1px] bg-zinc-800 group-hover/btn:w-10 group-hover/btn:bg-red-600 transition-all duration-300"></span>
                                        </Link>
                                    </div>
                                </div>
                            </m.article>
                        ))}
                    </AnimatePresence>
                </div>
            </section>
        </main>
    );
};

export default Blog;