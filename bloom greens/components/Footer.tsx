import React from 'react';
import FacebookIcon from './icons/FacebookIcon';
import InstagramIcon from './icons/InstagramIcon';
import TwitterIcon from './icons/TwitterIcon';

interface FooterProps {
  scrollToSection: (index: number) => void;
  isVisible?: boolean;
  isMobile?: boolean;
}

const Footer: React.FC<FooterProps> = ({ scrollToSection, isVisible, isMobile }) => {
  const titleWords = "Let's Build Something Beautiful Together.".split(' ');

  return (
    <footer className={`w-full bg-brand-dark text-gray-300 flex flex-col items-center justify-center overflow-hidden ${isMobile ? 'pt-24 pb-8' : 'h-full'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:pl-24 lg:pr-24 flex flex-col justify-center items-center text-center w-full flex-grow">
        
        {/* Main CTA */}
        <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <img 
            src="https://bloomgreen.netlify.app/assets/logo.png" 
            alt="Bloom Green Logo" 
            className={`h-28 w-auto mx-auto mb-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          />
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
            {titleWords.map((word, index) => (
              <span key={index} className="inline-block overflow-hidden mr-2">
                <span
                  className={`inline-block transform transition-all duration-500 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                  style={{ transitionDelay: `${200 + index * 80}ms` }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h2>
          <p className={`max-w-2xl mx-auto text-gray-400 mb-10 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '500ms' }}>
            Ready to start your project? We're here to help you bring your vision to life.
          </p>
          <button
            onClick={() => scrollToSection(6)}
            className={`btn-slide-hover slide-gold-dark bg-brand-gold text-white font-bold py-4 px-10 rounded-full transition-all duration-700 text-lg ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
             style={{ transitionDelay: '700ms' }}
          >
            <span>Get a Quote</span>
          </button>
        </div>

      </div>

      {/* Bottom section with links and copyright */}
      <div className="w-full border-t border-gray-700 mt-16 pt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:pl-24 lg:pr-24">
            <div className="flex justify-center items-center">
                
                {/* Copyright */}
                <div className="text-sm text-gray-500 text-center">
                    <h3 className="text-lg font-playfair font-bold text-white mb-1">Bloom Green</h3>
                    <p>&copy; {new Date().getFullYear()} Bloom Green Developers. All Rights Reserved.</p>
                    <p className="mt-1">Designed by <a href="https://vgotyou.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors duration-300">VGot You</a></p>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;