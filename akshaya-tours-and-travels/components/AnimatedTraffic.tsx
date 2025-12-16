import React from 'react';

const AnimatedTraffic: React.FC = () => {
  return (
    <div className="w-full overflow-hidden bg-gray-800 border-t border-gray-700 relative h-24">
      
      {/* Sky Section (Top 40%) */}
      <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-blue-900/30 to-transparent pointer-events-none">
         {/* Clouds / Stars could go here */}
      </div>

      {/* Aeroplane Animation */}
      <div className="absolute top-2 left-[-100px] animate-fly z-10 opacity-80">
         <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-300 rotate-90">
             <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0"/>
             <path d="M12 2L2 22H22L12 2Z" fill="currentColor"/> 
             {/* Simple Plane Shape */}
             <path d="M22 12L2 12L10 2L14 2L22 12Z" fill="currentColor"/>
             <path d="M12 2V22" stroke="currentColor" strokeWidth="0.5"/>
             {/* Better Plane Icon */}
             <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="currentColor"/>
         </svg>
      </div>

      {/* Road Markings (Bottom) */}
      <div className="absolute bottom-4 left-0 w-full h-0.5 bg-dashed border-t-2 border-dashed border-gray-600"></div>

      {/* Traffic Container */}
      <div className="flex w-full absolute bottom-1 h-12 items-end">
        
        {/* Car 1 (Sedan) */}
        <div className="animate-[drive_15s_linear_infinite] absolute left-[-150px] bottom-1 z-20">
           <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 20 L15 20 L18 10 L42 10 L45 20 L55 20 A3 3 0 0 1 58 23 L58 28 L2 28 L2 23 A3 3 0 0 1 5 20 Z" fill="#3B82F6" stroke="#1E40AF" strokeWidth="1"/>
              <circle cx="12" cy="28" r="4" fill="#333" stroke="#555" />
              <circle cx="48" cy="28" r="4" fill="#333" stroke="#555" />
              <path d="M20 12 L28 12 L28 19 L18 19 Z" fill="#bfdbfe"/>
              <path d="M30 12 L40 12 L42 19 L30 19 Z" fill="#bfdbfe"/>
           </svg>
        </div>

        {/* Bike (Motorcycle) */}
        <div className="animate-[drive_10s_linear_infinite_7s] absolute left-[-150px] bottom-2 z-30">
           <svg width="40" height="25" viewBox="0 0 40 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Wheels */}
              <circle cx="8" cy="19" r="5" fill="#333" stroke="#777" strokeWidth="1"/>
              <circle cx="32" cy="19" r="5" fill="#333" stroke="#777" strokeWidth="1"/>
              {/* Body */}
              <path d="M8 19 L15 10 L25 10 L32 19" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
              <path d="M15 10 L12 5" stroke="#777" strokeWidth="2" /> {/* Handlebars */}
              <circle cx="18" cy="8" r="3" fill="#333" /> {/* Rider Body placeholder */}
              <path d="M20 10 L28 10" stroke="#333" strokeWidth="3" /> {/* Seat */}
           </svg>
        </div>

        {/* Car 2 (Van/Suv) - Delayed */}
        <div className="animate-[drive_20s_linear_infinite_2s] absolute left-[-150px] bottom-1 z-10">
           <svg width="70" height="35" viewBox="0 0 70 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 25 L5 10 L20 5 L60 5 L65 15 L65 25 A3 3 0 0 1 68 28 L68 33 L2 33 L2 28 A3 3 0 0 1 5 25 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1"/>
              <circle cx="15" cy="33" r="5" fill="#333" stroke="#555" />
              <circle cx="55" cy="33" r="5" fill="#333" stroke="#555" />
              <rect x="22" y="8" width="15" height="10" fill="#fde68a"/>
              <rect x="40" y="8" width="15" height="10" fill="#fde68a"/>
              <path d="M8 11 L18 8 L18 18 L8 18 Z" fill="#fde68a"/>
           </svg>
        </div>
      </div>
    </div>
  );
};

export default AnimatedTraffic;