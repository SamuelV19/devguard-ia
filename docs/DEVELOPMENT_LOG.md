# Bitácora de Desarrollo de Ingeniería — DevGuard AI (Development Log)

Este registro documenta las decisiones técnicas, problemas encontrados, resoluciones aplicadas y verificaciones realizadas durante la construcción de DevGuard AI.

---

## Entrada 1: Inspección de Entorno y Definición de Alcance Estricto
- **Fecha & Hora**: 2026-10-15T14:06:00-05:00
- **Contexto**:
  - Directorio de trabajo: `/home/samuel/Proyectos/devguard-ai`.
  - Entorno de desarrollo: Linux, Node.js v22.16.0, npm v10.9.2, Git v2.43.0.
  - Herramientas CLI detectadas: `gemini` (0.64.0) y `agy` (1.3.6).
- **Decisiones Técnicas**:
  1. Mantener un alcance estricto: implementar exclusivamente la Skill, la Landing page, la documentación técnica y los archivos de organización y publicación.
  2. Exclusión expresa de la creación de infografía final y video final (dejando en su lugar los espacios visuales y placeholders correspondientes).
  3. No incorporar Google Colab ni funciones fuera de los requisitos académicos.

---

## Entrada 2: Diseño y Estructuración de la Agent Skill DevGuard
- **Fecha & Hora**: 2026-10-15T14:09:00-05:00
- **Acciones Realizadas**:
  - Creación de `.agents/skills/devguard/SKILL.md` con metadatos válidos YAML (`name: devguard`).
  - Definición del flujo en 5 fases: Contexto & Stack ➔ Análisis Multi-Vector ➔ Calibración & Evidencia ➔ Propuestas & Tests ➔ Informe Estructurado.
  - Redacción de guías de referencia modulares para aplicar **Progressive Disclosure**:
    - `references/security-checklist.md`: Mapeo OWASP Top 10 y CWEs comunes con ejemplos y mitigaciones.
    - `references/code-quality-checklist.md`: Principios SOLID, gestión segura de errores y detección de code smells.
    - `references/testing-guide.md`: Pirámide de pruebas, patrón AAA y diseño de casos adversarios.
  - Diseño de `templates/report-template.md`: Plantilla formal de reporte técnico con matriz de severidad y diffs.
  - Creación de banco de ejemplos didácticos:
    - `examples/vulnerable-auth-endpoint.ts`: Endpoint con SQLi, IDOR, hashing MD5 y fuga de trazas.
    - `examples/vulnerable-auth-report.md`: Reporte de auditoría generado por DevGuard AI.
    - `examples/fixed-auth-endpoint.ts`: Código refactorizado y robustecido con Zod y bcrypt.

---

## Entrada 3: Integración y Sincronización con Gemini CLI
- **Fecha & Hora**: 2026-10-15T14:12:00-05:00
- **Desafío**: Soportar tanto Antigravity como Gemini CLI sin mantener copias divergentes de las instrucciones.
- **Solución Aplicada**:
  - Se configuró `.gemini/skills/devguard` como un enlace simbólico relativo hacia `../../.agents/skills/devguard`.
  - Se ejecutó `gemini skills list --all`, confirmando el descubrimiento exitoso de `devguard` con estado `Enabled` en su ruta canónica.

---

## Entrada 4: Desarrollo de la Landing Page en `landing/`
- **Fecha & Hora**: 2026-10-15T14:14:00-05:00
- **Decisiones de Arquitectura Web**:
  - Framework: React 18 con TypeScript y Vite 6.
  - Estilos: Tailwind CSS con paleta dark mode personalizada (`#0A0D14`, bordes pizarra `#1E293B`, acentos esmeralda y cian).
  - Componentes modulares independientes para las 10 secciones requeridas (A - J):
    - `HeroSection.tsx`, `ProblemSection.tsx`, `SolutionSection.tsx`, `FeaturesSection.tsx`, `HowItWorksSection.tsx`, `DemoSection.tsx`, `ArchitectureSection.tsx`, `ResourcesSection.tsx`, `LimitationsSection.tsx`, `Footer.tsx`.
- **Desafío Técnico Encontrado**:
  - Al ejecutar `npm run build`, TypeScript reportó 15 errores del linter (`TS6133: is declared but its value is never read`) debido a la bandera `noUnusedLocals: true` en `tsconfig.json`.
- **Solución Aplicada**:
  - Se sanearon los imports de iconos no utilizados en cada uno de los componentes.
  - Se volvió a compilar con `npm run build`, logrando una compilación 100% limpia (`✓ built in 2.25s`).

---

## Entrada 5: Configuración Centralizada de Recursos y Placeholders
- **Fecha & Hora**: 2026-10-15T14:24:00-05:00
- **Acciones Realizadas**:
  - Creación de `landing/src/config/siteConfig.ts` para centralizar:
    - `infographic.isReady`: Permite conmutar fácilmente entre el placeholder y la imagen final.
    - `videoDemo.isReady`: Permite conmutar entre el placeholder 16:9 y el video final (local o embed).
    - `githubRepoUrl` y `hasPublicRepo`: Permite asociar el repositorio público una vez publicado.
  - Creación del directorio reservado `landing/public/assets/.gitkeep`.

---

## Entrada 6: Documentación Técnica de Cierre y Verificación
- **Fecha & Hora**: 2026-10-15T14:26:00-05:00
- **Acciones Realizadas**:
  - Elaboración del `README.md` exhaustivo en la raíz del proyecto.
  - Redacción de `docs/ARCHITECTURE.md`, `docs/TESTING.md`, `docs/DEVELOPMENT_LOG.md` y `docs/DELIVERABLES.md`.
  - Configuración del `.gitignore` integral para prevenir fugas de credenciales y descartar carpetas `dist/` y `node_modules/`.
