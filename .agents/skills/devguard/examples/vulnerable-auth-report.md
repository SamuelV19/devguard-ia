# Informe de Auditoría Técnica — DevGuard AI

**Proyecto / Componente:** Módulo de Autenticación y Perfil de Usuario
**Archivo Analizado:** `.agents/skills/devguard/examples/vulnerable-auth-endpoint.ts`
**Lenguaje & Tecnologías:** TypeScript, Node.js 22, Express, PostgreSQL (`pg`), JSONWebToken
**Fecha de Evaluación:** 2026-10-15
**Auditor Asistente:** DevGuard AI (Agent Skill)
**Estado de Validación:** Ilustrativo / Demostrativo — Pendiente de revisión humana obligatoria

---

## 1. Resumen Ejecutivo

### 1.1 Evaluación General
El archivo analizado implementa endpoints HTTP para inicio de sesión y consulta de perfiles de usuario. Si bien la estructura básica utiliza TypeScript y librerías estándar del ecosistema Node.js, se identificaron **defectos críticos de seguridad** que permiten inyección SQL directa, acceso indebido a datos privados de otros usuarios (IDOR), exposición de datos sensibles y secretos embebidos en el código fuente.

### 1.2 Métricas de Hallazgos
- 🔴 **Críticos:** 2 (Inyección SQL, Secreto JWT Hardcodeado)
- 🟠 **Altos:** 2 (IDOR en Perfil, Hashing Débil MD5)
- 🟡 **Medios:** 2 (Fuga de Stacktrace en Error, Token sin Expiración)
- 🔵 **Bajos:** 1 (Falta de Validación de Esquema con Zod/Joi)
- ⚪ **Informativos:** 1 (Mensajes de autenticación asimétricos)

### 1.3 Fortalezas Identificadas
- Uso de `Pool` de PostgreSQL en lugar de abrir conexiones únicas por petición.
- Uso de TypeScript con tipos base de Express (`Request`, `Response`).
- Separación inicial de rutas HTTP.

---

## 2. Matriz Consolidada de Hallazgos

| ID | Categoría | Descripción Breve | Severidad | Certidumbre | Archivo / Líneas |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **DG-SEC-01** | Seguridad (A03) | Concatenación directa de strings en consulta SQL (SQLi) | **CRÍTICO** | Confirmado | `vulnerable-auth-endpoint.ts#L27-L28` |
| **DG-SEC-02** | Seguridad (A02) | Secreto de firma JWT hardcodeado en el código fuente | **CRÍTICO** | Confirmado | `vulnerable-auth-endpoint.ts#L16` |
| **DG-SEC-03** | Seguridad (A01) | Broken Access Control / IDOR en consulta de perfil | **ALTO** | Confirmado | `vulnerable-auth-endpoint.ts#L59-L65` |
| **DG-SEC-04** | Seguridad (A02) | Algoritmo de hashing no apto para contraseñas (MD5) | **ALTO** | Confirmado | `vulnerable-auth-endpoint.ts#L24` |
| **DG-SEC-05** | Seguridad (A05) | Exposición de trazas internas (stacktrace) al cliente | **MEDIO** | Confirmado | `vulnerable-auth-endpoint.ts#L43` |
| **DG-SEC-06** | Seguridad (A07) | Token JWT emitido sin tiempo de expiración (`exp`) | **MEDIO** | Confirmado | `vulnerable-auth-endpoint.ts#L38` |
| **DG-QUAL-01** | Calidad | Ausencia de validación declarativa de esquema en `req.body` | **BAJO** | Confirmado | `vulnerable-auth-endpoint.ts#L20` |

---

## 3. Desglose Detallado de Hallazgos

### [DG-SEC-01] Inyección SQL en Endpoint de Login
- **Categoría:** Seguridad — OWASP A03:2021 Injection / CWE-89
- **Severidad:** **CRÍTICO**
- **Certidumbre:** **Confirmado** (Evidente en el código analizado)

#### Evidencia de Código
```typescript
// Ubicación: vulnerable-auth-endpoint.ts, Líneas 27-28
const query = `SELECT id, email, role FROM users WHERE email = '${email}' AND password_hash = '${passwordHash}'`;
const result = await db.query(query);
```

#### Impacto Técnico
Un atacante puede suministrar un payload como `' OR '1'='1` en el campo `email`, alterando la lógica booleana del `WHERE` para autenticarse como el primer usuario de la base de datos (habitualmente un administrador), o ejecutar sentencias apiladas si el driver lo permite.

#### Propuesta de Solución Justificada
```diff
- const query = `SELECT id, email, role FROM users WHERE email = '${email}' AND password_hash = '${passwordHash}'`;
- const result = await db.query(query);
+ const query = 'SELECT id, email, role, password_hash FROM users WHERE email = $1';
+ const result = await db.query(query, [email.toLowerCase().trim()]);
```
*Justificación técnica:* Utilizar consultas parametrizadas delega la separación entre código SQL y datos en el motor de base de datos, neutralizando la inyección de forma determinista.

---

### [DG-SEC-02] Secreto Criptográfico Hardcodeado
- **Categoría:** Seguridad — OWASP A02:2021 Cryptographic Failures / CWE-798
- **Severidad:** **CRÍTICO**
- **Certidumbre:** **Confirmado**

#### Evidencia de Código
```typescript
// Ubicación: vulnerable-auth-endpoint.ts, Línea 16
const JWT_SECRET = 'clave-secreta-hardcodeada-12345';
```

#### Impacto Técnico
Cualquiera con acceso de lectura al repositorio puede falsificar tokens JWT con rol de administrador (`{ role: 'admin' }`) e impersonar a cualquier usuario del sistema.

#### Propuesta de Solución Justificada
```diff
- const JWT_SECRET = 'clave-secreta-hardcodeada-12345';
+ const JWT_SECRET = process.env.JWT_SECRET;
+ if (!JWT_SECRET || JWT_SECRET.length < 32) {
+   throw new Error('FATAL: JWT_SECRET no configurado o insuficientemente largo');
+ }
```

---

### [DG-SEC-03] Broken Access Control (IDOR) en Consulta de Perfil
- **Categoría:** Seguridad — OWASP A01:2021 Broken Access Control / CWE-639
- **Severidad:** **ALTO**
- **Certidumbre:** **Confirmado**

#### Evidencia de Código
```typescript
// Ubicación: vulnerable-auth-endpoint.ts, Líneas 60-65
const decoded: any = jwt.verify(token, JWT_SECRET);
const result = await db.query(`SELECT id, email, full_name, credit_card, address FROM users WHERE id = $1`, [userId]);
```

#### Impacto Técnico
Cualquier usuario autenticado puede solicitar el perfil de cualquier otro usuario simplemente alterando el parámetro `:userId` en la URL. Además, se expone información bancaria sensible (`credit_card`).

#### Propuesta de Solución Justificada
```diff
  const decoded: any = jwt.verify(token, JWT_SECRET);
+ if (decoded.id !== userId && decoded.role !== 'admin') {
+   return res.status(403).json({ error: 'Acceso denegado al perfil solicitado' });
+ }
- const result = await db.query(`SELECT id, email, full_name, credit_card, address FROM users WHERE id = $1`, [userId]);
+ const result = await db.query(`SELECT id, email, full_name, address FROM users WHERE id = $1`, [userId]);
```

---

## 4. Batería de Pruebas Recomendada

| ID Prueba | Tipo | Precondición / Entrada | Acción Ejecutada | Resultado Esperado | Justificación |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TEST-SEC-01** | Seguridad (SQLi) | Payload: `email: "admin@test.com' OR '1'='1"` | `POST /api/login` | HTTP 401 Unauthorized, sin inyección ni bypass | Validar que las sentencias preparadas neutralicen payloads maliciosos. |
| **TEST-SEC-02** | Seguridad (IDOR) | Usuario `id="user-1"`, consulta `:userId="user-2"` | `GET /api/users/user-2/profile` | HTTP 403 Forbidden | Impedir el acceso no autorizado a datos de otros usuarios. |
| **TEST-VAL-01** | Validación | Body: `{ email: "correo-invalido" }` sin password | `POST /api/login` | HTTP 400 Bad Request con detalles de validación | Asegurar que datos malformados sean rechazados antes de consultar BD. |
| **TEST-ERR-01** | Robustez | Simulación de caída de base de datos (`db.query` rechaza) | `POST /api/login` | HTTP 500 con `{ error: "Error interno del servidor" }` sin `stack` | Evitar filtración de información sobre rutas internas del servidor. |

---

## 5. Plan de Acción Priorizado

1. **Inmediato**:
   - Reemplazar la interpolación de cadenas en `db.query` por parámetros posicionales (`$1, $2`).
   - Extraer `JWT_SECRET` a variable de entorno validada en el arranque.
   - Restringir la consulta de perfil para que coincida con `decoded.id` o rol `admin`.
2. **Siguiente Sprint**:
   - Migrar el hashing de contraseñas de `crypto MD5` a `argon2` o `bcrypt`.
   - Implementar validación de esquemas con `zod`.
   - Eliminar campos bancarios en texto plano de las consultas de perfil.
3. **Mantenimiento**:
   - Configurar escaneo automatizado con herramientas SAST en CI/CD.

---

## 6. Declaración de Validación Humana y Responsabilidad

> [!IMPORTANT]
> **Aviso de Revisión y Alcance**:
> Este informe fue elaborado con el soporte asistencial de **DevGuard AI**. No constituye una certificación formal de seguridad ni garantiza la ausencia de otras vulnerabilidades no presentes en el extracto analizado.
>
> Todas las correcciones de código y casos de prueba sugeridos **deben ser revisados por el equipo de ingeniería**, compilados y sometidos a la suite de integración antes de ser promovidos a producción.
