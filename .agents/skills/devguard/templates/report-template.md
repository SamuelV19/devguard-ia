# DevGuard AI — Plantilla Oficial de Informe Técnico de Auditoría

```markdown
# Informe de Auditoría Técnica — DevGuard AI

**Proyecto / Componente:** [Nombre del proyecto o módulo]
**Archivo(s) Analizado(s):** `[ruta/al/archivo.ext]`
**Lenguaje & Tecnologías:** [ej. TypeScript, Node.js 22, Express, PostgreSQL]
**Fecha de Evaluación:** [YYYY-MM-DD]
**Auditor Asistente:** DevGuard AI (Agent Skill)
**Estado de Validación:** Pendiente de revisión y ejecución humana

---

## 1. Resumen Ejecutivo

### 1.1 Evaluación General
[Párrafo conciso resumiendo el estado del código auditado, su arquitectura general y el nivel de madurez observado.]

### 1.2 Métricas de Hallazgos
- 🔴 **Críticos:** [N]
- 🟠 **Altos:** [N]
- 🟡 **Medios:** [N]
- 🔵 **Bajos:** [N]
- ⚪ **Informativos:** [N]

### 1.3 Fortalezas Identificadas
- [Buena práctica identificada 1, ej. uso de async/await consistente]
- [Buena práctica identificada 2, ej. separación clara de capas]

---

## 2. Matriz Consolidada de Hallazgos

| ID | Categoría | Descripción Breve | Severidad | Certidumbre | Archivo / Líneas |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **DG-01** | Seguridad | [Vulnerabilidad identificada] | [Crítico / Alto / Medio / Bajo] | [Confirmado / Riesgo Potencial] | `archivo.ts#L10-L15` |
| **DG-02** | Calidad | [Defecto de mantenibilidad o lógica] | [Medio / Bajo / Info] | [Confirmado / Riesgo Potencial] | `archivo.ts#L34-L42` |

---

## 3. Desglose Detallado de Hallazgos

### [DG-01] [Título Descriptivo del Hallazgo]
- **Categoría:** [Seguridad (OWASP / CWE) / Calidad / Robustez / Rendimiento]
- **Severidad:** [CRÍTICO / ALTO / MEDIO / BAJO / INFORMATIVO]
- **Certidumbre:** [Confirmado / Riesgo Potencial / Heurística]

#### Evidencia de Código
```[lenguaje]
// Ubicación: [ruta/archivo.ext], Líneas: [Lxx-Lyy]
[código exacto extraído]
```

#### Impacto Técnico
[Explicación clara del riesgo: vector de ataque, fuga de datos, denegación de servicio o degradación de mantenimiento.]

#### Propuesta de Solución Justificada
```diff
- [código anterior]
+ [código corregido]
```
*Justificación técnica:* [Por qué este cambio resuelve el defecto y qué beneficios aporta sin introducir efectos secundarios.]

#### Nota de Incertidumbre y Posibles Falsos Positivos
[Si el riesgo depende de un middleware previo, configuración externa de base de datos o sanitización aguas arriba, documentar aquí la verificación manual recomendada.]

---

## 4. Batería de Pruebas Recomendada

| ID Prueba | Tipo | Precondición / Entrada | Acción | Resultado Esperado | Justificación |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TEST-01** | Seguridad | [Payload o token] | [Invocación] | [Código HTTP / Excepción] | [Mitigación de riesgo DG-01] |
| **TEST-02** | Límites | [Dato de frontera] | [Invocación] | [Respuesta esperada] | [Mitigación de riesgo DG-02] |

---

## 5. Plan de Acción Priorizado

1. **Inmediato (Hotfix crítico)**:
   - [ ] [Acción 1 prioritaria antes de desplegar]
2. **Medio Plazo (Siguiente Sprint)**:
   - [ ] [Refactorización o cobertura de pruebas]
3. **Mantenimiento Continuo**:
   - [ ] [Automatización en CI/CD, linters o escaneo SCA]

---

## 6. Declaración de Validación Humana y Responsabilidad

> [!CAUTION]
> **Aviso de Responsabilidad Técnica**:
> Este informe fue generado con la asistencia analítica de DevGuard AI. Las herramientas de inteligencia artificial son un soporte para la detección temprana de anomalías, pero **no reemplazan el juicio crítico de un ingeniero de software**.
>
> **Antes de aplicar cualquier cambio en entornos de producción, el equipo debe:**
> 1. Revisar manualmente cada propuesta de código y sus posibles efectos secundarios.
> 2. Implementar y ejecutar la batería de pruebas en entornos de integración (staging).
> 3. Verificar que las dependencias y configuraciones de infraestructura sean compatibles.
```
