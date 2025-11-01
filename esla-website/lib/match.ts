import type { Match } from '@/types';

const NBSP_REGEX = /\u00A0/g;
const ANY_ESLA_PATTERN = /(?:elitesoccer\s+)?esla\b/i;
const TEAM_FILTER_PATTERNS: Record<string, RegExp> = {
  esla7: /(?:elitesoccer\s+)?esla\s*7\b/i,
  esla9: /(?:elitesoccer\s+)?esla\s*9\b/i,
  eslaea: /(?:elitesoccer\s+)?esla\s*ea\b/i,
};

function normalizeTeamName(name?: string): string {
  return (name || '').replace(NBSP_REGEX, ' ');
}

const JUNIOR_SUFFIX_REGEX = /\s*\((?:jun\.?[^)]+)\)\s*/gi;

export function displayTeamName(name?: string): string {
  const plain = normalizeTeamName(name);
  const cleaned = plain.replace(JUNIOR_SUFFIX_REGEX, ' ');
  return cleaned.replace(/\s{2,}/g, ' ').trim();
}

function patternForTeamParam(teamParam: string): RegExp {
  const key = (teamParam || '').toLowerCase();
  if (key === 'all') return ANY_ESLA_PATTERN;
  return TEAM_FILTER_PATTERNS[key] ?? ANY_ESLA_PATTERN;
}

export function matchesTeamName(name: string | undefined, teamParam: string): boolean {
  if (!name) return false;
  const pattern = patternForTeamParam(teamParam);
  return pattern.test(normalizeTeamName(name));
}

export function matchesTeamFilter(match: Match, teamParam: string): boolean {
  return matchesTeamName(match.homeTeam, teamParam) || matchesTeamName(match.awayTeam, teamParam);
}

export function toMs(m: Match): number {
  const t = m.time && m.time.length >= 4 ? m.time : '00:00';
  return new Date(`${m.date}T${t}:00`).getTime();
}

export function isEsla(name?: string): boolean {
  if (!name) return false;
  const n = normalizeTeamName(name).toLowerCase();
  return n.includes('esla');
}

export function isEslaTeamName(name?: string): boolean {
  if (!name) return false;
  const n = normalizeTeamName(name);
  return ANY_ESLA_PATTERN.test(n);
}

export function hasScore(m: Match): boolean {
  return typeof m.homeScore === 'number' && typeof m.awayScore === 'number';
}

const LIVE_WINDOW_MS = 100 * 60 * 1000;

const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

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

export function timeUntilMatch(match: Match, opts?: { now?: number | Date }): string {
  const reference = opts?.now instanceof Date ? opts.now.getTime() : typeof opts?.now === 'number' ? opts.now : Date.now();
  const diffMs = toMs(match) - reference;

  if (diffMs <= 0) {
    return 'gleich';
  }

  const minutes = Math.max(1, Math.floor(diffMs / MINUTE_MS));
  if (minutes < 60) {
    if (minutes <= 2) return 'in Kürze';
    if (minutes <= 5) return 'in wenigen Minuten';
    return `in ${minutes} Minuten`;
  }

  const hours = Math.max(1, Math.floor(diffMs / HOUR_MS));
  if (hours < 24) {
    return `in ${hours} ${hours === 1 ? 'Stunde' : 'Stunden'}`;
  }

  const days = Math.max(1, Math.floor(diffMs / DAY_MS));
  return `in ${days} ${days === 1 ? 'Tag' : 'Tagen'}`;
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
    title: `${displayTeamName(match.homeTeam)} vs. ${displayTeamName(match.awayTeam)}`,
    start: startIso,
    durationMinutes: 120,
    location: match.location || undefined,
    description: match.competition || undefined,
    timeZone: 'Europe/Zurich',
  };
}

export function isHomeLocation(loc?: string): boolean {
  if (!loc) return false;
  const s = loc.replace(/\u00A0/g, ' ').toLowerCase();
  return s.includes('sportplatz ruag') || (s.includes('ruag') && s.includes('emmen'));
}

export function normalizeWhitespace(value?: string | null): string | undefined {
  if (typeof value !== 'string') return undefined;
  const cleaned = value.replace(NBSP_REGEX, ' ').replace(/\s+/g, ' ').trim();
  return cleaned || undefined;
}

export function canonicalTeamName(value?: string | null): string {
  const base = (normalizeWhitespace(value) || '').toLowerCase();
  let name = base.replace(/^(?:team\s*)?elitesoccer\s*/, '');
  if (/esla/.test(name) || /elitesoccer/.test(base)) {
    name = name.replace(/\s*\(.*?\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
  }
  // Handle variants like "ESLA 7", "ESLA7", and "ESLA D-7"/"ESLA D7"
  if (/\besla\s*(?:d[-\s]*)?7\b|\besla7\b/.test(name)) return 'esla 7';
  if (/\besla\s*(?:d[-\s]*)?9\b|\besla9\b/.test(name)) return 'esla 9';
  if (/\besla\s*e\s*a\b|\beslaea\b/.test(name)) return 'esla ea';
  return name;
}

export function canonicalTime(value?: string | null): string {
  if (!value) return '';
  const cleaned = normalizeWhitespace(value);
  if (!cleaned) return '';
  const match = cleaned.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return '';
  const hh = match[1].padStart(2, '0');
  const mm = match[2];
  return `${hh}:${mm}`;
}

export function canonicalMatchKey(match: Pick<Match, 'date' | 'time' | 'homeTeam' | 'awayTeam'>): string {
  const time = canonicalTime(match.time) || '00:00';
  return `${match.date}|${time}|${canonicalTeamName(match.homeTeam)}|${canonicalTeamName(match.awayTeam)}`;
}

const VALID_STATUS: Match['status'][] = ['upcoming', 'live', 'finished'];

export function normalizeMatchPayload(payload: Partial<Match>): Partial<Match> {
  const normalized: Partial<Match> = {};

  if (typeof payload.date === 'string') {
    normalized.date = payload.date;
  }

  const timeCanonical = canonicalTime(payload.time);
  if (timeCanonical) {
    normalized.time = timeCanonical;
  } else if (payload.time === '' || payload.time === null) {
    normalized.time = undefined;
  }

  if (typeof payload.homeTeam === 'string') {
    normalized.homeTeam = normalizeWhitespace(payload.homeTeam) || payload.homeTeam.trim();
  }

  if (typeof payload.awayTeam === 'string') {
    normalized.awayTeam = normalizeWhitespace(payload.awayTeam) || payload.awayTeam.trim();
  }

  if (typeof payload.homeScore === 'number') {
    normalized.homeScore = payload.homeScore;
  } else if (payload.homeScore === null) {
    normalized.homeScore = null;
  }

  if (typeof payload.awayScore === 'number') {
    normalized.awayScore = payload.awayScore;
  } else if (payload.awayScore === null) {
    normalized.awayScore = null;
  }

  const location = normalizeWhitespace(payload.location);
  if (location) {
    normalized.location = location;
  } else if (payload.location === '') {
    normalized.location = undefined;
  }

  const competition = normalizeWhitespace(payload.competition);
  if (competition) {
    normalized.competition = competition;
  } else if (payload.competition === '') {
    normalized.competition = undefined;
  }

  if (payload.status && VALID_STATUS.includes(payload.status)) {
    normalized.status = payload.status;
  }

  const matchNumber = normalizeWhitespace(payload.matchNumber);
  if (matchNumber) {
    normalized.matchNumber = matchNumber.split(/\s*\/\s*/)[0];
  } else if (payload.matchNumber === '') {
    normalized.matchNumber = undefined;
  }

  const teamLogo = normalizeWhitespace(payload.teamLogo);
  if (teamLogo) {
    normalized.teamLogo = teamLogo;
  } else if (payload.teamLogo === '') {
    normalized.teamLogo = undefined;
  }

  const notes = normalizeWhitespace((payload as any).notes);
  if (notes) {
    (normalized as any).notes = notes;
  } else if ((payload as any).notes === '') {
    (normalized as any).notes = undefined;
  }

  return normalized;
}
