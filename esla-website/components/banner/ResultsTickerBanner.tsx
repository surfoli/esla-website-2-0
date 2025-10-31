import Section from '@/components/ui/Section';
import { getAllMatches } from '@/lib/kv';
import matchesFallback from '@/data/matches-fallback';
import type { Match } from '@/types';
import { computedStatus, hasScore, compareByDateAsc, compareByDateDesc, isEslaTeamName, displayTeamName } from '@/lib/match';

function formatDate(date: string, time?: string) {
  const d = new Date(`${date}T${(time && time.length >= 4 ? time : '00:00')}:00`);
  const dd = d.toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' });
  return time && time.length >= 4 ? `${dd} ${time}` : dd;
}

function formatDaysUntil(date: string, time?: string): string {
  const now = new Date();
  const target = new Date(`${date}T${(time && time.length >= 4 ? time : '00:00')}:00`);

  const diffMs = target.getTime() - now.getTime();
  const dayMs = 24 * 60 * 60 * 1000;

  if (diffMs <= 0) return 'Heute';
  if (diffMs < dayMs) return 'Heute';

  const days = Math.ceil(diffMs / dayMs);
  if (days === 1) return 'In 1 Tag';
  return `In ${days} Tagen`;
}

function homeAwayDescriptor(match: Match): string {
  const homeIsEsla = isEslaTeamName(match.homeTeam);
  const awayIsEsla = isEslaTeamName(match.awayTeam);

  if (homeIsEsla && !awayIsEsla) return 'Heimspiel';
  if (awayIsEsla && !homeIsEsla) return 'Auswärtsspiel';
  if (homeIsEsla && awayIsEsla) return 'ESLA-Duell';
  return 'Match';
}

function formatResultBadge(match: Match): string {
  if (typeof match.homeScore !== 'number' || typeof match.awayScore !== 'number') return 'Resultat';

  const homeIsEsla = isEslaTeamName(match.homeTeam);
  const awayIsEsla = isEslaTeamName(match.awayTeam);

  if (!homeIsEsla && !awayIsEsla) {
    if (match.homeScore === match.awayScore) return 'Unentschieden';
    return 'Resultat';
  }

  if (match.homeScore === match.awayScore) return 'Unentschieden';

  const eslaWon = (homeIsEsla && match.homeScore > match.awayScore) || (awayIsEsla && match.awayScore > match.homeScore);
  return eslaWon ? 'Gewonnen' : 'Verloren';
}

export default async function ResultsTickerBanner() {
  const liveMatches = await getAllMatches();
  const fallbackMatches = matchesFallback.matches ?? [];
  const all: Match[] = liveMatches.length > 0 ? liveMatches : fallbackMatches;

  const results = all
    .filter((m) => hasScore(m))
    .sort(compareByDateDesc)
    .slice(0, 3);

  const upcoming = all
    .filter((m) => computedStatus(m) === 'upcoming')
    .sort(compareByDateAsc)
    .slice(0, 3);

  if (results.length === 0 && upcoming.length === 0) {
  // Still show ticker with placeholder content
}

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

  for (const match of results) {
    if (typeof match.homeScore !== 'number' || typeof match.awayScore !== 'number') continue;
    items.push({
      key: `r-${match.id}`,
      type: 'result',
      label: formatResultBadge(match),
      home: displayTeamName(match.homeTeam),
      away: displayTeamName(match.awayTeam),
      hs: match.homeScore,
      as: match.awayScore,
      dateText: formatDate(match.date, match.time),
    });
  }

  for (const match of upcoming) {
    items.push({
      key: `u-${match.id}`,
      type: 'upcoming',
      label: `${homeAwayDescriptor(match)}: ${formatDaysUntil(match.date, match.time)}`,
      home: displayTeamName(match.homeTeam),
      away: displayTeamName(match.awayTeam),
      dateText: formatDate(match.date, match.time),
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

  // Ensure we have content for ticker animation
  const tickerContent = items.length > 0 ? (
    <>
      {row}
      {row}
    </>
  ) : (
    <div className="inline-flex items-center gap-8 md:gap-12 min-w-max pr-8">
      <div className="flex items-center gap-4 text-white/90">
        <span className="text-xs md:text-sm font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-white/10 text-white">
          ESLA
        </span>
        <span className="text-lg md:text-2xl font-semibold leading-tight whitespace-nowrap text-esla-accent/90">
          Weitere Spiele folgen bald...
        </span>
      </div>
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
              {tickerContent}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
