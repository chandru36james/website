import React, { useEffect, useState } from 'react';
// FIX: Using namespace import for react-router-dom to resolve "no exported member" errors
import * as ReactRouterDOM from 'react-router-dom';
import { motion } from 'motion/react';
import { SEO } from '../components/common/SEO';
import { blogs as mockBlogs } from '../lib/data';
import DOMPurify from 'dompurify';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const { useParams, Link, useNavigate } = ReactRouterDOM as any;
const m = motion as any;

const BlogPostPage: React.FC = () => {
    // FIX: Removed generic type parameter from useParams call to resolve "Untyped function calls may not accept type arguments" error since useParams is extracted from 'any'
    const { slug } = useParams();
    const [post, setPost] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            const foundMock = mockBlogs.find(b => b.slug === slug);
            if (foundMock) {
                setPost(foundMock);
                setLoading(false);
            } else {
                navigate('/blog');
            }
        }
    }, [slug, navigate]);

    if (loading || !post) return <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center text-zinc-400 dark:text-zinc-700 font-mono text-xs uppercase tracking-widest transition-colors">Loading entry_node...</div>;

    // Normalize Firestore Post to BlogPost type for the UI
    const displayPost = {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        imageUrl: post.imageUrl || post.featuredImage,
        category: post.category,
        publishedDate: post.publishedDate || (post.updatedAt?.toDate?.() || post.updatedAt || new Date()).toISOString(),
        author: post.author || 'VGot You',
        idCode: post.idCode || `DB-${post.id?.substring(0, 5).toUpperCase()}`,
        readTime: post.readTime || '5 min',
        slug: post.slug,
        externalUrl: post.externalUrl
    };

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-[#020202] text-zinc-900 dark:text-white selection:bg-red-600/30 overflow-x-hidden transition-colors duration-500">
            <Header />
            <main className="flex-grow pt-0 pb-12 md:pb-20">
                <SEO 
                    title={displayPost.title}
                    description={displayPost.excerpt}
                    image={displayPost.imageUrl}
                    datePublished={displayPost.publishedDate}
                    url={`https://vgotyou.com/blog/${displayPost.slug}`}
                />
                
                <style>{`
                    .text-technical { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
                    .prose h2 { font-size: 1.875rem; font-weight: 800; margin-top: 2.5rem; margin-bottom: 1.25rem; letter-spacing: -0.025em; }
                    .prose h3 { font-size: 1.5rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; }
                    .prose p { margin-bottom: 1.5rem; line-height: 1.8; font-size: 1.125rem; }
                    .prose ul { margin-bottom: 1.5rem; list-style-type: disc; padding-left: 1.5rem; }
                    .prose li { margin-bottom: 0.5rem; }
                    .prose strong { font-weight: 600; }
                    
                    /* Theme-based prose colors */
                    .prose h2, .prose h3, .prose strong { color: #18181b; }
                    .prose p, .prose li { color: #52525b; }
                    
                    .dark .prose h2, .dark .prose h3, .dark .prose strong { color: #ffffff; }
                    .dark .prose p, .dark .prose li { color: #a1a1aa; }
                `}</style>

                <div className="container mx-auto max-w-4xl px-6 pt-28 md:pt-36">
                    {/* Article Header */}
                    <header className="mb-12">
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-technical text-[10px] font-bold text-red-600 uppercase tracking-[0.3em]">
                                    {displayPost.category}
                                </span>
                                <div className="h-[1px] flex-grow bg-zinc-100 dark:bg-zinc-900 transition-colors"></div>
                                <span className="text-technical text-[9px] text-zinc-400 dark:text-zinc-700 uppercase transition-colors">
                                    {displayPost.idCode}
                                </span>
                            </div>
                            
                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-8 leading-[0.95] text-zinc-900 dark:text-white">
                                {displayPost.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-technical text-[10px] text-zinc-500 dark:text-zinc-500 uppercase tracking-widest border-y border-zinc-100 dark:border-zinc-900 py-4 transition-colors">
                                <span>By <Link to="/" className="text-zinc-900 dark:text-white hover:text-red-600 transition-colors font-bold underline decoration-zinc-200 dark:decoration-zinc-800 underline-offset-4 hover:decoration-red-600">{displayPost.author}</Link></span>
                                <span className="w-1 h-1 rounded-full bg-zinc-200 dark:bg-zinc-800"></span>
                                <span>{new Date(displayPost.publishedDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                <span className="w-1 h-1 rounded-full bg-zinc-200 dark:bg-zinc-800"></span>
                                <span>{displayPost.readTime} read</span>
                            </div>
                        </m.div>
                    </header>

                    {/* Featured Image */}
                    <m.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative aspect-video rounded-sm overflow-hidden mb-16 border border-zinc-100 dark:border-zinc-900 transition-colors"
                    >
                        <img 
                            src={displayPost.imageUrl} 
                            alt={displayPost.title}
                            className="w-full h-full object-cover transition-all duration-1000"
                            referrerPolicy="no-referrer"
                        />
                    </m.div>

                    {/* Content */}
                    <m.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(displayPost.content) }}
                    />

                    {/* Footer Actions */}
                    <footer className="mt-20 pt-12 border-t border-zinc-100 dark:border-zinc-900 transition-colors">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                            <Link to="/blog" className="group flex items-center gap-3 text-technical text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                <span className="w-6 h-[1px] bg-zinc-200 dark:bg-zinc-800 group-hover:bg-red-600 group-hover:w-10 transition-all"></span>
                                Back to Journal
                            </Link>
                            
                            <div className="flex flex-wrap items-center justify-center gap-6">
                                <span className="text-technical text-[8px] text-zinc-300 dark:text-zinc-700 uppercase tracking-widest transition-colors">External Mirror:</span>
                                <div className="flex gap-4">
                                    {displayPost.externalUrl ? (
                                        <a 
                                            href={displayPost.externalUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-technical text-[10px] font-bold text-red-600 hover:text-red-400 transition-colors uppercase tracking-[0.2em] flex items-center gap-2"
                                        >
                                            Read on Medium
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                        </a>
                                    ) : (
                                        <span className="text-technical text-[10px] text-zinc-300 dark:text-zinc-800 uppercase tracking-widest italic transition-colors">No external mirror available</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default BlogPostPage;