import { NextResponse } from 'next/server';
import { getAllMatches } from '@/lib/kv';
import { computedStatus, matchesTeamName } from '@/lib/match';
import type { Match } from '@/types';

export const dynamic = 'force-dynamic';

const TEAM_LABELS = {
  all: 'ESLA',
  esla7: 'ESLA 7',
  esla9: 'ESLA 9',
  eslaea: 'ESLA EA',
} as const;

type TeamKey = keyof typeof TEAM_LABELS;

const isTeamKey = (value: string): value is TeamKey => {
  return value === 'all' || value === 'esla7' || value === 'esla9' || value === 'eslaea';
};

const normalizeTeamParam = (value: string | null): TeamKey => {
  const key = (value || '').toLowerCase();
  return isTeamKey(key) ? key : 'all';
};

function toNum(v: unknown): number | null {
  if (v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const teamParam = normalizeTeamParam(searchParams.get('team'));
    const matches = await getAllMatches();

    let wins = 0;
    let draws = 0;
    let losses = 0;
    let gf = 0;
    let ga = 0;
    let upcoming = 0;
    let finished = 0;

    for (const match of matches as Match[]) {
      const eslaHome = matchesTeamName(match.homeTeam, teamParam);
      const eslaAway = matchesTeamName(match.awayTeam, teamParam);
      const hs = toNum(match.homeScore);
      const as = toNum(match.awayScore);
      const status = computedStatus(match);
      const hasScore = hs !== null && as !== null;

      if (!hasScore) {
        if (status === 'upcoming' || status === 'live') upcoming++;
        continue;
      }

      finished++;

      if (eslaHome && eslaAway) continue; // internes Duell nicht zählen
      if (!eslaHome && !eslaAway) continue;

      if (eslaHome) {
        gf += hs;
        ga += as;
        if (hs > as) wins++;
        else if (hs === as) draws++;
        else losses++;
      } else if (eslaAway) {
        gf += as;
        ga += hs;
        if (as > hs) wins++;
        else if (hs === as) draws++;
        else losses++;
      }
    }

    const total = wins + draws + losses;
    const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;

    return NextResponse.json({
      wins,
      draws,
      losses,
      gf,
      ga,
      upcoming,
      finished,
      winRate,
      total,
      team: teamParam,
      teamLabel: TEAM_LABELS[teamParam],
    });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to compute stats' }, { status: 500 });
  }
}
