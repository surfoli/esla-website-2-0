import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { getAllMatches } from '@/lib/kv';
import matchesFallback from '@/data/matches-fallback';
import type { Match } from '@/types';
import MatchesPreviewClient from '@/components/spiele/MatchesPreviewClient';
import HeroGradientCard from '@/components/ui/HeroGradientCard';

export default async function MatchesPreviewServer() {
  const liveMatches = await getAllMatches();
  const fallbackMatches = matchesFallback.matches ?? [];
  const all: Match[] = liveMatches.length > 0 ? liveMatches : fallbackMatches;

  return (
    <Section className="bg-white pt-6 md:pt-6 pb-4 md:pb-6" noContainer>
      <Container>
        <div className="w-full">
          <HeroGradientCard className="mb-10 p-8 md:p-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-white/70">SPIELPLAN</p>
            <h2 className="mt-4 text-4xl md:text-5xl font-black text-white">
              ALLE <span className="text-esla-primary">SPIELE</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-white/80">
              Alle Resultate und Termine der ESLA Teams auf einen Blick.
            </p>
          </HeroGradientCard>
          <MatchesPreviewClient initialMatches={all} />
        </div>
      </Container>
    </Section>
  );
}
