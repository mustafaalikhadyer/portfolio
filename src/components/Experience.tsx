"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { Briefcase, Calendar } from "lucide-react";

// De snurrande 3D-ringarna
function DataRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        {/* Yttre ringen */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.5, 0.05, 16, 100]} />
          <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={0.5} wireframe />
        </mesh>
        
        {/* Inre glas-ringen */}
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[1.5, 0.2, 16, 100]} />
          <MeshTransmissionMaterial 
            backside thickness={0.5} roughness={0.1} transmission={1} ior={1.5} 
            chromaticAberration={0.1} color="#ffffff" 
          />
        </mesh>

        {/* Kärnan */}
        <mesh>
          <octahedronGeometry args={[0.5]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Experience() {
  return (
    <section className="relative min-h-screen w-full bg-transparent py-20 lg:py-32 px-4 md:px-12 xl:px-24 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Rubrik */}
        <div className="mb-16 lg:mb-20 text-center lg:text-left">
          <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] mb-4">
            // Arbetslivserfarenhet
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white font-space">
            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">History.</span>
          </h2>
        </div>

        {/* Layout: flex-col (staplad på mobil) -> lg:flex-row (sida vid sida på dator) */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Text/Erfarenhet (Vänster) */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8 order-2 lg:order-1">
            
            {/* Telenor Jobb */}
            <div className="relative p-6 md:p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/30 transition-colors group">
              <div className="absolute top-0 left-8 w-[2px] h-full bg-gradient-to-b from-cyan-500 to-transparent -z-10 opacity-50 hidden md:block" />
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-black border border-cyan-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.2)]">
                  <Briefcase className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white font-space">Telenor Sverige</h3>
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mt-1">
                    <Calendar className="w-3 h-3" />
                    <span>2022 - Present</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-400 font-sans text-sm md:text-base leading-relaxed ml-0 md:ml-16">
                Systemutveckling och underhåll av kritiska nätverksapplikationer. Fokus på storskalig backend-arkitektur, databasoptimering och att bygga robusta API:er för intern och extern kommunikation.
              </p>
              
              <div className="flex flex-wrap items-center gap-2 mt-6 ml-0 md:ml-16">
                <span className="px-3 py-1 text-[10px] font-mono text-cyan-300 bg-cyan-900/30 border border-cyan-500/20 rounded-full">.NET</span>
                <span className="px-3 py-1 text-[10px] font-mono text-cyan-300 bg-cyan-900/30 border border-cyan-500/20 rounded-full">C#</span>
                <span className="px-3 py-1 text-[10px] font-mono text-cyan-300 bg-cyan-900/30 border border-cyan-500/20 rounded-full">SQL Server</span>
              </div>
            </div>

            {/* Fyll på med fler jobb här om du har! Kopiera bara rutan ovan */}

          </div>

          {/* 3D Visualisering (Höger) - Begränsad höjd på mobil! */}
          <div className="w-full lg:w-1/2 h-[350px] lg:h-[600px] relative order-1 lg:order-2">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none lg:hidden" />
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
              <Environment preset="city" />
              <DataRings />
            </Canvas>
          </div>

        </div>
      </div>
    </section>
  );
}