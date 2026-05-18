"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\\\/[]{}—=+*^?#________";

export default function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isScrambling = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isScrambling.current) {
          scramble();
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [text]);

  const scramble = () => {
    if (isScrambling.current) return;
    isScrambling.current = true;
    
    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText((oldText) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text); // Säkerställ att det stannar på exakt rätt text
        isScrambling.current = false;
      }
      
      iteration += 1 / 3; // Hastigheten på dekrypteringen (lägre siffra = långsammare)
    }, 30);
  };

  return (
    <span ref={containerRef} className={className} onMouseEnter={scramble}>
      {displayText}
    </span>
  );
}