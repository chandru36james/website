"use client";
import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const pointerInteractingY = useRef<number | null>(null);
  const pointerInteractionMovementY = useRef(0);
  
  // Hardcoded to dark mode as theme switching is removed and 'dark' class is enforced on html
  const isDark = true;

  useEffect(() => {
    let phi = 0;
    let globe: any;

    if (!canvasRef.current) return;

    const initGlobe = () => {
        if (!canvasRef.current) return;
        
        const width = canvasRef.current.offsetWidth;
        const height = canvasRef.current.offsetHeight;

        if (globe) globe.destroy();

        // Theme-based configuration (locked to dark)
        const baseColor: [number, number, number] = isDark ? [0.1, 0.1, 0.1] : [0.95, 0.95, 0.95];
        const glowColor: [number, number, number] = isDark ? [0.6, 0.6, 0.6] : [0.8, 0.8, 0.8];
        const markerColor: [number, number, number] = [0.9, 0.1, 0.1]; // Red markers

        globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: width * 2,
            height: height * 2,
            phi: 0,
            theta: 0.35, // Tilted forward to see the "horizon" better
            dark: isDark ? 1 : 0,
            diffuse: 1.2,
            mapSamples: 30000,
            mapBrightness: 8,
            baseColor: baseColor,
            markerColor: markerColor,
            glowColor: glowColor,
            markers: [
                { location: [37.7595, -122.4367], size: 0.05 }, // San Francisco
                { location: [40.7128, -74.006], size: 0.05 }, // New York
                { location: [51.5074, -0.1278], size: 0.05 }, // London
                { location: [35.6762, 139.6503], size: 0.05 }, // Tokyo
                { location: [12.9716, 77.5946], size: 0.05 }, // Bangalore
                { location: [1.3521, 103.8198], size: 0.05 }, // Singapore
                { location: [52.5200, 13.4050], size: 0.05 }, // Berlin
                { location: [-33.8688, 151.2093], size: 0.05 }, // Sydney
            ],
            onRender: (state) => {
                if (!pointerInteracting.current) {
                    phi += 0.003;
                }
                state.phi = phi + pointerInteractionMovement.current;
                state.theta = 0.35 + pointerInteractionMovementY.current;
            },
        });

        // Fade in
        if (canvasRef.current) {
            setTimeout(() => {
                if (canvasRef.current) {
                    canvasRef.current.style.opacity = '1';
                }
            }, 100);
        }
    };

    initGlobe();

    let resizeTimeout: any;
    const handleResize = () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initGlobe();
        }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
        if (globe) globe.destroy();
        window.removeEventListener('resize', handleResize);
    };
  }, [isDark]); 

  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-0 transition-opacity duration-1000"
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current;
          pointerInteractingY.current = 
            e.clientY - pointerInteractionMovementY.current;
            
          if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          pointerInteractingY.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          pointerInteractingY.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.005;
          }
          if (pointerInteractingY.current !== null) {
            const delta = e.clientY - pointerInteractingY.current;
            pointerInteractionMovementY.current = delta * 0.005;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.005;
          }
          if (pointerInteractingY.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientY - pointerInteractingY.current;
            pointerInteractionMovementY.current = delta * 0.005;
          }
        }}
      />
    </div>
  );
};
