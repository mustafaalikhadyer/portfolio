"use client";

import { useRef, useState, MouseEvent } from "react";
import ScrambleText from "./ScrambleText"; // Jag förutsätter att du har kvar denna!
import { BrainCircuit, Fingerprint } from "lucide-react";

// 3D-kortet för ditt ansikte
function HolographicID() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Apple TV-style 3D-tilt
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div 
      className="relative w-full max-w-sm mx-auto aspect-[3/4] group"
      style={{ perspective: "1000px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-full rounded-2xl border border-cyan-500/30 bg-[#050505] overflow-hidden shadow-[0_0_50px_rgba(0,243,255,0.1)] transition-all duration-200 ease-out"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Bakgrunds-grid i kortet */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

        {/* DITT ANSIKTE (Sätt in din bild i public/me.png!) */}
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          style={{ backgroundImage: "url('/me.png')" }} 
        />

        {/* CRT Scanlines över ansiktet */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-50 z-10" />

        {/* Laserskannern som åker upp och ner */}
        <div className="absolute left-0 right-0 h-[2px] bg-cyan-400/80 shadow-[0_0_20px_rgba(0,243,255,1)] z-20 animate-scan" />

        {/* Tech UI Overlays */}
        <div className="absolute top-4 left-4 z-30" style={{ transform: "translateZ(30px)" }}>
          <p className="font-mono text-[10px] text-cyan-400 tracking-widest animate-pulse">REC // IDENTITY_VERIFIED</p>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4 z-30 flex justify-between items-end" style={{ transform: "translateZ(40px)" }}>
          <div>
            <h3 className="text-2xl font-bold text-white font-space mb-1 shadow-black drop-shadow-md">
              <ScrambleText text="MUSTAFA ALIKHADYER" />
            </h3>
            <p className="font-mono text-xs text-cyan-400 bg-black/50 px-2 py-1 rounded inline-block backdrop-blur-sm border border-cyan-500/30">SYS_ADMIN // LVL 99</p>
          </div>
          {/* Fingeravtryck/Streckkod pryl */}
          <div className="w-8 h-8 border border-cyan-500/50 flex flex-col justify-between p-1 opacity-70">
            <div className="w-full h-[2px] bg-cyan-500/50" />
            <div className="w-full h-[2px] bg-cyan-500/80" />
            <div className="w-3/4 h-[2px] bg-cyan-500/50" />
            <div className="w-full h-[2px] bg-cyan-500/80" />
          </div>
        </div>
        
        {/* DITT ID NUMMER OCH SWE (Från din bild!) */}
        <div className="absolute top-1/2 left-4 -translate-y-1/2 -rotate-90 z-20" style={{ transform: "translateZ(20px) translateY(-50%) rotate(-90deg)", transformOrigin: "top left" }}>
          <p className="text-[10px] font-mono text-gray-500 tracking-widest opacity-80">
            ID: 061005-XXXX <span className="ml-2 text-white">SWE</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// Data Hub fönstret
function DataHubWindow() {
  return (
    <div className="w-full h-24 rounded-lg bg-white/[0.01] border border-white/5 backdrop-blur-md p-4 flex gap-4 items-center group hover:border-cyan-500/30 transition-colors">
      <div className="w-16 h-16 rounded-md bg-gradient-to-br from-gray-800 to-black flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
        <Fingerprint className="w-8 h-8 text-cyan-400 animate-pulse" />
      </div>
      <div className="flex-1">
        <p className="font-mono text-xs text-cyan-400 opacity-80 mb-1">DATA HUB // BIOMETRICS</p>
        <p className="text-xl font-bold text-white mb-1">061005-XXXX <span className="text-sm font-normal text-gray-500">SWE</span></p>
        <div className="w-full h-[1px] bg-cyan-500 animate-[bar_1.5s_linear_infinite]" />
      </div>
      <BrainCircuit className="w-5 h-5 text-gray-700 opacity-50 group-hover:text-cyan-500 group-hover:opacity-100 transition-all" />
    </div>
  );
}

export default function About() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center py-32 overflow-hidden bg-transparent">
      
      {/* Våra custom CSS-animationer insprängda direkt här */}
      <style>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          10%, 90% { opacity: 1; }
          50% { top: 100%; }
        }
        .animate-scan { animation: scan 4s ease-in-out infinite; }
        
        @keyframes bar { 0% { width: 0%; } 100% { width: 100%; } }

        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left { animation: scroll-left 40s linear infinite; }
        .animate-marquee-right { animation: scroll-right 40s linear infinite; }
      `}</style>

      {/* BACKGROUND CINEMATIC TEXT (Parallax effect) */}
      <div className="absolute inset-0 flex flex-col justify-center gap-12 pointer-events-none opacity-[0.03] overflow-hidden z-0 font-space font-bold text-[8rem] md:text-[15rem] leading-none whitespace-nowrap">
        <div className="animate-marquee-left text-white">
          DIGITAL ARKITEKT • SYSTEMUTVECKLARE • KODNINJA •
        </div>
        <div className="animate-marquee-right text-transparent" style={{ WebkitTextStroke: "2px white" }}>
          FULLSTACK ENGINEER • .NET MASTER • FRONTEND GURU •
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 md:px-12 xl:px-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        
        {/* Vänster: Holographic ID Card */}
        <div className="order-2 lg:order-1 flex justify-center">
          <HolographicID />
        </div>

        {/* Höger: Svensk Storytelling */}
        <div className="order-1 lg:order-2 flex flex-col justify-center">
          <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Systemprofil Laddad
          </p>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 font-space">
            Människan bakom <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              <ScrambleText text="koden." />
            </span>
          </h2>
          
          <div className="space-y-6 text-gray-400 font-sans text-lg leading-relaxed mb-10">
            <p>
              Jag bygger inte bara hemsidor; jag konstruerar digitala ekosystem. Från robust backend-arkitektur till hyper-interaktiva WebGL-gränssnitt, mitt mål är att broa gapet mellan komplex logik och enastående visuell exekvering.
            </p>
            <p>
              Mitt vapenval är <span className="text-cyan-400 font-mono text-sm border-b border-cyan-400/30">.NET 8 / C#</span> för oslagbar backend-kraft, kombinerat med <span className="text-purple-400 font-mono text-sm border-b border-purple-400/30">Next.js & TypeScript</span> för att skapa gränssnitt som får användare att stanna upp och tappa hakan. Inga ursäkter, bara optimerad och skalbar kod.
            </p>
          </div>

          {/* Vapenarsenal (Tech Stack) */}
          <div className="mt-6 pt-6 border-t border-white/10 mb-8">
            <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-4">Utrustad med</p>
            <div className="flex flex-wrap gap-3">
              {['C# / .NET 8', 'React / Next.js', 'TypeScript', 'SQL Server', 'Tailwind CSS', 'Three.js'].map((tech) => (
                <span key={tech} className="px-4 py-2 text-sm font-mono text-gray-300 bg-white/5 border border-white/10 rounded-lg shadow-lg hover:border-cyan-400/50 hover:text-cyan-400 transition-colors cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* Data Hub Biometrics Window */}
          <DataHubWindow />
          
        </div>

      </div>
    </section>
  );
}