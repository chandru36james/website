import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../constants';
import { Image as ImageIcon, ChevronDown } from 'lucide-react';
import FadeIn from './FadeIn';

interface GallerySectionProps {
  id?: string;
}

const GallerySection: React.FC<GallerySectionProps> = ({ id }) => {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, GALLERY_IMAGES.length));
  };

  return (
    <section id={id} className="py-16 bg-gray-50 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
           <FadeIn>
             <span className="text-secondary font-bold uppercase tracking-wider flex items-center justify-center gap-2">
              <ImageIcon size={18} /> Our Fleet
            </span>
            <h2 className="text-3xl font-bold text-primary mt-2">Gallery</h2>
            <p className="text-body mt-4 max-w-2xl mx-auto">
              Experience comfort and class with our well-maintained fleet of Sedans, SUVs, and luxury travelers.
            </p>
          </FadeIn>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_IMAGES.slice(0, visibleCount).map((img, index) => (
            <FadeIn key={index} delay={index % 3 * 100} className="h-full">
              <div className="relative group overflow-hidden rounded-lg shadow-md aspect-[4/3]">
                <img 
                  src={img.url} 
                  alt={img.alt} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
                />
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < GALLERY_IMAGES.length && (
          <div className="mt-12 text-center">
            <button 
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-body font-bold rounded-full hover:bg-gray-100 hover:border-gray-400 transition shadow-sm"
            >
              Load More <ChevronDown size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;