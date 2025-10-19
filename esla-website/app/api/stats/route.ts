import { NextResponse } from 'next/server';
import { getAllMatches } from '@/lib/kv';

export const dynamic = 'force-dynamic';

function isNumber(n: any): n is number {
  return typeof n === 'number' && !Number.isNaN(n);
}

function isEslaTeam(name?: string) {
  if (!name) return false;
  const n = name.replace(/\u00A0/g, ' '); // NBSP -> space
  // Sehr tolerant: zähle jedes Team mit "ESLA" als ESLA-Team
  return /esla/i.test(n);
}

function toMs(date?: string, time?: string): number {
  if (!date) return 0;
  const t = time && time.length >= 4 ? time : '00:00';
  return new Date(`${date}T${t}:00`).getTime();
}

function toNum(v: any): number | null {
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

    const now = Date.now();
    for (const m of matches) {
      const eslaHome = isEslaTeam((m as any).homeTeam);
      const eslaAway = isEslaTeam((m as any).awayTeam);
      const hs = toNum((m as any).homeScore);
      const as = toNum((m as any).awayScore);
      const ms = toMs((m as any).date, (m as any).time);
      const hasScore = hs !== null && as !== null;

      if (!hasScore) {
        if ((m as any).status === 'upcoming' || ms > now) upcoming++;
        continue;
      }

      finished++;

      if (eslaHome && eslaAway) {
        // ESLA vs ESLA: nicht für W/D/L werten, aber als finished zählen
        continue;
      }

      if (eslaHome) {
        gf += hs; ga += as;
        if (hs > as) wins++; else if (hs === as) draws++; else losses++;
      } else if (eslaAway) {
        gf += as; ga += hs;
        if (as > hs) wins++; else if (hs === as) draws++; else losses++;
      }
    }

    const total = wins + draws + losses;
    const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;

    return NextResponse.json({ wins, draws, losses, gf, ga, upcoming, finished, winRate, total });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to compute stats' }, { status: 500 });
  }
}
