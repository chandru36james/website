import React, { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

const CountUp: React.FC<CountUpProps> = ({ 
  end, 
  duration = 2000, 
  suffix = '', 
  prefix = '', 
  decimals = 0, 
  className = '' 
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 } // Trigger when 10% visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function: easeOutExpo (starts fast, slows down at end)
      const ease = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      const current = ease * end;
      setCount(current);

      if (progress < duration) {
        animationFrame = window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrame = window.requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [hasAnimated, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
};

export default CountUp;