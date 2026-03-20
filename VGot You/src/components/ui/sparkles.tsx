"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";

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
    maxSize = 1.2,
    particleColor = "#FFFFFF",
    particleDensity = 100,
  } = props;

  // Generate random star properties once
  const stars = useMemo(() => {
    const count = Math.floor(particleDensity);
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (maxSize - minSize) + minSize,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }));
  }, [particleDensity, minSize, maxSize]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full will-change-transform"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor: particleColor,
            boxShadow: `0 0 ${star.size * 2}px ${particleColor}`,
          }}
          animate={{
            opacity: [0.1, 0.7, 0.1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "linear", // Linear is cheaper for many particles
          }}
        />
      ))}
    </div>
  );
};