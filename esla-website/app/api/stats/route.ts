import { NextResponse } from 'next/server';
import { getAllMatches } from '@/lib/kv';
import { computedStatus } from '@/lib/match';
import type { Match } from '@/types';

export const dynamic = 'force-dynamic';

function isEslaTeam(name?: string) {
  if (!name) return false;
  const n = name.replace(/\u00A0/g, ' '); // NBSP -> space
  // Sehr tolerant: zähle jedes Team mit "ESLA" als ESLA-Team
  return /esla/i.test(n);
}

function toNum(v: unknown): number | null {
  if (v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export async function GET() {
  try {
    const matches = await getAllMatches();

    let wins = 0;
    let draws = 0;
    let losses = 0;
    let gf = 0;
    let ga = 0;
    let upcoming = 0;
    let finished = 0;

    for (const match of matches as Match[]) {
      const eslaHome = isEslaTeam(match.homeTeam);
      const eslaAway = isEslaTeam(match.awayTeam);
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

    return NextResponse.json({ wins, draws, losses, gf, ga, upcoming, finished, winRate, total });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to compute stats' }, { status: 500 });
  }
}
