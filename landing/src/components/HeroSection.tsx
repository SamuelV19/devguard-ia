import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Terminal, AlertTriangle, CheckCircle2, FileText, Sparkles, Copy, Check } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const commandText = 'agy --agent devguard "Audita este módulo de autenticación"';

  const handleCopy = () => {
    navigator.clipboard.writeText(commandText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Prop & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AGENT SKILL PARA INGENIEROS DE SOFTWARE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Auditoría inteligente de código,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                calidad y seguridad
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              <strong className="text-white font-medium">DevGuard AI</strong> es una Skill modular para agentes de desarrollo que asiste en la revisión técnica de código fuente: detecta vulnerabilidades OWASP/CWE, evalúa mantenibilidad, propone casos de prueba y genera informes reproducibles con enfoque <span className="text-emerald-400 font-medium">Human-in-the-Loop</span>.
            </p>

            {/* Quick Command Box */}
            <div className="p-3 bg-[#0E1522] border border-slate-800 rounded-xl max-w-lg mx-auto lg:mx-0 flex items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono text-slate-300">
                <span className="text-emerald-400 select-none">$</span>
                <span className="truncate">{commandText}</span>
              </div>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex-shrink-0"
                title="Copiar comando de invocación"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#demostracion"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Explorar Demostración</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#recursos"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Consultar Recursos & Repo</span>
              </a>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <p className="text-xs text-slate-400">Enfoque</p>
                <p className="text-sm font-semibold text-slate-200">Asistido (No sustitutivo)</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Vectores</p>
                <p className="text-sm font-semibold text-slate-200">OWASP, CWE & SOLID</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Salida</p>
                <p className="text-sm font-semibold text-slate-200">Informes con Diffs</p>
              </div>
            </div>
          </div>

          {/* Right Column: Code Analysis Visual Resource */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#0D121F] border border-slate-800/90 shadow-2xl shadow-black/80 overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#090D16] border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    devguard-scan.ts — Audit Preview
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
                  ANALYSIS COMPLETED
                </span>
              </div>

              {/* Code & Finding Preview Body */}
              <div className="p-4 font-mono text-xs space-y-3 overflow-x-auto bg-[#0A0E18]">
                {/* Code line block */}
                <div className="space-y-1 text-slate-400 leading-relaxed">
                  <div className="flex gap-3">
                    <span className="text-slate-600 select-none w-4 text-right">24</span>
                    <span className="text-purple-400">const</span> <span>query =</span> <span className="text-amber-300">`SELECT * FROM users WHERE id = '${'{'}userId{'}'}'`</span>;
                  </div>
                  <div className="flex gap-3 bg-rose-950/40 -mx-4 px-4 py-1 border-l-2 border-rose-500">
                    <span className="text-rose-400 select-none w-4 text-right">25</span>
                    <span className="text-slate-200">const user = await db.query(query);</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-slate-600 select-none w-4 text-right">26</span>
                    <span className="text-purple-400">return</span> <span>res.json(user.rows[0]);</span>
                  </div>
                </div>

                {/* Finding Card Injected */}
                <div className="p-3 rounded-xl bg-[#131B2E] border border-rose-500/30 space-y-2 mt-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                      <span className="font-semibold text-rose-200 text-xs">[DG-SEC-01] Inyección SQL Detectada</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                      CRÍTICO
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-sans leading-normal">
                    Concatenación directa de variable <code className="text-rose-300 bg-rose-950/50 px-1 py-0.5 rounded">userId</code> en sentencia SQL sin parametrizar.
                  </p>
                  
                  {/* Proposed diff snippet */}
                  <div className="mt-2 p-2 rounded bg-[#090D16] border border-slate-800 text-[11px] space-y-0.5 font-mono">
                    <p className="text-emerald-400">+ const query = 'SELECT * FROM users WHERE id = $1';</p>
                    <p className="text-emerald-400">+ const user = await db.query(query, [userId]);</p>
                  </div>
                </div>

                {/* Additional Scan Badges */}
                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Validación Humana Obligatoria
                  </span>
                  <span className="flex items-center gap-1 text-cyan-400 font-sans">
                    <FileText className="w-3.5 h-3.5" />
                    Informe generado
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
