import type { Match } from '@/types';

export function toMs(m: Match): number {
  const t = m.time && m.time.length >= 4 ? m.time : '00:00';
  return new Date(`${m.date}T${t}:00`).getTime();
}

export function isEsla(name?: string): boolean {
  if (!name) return false;
  const n = name.replace(/\u00A0/g, ' ').toLowerCase();
  return n.includes('esla');
}

export function isEslaTeamName(name?: string): boolean {
  if (!name) return false;
  const n = name.replace(/\u00A0/g, ' ');
  return /(?:elitesoccer\s+)?esla\b/i.test(n);
}

export function hasScore(m: Match): boolean {
  return typeof m.homeScore === 'number' && typeof m.awayScore === 'number';
}

const LIVE_WINDOW_MS = 100 * 60 * 1000;

export function isLive(m: Match): boolean {
  if (hasScore(m) || m.status === 'finished') return false;
  const start = toMs(m);
  const now = Date.now();
  return now >= start && now < start + LIVE_WINDOW_MS;
}

export function computedStatus(m: Match): 'upcoming' | 'live' | 'finished' {
  if (hasScore(m) || m.status === 'finished') return 'finished';
  const start = toMs(m);
  const now = Date.now();
  if (now < start) return 'upcoming';
  if (now < start + LIVE_WINDOW_MS) return 'live';
  return 'finished';
}

function normalizeTime(t?: string): string {
  if (!t) return '00:00';
  const m = /^(\d{1,2}):(\d{2})/.exec(t);
  if (!m) return (t.length >= 5 ? t.slice(0, 5) : '00:00');
  const hh = m[1].padStart(2, '0');
  const mm = m[2];
  return `${hh}:${mm}`;
}

export function dateKey(m: Match): string {
  return `${m.date} ${normalizeTime(m.time)}`;
}

export function compareByDateAsc(a: Match, b: Match): number {
  const ka = dateKey(a);
  const kb = dateKey(b);
  return ka < kb ? -1 : ka > kb ? 1 : 0;
}

export function compareByDateDesc(a: Match, b: Match): number {
  return compareByDateAsc(b, a);
}

export function comparatorForStatus(statusParam: string) {
  const s = (statusParam || '').toLowerCase();
  return s === 'finished' ? compareByDateDesc : compareByDateAsc;
}

export function calendarInfo(match: Match) {
  const startIso = `${match.date}T${(match.time && match.time.length >= 4 ? match.time : '00:00')}:00`;
  return {
    title: `${match.homeTeam} vs. ${match.awayTeam}`,
    start: startIso,
    durationMinutes: 120,
    location: match.location || undefined,
    description: match.competition || undefined,
  };
}

export function isHomeLocation(loc?: string): boolean {
  if (!loc) return false;
  const s = loc.replace(/\u00A0/g, ' ').toLowerCase();
  return s.includes('sportplatz ruag') || (s.includes('ruag') && s.includes('emmen'));
}
