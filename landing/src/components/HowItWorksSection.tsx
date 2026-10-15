import React from 'react';
import { Code, Cpu, FileSpreadsheet, UserCheck, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: Code,
      title: 'Entrada de Código',
      description: 'El desarrollador suministra uno o varios archivos, funciones o diffs de un Pull Request para su análisis técnico.',
      tag: 'Input Source'
    },
    {
      step: '02',
      icon: Cpu,
      title: 'Identificación de Contexto',
      description: 'DevGuard mapea el stack (TypeScript, Go, Python, etc.), frameworks, librerías y las fronteras de entrada/salida de datos.',
      tag: 'Stack Discovery'
    },
    {
      step: '03',
      icon: ShieldAlert,
      title: 'Análisis Multi-Vector',
      description: 'Cotejo riguroso contra las referencias especializadas: Security Checklist (OWASP/CWE), Code Quality y Testing Guide.',
      tag: 'Evidence Audit'
    },
    {
      step: '04',
      icon: FileSpreadsheet,
      title: 'Generación de Informe',
      description: 'Construcción del reporte estandarizado con matriz de severidad, evidencia textual de líneas, diffs de solución y casos de prueba.',
      tag: 'Report & Diffs'
    },
    {
      step: '05',
      icon: UserCheck,
      title: 'Validación Humana Obligatoria',
      description: 'El ingeniero revisa las propuestas, ejecuta las pruebas en local o staging y toma la decisión de merge final.',
      tag: 'Human Review'
    }
  ];

  return (
    <section id="como-funciona" className="py-20 border-t border-slate-800/80 bg-[#0B0F19]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FLUJO OPERATIVO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            De la línea de código a la <span className="text-emerald-400">validación humana</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Un proceso secuencial y determinista diseñado para evitar alucinaciones, asegurar la trazabilidad de los hallazgos y mantener el control en manos del desarrollador.
          </p>
        </div>

        {/* Workflow Horizontal / Vertical Pipeline */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === steps.length - 1;

            return (
              <div
                key={item.step}
                className="relative group p-5 rounded-2xl bg-[#0F1626] border border-slate-800 hover:border-emerald-500/40 hover:bg-[#121B2E] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Step Indicator Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-slate-600 group-hover:text-emerald-400 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    {item.tag}
                  </span>

                  <h3 className="text-base font-bold text-slate-100 mt-3 group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Status footer inside card */}
                <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Fase {item.step}</span>
                  {!isLast && <ArrowRight className="w-3.5 h-3.5 text-slate-600 hidden md:block" />}
                  {isLast && <span className="text-emerald-400 font-medium">Meta Final</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pipeline Summary Bar */}
        <div className="mt-10 p-4 rounded-xl bg-[#090D15] border border-slate-800 text-center text-xs text-slate-400 font-mono">
          <span className="text-emerald-400 font-semibold">Garantía DevGuard:</span> Cada fase produce artefactos verificables sin ejecutar acciones destructivas no autorizadas.
        </div>

      </div>
    </section>
  );
};
