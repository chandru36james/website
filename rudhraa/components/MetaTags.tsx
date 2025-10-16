import React, { useEffect } from 'react';

const DEFAULTS = {
    title: 'Rudhraa Exports - Exporter & Importer of Vegetables & Fruits',
    description: 'Rudhraa Exports, based in Karur, Tamil Nadu, India, is a leading exporter and importer of fresh vegetables, fruits, spices, and grains. We deliver quality produce worldwide.',
    imageUrl: 'https://rudhraaexportsandimports.com/images/about.jpeg',
    type: 'website' as const,
    siteName: 'Rudhraa Exports'
};

interface MetaTagsProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  url?: string;
  type?: 'website' | 'article';
}

const MetaTags: React.FC<MetaTagsProps> = ({ 
  title = DEFAULTS.title, 
  description = DEFAULTS.description, 
  imageUrl = DEFAULTS.imageUrl,
  url = window.location.href,
  type = DEFAULTS.type,
}) => {
  useEffect(() => {
    document.title = title;

    const updateMetaTag = (selector: string, content: string) => {
      const element = document.querySelector(selector) as HTMLMetaElement;
      if (element) {
        element.content = content;
      }
    };
    
    // Standard description
    const descriptionTag = document.getElementById('meta-description') as HTMLMetaElement;
    if (descriptionTag) {
        descriptionTag.content = description;
    }
    
    // OG Tags
    updateMetaTag('meta[property="og:title"]', title);
    updateMetaTag('meta[property="og:description"]', description);
    updateMetaTag('meta[property="og:image"]', imageUrl);
    updateMetaTag('meta[property="og:url"]', url);
    updateMetaTag('meta[property="og:type"]', type);
    updateMetaTag('meta[property="og:site_name"]', DEFAULTS.siteName);

    // Twitter Tags
    updateMetaTag('meta[property="twitter:title"]', title);
    updateMetaTag('meta[property="twitter:description"]', description);
    updateMetaTag('meta[property="twitter:image"]', imageUrl);
    updateMetaTag('meta[property="twitter:url"]', url);

  }, [title, description, imageUrl, url, type]);

  return null;
};

export default MetaTags;
