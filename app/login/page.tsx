'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Printer, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al iniciar sesión');
        return;
      }

      if (data.user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-pink rounded-xl flex items-center justify-center">
              <Printer className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-black text-white tracking-tight">
                Toner<span className="text-pink">Print</span>
              </div>
              <div className="text-xs text-white/40 uppercase tracking-widest">República Dominicana</div>
            </div>
          </div>
          <p className="text-white/50 text-sm">Accede a tu cuenta para continuar</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <h1 className="text-xl font-bold text-white mb-6">Iniciar sesión</h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-white/60 mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full bg-white/6 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none focus:border-pink focus:ring-2 focus:ring-pink/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white/60 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/6 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-white/30 text-sm outline-none focus:border-pink focus:ring-2 focus:ring-pink/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink hover:bg-pink/90 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Ingresando…
                </>
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 pt-6 border-t border-white/8">
            <p className="text-xs text-white/30 text-center mb-3 uppercase tracking-wider">Credenciales de prueba</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => { setEmail('admin@tonerprint.com'); setPassword('admin123'); }}
                className="bg-pink/10 border border-pink/20 hover:bg-pink/20 rounded-lg p-2.5 text-left transition-colors"
              >
                <div className="text-xs font-bold text-pink">Admin</div>
                <div className="text-xs text-white/40">admin@tonerprint.com</div>
              </button>
              <button
                type="button"
                onClick={() => { setEmail('usuario@tonerprint.com'); setPassword('user123'); }}
                className="bg-white/5 border border-white/10 hover:bg-white/8 rounded-lg p-2.5 text-left transition-colors"
              >
                <div className="text-xs font-bold text-white/70">Usuario</div>
                <div className="text-xs text-white/40">usuario@tonerprint.com</div>
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          © 2024 TonerPrint. República Dominicana.
        </p>
      </div>
    </div>
  );
}
