
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const { Link } = ReactRouterDOM as any;

const Star: React.FC<{ top: string, left: string, duration: string, delay: string, size: string }> = ({ top, left, duration, delay, size }) => (
    <div
        className="absolute rounded-full bg-zinc-600 animate-pulse"
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
        <svg viewBox="0 0 200 200" width="200" height="200" className="drop-shadow-2xl">
            <g className="animate-bounce" style={{ animationDuration: '4s' }}>
                <path d="M 50,80 Q 50,50 80,50 L 120,50 Q 150,50 150,80 L 150,130 Q 150,160 120,160 L 80,160 Q 50,160 50,130 Z" fill="#09090b" stroke="#27272a" strokeWidth="2"/>
                <rect x="65" y="100" width="70" height="20" rx="2" fill="#18181b"/>
                <circle cx="100" cy="145" r="5" fill="#dc2626" className="animate-pulse" />
            </g>
            <g>
                <path d="M 70,55 Q 70,25 100,25 Q 130,25 130,55" fill="none" stroke="#27272a" strokeWidth="2" />
                <circle cx="100" cy="60" r="15" fill="#000" stroke="#27272a" strokeWidth="1" />
                <circle
                    cx={100 + eyePosition.x}
                    cy={60 + eyePosition.y}
                    r="4"
                    fill="#dc2626"
                    className="transition-transform duration-200 ease-out"
                />
            </g>
        </svg>
    );
};

const NotFound: React.FC = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const x = (event.clientX / window.innerWidth - 0.5) * 2;
            const y = (event.clientY / window.innerHeight - 0.5) * 2;
            setMousePos({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const parallax = (depth: number) => ({
        transform: `translateX(${mousePos.x * depth}px) translateY(${mousePos.y * depth}px)`,
        transition: 'transform 0.3s ease-out',
    });

    const stars = [
        { top: '10%', left: '15%', duration: '2s', delay: '0s', size: '2px' },
        { top: '25%', left: '80%', duration: '3s', delay: '1s', size: '1px' },
        { top: '80%', left: '10%', duration: '2.5s', delay: '0.5s', size: '2px' },
        { top: '60%', left: '90%', duration: '4s', delay: '2s', size: '1px' },
    ];

    return (
        <div className="bg-black text-white min-h-screen flex items-center justify-center text-center px-6 relative overflow-hidden font-sans">
            <Helmet>
                <title>404 - Page Not Found | VGot You</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            {stars.map((star, i) => <Star key={i} {...star} />)}
            
            <div className="z-10 flex flex-col items-center">
                <div style={parallax(15)} className="mb-8">
                    <LostRobotSVG eyePosition={{ x: mousePos.x * 5, y: mousePos.y * 5 }} />
                </div>
                
                <div style={parallax(-10)}>
                    <h1 className="text-9xl font-black tracking-tighter text-zinc-900 leading-none mb-4">404</h1>
                    <span className="text-red-600 font-mono text-[10px] uppercase tracking-[0.5em] block mb-8">Signal_Lost_In_Void</span>
                </div>

                <div style={parallax(-5)} className="max-w-sm">
                    <h2 className="text-2xl font-bold uppercase tracking-tight mb-4">Quadrant Unknown</h2>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-10 font-light">
                        The requested node does not exist in the current directory. Returning to base recommended.
                    </p>
                    <Link
                        to="/"
                        className="inline-block bg-white text-black font-bold py-4 px-10 rounded-sm text-[10px] uppercase tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all active:scale-95 shadow-2xl"
                    >
                        Re-Establish Connection
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
