
"use client";
import React, { useMemo } from "react";
import { motion } from "motion/react";

// FIX: Cast motion to any to resolve IntrinsicAttributes prop errors for motion components
const m = motion as any;

function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

type SparklesProps = {
  id?: string;
  className?: string;
  minSize?: number;
  maxSize?: number;
  particleColor?: string;
  particleDensity?: number;
};

export const SparklesCore = (props: SparklesProps) => {
  const {
    className,
    minSize = 0.4,
    maxSize = 1.0,
    particleColor = "#FFFFFF",
    particleDensity = 30, // Reduced from 100 to save CPU/Main thread
  } = props;

  const stars = useMemo(() => {
    const count = Math.floor(particleDensity);
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (maxSize - minSize) + minSize,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
    }));
  }, [particleDensity, minSize, maxSize]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {stars.map((star) => (
        <m.div
          key={star.id}
          className="absolute rounded-full transform-gpu"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor: particleColor,
            boxShadow: `0 0 ${star.size * 2}px ${particleColor}`,
            willChange: 'opacity, transform'
          }}
          animate={{
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "linear", // Linear is cheaper than easeInOut for many small elements
          }}
        />
      ))}
    </div>
  );
};
