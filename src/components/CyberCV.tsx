"use client";

import React from "react";
import { Zap, BrainCircuit, Briefcase, GraduationCap, Languages, Award, ChevronRight, Terminal } from "lucide-react";

// --- DATA FÖR DITT CV ---
const cvData = {
  profile: {
    title: "Systemutvecklare .NET",
    summary: "Passionerad utvecklare med fokus på skalbar backend-arkitektur, robust API-design och moderna webbgränssnitt. Specialist på Microsoft-stacken.",
    languages: ["Svenska (Flytande)", "Engelska (Flytande)", "Arabiska (Modersmål)"]
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
    { role: "Funded Trading Analytiker", company: "Fintech / Trading", year: "2025 - Nuvarande" },
    { role: "Logistik & Lagerarbetare", company: "DHL Lager", year: "2024 - 2025" }
  ],
  education: [
    { degree: "Fullstack .NET Developer", school: "Chas Academy", year: "Studerande" },
    { degree: "Gymnasieexamen - Ekonomi", school: "Kungsholmens Västra Gymnasium", year: "Avklarad" }
  ],
  certifications: [
    { name: "Topstep Funded Trader ($50K)", detail: "Verifierat certifikat ×2" }
  ]
};

export default function CyberCV() {
  return (
    // FIXEN: Ändrat overflow-hidden till overflow-visible så mobilen tillåter scroll!
    <section className="relative min-h-screen w-full py-24 bg-black flex flex-col items-center justify-center overflow-visible">
      
      {/* --- BAKGRUNDS EFFEKT --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/10 blur-[120px]" />
      </div>

      {/* --- RUBRIK --- */}
      <div className="text-center mb-16 z-20 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-cyan-500/10 border border-cyan-500/20">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest">System_Logs</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-white font-space tracking-tight">
          Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Database.</span>
        </h2>
      </div>

      {/* --- BENTO GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-7xl mx-auto px-4 md:px-8 z-20">
        
        {/* KORT 1: PROFIL */}
        <div className="col-span-1 md:col-span-7 p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-cyan-500/30 transition-all duration-500 group relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] group-hover:bg-cyan-500/10 transition-colors" />
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <BrainCircuit className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold font-space uppercase tracking-wider text-white">Profile</h3>
          </div>
          
          <p className="text-cyan-300 font-space text-2xl md:text-3xl font-bold leading-tight mb-4">
            {cvData.profile.title}
          </p>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
            {cvData.profile.summary}
          </p>
          
          <div className="flex flex-wrap gap-3 mt-auto">
            {cvData.profile.languages.map(lang => (
              <span key={lang} className="text-gray-300 text-sm bg-white/5 px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2">
                <Languages className="w-4 h-4 text-cyan-500" /> {lang}
              </span>
            ))}
          </div>
        </div>

        {/* KORT 2: STACK */}
        <div className="col-span-1 md:col-span-5 p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-emerald-500/30 transition-all duration-500 group relative overflow-hidden">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold font-space uppercase tracking-wider text-white">Tech Stack</h3>
          </div>
          
          <div className="space-y-5">
            {cvData.skills.map((skill, i) => (
              <div key={i} className="group/skill">
                <div className="flex justify-between text-xs font-mono text-gray-400 mb-2 uppercase group-hover/skill:text-emerald-300 transition-colors">
                  <span>{skill.name}</span>
                  <span>{skill.level}</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-600 to-cyan-400 rounded-full opacity-70 group-hover/skill:opacity-100 transition-opacity" style={{ width: skill.level }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* KORT 3: JOBB ERFARENHET */}
        <div className="col-span-1 md:col-span-6 p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-cyan-500/30 transition-all duration-500 group relative">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold font-space uppercase tracking-wider text-white">Experience</h3>
          </div>
          
          <div className="space-y-8 pl-2">
            {cvData.experience.map((job, i) => (
              <div key={i} className="relative pl-8 before:absolute before:left-[3px] before:top-2 before:bottom-[-24px] before:w-[2px] before:bg-white/5 last:before:hidden">
                <div className="absolute left-[-2px] top-1.5 w-3 h-3 rounded-full bg-cyan-500 ring-4 ring-[#0a0a0a]" />
                <p className="text-cyan-400 font-mono text-xs mb-1.5">{job.year}</p>
                <h4 className="text-white font-bold text-lg font-space">{job.role}</h4>
                <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
                  {job.company} <ChevronRight className="w-3 h-3" />
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* KORT 4: UTBILDNING & CERTIFIKAT */}
        <div className="col-span-1 md:col-span-6 flex flex-col gap-6">
          
          <div className="flex-1 p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-cyan-500/30 transition-all duration-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold font-space uppercase tracking-wider text-white">Academy</h3>
            </div>
            <div className="space-y-4">
              {cvData.education.map((edu, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] transition-colors border border-white/5">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">{edu.year}</span>
                  <h4 className="text-white font-bold text-base">{edu.degree}</h4>
                  <p className="text-gray-500 text-sm mt-1">{edu.school}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-900/20 to-[#0a0a0a] border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-500">
             <div className="flex items-center gap-4 mb-4">
              <Award className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-bold font-space uppercase tracking-wider text-white">Certifications</h3>
            </div>
            {cvData.certifications.map((cert, i) => (
              <div key={i}>
                <h5 className="text-white font-bold text-sm mb-1">{cert.name}</h5>
                <p className="text-cyan-200/50 text-xs font-mono">{cert.detail}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}