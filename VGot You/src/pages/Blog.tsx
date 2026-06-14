import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { blogs as mockBlogs } from '../lib/data';
import { Helmet } from "react-helmet-async";
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as any } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const categories = ['All', 'Case Study', 'E-commerce', 'Branding', 'Strategy'];

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [posts] = useState<any[]>(mockBlogs);

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 selection:bg-red-200 dark:selection:bg-red-800 overflow-x-hidden transition-colors duration-300">
      <Header />

      <main className="flex-grow">
        <Helmet>
          <html lang="en-IN" />
          <title>Blog | Web Design, SEO & Digital Growth Insights | VGot You</title>
          <meta
            name="description"
            content="Explore in-depth case studies, web design insights, SEO strategies, and branding guides by VGot You — a digital agency in Karur, Tamil Nadu helping businesses grow online across India and the UK."
          />
          <meta name="author" content="VGot You" />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://www.vgotyou.com/blog" />
          <link rel="alternate" hrefLang="en-IN" href="https://www.vgotyou.com/blog" />
          <link rel="alternate" hrefLang="en-GB" href="https://www.vgotyou.com/blog" />
          <link rel="alternate" hrefLang="x-default" href="https://www.vgotyou.com/blog" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="VGot You" />
          <meta property="og:title" content="Blog | Web Design, SEO & Digital Growth Insights | VGot You" />
          <meta property="og:description" content="Explore in-depth case studies, web design insights, SEO strategies, and branding guides by VGot You — a digital agency in Karur, Tamil Nadu helping businesses grow online." />
          <meta property="og:url" content="https://www.vgotyou.com/blog" />
          <meta property="og:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="VGot You Blog – Web Design, SEO & Digital Growth Insights" />
          <meta property="og:locale" content="en_IN" />
          <meta property="og:locale:alternate" content="en_GB" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Blog | Web Design, SEO & Digital Growth Insights | VGot You" />
          <meta name="twitter:description" content="In-depth case studies, web design insights, SEO strategies and branding guides by VGot You, Karur." />
          <meta name="twitter:image" content="https://www.vgotyou.com/assets/vgotyou.png" />
          <meta name="twitter:site" content="@vgotyou" />
          <meta name="twitter:creator" content="@vgotyou" />
          <script type="application/ld+json">{`
            {
              "@context": "https://schema.org",
              "@type": "Blog",
              "@id": "https://www.vgotyou.com/blog#blog",
              "url": "https://www.vgotyou.com/blog",
              "name": "VGot You Blog",
              "description": "Expert blog by VGot You covering web design, SEO, branding, digital marketing, and online business growth for businesses across India and the UK.",
              "inLanguage": "en-IN",
              "isPartOf": { "@id": "https://www.vgotyou.com/#website" },
              "publisher": { "@id": "https://www.vgotyou.com/#organization" }
            }
          `}</script>
          <script type="application/ld+json">{`
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.vgotyou.com/" },
                { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.vgotyou.com/blog" }
              ]
            }
          `}</script>
        </Helmet>

        {/* ===== HERO SECTION ===== */}
        <section className="relative overflow-hidden px-4 sm:px-6 pt-24 pb-12 sm:pt-32 sm:pb-16 border-b border-zinc-100 dark:border-zinc-800">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#88888808_1px,transparent_1px),linear-gradient(to_bottom,#88888808_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-600/5 to-transparent pointer-events-none" />
          
          <div className="container mx-auto max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/50 px-3 py-1 text-[10px] font-mono tracking-[0.4em] uppercase text-red-600">
                Archive v.4.0 / Knowledge_Base
              </span>
              <h1 className="sr-only">VGot You Blog – Web Design, SEO, Branding & Digital Growth Case Studies</h1>
              <h2 className="text-[12vw] sm:text-[8vw] md:text-[6vw] font-black leading-[0.85] tracking-tighter uppercase mt-6 mb-4 text-zinc-900 dark:text-white">
                The <br />
                <span className="text-zinc-300 dark:text-zinc-800">Journal</span>
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-xl text-base sm:text-lg font-light leading-relaxed">
                A collection of technical case studies and digital growth strategies from the VGot You laboratory.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ===== CATEGORY FILTER (sticky, rounded-[10px] buttons) ===== */}
        <div className="sticky top-[72px] md:top-[80px] z-40 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800 transition-all">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="py-3 sm:py-4 flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth">
              <span className="text-[8px] font-mono uppercase tracking-widest text-red-600 mr-1 font-bold whitespace-nowrap">
                Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] font-mono uppercase tracking-[0.2em] whitespace-nowrap transition-all px-4 py-2 rounded-[10px] active:scale-95 ${
                    activeCategory === cat 
                      ? 'bg-red-600 text-white shadow-md' 
                      : 'border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-red-300 hover:text-red-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ===== BLOG POSTS GRID ===== */}
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredPosts.map((post, index) => (
                <GridItem key={post.slug || post.id} post={post} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-zinc-500 dark:text-zinc-400">No posts found in this category.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

// Individual blog card component
const GridItem = ({ post, index }: { post: any; index: number }) => {
  const imageUrl = post.imageUrl || post.featuredImage;
  const date = post.publishedDate || (post.updatedAt?.toDate?.() || post.updatedAt || new Date()).toISOString();
  const idCode = post.idCode || `DB-${post.id?.substring(0, 5).toUpperCase() || index + 1}`;

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6 }}
      className="group flex flex-col h-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 hover:border-red-400 dark:hover:border-red-500 transition-all duration-300 rounded-[10px] overflow-hidden shadow-sm hover:shadow-md"
    >
      {/* Card header with ID badge */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/30">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 group-hover:animate-pulse" />
          <span className="text-[8px] font-mono tracking-[0.2em] text-zinc-500 dark:text-zinc-400 uppercase">
            {idCode}
          </span>
        </div>
        <span className="text-[7px] font-mono text-zinc-400 dark:text-zinc-600 uppercase">READY</span>
      </div>

      {/* Image with scanline effect on hover */}
      <Link to={`/blog/${post.slug}`} className="relative aspect-video block overflow-hidden">
        <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent animate-scanline" />
        </div>
        <img 
          src={imageUrl} 
          alt={`${post.title} – Web design and branding case study by VGot You`} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      {/* Card content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between gap-4 mb-3">
          <span className="text-[9px] font-mono font-bold text-red-600 uppercase tracking-[0.3em]">
            {post.category}
          </span>
          <span className="text-[8px] font-mono text-zinc-500 dark:text-zinc-400 tracking-wider uppercase">
            {post.readTime || '5 min'} • {new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white mb-3 leading-tight group-hover:text-red-500 transition-colors">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
          {post.excerpt}
        </p>

        <Link 
          to={`/blog/${post.slug}`} 
          className="group/link inline-flex items-center gap-3 text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-800 dark:text-zinc-200 hover:text-red-500 transition-colors"
        >
          Read Entry
          <span className="w-6 h-px bg-zinc-300 dark:bg-zinc-700 group-hover/link:w-10 group-hover/link:bg-red-500 transition-all duration-300" />
        </Link>
      </div>
    </motion.article>
  );
};

export default Blog;