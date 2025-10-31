import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { getAllMatches } from '@/lib/kv';
import fallback from '@/data/matches-fallback';
import type { Match } from '@/types';
import MatchCard from '@/components/matches/MatchCard';

function byDateAsc(a: Match, b: Match) {
  const aT = new Date(`${a.date}T${(a.time && a.time.length >= 4 ? a.time : '00:00')}:00`).getTime();
  const bT = new Date(`${b.date}T${(b.time && b.time.length >= 4 ? b.time : '00:00')}:00`).getTime();
  return aT - bT;
}

export default async function TournamentMatches({ title, patterns, excludePatterns = [], requireAll = false }: { title: string; patterns: (string|RegExp)[]; excludePatterns?: (string|RegExp)[]; requireAll?: boolean }) {
  const live = await getAllMatches();
  const all: Match[] = live.length > 0 ? live : (fallback.matches ?? []);
  const filtered = all.filter(m => {
    if (!m.competition) return false;
    const comp = m.competition;
    const test = (p: string|RegExp) => (p instanceof RegExp ? p : new RegExp(p, 'i')).test(comp);
    const include = requireAll ? patterns.every(test) : patterns.some(test);
    if (!include) return false;
    if (excludePatterns.length === 0) return true;
    const excluded = excludePatterns.some(p => (p instanceof RegExp ? p : new RegExp(p, 'i')).test(comp));
    return !excluded;
  }).sort(byDateAsc);

  return (
    <Section className="bg-white pt-10 pb-12" noContainer>
      <Container>
        <div className="w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-esla-secondary">Spiele – <span className="text-esla-primary">{title}</span></h2>
          </div>
          {filtered.length === 0 ? (
            <p className="text-center text-esla-secondary/70">Aktuell sind keine Spiele erfasst.</p>
          ) : (
            <div className="space-y-6">
              {filtered.map(m => (
                <MatchCard key={`${m.id}`} match={m} fullWidth />
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
