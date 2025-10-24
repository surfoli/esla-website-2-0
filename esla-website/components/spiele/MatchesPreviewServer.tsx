import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { getAllMatches } from '@/lib/kv';
import matchesLocal from '@/data/matches.json';
import type { Match } from '@/types';
import { computedStatus, toMs } from '@/lib/match';
import MatchCard from '@/components/matches/MatchCard';
import NowBadge from '@/components/ui/NowBadge';
import StatsBadge from '@/components/ui/StatsBadge';

export default async function MatchesPreviewServer() {
  let all = await getAllMatches();
  if (!all || all.length === 0) {
    all = ((matchesLocal as any)?.matches || []) as Match[];
  }

  // identify the very next match (shown in hero) to exclude
  const upcomingAll = (all || [])
    .filter((m) => computedStatus(m) === 'upcoming')
    .sort((a, b) => toMs(a) - toMs(b));
  const nearestDate = upcomingAll[0]?.date;
  const upcoming = upcomingAll.filter((m) => m.date !== nearestDate);

  const finished = (all || [])
    .filter((m) => computedStatus(m) === 'finished')
    .sort((a, b) => toMs(b) - toMs(a))
    .slice(0, 3);

  return (
    <Section className="bg-white pt-0 pb-4 md:pb-6">
      <Container>
        <div className="max-w-[1920px] mx-auto px-0 sm:px-0">
          {/* Header (gleich wie Spiele-Seite) */}
          <div className="text-center mb-12 bg-esla-secondary text-white p-10 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <NowBadge />
              <StatsBadge />
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-2">ALLE <span className="text-esla-primary">SPIELE</span></h2>
          </div>

          {/* Upcoming */}
          {upcoming.length > 0 && (
            <div className="grid gap-8">
              {upcoming.map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          )}

          {/* Divider */}
          <div className="h-8" />

          {/* Last 3 finished */}
          {finished.length > 0 && (
            <div className="grid gap-8">
              {finished.map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          )}

          {/* View all */}
          <div className="text-center mt-8 md:mt-12">
            <a href="/spiele" className="inline-block px-6 py-3 rounded-full bg-esla-secondary text-white hover:bg-esla-dark font-semibold border border-transparent">Alle Spiele ansehen</a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
