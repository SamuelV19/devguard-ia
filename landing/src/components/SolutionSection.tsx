import React from 'react';
import { ShieldCheck, UserCheck, Layers, GitCompare, CheckSquare, SearchCode } from 'lucide-react';

export const SolutionSection: React.FC = () => {
  const pillars = [
    {
      icon: UserCheck,
      title: 'Human-in-the-Loop por Diseño',
      description: 'DevGuard AI no aprueba código a espaldas del equipo ni toma decisiones en solitario. Proporciona argumentos técnicos sólidos para empoderar la toma de decisiones humana.'
    },
    {
      icon: SearchCode,
      title: 'Evidencia Textual Rigurosa',
      description: 'Cada hallazgo reportado incluye la ruta exacta del archivo, las líneas comprometidas y el fragmento responsable. Prohibición estricta de inventar vulnerabilidades o fallos inexistentes.'
    },
    {
      icon: GitCompare,
      title: 'Propuestas de Código con Diffs',
      description: 'No se limita a señalar el defecto: formula la refactorización recomendada con justificación técnica, evaluando los trade-offs y preservando la intención del autor.'
    },
    {
      icon: CheckSquare,
      title: 'Diseño de Pruebas Adversarias',
      description: 'Genera matrices de casos de prueba estructuradas (Arrange-Act-Assert) para validar tanto el camino nominal como los ataques de frontera y condiciones de fallo.'
    }
  ];

  return (
    <section id="solucion" className="py-20 border-t border-slate-800/80 bg-[#0B0F19]/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>LA RESPUESTA DE DEVGUARD AI</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Un copiloto analítico para <span className="text-emerald-400">blindar tu código</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            DevGuard AI es una Agent Skill diseñada específicamente para integrarse en agentes como Antigravity y Gemini CLI. Actúa como un consultor técnico incansable que audita arquitectura, seguridad y mantenibilidad antes de cada merge.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-8 rounded-2xl bg-[#0F1626] border border-slate-800/90 hover:border-emerald-500/30 hover:bg-[#121B2E] transition-all duration-300 flex items-start gap-5"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex-shrink-0 flex items-center justify-center text-emerald-400">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-100">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Philosophy Callout Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/30 border border-emerald-500/30 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-emerald-300 flex items-center gap-2 justify-center sm:justify-start">
              <Layers className="w-4 h-4" />
              Principio Fundamental: Asistir, no Reemplazar
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              DevGuard AI asume explícitamente que ningún modelo de IA puede garantizar seguridad absoluta. El juicio y la verificación empírica de los desarrolladores son siempre indispensables.
            </p>
          </div>
          <a
            href="#como-funciona"
            className="flex-shrink-0 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm"
          >
            Ver Flujo de Trabajo
          </a>
        </div>

      </div>
    </section>
  );
};
