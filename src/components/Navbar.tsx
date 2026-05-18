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
  const isClickScrolling = useRef(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isClickScrolling.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    isClickScrolling.current = true;
    setActiveSection(id);
    setTimeout(() => { isClickScrolling.current = false; }, 1000);
  };

  return (
    // w-[95%] på mobil tvingar den att hålla sig innanför skärmen, md:w-auto låter den växa fritt på datorn
    <div className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-auto flex justify-center">
      <nav 
        className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-full transition-all duration-700 w-full sm:w-auto justify-center ${
          scrolled 
            ? "bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,243,255,0.1)]" 
            : "bg-black/20 backdrop-blur-md md:bg-transparent md:backdrop-blur-none border border-white/5 md:border-transparent"
        }`}
      >
        {/* LOGO - hidden på de minsta mobilerna för att spara plats, syns på sm (surfplatta) och uppåt */}
        <a 
          href="#top" 
          onClick={() => handleNavClick("top")}
          className="hidden sm:block text-white font-space font-bold text-sm md:text-lg tracking-wider px-2 md:px-4 hover:text-cyan-400 transition-colors"
        >
          MUSTAFA<span className="text-cyan-400">.</span>
        </a>
        
        <div className="flex items-center justify-between w-full sm:w-auto relative">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => handleNavClick(link.id)}
              className={`relative px-3 py-2 text-[9px] sm:text-[10px] md:text-xs font-mono uppercase tracking-widest transition-colors duration-500 z-10 flex-1 sm:flex-none text-center ${
                activeSection === link.id ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {link.name}
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