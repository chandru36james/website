"use client";
import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

// Local utility function to remove external dependency
function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export const Globe = ({ className }: { className?: string }) => {
  const dpr = Math.min(window.devicePixelRatio, 1.5);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<any>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const pointerInteractingY = useRef<number | null>(null);
  const pointerInteractionMovementY = useRef(0);

  useEffect(() => {
    let phi = 0;
    let lastTime = performance.now();

    const initGlobe = () => {
        if (!canvasRef.current) return;
        
        const width = canvasRef.current.clientWidth;
        const height = canvasRef.current.clientHeight;

        if (width === 0 || height === 0) return;

        if (globeRef.current) {
            globeRef.current.destroy();
        }

        const baseColor: [number, number, number] = [0.1, 0.1, 0.1];
        const glowColor: [number, number, number] = [0.6, 0.6, 0.6];
        const markerColor: [number, number, number] = [0.9, 0.1, 0.1];

        try {
            globeRef.current = createGlobe(canvasRef.current, {
                devicePixelRatio: dpr,
                width: width * dpr,
                height: height * dpr,
                phi: 0,
                theta: 0.35,
                dark: 1,
                diffuse: 1.2,
                mapSamples: 12000,
                mapBrightness: 3,
                baseColor: baseColor,
                markerColor: markerColor,
                glowColor: glowColor,
                opacity: 1,
                markers: [
                    { location: [37.7595, -122.4367], size: 0.035 },
                    { location: [40.7128, -74.006], size: 0.035 },
                    { location: [51.5074, -0.1278], size: 0.035 },
                    { location: [35.6762, 139.6503], size: 0.035 },
                ],
                onRender: (state) => {
                     const now = performance.now();
                      const delta = now - lastTime;
                      lastTime = now;

                      if (!pointerInteracting.current) {
                        phi += delta * 0.0006; // smooth + consistent
                      }

                    state.phi = phi + pointerInteractionMovement.current;
                    state.theta = 0.35 + pointerInteractionMovementY.current;
                },
            });

            if (canvasRef.current) {
                canvasRef.current.style.transform = "translateZ(0)";
                canvasRef.current.style.opacity = '1';
            }

        } catch (e) {
            console.warn("Globe initialization failed:", e);
        }
    };

    const resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(() => initGlobe());
    });

    if (canvasRef.current) {
        resizeObserver.observe(canvasRef.current);
    }

    return () => {
        resizeObserver.disconnect();
        if (globeRef.current) globeRef.current.destroy();
    };
  }, []); 

  return (
    <div className={cn("absolute inset-0 h-full w-full", className)}>
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