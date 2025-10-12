import React from 'react';
import CloseIcon from './icons/CloseIcon';

interface Service {
    title: string;
    img: string;
    details: {
        intro: string;
        features: string[];
    };
}

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
  onNavigate: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onNavigate }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex items-center justify-center p-4" 
      onClick={onClose}
      style={{ animation: 'fadeIn 0.3s ease-out' }}
    >
      <div 
        className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full overflow-hidden" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-h-[90vh] overflow-y-auto">
          <img src={service.img} alt={service.title} className="w-full h-64 object-cover" />
          <div className="p-8">
            <h2 className="text-3xl font-playfair font-bold text-brand-dark mb-4">{service.title}</h2>
            <p className="text-gray-700 leading-relaxed mb-6">{service.details.intro}</p>
            <h3 className="text-xl font-playfair font-bold text-brand-dark mb-4">Key Features</h3>
            <ul className="space-y-2 list-disc list-inside text-gray-600 mb-8">
                {service.details.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
            <button
                onClick={onNavigate}
                className="btn-slide-hover slide-gold-dark bg-brand-gold text-white font-bold py-3 px-8 rounded-full transition-all duration-300 text-lg"
            >
                <span>View Related Projects</span>
            </button>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-brand-dark bg-white/70 rounded-full p-2 z-10 hover:bg-white transition-all"
          aria-label="Close"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
      </div>
       <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ServiceModal;