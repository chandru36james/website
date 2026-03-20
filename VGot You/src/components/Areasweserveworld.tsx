import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


// World map SVG data (simplified for brevity, you'd typically import a full SVG file)
// This is a placeholder. For a real map, you would use a detailed SVG map
// and meticulously find the coordinates for each country.
// The viewbox is crucial for coordinate mapping.
const WorldMapSVG = ({ className }) => (
    <svg 
        className={className} 
        viewBox="0 0 1000 500" // Adjust viewBox to fit your actual SVG map and coordinate system
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.35"
    >
        {/* Placeholder paths for a dotted world map style */}
        {/* In a real scenario, these would be detailed paths for continents/countries */}
        <path d="M40 80 Q100 20 200 80 T360 80 Q400 60 420 120 T580 120 Q600 100 620 160 T780 160 Q800 140 820 200 T980 200" strokeDasharray="2,3" />
        <path d="M60 420 Q120 480 240 420 T400 420 Q420 440 440 380 T600 380 Q620 400 640 340 T800 340 Q820 360 840 300 T1000 300" strokeDasharray="2,3" />
        <path d="M0 250 H1000" strokeDasharray="2,3" />
        <path d="M500 0 V500" strokeDasharray="2,3" />
        {/* Add more generic dotted paths to simulate a world map */}
        <path d="M100 50 L120 70 L140 50 L160 70 L180 50" strokeDasharray="1,2" />
        <path d="M800 100 L820 120 L840 100 L860 120 L880 100" strokeDasharray="1,2" />
        <path d="M150 400 L170 420 L190 400 L210 420 L230 400" strokeDasharray="1,2" />
        <path d="M750 350 L770 370 L790 350 L810 370 L830 350" strokeDasharray="1,2" />
        <path d="M300 180 L320 200 L340 180 L360 200 L380 180" strokeDasharray="1,2" />
        <path d="M600 280 L620 300 L640 280 L660 300 L680 280" strokeDasharray="1,2" />

        {/* This SVG is a placeholder. In a real application, you would replace this
            with a more accurate world map SVG. The coordinates below (x, y)
            are based on a 1000x500 viewBox. You will need to adjust them
            based on the viewBox and actual layout of your chosen map SVG.
            A good approach is to open your SVG in an editor, identify a country's
            center, and use its coordinates.
        */}
    </svg>
);


const locations = [
    { name: "India", x: 740, y: 300, link: "/web-design/india" },        // Example coordinates for India
    { name: "United Kingdom", x: 490, y: 190, link: "/web-design/uk" },  // Example coordinates for UK
    { name: "United States", x: 180, y: 220, link: "/web-design/usa" },  // Example coordinates for USA (mid-country)
    { name: "Canada", x: 200, y: 120, link: "/web-design/canada" },      // Example coordinates for Canada
    { name: "Australia", x: 850, y: 400, link: "/web-design/australia" },// Example coordinates for Australia
    { name: "UAE", x: 590, y: 280, link: "/web-design/uae" },           // Example coordinates for UAE
    // Add more locations here
];

const AreasWeServe = () => {
    const [hoveredLocation, setHoveredLocation] = useState(null);
    const navigate = useNavigate();

    return (
        <section className="relative bg-black text-white py-16 md:py-24 overflow-hidden">
            <div className="container mx-auto px-4 text-center z-10 relative">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                    <span className="bg-gradient-to-r from-red-600 to-red-400 text-transparent bg-clip-text">Areas We Serve</span> Worldwide
                </h2>
                <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-16">
                    We provide professional web design and digital services for businesses across multiple countries.
                </p>

                <div className="relative w-full max-w-5xl mx-auto aspect-[2/1] md:aspect-[2/1] flex items-center justify-center">
                    {/* Background grid for subtle tech feel */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:30px_30px] opacity-10"></div>
                    
                    {/* World Map SVG */}
                    <WorldMapSVG className="w-full h-full text-zinc-500 opacity-90" />

                    {/* Interactive Dots */}
                    {locations.map((location) => (
                        <motion.div
                            key={location.name}
                            className="absolute cursor-pointer"
                            style={{ 
                                left: `${(location.x / 1000) * 100}%`, // Convert SVG coords to percentage
                                top: `${(location.y / 500) * 100}%`    // Convert SVG coords to percentage
                            }}
                            onHoverStart={() => setHoveredLocation(location)}
                            onHoverEnd={() => setHoveredLocation(null)}
                            onClick={() => navigate(location.link)}
                            whileHover={{ scale: 1.2 }}
                            initial={{ scale: 1 }}
                            animate={{ 
                                scale: [1, 1.1, 1], // Soft pulse animation
                                transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                            }}
                        >
                            <div className="w-3 h-3 md:w-4 md:h-4 bg-red-600 rounded-full shadow-lg border-2 border-red-400 animate-pulse-slow"></div>

                            {/* Tooltip */}
                            <AnimatePresence>
                                {hoveredLocation?.name === location.name && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 px-3 bg-zinc-800 border border-zinc-700 rounded-md shadow-xl whitespace-nowrap text-xs md:text-sm font-medium text-white pointer-events-none z-20"
                                        style={{ transform: 'translateX(-50%) translateY(-5px)' }} // Adjust for floating effect
                                    >
                                        {location.name}
                                        {/* Optional: Add a small arrow to the tooltip */}
                                        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-zinc-800"></div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AreasWeServe;