import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';
import arcticTextile from '../assets/arctic textile.png';
import bloomGreens from '../assets/bloom greens.png';
import vesa from '../assets/vesa.png';
import rudhraahome from '../assets/rudhraahome.png';

const CarouselManual: React.FC = () => {
  // Manually add your images and data here
  const items = [
    {
      id: 1,
      imageUrl: arcticTextile,      
      title: 'Arctic Textiles',
      description: 'Textile Manufacturing company.',
      liveUrl: 'https://arctictextiles.com/',
    },
    {
      id: 2,
      imageUrl: bloomGreens,
      title: 'Bloom Green Developers',
      description: 'A construction and interior company with single page requirement.',
      liveUrl: 'https://bloomgreen.netlify.app/',
    },
    {
      id: 3,
      imageUrl: vesa,
      title: 'Vesa Homes',
      description: 'E-commerce site for clothing.',
      liveUrl: 'https://www.vesahomes.com/',
    },
    {
      id: 4,
      imageUrl: rudhraahome,
      title: 'Rudhraa Exports and Imports',
      description: 'Exporting company required B2B site.',
      liveUrl: 'https://rudhraaexportsandimports.com/',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === items.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="mt-12">
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold font-display">Our Projects</h2>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Take a look at some of our recent work across different industries and domains.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative w-full max-w-5xl mx-auto" aria-roledescription="carousel">
        <div className="overflow-hidden relative rounded-lg shadow-2xl h-96 md:h-[500px]">
          <div
            className="whitespace-nowrap transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items.map((item) => (
              <div key={item.id} className="inline-block w-full h-full relative" aria-roledescription="slide">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h3 className="text-3xl font-display font-bold">{item.title}</h3>
                  <p className="mt-2 max-w-2xl">{item.description}</p>
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block font-semibold border-b-2 border-transparent hover:border-white transition-colors"
                  >
                    View Project &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 hover:bg-white text-charcoal rounded-full p-2 transition-colors z-10"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 hover:bg-white text-charcoal rounded-full p-2 transition-colors z-10"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {items.map((_, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === slideIndex ? 'bg-white scale-125' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${slideIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselManual;
