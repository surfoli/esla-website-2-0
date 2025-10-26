import Section from '@/components/ui/Section';
import { getAllMatches } from '@/lib/kv';
import matchesLocal from '@/data/matches.json';
import type { Match } from '@/types';
import { computedStatus, hasScore, compareByDateAsc, compareByDateDesc } from '@/lib/match';

function formatDate(date: string, time?: string) {
  const d = new Date(`${date}T${(time && time.length >= 4 ? time : '00:00')}:00`);
  const dd = d.toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' });
  return time && time.length >= 4 ? `${dd} ${time}` : dd;
}

export default async function ResultsTickerBanner() {
  let all = await getAllMatches();
  if (!all || all.length === 0) {
    all = ((matchesLocal as any)?.matches || []) as Match[];
  }

  const results = (all || [])
    .filter((m) => hasScore(m))
    .sort(compareByDateDesc)
    .slice(0, 3);

  const upcoming = (all || [])
    .filter((m) => computedStatus(m) === 'upcoming')
    .sort(compareByDateAsc)
    .slice(0, 3);

  if (results.length === 0 && upcoming.length === 0) return null;

  type TickerItem = {
    key: string;
    type: 'result' | 'upcoming';
    label: string;
    home: string;
    away: string;
    hs?: number;
    as?: number;
    dateText: string;
  };

  const items: TickerItem[] = [];

  for (const m of results) {
    const hs = (m as any).homeScore as number;
    const as = (m as any).awayScore as number;
    items.push({
      key: `r-${m.id}`,
      type: 'result',
      label: 'Resultat',
      home: m.homeTeam as string,
      away: m.awayTeam as string,
      hs,
      as,
      dateText: formatDate(m.date, m.time),
    });
  }

  for (const m of upcoming) {
    items.push({
      key: `u-${m.id}`,
      type: 'upcoming',
      label: 'Anstehend',
      home: m.homeTeam as string,
      away: m.awayTeam as string,
      dateText: formatDate(m.date, m.time),
    });
  }

  const row = (
    <div className="inline-flex items-center gap-8 md:gap-12 min-w-max pr-8">
      {items.map((it, idx) => (
        <div key={it.key} className="flex items-center gap-4 text-white/90">
          <span className="text-xs md:text-sm font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-white/10 text-white">
            {it.label}
          </span>
          {it.type === 'result' ? (
            <div className="flex items-center gap-3 md:gap-4 whitespace-nowrap">
              <span className="text-lg md:text-2xl font-bold text-white leading-tight">{it.home}</span>
              <span className="inline-flex items-center bg-white/10 border border-white/20 rounded-xl px-3 py-1 md:px-4 md:py-1.5 shadow-sm">
                <span className="font-black text-white text-2xl md:text-3xl leading-none">{it.hs}</span>
                <span className="text-white/60 mx-1 md:mx-2">:</span>
                <span className="font-black text-white text-2xl md:text-3xl leading-none">{it.as}</span>
              </span>
              <span className="text-lg md:text-2xl font-bold text-white leading-tight">{it.away}</span>
              <span className="text-esla-accent/90 text-base md:text-lg leading-tight">— {it.dateText}</span>
            </div>
          ) : (
            <span className="text-lg md:text-2xl font-semibold leading-tight whitespace-nowrap text-esla-accent/90">
              {it.home} vs. {it.away} — {it.dateText}
            </span>
          )}
          {idx < items.length - 1 ? <span className="opacity-50 mx-2">•</span> : null}
        </div>
      ))}
    </div>
  );

  return (
    <Section noContainer className="bg-gradient-to-r from-black via-esla-dark to-esla-primary !py-0 md:!py-0 border-y border-white/10">
      <div className="relative">
        <div className="relative overflow-hidden py-2 md:py-3">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-esla-primary to-transparent" />
          <div className="esla-ticker">
            <div className="esla-ticker__content">
              {row}
              {row}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
