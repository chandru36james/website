import React from 'react';
import { Helmet } from 'react-helmet-async';

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
    const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "description": description,
        "image": image || "https://www.vgotyou.com/assets/og-home.png",
        "author": {
            "@type": "Organization",
            "@id": "https://www.vgotyou.com/#organization",
            "name": author
        },
        "publisher": {
            "@id": "https://www.vgotyou.com/#organization"
        },
        "datePublished": datePublished,
        "inLanguage": "en-IN",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
        },
        "isPartOf": {
            "@id": "https://www.vgotyou.com/#website"
        }
    };

    return (
        <>
            <Helmet>
                <html lang="en-IN" />
                <title>{`${title} | VGot You`}</title>
                <meta name="description" content={description} />
                <meta name="author" content={author} />
                <meta name="robots" content="index, follow" />
                {url && <link rel="canonical" href={url} />}
                
                {/* HREFLANG */}
                {url && (
                    <>
                        <link rel="alternate" hrefLang="en-IN" href={url} />
                        <link rel="alternate" hrefLang="en-GB" href={url} />
                        <link rel="alternate" hrefLang="x-default" href={url} />
                    </>
                )}

                {/* OPEN GRAPH */}
                <meta property="og:site_name" content="VGot You" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={image || "https://www.vgotyou.com/assets/og-home.png"} />
                <meta property="og:image:alt" content={title} />
                {url && <meta property="og:url" content={url} />}
                <meta property="og:type" content={type} />
                <meta property="og:locale" content="en_IN" />
                <meta property="og:locale:alternate" content="en_GB" />

                {/* TWITTER / X */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={image || "https://www.vgotyou.com/assets/og-home.png"} />
                <meta name="twitter:site" content="@vgotyou" />
                <meta name="twitter:creator" content="@vgotyou" />
            </Helmet>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
        </>
    );
};
