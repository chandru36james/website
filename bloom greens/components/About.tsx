import React from 'react';

interface AboutProps {
  isVisible?: boolean;
  isMobile?: boolean;
}

const About: React.FC<AboutProps> = ({ isVisible, isMobile }) => {
  const features = [
    {
      title: "Expert Construction",
      description: "Our skilled team delivers top-tier craftsmanship, ensuring every structure is built to last."
    },
    {
      title: "Innovative Design",
      description: "We create spaces that are not only beautiful but also functional, tailored to your unique lifestyle."
    },
    {
      title: "On-Time Delivery",
      description: "With meticulous planning, we guarantee your project is completed on schedule and within budget."
    }
  ];
  
  const titleWords = "Building Dreams Since 2010".split(' ');

  if (isMobile) {
    return (
       <section className="relative w-full bg-brand-dark text-white py-24 px-4 overflow-hidden">
        <img 
          src="https://cdn.jsdelivr.net/gh/chandru36james/website@main/bloom%20greens/assets/images/construction%20(10).avif" 
          alt="Modern architecture" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className={`relative z-10 container mx-auto text-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-brand-gold font-semibold tracking-widest uppercase mb-2">CONSTRUCTION & INTERIOR DESIGN</h3>
          <h2 className="text-4xl font-playfair font-bold mb-6">
            {titleWords.map((word, index) => (
              <span key={index} className="inline-block overflow-hidden mr-2">
                <span
                  className={`inline-block transform transition-all duration-500 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                  style={{ transitionDelay: `${100 + index * 100}ms` }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 mb-10 leading-relaxed">
            We are a team of passionate designers and construction professionals dedicated to creating beautiful, functional, and enduring spaces. With years of experience, we pride ourselves on our attention to detail, quality craftsmanship, and client satisfaction.
          </p>
          <div className="space-y-8 max-w-lg mx-auto text-left">
            {features.map((feature, index) => (
              <div key={index} className={`flex items-start transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`} style={{transitionDelay: `${300 + index * 150}ms`}}>
                 <div className="flex-shrink-0 w-10 h-10 bg-brand-gold/80 text-white rounded-full flex items-center justify-center font-bold text-lg border-2 border-brand-gold">
                    0{index + 1}
                  </div>
                <div className="ml-4">
                  <h4 className="text-xl font-playfair font-bold text-white">{feature.title}</h4>
                  <p className="text-gray-400 mt-1">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`w-full bg-white flex items-center overflow-hidden h-full`}>
        <div className="grid grid-cols-1 lg:grid-cols-5 w-full h-full items-center">
            {/* Content Column */}
            <div className={`lg:col-span-3 relative py-12 px-8 sm:px-12 lg:pl-24 lg:pr-12 transition-opacity duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className={`relative transition-transform duration-1000 ease-out ${isVisible ? 'translate-y-0' : 'translate-y-10'}`}>
                    <span className="absolute -top-16 -left-8 text-[120px] font-playfair font-black text-gray-100 opacity-80 z-0 select-none">About</span>
                    
                    <div className="relative z-10">
                        <h3 className="text-brand-gold font-semibold tracking-widest uppercase mb-2">CONSTRUCTION & INTERIOR DESIGN</h3>
                        <h2 className="text-5xl font-playfair font-bold text-brand-dark mb-6">
                          {titleWords.map((word, index) => (
                            <span key={index} className="inline-block overflow-hidden mr-3">
                              <span
                                className={`inline-block transform transition-all duration-500 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                                style={{ transitionDelay: `${150 + index * 100}ms` }}
                              >
                                {word}
                              </span>
                            </span>
                          ))}
                        </h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                          We are a team of passionate designers and construction professionals dedicated to creating beautiful, functional, and enduring spaces. With years of experience, we pride ourselves on our attention to detail and client satisfaction.
                        </p>
                        
                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <div key={index} className={`flex items-start transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`} style={{transitionDelay: `${300 + index * 150}ms`}}>
                                    <div className="flex-shrink-0 w-10 h-10 bg-brand-gold text-white rounded-full flex items-center justify-center font-bold text-lg">
                                        0{index + 1}
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-xl font-playfair font-bold text-brand-dark">{feature.title}</h4>
                                        <p className="text-gray-600 mt-1">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Column */}
            <div className={`lg:col-span-2 h-full w-full overflow-hidden transition-opacity duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <img src="https://cdn.jsdelivr.net/gh/chandru36james/website@main/bloom%20greens/assets/images/construction%20(10).avif" className="w-full h-full object-cover" alt="Modern building architecture" />
            </div>
        </div>
    </section>
  );
};

export default About;