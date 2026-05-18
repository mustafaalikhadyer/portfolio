"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const aura = auraRef.current;
    if (!cursor || !aura) return;

    const onMouseMove = (e: MouseEvent) => {
      // Den inre pricken följer musen direkt
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
      // Auran följer efter med en smörig fördröjning (0.5s)
      gsap.to(aura, { x: e.clientX, y: e.clientY, duration: 0.5, ease: "power3.out" });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <>
      {/* Vi gömmer vanliga muspekaren i hela appen genom en global klass i layout.tsx senare, 
          men för säkerhets skull lägger vi pointer-events-none här */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block" 
      />
      <div 
        ref={auraRef} 
        className="fixed top-0 left-0 w-12 h-12 border border-cyan-400/50 bg-cyan-400/10 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 blur-[1px] hidden md:block" 
      />
    </>
  );
}