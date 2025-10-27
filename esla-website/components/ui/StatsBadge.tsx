'use client';

import { useEffect, useState } from 'react';

type Stats = {
  wins: number;
  gf: number;
};

type ValidTeam = 'all' | 'esla7' | 'esla9' | 'eslaea';

const TEAM_EMOJIS: Record<ValidTeam, string> = {
  all: '⚽',
  esla7: '🔥',
  esla9: '🚀',
  eslaea: '🌟',
};

const TEAM_LABELS: Record<ValidTeam, string> = {
  all: 'ESLA',
  esla7: 'ESLA 7',
  esla9: 'ESLA 9',
  eslaea: 'ESLA EA',
};

const isValidTeam = (value: string): value is ValidTeam => {
  return value === 'all' || value === 'esla7' || value === 'esla9' || value === 'eslaea';
};

const normalizeTeamParam = (value: string | null): ValidTeam => {
  const key = (value || '').toLowerCase();
  return isValidTeam(key) ? key : 'all';
};

export default function StatsBadge({ className = '' }: { className?: string }) {
  const [team, setTeam] = useState<ValidTeam>(() => {
    if (typeof window === 'undefined') return 'all';
    return normalizeTeamParam(new URLSearchParams(window.location.search).get('team'));
  });
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setTeam(normalizeTeamParam(params.get('team')));
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/stats?team=${team}`, { cache: 'no-store' });
        if (!res.ok) return;
        const json = await res.json();
        setStats({ wins: json.wins ?? 0, gf: json.gf ?? 0 });
      } catch {}
    };

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
  }, [team]);

  if (!stats) return null;

  return (
    <div className={`inline-flex flex-col items-end gap-0.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-sm ${className}`}>
      <span className="font-semibold" aria-live="polite" suppressHydrationWarning>
        {TEAM_EMOJIS[team]} {stats.gf} Tore für {TEAM_LABELS[team]}!
      </span>
      <span className="font-semibold" aria-live="polite" suppressHydrationWarning>
        🏆 {stats.wins} Siege geholt!
      </span>
    </div>
  );
}
