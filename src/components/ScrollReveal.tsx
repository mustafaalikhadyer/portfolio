"use client";

import { useEffect, useRef, ReactNode } from "react";

export default function ScrollReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && ref.current) {
          // När komponenten syns, veckla ut den i 3D
          ref.current.style.opacity = "1";
          ref.current.style.transform = "translateY(0px) rotateX(0deg) scale(1)";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    // Perspective är magin som skapar 3D-djupet på sidan
    <div style={{ perspective: "2000px" }} className="w-full">
      <div
        ref={ref}
        style={{
          opacity: 0,
          // Objektet startar lutat bakåt i Z-led, längre ner och lite mindre
          transform: "translateY(150px) rotateX(-25deg) scale(0.9)",
          transformOrigin: "top center",
          transition: "all 1.4s cubic-bezier(0.16, 1, 0.3, 1)", // Extremt mjuk "Apple"-fysik
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
}