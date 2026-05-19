"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  OrbitControls, 
  Float, 
  MeshTransmissionMaterial, 
  Html, 
  Environment,
  Stars
} from "@react-three/drei";
import * as THREE from "three";
import { Zap, BrainCircuit, Briefcase, GraduationCap, Languages, Award } from "lucide-react";

// --- DATA FÖR DITT CV ---
const cvData = {
  profile: {
    title: "Fullstack Utvecklare .NET",
    summary: "Passionerad utvecklare med fokus på Frontend och skalbar backend-arkitektur, robust API-design och moderna webbgränssnitt.",
    languages: ["Arabiska (Modersmål)", "Svenska (Flytande)", "Engelska (Flytande)"]
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
  // HÄR ÄR DINA UPPDATERADE UTBILDNINGAR OCH CERTIFIKAT
  education: [
    { degree: "Fullstack .NET Developer", school: "Chas Academy", year: "Studerande" },
    { degree: "Gymnasieexamen - Ekonomi", school: "Kungsholmens Västra Gymnasium", year: "Avklarad" }
  ],
  certifications: [
    { name: "Topstep Funded Trader ($50,000)", detail: "Verifierat certifikat ×2 (Klarat målen två gånger)" }
  ]
};

// --- KOMPONENT FÖR EN INFO-PANEL ---
function CVPane({ title, icon: Icon, children, rotation, position }: { title: string, icon: any, children: React.ReactNode, rotation: [number, number, number], position: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <planeGeometry args={[5, 7]} />
        <MeshTransmissionMaterial 
          backside
          thickness={0.1}
          roughness={0.1}
          transmission={1}
          ior={1.3}
          chromaticAberration={0.05}
          distortion={0.1}
          color="#101010"
          anisotropicBlur={0.1}
        />
        
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[5.05, 7.05]} />
          <meshBasicMaterial color="#00f3ff" wireframe />
        </mesh>

        <Html transform distanceFactor={5} position={[0, 0, 0.05]} occlude="blending" className="pointer-events-none">
          <div className="w-[480px] h-[680px] p-8 flex flex-col font-sans select-none text-white overflow-hidden">
            
            <div className="flex items-center gap-4 mb-6 border-b border-cyan-500/20 pb-5">
              <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.15)]">
                <Icon className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-3xl font-bold font-space uppercase tracking-wider">{title}</h3>
            </div>

            <div className="flex-1 space-y-5 custom-scrollbar">
              {children}
            </div>

            <div className="mt-auto pt-4 text-center border-t border-cyan-500/10">
              <span className="text-[10px] font-mono text-cyan-700 tracking-widest uppercase animate-pulse">Neural_Network // node.verified</span>
            </div>
          </div>
        </Html>
      </mesh>
    </group>
  );
}

// --- DEN CENTRALA TEKNIK-SFÄREN ---
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
      <meshStandardMaterial 
        color="#00f3ff" 
        emissive="#00f3ff" 
        emissiveIntensity={1} 
        wireframe 
        transparent 
        opacity={0.1}
        blending={THREE.AdditiveBlending}
      />
      <Stars radius={3} depth={1} count={200} factor={2} saturation={0} fade speed={1} />
    </mesh>
  );
}

// --- HUVUDKOMPONENTEN ---
export default function NeuralCV() {
  return (
    <section className="relative h-[1000px] w-full py-20 bg-transparent flex flex-col items-center overflow-hidden">
      
      <div className="text-center mb-6 z-10 px-4 pointer-events-none">
        <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] mb-4">
          Core Identity // System Logs
        </p>
        <h2 className="text-4xl md:text-6xl font-bold text-white font-space">
          Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Database.</span>
        </h2>
        <p className="text-gray-500 font-mono text-[10px] mt-6 uppercase animate-pulse">
          
         Dra horisontellt för att inspektera noderna
        </p>
      </div>

      <div className="w-full h-full cursor-grab active:cursor-grabbing relative z-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none" />

        <Canvas camera={{ position: [0, 0, 18], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true }}>
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f3ff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
            
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              enableDamping={true} 
              dampingFactor={0.02} 
              rotateSpeed={0.4}
              minPolarAngle={Math.PI / 2 - 0.15} 
              maxPolarAngle={Math.PI / 2 + 0.15}
            />
              
            <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
              <group>
                <NeuralCore />

                {/* 1. PROFIL */}
                <CVPane 
                  title="Profile" 
                  icon={BrainCircuit} 
                  position={[0, 0, 7]} 
                  rotation={[0, 0, 0]}
                >
                  <p className="text-cyan-300 font-space text-2xl font-bold leading-snug">{cvData.profile.title}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{cvData.profile.summary}</p>
                  <div className="space-y-3 mt-6">
                    <p className="text-cyan-400 font-mono text-xs uppercase flex items-center gap-2"><Languages className="w-4 h-4"/> // Språk</p>
                    {cvData.profile.languages.map(lang => (
                      <p key={lang} className="text-gray-400 text-sm font-sans bg-white/[0.03] p-2 rounded-lg border border-white/5">{lang}</p>
                    ))}
                  </div>
                </CVPane>

                {/* 2. SKILLS */}
                <CVPane 
                  title="Stack" 
                  icon={Zap} 
                  position={[7, 0, 0]} 
                  rotation={[0, Math.PI / 2, 0]}
                >
                  {cvData.skills.map((skill, i) => (
                    <div key={i} className="mb-1">
                      <div className="flex justify-between text-[11px] font-mono text-gray-400 mb-1.5 uppercase">
                        <span>{skill.name}</span>
                        <span className="text-cyan-400">{skill.level}</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full border border-white/5 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400" style={{ width: skill.level }} />
                      </div>
                    </div>
                  ))}
                </CVPane>

                {/* 3. JOBB */}
                <CVPane 
                  title="Jobb" 
                  icon={Briefcase} 
                  position={[0, 0, -7]} 
                  rotation={[0, Math.PI, 0]}
                >
                  {cvData.experience.map((job, i) => (
                    <div key={i} className="relative pl-6 border-l-2 border-cyan-500/20 py-4 hover:bg-white/5 transition-colors rounded-r-xl">
                      <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
                      <p className="text-cyan-400 font-mono text-xs mb-1">{job.year}</p>
                      <h4 className="text-white font-bold text-lg font-space leading-tight">{job.role}</h4>
                      <p className="text-gray-400 text-sm uppercase tracking-wider">{job.company}</p>
                    </div>
                  ))}
                </CVPane>

                {/* 4. UTBILDNINGAR - FIX: Rubrik ändrad till Utbildningar, lade till Topstep i botten */}
                <CVPane 
                  title="Utbildningar" 
                  icon={GraduationCap} 
                  position={[-7, 0, 0]} 
                  rotation={[0, -Math.PI / 2, 0]}
                >
                  {/* Skolorna */}
                  {cvData.education.map((edu, i) => (
                    <div key={i} className="mb-4 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">{edu.year}</span>
                      <h4 className="text-white font-bold text-lg leading-tight mt-1">{edu.degree}</h4>
                      <p className="text-gray-400 text-xs mt-1">{edu.school}</p>
                    </div>
                  ))}

                  {/* Certifikaten / Topstep prestanda */}
                  <div className="mt-6 pt-5 border-t border-cyan-500/10 space-y-3">
                    <p className="text-cyan-400 font-mono text-xs uppercase flex items-center gap-2">
                      <Award className="w-4 h-4" /> // Certifikat
                    </p>
                    {cvData.certifications.map((cert, i) => (
                      <div key={i} className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                        <h5 className="text-white font-bold text-sm leading-tight">{cert.name}</h5>
                        <p className="text-gray-400 text-[11px] font-mono mt-1">{cert.detail}</p>
                      </div>
                    ))}
                  </div>
                </CVPane>

              </group>
            </Float>

            <Stars radius={100} depth={50} count={3000} factor={4} fade speed={0.5} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}