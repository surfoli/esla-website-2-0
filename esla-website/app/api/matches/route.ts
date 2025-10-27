import { NextResponse } from 'next/server';
import { getAllMatches, getRecentMatches, getMatchesPage, createMatch } from '@/lib/kv';
import { isAuthorized } from '@/lib/auth';
import { compareByDateAsc, compareByDateDesc, toMs } from '@/lib/match';
import matchesFallback from '@/data/matches-fallback';
import type { Match } from '@/types';

export const dynamic = 'force-dynamic';

const VALID_STATUS: Match['status'][] = ['upcoming', 'live', 'finished'];

function isMatchRecord(value: unknown): value is Match {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<Match>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.date === 'string' &&
    typeof candidate.homeTeam === 'string' &&
    typeof candidate.awayTeam === 'string' &&
    (!candidate.status || VALID_STATUS.includes(candidate.status))
  );
}

function selectFallbackMatches(): Match[] {
  return matchesFallback.matches ?? [];
}

function sanitizeCreatePayload(value: unknown): Omit<Match, 'id'> | null {
  if (!value || typeof value !== 'object') return null;
  const candidate = value as Partial<Match> & { matchNumber?: string };
  if (typeof candidate.date !== 'string') return null;
  if (typeof candidate.homeTeam !== 'string' || typeof candidate.awayTeam !== 'string') return null;
  const status = candidate.status && VALID_STATUS.includes(candidate.status) ? candidate.status : 'upcoming';
  const homeScore = typeof candidate.homeScore === 'number' ? candidate.homeScore : undefined;
  const awayScore = typeof candidate.awayScore === 'number' ? candidate.awayScore : undefined;

  return {
    date: candidate.date,
    time: typeof candidate.time === 'string' ? candidate.time : undefined,
    homeTeam: candidate.homeTeam,
    awayTeam: candidate.awayTeam,
    homeScore,
    awayScore,
    location: typeof candidate.location === 'string' && candidate.location.trim() ? candidate.location : undefined,
    competition: typeof candidate.competition === 'string' && candidate.competition.trim() ? candidate.competition : undefined,
    status,
    teamLogo: typeof candidate.teamLogo === 'string' ? candidate.teamLogo : undefined,
    matchNumber: typeof candidate.matchNumber === 'string' && candidate.matchNumber.trim() ? candidate.matchNumber : undefined,
  };
}

// GET all matches
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const source = url.searchParams.get('source');
    const kvOnly = source === 'kv';
    const upcomingOnly = url.searchParams.get('upcoming') === '1' || url.searchParams.get('upcoming') === 'true';
    const limitParam = url.searchParams.get('limit');
    const pageParam = url.searchParams.get('page');
    const pageSizeParam = url.searchParams.get('pageSize');

    if (upcomingOnly) {
      const limit = Math.max(1, Math.min(100, parseInt(limitParam || '10', 10) || 10));
      const kvMatches = await getAllMatches();
      const base = kvMatches.length > 0 || kvOnly ? kvMatches : selectFallbackMatches();
      const now = Date.now();
      const filtered = base
        .filter((match) => toMs(match) > now)
        .sort(compareByDateAsc)
        .slice(0, limit);
      return NextResponse.json(filtered);
    }

    if (limitParam) {
      const limit = Math.max(1, Math.min(100, parseInt(limitParam || '0', 10) || 0));
      let items = await getRecentMatches(limit);
      if ((!items || items.length === 0) && !kvOnly) {
        const fallback = selectFallbackMatches().slice().sort(compareByDateDesc).slice(0, limit);
        items = fallback;
      }
      return NextResponse.json(items || []);
    }

    if (pageParam || pageSizeParam) {
      const page = Math.max(1, parseInt(pageParam || '1', 10) || 1);
      const pageSize = Math.max(1, Math.min(200, parseInt(pageSizeParam || '20', 10) || 20));
      let pageData = await getMatchesPage(page, pageSize);
      if ((!pageData.items || pageData.items.length === 0) && !kvOnly) {
        const sorted = selectFallbackMatches().slice().sort(compareByDateDesc);
        const total = sorted.length;
        const start = (page - 1) * pageSize;
        const stop = start + pageSize;
        const items = sorted.slice(start, stop);
        pageData = {
          items,
          page,
          pageSize,
          total,
          totalPages: Math.max(1, Math.ceil(total / pageSize)),
        };
      }
      return NextResponse.json(pageData);
    }

    const matches = await getAllMatches();
    if (Array.isArray(matches) && matches.length > 0) {
      return NextResponse.json(matches);
    }
    if (!kvOnly) {
      const fallback = selectFallbackMatches();
      if (fallback.length > 0) {
        return NextResponse.json(fallback);
      }
    }
    return NextResponse.json([]);
  } catch (error) {
    console.error('Error fetching matches:', error);
    return NextResponse.json({ error: 'Failed to fetch matches' }, { status: 500 });
  }
}

// POST create new match
export async function POST(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await request.json();
    const sanitized = sanitizeCreatePayload(payload);
    if (!sanitized) {
      return NextResponse.json({ error: 'Invalid match payload' }, { status: 400 });
    }

    const newMatch = await createMatch(sanitized);
    return NextResponse.json(newMatch, { status: 201 });
  } catch (error) {
    console.error('Error creating match:', error);
    return NextResponse.json({ error: 'Failed to create match' }, { status: 500 });
  }
}
