import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { getAllMatches } from '@/lib/kv';
import { isAuthorized } from '@/lib/auth';

export const dynamic = 'force-dynamic';

interface Match {
  id?: string;
  date: string; // ISO yyyy-mm-dd
  time?: string; // HH:mm
  homeTeam: string;
  awayTeam: string;
  homeScore?: number | null;
  awayScore?: number | null;
  location?: string;
  competition?: string;
  status: 'upcoming' | 'finished' | 'live';
  matchNumber?: string;
  teamLogo?: string;
}

function genId(prefix = 'm'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
}

function canonTeam(s?: string): string {
  const base = (s || '')
    .toLowerCase()
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  let t = base.replace(/^(?:team\s*)?elitesoccer\s*/, '');
  // remove light qualifiers in parentheses for ESLA variants
  if (/esla/.test(t) || /elitesoccer/.test(base)) {
    t = t.replace(/\s*\(.*?\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
  }
  if (/\besla\s*7\b|\besla7\b/.test(t)) return 'esla 7';
  if (/\besla\s*9\b|\besla9\b/.test(t)) return 'esla 9';
  if (/\besla\s*e\s*a\b|\beslaea\b/.test(t)) return 'esla ea';
  return t;
}

function canonTime(t?: string): string {
  if (!t) return '';
  const m = t.match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return '';
  const hh = m[1].padStart(2, '0');
  const mm = m[2];
  return `${hh}:${mm}`;
}

function keyOf(m: Match): string {
  // Missing time is treated like 00:00 so repeated imports with/without time don't duplicate
  const t = canonTime(m.time) || '00:00';
  return `${m.date}|${t}|${canonTeam(m.homeTeam)}|${canonTeam(m.awayTeam)}`;
}

function dedupeNew(base: Match[], toAdd: Match[]): Match[] {
  const seen = new Set(base.map(keyOf));
  const result: Match[] = [];
  for (const m of toAdd) {
    const key = keyOf(m);
    if (!seen.has(key)) {
      result.push(m);
      seen.add(key); // also prevent duplicates within the same batch
    }
  }
  return result;
}

const MATCH_KEY_PREFIX = 'esla:match:';
const MATCH_INDEX_KEY = 'esla:matches:byDate';
function matchKey(id: string) { return `${MATCH_KEY_PREFIX}${id}`; }
function toUnixScore(date: string, time?: string): number {
  try {
    const t = (time && time.length >= 4) ? time : '00:00';
    return Math.floor(new Date(`${date}T${t}:00`).getTime() / 1000);
  } catch {
    return 0;
  }
}

export async function POST(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { matches, replace } = body as { matches: Match[]; replace?: boolean };
    if (!Array.isArray(matches)) {
      return NextResponse.json({ error: 'Invalid payload: matches[] required' }, { status: 400 });
    }

    // Normalize incoming
    const normalizeTeamLabel = (s?: string): string => {
      const base = (s || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
      let t = base.replace(/^(?:team\s*)?elitesoccer\s*/i, '');
      if (/esla/i.test(t) || /elitesoccer/i.test(base)) {
        t = t.replace(/\s*\(.*?\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
      }
      const l = t.toLowerCase();
      if (/\besla\s*7\b|\besla7\b/.test(l)) return 'ESLA 7';
      if (/\besla\s*9\b|\besla9\b/.test(l)) return 'ESLA 9';
      if (/\besla\s*e\s*a\b|\beslaea\b/.test(l)) return 'ESLA EA';
      return base;
    };
    const normalized: Match[] = matches.map((m, i) => ({
      id: m.id || genId(String(i)),
      date: m.date,
      time: m.time || undefined,
      homeTeam: normalizeTeamLabel(m.homeTeam),
      awayTeam: normalizeTeamLabel(m.awayTeam),
      homeScore: m.homeScore ?? null,
      awayScore: m.awayScore ?? null,
      location: m.location || '',
      competition: m.competition || '',
      status: m.status || (typeof m.homeScore === 'number' && typeof m.awayScore === 'number' ? 'finished' : 'upcoming'),
      matchNumber: m.matchNumber || undefined,
      teamLogo: m.teamLogo || undefined,
    }));

    let toWrite: Match[] = normalized;
    if (!replace) {
      const existing = await getAllMatches();
      toWrite = dedupeNew(existing, normalized);
    } else {
      // Reset index when replacing; stale per-match keys are ignored afterwards
      await kv.del(MATCH_INDEX_KEY);
    }

    for (const m of toWrite) {
      const id = m.id!;
      await kv.set(matchKey(id), m);
      await kv.zadd(MATCH_INDEX_KEY, { score: toUnixScore(m.date, m.time), member: id });
    }

    const total = await kv.zcard(MATCH_INDEX_KEY);
    return NextResponse.json({ ok: true, added: toWrite.length, total });
  } catch (err) {
    console.error('Bulk import error:', err);
    return NextResponse.json({ error: 'Failed to import' }, { status: 500 });
  }
}
