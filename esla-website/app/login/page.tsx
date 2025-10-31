'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/navigation/Navbar';

function LoginContent() {
  const router = useRouter();
  const search = useSearchParams();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const next = search.get('next') || '/admin';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error || 'Login fehlgeschlagen');
        return;
      }
      router.push(next);
    } catch (e) {
      setError('Login fehlgeschlagen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-esla-dark to-esla-secondary">
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h1 className="text-3xl font-black text-white mb-6">Admin Login</h1>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-semibold mb-2">Passwort</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-esla-primary"
                  placeholder="Admin-Passwort"
                  required
                />
              </div>
              {error && (
                <div className="text-red-400 text-sm">{error}</div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-esla-primary hover:bg-esla-accent text-white px-6 py-3 rounded-full font-bold transition-all disabled:opacity-60"
              >
                {loading ? 'Einloggen…' : 'Einloggen'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}
