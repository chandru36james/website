import React from 'react';

interface HeroProps {
  scrollToSection: (index: number) => void;
  isVisible?: boolean;
  isMobile?: boolean;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection, isVisible, isMobile }) => {
  const headline = "We Create Your Dream";
  const headlineWords = headline.split(' ');

  return (
    <section className={`relative w-full flex items-center justify-center text-white overflow-hidden ${isMobile ? 'h-screen' : 'h-full'}`}>
      <div 
        className="absolute inset-0 bg-cover bg-center animate-kenburns" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop')" }}
      ></div>
      <div className={`absolute inset-0 bg-black transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-50' : 'opacity-20'}`}></div>
      
      <div className="relative z-10 text-center p-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-extrabold mb-4 leading-tight">
          {headlineWords.map((word, index) => (
            <span key={index} className="inline-block overflow-hidden mr-3">
              <span
                className={`inline-block transform transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                style={{ transitionDelay: `${100 + index * 150}ms` }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>
        <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
           style={{ transitionDelay: `${100 + headlineWords.length * 150}ms` }}
        >
          Bloom Green is a premier construction and interior design firm that brings your vision to life, from foundation to finishing touches.
        </p>
        <button 
          onClick={() => scrollToSection(3)}
          className={`btn-slide-hover slide-gold-dark bg-brand-gold text-white font-bold py-3 px-8 rounded-full transition-all duration-700 text-lg ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          style={{ transitionDelay: `${200 + headlineWords.length * 150}ms` }}
        >
          <span>View Projects</span>
        </button>
      </div>
    </section>
  );
};

export default Hero;
