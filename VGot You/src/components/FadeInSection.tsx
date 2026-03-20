import React, { useState, useEffect, useRef } from 'react';

const FadeInSection: React.FC<{ children: React.ReactNode, className?: string, id?: string }> = ({ children, className = '', id }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Optional: Stop observing once visible if you only want it to trigger once
                    // observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 }); // Trigger when 10% visible

        const { current } = domRef;
        if (current) observer.observe(current);

        return () => {
            if (current) observer.unobserve(current);
        };
    }, []);

    return (
        <section 
            id={id}
            ref={domRef} 
            className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
        >
            {children}
        </section>
    );
};

export default FadeInSection;