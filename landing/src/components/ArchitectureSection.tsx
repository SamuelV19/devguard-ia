import React from 'react';
import { Layers, FolderTree, FileCode, BookOpen, FileCheck, Cpu } from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  const components = [
    {
      name: 'SKILL.md (Core)',
      path: '.agents/skills/devguard/SKILL.md',
      type: 'Instruction File',
      description: 'Define los metadatos YAML de descubrimiento, la filosofía Human-in-the-Loop, las reglas de evidencia estricta y el algoritmo de ejecución en 5 fases.',
      icon: Cpu,
      color: 'text-emerald-400',
      badge: 'Principal'
    },
    {
      name: 'references/ (Guías Modulares)',
      path: 'references/security-checklist.md | code-quality.md | testing.md',
      type: 'Progressive Disclosure',
      description: 'Repositorio de conocimiento especializado cargado bajo demanda: vectores OWASP Top 10/CWE, principios SOLID, anti-patrones y metodología de pruebas AAA.',
      icon: BookOpen,
      color: 'text-cyan-400',
      badge: 'Conocimiento'
    },
    {
      name: 'templates/ (Plantillas)',
      path: 'templates/report-template.md',
      type: 'Structured Output',
      description: 'Estructura formal para informes ejecutivos y técnicos con matriz de severidad, certidumbre, bloques diff y planes de remediación.',
      icon: FileCheck,
      color: 'text-amber-400',
      badge: 'Plantillas'
    },
    {
      name: 'examples/ (Banco de Pruebas)',
      path: 'examples/vulnerable-auth-endpoint.ts | fixed-auth-endpoint.ts',
      type: 'Empirical Verification',
      description: 'Conjunto de casos prácticos con vulnerabilidades reales intencionales, reportes modelo y código refactorizado para benchmarking.',
      icon: FileCode,
      color: 'text-teal-400',
      badge: 'Ejemplos'
    }
  ];

  return (
    <section id="arquitectura" className="py-20 border-t border-slate-800/80 bg-[#0B0F19]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold tracking-wide">
            <Layers className="w-3.5 h-3.5" />
            <span>DISEÑO DEL SISTEMA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Arquitectura modular y <span className="text-teal-400">Progressive Disclosure</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            La Skill DevGuard AI se estructura conforme al estándar de Agent Skills de Antigravity y Gemini CLI, minimizando el consumo de tokens mediante carga diferida de referencias especializadas.
          </p>
        </div>

        {/* Visual Architecture Tree Diagram */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#090D16] border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto shadow-xl">
          <div className="flex items-center gap-2 text-emerald-400 pb-4 border-b border-slate-800 font-bold uppercase tracking-wider">
            <FolderTree className="w-4 h-4" />
            <span>Estructura de Directorios de la Skill (.agents/skills/devguard/)</span>
          </div>
          <pre className="mt-4 leading-relaxed text-slate-300 font-mono">
{`.agents/skills/devguard/
├── SKILL.md                          <- Orquestador, metadatos YAML y fases de auditoría
├── references/                       <- Documentación técnica cargada bajo demanda
│   ├── security-checklist.md         <- Mapeo OWASP Top 10, CWEs y vectores de ataque
│   ├── code-quality-checklist.md     <- Principios SOLID, gestión de errores y code smells
│   └── testing-guide.md              <- Metodología AAA y diseño de casos adversarios
├── templates/
│   └── report-template.md            <- Plantilla estandarizada de reporte técnico
└── examples/
    ├── vulnerable-auth-endpoint.ts   <- Caso vulnerable para demostración y benchmark
    ├── vulnerable-auth-report.md     <- Reporte de auditoría generado por DevGuard AI
    └── fixed-auth-endpoint.ts        <- Solución refactorizada con validación y mitigaciones`}
          </pre>
          <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
            <span>Sincronización Gemini CLI: <code>.gemini/skills/devguard</code> (Enlace simbólico relativo)</span>
            <span className="text-emerald-400">Versión Canónica: .agents/skills/devguard/</span>
          </div>
        </div>

        {/* Component Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {components.map((comp) => {
            const Icon = comp.icon;
            return (
              <div
                key={comp.name}
                className="p-6 rounded-2xl bg-[#0F1626] border border-slate-800/90 hover:border-teal-500/30 transition-all duration-300 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center flex-shrink-0">
                  <Icon className={`w-5 h-5 ${comp.color}`} />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-100">{comp.name}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                      {comp.badge}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-teal-400/90 truncate">{comp.path}</p>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">{comp.description}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
