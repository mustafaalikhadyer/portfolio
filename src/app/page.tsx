import Preloader from "../components/Preloader";
import AmbientBackground from "../components/AmbientBackground";
import CustomCursor from "../components/CustomCursor";
import Navbar from "../components/Navbar"; 
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import CyberCV from "../components/CyberCV"; // <-- NYA IMPORTEN
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";

export default function Home() {
  return (
    <main id="top" className="relative min-h-screen cursor-none bg-black overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      
      <Preloader />
      <AmbientBackground />
      <CustomCursor />
      <Navbar />

      <div className="relative z-10">
        <Hero />
        
        <div id="about">
          <ScrollReveal><About /></ScrollReveal>
        </div>

        <div id="experience">
          <ScrollReveal><Experience /></ScrollReveal>
        </div>

        {/* 🚀 DEN NYA CYBER-KOMPONENTEN 🚀 */}
        <div id="skills">
          <ScrollReveal>
            <CyberCV />
          </ScrollReveal>
        </div>

        <div id="projects">
          <ScrollReveal><Projects /></ScrollReveal>
        </div>
        
        <div id="contact">
          <ScrollReveal><Footer /></ScrollReveal>
        </div>
      </div>
    </main>
  );
}