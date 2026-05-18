"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.05, 
        duration: 1.5, 
        smoothWheel: true,
      }}
    >
      {/* 'as any' tvingar TypeScript att strunta i versionskrocken mellan React 18 och 19 */}
      {children as any}
    </ReactLenis>
  );
}