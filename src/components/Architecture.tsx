"use client";

import { Globe, Server, Database, Activity } from "lucide-react";

export default function Architecture() {
  return (
    <section className="relative min-h-screen w-full bg-black py-32 px-4 md:px-12 xl:px-24 overflow-hidden flex items-center">
      {/* Egen CSS för de lyxiga ljus-animationerna */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes data-flow-horizontal {
          0% { left: 0%; opacity: 0; transform: scaleX(1); }
          10% { opacity: 1; transform: scaleX(2); }
          90% { opacity: 1; transform: scaleX(2); }
          100% { left: 100%; opacity: 0; transform: scaleX(1); }
        }
        @keyframes data-flow-vertical {
          0% { top: 0%; opacity: 0; transform: scaleY(1); }
          10% { opacity: 1; transform: scaleY(2); }
          90% { opacity: 1; transform: scaleY(2); }
          100% { top: 100%; opacity: 0; transform: scaleY(1); }
        }
        .animate-data-x {
          animation: data-flow-horizontal 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-data-x-delayed {
          animation: data-flow-horizontal 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 1s;
        }
        .animate-data-y {
          animation: data-flow-vertical 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}} />

      {/* Bakgrunds-grid för den tekniska känslan */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Sektionsrubrik */}
        <div className="mb-24 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Activity className="w-5 h-5 text-blue-400 animate-pulse" />
            <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">System Architecture</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-space">
            Fullstack <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Topology.</span>
          </h2>
          <p className="text-gray-400 font-sans text-sm max-w-2xl mx-auto leading-relaxed">
Jag skriver inte bara kod; jag konstruerar högoptimerade digitala ekosystem. Från robusta backend-arkitekturer till hyperinteraktiva WebGL-gränssnitt är mitt mål att överbrygga klyftan mellan komplex logik och fantastisk visuell exekvering.          </p>
        </div>

        {/* Nätverket (Noderna) */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0 max-w-4xl mx-auto">
          
          {/* Nod 1: Frontend */}
          <div className="relative group w-full md:w-64 z-20">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative h-full bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center hover:bg-white/[0.02] transition-colors">
              <Globe className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Client Edge</h3>
              <p className="text-gray-500 text-xs font-mono">Next.js / React / TS</p>
              <div className="mt-4 px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] rounded-full uppercase tracking-widest font-mono">
                Active
              </div>
            </div>
          </div>

          {/* Anslutning 1 (Mobil: Lodrät, Desktop: Vågrät) */}
          <div className="relative w-1 h-16 md:w-32 md:h-1 bg-white/5 rounded-full z-10 overflow-hidden">
            {/* Animerat data-paket */}
            <div className="absolute top-0 left-0 w-full h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] hidden md:block animate-data-x" />
            <div className="absolute top-0 left-0 w-full h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] md:hidden animate-data-y" />
          </div>

          {/* Nod 2: Backend */}
          <div className="relative group w-full md:w-64 z-20">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative h-full bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center hover:bg-white/[0.02] transition-colors">
              <Server className="w-12 h-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">API Gateway</h3>
              <p className="text-gray-500 text-xs font-mono">Node.js / Express</p>
              <div className="mt-4 px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] rounded-full uppercase tracking-widest font-mono">
                Routing
              </div>
            </div>
          </div>

          {/* Anslutning 2 */}
          <div className="relative w-1 h-16 md:w-32 md:h-1 bg-white/5 rounded-full z-10 overflow-hidden">
            {/* Animerat data-paket (Fördröjd för att se ut som att den skickas vidare) */}
            <div className="absolute top-0 left-0 w-full h-full bg-indigo-400 shadow-[0_0_10px_#818cf8] hidden md:block animate-data-x-delayed" />
            <div className="absolute top-0 left-0 w-full h-full bg-indigo-400 shadow-[0_0_10px_#818cf8] md:hidden animate-data-y" style={{animationDelay: '1s'}} />
          </div>

          {/* Nod 3: Database */}
          <div className="relative group w-full md:w-64 z-20">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative h-full bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center hover:bg-white/[0.02] transition-colors">
              <Database className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Core Data</h3>
              <p className="text-gray-500 text-xs font-mono">PostgreSQL / Redis</p>
              <div className="mt-4 px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] rounded-full uppercase tracking-widest font-mono">
                Synced
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}