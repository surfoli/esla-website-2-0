'use client';

import { useEffect, useState } from 'react';

type Stats = {
  wins: number;
  gf: number;
};

export default function StatsBadge({ className = '' }: { className?: string }) {
  const [stats, setStats] = useState<Stats | null>(null);

  const load = async () => {
    try {
      const res = await fetch('/api/stats', { cache: 'no-store' });
      if (!res.ok) return;
      const json = await res.json();
      setStats({ wins: json.wins ?? 0, gf: json.gf ?? 0 });
    } catch {}
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 30000);
    const onFocus = () => load();
    const onVisibility = () => {
      if (document.visibilityState === 'visible') load();
    };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      clearInterval(id);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  if (!stats) return null;

  return (
    <div className={`inline-flex flex-col items-end gap-0.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-sm ${className}`}>
      <span className="font-semibold" aria-live="polite" suppressHydrationWarning>
        ⚽ {stats.gf} Tore geschossen! 🔥
      </span>
      <span className="font-semibold" aria-live="polite" suppressHydrationWarning>
        🏆 {stats.wins} Siege geholt! 💪
      </span>
    </div>
  );
}
