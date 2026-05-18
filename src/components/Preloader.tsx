"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    // Låtsas ladda systemet
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 10) + 1;
      
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        
        // När vi når 100%, kör ut-animationen med GSAP
        const tl = gsap.timeline();
        
        tl.to(textRef.current, {
          opacity: 0,
          duration: 0.3,
          delay: 0.5,
        })
        .to(containerRef.current, {
          y: "-100vh", // Glid uppåt ut ur skärmen
          duration: 1.2,
          ease: "power4.inOut",
        });
      }
      setProgress(p);
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[999999] bg-black flex flex-col items-center justify-center font-mono"
    >
      <div ref={textRef} className="flex flex-col items-center">
        <p className="mb-4 text-xs md:text-sm tracking-[0.3em] text-cyan-400/80 animate-pulse">
          {progress < 100 ? "DECRYPTING_SYSTEM_DATA..." : "ACCESS_GRANTED."}
        </p>
        
        <div className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter">
          {progress}%
        </div>
        
        {/* Progress bar */}
        <div className="w-64 h-[2px] bg-white/10 overflow-hidden">
          <div 
            className="h-full bg-cyan-400 transition-all duration-75" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>
    </div>
  );
}