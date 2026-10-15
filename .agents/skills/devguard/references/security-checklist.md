# DevGuard AI — Checklist de Auditoría de Seguridad (Security Checklist)

Esta guía de referencia reúne los vectores de ataque más comunes, patrones de código vulnerables y mitigaciones estándar para asistir en el análisis estático y dinámico de aplicaciones.

---

## 1. Mapeo OWASP Top 10 & CWE Principales

### A01: Broken Access Control (Control de Acceso Deficiente / IDOR)
- **CWEs asociados**: CWE-284 (Improper Access Control), CWE-639 (IDOR), CWE-862 (Missing Authorization).
- **Patrón Vulnerable**:
  - Confiar en identificadores suministrados por el cliente (`req.params.userId`, `orderId`) sin verificar que el usuario autenticado es el legítimo propietario o tiene permisos RBAC/ABAC sobre la entidad.
  - Endpoints administrativos o internos desprovistos de middleware de autorización.
  - Omisión de controles en métodos HTTP específicos (ej. autorizar GET pero olvidar validar POST/PUT/DELETE).
- **Puntos de Inspección**:
  - ¿Se coteja el `currentUser.id` con el propietario del recurso antes de mutarlo o retornarlo?
  - ¿Existe control granular a nivel de objeto o se asume que estar autenticado es suficiente?
- **Mitigación Recomendada**:
  - Aplicar autorización a nivel de consulta: `SELECT * FROM orders WHERE id = :orderId AND user_id = :currentUserId`.
  - Emplear políticas declarativas (ej. CASL, Oso, middleware de autorización verificado).

---

### A02: Cryptographic Failures (Fallos Criptográficos)
- **CWEs asociados**: CWE-259 (Hardcoded Password), CWE-327 (Broken Crypto Algorithm), CWE-328 (Reversible One-Way Hash), CWE-330 (Insufficiently Random Values).
- **Patrón Vulnerable**:
  - Uso de algoritmos obsoletos o rotos: MD5, SHA-1, DES, RC4.
  - Hashing de contraseñas con algoritmos rápidos de propósito general en lugar de algoritmos adaptativos (Argon2id, bcrypt, scrypt).
  - Secretos hardcodeados en el código fuente (API keys, llaves privadas JWT, tokens de base de datos).
  - Generación de tokens o identificadores de sesión con `Math.random()` o funciones pseudo-aleatorias no criptográficas.
- **Puntos de Inspección**:
  - ¿Los secretos provienen estrictamente de variables de entorno seguras (`process.env.JWT_SECRET`)?
  - ¿Se utiliza `crypto.randomBytes` o `crypto.getRandomValues` para tokens de restablecimiento o cookies de sesión?
- **Mitigación Recomendada**:
  - Utilizar `bcrypt` o `argon2` con coste calibrado para credenciales de usuario.
  - Almacenar secretos en gestores seguros (Vault, KMS, Secret Manager) y cargar vía variables de entorno.

---

### A03: Injection (Inyecciones: SQL, NoSQL, Comando, LDAP, XSS)
- **CWEs asociados**: CWE-89 (SQLi), CWE-943 (NoSQLi), CWE-78 (OS Command Injection), CWE-79 (XSS).
- **Patrón Vulnerable**:
  - Concatenación o interpolación de strings directos en consultas: `` `SELECT * FROM users WHERE email = '${email}'` ``.
  - Paso de objetos no saneados directamente a queries de MongoDB: `db.users.find({ email: req.body.email })` (donde `req.body.email` puede ser `{"$gt": ""}`).
  - Ejecución de comandos del sistema operativo interpolando cadenas del usuario (`exec(`ping ${host}`)`).
  - Renderizado de cadenas no escapadas en respuestas HTML (`res.send(`<h1>Hola ${name}</h1>`)` o `dangerouslySetInnerHTML`).
- **Puntos de Inspección**:
  - ¿Todas las consultas SQL utilizan sentencias preparadas con parámetros vinculados (`$1, $2` o `:param`)?
  - ¿Se utiliza `child_process.execFile` con argumentos en array en lugar de `child_process.exec` con shell?
- **Mitigación Recomendada**:
  - Consultas parametrizadas obligatorias o uso de ORMs con tipado seguro (Prisma, Drizzle, SQLAlchemy con parámetros).
  - Sanitización contextual de salida (escapar entidades HTML o delegar en frameworks reactivos que escapan por defecto).

---

### A04: Insecure Design (Diseño Inseguro)
- **CWEs asociados**: CWE-209 (Error Message Information Exposure), CWE-307 (Improper Restriction of Excessive Authentication Attempts), CWE-601 (Open Redirect).
- **Patrón Vulnerable**:
  - Ausencia de limitación de tasa (*rate limiting*) en endpoints sensibles (login, registro, recuperación de contraseña, pasarela de pagos).
  - Respuestas asimétricas que permiten enumeración de usuarios ("El usuario no existe" vs "Contraseña incorrecta").
  - Redirecciones abiertas (`res.redirect(req.query.returnUrl)`) sin validar contra lista blanca de dominios permitidos.
- **Puntos de Inspección**:
  - ¿Existe rate limiting en rutas de autenticación?
  - ¿Los mensajes de error son genéricos para credenciales inválidas?
- **Mitigación Recomendada**:
  - Integrar rate limiting por IP/usuario (ej. `express-rate-limit` con Redis store).
  - Respuestas neutrales ante fallos de autenticación.

---

### A05: Security Misconfiguration (Configuraciones Erróneas)
- **CWEs asociados**: CWE-16 (Configuration), CWE-1004 (Sensitive Cookie Without 'HttpOnly' Flag), CWE-614 (Sensitive Cookie Without 'Secure' Flag).
- **Patrón Vulnerable**:
  - Cabeceras de seguridad ausentes (Content-Security-Policy, X-Content-Type-Options, Strict-Transport-Security).
  - Cookies de sesión sin flags `HttpOnly`, `Secure` ni `SameSite=Strict/Lax`.
  - CORS configurado de manera permisiva: `Access-Control-Allow-Origin: *` combinado con credenciales activadas.
  - Servir páginas de error de depuración en entornos de producción (Django DEBUG=True, stacktraces completos de Node).
- **Puntos de Inspección**:
  - ¿Se utiliza `helmet` o configuración equivalente de cabeceras HTTP?
  - ¿El manejo de errores global oculta las trazas internas del sistema al cliente?
- **Mitigación Recomendada**:
  - Aplicar `helmet()` y configurar políticas de cookies seguras.
  - Asegurar que variables como `NODE_ENV=production` desactiven trazas detalladas en clientes.

---

### A06: Vulnerable and Outdated Components (Dependencias Inseguras)
- **CWEs asociados**: CWE-1104 (Use of Unmaintained Third-Party Components), CWE-1395 (Dependency on Vulnerable Third-Party Component).
- **Puntos de Inspección**:
  - ¿Se auditan periódicamente las dependencias con `npm audit`, `pip-audit` o herramientas SCA?
  - ¿Se fijan versiones con lockfiles (`package-lock.json`, `poetry.lock`)?
- **Mitigación Recomendada**:
  - Mantener dependencias actualizadas y automatizar escaneos en el pipeline de CI/CD.

---

### A07: Identification and Authentication Failures (Fallos de Autenticación)
- **CWEs asociados**: CWE-287 (Improper Authentication), CWE-384 (Session Fixation), CWE-613 (Insufficient Session Expiration).
- **Patrón Vulnerable**:
  - Permitir contraseñas débiles o sin longitud mínima razonable.
  - Tokens JWT sin tiempo de expiración (`exp`) o firmados con clave simétrica débil susceptible a fuerza bruta offline.
  - No invalidar tokens en el servidor (falta de lista de revocación o refresh tokens rotativos).
- **Mitigación Recomendada**:
  - Forzar expiración corta para access tokens (ej. 15 minutos) y manejar refresh tokens revocables en base de datos.
  - Validar firmas criptográficas y algoritmos explícitos (`algorithms: ['HS256']` o `'RS256'`).

---

### A08: Software and Data Integrity Failures (Fallos de Integridad)
- **CWEs asociados**: CWE-502 (Deserialization of Untrusted Data), CWE-494 (Download of Code Without Integrity Check).
- **Patrón Vulnerable**:
  - Uso de funciones inseguras como `pickle.loads()` en Python, `unserialize()` en PHP o `node-serialize` en Node.js sobre datos proporcionados por usuarios.
- **Mitigación Recomendada**:
  - Utilizar formatos de serialización estándar y libres de ejecución arbitraria (JSON, Protocol Buffers).

---

### A09: Security Logging and Monitoring Failures (Registro y Monitorización Inadecuados)
- **CWEs asociados**: CWE-778 (Insufficient Logging), CWE-532 (Insertion of Sensitive Information into Log File).
- **Patrón Vulnerable**:
  - No registrar eventos de seguridad críticos (inicios de sesión fallidos, cambios de privilegios, cambios de contraseña).
  - Registrar información confidencial (PII, números de tarjeta, contraseñas en texto plano, tokens de autorización) en logs estándar de texto.
- **Mitigación Recomendada**:
  - Registro estructurado (JSON) enmascarando campos sensibles antes de emitir el log.

---

### A10: Server-Side Request Forgery (SSRF)
- **CWEs asociados**: CWE-918 (Server-Side Request Forgery).
- **Patrón Vulnerable**:
  - Realizar peticiones HTTP salientes hacia URLs proporcionadas por el cliente sin validar protocolo, IP de destino ni impedir acceso a IPs privadas (ej. `127.0.0.1`, `169.254.169.254`, `10.0.0.0/8`).
- **Mitigación Recomendada**:
  - Lista blanca estricta de dominios y esquemas (`https://`).
  - Bloqueo a nivel de resolución DNS para direcciones IP privadas o de metadatos de nube.

---

## 2. Resumen Rápido para Auditoría de Código

Al analizar un fragmento, responder mentalmente:
1. ¿De dónde entra el dato? (¿Está validado contra un esquema estricto?).
2. ¿Quién ejecuta la acción? (¿Está autenticado y autorizado para este recurso específico?).
3. ¿A dónde viaja el dato? (¿Está parametrizado en BD, escapado en HTML, sanitizado en shell?).
4. ¿Qué ocurre si falla? (¿Se captura la excepción sin filtrar trazas internas ni dejar estados corruptos?).
5. ¿Qué queda registrado? (¿Hay log útil sin revelar contraseñas ni tokens?).
