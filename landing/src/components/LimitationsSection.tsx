import React from 'react';
import { AlertTriangle, UserCheck, ShieldOff, RefreshCw } from 'lucide-react';

export const LimitationsSection: React.FC = () => {
  const points = [
    {
      icon: ShieldOff,
      title: 'Ausencia de Garantía Absoluta',
      description: 'DevGuard AI no certifica ni garantiza la invulnerabilidad de un sistema. La seguridad del software es una disciplina holística que abarca infraestructura, control de accesos, dependencias y procesos operacionales.'
    },
    {
      icon: RefreshCw,
      title: 'Sensibilidad al Contexto Externo',
      description: 'El análisis estático evalúa los fragmentos proporcionados. Mitigaciones perimetrales (WAF, políticas de API Gateway, sanitizadores en capas superiores) pueden alterar el impacto real de un hallazgo.'
    },
    {
      icon: AlertTriangle,
      title: 'Posibilidad de Falsos Positivos y Negativos',
      description: 'Ciertas construcciones idiomáticas o patrones intencionales pueden ser marcados como advertencias. Por contraparte, vulnerabilidades novedosas de día cero (0-day) pueden no ser reconocidas.'
    },
    {
      icon: UserCheck,
      title: 'Validación y Ejecución Humana Obligatoria',
      description: 'Ninguna refactorización o cambio de código propuesto por la Skill debe aplicarse directamente a producción sin ser previamente revisado, compilado y testeado por un ingeniero responsable.'
    }
  ];

  return (
    <section id="limitaciones" className="py-20 border-t border-slate-800/80 bg-[#0B0F19]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wide">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>ALCANCE Y RESPONSABILIDAD ÉTICA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Límites del Asistente y <span className="text-amber-400">Revisión Humana</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            La transparencia sobre las limitaciones de las herramientas de inteligencia artificial es esencial para la ingeniería de software profesional.
          </p>
        </div>

        {/* Limitations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
          {points.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="p-6 rounded-2xl bg-[#0F1626] border border-slate-800/90 hover:border-amber-500/30 transition-all duration-300 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 text-amber-400">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-100">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">{p.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Golden Rule Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-center max-w-3xl mx-auto space-y-2">
          <p className="text-sm font-bold text-amber-300 uppercase tracking-wider font-mono">
            Regla de Oro en DevGuard AI
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            "La inteligencia artificial amplifica la capacidad de auditoría del ingeniero; no lo exime de su responsabilidad técnica sobre el código desplegado."
          </p>
        </div>

      </div>
    </section>
  );
};
