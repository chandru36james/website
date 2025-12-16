import React from 'react';
import { PRICE_LIST, PHONE_NUMBER, REVIEWS_LIST } from '../constants';
import { Star, Quote } from 'lucide-react';
import FadeIn from './FadeIn';

interface PriceSectionProps {
  id?: string;
}

const PriceSection: React.FC<PriceSectionProps> = ({ id }) => {
  // We duplicate the list to ensure we have a substantial base width.
  // We will then repeat this base set multiple times in the marquee.
  const marqueeSet = [...REVIEWS_LIST, ...REVIEWS_LIST]; 

  return (
    <section id={id} className="py-24 bg-white scroll-mt-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <FadeIn>
            <span className="text-secondary font-bold uppercase tracking-wider text-sm mb-2 block">Transparent Pricing</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-4">Unbeatable Rates</h2>
            <p className="text-body mt-4 max-w-2xl mx-auto text-lg">
              No hidden costs. No surge pricing. Just honest, affordable rates for your journey.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {PRICE_LIST.map((category, idx) => {
            const isPopular = idx === 1; // Highlight middle card
            return (
            <FadeIn key={idx} delay={idx * 150} className="h-full">
              <div className={`relative flex flex-col h-full rounded-3xl overflow-hidden transition-all duration-300 ${
                isPopular 
                  ? 'border-2 border-primary shadow-2xl scale-100 lg:scale-105 z-10' 
                  : 'border border-gray-100 shadow-lg hover:shadow-xl bg-white'
              }`}>
                
                {isPopular && (
                  <div className="bg-secondary text-white text-center py-2 text-xs font-bold uppercase tracking-widest">
                    Most Popular
                  </div>
                )}

                <div className={`p-6 md:p-8 ${isPopular ? 'bg-blue-50' : 'bg-white'}`}>
                  <h3 className="text-xl font-heading font-bold text-primary text-center mb-2">{category.category}</h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-primary to-blue-300 mx-auto rounded-full mb-6"></div>
                  
                  <div className="space-y-4">
                    {category.services.map((item, i) => (
                      <div key={i} className="flex justify-between items-baseline border-b border-gray-200/60 pb-3 last:border-0">
                        <div>
                          <p className="font-semibold text-body text-sm md:text-base">{item.name}</p>
                          {item.note && <p className="text-xs text-gray-500 mt-0.5">{item.note}</p>}
                        </div>
                        <div className="text-right flex-shrink-0 ml-2">
                          <p className="text-base md:text-lg font-bold text-primary">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`p-6 md:p-8 mt-auto ${isPopular ? 'bg-blue-50' : 'bg-white'}`}>
                   <a 
                     href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} 
                     className={`block w-full text-center py-3.5 rounded-xl font-bold transition duration-300 ${
                       isPopular 
                        ? 'bg-accent text-white hover:bg-accent-hover shadow-lg hover:shadow-orange-500/30' 
                        : 'bg-white border-2 border-gray-200 text-body hover:border-accent hover:text-accent'
                     }`}
                   >
                     Book This Package
                   </a>

                   {/* Bata Section */}
                   {category.bata && (
                     <div className="mt-4 pb-2 border-b border-gray-200/50">
                        <p className="text-sm font-bold text-primary text-center">{category.bata}</p>
                     </div>
                   )}

                   <p className="text-xs text-center text-gray-400 mt-3">
                     *Tolls, parking & interstate taxes extra.
                   </p>
                </div>
              </div>
            </FadeIn>
            )
          })}
        </div>

        {/* Reviews Marquee Section */}
        <div className="border-t border-gray-100 pt-16">
          <div className="text-center mb-10">
            <span className="text-secondary font-bold uppercase tracking-wider text-xs mb-1 block">Testimonials</span>
            <h3 className="text-2xl font-heading font-bold text-primary">Happy Rider Reviews</h3>
          </div>
          
          <div className="relative w-full overflow-hidden mask-linear-gradient">
            {/* 
              Marquee Structure for Seamless Loop:
              - Flex container moves with `animate-marquee` (-50% translation).
              - Four child containers to ensure coverage on large screens (4K).
              - Each child container has padding-right equal to the gap (gap-6 = 1.5rem = 24px)
              - This ensures the total width of one Set includes the trailing gap, making the loop mathematically seamless.
            */}
            <div className="flex w-max animate-marquee py-4">
              {[...Array(4)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-6 pr-6">
                  {marqueeSet.map((review, i) => (
                    <div key={`${setIndex}-${i}`} className="w-[300px] md:w-[350px] bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex-shrink-0 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, starIndex) => (
                          <Star 
                            key={starIndex} 
                            size={14} 
                            className={starIndex < review.rating ? "text-accent fill-accent" : "text-gray-300"} 
                          />
                        ))}
                      </div>
                      <p className="text-body text-sm italic mb-4 line-clamp-3">"{review.comment}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-primary font-bold text-xs">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-primary text-sm">{review.name}</h4>
                          <p className="text-xs text-gray-400">{review.location}</p>
                        </div>
                        <Quote className="ml-auto text-gray-200" size={24} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceSection;