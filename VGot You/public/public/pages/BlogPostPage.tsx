import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { blogs, BlogPost } from '../lib/data';

const m = motion as any;

const BlogPostPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            const foundPost = blogs.find(b => b.slug === slug);
            if (foundPost) {
                setPost(foundPost);
            } else {
                navigate('/blog');
            }
        }
    }, [slug, navigate]);

    if (!post) return <div className="min-h-screen bg-black flex items-center justify-center text-zinc-700 font-mono text-xs uppercase tracking-widest">Loading entry_node...</div>;

    return (
        <main className="min-h-screen bg-[#020202] text-white selection:bg-red-600/30 overflow-x-hidden pt-32 pb-32">
            <SEO 
                title={post.title}
                description={post.excerpt}
                image={post.imageUrl}
                datePublished={post.publishedDate}
                url={`https://vgotyou.com/blog/${post.slug}`}
            />
            
            <style>{`
                .text-technical { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
                .prose h2 { font-size: 1.875rem; font-weight: 800; margin-top: 2.5rem; margin-bottom: 1.25rem; color: #fff; letter-spacing: -0.025em; }
                .prose h3 { font-size: 1.5rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; color: #fff; }
                .prose p { margin-bottom: 1.5rem; line-height: 1.8; color: #a1a1aa; font-size: 1.125rem; }
                .prose ul { margin-bottom: 1.5rem; list-style-type: disc; padding-left: 1.5rem; }
                .prose li { margin-bottom: 0.5rem; color: #a1a1aa; }
                .prose strong { color: #fff; font-weight: 600; }
            `}</style>

            <div className="container mx-auto max-w-4xl px-6">
                {/* Article Header */}
                <header className="mb-12">
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-technical text-[10px] font-bold text-red-600 uppercase tracking-[0.3em]">
                                {post.category}
                            </span>
                            <div className="h-[1px] flex-grow bg-zinc-900"></div>
                            <span className="text-technical text-[9px] text-zinc-700 uppercase">
                                {post.idCode || 'ARCHIVE'}
                            </span>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-8 leading-[0.95]">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-technical text-[10px] text-zinc-500 uppercase tracking-widest border-y border-zinc-900 py-4">
                            <span>By <Link to="/" className="text-white hover:text-red-600 transition-colors font-bold underline decoration-zinc-800 underline-offset-4 hover:decoration-red-600">{post.author}</Link></span>
                            <span className="w-1 h-1 rounded-full bg-zinc-800"></span>
                            <span>{new Date(post.publishedDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <span className="w-1 h-1 rounded-full bg-zinc-800"></span>
                            <span>{post.readTime || '5 min read'}</span>
                        </div>
                    </m.div>
                </header>

                {/* Featured Image */}
                <m.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative aspect-video rounded-sm overflow-hidden mb-16 border border-zinc-900"
                >
                    <img 
                        src={post.imageUrl} 
                        alt={post.title}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-40"></div>
                </m.div>

                {/* Content */}
                <m.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Footer Actions */}
                <footer className="mt-20 pt-12 border-t border-zinc-900">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                        <Link to="/blog" className="group flex items-center gap-3 text-technical text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors">
                            <span className="w-6 h-[1px] bg-zinc-800 group-hover:bg-red-600 group-hover:w-10 transition-all"></span>
                            Back to Journal
                        </Link>
                        
                        <div className="flex flex-wrap items-center justify-center gap-6">
                            <span className="text-technical text-[8px] text-zinc-700 uppercase tracking-widest">External Mirror:</span>
                            <div className="flex gap-4">
                                <a 
                                    href={post.externalUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-technical text-[10px] font-bold text-red-600 hover:text-red-400 transition-colors uppercase tracking-[0.2em] flex items-center gap-2"
                                >
                                    Read on Medium
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </main>
    );
};

export default BlogPostPage;