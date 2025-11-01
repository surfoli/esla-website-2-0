import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Link from 'next/link';
import matchesFallback from '@/data/matches-fallback';
import { getMatchesPage, getAllMatches } from '@/lib/kv';
import type { Match } from '@/types';
import FilterBar from '@/components/spiele/FilterBar';
import NowBadge from '@/components/ui/NowBadge';
import StatsBadge from '@/components/ui/StatsBadge';
import Container from '@/components/ui/Container';
import MatchCard from '@/components/matches/MatchCard';
import { computedStatus, compareByDateAsc, compareByDateDesc, comparatorForStatus } from '@/lib/match';
import HeroGradientCard from '@/components/ui/HeroGradientCard';

export const dynamic = 'force-dynamic';

type MatchesSearchParams = {
  page?: string;
  pageSize?: string;
  filter?: string;
  status?: string;
  team?: string;
};

export default async function SpielePage({ searchParams }: { searchParams?: Promise<any> }) {
  const resolvedSearchParams: MatchesSearchParams = (await searchParams) ?? {};

  let page = Math.max(1, parseInt(resolvedSearchParams.page || '1', 10) || 1);
  const pageSize = Math.max(1, Math.min(50, parseInt(resolvedSearchParams.pageSize || '20', 10) || 20));
  const legacyFilter = (resolvedSearchParams.filter || '').toLowerCase();
  const statusParam = (resolvedSearchParams.status || (legacyFilter === 'upcoming' ? 'upcoming' : 'all')).toLowerCase();
  const teamParam = (resolvedSearchParams.team || 'all').toLowerCase();
  const useFilters = statusParam !== 'all' || teamParam !== 'all';

  const todayCH = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Zurich',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

  const fallbackMatches = matchesFallback.matches ?? [];
  const kvMatches = await getAllMatches();

  const mergeWithFallback = (primary: Match[]): Match[] => {
    if (primary.length === 0) return fallbackMatches;
    if (fallbackMatches.length === 0) return primary;
    const seen = new Set(primary.map((m) => m.id));
    const additional = fallbackMatches.filter((m) => !seen.has(m.id));
    return [...primary, ...additional];
  };

  const isEsla = (s?: string) => (s || '').toLowerCase().replace(/\u00a0/g, ' ').includes('esla');
  const isEslaTeamName = (s?: string) => {
    if (!s) return false;
    const n = s.replace(/\u00a0/g, ' ');
    return /(?:elitesoccer\s+)?esla\b/i.test(n);
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
    if (statusParam === 'today') return (m.date || '').startsWith(todayCH);
    const s = computedStatus(m);
    if (statusParam === 'upcoming') return s === 'upcoming' || s === 'live';
    if (statusParam === 'live') return s === 'live';
    return s === 'finished';
  };

  const combinedMatches = mergeWithFallback(kvMatches);

  let items: Match[] = [];
  let total = 0;
  let totalPages = 1;

  if (useFilters) {
    const filtered = combinedMatches
      .filter(matchTeam)
      .filter(matchStatus)
      .sort(comparatorForStatus(statusParam));
    total = filtered.length;
    totalPages = Math.max(1, Math.ceil(total / pageSize));
    page = Math.min(page, totalPages);
    const start = (page - 1) * pageSize;
    items = filtered.slice(start, start + pageSize);
  } else {
    let pageData = await getMatchesPage(page, pageSize);
    items = pageData.items;
    total = pageData.total;
    totalPages = pageData.totalPages;

    if (items.length === 0 && total > 0 && page > totalPages) {
      page = totalPages;
      pageData = await getMatchesPage(page, pageSize);
      items = pageData.items;
      total = pageData.total;
      totalPages = pageData.totalPages;
    }

    if (items.length === 0 && combinedMatches.length > 0) {
      const sorted = combinedMatches.slice().sort(compareByDateDesc);
      total = sorted.length;
      totalPages = Math.max(1, Math.ceil(total / pageSize));
      page = Math.min(page, totalPages);
      const start = (page - 1) * pageSize;
      items = sorted.slice(start, start + pageSize);
    }
  }

  // Build grouped lists when showing all statuses
  const matchesForSections: Match[] = statusParam === 'all' ? combinedMatches : [];
  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;
  const prevPage = hasPrevPage ? page - 1 : page;
  const nextPage = hasNextPage ? page + 1 : page;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />
      <div className="pt-40 md:pt-32 pb-20">
        {/* Header breit wie Über-uns */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <HeroGradientCard className="relative mb-12 p-8 md:p-12 text-center">
            <div className="flex items-center justify-between mb-4 gap-4">
              <NowBadge />
              <div className="flex flex-col items-end gap-2 text-right">
                <StatsBadge />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4">ALLE <span className="text-esla-primary">SPIELE</span></h1>
            <p className="text-white/80 text-xl">Filtere nach Team und Status</p>
            {/* Filterbar */}
            <FilterBar key={`${statusParam}-${teamParam}`} statusParam={statusParam} teamParam={teamParam} pageSize={pageSize} />
            <div className="absolute bottom-6 right-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm font-semibold text-white/90">
              {total === 1 ? '1 Suchergebnis' : `${total} Suchergebnisse`}
            </div>
          </HeroGradientCard>
        </div>
        <Container>
          {statusParam === 'all' ? (
            <>
              {(() => {
                const live = matchesForSections
                  .filter(matchTeam)
                  .filter((m: Match) => computedStatus(m) === 'live')
                  .sort(compareByDateAsc);
                if (live.length === 0) return null;
                return (
                  <section className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-black text-esla-secondary mb-4">Aktuelle Spiele</h2>
                    <div className="grid gap-8">
                      {live.map((m: Match) => (
                        <MatchCard key={m.id} match={m} fullWidth />
                      ))}
                    </div>
                  </section>
                );
              })()}

              {(() => {
                const upcoming = matchesForSections
                  .filter(matchTeam)
                  .filter((m: Match) => computedStatus(m) === 'upcoming')
                  .sort(compareByDateAsc);
                if (upcoming.length === 0) return null;
                return (
                  <section className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-black text-esla-secondary mb-4">Anstehende Spiele</h2>
                    <div className="grid gap-8">
                      {upcoming.map((m: Match) => (
                        <MatchCard key={m.id} match={m} fullWidth />
                      ))}
                    </div>
                  </section>
                );
              })()}

              {(() => {
                const finished = matchesForSections
                  .filter(matchTeam)
                  .filter((m: Match) => computedStatus(m) === 'finished')
                  .sort(compareByDateDesc);
                if (finished.length === 0) return null;
                return (
                  <section className="mt-14">
                    <h2 className="text-2xl md:text-3xl font-black text-esla-secondary mb-4">Beendete Spiele</h2>
                    <div className="grid gap-8">
                      {finished.map((m: Match) => (
                        <MatchCard key={m.id} match={m} fullWidth />
                      ))}
                    </div>
                  </section>
                );
              })()}
            </>
          ) : (
            <>
              {items.length === 0 ? (
                <div className="text-center text-esla-secondary/80 py-12">
                  {statusParam === 'upcoming'
                    ? 'Leider keine anstehenden Spiele geplant.'
                    : statusParam === 'live'
                      ? 'Aktuell keine laufenden Spiele.'
                      : statusParam === 'today'
                        ? 'Heute stehen keine Spiele an.'
                        : 'Noch keine beendeten Spiele vorhanden.'}
                </div>
              ) : (
                <div className="grid gap-8">
                  {items.map((match: Match) => (
                    <MatchCard key={match.id} match={match} fullWidth />
                  ))}
                </div>
              )}
              {/* Pagination */}
              {items.length > 0 && (hasPrevPage || hasNextPage) && (
                <div className="flex justify-center items-center gap-6 mt-12">
                  {hasPrevPage && (
                    <Link
                      href={`/spiele?status=${statusParam}&team=${teamParam}&page=${prevPage}&pageSize=${pageSize}`}
                      className="px-5 py-3 rounded-full border border-black text-white bg-black hover:bg-slate-800"
                    >
                      Zurück
                    </Link>
                  )}
                  <span className="text-esla-secondary/70">Seite {page} / {totalPages}</span>
                  {hasNextPage && (
                    <Link
                      href={`/spiele?status=${statusParam}&team=${teamParam}&page=${nextPage}&pageSize=${pageSize}`}
                      className="px-5 py-3 rounded-full border border-black text-white bg-black hover:bg-slate-800"
                    >
                      Weiter
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </Container>
      </div>
      <Footer />
    </main>
  );
}
