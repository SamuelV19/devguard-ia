# DevGuard AI — Checklist de Calidad y Mantenibilidad de Código

Esta guía de referencia define los criterios técnicos para auditar la arquitectura, legibilidad, robustez y mantenibilidad del software.

---

## 1. Principios de Diseño y Arquitectura

### Principios SOLID
- **S (Single Responsibility)**: ¿Cada módulo, clase o función tiene un único motivo para cambiar?
  - *Señal de alerta*: Controladores HTTP que contienen lógica de negocio compleja, consultas SQL directas y formateo de correos electrónicos.
- **O (Open/Closed)**: ¿El código está abierto a la extensión pero cerrado a la modificación?
  - *Señal de alerta*: Cadenas interminables de `if-else` o `switch` sobre tipos de entidades en lugar de polimorfismo o mapas de estrategias.
- **L (Liskov Substitution)**: ¿Los subtipos pueden reemplazar a sus tipos base sin romper el comportamiento del programa?
- **I (Interface Segregation)**: ¿Las interfaces son pequeñas y específicas en lugar de monolíticas?
- **D (Dependency Inversion)**: ¿Los módulos de alto nivel dependen de abstracciones en lugar de implementaciones concretas?
  - *Señal de alerta*: Instanciación directa con `new DatabaseConnection()` dentro de servicios de dominio.

### Otros Principios Esenciales
- **DRY (Don't Repeat Yourself)**: Evitar duplicación de lógica de negocio, reglas de validación o consultas.
- **KISS (Keep It Simple, Stupid)**: Preferir soluciones directas y comprensibles sobre abstracciones prematuras.
- **YAGNI (You Aren't Gonna Need It)**: Evitar código especulativo o características no requeridas que incrementan la superficie de mantenimiento.

---

## 2. Manejo de Excepciones y Robustez

### Fallo Rápido y Controlado (Fail Fast)
- Validar las precondiciones al inicio de la función (*guard clauses*):
  ```typescript
  // Bueno: Guard clauses
  if (!user) throw new NotFoundError('Usuario no encontrado');
  if (!user.isActive) throw new ForbiddenError('Cuenta inactiva');
  // Continuar con flujo principal sin anidamientos excesivos
  ```

### Anti-patrones de Manejo de Errores
- **Tragar errores en silencio (*Swallowing errors*)**:
  ```typescript
  // INSEGURO / ANTI-PATRÓN
  try {
    await processPayment(order);
  } catch (e) {
    // Silencio o solo console.log(e) sin propagar ni compensar estado
  }
  ```
- **Promesas no capturadas (*Unhandled Promise Rejections*)**:
  - Toda promesa asíncrona debe ser esperada (`await`) o encadenada con `.catch()`.
- **Exposición de detalles internos**:
  - No devolver el objeto `err` directo al cliente HTTP en producción; transformar en respuestas con códigos de estado HTTP semánticos (400, 401, 403, 404, 422, 500) y mensajes seguros.

---

## 3. Validación y Tipado Defensivo

### Validación en las Fronteras
- Toda entrada externa (cuerpo de petición, cabeceras, parámetros de ruta, mensajes de colas) debe ser validada con esquemas declarativos antes de procesarse:
  - En TypeScript / JavaScript: `zod`, `valibot`, `joi`.
  - En Python: `pydantic`.
- **Tipado estricto**: Evitar el uso indiscriminado de `any` en TypeScript o variables no tipadas en lenguajes dinámicos.

---

## 4. Rendimiento y Gestión de Recursos

- **Consultas N+1**: Identificar bucles que ejecutan consultas independientes por cada iteración sobre una lista de registros.
- **Cierre de recursos**: Garantizar que conexiones de sockets, streams de archivos y cursores de bases de datos se cierren en bloques `finally` o con constructos automáticos (`using`, `try-with-resources`, `with`).
- **Bloqueo del Event Loop (Node.js)**: Evitar operaciones síncronas pesadas (`fs.readFileSync`, `crypto.pbkdf2Sync` en rutas concurrentes, expresiones regulares catastróficas).
- **Fugas de memoria (*Memory Leaks*)**: Listeners de eventos añadidos sin removerse, cachés en memoria no acotadas sin política de desalojo (LRU).

---

## 5. Deuda Técnica y "Code Smells"

| Code Smell | Descripción | Impacto | Recomendación |
| :--- | :--- | :--- | :--- |
| **Long Method / Function** | Funciones de más de 40-50 líneas con múltiples propósitos. | Dificultad para razonar y testear. | Descomponer en funciones puras auxiliares. |
| **Deep Nesting** | Más de 3 niveles de indentación condicional (`if`, `for`, `try`). | Alta complejidad cognitiva. | Aplicar *early returns* y modularización. |
| **Magic Numbers/Strings** | Valores literales dispersos (`if (status === 3)`) sin constante nominal. | Ambigüedad semántica. | Definir enums o constantes declarativas (`OrderStatus.CANCELLED`). |
| **God Object** | Clases o archivos con miles de líneas y docenas de responsabilidades. | Alto acoplamiento. | Dividir en módulos o capas de servicio específicas. |
| **Dead Code** | Código comentado, variables no utilizadas, ramas inalcanzables. | Ruido cognitivo. | Eliminar (el historial de git conserva el registro). |
