"use client";

import React, { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html, Environment, Stars } from "@react-three/drei";
import * as THREE from "three";
import { Zap, BrainCircuit, Briefcase, GraduationCap, Languages, Award } from "lucide-react";

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

function CVPane({ title, icon: Icon, children, rotation, position }: { title: string, icon: any, children: React.ReactNode, rotation: [number, number, number], position: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <Html transform distanceFactor={5} position={[0, 0, 0]} className="pointer-events-none">
        {/* SOLID SVART BAKGRUND - INGET GLAS */}
        <div className="w-[460px] h-[660px] p-8 flex flex-col font-sans select-none text-white overflow-hidden bg-[#050505] border-2 border-cyan-500/50 rounded-2xl">
          <div className="flex items-center gap-4 mb-6 border-b border-cyan-500/20 pb-5">
            <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <Icon className="w-7 h-7 text-cyan-400" />
            </div>
            <h3 className="text-3xl font-bold font-space uppercase tracking-wider">{title}</h3>
          </div>
          <div className="flex-1 space-y-5 custom-scrollbar">{children}</div>
        </div>
      </Html>
    </group>
  );
}

function NeuralCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.03;
    }
  });
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[3, 10]} />
      <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={1} wireframe transparent opacity={0.15} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

export default function CyberCV() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-screen w-full bg-black"></div>;

  return (
    <section className="relative min-h-[1000px] h-[100vh] w-full py-20 bg-transparent flex flex-col items-center overflow-hidden">
      
      <div className="text-center mb-6 z-10 px-4 pointer-events-none mt-10">
        <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] mb-4">
          Core Identity // Helt ny komponent
        </p>
        <h2 className="text-4xl md:text-6xl font-bold text-white font-space">
          Cyber <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">CV.</span>
        </h2>
      </div>

      <div className="w-full h-full cursor-grab active:cursor-grabbing relative z-20 touch-none">
        <Canvas camera={{ position: [0, 0, 22], fov: 45 }} dpr={[1, 1]} gl={{ antialias: false, powerPreference: "high-performance" }}>
          <Suspense fallback={null}>
            <Environment preset="night" />
            
            <OrbitControls enableZoom={false} enablePan={false} enableDamping={true} dampingFactor={0.05} rotateSpeed={0.5} minPolarAngle={Math.PI / 2 - 0.15} maxPolarAngle={Math.PI / 2 + 0.15} />
              
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
              <NeuralCore />
            </Float>

            <group>
              <CVPane title="Profile" icon={BrainCircuit} position={[0, 0, 7.5]} rotation={[0, 0, 0]}>
                <p className="text-cyan-300 font-space text-2xl font-bold leading-snug">{cvData.profile.title}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{cvData.profile.summary}</p>
              </CVPane>
              
              <CVPane title="Stack" icon={Zap} position={[7.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                {cvData.skills.map((skill, i) => (
                  <div key={i} className="mb-2">
                    <div className="flex justify-between text-[11px] font-mono text-gray-400 mb-1.5 uppercase">
                      <span>{skill.name}</span>
                      <span className="text-cyan-400">{skill.level}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500" style={{ width: skill.level }} />
                    </div>
                  </div>
                ))}
              </CVPane>
              
              <CVPane title="Jobb" icon={Briefcase} position={[0, 0, -7.5]} rotation={[0, Math.PI, 0]}>
                {cvData.experience.map((job, i) => (
                  <div key={i} className="relative pl-6 border-l-2 border-cyan-500/20 py-4">
                    <p className="text-cyan-400 font-mono text-xs mb-1">{job.year}</p>
                    <h4 className="text-white font-bold text-lg font-space">{job.role}</h4>
                    <p className="text-gray-400 text-sm uppercase">{job.company}</p>
                  </div>
                ))}
              </CVPane>
              
              <CVPane title="Utbildningar" icon={GraduationCap} position={[-7.5, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
                {cvData.education.map((edu, i) => (
                  <div key={i} className="mb-4 p-4 rounded-xl bg-white/[0.05]">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase">{edu.year}</span>
                    <h4 className="text-white font-bold text-lg">{edu.degree}</h4>
                    <p className="text-gray-400 text-xs">{edu.school}</p>
                  </div>
                ))}
                <div className="mt-6 pt-5 border-t border-cyan-500/10 space-y-3">
                  <p className="text-cyan-400 font-mono text-xs uppercase flex items-center gap-2"><Award className="w-4 h-4" /> // Certifikat</p>
                  {cvData.certifications.map((cert, i) => (
                    <div key={i} className="p-3 rounded-xl bg-cyan-500/10">
                      <h5 className="text-white font-bold text-sm">{cert.name}</h5>
                      <p className="text-gray-400 text-[11px] font-mono mt-1">{cert.detail}</p>
                    </div>
                  ))}
                </div>
              </CVPane>
            </group>
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}