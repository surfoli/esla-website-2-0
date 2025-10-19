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

function dedupe(base: Match[], toAdd: Match[]): Match[] {
  const seen = new Set(base.map(m => `${m.date}|${m.time||''}|${m.homeTeam}|${m.awayTeam}`));
  const merged = [...base];
  for (const m of toAdd) {
    const key = `${m.date}|${m.time||''}|${m.homeTeam}|${m.awayTeam}`;
    if (!seen.has(key)) {
      merged.push(m);
      seen.add(key);
    }
  }
  return merged;
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
    const normalized: Match[] = matches.map((m, i) => ({
      id: m.id || genId(String(i)),
      date: m.date,
      time: m.time || undefined,
      homeTeam: m.homeTeam,
      awayTeam: m.awayTeam,
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
      toWrite = dedupe(existing, normalized);
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
