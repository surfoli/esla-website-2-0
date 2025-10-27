import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { getAllMatches } from '@/lib/kv';
import matchesFallback from '@/data/matches-fallback';
import type { Match } from '@/types';
import MatchesPreviewClient from '@/components/spiele/MatchesPreviewClient';

export default async function MatchesPreviewServer() {
  const liveMatches = await getAllMatches();
  const fallbackMatches = matchesFallback.matches ?? [];
  const all: Match[] = liveMatches.length > 0 ? liveMatches : fallbackMatches;

  return (
    <Section className="bg-white pt-6 md:pt-6 pb-4 md:pb-6" noContainer>
      <Container>
        <div className="w-full">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-esla-secondary">
              ALLE <span className="text-esla-primary">SPIELE</span>
            </h2>
          </div>
          <MatchesPreviewClient initialMatches={all} />
        </div>
      </Container>
    </Section>
  );
}
