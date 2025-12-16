import React, { useEffect } from 'react';
import { SEOProps } from '../types';

const SEO: React.FC<SEOProps> = ({ title, description, keywords, canonical }) => {
  useEffect(() => {
    // Update Title
    document.title = title;

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

    // Update Description
    updateMeta('description', description);

    // Update Keywords if provided
    if (keywords) {
      updateMeta('keywords', keywords);
    }

    // Update Canonical URL
    let link = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }

  }, [title, description, keywords, canonical]);

  return null;
};

export default SEO;