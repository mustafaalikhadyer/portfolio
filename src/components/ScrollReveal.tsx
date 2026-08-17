"use client";
import React, { useEffect, useRef } from "react";

export default function ScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Tvingar Macens GPU att animera detta ljudlöst, utan att störa scrollen
            entry.target.setAttribute(
              "style",
              "opacity: 1; transform: translateY(0); transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); will-change: auto;"
            );
            // Stänger av övervakningen när den väl är framme = noll lagg efteråt!
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      // Sätter startvärdet (osynlig och lite neråt) direkt på DOM-noden
      ref.current.setAttribute(
        "style",
        "opacity: 0; transform: translateY(40px); will-change: opacity, transform;"
      );
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {children}
    </div>
  );
}