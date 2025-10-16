import React from 'react';
import { ICONS, WHATSAPP_LINK } from '../constants';

const WhatsAppStickyButton: React.FC = () => {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-40 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:bg-[#128C7E] transition-all duration-200 ease-in-out group"
    >
      {React.cloneElement(ICONS.whatsapp, { className: 'w-8 h-8' })}
       <span className="absolute top-1/2 -translate-y-1/2 left-auto right-[calc(100%_+_0.5rem)] w-max bg-primary text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Chat on WhatsApp
        </span>
    </a>
  );
};

export default WhatsAppStickyButton;