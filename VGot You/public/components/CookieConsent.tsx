import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2-4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-3-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4 1c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm1-4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" opacity="0.5"/>
        <path d="M21.9 12.9c-.2 0-.4-.1-.6-.2-.3-.2-.4-.6-.2-.9.4-.9.4-1.9 0-2.8-.4-.9-1.1-1.6-2-2-.9-.4-1.9-.4-2.8 0-.3.2-.7.1-.9-.2-.3-.1-.7.2-.9.9-.4 1.6-1.1 2-2 .4-.9.4-1.9 0-2.8-.2-.3-.1-.7.2-.9.3-.2.7-.1.9.2.6 1.1 1.6 2 2.7 2.4.3.1.5.5.4.8-.5 3.3-1.4 6.3-2.6 9-.1.3-.4.4-.7.4h-.6z"/>
    </svg>
);

const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check local storage for consent
        const consent = localStorage.getItem('vgotyou-cookie-consent');
        if (!consent) {
            // Delay appearance for better UX
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('vgotyou-cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('vgotyou-cookie-consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:w-[320px] z-[100]"
                >
                    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-xl rounded-xl p-4 backdrop-blur-xl bg-opacity-95 dark:bg-opacity-95">
                        <div className="flex items-start gap-3 mb-3">
                            <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-full flex-shrink-0 animate-pulse">
                                <CookieIcon className="w-5 h-5 text-red-600 dark:text-red-500" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-0.5">
                                    Cookie Policy
                                </h3>
                                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                    We use cookies to optimize your experience. By continuing, you agree to our policy.
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex gap-2">
                            <button
                                onClick={handleDecline}
                                className="flex-1 px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                            >
                                Decline
                            </button>
                            <button
                                onClick={handleAccept}
                                className="flex-1 px-3 py-2 text-xs font-semibold text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-lg shadow-sm transition-transform active:scale-95"
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;