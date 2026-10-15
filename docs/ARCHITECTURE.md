# Arquitectura del Sistema — DevGuard AI

Este documento detalla el diseño de software, el modelo de componentes, el flujo de datos y las decisiones arquitectónicas que sustentan tanto la **Agent Skill** como la **Landing Page** de DevGuard AI.

---

## 1. Visión General del Sistema

DevGuard AI opera bajo un modelo desacoplado compuesto por dos subsistemas complementarios:

```
+-----------------------------------------------------------------------------------+
|                                  DEVGUARD AI                                      |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|   +------------------------------------+    +---------------------------------+   |
|   |       AGENT SKILL SUBSYSTEM        |    |       LANDING SUBSYSTEM         |   |
|   |    (Antigravity & Gemini CLI)      |    |  (React + TypeScript + Vite)    |   |
|   +------------------------------------+    +---------------------------------+   |
|   | • SKILL.md (Core Orchestrator)     |    | • Hero, Problem & Solution      |   |
|   | • references/ (Checklists & Guides)|    | • Interactive Code Demo & Diffs |   |
|   | • templates/ (Standard Reports)    |    | • Visual Pipeline & Flow        |   |
|   | • examples/ (Benchmarks & Cases)   |    | • Multimedia Placeholders (16:9)|   |
|   | • Progressive Disclosure Engine    |    | • Centralized siteConfig.ts     |   |
|   +------------------------------------+    +---------------------------------+   |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

---

## 2. Arquitectura de la Agent Skill

### 2.1 Estándar de Descubrimiento de Skills
La Skill se implementa respetando la especificación formal de Agent Skills de Antigravity y Gemini CLI:
- **Ubicación Canónica**: `.agents/skills/devguard/SKILL.md`
- **Ubicación de Compatibilidad**: `.gemini/skills/devguard/` (enlace simbólico relativo hacia `.agents/skills/devguard`)
- **Metadatos YAML**:
  ```yaml
  ---
  name: devguard
  description: Auditoría técnica de código fuente, análisis de calidad de software...
  ---
  ```

### 2.2 Principio de Progressive Disclosure y Economía de Tokens
El contexto de un Modelo de Lenguaje (LLM) es un recurso compartido y valioso. Cargar cientos de líneas de listas de comprobación de seguridad en cada turno saturaría la memoria del agente. Por ello, DevGuard implementa **Progressive Disclosure**:

1. **Fase de Descubrimiento**: El agente solo recibe en su prompt inicial el nombre (`devguard`) y la descripción resumida del archivo `SKILL.md`.
2. **Fase de Activación**: Cuando el usuario solicita auditar código, el cuerpo principal de `SKILL.md` se inyecta en el contexto.
3. **Fase de Consulta Especializada**: Los archivos voluminosos dentro de `references/` solo son consultados según la necesidad del análisis:
   - Si se detecta interacción con base de datos o autenticación, se lee `references/security-checklist.md`.
   - Si se analiza arquitectura de clases o acoplamiento, se lee `references/code-quality-checklist.md`.
   - Al diseñar la suite de pruebas, se lee `references/testing-guide.md`.

```
[Prompt de Usuario] 
        │
        ▼ (Activación por descripción)
[SKILL.md en contexto]
   ├─── ¿Auditoría de Inyecciones/Auth? ────► Lee references/security-checklist.md
   ├─── ¿Refactorización / Code Smells? ────► Lee references/code-quality-checklist.md
   └─── ¿Diseño de Tests? ──────────────────► Lee references/testing-guide.md
        │
        ▼ (Formateo según templates/report-template.md)
[Informe Técnico Estructurado con Diffs y Pruebas AAA]
```

### 2.3 Matriz de Calibración de Severidad
La Skill estandariza los hallazgos en cinco niveles bien definidos:
- **CRÍTICO**: RCE, SQLi directo, bypass de autenticación, fuga de claves maestras.
- **ALTO**: IDOR en recursos de otros usuarios, SSRF, denegación de servicio lógica.
- **MEDIO**: Exposición de stacktraces al cliente, JWT sin expiración, fallos de rate-limiting.
- **BAJO**: Omisión de validaciones de esquema estricto, redundancias de código.
- **INFORMATIVO**: Oportunidades de refactorización limpia, documentación de funciones.

---

## 3. Arquitectura de la Landing Page

### 3.1 Stack de Tecnologías
- **Core**: React 18 con TypeScript en modo estricto (`strict: true`, `noUnusedLocals: true`).
- **Empaquetador**: Vite 6 con transpilación nativa y Hot Module Replacement (HMR).
- **Estilos**: Tailwind CSS 3 con paleta personalizada oscura (`#0A0D14`), bordes de baja luminosidad y acentos en verde esmeralda (`#10B981`) y cian (`#06B6D4`).
- **Iconografía**: Lucide React (iconos SVG optimizados y sin dependencias pesadas).

### 3.2 Jerarquía de Componentes
```text
App.tsx
├── Navbar.tsx (Navegación sticky, enlaces con anclas, menú responsive móvil)
├── HeroSection.tsx (Sección A: Propuesta de valor, comando rápido y preview visual)
├── ProblemSection.tsx (Sección B: Tarjetas con vectores de fricción y puntos ciegos)
├── SolutionSection.tsx (Sección C: Pilares Human-in-the-Loop y asistencia)
├── FeaturesSection.tsx (Sección D: Cuatro pilares de auditoría técnica)
├── HowItWorksSection.tsx (Sección E: Pipeline de 5 fases de ejecución)
├── DemoSection.tsx (Sección F: Tabbed code viewer con código original, informe y fix)
├── ArchitectureSection.tsx (Sección G: Diagrama de directorios y componentes)
├── ResourcesSection.tsx (Sección H: 3 espacios: Infografía, Video 16:9 y Docs/Repo)
├── LimitationsSection.tsx (Sección I: Declaración de límites y responsabilidad humana)
└── Footer.tsx (Sección J: Créditos académicos, tecnologías y licencia)
```

### 3.3 Gestión Centralizada de Recursos (`siteConfig.ts`)
Para evitar que los enlaces o recursos multimedia queden dispersos por el código, toda la configuración reside en `landing/src/config/siteConfig.ts`. Esto permite a cualquier colaborador:
- Actualizar la URL de GitHub con un solo cambio.
- Cambiar el estado de los placeholders de infografía o video activando `isReady: true`.
- Conmutar entre reproducción de archivo local MP4 o video embed de YouTube/Google Flow.
