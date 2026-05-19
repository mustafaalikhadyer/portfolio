import Preloader from "../components/Preloader";
import AmbientBackground from "../components/AmbientBackground";
import CustomCursor from "../components/CustomCursor";
import Navbar from "../components/Navbar"; 
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import NeuralCV from "../components/NeuralCV"; // <-- FIXEN: Ändrat till ../ så den matchar de andra!
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";

export default function Home() {
  return (
    // id="top" gör så att loggan i navbaren kan scrolla dig högst upp!
    <main id="top" className="relative min-h-screen cursor-none bg-black overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      
      <Preloader />
      <AmbientBackground />
      <CustomCursor />
      
      {/* Vår nya Navigationsbar som svävar över allt */}
      <Navbar />

      <div className="relative z-10">
        
        <Hero />
        
        {/* Vi lägger till id="..." på divarna runt komponenterna */}
        <div id="about">
          <ScrollReveal>
            <About />
          </ScrollReveal>
        </div>

        <div id="experience">
          <ScrollReveal>
            <Experience />
          </ScrollReveal>
        </div>

        {/* 🚀 DITT NYA NEURALA 3D-CV LIGGER HÄR 🚀 */}
        <div id="skills">
          <ScrollReveal>
            <NeuralCV />
          </ScrollReveal>
        </div>

        <div id="projects">
          <ScrollReveal>
            <Projects />
          </ScrollReveal>
        </div>
        
        <div id="contact">
          <ScrollReveal>
            <Footer />
          </ScrollReveal>
        </div>
        
      </div>
    </main>
  );
}