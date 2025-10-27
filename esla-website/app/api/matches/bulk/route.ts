import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { getAllMatches } from '@/lib/kv';
import { isAuthorized } from '@/lib/auth';
import type { Match } from '@/types';
import { canonicalMatchKey, canonicalTime, normalizeMatchPayload } from '@/lib/match';

export const dynamic = 'force-dynamic';

type MatchInput = {
  id?: string;
  date: string; // ISO yyyy-mm-dd
  time?: string | null; // HH:mm
  homeTeam: string;
  awayTeam: string;
  homeScore?: number | null;
  awayScore?: number | null;
  location?: string | null;
  competition?: string | null;
  status?: 'upcoming' | 'finished' | 'live';
  matchNumber?: string | null;
  teamLogo?: string | null;
};

type MatchRecord = Omit<Match, 'id'> & { id: string };

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

function canonTime(t?: string | null): string {
  if (!t) return '';
  const cleaned = normalizeWhitespace(t);
  if (!cleaned) return '';
  const m = cleaned.match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return '';
  const hh = m[1].padStart(2, '0');
  const mm = m[2];
  return `${hh}:${mm}`;
}

function keyOf(m: MatchRecord | MatchInput): string {
  // Missing time is treated like 00:00 so repeated imports with/without time don't duplicate
  const t = canonTime(m.time) || '00:00';
  return `${m.date}|${t}|${canonTeam(m.homeTeam)}|${canonTeam(m.awayTeam)}`;
}

function dedupeNew(base: MatchRecord[], toAdd: MatchRecord[]): MatchRecord[] {
  const seen = new Set(base.map(keyOf));
  const result: MatchRecord[] = [];
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
    let { matches, replace, text } = body as { matches?: Match[]; replace?: boolean; text?: string };
    if (!Array.isArray(matches)) {
      matches = [];
    }

    // If frontend parsing delivered nothing but raw text is provided → parse on server
    if ((!matches || matches.length === 0) && typeof text === 'string' && text.trim().length > 0) {
      const parsedFromText = parseFromText(text);
      matches = parsedFromText as unknown as Match[];
    }

    if (!matches || matches.length === 0) {
      return NextResponse.json({ error: 'No matches to import' }, { status: 400 });
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
    const normalized: MatchRecord[] = matches.map((m, i) => {
      const payload: Match = {
        id: m.id || genId(String(i)),
        date: m.date,
        time: m.time || undefined,
        homeTeam: m.homeTeam,
        awayTeam: m.awayTeam,
        homeScore: m.homeScore ?? undefined,
        awayScore: m.awayScore ?? undefined,
        location: m.location || undefined,
        competition: m.competition || undefined,
        status: m.status || (typeof m.homeScore === 'number' && typeof m.awayScore === 'number' ? 'finished' : 'upcoming'),
        matchNumber: m.matchNumber || undefined,
        teamLogo: m.teamLogo || undefined,
      };
      const normalizedPayload = normalizeMatchPayload(payload);
      return {
        id: payload.id,
        date: normalizedPayload.date || payload.date,
        time: normalizedPayload.time,
        homeTeam: normalizeTeamLabel(normalizedPayload.homeTeam || payload.homeTeam),
        awayTeam: normalizeTeamLabel(normalizedPayload.awayTeam || payload.awayTeam),
        homeScore: normalizedPayload.homeScore ?? null,
        awayScore: normalizedPayload.awayScore ?? null,
        location: normalizedPayload.location,
        competition: normalizedPayload.competition,
        status: normalizedPayload.status || payload.status,
        matchNumber: normalizedPayload.matchNumber,
        teamLogo: normalizedPayload.teamLogo,
      } as MatchRecord;
    });

    let added = 0;
    let updated = 0;
    let skipped = 0;

    // Build index of existing by logical identity (date+teams, time-insensitive)
    const existing = await getAllMatches();
    const byKey = new Map<string, MatchRecord>();
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
        const merged: MatchRecord = { ...ex };
        let changed = false;
        // Wettbewerb: aktualisieren, wenn vorhanden und unterschiedlich
        if ((m.competition || '').trim() && m.competition !== merged.competition) { merged.competition = m.competition!; changed = true; }
        // Ort: immer übernehmen, wenn vorhanden und abweichend
        const nextLocation = normalizeWhitespace(m.location);
        const mergedLocation = normalizeWhitespace(merged.location);
        if (nextLocation && nextLocation !== mergedLocation) {
          merged.location = nextLocation;
          changed = true;
        }
        // Spielnummer: aktualisieren, wenn vorhanden und unterschiedlich
        if (m.matchNumber && m.matchNumber !== merged.matchNumber) { merged.matchNumber = m.matchNumber; changed = true; }
        if ((merged.homeScore === null || typeof merged.homeScore !== 'number') && typeof m.homeScore === 'number') { merged.homeScore = m.homeScore; changed = true; }
        if ((merged.awayScore === null || typeof merged.awayScore !== 'number') && typeof m.awayScore === 'number') { merged.awayScore = m.awayScore; changed = true; }
        // Zeit: aktualisieren, wenn importierte Zeit vorhanden und verschieden
        if ((m.time && m.time !== '') && (m.time !== merged.time)) { merged.time = m.time; changed = true; }
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

// ---- Simple server-side parser as fallback (supports date-blocks like provided sample) ----
function parseFromText(text: string): Match[] {
  const lines = text.split(/\r?\n/).map((l) => l.trim());
  const res: Match[] = [];
  const dateRe = /^(?:Mo|Di|Mi|Do|Fr|Sa|So|Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag)\s+(\d{1,2})[.\/-](\d{1,2})(?:[.\/-](\d{2,4}))?$/i;
  const timeRe = /^\d{1,2}:\d{2}$/;
  const dashRe = /^[-–—]+$/;
  const scoreSingleRe = /^(\d{1,2})\s*[:x-]\s*(\d{1,2})$/;
  const placeholderRe = /^\*$/;
  const matchNumberRe = /^Spielnummer\s*(.+)$/i;
  let currentDateISO: string | undefined;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (!line) continue;
    const dm = line.match(dateRe);
    if (dm) {
      const dd = String(parseInt(dm[1], 10)).padStart(2, '0');
      const mm = String(parseInt(dm[2], 10)).padStart(2, '0');
      const yyyy = dm[3];
      let y = new Date().getFullYear();
      if (yyyy) y = yyyy.length === 2 ? 2000 + parseInt(yyyy, 10) : parseInt(yyyy, 10);
      currentDateISO = `${y}-${mm}-${dd}`;
      continue;
    }
    if (!timeRe.test(line)) continue;
    const t = line;
    const homeRaw = lines[i + 1] || '';
    const dash = lines[i + 2] || '';
    const awayRaw = lines[i + 3] || '';
    if (!dashRe.test(dash) || !homeRaw || !awayRaw) continue;
    let k = i + 4;
    let homeScore: number | null = null;
    let awayScore: number | null = null;
    const s1 = (lines[k] || '').trim();
    if (scoreSingleRe.test(s1)) {
      const m = s1.match(scoreSingleRe)!;
      homeScore = Number(m[1]);
      awayScore = Number(m[2]);
      k += 1;
    } else if ((lines[k] || '').trim().match(/^\d{1,2}$/) && (lines[k + 1] || '').trim().match(/^[:x-]$/) && (lines[k + 2] || '').trim().match(/^\d{1,2}$/)) {
      homeScore = Number(lines[k].trim());
      awayScore = Number(lines[k + 2].trim());
      k += 3;
    } else if (placeholderRe.test((lines[k] || '').trim()) && /^[:x-]$/.test((lines[k + 1] || '').trim()) && placeholderRe.test((lines[k + 2] || '').trim())) {
      k += 3; // * : *
    }
    let matchNumber: string | undefined;
    let competition = '';
    while (k < lines.length) {
      const look = (lines[k] || '').trim();
      if (!look) { k++; continue; }
      const mn = look.match(matchNumberRe);
      if (mn) { matchNumber = mn[1].trim(); k++; continue; }
      if (look && !timeRe.test(look) && !dateRe.test(look) && !dashRe.test(look) && !placeholderRe.test(look) && !scoreSingleRe.test(look)) {
        // Wettbewerb oder Ort – wir nehmen den ersten Nicht-Schlüssel als Wettbewerb
        competition = look;
        k++;
        break;
      }
      break;
    }
    // Ort (optional) – nächste freie Zeile, die kein Datum/Zeit/Score/Trenner ist
    let location: string | undefined;
    const next = (lines[k] || '').trim();
    if (next && !timeRe.test(next) && !dateRe.test(next) && !dashRe.test(next) && !placeholderRe.test(next) && !scoreSingleRe.test(next) && !matchNumberRe.test(next)) {
      location = next;
      k++;
    }
    const normalize = (s: string) => {
      const base = s.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
      let t = base.replace(/^(?:team\s*)?elitesoccer\s*/i, '');
      if (/esla/i.test(t) || /elitesoccer/i.test(base)) t = t.replace(/\s*\(.*?\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
      const l = t.toLowerCase();
      if (/\besla\s*7\b|\besla7\b/.test(l)) return 'ESLA 7';
      if (/\besla\s*9\b|\besla9\b/.test(l)) return 'ESLA 9';
      if (/\besla\s*e\s*a\b|\beslaea\b/.test(l)) return 'ESLA EA';
      if (/elitesoccer/i.test(base)) return t || base;
      return base;
    };
    if (!currentDateISO) { i = k; continue; }
    const match: Match = {
      id: `tmp-${res.length}`,
      date: currentDateISO,
      time: t,
      homeTeam: normalize(homeRaw),
      awayTeam: normalize(awayRaw),
      homeScore: homeScore ?? undefined,
      awayScore: awayScore ?? undefined,
      competition: competition || undefined,
      location,
      status: typeof homeScore === 'number' && typeof awayScore === 'number' ? 'finished' : 'upcoming',
      matchNumber,
    } as Match;
    const n = normalizeMatchPayload(match);
    res.push({ ...(match as any), ...n } as Match);
    i = k - 1;
  }
  return res;
}
