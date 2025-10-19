import { kv } from '@vercel/kv';
import type { Match } from '@/types';

const MATCHES_KEY = 'esla:matches';
const TEAMS_KEY = 'esla:teams';

// New per-match key model + sorted index
const MATCH_KEY_PREFIX = 'esla:match:'; // esla:match:<id>
const MATCH_INDEX_KEY = 'esla:matches:byDate'; // ZSET with score = unix timestamp

function matchKey(id: string) {
  return `${MATCH_KEY_PREFIX}${id}`;
}

function toUnixScore(date: string, time?: string): number {
  try {
    const t = (time && time.length >= 4) ? time : '00:00';
    const d = new Date(`${date}T${t}:00`);
    return Math.floor(d.getTime() / 1000);
  } catch {
    return 0;
  }
}

export interface Team {
  id: string;
  name: string;          // e.g. "ESLA 9"
  short?: string;        // e.g. "ESLA9"
  logoUrl?: string;      // /images/logos/esla9.png oder https://...
  primaryColor?: string; // optional Hex
}

export async function getAllMatches(): Promise<Match[]> {
  try {
    const ids = (await kv.zrange(MATCH_INDEX_KEY, 0, -1, { rev: true })) as string[];
    if (!ids || ids.length === 0) return [];
    const keys = ids.map((id: string) => matchKey(id));
    const rows = (await kv.mget(...keys)) as (Match | null)[];
    return rows.filter(Boolean) as Match[];
  } catch (error) {
    console.error('Error fetching matches:', error);
    return [];
  }
}

export async function getMatchById(id: string): Promise<Match | null> {
  const m = (await kv.get(matchKey(id))) as Match | null;
  return m || null;
}

export async function createMatch(match: Omit<Match, 'id'>): Promise<Match> {
  const id = Date.now().toString();
  const newMatch = { ...(match as any), id } as Match;
  await kv.set(matchKey(id), newMatch);
  const score = toUnixScore((newMatch as any).date, (newMatch as any).time);
  await kv.zadd(MATCH_INDEX_KEY, { score, member: id });
  return newMatch;
}

export async function updateMatch(id: string, updates: Partial<Match>): Promise<Match | null> {
  const key = matchKey(id);
  const current = (await kv.get(key)) as Match | null;
  if (!current) return null;
  const updated = { ...current, ...updates } as Match;
  await kv.set(key, updated);
  // if date/time changed, update score
  const score = toUnixScore((updated as any).date, (updated as any).time);
  await kv.zadd(MATCH_INDEX_KEY, { score, member: id });
  return updated;
}

export async function deleteMatch(id: string): Promise<boolean> {
  await kv.del(matchKey(id));
  await kv.zrem(MATCH_INDEX_KEY, id);
  return true;
}

// Recent and pagination helpers
export async function getRecentMatches(limit: number): Promise<Match[]> {
  const lim = Math.max(1, Math.min(limit, 100));
  const ids = (await kv.zrange(MATCH_INDEX_KEY, 0, lim - 1, { rev: true })) as string[];
  if (!ids || ids.length === 0) return [];
  const keys = ids.map((id: string) => matchKey(id));
  const rows = (await kv.mget(...keys)) as (Match | null)[];
  return rows.filter(Boolean) as Match[];
}

export async function getMatchesPage(page: number, pageSize: number): Promise<{ items: Match[]; page: number; pageSize: number; total: number; totalPages: number; }>
{
  const p = Math.max(1, Math.floor(page || 1));
  const ps = Math.max(1, Math.min(200, Math.floor(pageSize || 20)));
  const start = (p - 1) * ps;
  const stop = start + ps - 1;
  const ids = (await kv.zrange(MATCH_INDEX_KEY, start, stop, { rev: true })) as string[];
  const total = (await kv.zcard(MATCH_INDEX_KEY)) as number;
  if (!ids || ids.length === 0) {
    return { items: [], page: p, pageSize: ps, total, totalPages: Math.ceil(total / ps) };
  }
  const keys = ids.map((id: string) => matchKey(id));
  const rows = (await kv.mget(...keys)) as (Match | null)[];
  const items = rows.filter(Boolean) as Match[];
  const totalPages = Math.max(1, Math.ceil(total / ps));
  return { items, page: p, pageSize: ps, total, totalPages };
}

// -------- Teams CRUD --------
export async function getAllTeams(): Promise<Team[]> {
  try {
    const teams = await kv.get<Team[]>(TEAMS_KEY);
    return teams || [];
  } catch (e) {
    console.error('Error fetching teams:', e);
    return [];
  }
}

export async function getTeamById(id: string): Promise<Team | null> {
  const teams = await getAllTeams();
  return teams.find(t => t.id === id) || null;
}

export async function getTeamByName(name: string): Promise<Team | null> {
  const teams = await getAllTeams();
  return teams.find(t => t.name.toLowerCase() === name.toLowerCase()) || null;
}

export async function createTeam(team: Omit<Team, 'id'>): Promise<Team> {
  const teams = await getAllTeams();
  const newTeam: Team = { id: Date.now().toString(), ...team };
  teams.push(newTeam);
  await kv.set(TEAMS_KEY, teams);
  return newTeam;
}

export async function updateTeam(id: string, updates: Partial<Team>): Promise<Team | null> {
  const teams = await getAllTeams();
  const idx = teams.findIndex(t => t.id === id);
  if (idx === -1) return null;
  teams[idx] = { ...teams[idx], ...updates };
  await kv.set(TEAMS_KEY, teams);
  return teams[idx];
}

export async function deleteTeam(id: string): Promise<boolean> {
  const teams = await getAllTeams();
  const filtered = teams.filter(t => t.id !== id);
  if (filtered.length === teams.length) return false;
  await kv.set(TEAMS_KEY, filtered);
  return true;
}
