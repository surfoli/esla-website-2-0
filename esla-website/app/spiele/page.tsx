import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Link from 'next/link';
import matchesLocal from '@/data/matches.json';
import { getMatchesPage, getAllMatches } from '@/lib/kv';
import type { Match } from '@/types';
import FilterBar from '@/components/spiele/FilterBar';
import NowBadge from '@/components/ui/NowBadge';
import StatsBadge from '@/components/ui/StatsBadge';
import Container from '@/components/ui/Container';
import MatchCard from '@/components/matches/MatchCard';
import { computedStatus, compareByDateAsc, compareByDateDesc, comparatorForStatus } from '@/lib/match';

export const dynamic = 'force-dynamic';

export default async function SpielePage({ searchParams }: { searchParams?: { page?: string; pageSize?: string; filter?: string; status?: string; team?: string } }) {
  let page = Math.max(1, parseInt(searchParams?.page || '1', 10) || 1);
  const pageSize = Math.max(1, Math.min(50, parseInt(searchParams?.pageSize || '20', 10) || 20));
  const legacyFilter = (searchParams?.filter || '').toLowerCase();
  const statusParam = (searchParams?.status || (legacyFilter === 'upcoming' ? 'upcoming' : 'all')).toLowerCase();
  const teamParam = (searchParams?.team || 'all').toLowerCase();
  const useFilters = statusParam !== 'all' || teamParam !== 'all';

  const todayCH = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Zurich',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

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

  let items: Match[] = [];
  let total = 0;
  let totalPages = 1;

  if (useFilters) {
    const fromKv = (await getAllMatches()) || [];
    const fromLocal = (((matchesLocal as any)?.matches || []) as Match[]) || [];
    const seen = new Set((fromKv as any[]).map((m: any) => m.id));
    const all = [...fromKv, ...fromLocal.filter((m: any) => !seen.has(m.id))];
    const filtered = all
      .filter(matchTeam)
      .filter(matchStatus)
      .sort(comparatorForStatus(statusParam));
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
    const fromKv2 = (await getAllMatches()) || [];
    const fromLocal2 = (((matchesLocal as any)?.matches || []) as Match[]) || [];
    const seen2 = new Set((fromKv2 as any[]).map((m: any) => m.id));
    const all = [...fromKv2, ...fromLocal2.filter((m: any) => !seen2.has(m.id))];
    if (useFilters) {
      const filtered = all
        .filter(matchTeam)
        .filter(matchStatus)
        .sort(comparatorForStatus(statusParam));
      total = filtered.length;
      totalPages = Math.max(1, Math.ceil(total / pageSize));
      if (page > totalPages) page = totalPages;
      const start = (page - 1) * pageSize;
      const stop = start + pageSize;
      items = filtered.slice(start, stop);
    } else {
      const sorted = all.slice().sort(compareByDateDesc);
      total = sorted.length;
      totalPages = Math.max(1, Math.ceil(total / pageSize));
      if (page > totalPages) page = totalPages;
      const start = (page - 1) * pageSize;
      const stop = start + pageSize;
      items = sorted.slice(start, stop);
    }
  }

  // Build grouped lists when showing all statuses
  let allMatches: Match[] = [];
  if (statusParam === 'all') {
    const fromKv = (await getAllMatches()) || [];
    const fromLocal = (((matchesLocal as any)?.matches || []) as Match[]) || [];
    const seen = new Set((fromKv as any[]).map((m: any) => m.id));
    allMatches = [...fromKv, ...fromLocal.filter((m: any) => !seen.has(m.id))];
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />
      <div className="pt-32 pb-20">
        <Container>
          {/* Header */}
          <div className="text-center mb-12 bg-esla-secondary text-white p-10 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <NowBadge />
              <StatsBadge />
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4">ALLE <span className="text-esla-primary">SPIELE</span></h1>
            <p className="text-white/80 text-xl">Filtere nach Team und Status</p>
            {/* Filterbar */}
            <FilterBar key={`${statusParam}-${teamParam}`} statusParam={statusParam} teamParam={teamParam} pageSize={pageSize} />
          </div>

          {statusParam === 'all' ? (
            <>
              {(() => {
                const live = (allMatches || [])
                  .filter(matchTeam)
                  .filter((m) => computedStatus(m) === 'live')
                  .sort(compareByDateAsc);
                if (live.length === 0) return null;
                return (
                  <section className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-black text-esla-secondary mb-4">Aktuelle Spiele</h2>
                    <div className="grid gap-8">
                      {live.map((m) => (
                        <MatchCard key={m.id} match={m} fullWidth />
                      ))}
                    </div>
                  </section>
                );
              })()}

              {(() => {
                const upcoming = (allMatches || [])
                  .filter(matchTeam)
                  .filter((m) => computedStatus(m) === 'upcoming')
                  .sort(compareByDateAsc);
                if (upcoming.length === 0) return null;
                return (
                  <section className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-black text-esla-secondary mb-4">Zukünftige Spiele</h2>
                    <div className="grid gap-8">
                      {upcoming.map((m) => (
                        <MatchCard key={m.id} match={m} fullWidth />
                      ))}
                    </div>
                  </section>
                );
              })()}

              {(() => {
                const finished = (allMatches || [])
                  .filter(matchTeam)
                  .filter((m) => computedStatus(m) === 'finished')
                  .sort(compareByDateDesc);
                if (finished.length === 0) return null;
                return (
                  <section className="mt-14">
                    <h2 className="text-2xl md:text-3xl font-black text-esla-secondary mb-4">Abgeschlossene Spiele</h2>
                    <div className="grid gap-8">
                      {finished.map((m) => (
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
                  {statusParam === 'upcoming' ? 'Leider keine zukünftigen Spiele geplant.' : statusParam === 'live' ? 'Aktuell keine laufenden Spiele.' : statusParam === 'today' ? 'Heute stehen keine Spiele an.' : 'Noch keine abgeschlossenen Spiele vorhanden.'}
                </div>
              ) : (
                <div className="grid gap-8">
                  {items.map((match: Match) => (
                    <MatchCard key={match.id} match={match} fullWidth />
                  ))}
                </div>
              )}
              {/* Pagination */}
              {items.length > 0 && (
                <div className="flex justify-center items-center gap-6 mt-12">
                  <Link href={`/spiele?status=${statusParam}&team=${teamParam}&page=${Math.max(1, page - 1)}&pageSize=${pageSize}`} className={`px-5 py-3 rounded-full border ${page > 1 ? 'text-esla-secondary border-slate-300 hover:bg-slate-100' : 'text-slate-400 border-slate-200 pointer-events-none'}`}>Zurück</Link>
                  <span className="text-esla-secondary/70">Seite {page} / {totalPages}</span>
                  <Link href={`/spiele?status=${statusParam}&team=${teamParam}&page=${Math.min(totalPages, page + 1)}&pageSize=${pageSize}`} className={`px-5 py-3 rounded-full border ${page < totalPages ? 'text-esla-secondary border-slate-300 hover:bg-slate-100' : 'text-slate-400 border-slate-200 pointer-events-none'}`}>Weiter</Link>
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
