import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { getAllMatches } from '@/lib/kv';
import matchesLocal from '@/data/matches.json';
import type { Match } from '@/types';
import MatchesPreviewClient from '@/components/spiele/MatchesPreviewClient';

export default async function MatchesPreviewServer() {
  let all = await getAllMatches();
  if (!all || all.length === 0) {
    all = ((matchesLocal as any)?.matches || []) as Match[];
  }

  return (
    <Section className="bg-white pt-0 pb-4 md:pb-6" noContainer>
      <Container>
        <div className="w-full">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-esla-secondary">
              ALLE <span className="text-esla-primary">SPIELE</span>
            </h2>
          </div>
          <MatchesPreviewClient initialMatches={all as any} />
        </div>
      </Container>
    </Section>
  );
}
