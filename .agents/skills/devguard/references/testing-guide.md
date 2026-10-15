# DevGuard AI — Guía de Estrategia y Diseño de Pruebas (Testing Guide)

Esta guía establece el marco metodológico para proponer pruebas técnicas rigurosas y verificables sobre el código analizado.

---

## 1. La Pirámide de Pruebas en DevGuard

```
        /   E2E   \          -> Pruebas de flujo completo de usuario (pocas, alto coste)
       /  Integración \       -> Pruebas de interacción entre módulos y BD (moderadas)
      /    Unitarias   \      -> Pruebas de lógica pura, funciones y ramas (amplias, rápidas)
     --------------------
     Seguridad / Contrato    -> Transversal: validación de inputs, auth y límites
```

1. **Pruebas Unitarias**: Verifican funciones individuales, cálculos, validadores y transformadores de datos de forma aislada, sin dependencias externas reales.
2. **Pruebas de Integración**: Verifican que un endpoint HTTP, una consulta con ORM o un servicio con base de datos interactúe correctamente con sus componentes dependientes.
3. **Pruebas de Límites y Seguridad**: Verifican que entradas anómalas, valores extremos o intentos de intrusión sean rechazados limpiamente sin comprometer el sistema.

---

## 2. Metodología de Diseño de Casos de Prueba

Al auditar una función o endpoint con DevGuard, se deben formular casos de prueba bajo cuatro cuadrantes:

### Cuadrante 1: Camino Feliz (*Happy Path*)
- Probar la ejecución esperada con entradas válidas y datos dentro del rango nominal.
- **Verificación**: Código de estado 200/201, estructura de payload esperada, estado persistido correctamente.

### Cuadrante 2: Validación de Entradas y Casos Límite (*Boundary Testing*)
- Cadenas vacías (`""`), cadenas excesivamente largas (>10,000 caracteres), strings con espacios en blanco.
- Valores numéricos cero, negativos, máximos enteros (`MAX_SAFE_INTEGER`), decimales inesperados o NaN.
- Fechas pasadas/futuras, husos horarios no estándar, formatos ISO inválidos.
- Objetos vacíos (`{}`), arrays vacíos (`[]`), campos adicionales no declarados (*mass assignment*).

### Cuadrante 3: Casos Negativos y Manejo de Errores
- Recursos inexistentes (ID inválido en base de datos -> debe retornar 404 cleanly).
- Violación de unicidad (duplicado de email en registro -> debe retornar 409 Conflict o 422).
- Caída de servicios dependientes (timeout de base de datos o pasarela externa -> 503 o fallback controlado).

### Cuadrante 4: Casos Adversarios y de Seguridad
- **Inyección**: Payloads con comillas simples, sentencias SQL (`' OR 1=1 --`), scripts XSS (`<script>alert(1)</script>`).
- **Control de Acceso**: Petición de usuario A intentando acceder al recurso perteneciente a usuario B (IDOR -> 403 Forbidden).
- **Token / Sesión**: Petición sin cabecera `Authorization`, token expirado, token con firma alterada -> 401 Unauthorized.
- **Sobrecarga**: Múltiples peticiones en ventana corta para comprobar el límite de tasa (*rate limit* -> 429 Too Many Requests).

---

## 3. Patrón AAA (Arrange - Act - Assert)

Todo caso de prueba generado por DevGuard debe respetar la estructura estándar AAA:

```typescript
// Ejemplo en Vitest / Jest
describe('POST /api/orders', () => {
  it('debe rechazar la creación de orden con cantidad negativa', async () => {
    // 1. Arrange (Preparar datos y contexto)
    const authUser = await createMockUser();
    const token = generateTestToken(authUser);
    const payloadInvalido = { productId: 'prod-123', quantity: -5 };

    // 2. Act (Ejecutar la acción bajo prueba)
    const response = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(payloadInvalido);

    // 3. Assert (Verificar el resultado)
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('La cantidad debe ser mayor a cero');
  });
});
```

---

## 4. Formato de Especificación de Pruebas para Informes DevGuard

Para mantener concisión y precisión en los informes de auditoría, documenta las pruebas propuestas en este formato tabular y estructurado:

| ID Prueba | Tipo | Entrada / Precondición | Acción Ejecutada | Resultado Esperado | Justificación |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TEST-01** | Seguridad (IDOR) | Usuario `U2` autenticado, intentando leer documento `DOC-10` perteneciente a `U1`. | `GET /api/documents/DOC-10` con token de `U2` | HTTP 403 Forbidden con `{ error: "Acceso denegado" }` | Prevenir fuga de información confidencial entre inquilinos. |
| **TEST-02** | Validación Límites | Cadena de 5,000 caracteres en campo `username`. | `POST /api/register` con username desbordado | HTTP 422 Unprocessable Entity con detalle de campo | Proteger la base de datos contra desbordamiento o buffer abuse. |
| **TEST-03** | Lógica / Negocio | Saldo insuficiente en cuenta origen. | `POST /api/transfer` con monto > saldo | Transacción revertida, HTTP 400 y sin modificación de saldos | Garantizar consistencia atómica y ACID en operaciones financieras. |
