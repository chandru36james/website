import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { DESTINATIONS_LIST, PHONE_NUMBER } from '../constants';
import { MapPin, Phone, X, CheckCircle2, Calendar, ArrowRight } from 'lucide-react';
import FadeIn from './FadeIn';
import { DestinationItem } from '../types';

interface DestinationsSectionProps {
  id?: string;
}

const DestinationsSection: React.FC<DestinationsSectionProps> = ({ id }) => {
  const [selectedDestination, setSelectedDestination] = useState<DestinationItem | null>(null);

  const openModal = (item: DestinationItem) => {
    setSelectedDestination(item);
    document.body.style.overflow = 'hidden'; // Lock scroll
  };

  const closeModal = () => {
    setSelectedDestination(null);
    document.body.style.overflow = ''; // Unlock scroll
  };

  return (
    <section id={id} className="py-20 bg-gray-50 scroll-mt-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <FadeIn>
            <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-2 block">Wanderlust Awaits</span>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary mb-4">
              Popular <span className="text-secondary">Destinations</span>
            </h2>
            <p className="text-body max-w-2xl mx-auto text-lg font-light">
              Explore our hand-picked tour packages. Click on any destination to view full details and itinerary highlights.
            </p>
          </FadeIn>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {DESTINATIONS_LIST.map((item, index) => (
            <FadeIn key={index} delay={index * 100} className="h-full">
              <div 
                onClick={() => openModal(item)}
                className="group relative h-[400px] w-full rounded-3xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
              >
                
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                  {/* Dark Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                </div>

                {/* Floating Badges */}
                <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                   <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {item.category}
                   </span>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-heading font-bold text-white mb-2 leading-tight">
                    {item.title}
                  </h3>
                  
                  <div className="overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-500 ease-in-out mb-4 opacity-0 group-hover:opacity-100">
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center justify-between border-t border-white/20 pt-4 mt-2">
                    <div className="flex items-center gap-1 text-gray-300 text-xs font-medium">
                      <MapPin size={12} className="text-secondary" />
                      <span>Read More</span>
                    </div>
                    
                    <span 
                      className="flex items-center gap-2 text-white font-bold text-sm bg-white/20 hover:bg-accent px-4 py-2 rounded-full backdrop-blur-md transition-colors duration-300"
                    >
                      View Details <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Detail Modal - Rendered via Portal to escape stacking contexts */}
      {selectedDestination && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-6 animate-fade-in">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
            onClick={closeModal}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-5xl bg-white sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[100dvh] sm:h-auto sm:max-h-[90dvh] animate-scale-in">
             
             {/* Primary Close Button - Large and Safe for Mobile */}
             <button 
               onClick={closeModal}
               className="absolute top-4 right-4 md:top-5 md:right-5 z-50 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-colors backdrop-blur-md shadow-lg cursor-pointer"
               aria-label="Close"
             >
               <X size={24} />
             </button>

             {/* Image Section */}
             <div className="w-full md:w-1/2 h-64 sm:h-72 md:h-auto md:min-h-[500px] relative flex-shrink-0">
               <img 
                 src={selectedDestination.image} 
                 alt={selectedDestination.title} 
                 className="w-full h-full object-cover"
               />
               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5 md:hidden pt-20">
                  <div className="flex items-center gap-2 mb-1">
                     <span className="text-accent text-[10px] font-bold uppercase tracking-wider bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded">{selectedDestination.category}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white leading-tight">{selectedDestination.title}</h3>
               </div>
             </div>

             {/* Content Section */}
             <div className="w-full md:w-1/2 p-5 md:p-10 flex flex-col overflow-y-auto bg-white flex-grow">
                <div className="hidden md:block mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-secondary text-xs font-bold uppercase tracking-wider">{selectedDestination.category}</span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-heading font-extrabold text-primary mb-2">{selectedDestination.title}</h3>
                </div>

                {/* Quick Info Bar */}
                <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                   <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-xs md:text-sm font-semibold">
                      <Calendar size={16} /> Daily
                   </div>
                </div>

                {/* Scrollable Description */}
                <div className="prose prose-sm text-body mb-4 md:mb-8 flex-grow overflow-y-auto custom-scrollbar pr-2">
                   <p className="text-base md:text-lg leading-relaxed mb-4 text-body font-medium">
                     {selectedDestination.description}
                   </p>
                   <p className="mb-4 text-body">
                     Embark on an unforgettable journey with Akshaya Tours and Travels. This package is curated to give you the best experience of <strong>{selectedDestination.title}</strong>, combining comfort, safety, and adventure.
                   </p>
                   
                   <h4 className="text-primary font-bold text-sm md:text-base mb-3 flex items-center gap-2">
                     <CheckCircle2 size={16} className="text-secondary" /> Package Highlights
                   </h4>
                   <ul className="space-y-2 mb-6">
                     <li className="flex items-start gap-2 text-sm text-body">
                       <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0"></span>
                       <span>Private Sanitized Vehicle (Sedan/SUV/Tempo)</span>
                     </li>
                     <li className="flex items-start gap-2 text-sm text-body">
                       <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0"></span>
                       <span>Experienced Driver cum Guide</span>
                     </li>
                     <li className="flex items-start gap-2 text-sm text-body">
                       <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0"></span>
                       <span>Pickup & Drop from your Doorstep</span>
                     </li>
                     <li className="flex items-start gap-2 text-sm text-body">
                       <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0"></span>
                       <span>Flexible Itinerary & Timings</span>
                     </li>
                   </ul>
                </div>

                {/* Sticky Bottom Actions */}
                <div className="mt-auto pt-4 md:pt-6 border-t border-gray-100 bg-white sticky bottom-0 z-10">
                   <div className="flex flex-row gap-3">
                     <button 
                       onClick={closeModal}
                       className="flex-1 bg-gray-100 text-body hover:bg-gray-200 py-3 md:py-4 rounded-xl font-bold transition flex items-center justify-center gap-2"
                     >
                       <X size={18} /> Close
                     </button>
                     <a 
                       href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} 
                       className="flex-[2] flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-hover text-white py-3 md:py-4 rounded-xl font-bold transition shadow-lg shadow-orange-500/30 group"
                     >
                       <Phone size={18} className="group-hover:animate-bounce" /> Book Trip
                     </a>
                   </div>
                   
                   <p className="text-center text-[10px] text-gray-400 mt-2">
                     *Prices may vary based on vehicle type and season. Call for final quote.
                   </p>
                </div>
             </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default DestinationsSection;