# Guía de Pruebas y Validación — DevGuard AI

Este documento registra los protocolos de prueba, la verificación empírica realizada sobre los componentes del sistema y los resultados reales obtenidos.

---

## 1. Filosofía de Pruebas en DevGuard AI

En estricta concordancia con la filosofía del proyecto:
- **No se afirman pruebas que no hayan sido ejecutadas**.
- Todos los resultados consignados en este documento provienen de ejecuciones verificables en el entorno local.
- Las pruebas cubren tanto la infraestructura de la Agent Skill como la estabilidad de la Landing Page.

---

## 2. Batería de Pruebas Ejecutadas

### Prueba 1: Validación de Metadatos y Estructura de la Skill
- **Objetivo**: Comprobar que `.agents/skills/devguard/SKILL.md` contenga YAML frontmatter válido según la especificación de Agent Skills (`name`, `description`) y que todos los enlaces relativos apunten a archivos existentes.
- **Comando de Verificación**:
  ```bash
  head -n 10 .agents/skills/devguard/SKILL.md
  ls -la .agents/skills/devguard/references/
  ls -la .agents/skills/devguard/templates/
  ls -la .agents/skills/devguard/examples/
  ```
- **Resultado Obtenido**:
  - `name: devguard` (válido, minúsculas sin espacios).
  - `description` en tercera persona detallando el propósito y activación.
  - Archivos de referencia verificados:
    - `references/security-checklist.md` (6,400+ bytes)
    - `references/code-quality-checklist.md` (3,800+ bytes)
    - `references/testing-guide.md` (4,100+ bytes)
    - `templates/report-template.md` (3,200+ bytes)
    - `examples/vulnerable-auth-endpoint.ts` (2,700+ bytes)
    - `examples/vulnerable-auth-report.md` (5,800+ bytes)
    - `examples/fixed-auth-endpoint.ts` (3,900+ bytes)
  - **Estado**: ✅ **Aprobado**.

---

### Prueba 2: Descubrimiento de la Skill en Gemini CLI
- **Objetivo**: Verificar que la herramienta CLI instalada en el sistema descubra la Skill automáticamente a través de la estructura del proyecto y su enlace simbólico.
- **Comando de Verificación**:
  ```bash
  gemini skills list --all
  ```
- **Resultado Obtenido**:
  ```text
  Discovered Agent Skills:

  devguard [Enabled]
    Description: Auditoría técnica de código fuente, análisis de calidad de software...
    Location:    /home/samuel/Proyectos/devguard-ai/.agents/skills/devguard/SKILL.md
  ```
  - **Diagnóstico**: La Skill fue descubierta con estado `Enabled` tomando la ruta canónica `.agents/skills/devguard/SKILL.md`.
  - **Estado**: ✅ **Aprobado**.

---

### Prueba 3: Compilación Estricta de la Landing Page (TypeScript & Vite)
- **Objetivo**: Garantizar que el código fuente de la landing page compile sin errores de tipado, dependencias no resueltas o advertencias de empaquetado.
- **Comando de Verificación**:
  ```bash
  cd landing && npm run build
  ```
- **Resultado Obtenido**:
  ```text
  > devguard-landing@1.0.0 build
  > tsc && vite build

  vite v6.4.4 building for production...
  ✓ 1600 modules transformed.
  dist/index.html                   1.68 kB │ gzip:  0.85 kB
  dist/assets/index-CGNxrWOY.css   31.85 kB │ gzip:  6.22 kB
  dist/assets/index-CV2si0qt.js   227.11 kB │ gzip: 64.56 kB
  ✓ built in 2.25s
  ```
  - **Diagnóstico**: 0 errores de TypeScript (`tsc` pasó limpiamente tras sanear imports no utilizados), bundle de producción generado en `dist/` en 2.25 segundos con salida optimizada.
  - **Estado**: ✅ **Aprobado**.

---

### Prueba 4: Verificación de Espacios Multimedia (Placeholders)
- **Objetivo**: Verificar que los contenedores de la infografía y del video 16:9 muestren correctamente sus estados de preparación elegantes cuando los archivos no existen aún, sin romper la interfaz ni lanzar excepciones no controladas.
- **Comprobación**:
  - `landing/src/config/siteConfig.ts` configurado inicialmente con:
    - `infographic.isReady = false` -> El contenedor muestra la tarjeta con icono, texto "Infografía en preparación" e instrucciones para guardarla en `landing/public/assets/infografia-devguard.png`.
    - `videoDemo.isReady = false` -> El contenedor con clase `aspect-video` (16:9) muestra la tarjeta con texto "Demostración en preparación" e instrucciones para incorporarla en `landing/public/assets/video-demo.mp4`.
  - Carpeta `landing/public/assets/` creada y reservada con `.gitkeep`.
  - **Estado**: ✅ **Aprobado**.

---

### Prueba 5: Auditoría de Secretos y Limpieza de Git
- **Objetivo**: Confirmar que no existan credenciales, tokens API ni claves privadas rastreadas en el repositorio.
- **Comando de Verificación**:
  ```bash
  git status --ignored
  grep -rnw . -e "AIza" -e "sk-" -e "ghp_" --exclude-dir={node_modules,dist,.git} || echo "Sin secretos detectados"
  ```
- **Resultado Obtenido**: Sin secretos detectados. Archivo `.gitignore` configurado estrictamente.
- **Estado**: ✅ **Aprobado**.

---

## 3. Matriz de Casos de Prueba Recomendados para Suites de Usuario

Al utilizar DevGuard AI en proyectos clientes, la Skill genera casos de prueba en formato AAA. Para verificar su implementación, se recomienda seguir el siguiente esquema de aserciones:

| ID | Vector | Precondición | Prueba Automatizada | Criterio de Éxito |
| :--- | :--- | :--- | :--- | :--- |
| **TC-SEC-01** | SQL Injection | Parámetro `email` con payload SQL | Petición HTTP POST `/api/login` | Código 401 Unauthorized sin fuga de datos |
| **TC-SEC-02** | IDOR | Usuario U1 con token solicitando perfil de U2 | Petición HTTP GET `/api/users/U2/profile` | Código 403 Forbidden |
| **TC-VAL-01** | Schema Validation | Body con campo omitido o tipo numérico inválido | Petición HTTP POST con payload corrupto | Código 400 Bad Request con detalles Zod |
| **TC-ERR-01** | Error Sanitization | Error intencional de conexión a base de datos | Invocación de endpoint | Código 500 con mensaje genérico, sin stacktrace |
