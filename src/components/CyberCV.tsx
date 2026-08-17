"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Stars } from "@react-three/drei";
import * as THREE from "three";
import { Zap, BrainCircuit, Briefcase, GraduationCap, Languages, Award } from "lucide-react";

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

// --- BAKGRUNDS-BOLLEN (Kräver nästan 0% processorkraft) ---
function BackgroundSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.03;
    }
  });
  return (
    <mesh ref={meshRef} scale={1.8}>
      <icosahedronGeometry args={[2, 2]} />
      <meshStandardMaterial color="#00f3ff" wireframe transparent opacity={0.15} />
    </mesh>
  );
}

export default function CyberCV() {
  const [mounted, setMounted] = useState(false);
  
  // State för den lagg-fria CSS 3D-karusellen
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startRot, setStartRot] = useState(0);

  useEffect(() => setMounted(true), []);

  // Smidig drag-logik
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartRot(rotation);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = (e.clientX - startX) * 0.4; // Fart på snurren
    setRotation(startRot + delta);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Premium-funktion: Snäpper fast kortet snyggt när du släpper det!
    const snapped = Math.round(rotation / 90) * 90;
    setRotation(snapped);
  };

  if (!mounted) return <div className="h-screen w-full bg-black"></div>;

  return (
    <section className="relative min-h-[1000px] h-[100vh] w-full py-20 bg-black flex flex-col items-center overflow-hidden">
      
      {/* --- WEBGL BAKGRUNDEN (Frikopplad från scrollen = Inget lagg) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 1]} gl={{ antialias: false, alpha: false }}>
          <color attach="background" args={["#000000"]} />
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ambientLight intensity={0.5} />
            <BackgroundSphere />
            <Stars radius={50} depth={20} count={300} factor={3} fade speed={0.5} />
          </Suspense>
        </Canvas>
      </div>

      {/* --- RUBRIK --- */}
      <div className="text-center mb-10 z-10 px-4 mt-10 pointer-events-none">
        <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] mb-4">
          Core Identity // System Logs
        </p>
        <h2 className="text-4xl md:text-6xl font-bold text-white font-space">
          Cyber <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">CV.</span>
        </h2>
      </div>

      {/* --- DEN LAGG-FRIA CSS-KARUSELLEN --- */}
      <div 
        className="relative z-10 w-full flex-1 flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ perspective: "1200px", touchAction: "pan-y" }} // pan-y tillåter scroll upp/ner på mobilen!
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Kontainern som snurrar */}
        <div 
          className="w-full max-w-[420px] h-[600px] relative transform scale-[0.75] md:scale-100"
          style={{ 
            transformStyle: "preserve-3d", 
            transform: `rotateY(${rotation}deg)`,
            transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
          }}
        >
          {/* PANEL 1: PROFIL */}
          <div 
            className="absolute inset-0 p-8 flex flex-col font-sans select-none text-white overflow-hidden bg-[#050505] border-2 border-cyan-500/50 rounded-3xl"
            style={{ transform: "rotateY(0deg) translateZ(350px)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
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
            className="absolute inset-0 p-8 flex flex-col font-sans select-none text-white overflow-hidden bg-[#050505] border-2 border-cyan-500/50 rounded-3xl"
            style={{ transform: "rotateY(90deg) translateZ(350px)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            <div className="flex items-center gap-4 mb-6 border-b border-cyan-500/20 pb-5">
              <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Zap className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-3xl font-bold font-space uppercase tracking-wider">Stack</h3>
            </div>
            <div className="space-y-4">
              {cvData.skills.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[11px] font-mono text-gray-400 mb-1.5 uppercase">
                    <span>{skill.name}</span>
                    <span className="text-cyan-400">{skill.level}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500" style={{ width: skill.level }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PANEL 3: JOBB */}
          <div 
            className="absolute inset-0 p-8 flex flex-col font-sans select-none text-white overflow-hidden bg-[#050505] border-2 border-cyan-500/50 rounded-3xl"
            style={{ transform: "rotateY(180deg) translateZ(350px)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
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
                  <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-500" />
                  <p className="text-cyan-400 font-mono text-xs mb-1">{job.year}</p>
                  <h4 className="text-white font-bold text-lg font-space leading-tight">{job.role}</h4>
                  <p className="text-gray-400 text-sm uppercase tracking-wider mt-1">{job.company}</p>
                </div>
              ))}
            </div>
          </div>

          {/* PANEL 4: UTBILDNINGAR */}
          <div 
            className="absolute inset-0 p-8 flex flex-col font-sans select-none text-white overflow-hidden bg-[#050505] border-2 border-cyan-500/50 rounded-3xl"
            style={{ transform: "rotateY(270deg) translateZ(350px)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
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
                  <p className="text-gray-400 text-[10px] font-mono mt-1">{cert.detail}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}