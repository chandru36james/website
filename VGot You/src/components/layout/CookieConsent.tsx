import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const m = motion as any;

const DiagnosticMarker = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-600/40">
        <path d="M0 6H12M6 0V12" stroke="currentColor" strokeWidth="0.5"/>
        <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="0.5"/>
    </svg>
);

const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('vgotyou-cookie-consent');
        if (!consent) {
            setIsVisible(true); // ✅ no delay, cleaner UX
        }
    }, []);

    // ✅ Accept (NO RELOAD)
    const handleAccept = () => {
        localStorage.setItem('vgotyou-cookie-consent', 'accepted');
        setIsVisible(false);

        // 🔥 Run your actual logic here (analytics, tracking, etc.)
        enableTracking();
    };

    const handleDecline = () => {
        localStorage.setItem('vgotyou-cookie-consent', 'declined');
        setIsVisible(false);
    };

    const enableTracking = () => {
        console.log("Cookies accepted - tracking enabled");

        if (typeof window !== "undefined" && window.gtag) {
            window.gtag('consent', 'update', {
                'analytics_storage': 'granted',
                'ad_storage': 'granted',
                'personalization_storage': 'granted'
            });
            // ✅ Start tracking immediately
            window.gtag('config', 'G-XRBQTY2DLC');
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <m.div
                    initial={{ y: 50, opacity: 0, scale: 0.98 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:bottom-6 md:right-6 md:w-[380px] z-[100]"
                >
                    <div className="relative bg-black border border-zinc-800 rounded-sm shadow-[0_15px_40px_rgba(0,0,0,0.6)] overflow-hidden">

                        {/* Header */}
                        <div className="flex items-center justify-between px-3 md:px-4 py-2 border-b border-zinc-900 bg-zinc-950/50">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></div>
                                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-500">
                                    Security_Protocol
                                </span>
                            </div>
                            <span className="text-[8px] font-mono text-zinc-700">v2.5</span>
                        </div>

                        {/* Content */}
                        <div className="p-5 relative">

                            <div className="absolute top-2 right-2 opacity-10 hidden sm:block">
                                <DiagnosticMarker />
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="relative shrink-0">
                                    <div className="w-12 h-12 border border-zinc-800 rounded-sm flex items-center justify-center bg-zinc-950">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-white">
                                        System Cookies
                                    </h3>
                                    <p className="text-[11px] font-mono text-zinc-500 leading-relaxed uppercase mt-1">
                                        We deploy diagnostic nodes to analyze session performance.
                                    </p>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="mt-6 flex gap-3">
                                <button
                                    onClick={handleDecline}
                                    className="flex-1 py-3 px-3 border border-zinc-800 text-[10px] font-mono uppercase tracking-widest text-zinc-600 hover:text-zinc-300 hover:border-zinc-700 transition-all active:scale-95"
                                >
                                    Decline
                                </button>

                                <button
                                    onClick={handleAccept}
                                    className="flex-1 py-3 px-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-red-500 transition-all active:scale-95"
                                >
                                    Accept
                                </button>
                            </div>

                            <div className="mt-4 pt-4 border-t border-zinc-900 text-center">
                                <span className="text-[7px] font-mono text-zinc-700 uppercase">
                                    Agreement required for terminal access
                                </span>
                            </div>

                        </div>
                    </div>
                </m.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;