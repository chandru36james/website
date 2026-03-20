
import React, { useState, useEffect } from 'react';

const Preloader: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
    const [status, setStatus] = useState('Initializing_Core');
    
    useEffect(() => {
        if (!isVisible) return;
        const statuses = [
            'Initializing_Core',
            'Syncing_Nodes',
            'Loading_Assets',
            'Verifying_Registry',
            'Connection_Stable'
        ];
        let i = 0;
        const interval = setInterval(() => {
            i = (i + 1) % statuses.length;
            setStatus(statuses[i]);
        }, 400);
        return () => clearInterval(interval);
    }, [isVisible]);

    return (
        <div 
            className={`fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center text-white transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            {/* Industrial Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
                <div className="w-full h-[2px] bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)] animate-[scan_3s_linear_infinite]"></div>
            </div>

            <style>{`
                @keyframes scan {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100vh); }
                }
            `}</style>

            <div className="relative flex flex-col items-center">
                {/* Pulsing Logo Node */}
                <div className="relative mb-8">
                    <div className="absolute -inset-4 bg-red-600/10 rounded-full blur-xl animate-pulse"></div>
                    <img 
                        src="https://www.vgotyou.com/assets/logo.png" 
                        alt="VGot You Logo" 
                        className="h-20 w-20 md:h-24 md:w-24 object-contain relative z-10" 
                    />
                </div>

                <div className="text-center space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold font-cambria tracking-tight">VGot You</h1>
                    <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></div>
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em]">
                                {status}
                            </span>
                        </div>
                        <div className="w-48 h-[1px] bg-zinc-900 mt-2 relative overflow-hidden">
                            <div className="absolute inset-y-0 left-0 bg-red-600 w-1/2 animate-[progress_2s_ease-in-out_infinite]"></div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes progress {
                    0% { left: -50%; width: 30%; }
                    50% { width: 50%; }
                    100% { left: 100%; width: 30%; }
                }
            `}</style>

            <div className="absolute bottom-12 text-[8px] font-mono text-zinc-800 uppercase tracking-[0.5em]">
                Digital_Excellence_Laboratory_v4.0
            </div>
        </div>
    );
};

export default Preloader;
