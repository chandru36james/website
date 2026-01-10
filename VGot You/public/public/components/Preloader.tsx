import React from 'react';

const Preloader: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
    return (
        <div className={`fixed inset-0 bg-brand-black z-[100] flex flex-col items-center justify-center text-white transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <img src={"https://www.vgotyou.com/assets/logo.png"} alt="VGotYou Logo" className="h-20 w-20 object-contain animate-pulse mb-4" />
            <h1 className="text-4xl font-cambria">VGot You</h1>
            <p className="text-lg text-zinc-400 mt-2">Crafting Code & Creative Identities</p>
        </div>
    );
};

export default Preloader;
