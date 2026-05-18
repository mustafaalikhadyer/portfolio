"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial, Stars, Sparkles, Trail } from "@react-three/drei";
import * as THREE from "three";

// Den interaktiva mus-lampan som flyger i 3D-rummet och lämnar ett spår
function MouseTracker() {
  const lightRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!lightRef.current) return;
    // Konvertera 2D-muskoordinater till 3D-rymdens koordinater
    const x = (state.pointer.x * viewport.width) / 2;
    const y = (state.pointer.y * viewport.height) / 2;
    
    // Lerp gör så att ljuspunkten följer musen med en snygg fördröjning
    lightRef.current.position.lerp(new THREE.Vector3(x, y, 3), 0.1);
  });

  return (
    <Trail 
      width={2} // Tjocklek på svansen
      length={8} // Längd på svansen
      color={new THREE.Color("#00f3ff")} 
      attenuation={(t) => t * t} // Svansen smalnar av i slutet
    >
      <mesh ref={lightRef}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#00f3ff" />
        {/* Detta ljus kommer reflekteras i din glas-kärna! */}
        <pointLight distance={10} intensity={4} color="#00f3ff" />
      </mesh>
    </Trail>
  );
}

// Din Core, men nu maxad med Hyperdrive-interaktion och partiklar
function CoreSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 4;

    // Om klickad = spinn snabbt som fan. Annars = lugn rotation.
    const speed = clicked ? 0.1 : 0.02;
    const time = state.clock.elapsedTime;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y, 
      targetX + (clicked ? time * 2 : 0), 
      speed
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, 
      -targetY, 
      speed
    );

    // Pulserande skala när man har klickat
    const targetScale = clicked ? 1.15 : 1;
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1));
  });

  return (
    <group 
      ref={groupRef} 
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => document.body.style.cursor = 'crosshair'} 
      onPointerOut={() => document.body.style.cursor = 'none'}
    >
      <Float speed={clicked ? 6 : 2} rotationIntensity={clicked ? 1.5 : 0.5} floatIntensity={1}>
        
        {/* Inre Svart/Lysande Kärna */}
        <mesh>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshStandardMaterial 
            color={clicked ? "#001133" : "#050505"} 
            roughness={0.7} 
            metalness={0.8} 
            emissive={clicked ? "#00aaff" : "#000000"} 
            emissiveIntensity={clicked ? 2 : 0} 
          />
        </mesh>

        {/* Tjocka Glasringen */}
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[2.2, 0.05, 16, 100]} />
          <MeshTransmissionMaterial 
            backside
            thickness={0.2}
            roughness={0}
            transmission={1}
            ior={1.5}
            chromaticAberration={clicked ? 0.1 : 0.04} // Mer prisma-effekt när klickad
            color={clicked ? "#ff00ff" : "#ffffff"} // Skiftar färg i hyperdrive
          />
        </mesh>

        {/* Yttre Metallringen */}
        <mesh rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2.8, 0.02, 16, 100]} />
          <meshStandardMaterial 
            color="#444455" 
            metalness={1} 
            roughness={0.2} 
            emissive={clicked ? "#ff00ff" : "#111122"} 
            emissiveIntensity={clicked ? 2 : 1} 
          />
        </mesh>

        {/* 3D-Kvantdamm (Sparkles) som svävar runt kärnan */}
        <Sparkles 
          count={clicked ? 400 : 150} 
          scale={clicked ? 8 : 5} 
          size={clicked ? 4 : 2} 
          speed={clicked ? 3 : 0.4} 
          opacity={0.4} 
          color={clicked ? "#00f3ff" : "#ffffff"} 
        />
        
      </Float>
    </group>
  );
}

export default function Hero() {
  return (
    <section className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
      
      {/* Typografi och UI ovanpå 3D */}
      <div className="absolute z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4">
        <p className="text-blue-400 font-mono tracking-[0.3em] text-xs md:text-sm mb-4 uppercase opacity-80 animate-pulse">
          Systemet är Online // Fullstack Developer
        </p>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] font-sans">
          Ingenjör inom <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">
            det digitala.
          </span>
        </h1>
        <p className="text-gray-500 font-mono text-[10px] mt-12 tracking-[0.2em] uppercase">
          [ Klicka på kärnan för att aktivera Hyperdrive Mode ]
        </p>
      </div>

      {/* 3D Miljön */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
          <spotLight position={[-10, -10, -5]} intensity={5} color="#4488ff" />
          
          <Environment preset="city" />
          
          {/* Stjärnor i djupet */}
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          
          {/* Mus-effekten & Kärnan */}
          <MouseTracker />
          <CoreSphere />
          
        </Canvas>
      </div>

      {/* Svart övertoning för att smälta in i resten av sajten */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
}