import React from 'react';
import { AlertOctagon, EyeOff, Clock, ShieldAlert, FileWarning } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: EyeOff,
      title: 'Puntos Ciegos de Seguridad',
      description: 'Los linters tradicionales detectan errores de formato y sintaxis, pero pasan por alto vulnerabilidades lógicas complejas como IDOR, SSRF o desbordamientos lógicos de autorización.',
      badge: 'Falsos Negativos'
    },
    {
      icon: Clock,
      title: 'Fatiga Cognitiva en Code Reviews',
      description: 'Revisar pull requests de cientos de líneas bajo presión de entrega conduce a aprobaciones apresuradas, permitiendo que defectos sutiles lleguen a ramas principales.',
      badge: 'Sobrecarga de Trabajo'
    },
    {
      icon: ShieldAlert,
      title: 'Riesgos Silenciosos en Producción',
      description: 'Una concatenación SQL descuidada o un secreto hardcodeado en un endpoint auxiliar puede comprometer la integridad y confidencialidad de toda la plataforma.',
      badge: 'Riesgo Crítico'
    },
    {
      icon: FileWarning,
      title: 'Pruebas Desconectadas de Seguridad',
      description: 'La mayoría de suites de tests se limitan al "camino feliz", dejando sin cobertura los casos límite, entradas maliciosas y condiciones de carrera adversarias.',
      badge: 'Cobertura Incompleta'
    }
  ];

  return (
    <section id="problema" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold tracking-wide">
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>EL DESAFÍO EN EL DESARROLLO MODERNO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Por qué revisar código sigue siendo <span className="text-rose-400">complejo y propenso a fallos</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            El software moderno crece en tamaño y dependencias a una velocidad vertiginosa. Depender únicamente de revisiones manuales aisladas o herramientas puramente cosméticas deja brechas críticas al descubierto.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {problems.map((prob) => {
            const Icon = prob.icon;
            return (
              <div
                key={prob.title}
                className="group p-6 rounded-2xl bg-[#0D131F] border border-slate-800/90 hover:border-rose-500/40 hover:bg-[#11192A] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {prob.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-rose-300 transition-colors">
                    {prob.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed font-normal">
                    {prob.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center gap-1.5 text-xs text-rose-400/80 font-medium">
                  <span>Impacto directo en el ciclo de vida</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
