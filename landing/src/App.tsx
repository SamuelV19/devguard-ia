import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { DemoSection } from './components/DemoSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { ResourcesSection } from './components/ResourcesSection';
import { LimitationsSection } from './components/LimitationsSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0D14] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Sticky Top Navigation */}
      <Navbar />

      {/* Main Page Flow */}
      <main className="flex-grow">
        {/* Section A: Hero */}
        <HeroSection />

        {/* Section B: El Problema */}
        <ProblemSection />

        {/* Section C: La Solución */}
        <SolutionSection />

        {/* Section D: Funcionalidades */}
        <FeaturesSection />

        {/* Section E: Cómo Funciona */}
        <HowItWorksSection />

        {/* Section F: Demostración */}
        <DemoSection />

        {/* Section G: Arquitectura */}
        <ArchitectureSection />

        {/* Section H: Recursos del Proyecto (Infografía, Video, Docs, Repo) */}
        <ResourcesSection />

        {/* Section I: Limitaciones */}
        <LimitationsSection />
      </main>

      {/* Section J: Pie de Página */}
      <Footer />
    </div>
  );
};

export default App;
