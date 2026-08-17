"use client";

import React from "react";

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* 
        OPTIMERING: Istället för att använda blur() som dödar MacBooks, 
        använder vi radial-gradient. Samma snygga effekt, drar 0% datorkraft.
      */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] opacity-30"
        style={{ background: "radial-gradient(circle, rgba(0,243,255,0.15) 0%, rgba(0,0,0,0) 70%)" }}
      />
      <div 
        className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] opacity-20"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(0,0,0,0) 70%)" }}
      />
      
      {/* Ett statiskt mönster ovanpå ger textur utan att lagga */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}
      />
    </div>
  );
}