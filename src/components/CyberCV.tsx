"use client";

import React, { useRef, useState, useEffect } from "react";
import { Zap, BrainCircuit, Briefcase, GraduationCap, Languages, Award, ChevronLeft, ChevronRight } from "lucide-react";

// --- DATA FÖR DITT CV ---
const cvData = {
  profile: {
    title: "Systemutvecklare .NET",
    summary: "Passionerad utvecklare med fokus på skalbar backend-arkitektur, robust API-design och moderna webbgränssnitt. Specialist på Microsoft-stacken.",
    languages: ["Svenska (Modersmål)", "Engelska (Flytande)", "Arabiska (God förståelse)"]
  },
  skills: [
    { name: ".NET / C#", level: "95%" },
    { name: "SQL Server", level: "90%" },
    { name: "ASP.NET Core", level: "90%" },
    { name: "Entity Framework", level: "85%" },
    { name: "Next.js / React", level: "80%" },
    { name: "TypeScript", level: "75%" },
    { name: "Docker / Azure", level: "70%" },
  ],
  experience: [
    { role: "Sales Representative", company: "Telenor", year: "2026 - Nuvarande" },
    { role: "Funded Trading Analytiker", company: "Fintech / Trading", year: "April 2025 - Nuvarande" },
    { role: "Logistik & Lagerarbetare", company: "DHL Lager", year: "2024 - 2025" }
  ],
  education: [
    { degree: "Fullstack .NET Developer", school: "Chas Academy", year: "Studerande" },
    { degree: "Gymnasieexamen - Ekonomi", school: "Kungsholmens Västra Gymnasium", year: "Avklarad" }
  ],
  certifications: [
    { name: "Topstep Funded Trader ($50,000)", detail: "Verifierat certifikat ×2 (Klarat målen två gånger)" }
  ]
};

export default function CyberCV() {
  const [mounted, setMounted] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const drag = useRef({ isDragging: false, startX: 0, currentRot: 0, startRot: 0 });

  useEffect(() => setMounted(true), []);

  const handlePointerDown = (e: React.PointerEvent) => {
    drag.current.isDragging = true;
    drag.current.startX = e.clientX;
    drag.current.startRot = drag.current.currentRot;
    if (carouselRef.current) carouselRef.current.style.transition = "none";
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!drag.current.isDragging || !carouselRef.current) return;
    const delta = (e.clientX - drag.current.startX) * 0.4;
    drag.current.currentRot = drag.current.startRot + delta;
    carouselRef.current.style.transform = `rotateY(${drag.current.currentRot}deg)`;
  };

  const handlePointerUp = () => {
    if (!drag.current.isDragging || !carouselRef.current) return;
    drag.current.isDragging = false;
    
    const snapped = Math.round(drag.current.currentRot / 90) * 90;
    drag.current.currentRot = snapped;
    
    carouselRef.current.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
    carouselRef.current.style.transform = `rotateY(${snapped}deg)`;
  };

  const rotateTo = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    drag.current.currentRot += direction === 'left' ? 90 : -90;
    carouselRef.current.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
    carouselRef.current.style.transform = `rotateY(${drag.current.currentRot}deg)`;
  };

  if (!mounted) return <div className="h-screen w-full bg-black"></div>;

  return (
    <section className="relative min-h-[900px] h-[100vh] w-full py-20 bg-black flex flex-col items-center overflow-hidden">
      
      <div className="text-center mb-2 md:mb-6 z-20 px-4 mt-4 pointer-events-none">
        <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] mb-4">
          Core Identity // System Logs
        </p>
        <h2 className="text-4xl md:text-6xl font-bold text-white font-space">
          Cyber <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">CV.</span>
        </h2>
        <p className="text-gray-500 font-mono text-[10px] mt-6 uppercase">
          Använd pilarna för att bläddra
        </p>
      </div>

      {/* FIXEN: touchAction: "pan-y" tillåter dig att scrolla UPP/NER obehindrat på mobilen! */}
      <div 
        className="w-full flex-1 flex items-center justify-center relative z-10 cursor-grab active:cursor-grabbing pb-12 md:pb-0"
        style={{ perspective: "1200px", touchAction: "pan-y" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp} // Viktigt på mobil när scrollen tar över
      >
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 pointer-events-none">
          <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-[spin_12s_linear_infinite] opacity-60" style={{ transform: "rotateX(60deg)" }} />
          <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-[spin_14s_linear_infinite] opacity-60" style={{ transform: "rotateY(60deg)" }} />
          <div className="absolute inset-0 rounded-full bg-cyan-500/5 shadow-[0_0_80px_rgba(0,243,255,0.15)] blur-md" />
        </div>

        {/* PILAR (Nu synliga och centrerade även på mobil!) */}
        <button onClick={(e) => { e.stopPropagation(); rotateTo('left'); }} className="absolute left-2 md:left-12 top-1/2 -translate-y-1/2 z-50 p-2 md:p-4 text-cyan-500 hover:text-white hover:bg-cyan-500/20 rounded-full transition-all bg-black/60 border border-cyan-500/30 backdrop-blur-md">
          <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
        </button>
        <button onClick={(e) => { e.stopPropagation(); rotateTo('right'); }} className="absolute right-2 md:right-12 top-1/2 -translate-y-1/2 z-50 p-2 md:p-4 text-cyan-500 hover:text-white hover:bg-cyan-500/20 rounded-full transition-all bg-black/60 border border-cyan-500/30 backdrop-blur-md">
          <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
        </button>

        <div 
          ref={carouselRef}
          className="w-full max-w-[400px] h-[600px] relative transform scale-[0.75] md:scale-100"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* PANEL 1: PROFIL */}
          <div 
            className="absolute inset-0 p-8 flex flex-col font-sans select-none text-white overflow-hidden bg-[#0a0a0a] border-2 border-cyan-500/40 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.8)]"
            style={{ transform: "rotateY(0deg) translateZ(320px)", backfaceVisibility: "hidden" }}
          >
            <div className="flex items-center gap-4 mb-6 border-b border-cyan-500/20 pb-5">
              <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <BrainCircuit className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-3xl font-bold font-space uppercase tracking-wider">Profile</h3>
            </div>
            <p className="text-cyan-300 font-space text-2xl font-bold leading-snug mb-3">{cvData.profile.title}</p>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">{cvData.profile.summary}</p>
            <div className="space-y-3 mt-auto">
              <p className="text-cyan-400 font-mono text-xs uppercase flex items-center gap-2"><Languages className="w-4 h-4"/> // Språk</p>
              {cvData.profile.languages.map(lang => (
                <p key={lang} className="text-gray-400 text-sm bg-white/[0.05] p-2 rounded-lg border border-white/5">{lang}</p>
              ))}
            </div>
          </div>

          {/* PANEL 2: STACK */}
          <div 
            className="absolute inset-0 p-8 flex flex-col font-sans select-none text-white overflow-hidden bg-[#0a0a0a] border-2 border-cyan-500/40 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.8)]"
            style={{ transform: "rotateY(90deg) translateZ(320px)", backfaceVisibility: "hidden" }}
          >
            <div className="flex items-center gap-4 mb-6 border-b border-cyan-500/20 pb-5">
              <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Zap className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-3xl font-bold font-space uppercase tracking-wider">Stack</h3>
            </div>
            <div className="space-y-5">
              {cvData.skills.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[11px] font-mono text-gray-400 mb-2 uppercase">
                    <span>{skill.name}</span>
                    <span className="text-cyan-400">{skill.level}</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500" style={{ width: skill.level }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PANEL 3: JOBB */}
          <div 
            className="absolute inset-0 p-8 flex flex-col font-sans select-none text-white overflow-hidden bg-[#0a0a0a] border-2 border-cyan-500/40 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.8)]"
            style={{ transform: "rotateY(180deg) translateZ(320px)", backfaceVisibility: "hidden" }}
          >
            <div className="flex items-center gap-4 mb-6 border-b border-cyan-500/20 pb-5">
              <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-3xl font-bold font-space uppercase tracking-wider">Jobb</h3>
            </div>
            <div className="space-y-6">
              {cvData.experience.map((job, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-cyan-500/20 py-2">
                  <div className="absolute left-[-7px] top-4 w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(0,243,255,0.5)]" />
                  <p className="text-cyan-400 font-mono text-xs mb-1">{job.year}</p>
                  <h4 className="text-white font-bold text-lg font-space leading-tight">{job.role}</h4>
                  <p className="text-gray-400 text-sm uppercase tracking-wider mt-1">{job.company}</p>
                </div>
              ))}
            </div>
          </div>

          {/* PANEL 4: UTBILDNINGAR */}
          <div 
            className="absolute inset-0 p-8 flex flex-col font-sans select-none text-white overflow-hidden bg-[#0a0a0a] border-2 border-cyan-500/40 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.8)]"
            style={{ transform: "rotateY(270deg) translateZ(320px)", backfaceVisibility: "hidden" }}
          >
            <div className="flex items-center gap-4 mb-6 border-b border-cyan-500/20 pb-5">
              <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-3xl font-bold font-space uppercase tracking-wider">Academy</h3>
            </div>
            <div className="flex-1 space-y-4">
              {cvData.education.map((edu, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.05]">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">{edu.year}</span>
                  <h4 className="text-white font-bold text-base leading-tight mt-1">{edu.degree}</h4>
                  <p className="text-gray-400 text-xs mt-1">{edu.school}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-cyan-500/10 space-y-3">
              <p className="text-cyan-400 font-mono text-xs uppercase flex items-center gap-2"><Award className="w-4 h-4" /> // Certifikat</p>
              {cvData.certifications.map((cert, i) => (
                <div key={i} className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <h5 className="text-white font-bold text-sm">{cert.name}</h5>
                  <p className="text-gray-400 text-[11px] font-mono mt-1">{cert.detail}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}