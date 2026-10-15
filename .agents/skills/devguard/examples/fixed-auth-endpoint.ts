// Archivo de Ejemplo: Endpoint corregido y robustecido tras auditoría DevGuard AI
// Ubicación: examples/fixed-auth-endpoint.ts
// NOTA: Implementa las mitigaciones recomendadas: consultas parametrizadas, bcrypt, JWT con expiración,
// validación de esquemas Zod, autorización por ID de usuario y manejo seguro de errores.

import express, { Request, Response, NextFunction } from 'express';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const app = express();
app.use(express.json());

const db = new Pool({
  connectionString: process.env.DATABASE_URL
});

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error('FATAL: Variable de entorno JWT_SECRET no configurada o insegura (mínimo 32 caracteres)');
}

// Esquemas de validación Zod
const LoginSchema = z.object({
  email: z.string().email('Formato de correo electrónico inválido').trim().toLowerCase(),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres')
});

const ProfileParamsSchema = z.object({
  userId: z.string().uuid('Identificador de usuario inválido (debe ser UUID)')
});

// Middleware de autenticación y autorización
interface AuthTokenPayload {
  id: string;
  email: string;
  role: 'user' | 'admin';
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Falta cabecera de autenticación válida' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET as string, { algorithms: ['HS256'] }) as AuthTokenPayload;
    (req as any).user = decoded;
    return next();
  } catch {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

// 1. Endpoint de Inicio de Sesión Seguro
app.post('/api/login', async (req: Request, res: Response) => {
  const parseResult = LoginSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      error: 'Datos de entrada inválidos',
      detalles: parseResult.error.flatten().fieldErrors
    });
  }

  const { email, password } = parseResult.data;

  try {
    // Consulta parametrizada segura contra SQL Injection ($1)
    const result = await db.query(
      'SELECT id, email, role, password_hash FROM users WHERE email = $1 LIMIT 1',
      [email]
    );

    if (result.rows.length === 0) {
      // Mensaje neutral para mitigar enumeración de usuarios
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Token seguro con tiempo de expiración corto (1 hora)
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET as string,
      { algorithm: 'HS256', expiresIn: '1h' }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    // Registro interno seguro sin exponer trazas técnicas al cliente
    console.error('[AUTH_ERROR]', err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// 2. Endpoint de Perfil con Control de Acceso Estricto (Mitigación IDOR)
app.get('/api/users/:userId/profile', requireAuth, async (req: Request, res: Response) => {
  const paramsResult = ProfileParamsSchema.safeParse(req.params);
  if (!paramsResult.success) {
    return res.status(400).json({ error: 'Parámetros inválidos' });
  }

  const { userId } = paramsResult.data;
  const currentUser = (req as any).user as AuthTokenPayload;

  // Verificación estricta de propiedad o rol administrador
  if (currentUser.id !== userId && currentUser.role !== 'admin') {
    return res.status(403).json({ error: 'No autorizado para acceder a este perfil' });
  }

  try {
    // Proyección segura: solo campos públicos o autorizados, sin datos bancarios planos
    const result = await db.query(
      'SELECT id, email, full_name, created_at FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    console.error('[PROFILE_ERROR]', err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default app;
