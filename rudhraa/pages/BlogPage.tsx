import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { BLOG_POSTS } from '../blog/posts';
import NotFoundPage from './NotFoundPage';
import MetaTags from '../components/MetaTags';

const BlogPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = BLOG_POSTS.find(p => p.slug === slug);

    if (!post) {
        return <NotFoundPage />;
    }

    return (
        <div>
            <MetaTags
                title={`${post.title} | Rudhraa Exports Blog`}
                description={post.excerpt}
                imageUrl={post.imageUrl}
                type="article"
            />
            <PageHeader
                title={post.title}
                subtitle={post.subtitle}
                imageUrl={post.imageUrl}
                breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}`}]}
            />
            <article className="py-16 lg:py-24 bg-bg-main">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8 text-center">
                            <p className="text-text-alt">
                                By <span className="font-semibold text-text-main">{post.author}</span> on <span className="font-semibold text-text-main">{post.date}</span>
                            </p>
                        </div>
                        
                        {post.content}

                        <div className="mt-12 pt-8 border-t border-highlight text-center">
                            <Link to="/blog" className="font-semibold text-accent hover:text-accent-hover transition-colors">
                                &larr; Back to Blog
                            </Link>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default BlogPage;