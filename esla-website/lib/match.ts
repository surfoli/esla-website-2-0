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
  return typeof (m as any).homeScore === 'number' && typeof (m as any).awayScore === 'number';
}

const LIVE_WINDOW_MS = 100 * 60 * 1000;

export function isLive(m: Match): boolean {
  if (hasScore(m) || (m as any).status === 'finished') return false;
  const start = toMs(m);
  const now = Date.now();
  return now >= start && now < start + LIVE_WINDOW_MS;
}

export function computedStatus(m: Match): 'upcoming' | 'live' | 'finished' {
  if (hasScore(m) || (m as any).status === 'finished') return 'finished';
  const start = toMs(m);
  const now = Date.now();
  if (now < start) return 'upcoming';
  if (now < start + LIVE_WINDOW_MS) return 'live';
  return 'finished';
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
