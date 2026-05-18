"use client";

import { MouseEvent, useState, useRef } from "react";
import { ExternalLink, Terminal, Wallet, Lock } from "lucide-react";
import ScrambleText from "./ScrambleText";

const BentoCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setRotation({ x: rotateX, y: rotateY });
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlare({ ...glare, opacity: 0 });
  };

  return (
    <div style={{ perspective: "1000px" }} className={`relative h-full w-full ${className}`}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: "transform 0.1s ease-out",
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full rounded-3xl bg-white/[0.02] border border-white/10 group transition-all duration-300 ease-out hover:border-white/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-0 z-50 transition-opacity duration-300"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.1) 0%, transparent 60%)`,
            mixBlendMode: "overlay",
          }}
        />
        <div className="relative h-full z-10 p-6 sm:p-8 flex flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  return (
    <section className="relative min-h-screen w-full bg-transparent py-32 px-4 md:px-12 xl:px-24">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-16">
          <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] mb-4">
            System Output // Live Modules
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-space">
            Mission <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              <ScrambleText text="Logs." />
            </span>
          </h2>
        </div>

        {/* FIXEN ÄR HÄR: auto-rows-auto på mobil, lg:auto-rows-[350px] på datorn */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-auto lg:auto-rows-[350px]">
          
          {/* HUVUDPROJEKT: Sparasmartz */}
          <div className="lg:col-span-2 h-full">
            <BentoCard>
              <div className="mb-6 lg:mb-0">
                <Wallet className="text-emerald-400 w-10 h-10 mb-4 sm:mb-6 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-space">SparaSmartz</h3>
                <p className="text-gray-400 font-sans text-base sm:text-lg max-w-xl leading-relaxed">
                  En intelligent webbapplikation för privatekonomi och smart sparande. Optimerad för att hjälpa användare att strukturera sin budget och maximera sina sparmål. 
                </p>
              </div>
              
              {/* Länkar och knappar - Tvingas ner på egen rad när det behövs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto pt-6 sm:pt-8 border-t border-white/5">
                
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-1 sm:px-3 text-[10px] sm:text-xs font-mono text-emerald-300 bg-emerald-500/10 rounded-full border border-emerald-500/20">Next.js</span>
                  <span className="px-2 py-1 sm:px-3 text-[10px] sm:text-xs font-mono text-blue-300 bg-blue-500/10 rounded-full border border-blue-500/20">TypeScript</span>
                  <span className="px-2 py-1 sm:px-3 text-[10px] sm:text-xs font-mono text-purple-300 bg-purple-500/10 rounded-full border border-purple-500/20">Tailwind</span>
                </div>
                
                {/* Nu får knappen alltid plats i botten på mobilen */}
                <a 
                  href="https://sparasmartz.se" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2 w-full sm:w-auto py-3 sm:py-0 text-cyan-400 hover:text-white transition-colors group/link bg-cyan-500/10 sm:bg-transparent rounded-lg sm:rounded-none border border-cyan-500/30 sm:border-transparent mt-2 sm:mt-0"
                >
                  <span className="font-mono text-[11px] sm:text-xs tracking-widest uppercase">Launch_App</span>
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                </a>

              </div>
            </BentoCard>
          </div>

          {/* IN THE LAB */}
          <div className="lg:col-span-1 min-h-[250px] lg:min-h-0 h-full">
            <BentoCard className="border-dashed border-white/20">
              <div className="h-full flex flex-col items-center justify-center text-center opacity-70 group-hover:opacity-100 transition-opacity py-8 lg:py-0">
                <div className="w-16 h-16 rounded-full border border-cyan-500/30 flex items-center justify-center mb-6 animate-[spin_10s_linear_infinite]">
                  <Lock className="w-6 h-6 text-cyan-400 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-mono tracking-widest">PROJECT_X</h3>
                <p className="text-gray-500 text-sm mb-4">Under utveckling...</p>
                <span className="px-4 py-1 text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 uppercase tracking-widest">
                  Status: Compiling
                </span>
              </div>
            </BentoCard>
          </div>

          {/* SYSTEM ARCHITECTURE */}
          <div className="lg:col-span-3 h-auto sm:h-[250px]">
            <BentoCard>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 h-full text-center sm:text-left py-4 sm:py-0">
                <div className="hidden sm:flex w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-900 to-black items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] shrink-0">
                  <Terminal className="w-10 h-10 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">Backend & Databaser</h3>
                  <p className="text-gray-400 max-w-3xl text-sm sm:text-base leading-relaxed">
                    Utöver frontend bygger jag solida backend-system. Mitt fokus ligger på C# och .NET Core för att skapa säkra API:er och effektiv databashantering med SQL Server. En snygg hemsida är ingenting utan en stabil motor under huven.
                  </p>
                </div>
              </div>
            </BentoCard>
          </div>

        </div>
      </div>
    </section>
  );
}