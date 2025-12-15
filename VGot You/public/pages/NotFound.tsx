import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Star: React.FC<{ top: string, left: string, duration: string, delay: string, size: string }> = ({ top, left, duration, delay, size }) => (
    <div
        className="absolute rounded-full bg-zinc-400 animate-pulse"
        style={{
            top,
            left,
            animationDuration: duration,
            animationDelay: delay,
            width: size,
            height: size,
        }}
    />
);

const LostRobotSVG: React.FC<{ eyePosition: { x: number, y: number } }> = ({ eyePosition }) => {
    return (
        <svg viewBox="0 0 200 200" width="200" height="200" className="drop-shadow-lg">
            {/* Main Body */}
            <g style={{ animation: 'float 6s ease-in-out infinite' }}>
                <path d="M 50,80 Q 50,50 80,50 L 120,50 Q 150,50 150,80 L 150,130 Q 150,160 120,160 L 80,160 Q 50,160 50,130 Z" fill="#f4f4f5" stroke="#a1a1aa" strokeWidth="3"/>
                <rect x="65" y="100" width="70" height="20" rx="5" fill="#d4d4d8"/>
                <circle cx="100" cy="145" r="8" fill="#a1a1aa" />
            </g>
            {/* Head */}
            <g style={{ animation: 'float 6s ease-in-out infinite', animationDelay: '0.2s' }}>
                <path d="M 70,55 Q 70,25 100,25 Q 130,25 130,55" fill="#f4f4f5" stroke="#a1a1aa" strokeWidth="3" />
                <circle cx="100" cy="60" r="18" fill="#18181b" />
                {/* Eye Pupil */}
                <circle
                    cx={100 + eyePosition.x}
                    cy={60 + eyePosition.y}
                    r="6"
                    fill="#ffffff"
                    className="transition-transform duration-200 ease-out"
                />
                 {/* Antenna */}
                <line x1="130" y1="40" x2="145" y2="20" stroke="#a1a1aa" strokeWidth="3" />
                <circle cx="145" cy="20" r="4" fill="#a1a1aa" className="animate-pulse" />
            </g>
        </svg>
    );
};

const NotFound: React.FC = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const { clientX, clientY } = event;
            const x = (clientX / window.innerWidth - 0.5) * 2; // range -1 to 1
            const y = (clientY / window.innerHeight - 0.5) * 2; // range -1 to 1
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const parallax = (depth: number) => ({
        transform: `translateX(${mousePos.x * depth}px) translateY(${mousePos.y * depth}px)`,
        transition: 'transform 0.2s ease-out',
    });

    const eyePosition = {
        x: mousePos.x * 8,
        y: mousePos.y * 8,
    };

    const stars = [
        { top: '10%', left: '15%', duration: '2s', delay: '0s', size: '2px' },
        { top: '25%', left: '80%', duration: '3s', delay: '1s', size: '3px' },
        { top: '80%', left: '10%', duration: '2.5s', delay: '0.5s', size: '2px' },
        { top: '60%', left: '90%', duration: '4s', delay: '2s', size: '1px' },
        { top: '40%', left: '5%', duration: '3s', delay: '1.5s', size: '1px' },
        { top: '90%', left: '50%', duration: '2s', delay: '0.2s', size: '2px' },
    ];

    return (
        <div className="bg-brand-black text-brand-light-gray min-h-screen flex items-center justify-center text-center px-6 pt-24 pb-12 relative overflow-hidden">
            {stars.map((star, i) => <Star key={i} {...star} />)}
            
            <div className="z-10 flex flex-col items-center">
                <div style={parallax(20)}>
                    <LostRobotSVG eyePosition={eyePosition} />
                </div>
                
                <div className="relative" style={parallax(-15)}>
                    <h1 className="text-8xl md:text-9xl font-bold font-cambria text-zinc-700" style={{ textShadow: '4px 4px 0px #27272a' }}>
                        404
                    </h1>
                </div>

                <div style={parallax(-5)}>
                    <h2 className="text-3xl md:text-4xl font-bold mt-8 mb-2">Houston, we have a problem.</h2>
                    <p className="text-lg text-zinc-400 max-w-md mx-auto mb-8">
                        It seems you've drifted off into an unknown quadrant. Let's get you back to base.
                    </p>
                    <Link
                        to="/"
                        className="inline-block bg-brand-light-gray text-brand-black font-semibold py-3 px-8 rounded-full hover:bg-zinc-200 transition-all transform hover:scale-105 shadow-lg hover:shadow-zinc-300/20"
                    >
                        Return to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
