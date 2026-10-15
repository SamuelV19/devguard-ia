import React from 'react';
import { Code2, ShieldAlert, TestTube2, FileCheck2, Zap } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Code2,
      tag: 'CALIDAD & MANTENIBILIDAD',
      title: 'Revisión Profunda de Código',
      description: 'Auditoría de adherencia a principios SOLID, detección de complejidad ciclomática excesiva, métodos sobredimensionados, manejo deficiente de excepciones y anti-patrones asíncronos.',
      highlights: ['Detección de Code Smells', 'Control de Excepciones', 'Reducción de Deuda Técnica'],
      accentColor: 'text-teal-400',
      borderColor: 'hover:border-teal-500/40'
    },
    {
      icon: ShieldAlert,
      tag: 'SEGURIDAD & VECTORES DE ATAQUE',
      title: 'Análisis de Riesgos OWASP & CWE',
      description: 'Inspección meticulosa de inyecciones (SQL, NoSQL, Shell), Broken Access Control (IDOR), fallos criptográficos, gestión insegura de JWT, cookies desprotegidas y fugas de secretos en repositorios.',
      highlights: ['Mapeo OWASP Top 10', 'Verificación de IDOR & RBAC', 'Protección Criptográfica'],
      accentColor: 'text-rose-400',
      borderColor: 'hover:border-rose-500/40'
    },
    {
      icon: TestTube2,
      tag: 'COBERTURA E INTEGRACIÓN',
      title: 'Diseño de Pruebas Automatizadas',
      description: 'Propuesta metódica de casos de prueba siguiendo el patrón AAA (Arrange-Act-Assert): caminos felices, validaciones de frontera (*boundary conditions*) y pruebas adversarias con payloads de estrés.',
      highlights: ['Pruebas Unitarias & Integración', 'Casos Adversarios', 'Especificación Tabular AAA'],
      accentColor: 'text-amber-400',
      borderColor: 'hover:border-amber-500/40'
    },
    {
      icon: FileCheck2,
      tag: 'REPORTING TÉCNICO',
      title: 'Informes Estructurados y Accionables',
      description: 'Generación estandarizada de reportes técnicos con matriz de severidad calibrada (Crítico, Alto, Medio, Bajo, Info), certidumbre de hallazgo, diffs listos para revisión y plan de acción priorizado.',
      highlights: ['Matriz de Severidad', 'Diffs Justificados', 'Avisos de Falsos Positivos'],
      accentColor: 'text-cyan-400',
      borderColor: 'hover:border-cyan-500/40'
    }
  ];

  return (
    <section id="funcionalidades" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide">
            <Zap className="w-3.5 h-3.5" />
            <span>CAPACIDADES ESPECIALIZADAS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Cuatro pilares para una <span className="text-cyan-400">auditoría técnica exhaustiva</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Cada módulo de la Skill aborda una dimensión crítica del ciclo de desarrollo, combinando heurísticas de seguridad, ingeniería de software y buenas prácticas de pruebas.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className={`p-8 rounded-2xl bg-[#0D1322] border border-slate-800/90 ${feat.borderColor} transition-all duration-300 flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center">
                      <Icon className={`w-6 h-6 ${feat.accentColor}`} />
                    </div>
                    <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-semibold">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-100">
                    {feat.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/70 space-y-2">
                  <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                    Capacidades Incluidas:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {feat.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-xs px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/60"
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
