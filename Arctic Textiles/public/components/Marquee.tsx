import React from 'react';
import logo1 from '@/assets/Marquee/arctic_textiles.png';
import logo2 from '@/assets/Marquee/bloomgreen.png';
import logo3 from '@/assets/Marquee/rudhraa.png';
import logo4 from '@/assets/Marquee/vesahomes.png';
import logo5 from '@/assets/Marquee/vgotyou.png';


const clientLogos = [
  { url: logo1, alt: 'Company 1' },
  { url: logo2, alt: 'Company 2' },
  { url: logo3, alt: 'Company 3' },
  { url: logo4, alt: 'Company 4' },
  { url: logo5, alt: 'Company 5' },
];


const Marquee: React.FC = () => {
  // Duplicate logos for a seamless scroll effect
  const extendedLogos = [...clientLogos, ...clientLogos];

  return (
    <section id="clients" className="py-16 sm:py-24 bg-white relative">
      <style>
        {`
          @keyframes infinite-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-infinite-scroll {
            animation: infinite-scroll 15s linear infinite;
          }
        `}
      </style>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-12">
          Trusted by the world's best companies
        </h2>
        <div
          className="relative w-full overflow-hidden"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        >
          <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused]">
            {extendedLogos.map((logo, index) => (
              <div key={index} className="flex-shrink-0 px-12 py-4 flex items-center justify-center">
                <img
                  src={logo.url}
                  alt={logo.alt}
                  className="h-10 w-auto object-contain grayscale transition-all duration-300 ease-in-out hover:grayscale-0 hover:scale-110"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marquee;
