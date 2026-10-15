import React, { useState } from 'react';
import { Terminal, CheckCircle, Code2, FileText, Info, Copy, Check } from 'lucide-react';

export const DemoSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'input' | 'report' | 'fixed'>('report');
  const [copiedCode, setCopiedCode] = useState(false);

  const sampleVulnerableCode = `// POST /api/login — vulnerable-auth-endpoint.ts
app.post('/api/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // ⚠️ Hashing débil (MD5) sin salt adaptativo
    const passwordHash = crypto.createHash('md5').update(password).digest('hex');

    // 🔴 CRÍTICO: Concatenación directa de strings -> Inyección SQL (CWE-89)
    const query = \`SELECT id, email, role FROM users WHERE email = '\${email}' AND password_hash = '\${passwordHash}'\`;
    const result = await db.query(query);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas para este email' });
    }

    const user = result.rows[0];

    // 🟡 MEDIO: Token JWT sin exp (expiración) ni algoritmo explícito
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET);

    return res.json({ token, user });
  } catch (err: any) {
    // 🟡 MEDIO: Fuga de stacktrace interno al cliente
    return res.status(500).json({ error: err.message, stack: err.stack });
  }
});`;

  const sampleFixedCode = `// POST /api/login — fixed-auth-endpoint.ts (Refactorizado con DevGuard AI)
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const LoginSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(8)
});

app.post('/api/login', async (req: Request, res: Response) => {
  // 1. Validación declarativa de esquema con Zod
  const parseResult = LoginSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: 'Datos de entrada inválidos', detalles: parseResult.error.flatten() });
  }

  const { email, password } = parseResult.data;

  try {
    // 2. Consulta parametrizada ($1) — Neutraliza SQL Injection
    const result = await db.query(
      'SELECT id, email, role, password_hash FROM users WHERE email = $1 LIMIT 1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' }); // Mensaje neutral
    }

    const user = result.rows[0];
    // 3. Comparación segura de contraseña con bcrypt
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // 4. Token firmado con expiración acotada (1 hora)
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { algorithm: 'HS256', expiresIn: '1h' }
    );

    return res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    console.error('[AUTH_ERROR]', err); // Log interno
    return res.status(500).json({ error: 'Error interno del servidor' }); // Sin stacktrace
  }
});`;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="demostracion" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wide">
            <Terminal className="w-3.5 h-3.5" />
            <span>CASO DE ESTUDIO PRÁCTICO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Demostración: Auditoría de un <span className="text-amber-400">Endpoint Crítico</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Observa cómo DevGuard AI descompone un endpoint de autenticación con múltiples vulnerabilidades intencionales, genera el informe estructurado y formula la solución corregida.
          </p>
        </div>

        {/* Clear Disclaimer Banner (Strict Requirement) */}
        <div className="mt-8 p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-3 text-left">
          <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm">
            <p className="font-semibold text-amber-300">
              Aviso de Demostración Ilustrativa
            </p>
            <p className="text-amber-200/80 leading-relaxed font-normal">
              El contenido mostrado a continuación es un <strong>ejemplo didáctico e ilustrativo</strong> para exhibir la sintaxis y metodología de DevGuard AI. No representa una ejecución en tiempo real sobre una base de datos de producción.
            </p>
          </div>
        </div>

        {/* Tabbed Interactive Viewer */}
        <div className="mt-8 rounded-2xl bg-[#0C111D] border border-slate-800 shadow-2xl overflow-hidden">
          
          {/* Tabs Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-[#080B13] px-4 pt-3">
            <div className="flex items-center gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('input')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition border-t-2 ${
                  activeTab === 'input'
                    ? 'bg-[#0C111D] text-rose-400 border-rose-500'
                    : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>1. Código Entrada (Vulnerable)</span>
              </button>

              <button
                onClick={() => setActiveTab('report')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition border-t-2 ${
                  activeTab === 'report'
                    ? 'bg-[#0C111D] text-emerald-400 border-emerald-500'
                    : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>2. Informe DevGuard AI</span>
              </button>

              <button
                onClick={() => setActiveTab('fixed')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition border-t-2 ${
                  activeTab === 'fixed'
                    ? 'bg-[#0C111D] text-cyan-400 border-cyan-500'
                    : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>3. Solución Refactorizada</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 py-2 text-xs font-mono text-slate-500">
              <span>TypeScript / Express / PostgreSQL</span>
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="p-6">
            
            {/* TAB 1: Vulnerable Input */}
            {activeTab === 'input' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>examples/vulnerable-auth-endpoint.ts</span>
                  <button
                    onClick={() => handleCopy(sampleVulnerableCode)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copiar código</span>
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-[#07090F] border border-slate-800/80 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
                  <code>{sampleVulnerableCode}</code>
                </pre>
              </div>
            )}

            {/* TAB 2: Generated Report */}
            {activeTab === 'report' && (
              <div className="space-y-6">
                
                {/* Metric Summary Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-center">
                    <p className="text-[11px] text-rose-300 font-medium">Críticos</p>
                    <p className="text-2xl font-bold text-rose-400 font-mono">1</p>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-center">
                    <p className="text-[11px] text-amber-300 font-medium">Altos</p>
                    <p className="text-2xl font-bold text-amber-400 font-mono">1</p>
                  </div>
                  <div className="p-3 rounded-xl bg-yellow-950/30 border border-yellow-500/30 text-center">
                    <p className="text-[11px] text-yellow-300 font-medium">Medios</p>
                    <p className="text-2xl font-bold text-yellow-400 font-mono">2</p>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center">
                    <p className="text-[11px] text-emerald-300 font-medium">Revisión Humana</p>
                    <p className="text-2xl font-bold text-emerald-400 font-mono">100%</p>
                  </div>
                </div>

                {/* Findings Table */}
                <div className="overflow-x-auto border border-slate-800 rounded-xl">
                  <table className="w-full text-left text-xs text-slate-300 font-sans">
                    <thead className="bg-[#090D15] text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                      <tr>
                        <th className="p-3">ID</th>
                        <th className="p-3">Categoría</th>
                        <th className="p-3">Vulnerabilidad / Defecto</th>
                        <th className="p-3">Severidad</th>
                        <th className="p-3">Certidumbre</th>
                        <th className="p-3">Líneas</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-mono text-[11px]">
                      <tr className="hover:bg-slate-800/30">
                        <td className="p-3 font-bold text-rose-400">DG-SEC-01</td>
                        <td className="p-3 text-slate-300">Seguridad (A03)</td>
                        <td className="p-3 font-sans text-slate-200">Inyección SQL directa por concatenación en query</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">CRÍTICO</span></td>
                        <td className="p-3 text-emerald-400">Confirmado</td>
                        <td className="p-3 text-slate-400">L11-L12</td>
                      </tr>
                      <tr className="hover:bg-slate-800/30">
                        <td className="p-3 font-bold text-amber-400">DG-SEC-02</td>
                        <td className="p-3 text-slate-300">Seguridad (A02)</td>
                        <td className="p-3 font-sans text-slate-200">Uso de MD5 para almacenamiento de contraseñas</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">ALTO</span></td>
                        <td className="p-3 text-emerald-400">Confirmado</td>
                        <td className="p-3 text-slate-400">L8</td>
                      </tr>
                      <tr className="hover:bg-slate-800/30">
                        <td className="p-3 font-bold text-yellow-400">DG-SEC-03</td>
                        <td className="p-3 text-slate-300">Seguridad (A07)</td>
                        <td className="p-3 font-sans text-slate-200">Token JWT emitido sin tiempo de expiración (exp)</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 text-[10px] font-bold">MEDIO</span></td>
                        <td className="p-3 text-emerald-400">Confirmado</td>
                        <td className="p-3 text-slate-400">L19</td>
                      </tr>
                      <tr className="hover:bg-slate-800/30">
                        <td className="p-3 font-bold text-yellow-400">DG-SEC-04</td>
                        <td className="p-3 text-slate-300">Seguridad (A05)</td>
                        <td className="p-3 font-sans text-slate-200">Filtración de stacktrace interno en respuesta 500</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 text-[10px] font-bold">MEDIO</span></td>
                        <td className="p-3 text-emerald-400">Confirmado</td>
                        <td className="p-3 text-slate-400">L24</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Proposed Test Suite Preview */}
                <div className="p-4 rounded-xl bg-[#090D15] border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Batería de Pruebas Propuesta (Extracto AAA)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-[#0E1524] border border-slate-800 space-y-1">
                      <p className="font-semibold text-rose-300 font-mono">TEST-01: Inyección SQL (Adversario)</p>
                      <p className="text-slate-400">Payload: <code className="text-amber-300 bg-black/40 px-1 py-0.5 rounded">admin' OR '1'='1</code></p>
                      <p className="text-emerald-400">Resultado Esperado: HTTP 401 Unauthorized sin bypass</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#0E1524] border border-slate-800 space-y-1">
                      <p className="font-semibold text-cyan-300 font-mono">TEST-02: Validación de Entrada</p>
                      <p className="text-slate-400">Payload: Body vacío o email no válido</p>
                      <p className="text-emerald-400">Resultado Esperado: HTTP 400 Bad Request con Zod error</p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: Fixed Code */}
            {activeTab === 'fixed' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>examples/fixed-auth-endpoint.ts</span>
                  <button
                    onClick={() => handleCopy(sampleFixedCode)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copiar código</span>
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-[#07090F] border border-slate-800/80 text-xs font-mono text-emerald-300/90 overflow-x-auto leading-relaxed">
                  <code>{sampleFixedCode}</code>
                </pre>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
