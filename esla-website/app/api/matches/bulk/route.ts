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
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const NBSP_REGEX = /\u00a0/g;

function normalizeWhitespace(value?: string | null): string | undefined {
  if (typeof value !== 'string') return undefined;
  const cleaned = value.replace(NBSP_REGEX, ' ').replace(/\s+/g, ' ').trim();
  return cleaned || undefined;
}

function canonTeam(s?: string): string {
  const base = (normalizeWhitespace(s) || '').toLowerCase();
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
      const base = normalizeWhitespace(s) || '';
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
    const normalizeMatchNumber = (value?: string | null) => {
      const cleaned = normalizeWhitespace(value);
      if (!cleaned) return undefined;
      return cleaned.split(/\s*\/\s*/)[0];
    };
    const normalized: Match[] = matches.map((m, i) => {
      const normalizedTime = normalizeWhitespace(m.time);
      const time = normalizedTime && /^\d{1,2}:\d{2}$/.test(normalizedTime) ? normalizedTime : undefined;

      return {
        id: m.id || genId(String(i)),
        date: m.date,
        time,
        homeTeam: normalizeTeamLabel(m.homeTeam),
        awayTeam: normalizeTeamLabel(m.awayTeam),
        homeScore: m.homeScore ?? null,
        awayScore: m.awayScore ?? null,
        location: normalizeWhitespace(m.location),
        competition: normalizeWhitespace(m.competition),
        status: m.status || (typeof m.homeScore === 'number' && typeof m.awayScore === 'number' ? 'finished' : 'upcoming'),
        matchNumber: normalizeMatchNumber(m.matchNumber),
        teamLogo: normalizeWhitespace(m.teamLogo),
      };
    });

    let added = 0;
    let updated = 0;
    let skipped = 0;

    // Build index of existing by logical identity (date+teams, time-insensitive)
    const existing = await getAllMatches();
    const byKey = new Map<string, Match>();
    for (const ex of existing) {
      const kExact = keyOf(ex);
      byKey.set(kExact, ex);
      const t = canonTime(ex.time);
      if (t && t !== '00:00') {
        const kZero = `${ex.date}|00:00|${canonTeam(ex.homeTeam)}|${canonTeam(ex.awayTeam)}`;
        if (!byKey.has(kZero)) byKey.set(kZero, ex);
      }
    }

    if (replace) {
      await kv.del(MATCH_INDEX_KEY);
    }

    for (const m of normalized) {
      const key = keyOf(m);
      const t = canonTime(m.time) || '00:00';
      const zeroKey = `${m.date}|00:00|${canonTeam(m.homeTeam)}|${canonTeam(m.awayTeam)}`;
      const ex = byKey.get(key) || byKey.get(zeroKey);

      if (ex && !replace) {
        // Upsert: fill only previously missing fields
        const merged: Match = { ...ex };
        let changed = false;
        if ((!merged.competition || merged.competition.trim() === '') && (m.competition || '').trim()) { merged.competition = m.competition!; changed = true; }
        const nextLocation = normalizeWhitespace(m.location);
        const mergedLocation = normalizeWhitespace(merged.location);
        if (nextLocation && nextLocation !== mergedLocation) {
          merged.location = nextLocation;
          changed = true;
        }
        if (!merged.matchNumber && m.matchNumber) { merged.matchNumber = m.matchNumber; changed = true; }
        if ((merged.homeScore === null || typeof merged.homeScore !== 'number') && typeof m.homeScore === 'number') { merged.homeScore = m.homeScore; changed = true; }
        if ((merged.awayScore === null || typeof merged.awayScore !== 'number') && typeof m.awayScore === 'number') { merged.awayScore = m.awayScore; changed = true; }
        if ((!merged.time || merged.time === '') && (m.time && m.time !== '')) { merged.time = m.time; changed = true; }
        if (changed) {
          merged.status = (typeof merged.homeScore === 'number' && typeof merged.awayScore === 'number') ? 'finished' : (merged.status || m.status);
          await kv.set(matchKey(ex.id!), merged);
          await kv.zadd(MATCH_INDEX_KEY, { score: toUnixScore(merged.date, merged.time), member: ex.id! });
          updated += 1;
        } else {
          skipped += 1;
        }
      } else {
        // New record (or replace mode)
        const id = m.id || genId('m');
        const rec: Match = { ...m, id } as Match;
        await kv.set(matchKey(id), rec);
        await kv.zadd(MATCH_INDEX_KEY, { score: toUnixScore(rec.date, rec.time), member: id });
        byKey.set(key, rec);
        if (t !== '00:00') byKey.set(zeroKey, rec);
        added += 1;
      }
    }

    const total = await kv.zcard(MATCH_INDEX_KEY);
    return NextResponse.json({ ok: true, added, updated, skipped, total });
  } catch (err) {
    console.error('Bulk import error:', err);
    return NextResponse.json({ error: 'Failed to import' }, { status: 500 });
  }
}
