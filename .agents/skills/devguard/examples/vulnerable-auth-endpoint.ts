// Archivo de Ejemplo: Endpoint vulnerable de autenticación y perfil de usuario
// Ubicación: examples/vulnerable-auth-endpoint.ts
// NOTA: Este código contiene vulnerabilidades intencionales con fines puramente didácticos y de demostración.

import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

const db = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/myapp'
});

const JWT_SECRET = 'clave-secreta-hardcodeada-12345'; // VULNERABILIDAD: Secreto hardcodeado

// 1. Endpoint de Inicio de Sesión
app.post('/api/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // VULNERABILIDAD: Hashing inseguro (MD5) y comparación rápida
    const passwordHash = crypto.createHash('md5').update(password).digest('hex');

    // VULNERABILIDAD CRÍTICA: Concatenación directa de strings -> Inyección SQL
    const query = `SELECT id, email, role FROM users WHERE email = '${email}' AND password_hash = '${passwordHash}'`;
    const result = await db.query(query);

    if (result.rows.length === 0) {
      // VULNERABILIDAD: Mensaje que facilita la enumeración de usuarios
      return res.status(401).json({ error: 'Credenciales inválidas para este email' });
    }

    const user = result.rows[0];

    // VULNERABILIDAD: Token sin tiempo de expiración ni algoritmo explícito
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET);

    return res.json({ token, user });
  } catch (err: any) {
    // VULNERABILIDAD: Fuga de información técnica interna (stacktrace)
    return res.status(500).json({ error: err.message, stack: err.stack });
  }
});

// 2. Endpoint de Obtención de Perfil
app.get('/api/users/:userId/profile', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Falta cabecera de autorización' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);

    // VULNERABILIDAD ALTA: IDOR (Insecure Direct Object Reference)
    // Se valida el token pero NO se verifica si decoded.id === userId ni si es administrador
    const result = await db.query(`SELECT id, email, full_name, credit_card, address FROM users WHERE id = $1`, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // VULNERABILIDAD: Exposición de datos bancarios sensibles (credit_card en texto plano)
    return res.json(result.rows[0]);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default app;
