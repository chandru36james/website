import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { BLOG_POSTS } from '../blog/posts';
import useAnimateOnScroll from '../components/useAnimateOnScroll';
import { BlogPost } from '../types';
import MetaTags from '../components/MetaTags';

const BlogCard: React.FC<{ post: BlogPost; index: number }> = ({ post, index }) => {
    const [ref, isVisible] = useAnimateOnScroll(0.05);

    return (
        <Link
            to={`/blog/${post.slug}`}
            ref={ref as React.RefObject<HTMLAnchorElement>}
            className={`scroll-animate group bg-white rounded-lg border border-highlight overflow-hidden transition-all duration-300 ease-in-out cursor-pointer hover:shadow-xl hover:-translate-y-2 flex flex-col ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <div className="relative h-60 overflow-hidden">
                <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" 
                />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-text-alt mb-2">{post.date} &bull; {post.author}</p>
                <h3 className="text-xl font-bold font-lora text-text-main mb-3 flex-grow">{post.title}</h3>
                <p className="text-text-alt text-sm mb-4">{post.excerpt}</p>
                <span className="mt-auto font-semibold text-accent group-hover:text-accent-hover transition-colors">
                    Read More &rarr;
                </span>
            </div>
        </Link>
    );
};


const BlogIndexPage: React.FC = () => {
    return (
        <div>
            <MetaTags
                title="Blog | Rudhraa Exports"
                description="Insights from Rudhraa Exports on agriculture, global trade, and quality produce. Stay updated with our latest articles."
                imageUrl="https://rudhraaexportsandimports.com/images/blog.jpg"
            />
            <PageHeader 
                title="Our Blog"
                subtitle="Insights from the World of Agriculture and Trade"
                imageUrl="https://rudhraaexportsandimports.com/images/blog.jpg"
                breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }]}
            />
            <section className="py-16 lg:py-24 bg-bg-alt bg-dot-pattern">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {BLOG_POSTS.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {BLOG_POSTS.map((post, index) => (
                                <BlogCard key={post.slug} post={post} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-text-alt">
                            <h2 className="text-2xl font-lora">No posts yet.</h2>
                            <p>Check back soon for insights and updates!</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default BlogIndexPage;