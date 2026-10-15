# DevGuard AI — Asistente de Auditoría, Calidad y Seguridad de Código

> **Agent Skill & Plataforma Web para el Análisis Técnico Asistido de Software con Enfoque Human-in-the-Loop.**

DevGuard AI es una **Agent Skill** diseñada para potenciar a ingenieros de software, auditores y equipos de desarrollo durante la revisión de código fuente. Permite detectar vulnerabilidades críticas de seguridad (OWASP Top 10, CWE), evaluar la mantenibilidad y calidad arquitectónica (SOLID, code smells), estructurar baterías de pruebas automatizadas y generar informes técnicos reproducibles con propuestas de solución (*diffs*).

---

## 1. Objetivo del Proyecto

El objetivo principal de DevGuard AI es **asistir al desarrollador**, actuando como un segundo par de ojos analítico, riguroso y sistemático.

> [!IMPORTANT]
> **Principio Human-in-the-Loop**: DevGuard AI no sustituye el juicio crítico del ingeniero ni garantiza que un sistema sea infalible o invulnerable. Todo hallazgo debe contar con evidencia textual concreta en el código analizado, distinguir entre defectos confirmados y riesgos potenciales condicionales, advertir sobre posibles falsos positivos y someterse a validación humana antes de cualquier despliegue.

---

## 2. Características Principales de la Skill

- **Comprensión Contextual y Detección de Stack**: Mapeo automático de lenguaje (TypeScript, Python, Go, Java, etc.), frameworks, librerías y fronteras de confianza (*trust boundaries*).
- **Auditoría de Seguridad Especializada**: Cotejo contra vectores OWASP Top 10 y CWE (inyecciones SQL/NoSQL/Comando, Broken Access Control / IDOR, fallos criptográficos, fugas de secretos y exposición de trazas).
- **Evaluación de Calidad y Mantenibilidad**: Análisis de principios SOLID, complejidad ciclomática, manejo seguro de excepciones (*guard clauses*, anti-patrones de omisión) y deuda técnica.
- **Diseño de Baterías de Pruebas (AAA)**: Propuesta de pruebas unitarias, de integración, validación de fronteras (*boundary testing*) y casos adversarios con payloads de estrés.
- **Informes Técnicos Estandarizados**: Matriz calibrada de severidad (Crítico, Alto, Medio, Bajo, Info), certidumbre del hallazgo, código diff justificado y plan de acción priorizado.
- **Filosofía Cero Alucinación**: Prohibición explícita de inventar vulnerabilidades, librerías, archivos o resultados de tests que no existan en el contexto auditado.

---

## 3. Estructura del Repositorio

```text
devguard-ai/
├── .agents/
│   └── skills/
│       └── devguard/
│           ├── SKILL.md                          # Instrucción canónica principal de la Skill
│           ├── references/                       # Referencias modulares (Progressive Disclosure)
│           │   ├── security-checklist.md         # Guía de vectores OWASP Top 10 y CWE
│           │   ├── code-quality-checklist.md     # Guía de principios SOLID y calidad
│           │   └── testing-guide.md              # Guía de diseño de pruebas AAA
│           ├── templates/
│           │   └── report-template.md            # Plantilla estándar de informe técnico
│           └── examples/
│               ├── vulnerable-auth-endpoint.ts   # Caso práctico vulnerable demostrativo
│               ├── vulnerable-auth-report.md     # Informe de auditoría generado por la Skill
│               └── fixed-auth-endpoint.ts        # Solución refactorizada y robustecida
├── .gemini/
│   └── skills/
│       └── devguard -> ../../.agents/skills/devguard # Enlace simbólico de compatibilidad Gemini CLI
├── docs/
│   ├── ARCHITECTURE.md                           # Especificación de arquitectura y flujo de tokens
│   ├── TESTING.md                                # Protocolo de pruebas y verificación empírica
│   ├── DEVELOPMENT_LOG.md                        # Bitácora cronológica de ingeniería y decisiones
│   └── DELIVERABLES.md                           # Inventario de entregables y verificación de alcance
├── landing/                                      # Landing page profesional (React + TS + Vite + Tailwind)
│   ├── public/
│   │   ├── assets/                               # Espacio reservado para infografía y video
│   │   └── shield.svg
│   ├── src/
│   │   ├── config/
│   │   │   └── siteConfig.ts                     # Configuración central de URLs y recursos
│   │   ├── components/                           # Componentes modulares (Secciones A - J)
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
├── .gitignore                                    # Exclusión de temporales, builds y secretos
└── README.md                                     # Documentación principal del proyecto
```

---

## 4. Instalación y Uso de la Skill

### Entorno Principal: Antigravity CLI / IDE
Antigravity descubre de forma nativa las Agent Skills ubicadas en `.agents/skills/` en la raíz del espacio de trabajo.

1. Abre el workspace en Antigravity:
   ```bash
   cd /home/samuel/Proyectos/devguard-ai
   ```
2. La Skill `devguard` se encuentra automáticamente disponible gracias a sus metadatos en [`.agents/skills/devguard/SKILL.md`](.agents/skills/devguard/SKILL.md).

### Compatibilidad: Gemini CLI
El proyecto incorpora un enlace simbólico relativo en `.gemini/skills/devguard` hacia `.agents/skills/devguard`:
- **Versión Principal / Canónica**: `.agents/skills/devguard/SKILL.md`.
- **Mecanismo de Sincronización**: Al ser un symlink directo (`ln -sfn ../../.agents/skills/devguard .gemini/skills/devguard`), no existe divergencia de versiones. Cualquier actualización impacta simultáneamente en ambos entornos.
- **Verificación**: Ejecuta en terminal:
  ```bash
  gemini skills list --all
  ```
  Observarás `devguard [Enabled]` descubierto correctamente.

### Cómo Invocar la Skill

#### Invocación Interactiva
Puedes solicitar revisiones técnicas en lenguaje natural directamente en el chat del agente:
> *"Actúa con la Skill DevGuard AI y audita el archivo `examples/vulnerable-auth-endpoint.ts` identificando riesgos de seguridad e inyecciones."*

#### Invocación por Línea de Comandos (Headless)
Con Antigravity CLI (`agy`):
```bash
agy --agent devguard "Audita este módulo de autenticación y genera el informe técnico"
```
Con Gemini CLI (`gemini`):
```bash
gemini -p "Aplica la skill devguard para auditar el archivo src/auth/login.ts"
```

---

## 5. Ejemplos Prácticos Incluidos

El directorio [`.agents/skills/devguard/examples/`](.agents/skills/devguard/examples/) contiene un caso de estudio real completo:
- [**`vulnerable-auth-endpoint.ts`**](.agents/skills/devguard/examples/vulnerable-auth-endpoint.ts): Endpoint Express con SQL Injection, IDOR en perfil, hashing MD5, secretos hardcodeados y fuga de trazas internas.
- [**`vulnerable-auth-report.md`**](.agents/skills/devguard/examples/vulnerable-auth-report.md): Informe generado por DevGuard AI con matriz de severidad, evidencia de líneas, diffs explicados y pruebas AAA.
- [**`fixed-auth-endpoint.ts`**](.agents/skills/devguard/examples/fixed-auth-endpoint.ts): Código refactorizado y asegurado con esquemas Zod, consultas parametrizadas, bcrypt y autorización granular.

---

## 6. Cómo Ejecutar la Landing Page

La landing page está desarrollada con **React 18**, **TypeScript**, **Vite** y **Tailwind CSS**.

### Requisitos Previos
- Node.js v18+ (probado exitosamente en Node.js v22.16.0)
- npm v9+

### Pasos de Ejecución
1. Navega al directorio de la landing:
   ```bash
   cd landing
   ```
2. Instala dependencias (si no se han instalado):
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo local:
   ```bash
   npm run dev
   ```
   Abre en tu navegador la URL indicada (usualmente `http://localhost:5173`).

4. Para compilar la versión de producción optimizada:
   ```bash
   npm run build
   ```
   Los archivos estáticos se generarán en `landing/dist/`. Para previsualizarlos:
   ```bash
   npm run preview
   ```

---

## 7. Tecnologías Utilizadas

- **Arquitectura de Agentes**: Antigravity Agent Skills Standard, Gemini CLI Skills.
- **Frontend & UI**: React 18, TypeScript, Tailwind CSS, Lucide Icons.
- **Build System**: Vite 6, PostCSS, Autoprefixer.
- **Estándares de Seguridad & Calidad**: OWASP Top 10, Common Weakness Enumeration (CWE), Principios SOLID, Patrón AAA para pruebas.

---

## 8. Limitaciones

- **Soporte Asistido**: DevGuard AI no emite garantías legales ni certificaciones de seguridad industrial.
- **Análisis de Entorno**: El análisis estático no reemplaza auditorías dinámicas (DAST), pruebas de penetración (*pentesting*) ni revisiones de arquitectura cloud perimetral.
- **Falsos Positivos**: Es posible que patrones legítimos o no convencionales sean señalados preventivamente. Se requiere validación empírica por parte de desarrolladores sénior.

---

## 9. Guía para Incorporar Recursos Multimedia Posteriores

Conforme a la definición de alcance, la infografía final (creada con ChatGPT) y el video final (creado con Google Flow) se incorporan manualmente siguiendo estos sencillos pasos:

### Cómo Incorporar la Infografía
1. Guarda la imagen generada en:
   ```text
   landing/public/assets/infografia-devguard.png
   ```
2. Abre el archivo de configuración [`landing/src/config/siteConfig.ts`](landing/src/config/siteConfig.ts).
3. Cambia la propiedad `isReady` a `true` dentro del bloque `infographic`:
   ```typescript
   infographic: {
     title: 'Infografía Técnica de DevGuard AI',
     description: '...',
     imagePath: '/assets/infografia-devguard.png',
     isReady: true, // <-- CAMBIAR A TRUE
   }
   ```
4. Recompila con `npm run build` o visualiza inmediatamente en `npm run dev`.

### Cómo Incorporar el Video Demostrativo
1. **Opción A (Archivo local)**:
   - Guarda el video MP4 en:
     ```text
     landing/public/assets/video-demo.mp4
     ```
   - En [`landing/src/config/siteConfig.ts`](landing/src/config/siteConfig.ts), configura `isReady: true` e `isExternalUrl: false`:
     ```typescript
     videoDemo: {
       ...
       videoPath: '/assets/video-demo.mp4',
       isExternalUrl: false,
       isReady: true, // <-- CAMBIAR A TRUE
     }
     ```
2. **Opción B (URL pública de YouTube / Google Flow)**:
   - En [`landing/src/config/siteConfig.ts`](landing/src/config/siteConfig.ts), asigna la URL del video embed y activa los flags:
     ```typescript
     videoDemo: {
       ...
       videoPath: 'https://www.youtube.com/embed/TU_VIDEO_ID',
       isExternalUrl: true,
       isReady: true,
     }
     ```

### Cómo Configurar el Enlace de GitHub
1. Abre [`landing/src/config/siteConfig.ts`](landing/src/config/siteConfig.ts).
2. Actualiza la variable `githubRepoUrl` con la URL de tu repositorio remoto:
   ```typescript
   githubRepoUrl: 'https://github.com/tu-usuario/devguard-ai',
   hasPublicRepo: true, // <-- CAMBIAR A TRUE PARA ACTIVAR ENLACES DIRECTOS
   ```

---

## 10. Créditos Académicos

- **Proyecto**: DevGuard AI — Asistente de Auditoría, Calidad y Seguridad de Código.
- **Área**: Inteligencia Artificial Aplicada a la Ingeniería de Software.
- **Licencia**: MIT License.
