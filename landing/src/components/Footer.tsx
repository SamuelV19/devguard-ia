import React from 'react';
import { Shield, Github, Terminal } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#070A11] text-slate-400 text-xs py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white tracking-tight">DevGuard AI</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 font-mono">Skill v1.0</span>
            </div>
            <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="pt-2 flex items-center gap-2 text-slate-500 font-mono text-[11px]">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Antigravity & Gemini CLI Compatible</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <p className="font-semibold text-slate-200 text-xs tracking-wider uppercase font-mono">
              Navegación
            </p>
            <ul className="space-y-2">
              <li><a href="#problema" className="hover:text-emerald-400 transition-colors">El Problema</a></li>
              <li><a href="#solucion" className="hover:text-emerald-400 transition-colors">La Solución</a></li>
              <li><a href="#funcionalidades" className="hover:text-emerald-400 transition-colors">Funcionalidades</a></li>
              <li><a href="#como-funciona" className="hover:text-emerald-400 transition-colors">Flujo Operativo</a></li>
              <li><a href="#demostracion" className="hover:text-emerald-400 transition-colors">Demostración</a></li>
              <li><a href="#arquitectura" className="hover:text-emerald-400 transition-colors">Arquitectura</a></li>
            </ul>
          </div>

          {/* Technical Stack */}
          <div className="space-y-3">
            <p className="font-semibold text-slate-200 text-xs tracking-wider uppercase font-mono">
              Stack Tecnológico
            </p>
            <ul className="space-y-2 text-slate-400 font-mono text-[11px]">
              <li>• Agent Skills Specification</li>
              <li>• Antigravity CLI / Gemini CLI</li>
              <li>• React 18 + TypeScript</li>
              <li>• Vite + Tailwind CSS</li>
              <li>• Lucide Icons</li>
            </ul>
          </div>

        </div>

        {/* Academic Credits & Copyright without fake institutions or teachers */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-400 text-xs">
          <div>
            <p className="text-slate-300 font-medium">
              {siteConfig.academic.course} ({siteConfig.academic.year})
            </p>
            <p className="text-slate-400 text-[11px] mt-0.5">
              Desarrollado para el ecosistema de Agent Skills y auditoría de software con enfoque Human-in-the-Loop.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {siteConfig.hasPublicRepo ? (
              <a
                href={siteConfig.githubRepoUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition flex items-center gap-1.5"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            ) : (
              <span className="text-slate-400 font-mono text-[11px]">
                Repo local preparado
              </span>
            )}
            <span className="text-slate-700">|</span>
            <span className="text-slate-400 font-mono text-[11px]">
              MIT License
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
