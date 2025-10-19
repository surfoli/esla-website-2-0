"use client";

import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { useEffect, useState } from 'react';

type Stats = {
  wins: number;
  draws: number;
  losses: number;
  gf: number;
  ga: number;
  upcoming: number;
  finished: number;
  winRate: number;
  total: number;
};

export default function StatsOverviewServer({ compact = false }: { compact?: boolean }) {
  const [stats, setStats] = useState<Stats | null>(null);

  const load = async () => {
    try {
      const res = await fetch('/api/stats', { cache: 'no-store' });
      const json = await res.json();
      if (res.ok) setStats(json);
    } catch {}
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 5000); // alle 5s aktualisieren
    const onFocus = () => load();
    const onVisibility = () => { if (document.visibilityState === 'visible') load(); };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      clearInterval(id);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  if (!stats) return null;

  const avgGoals = stats.total > 0 ? (stats.gf / stats.total).toFixed(1) : '0.0';

  return (
    <Section className="bg-esla-secondary py-10 md:py-14">
      <Container>
        <div className={`mx-auto ${compact ? 'max-w-3xl' : 'max-w-6xl'}`}>
          <a
            href="/spiele"
            className={`block rounded-3xl border border-white/10 text-center text-white transition focus:outline-none focus:ring-2 focus:ring-esla-primary/70 focus:ring-offset-2 focus:ring-offset-transparent ${compact ? 'px-5 py-6' : 'px-7 py-9'} bg-[#090909]/90 hover:bg-[#121212]/95`}
          >
            <div className={`flex flex-col ${compact ? 'gap-3' : 'gap-5'}`}>
              <div className="flex flex-col gap-1 items-center">
                <span className={`${compact ? 'text-2xl md:text-3xl' : 'text-4xl md:text-5xl'} font-black flex items-center gap-3`}>
                  <span role="img" aria-label="Ball">⚽</span>
                  <span className="text-esla-primary">{stats.gf}</span>
                  <span className="text-white"> : {stats.ga}</span>
                  <span>Tore</span>
                </span>
              </div>
              <div className={`${compact ? 'text-xs md:text-sm' : 'text-sm md:text-base'} text-white/80 flex flex-wrap justify-center gap-x-3 gap-y-1`}>
                <span role="img" aria-label="Trophäe">🏆</span>
                <span>{stats.wins} Siege</span>
                <span>• {stats.losses} Niederlagen</span>
                <span>• {stats.draws} Unentschieden</span>
              </div>
              <div className={`${compact ? 'text-xs md:text-sm' : 'text-sm md:text-base'} text-white/80 flex flex-wrap justify-center gap-x-3 gap-y-1`}>
                <span role="img" aria-label="Kalender">📅</span>
                <span>{stats.total} Spiele ({stats.finished} abgeschlossen, {stats.upcoming} anstehend)</span>
              </div>
              <div>
                <span className={`${compact ? 'text-xs md:text-sm' : 'text-sm md:text-base'} text-esla-accent`}>Ø {avgGoals} Tore pro Spiel</span>
              </div>
            </div>
          </a>
        </div>
      </Container>
    </Section>
  );
}
