import React, { useState } from 'react';
import { Image, Video, BookOpen, Github, Terminal, FileText, CheckCircle2, ExternalLink, Sparkles, Copy, Check } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const ResourcesSection: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [copiedDoc, setCopiedDoc] = useState<string | null>(null);

  const handleCopyPath = (path: string, key: string) => {
    navigator.clipboard.writeText(path);
    setCopiedDoc(key);
    setTimeout(() => setCopiedDoc(null), 2000);
  };

  return (
    <section id="recursos" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ENTREGABLES Y MATERIAL TÉCNICO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Recursos del <span className="text-cyan-400">Proyecto DevGuard AI</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Espacios destinados a la documentación técnica, código de la Skill, infografía visual y demostración audiovisual del proyecto académico.
          </p>
        </div>

        {/* 3 Distinct Visual Spaces Grid */}
        <div className="mt-14 space-y-12">
          
          {/* ======================================================== */}
          {/* ESPACIO 1: INFOGRAFÍA DEL PROYECTO                       */}
          {/* ======================================================== */}
          <div className="rounded-2xl bg-[#0D1322] border border-slate-800/90 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Image className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    1. {siteConfig.infographic.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  {siteConfig.infographic.description}
                </p>
              </div>

              <span className={`text-xs font-mono px-3 py-1 rounded-full border self-start sm:self-auto ${
                siteConfig.infographic.isReady && !imageError
                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800'
                  : 'bg-amber-950/40 text-amber-300 border-amber-800/60'
              }`}>
                {siteConfig.infographic.isReady && !imageError ? 'Recurso Publicado' : 'Espacio Preparado'}
              </span>
            </div>

            {/* Container for the Infographic Image or Placeholder */}
            <div className="w-full min-h-[380px] rounded-xl border border-dashed border-slate-700/80 bg-[#080C14] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group">
              {siteConfig.infographic.isReady && !imageError ? (
                <img
                  src={siteConfig.infographic.imagePath}
                  alt="Infografía DevGuard AI"
                  className="max-h-[600px] w-auto object-contain rounded-lg shadow-2xl"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="max-w-md space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto text-amber-400 group-hover:scale-110 transition-transform">
                    <Image className="w-8 h-8" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-lg font-bold text-slate-100">
                      Infografía en preparación
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Este contenedor visual está reservado para incorporar la infografía del proyecto generada con ChatGPT.
                    </p>
                  </div>
                  
                  {/* Instructions snippet */}
                  <div className="p-3 rounded-lg bg-[#0E1524] border border-slate-800 text-[11px] font-mono text-left space-y-1 text-slate-300">
                    <p className="text-slate-400">// Cómo incorporar la imagen posteriormente:</p>
                    <p className="text-emerald-400">1. Guardar archivo en: <span className="text-white">landing/public/assets/infografia-devguard.png</span></p>
                    <p className="text-emerald-400">2. Activar en <span className="text-white">src/config/siteConfig.ts</span>: <span className="text-amber-300">isReady: true</span></p>
                  </div>
                </div>
              )}
            </div>
          </div>


          {/* ======================================================== */}
          {/* ESPACIO 2: VIDEO DEMOSTRATIVO (PROPORCIÓN 16:9)          */}
          {/* ======================================================== */}
          <div className="rounded-2xl bg-[#0D1322] border border-slate-800/90 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Video className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    2. {siteConfig.videoDemo.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  {siteConfig.videoDemo.description}
                </p>
              </div>

              <span className={`text-xs font-mono px-3 py-1 rounded-full border self-start sm:self-auto ${
                siteConfig.videoDemo.isReady && !videoError
                  ? 'bg-cyan-950/60 text-cyan-400 border-cyan-800'
                  : 'bg-amber-950/40 text-amber-300 border-amber-800/60'
              }`}>
                {siteConfig.videoDemo.isReady && !videoError ? 'Video Disponible' : 'Espacio 16:9 Preparado'}
              </span>
            </div>

            {/* Strict 16:9 Container for the Video */}
            <div className="w-full aspect-video rounded-xl border border-dashed border-slate-700/80 bg-[#080C14] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group">
              {siteConfig.videoDemo.isReady && !videoError ? (
                siteConfig.videoDemo.isExternalUrl ? (
                  <iframe
                    src={siteConfig.videoDemo.videoPath}
                    title="Video Demostrativo DevGuard AI"
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    controls
                    className="w-full h-full rounded-lg object-cover"
                    onError={() => setVideoError(true)}
                  >
                    <source src={siteConfig.videoDemo.videoPath} type="video/mp4" />
                    Tu navegador no soporta reproducción de video HTML5.
                  </video>
                )
              ) : (
                <div className="max-w-md space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto text-cyan-400 group-hover:scale-110 transition-transform">
                    <Video className="w-8 h-8" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-lg font-bold text-slate-100">
                      Demostración en preparación
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Contenedor con relación de aspecto 16:9 configurado para incorporar el video generado con Google Flow.
                    </p>
                  </div>

                  {/* Instructions snippet */}
                  <div className="p-3 rounded-lg bg-[#0E1524] border border-slate-800 text-[11px] font-mono text-left space-y-1 text-slate-300">
                    <p className="text-slate-400">// Cómo incorporar el video posteriormente:</p>
                    <p className="text-cyan-400">1. Guardar en: <span className="text-white">landing/public/assets/video-demo.mp4</span> (o URL externa)</p>
                    <p className="text-cyan-400">2. Activar en <span className="text-white">src/config/siteConfig.ts</span>: <span className="text-amber-300">isReady: true</span></p>
                  </div>
                </div>
              )}
            </div>
          </div>


          {/* ======================================================== */}
          {/* ESPACIO 3: DOCUMENTACIÓN Y SKILL                         */}
          {/* ======================================================== */}
          <div className="rounded-2xl bg-[#0D1322] border border-slate-800/90 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    3. Documentación Técnica, Skill & Repositorio
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  Acceso directo a las especificaciones de arquitectura, manual de pruebas, código fuente de la Skill y configuración de GitHub.
                </p>
              </div>

              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800 self-start sm:self-auto">
                Estructura Completa
              </span>
            </div>

            {/* Grid of Documentation & Repositories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* Document 1: Skill Core */}
              <div className="p-5 rounded-xl bg-[#080C14] border border-slate-800 hover:border-emerald-500/40 transition flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Terminal className="w-5 h-5 text-emerald-400" />
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">Agent Skill</span>
                  </div>
                  <h4 className="font-bold text-sm text-white">DevGuard SKILL.md</h4>
                  <p className="text-xs text-slate-400">Instrucción principal, reglas de no alucinación y prompts de auditoría.</p>
                </div>
                <div className="pt-4 mt-3 border-t border-slate-800/70 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500 truncate">{siteConfig.documentation.skillPath}</span>
                  <button
                    onClick={() => handleCopyPath(siteConfig.documentation.skillPath, 'skill')}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="Copiar ruta"
                  >
                    {copiedDoc === 'skill' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Document 2: Architecture */}
              <div className="p-5 rounded-xl bg-[#080C14] border border-slate-800 hover:border-cyan-500/40 transition flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">Arquitectura</span>
                  </div>
                  <h4 className="font-bold text-sm text-white">ARCHITECTURE.md</h4>
                  <p className="text-xs text-slate-400">Diseño técnico, flujo de tokens, Progressive Disclosure y componentes.</p>
                </div>
                <div className="pt-4 mt-3 border-t border-slate-800/70 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500 truncate">{siteConfig.documentation.architecturePath}</span>
                  <button
                    onClick={() => handleCopyPath(siteConfig.documentation.architecturePath, 'arch')}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="Copiar ruta"
                  >
                    {copiedDoc === 'arch' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Document 3: Testing & Deliverables */}
              <div className="p-5 rounded-xl bg-[#080C14] border border-slate-800 hover:border-amber-500/40 transition flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <CheckCircle2 className="w-5 h-5 text-amber-400" />
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">Validación</span>
                  </div>
                  <h4 className="font-bold text-sm text-white">TESTING.md & Entregables</h4>
                  <p className="text-xs text-slate-400">Protocolo de pruebas, verificación empírica y catálogo de entregables.</p>
                </div>
                <div className="pt-4 mt-3 border-t border-slate-800/70 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500 truncate">{siteConfig.documentation.testingPath}</span>
                  <button
                    onClick={() => handleCopyPath(siteConfig.documentation.testingPath, 'test')}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="Copiar ruta"
                  >
                    {copiedDoc === 'test' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

            </div>

            {/* GitHub Repository Status & Configuration Card */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-[#090D15] via-[#0E1524] to-[#090D15] border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center flex-shrink-0 text-white">
                  <Github className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white">Repositorio Oficial en GitHub</h4>
                    {siteConfig.hasPublicRepo ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                        Público
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                        Listo para publicar
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 max-w-xl">
                    {siteConfig.hasPublicRepo
                      ? 'Accede al código fuente completo, historial de commits e instrucciones de clonación.'
                      : 'El repositorio local está preparado con .gitignore estricto y estructura limpia. Configura la URL en landing/src/config/siteConfig.ts tras crearlo en GitHub.'}
                  </p>
                </div>
              </div>

              {siteConfig.hasPublicRepo ? (
                <a
                  href={siteConfig.githubRepoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition flex-shrink-0"
                >
                  <Github className="w-4 h-4" />
                  <span>Ver en GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-2 flex-shrink-0 w-full md:w-auto">
                  <code className="text-[11px] font-mono px-3 py-2 rounded-lg bg-black/60 border border-slate-800 text-slate-300">
                    git remote add origin &lt;URL&gt;
                  </code>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
