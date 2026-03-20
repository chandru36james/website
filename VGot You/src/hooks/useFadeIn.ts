
import { useEffect, useRef, RefObject } from 'react';

export const useFadeIn = (): RefObject<HTMLDivElement> => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (element) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.1,
                }
            );
            observer.observe(element);

            return () => {
                observer.unobserve(element);
            };
        }
    }, []);

    return ref;
};
