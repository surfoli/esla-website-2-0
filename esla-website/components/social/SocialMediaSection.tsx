'use client';

import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import InstagramFeed from './InstagramFeed';
import TikTokEmbed from './TikTokEmbed';

export default function SocialMediaSection() {
  return (
    <Section className="bg-white !py-6 md:!py-8" noContainer>
      <Container>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* TikTok - Links/Oben */}
          <div className="flex-1">
            <TikTokEmbed />
          </div>

          {/* Instagram - Rechts/Unten */}
          <div className="flex-1">
            <InstagramFeed />
          </div>
        </div>
      </Container>
    </Section>
  );
}

