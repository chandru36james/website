import { useEffect, useRef } from 'react';

export const useFadeIn = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            // Initial state
            ref.current.classList.add('transition-all', 'duration-1000', 'ease-out', 'opacity-0', 'translate-y-10');
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return ref;
};