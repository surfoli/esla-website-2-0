"use client";

import { useEffect, useMemo, useState } from 'react';
import type { Match } from '@/types';
import { computedStatus, compareByDateAsc, compareByDateDesc } from '@/lib/match';
import MatchCard from '@/components/matches/MatchCard';

export default function MatchesPreviewClient({ initialMatches }: { initialMatches: Match[] }) {
  const [matches, setMatches] = useState<Match[]>(initialMatches ?? []);

  // Poll every 60s for fresh data
  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setInterval> | null = null;

    const load = async () => {
      try {
        const res = await fetch('/api/matches', { cache: 'no-store' });
        if (!res.ok) return;
        const data: unknown = await res.json();
        if (active && Array.isArray(data)) {
          setMatches(data as Match[]);
        }
      } catch {}
    };
    // immediate refresh once mounted, then every 60s
    void load();
    timer = setInterval(() => {
      void load();
    }, 60_000);
    return () => {
      active = false;
      if (timer) clearInterval(timer);
    };
  }, []);

  const { upcomingToShow, finishedToShow } = useMemo(() => {
    const all = matches || [];
    const liveAll = all.filter((m) => computedStatus(m) === 'live').sort(compareByDateAsc);
    const upcomingOnly = all.filter((m) => computedStatus(m) === 'upcoming').sort(compareByDateAsc);
    const heroCandidate = liveAll[0] || upcomingOnly[0];
    const heroId = heroCandidate?.id;

    const maxUpcoming = 2;
    const maxFinished = 3;

    const upcomingPool = upcomingOnly.filter((m) => m.id !== heroId);
    const finishedAll = all.filter((m) => computedStatus(m) === 'finished').sort(compareByDateDesc);

    const upcomingToShow = upcomingPool.slice(0, maxUpcoming);
    const finishedToShow = finishedAll.slice(0, maxFinished);

    return { upcomingToShow, finishedToShow };
  }, [matches]);

  return (
    <div>
      {upcomingToShow.length > 0 && (
        <section className="mb-10">
          <h3 className="text-2xl md:text-3xl font-black text-esla-secondary mb-4">Anstehende Spiele</h3>
          <div className="grid gap-8">
            {upcomingToShow.map((m) => (
              <MatchCard key={m.id} match={m} fullWidth />
            ))}
          </div>
        </section>
      )}

      {finishedToShow.length > 0 && (
        <section className="mt-2">
          <h3 className="text-2xl md:text-3xl font-black text-esla-secondary mb-4">Beendete Spiele</h3>
          <div className="grid gap-8">
            {finishedToShow.map((m) => (
              <MatchCard key={m.id} match={m} fullWidth />
            ))}
          </div>
        </section>
      )}

      <div className="text-center mt-8 md:mt-12">
        <a href="/spiele" className="inline-block px-6 py-3 rounded-full bg-esla-secondary text-white hover:bg-esla-dark font-semibold border border-transparent">Alle Spiele ansehen</a>
      </div>
    </div>
  );
}
