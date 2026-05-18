"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { name: "About", id: "about" },
  { name: "Experience", id: "experience" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  
  // Denna håller koll på om vi just nu scrollar på grund av ett klick
  const isClickScrolling = useRef(false);

  // 1. Frostat glas när vi scrollar ner
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Intersection Observer (Kollar var vi är på sidan)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Om vi klickade på en länk nyligen, ignorera vad Observern ser just nu!
      if (isClickScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // 3. Hantera klicket och stäng av Observern tillfälligt
  const handleNavClick = (id: string) => {
    isClickScrolling.current = true; // Lås Observern
    setActiveSection(id); // Skicka pillret direkt till målet

    // Lås upp Observern igen efter 1 sekund (när scrollen är klar)
    setTimeout(() => {
      isClickScrolling.current = false;
    }, 1000);
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-auto">
      <nav 
        className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-700 ${
          scrolled 
            ? "bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,243,255,0.1)]" 
            : "bg-transparent border border-transparent"
        }`}
      >
        {/* LOGO */}
        <a 
          href="#top" 
          onClick={() => handleNavClick("top")}
          className="text-white font-space font-bold text-lg tracking-wider px-4 hover:text-cyan-400 transition-colors"
        >
          MUSTAFA<span className="text-cyan-400">.</span>
        </a>
        
        <div className="flex items-center relative">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => handleNavClick(link.id)}
              className={`relative px-4 py-2 text-[10px] md:text-xs font-mono uppercase tracking-widest transition-colors duration-500 z-10 ${
                activeSection === link.id ? "text-white" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {link.name}

              {/* DET GLIDANDE PILLER-LJUSET */}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 bg-cyan-500/20 border border-cyan-400/30 rounded-full -z-10 shadow-[0_0_15px_rgba(0,243,255,0.2)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}