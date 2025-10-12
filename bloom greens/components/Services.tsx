import React, { useState } from 'react';
import ServiceModal from './ServiceModal';

interface ServicesProps {
  isVisible?: boolean;
  isMobile?: boolean;
  scrollToSection: (index: number) => void;
}

interface ServiceData {
    title: string;
    description: string;
    img: string;
    details: {
        intro: string;
        features: string[];
    };
}

const servicesData: ServiceData[] = [
  {
    title: 'Construction',
    description: 'From groundbreaking to handover, we manage all aspects of construction with precision and quality.',
    img: 'https://cdn.jsdelivr.net/gh/chandru36james/website@main/bloom%20greens/assets/images/construction%20(25).avif',
    details: {
      intro: "Our construction services form the bedrock of our company. We specialize in bringing architectural visions to life, handling everything from residential homes to large-scale commercial structures. Our commitment to quality materials, skilled craftsmanship, and meticulous project management ensures that every build is not only beautiful but also durable and up to code.",
      features: [
        "Full-service project management from planning to completion.",
        "High-quality material sourcing and procurement.",
        "Experienced and certified construction crews.",
        "Strict adherence to timelines and budgets.",
        "Transparent communication and client collaboration."
      ]
    }
  },
  {
    title: 'Interior Design',
    description: 'Crafting spaces that reflect your personality and lifestyle with elegance and functionality.',
    img: 'https://cdn.jsdelivr.net/gh/chandru36james/website@main/bloom%20greens/assets/images/interior/interior%20(15).avif',
    details: {
      intro: "We believe that a well-designed interior can transform a house into a home. Our interior design team works closely with clients to create spaces that are a true reflection of their personality and needs. We balance aesthetics with functionality, creating environments that are both inspiring and comfortable for everyday living.",
      features: [
        "Personalized design consultation and space planning.",
        "Custom furniture, lighting, and fixture selection.",
        "Color palette and material coordination.",
        "3D rendering and visualization.",
        "Complete installation and styling services."
      ]
    }
  }
];

const ServicePanel: React.FC<{
  service: ServiceData;
  isVisible?: boolean;
  delay: number;
  onDiscoverMore: (service: ServiceData) => void;
}> = ({ service, isVisible, delay, onDiscoverMore }) => {
  const titleWords = service.title.split(' ');
  return (
    <div
      className={`group relative w-full lg:w-auto lg:flex-1 h-[50vh] lg:h-full flex items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out lg:hover:flex-[2] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <img
        src={service.img}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors duration-500"></div>
      <div className="relative z-10 text-center text-white p-8">
        <h3 className="text-4xl lg:text-5xl font-playfair font-bold mb-4">
          {titleWords.map((word, index) => (
            <span key={index} className="inline-block overflow-hidden mr-3">
              <span
                className={`inline-block transform transition-all duration-500 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                style={{ transitionDelay: `${delay + 200 + index * 100}ms` }}
              >
                {word}
              </span>
            </span>
          ))}
        </h3>
        <p className="max-w-xs leading-relaxed mb-6 lg:opacity-0 transform transition-all duration-500 ease-out delay-100 lg:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
          {service.description}
        </p>
        <button 
          onClick={() => onDiscoverMore(service)}
          className="inline-block font-semibold border-b-2 border-brand-gold pb-1 text-brand-gold lg:opacity-0 transform transition-all duration-500 ease-out delay-200 lg:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
          Discover More
        </button>
      </div>
    </div>
  );
};

const Services: React.FC<ServicesProps> = ({ isVisible, isMobile, scrollToSection }) => {
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);

  const handleDiscoverMore = (service: ServiceData) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const handleNavigateToPortfolio = () => {
    handleCloseModal();
    // Use a short timeout to allow the modal to close before scrolling
    setTimeout(() => {
        scrollToSection(3);
    }, 300);
  };


  return (
    <>
      <section className={`w-full overflow-hidden bg-brand-dark ${isMobile ? '' : 'h-full'}`}>
        <div className="flex flex-col lg:flex-row w-full h-full">
          {servicesData.map((service, index) => (
            <ServicePanel
              key={service.title}
              service={service}
              isVisible={isVisible}
              delay={index * 200}
              onDiscoverMore={handleDiscoverMore}
            />
          ))}
        </div>
      </section>
      {selectedService && (
        <ServiceModal 
            service={selectedService}
            onClose={handleCloseModal}
            onNavigate={handleNavigateToPortfolio}
        />
      )}
    </>
  );
};

export default Services;