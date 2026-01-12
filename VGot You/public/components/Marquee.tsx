import React from 'react';

// Define the shape of a logo object
interface Logo {
    name: string;
    imageUrl: string;
}

// Define the props for the Marquee component
interface MarqueeProps {
    logos: Logo[];
}

/**
 * A reusable component that displays a continuously scrolling marquee of logos.
 * The animation pauses on hover for better user interaction.
 */
const Marquee: React.FC<MarqueeProps> = ({ logos }) => {
    // Duplicate the logos array to create a seamless looping effect.
    const duplicatedLogos = [...logos, ...logos];

    return (
        <div className="relative w-full overflow-hidden bg-black py-12 group" role="region" aria-label="Client Logos Marquee">
            <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
                {duplicatedLogos.map((logo, index) => (
                    <div
                        key={`${logo.name}-${index}`}
                        className="flex-shrink-0 mx-8 flex items-center justify-center"
                        style={{ width: '160px' }}
                    >
                        <img
                            src={logo.imageUrl}
                            alt={logo.name}
                            className="max-w-full max-h-16 object-contain filter grayscale hover:grayscale-0 invert transition-all duration-300"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marquee;