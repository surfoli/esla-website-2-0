import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Image from 'next/image';
import Link from 'next/link';
import matchesLocal from '@/data/matches.json';
import { getMatchesPage, getAllMatches } from '@/lib/kv';
import type { Match } from '@/types';
import JoinButton from '@/components/matches/JoinButton';
import FilterBar from '@/components/spiele/FilterBar';
import NowBadge from '@/components/ui/NowBadge';

export const dynamic = 'force-dynamic';

export default async function SpielePage({ searchParams }: { searchParams?: { page?: string; pageSize?: string; filter?: string; status?: string; team?: string } }) {
  let page = Math.max(1, parseInt(searchParams?.page || '1', 10) || 1);
  const pageSize = Math.max(1, Math.min(50, parseInt(searchParams?.pageSize || '20', 10) || 20));
  const legacyFilter = (searchParams?.filter || '').toLowerCase();
  const statusParam = (searchParams?.status || (legacyFilter === 'upcoming' ? 'upcoming' : 'all')).toLowerCase();
  const teamParam = (searchParams?.team || 'all').toLowerCase();
  const useFilters = statusParam !== 'all' || teamParam !== 'all';

  const toMs = (m: Match) => {
    const t = m.time && m.time.length >= 4 ? m.time : '00:00';
    return new Date(`${m.date}T${t}:00`).getTime();
  };

  const isEsla = (s?: string) => (s || '').toLowerCase().replace(/\u00a0/g, ' ').includes('esla');
  const isEslaTeamName = (s?: string) => {
    if (!s) return false;
    const n = s.replace(/\u00a0/g, ' ');
    return /(?:elitesoccer\s+)?esla\b/i.test(n);
  };
  const computedStatus = (m: Match): 'upcoming' | 'finished' => {
    const hasScore = typeof m.homeScore === 'number' && typeof m.awayScore === 'number';
    if (hasScore || m.status === 'finished') return 'finished';
    const ms = toMs(m);
    // Entscheidend ist die Zeit: Vergangenheit => finished, Zukunft => upcoming
    return ms > Date.now() ? 'upcoming' : 'finished';
  };
  const calendarInfo = (match: Match) => {
    const startIso = `${match.date}T${(match.time && match.time.length >= 4 ? match.time : '00:00')}:00`;
    return {
      title: `${match.homeTeam} vs. ${match.awayTeam}`,
      start: startIso,
      durationMinutes: 120,
      location: match.location || undefined,
      description: match.competition || undefined,
    };
  };
  const computeStats = (list: Match[]) => {
    let wins = 0, draws = 0, losses = 0, gf = 0, ga = 0;
    for (const m of list) {
      const hs = typeof m.homeScore === 'number' ? m.homeScore : null;
      const as = typeof m.awayScore === 'number' ? m.awayScore : null;
      if (hs === null || as === null) continue;
      const eslaHome = isEsla(m.homeTeam);
      const eslaAway = isEsla(m.awayTeam);
      if (eslaHome && !eslaAway) {
        gf += hs; ga += as;
        if (hs > as) wins++; else if (hs === as) draws++; else losses++;
      } else if (!eslaHome && eslaAway) {
        gf += as; ga += hs;
        if (as > hs) wins++; else if (hs === as) draws++; else losses++;
      }
    }
    return { wins, draws, losses, gf, ga, total: list.length };
  };

  const matchTeam = (m: Match) => {
    const norm = (s: string) => (s || '').toLowerCase().replace(/\u00a0/g, ' ');
    const h = norm(m.homeTeam || '');
    const a = norm(m.awayTeam || '');
    const text = `${h} ${a}`;
    if (teamParam === 'all') return true;
    if (teamParam === 'esla7') return /(?:elitesoccer\s+)?esla\s*7\b/.test(text);
    if (teamParam === 'esla9') return /(?:elitesoccer\s+)?esla\s*9\b/.test(text);
    if (teamParam === 'eslaea') return /(?:elitesoccer\s+)?esla\s*ea\b/.test(text);
    // generic fallback: any ESLA
    return /(?:elitesoccer\s+)?esla\b/.test(text);
  };

  const matchStatus = (m: Match) => {
    if (statusParam === 'all') return true;
    return statusParam === computedStatus(m);
  };

  let items: Match[] = [];
  let total = 0;
  let totalPages = 1;

  if (useFilters) {
    let all = await getAllMatches();
    if (!all || all.length === 0) {
      all = ((matchesLocal as any)?.matches || []) as Match[];
    }
    const filtered = (all || [])
      .filter(matchTeam)
      .filter(matchStatus)
      .sort((a, b) => {
        // Sortiere: upcoming aufsteigend, finished absteigend
        const aMs = toMs(a);
        const bMs = toMs(b);
        if (statusParam === 'finished') return bMs - aMs;
        return aMs - bMs;
      });
    total = filtered.length;
    totalPages = Math.max(1, Math.ceil(total / pageSize));
    if (page > totalPages) page = totalPages;
    const start = (page - 1) * pageSize;
    const stop = start + pageSize;
    items = filtered.slice(start, stop);
  } else {
    let pageData = await getMatchesPage(page, pageSize);
    items = pageData.items as any;
    total = pageData.total;
    totalPages = pageData.totalPages;
    if ((!items || items.length === 0) && total > 0 && page > totalPages) {
      page = totalPages;
      pageData = await getMatchesPage(page, pageSize);
      items = pageData.items as any;
    }
  }

  if (!items || items.length === 0) {
    let all = ((matchesLocal as any)?.matches || []) as Match[];
    if (useFilters) {
      const filtered = (all || [])
        .filter(matchTeam)
        .filter(matchStatus)
        .sort((a, b) => {
          const aMs = toMs(a);
          const bMs = toMs(b);
          if (statusParam === 'finished') return bMs - aMs;
          return aMs - bMs;
        });
      total = filtered.length;
      totalPages = Math.max(1, Math.ceil(total / pageSize));
      if (page > totalPages) page = totalPages;
      const start = (page - 1) * pageSize;
      const stop = start + pageSize;
      items = filtered.slice(start, stop);
    } else {
      const sorted = all.slice().sort((a, b) => {
        const ta = new Date(`${a.date}T${a.time || '00:00'}:00`).getTime();
        const tb = new Date(`${b.date}T${b.time || '00:00'}:00`).getTime();
        return tb - ta;
      });
      total = sorted.length;
      totalPages = Math.max(1, Math.ceil(total / pageSize));
      if (page > totalPages) page = totalPages;
      const start = (page - 1) * pageSize;
      const stop = start + pageSize;
      items = sorted.slice(start, stop);
    }
  }

  // Compute filtered stats for header KPIs
  let allForStats = await getAllMatches();
  if (!allForStats || allForStats.length === 0) {
    allForStats = ((matchesLocal as any)?.matches || []) as Match[];
  }
  const filteredAllForStats = (allForStats || []).filter(matchTeam).filter(matchStatus);
  const stats = computeStats(filteredAllForStats);
  let finishedCount = 0;
  let upcomingCount = 0;
  for (const m of filteredAllForStats) {
    if (computedStatus(m) === 'finished') finishedCount++; else upcomingCount++;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />
      <div className="pt-32 pb-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 bg-esla-secondary text-white p-10 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <NowBadge />
              <span />
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4">ALLE <span className="text-esla-primary">SPIELE</span></h1>
            <p className="text-white/80 text-xl">Filtere nach Team und Status</p>
            {/* Filterbar */}
            <FilterBar statusParam={statusParam} teamParam={teamParam} pageSize={pageSize} />
          </div>

          <div className="max-w-4xl mx-auto mb-10">
            <div className="bg-black/60 backdrop-blur rounded-3xl border border-white/10 px-5 sm:px-6 py-6 sm:py-8 text-center text-white">
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex flex-col gap-1 items-center">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-black flex items-center gap-3">
                    <span role="img" aria-label="Ball">⚽</span>
                    <span className="text-esla-primary">{stats.gf}</span>
                    <span className="text-white"> : {stats.ga}</span>
                    <span>Tore</span>
                  </span>
                </div>
                <div className="text-xs sm:text-sm md:text-base text-white/80 flex flex-wrap justify-center gap-x-3 gap-y-1">
                  <span role="img" aria-label="Trophäe">🏆</span>
                  <span>{stats.wins} Siege</span>
                  <span>• {stats.losses} Niederlagen</span>
                  <span>• {stats.draws} Unentschieden</span>
                </div>
                <div className="text-xs sm:text-sm md:text-base text-white/80 flex flex-wrap justify-center gap-x-3 gap-y-1">
                  <span role="img" aria-label="Kalender">📅</span>
                  <span>{stats.total} Spiele ({finishedCount} abgeschlossen, {upcomingCount} anstehend)</span>
                </div>
                <div>
                  <span className="text-xs sm:text-sm md:text-base text-esla-accent">Ø {stats.total > 0 ? (stats.gf / stats.total).toFixed(1) : '0.0'} Tore pro Spiel</span>
                </div>
              </div>
            </div>
          </div>

          {/* Matches Grid (paginated) */}
          <div className="grid gap-8">
            {items.map((match) => {
              return (
              <div key={match.id} className="bg-esla-secondary backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 hover:border-esla-primary transition-all duration-300">
                <div className="max-w-[1024px] mx-auto">
                  <div className="grid gap-5">
                    {/* Meta */}
                    <div className="flex flex-col gap-y-1 text-white/70 text-sm">
                      <div>
                        {new Date(`${match.date}T${match.time || '00:00'}:00`).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                        {match.time ? ` | ${match.time}` : ''}
                      </div>
                      {match.location && <div>{match.location}</div>}
                      {match.competition && !/zugeordnet/i.test(match.competition) && (
                        <div className="text-esla-accent font-semibold">{match.competition}</div>
                      )}
                    </div>

                    {/* Teams + Score centered */}
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-6">
                      {/* Home */}
                      <div className="min-w-0 md:justify-self-end">
                        <div className="flex items-start sm:items-center gap-x-3 justify-end">
                          <span className="font-semibold text-base sm:text-lg md:text-xl leading-snug break-words text-right text-white">{match.homeTeam}</span>
                        </div>
                      </div>
                      {/* Score */}
                      <div className="justify-self-center">
                        <div className="bg-esla-dark/50 rounded-xl px-4 py-2 sm:px-5 sm:py-3 min-w-[88px] sm:min-w-[104px] text-center">
                          <div className="text-xl sm:text-2xl md:text-3xl font-black text-white">
                            {typeof match.homeScore === 'number' && typeof match.awayScore === 'number' ? (
                              <>
                                <span className="text-white">{match.homeScore}</span>
                                <span className="text-white/50 mx-2">:</span>
                                <span className="text-white">{match.awayScore}</span>
                              </>
                            ) : (
                              <span className="text-white text-lg sm:text-xl">vs.</span>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Away */}
                      <div className="min-w-0">
                        <div className="flex items-start sm:items-center gap-x-3">
                          <span className="font-semibold text-base sm:text-lg md:text-xl leading-snug break-words text-white">{match.awayTeam}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status + Join */}
                    <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 mt-1">
                      {(() => {
                        const status = computedStatus(match);
                        if (status === 'upcoming') {
                          return <span className="text-lg font-bold text-white/80">ANSTEHEND</span>;
                        }
                        const hasScore = typeof match.homeScore === 'number' && typeof match.awayScore === 'number';
                        if (!hasScore) {
                          return <span className="text-xs sm:text-sm font-semibold text-white/80 bg-white/10 px-3 py-1 rounded-full">RESULTATE FOLGEN</span>;
                        }
                        const eslaHome = isEslaTeamName(match.homeTeam);
                        const eslaAway = isEslaTeamName(match.awayTeam);
                        if (eslaHome || eslaAway) {
                          const hs = match.homeScore as number; const as = match.awayScore as number;
                          if (hs === as) return <span className="text-xs sm:text-sm font-bold bg-yellow-500 text-black px-3 py-1 rounded-full">UNENTSCHIEDEN</span>;
                          const eslaWon = (eslaHome && hs > as) || (eslaAway && as > hs);
                          return eslaWon
                            ? <span className="text-xs sm:text-sm font-bold bg-green-600 text-white px-3 py-1 rounded-full">GEWONNEN</span>
                            : <span className="text-xs sm:text-sm font-bold bg-red-600 text-white px-3 py-1 rounded-full">VERLOREN</span>;
                        }
                        return <span className="text-lg font-bold text-white/80">ABGESCHLOSSEN</span>;
                      })()}
                      {computedStatus(match) === 'upcoming' ? (
                        <JoinButton
                          matchId={match.id}
                          label="Klick hier wenn du teilnimmst!"
                          leaveText="Schade, dass du doch nicht dabei bist!"
                          calendar={calendarInfo(match)}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );})}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-6 mt-12">
            <Link href={`/spiele?status=${statusParam}&team=${teamParam}&page=${Math.max(1, page - 1)}&pageSize=${pageSize}`} className={`px-5 py-3 rounded-full border ${page > 1 ? 'text-esla-secondary border-slate-300 hover:bg-slate-100' : 'text-slate-400 border-slate-200 pointer-events-none'}`}>Zurück</Link>
            <span className="text-esla-secondary/70">Seite {page} / {totalPages}</span>
            <Link href={`/spiele?status=${statusParam}&team=${teamParam}&page=${Math.min(totalPages, page + 1)}&pageSize=${pageSize}`} className={`px-5 py-3 rounded-full border ${page < totalPages ? 'text-esla-secondary border-slate-300 hover:bg-slate-100' : 'text-slate-400 border-slate-200 pointer-events-none'}`}>Weiter</Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
