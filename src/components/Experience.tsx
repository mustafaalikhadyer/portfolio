"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Html, Stars } from "@react-three/drei";
import * as THREE from "three";

// Din riktiga arbetslivserfarenhet (bara två stycken!)
const experiences = [
  {
    id: 1,
    year: "AKTUELLT",
    role: "Fullstack .NET Developer Student",
    company: "System Architecture & Engineering",
    desc: "Bygger och underhåller skalbara webbapplikationer och robust systemarkitektur med fokus på modern .NET-teknologi och molnlösningar."
  },
  {
    id: 2,
    year: "AKTUELLT",
    role: "Sales Representative",
    company: "Telenor",
    desc: "Ansvarig för direktförsäljning, kundrelationer och att leverera skräddarsydda telekomlösningar med fokus på högsta möjliga kundnöjdhet."
  }
];

// Komponent för varje svävande 3D-ring
function DataRing({ position, data, delay }: { position: [number, number, number], data: any, delay: number }) {
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    const t = state.clock.elapsedTime;
    
    // Ringen roterar konstant och mjukt i rymden, oavsett var musen är
    ringRef.current.rotation.y = t * 0.5 + delay;
    ringRef.current.rotation.z = Math.sin(t * 0.5 + delay) * 0.1;
  });

  return (
    <group position={position} ref={ringRef}>
      {/* Den inre glödande ringen */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshStandardMaterial 
          color="#00f3ff" 
          emissive="#00f3ff" 
          emissiveIntensity={1} 
        />
      </mesh>

      {/* Den yttre "data"-ringen med hackiga linjer (wireframe) */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.1}>
        <torusGeometry args={[2.5, 0.1, 8, 50]} />
        <meshBasicMaterial 
          color="#00f3ff" 
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </mesh>

      {/* HTML-innehållet (Texten) svävar konstant bredvid ringen */}
      <Html 
        position={[3, 0, 0]} 
        center 
        className="pointer-events-none w-[300px] md:w-[400px]"
      >
        <div className="p-6 rounded-2xl border bg-[#050505]/60 border-cyan-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(0,243,255,0.1)]">
          <p className="font-mono text-xs mb-2 tracking-widest text-cyan-400">
            {data.year}
          </p>
          <h3 className="text-xl md:text-2xl font-bold mb-1 font-space text-white">
            {data.role}
          </h3>
          <h4 className="text-sm text-gray-400 mb-4 uppercase tracking-wider">{data.company}</h4>
          
          <div className="opacity-100">
            <p className="text-gray-400 text-sm leading-relaxed">
              {data.desc}
            </p>
          </div>
        </div>
      </Html>
    </group>
  );
}

export default function Experience() {
  return (
    <section className="relative min-h-[120vh] w-full py-32 overflow-hidden bg-transparent">
      
      {/* Rubrik */}
      <div className="absolute top-24 left-0 w-full text-center z-10 pointer-events-none px-4">
        <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] mb-4">
          Data Logs // Tidslinje
        </p>
        <h2 className="text-4xl md:text-6xl font-bold text-white font-space drop-shadow-2xl">
          Operativ Historia.
        </h2>
      </div>

      {/* 3D Scenen - Datakärnan */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <Environment preset="city" />
          <Stars radius={100} depth={50} count={2000} factor={4} fade />
          
          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
            
            {/* Ljusstrålen / Kärnan i mitten som går genom ringarna */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 12, 16]} />
              <meshBasicMaterial color="#00f3ff" transparent opacity={0.3} />
            </mesh>

            {/* Genererar de två ringarna. Den första hamnar över mitten, den andra under. */}
            {experiences.map((exp, index) => {
              const yPos = 2 - index * 4; // index 0 blir +2, index 1 blir -2
              return (
                <DataRing 
                  key={exp.id} 
                  position={[0, yPos, 0]} 
                  data={exp} 
                  delay={index * 2} 
                />
              );
            })}

          </Float>
        </Canvas>
      </div>

    </section>
  );
}