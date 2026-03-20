import React, { useEffect } from 'react';

interface SEOProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: string;
    author?: string;
    datePublished?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
    title, 
    description, 
    image, 
    url, 
    type = 'article', 
    author = 'VGot You', 
    datePublished 
}) => {
    useEffect(() => {
        // Save previous title to restore on unmount
        const prevTitle = document.title;
        
        // Update Title
        document.title = `${title} | VGot You`;

        // Helper to update meta tags
        const updateMeta = (name: string, content: string) => {
            let element = document.querySelector(`meta[name="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('name', name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        const updateOgMeta = (property: string, content: string) => {
            let element = document.querySelector(`meta[property="${property}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('property', property);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        updateMeta('description', description);
        updateOgMeta('og:title', title);
        updateOgMeta('og:description', description);
        if (image) updateOgMeta('og:image', image);
        if (url) updateOgMeta('og:url', url);
        updateOgMeta('og:type', type);

        return () => {
            document.title = prevTitle;
        };
    }, [title, description, image, url, type]);

    const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "description": description,
        "image": image,
        "author": {
            "@type": "Organization",
            "name": author
        },
        "publisher": {
            "@type": "Organization",
            "name": "VGot You",
            "logo": {
                "@type": "ImageObject",
                "url": "https://vgotyou.com/assets/logo.png"
            }
        },
        "datePublished": datePublished,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};
