import { useEffect, useRef } from "react";
import InfiniteMarqueeLib from "vanilla-infinite-marquee";

function InfiniteMarquee({ dataType, dataArray, speed = 20000, direction = "right", className = "" }) {
  const marqueeRef = useRef(null);

  useEffect(() => {
    if (marqueeRef.current) {
      const marquee = new InfiniteMarqueeLib({
        element: marqueeRef.current, // ✅ Pass the actual DOM node
        speed,
        direction,
        smoothEdges: true,
        duplicateCount: 2,
        pauseOnHover: true,
        mobileSettings: {
          direction,
          speed,
        },
      });

      return () => marquee.destroy(); // ✅ cleanup
    }
  }, [speed, direction, dataArray]);

  return (
    <div ref={marqueeRef} className={`flex items-center ${className}`}>
      {dataType === "image"
        ? dataArray.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`Image ${index + 1}`}
              className="h-24 w-auto object-contain mx-6"
            />
          ))
        : dataArray.map((text, index) => (
            <div key={index} className="mx-6 text-lg">
              {text}
            </div>
          ))}
    </div>
  );
}

export default InfiniteMarquee;
