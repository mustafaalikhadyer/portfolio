"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";

interface MagneticProps {
  children: ReactNode;
  intensity?: number; // Hur stark magnetismen är (låg för stora kort, hög för små knappar)
  className?: string; // För att behålla flex/grid-klasser
}

export default function Magnetic({ children, intensity = 0.2, className = "" }: MagneticProps) {
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = magneticRef.current;
    if (!element) return;

    // gsap.quickTo är brutalt snabbt och optimerat för musrörelser
    const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      
      // Räkna ut hur långt från mitten av elementet musen befinner sig
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Dra elementet
      xTo(x * intensity);
      yTo(y * intensity);
    };

    const handleMouseLeave = () => {
      // Släpp tillbaka elementet till ursprungsläget när musen lämnar
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [intensity]);

  return (
    <div ref={magneticRef} className={`relative z-10 ${className}`}>
      {children}
    </div>
  );
}