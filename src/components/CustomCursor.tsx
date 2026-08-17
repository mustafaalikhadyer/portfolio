"use client";

import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Vi kollar så vi inte är på en mobil (mobiler har ingen mus)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      // translate3d tvingar Macens GPU att hantera rörelsen = Noll lagg
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      if (cursorOutlineRef.current) {
        // En liten fördröjning på outlinen för snygg effekt
        setTimeout(() => {
          if (cursorOutlineRef.current) {
            cursorOutlineRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
          }
        }, 50);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      {/* Själva pricken */}
      <div 
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ willChange: "transform" }}
      />
      {/* Den yttre cirkeln */}
      <div 
        ref={cursorOutlineRef}
        className="fixed top-0 left-0 w-8 h-8 border border-cyan-400/50 rounded-full pointer-events-none z-[9998] hidden md:block transition-transform duration-75 ease-out"
        style={{ willChange: "transform" }}
      />
    </>
  );
}