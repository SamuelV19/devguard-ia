import React, { useState } from 'react';
import { Shield, Github, Menu, X, BookOpen, Terminal } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Problema', href: '#problema' },
    { name: 'Solución', href: '#solucion' },
    { name: 'Funcionalidades', href: '#funcionalidades' },
    { name: 'Cómo Funciona', href: '#como-funciona' },
    { name: 'Demostración', href: '#demostracion' },
    { name: 'Arquitectura', href: '#arquitectura' },
    { name: 'Recursos', href: '#recursos' },
    { name: 'Limitaciones', href: '#limitaciones' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0A0D14]/85 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-950/40 group-hover:shadow-emerald-500/20 transition-all duration-300">
              <div className="w-full h-full bg-[#0B0F17] rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-100 tracking-tight">DevGuard</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-medium">AI SKILL</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono hidden sm:block">Code Quality & Security Copilot</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#recursos"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 rounded-lg border border-slate-700 transition"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Docs</span>
            </a>

            {siteConfig.hasPublicRepo ? (
              <a
                href={siteConfig.githubRepoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-100 bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm shadow-emerald-900/30 transition"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            ) : (
              <a
                href="#recursos"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 hover:text-slate-300 transition"
                title="Repositorio en fase de desarrollo local"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Repo Local</span>
              </a>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#0B0F17]/98 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-emerald-400 hover:bg-slate-800/60"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            <a
              href="#demostracion"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600 text-white"
            >
              <Terminal className="w-4 h-4" />
              <span>Ver Demostración</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
