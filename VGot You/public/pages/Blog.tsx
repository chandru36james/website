
import React, { useState, useEffect } from 'react';
import ArcticTextilesPost from './ArcticTextilesPost';
import VesaHomesPost from './VesaHomesPost';
import BrandingPost from './BrandingPost';


interface BlogProps {
    setPage: (page: string) => void;
}

const posts = [
    {
        slug: 'blog-post/arctic-textiles',
        category: 'Case Study',
        title: 'How Our Web Design Helped Arctic Textiles Reach Global Markets',
        excerpt: 'See how a modern, SEO-optimized website design helped Arctic Textiles expand globally.',
        imageUrl: 'https://vgotyou.com/assets/arctic.png',
        publishedDate: '2023-10-26',
        author: 'VGot You'
    },
    {
        slug: 'blog-post/vesa-homes',
        category: 'E-commerce',
        title: 'Crafting an Elegant E-commerce Experience for Vesa Homes',
        excerpt: 'A deep dive into building a direct-to-consumer brand for a premium home textile company.',
        imageUrl: 'https://www.vgotyou.com/assets/vesahomes.png',
        publishedDate: '2023-11-05',
        author: 'VGot You'
    },
    {
        slug: 'blog-post/branding-identity',
        category: 'Branding',
        title: 'Beyond the Logo: How Strategic Branding Builds Lasting Impressions',
        excerpt: 'Discover how we helped brands like Arctic Textiles and Bloomgreen Developers craft powerful identities that resonate.',
        imageUrl: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=1974&auto=format&fit=crop',
        publishedDate: '2023-11-12',
        author: 'VGot You'
    }
];

const [featuredPost, ...otherPosts] = posts;

// SEO Component for JSON-LD structured data. This is preserved for SEO.
const BlogSeoData = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "VGot You Blog",
        "description": "Insights, case studies, and thoughts on design, development, and digital strategy from VGot You.",
        "blogPost": posts.map(post => ({
            "@type": "BlogPosting",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://vgotyou.example.com/${post.slug}` 
            },
            "headline": post.title,
            "description": post.excerpt,
            "image": post.imageUrl,
            "author": {
                "@type": "Organization",
                "name": post.author
            },
            "publisher": {
                "@type": "Organization",
                "name": "VGot You",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://vgotyou.example.com/logo.png"
                }
            },
            "datePublished": post.publishedDate
        }))
    };
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

const FeaturedPostCard: React.FC<(typeof posts[0]) & { onReadMore: (slug: string) => void }> = ({ slug, category, title, excerpt, imageUrl, publishedDate, onReadMore }) => {
    const handleReadMoreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onReadMore(slug);
    }
    
    return (
        <article className="group grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-20 md:mb-28 border-b border-gray-200 dark:border-zinc-800 pb-20">
            <a href={`#${slug}`} onClick={handleReadMoreClick} className="block overflow-hidden" aria-label={`Read more about ${title}`}>
                <img 
                    src={imageUrl} 
                    alt={title} 
                    className="w-full aspect-video md:aspect-auto h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                />
            </a>
            <div>
                <p className="text-red-600 dark:text-red-500 text-sm font-bold mb-3 tracking-widest uppercase">
                    <span>{category}</span> <span className="text-gray-400">&bull;</span> <span className="text-black/60 dark:text-white/60">{new Date(publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </p>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-black dark:text-white mb-4">
                    <a href={`#${slug}`} onClick={handleReadMoreClick} className="hover:text-red-600 dark:hover:text-red-500 transition-colors">
                        {title}
                    </a>
                </h2>
                <p className="text-black/70 dark:text-white/70 text-lg mb-6 leading-relaxed">{excerpt}</p>
                <a href={`#${slug}`} onClick={handleReadMoreClick} className="text-black dark:text-white font-bold mt-auto self-start text-lg pb-1 bg-left-bottom bg-gradient-to-r from-red-600 to-red-600 dark:from-red-500 dark:to-red-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out group-hover:text-red-600 dark:group-hover:text-red-500">
                    Read Story
                    <span className="inline-block transition-transform group-hover:translate-x-2 motion-reduce:transform-none ml-2">&rarr;</span>
                </a>
            </div>
        </article>
    );
};

const PostCard: React.FC<(typeof posts[0]) & { onReadMore: (slug: string) => void }> = ({ slug, category, title, excerpt, imageUrl, publishedDate, onReadMore }) => {
    const handleReadMoreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onReadMore(slug);
    }

    return (
        <article className="group flex flex-col">
            <a href={`#${slug}`} onClick={handleReadMoreClick} className="block overflow-hidden mb-6" aria-label={`Read more about ${title}`}>
                <img 
                    src={imageUrl} 
                    alt={title} 
                    className="w-full aspect-video object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out group-hover:scale-105" 
                />
            </a>
            <div className="flex flex-col flex-grow">
                <p className="text-red-600 dark:text-red-500 text-xs font-bold mb-2 tracking-widest uppercase">
                    <span>{category}</span> <span className="text-gray-400">&bull;</span> <span className="text-black/60 dark:text-white/60">{new Date(publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </p>
                <h3 className="text-2xl font-serif font-bold text-black dark:text-white mb-4 flex-grow">
                    <a href={`#${slug}`} onClick={handleReadMoreClick} className="hover:text-red-600 dark:hover:text-red-500 transition-colors">
                        {title}
                    </a>
                </h3>
                <p className="text-black/70 dark:text-white/70 text-base mb-5">{excerpt}</p>
                <a href={`#${slug}`} onClick={handleReadMoreClick} className="text-black dark:text-white font-bold mt-auto self-start pb-1 bg-left-bottom bg-gradient-to-r from-red-600 to-red-600 dark:from-red-500 dark:to-red-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out group-hover:text-red-600 dark:group-hover:text-red-500">
                    Read Story
                    <span className="inline-block transition-transform group-hover:translate-x-2 motion-reduce:transform-none ml-2">&rarr;</span>
                </a>
            </div>
        </article>
    );
};

const BlogPostModal: React.FC<{ slug: string; onClose: () => void; setPage: (page: string) => void; }> = ({ slug, onClose, setPage }) => {
    
    const handleNavigate = (page: string) => {
        onClose();
        setPage(page);
    };
    
    const PostComponent = () => {
        switch (slug) {
            case 'blog-post/arctic-textiles':
                return <ArcticTextilesPost onNavigate={handleNavigate} />;
            case 'blog-post/vesa-homes':
                return <VesaHomesPost onNavigate={handleNavigate} />;
            case 'blog-post/branding-identity':
                return <BrandingPost onNavigate={handleNavigate} />;
            default:
                return null;
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div
                className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] relative flex flex-col transition-colors duration-300"
                onClick={(e) => e.stopPropagation()} 
            >
                 <div className="flex-shrink-0 p-4">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-black dark:text-white hover:text-red-600 dark:hover:text-red-500 transition-colors z-20 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-full p-2"
                        aria-label="Close post"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {/* Redesigned Custom Scrollbar matching Black/White/Red theme */}
                <div className="overflow-y-auto px-2 sm:px-0 flex-grow [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-track]:dark:bg-black [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-red-600 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-red-700">
                    <PostComponent />
                </div>
            </div>
        </div>
    );
};

const Blog: React.FC<BlogProps> = ({ setPage }) => {
    const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);

    useEffect(() => {
        if (selectedPostSlug) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedPostSlug]);

    const handleReadMore = (slug: string) => {
        setSelectedPostSlug(slug);
    };

    const handleCloseModal = () => {
        setSelectedPostSlug(null);
    };

    return (
        <>
            <BlogSeoData />
            <main className="w-full max-w-6xl mx-auto animate-fade-in px-4 py-20 sm:py-28">
                <header className="text-center mb-20 md:mb-28">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-black dark:text-white tracking-tight">
                        The Journal
                    </h1>
                    <p className="text-lg text-black/60 dark:text-white/60 mt-4 max-w-2xl mx-auto">
                        Insights, case studies, and thoughts on design, development, and digital strategy from our studio.
                    </p>
                </header>

                {featuredPost && <FeaturedPostCard {...featuredPost} onReadMore={handleReadMore} />}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                    {otherPosts.map(post => (
                        <PostCard key={post.slug} {...post} onReadMore={handleReadMore} />
                    ))}
                </div>
            </main>
            {selectedPostSlug && <BlogPostModal slug={selectedPostSlug} onClose={handleCloseModal} setPage={setPage} />}
        </>
    );
};

export default Blog;
