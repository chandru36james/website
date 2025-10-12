
import React, { useState, useMemo } from 'react';
import CloseIcon from './icons/CloseIcon';
import { portfolioItems, PortfolioItem } from '../data/portfolioData';
import { ArrowLeftIcon, ArrowRightIcon } from './icons/ArrowIcons';

interface PortfolioProps {
  isVisible?: boolean;
  isMobile?: boolean;
}

const filters = ['All', 'Interior', 'Construction'];
const ITEMS_PER_PAGE = 6;

const Portfolio: React.FC<PortfolioProps> = ({ isVisible, isMobile }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') {
      return portfolioItems;
    }
    return portfolioItems.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredItems]);
  
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }
  
  const titleWords = "Our Portfolio".split(' ');

  const renderPaginationButtons = () => {
    const DOTS = '...';
    const range = (start: number, end: number) => {
      let length = end - start + 1;
      return Array.from({ length }, (_, idx) => idx + start);
    };

    const siblingCount = 1;
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPages
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    let pageItems: (string | number)[] = [];

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      pageItems = [...leftRange, DOTS, totalPages];
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPages - rightItemCount + 1,
        totalPages
      );
      pageItems = [firstPageIndex, DOTS, ...rightRange];
    } else if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      pageItems = [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    } else {
        return range(1, totalPages);
    }
    
    return pageItems.map((item, index) => {
        if (item === DOTS) {
            return (
                 <span key={`dots-${index}`} className="w-8 h-8 flex items-center justify-center text-gray-500">
                    ...
                </span>
            );
        }
        return (
            <button
                key={item}
                onClick={() => handlePageChange(item as number)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${currentPage === item ? 'bg-brand-gold text-white' : 'bg-transparent text-gray-700 hover:bg-gray-200'}`}
                aria-current={currentPage === item ? 'page' : undefined}
                aria-label={`Go to page ${item}`}
            >
                {item}
            </button>
        );
    });
  }


  return (
    <section className={`w-full bg-gray-50 flex flex-col items-center justify-center overflow-hidden ${isMobile ? 'py-24' : 'h-full'}`}>
      <div className={`container mx-auto px-4 sm:px-6 lg:pl-24 lg:pr-24 flex flex-col w-full ${isMobile ? '' : 'h-full py-20'}`}>
        {/* Title and Filters */}
        <div className="flex-shrink-0">
          <div className={`text-center mb-4`}>
            <h3 className={`text-brand-gold font-semibold tracking-widest uppercase mb-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>RECENT PROJECTS</h3>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-brand-dark">
              {titleWords.map((word, index) => (
                <span key={index} className="inline-block overflow-hidden mr-3">
                  <span
                    className={`inline-block transform transition-all duration-500 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                    style={{ transitionDelay: `${100 + index * 100}ms` }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h2>
          </div>
          
          <div className="flex justify-center items-center space-x-2 md:space-x-6 mb-8">
            {filters.map((filter, index) => (
              <button
                key={filter}
                onClick={() => handleFilterClick(filter)}
                className={`px-4 py-2 text-sm md:text-base font-medium transition-all duration-300 ${
                  activeFilter === filter 
                    ? 'bg-brand-gold text-white rounded-full' 
                    : 'bg-transparent text-gray-600 hover:text-brand-dark'
                } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className={`grid grid-cols-2 lg:grid-cols-3 gap-6 flex-1 min-h-0`}>
          {paginatedItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
              onClick={() => setLightboxItem(item)}>
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 aspect-[4/3]" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 md:p-6">
                <div className="text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-sm text-brand-gold font-semibold">{item.category}</p>
                  <h4 className="text-lg md:text-xl font-bold font-playfair">{item.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className={`flex-shrink-0 flex justify-center items-center space-x-1 sm:space-x-2 pt-8 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 hover:text-brand-dark transition-colors">
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            
            {renderPaginationButtons()}
            
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 hover:text-brand-dark transition-colors">
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex items-center justify-center p-4" 
          onClick={() => setLightboxItem(null)}
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        >
          <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <img 
              src={lightboxItem.img}
              alt={lightboxItem.title} 
              className="w-full h-auto object-contain rounded-t-lg max-h-[70vh]" 
            />
            <div className="p-6 bg-white rounded-b-lg">
              <p className="text-sm text-brand-gold font-semibold">{lightboxItem.category}</p>
              <h4 className="text-2xl font-bold font-playfair text-brand-dark">{lightboxItem.title}</h4>
            </div>
            <button 
              onClick={() => setLightboxItem(null)} 
              className="absolute top-3 right-3 text-brand-dark bg-white/70 rounded-full p-2 z-10 hover:bg-white transition-all"
              aria-label="Close image viewer"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Portfolio;
