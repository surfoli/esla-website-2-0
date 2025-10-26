// Server Component: vermeidet Hydration-Differenzen für statische Inhalte

import Image from 'next/image';
import { Instagram, ExternalLink } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';

// Mock Instagram Posts (später durch echte Instagram API ersetzen)
const instagramPosts = [
  {
    id: '1',
    imageUrl: '/images/ESLA_Fussball_Stock_1.jpg',
    caption: 'Spieltag mit vollem Einsatz! 💪⚽ #ESLA #TeamElitesoccer',
    link: 'https://www.instagram.com/eslateamelitesoccer/',
  },
  {
    id: '2',
    imageUrl: '/images/ESLA_Fussball_Stock_2.jpg',
    caption: 'Unser Team ist bereit für das nächste Spiel! 🔥',
    link: 'https://www.instagram.com/eslateamelitesoccer/',
  },
  {
    id: '3',
    imageUrl: '/images/ESLA_Fussball_Stock_3.jpg',
    caption: 'Gemeinsam zum Erfolg! #Teamwork #ESLA',
    link: 'https://www.instagram.com/eslateamelitesoccer/',
  },
  {
    id: '4',
    imageUrl: '/images/ESLA_Fussball_Stock_4.jpg',
    caption: 'Match-Momente – pure Leidenschaft! 💯',
    link: 'https://www.instagram.com/eslateamelitesoccer/',
  },
  {
    id: '5',
    imageUrl: '/images/ESLA_Fussball_Stock_5.jpg',
    caption: 'Fokus und Leidenschaft auf dem Platz! ⚽',
    link: 'https://www.instagram.com/eslateamelitesoccer/',
  },
  {
    id: '6',
    imageUrl: '/images/ESLA_Fussball_Stock_6.jpg',
    caption: 'Die Zukunft des Fussballs! #NextGeneration',
    link: 'https://www.instagram.com/eslateamelitesoccer/',
  },
];

export default function InstagramFeed() {
  return (
    <Section className="bg-white !py-6 md:!py-8" noContainer>
      <Container>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl md:text-3xl font-black text-esla-secondary">Folgt uns auf Instagram</h3>
          <a
            href="https://www.instagram.com/eslateamelitesoccer/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold px-4 py-2 rounded-full shadow-sm transition-opacity hover:opacity-90"
          >
            <Instagram size={18} />
            <span>@eslateamelitesoccer</span>
          </a>
        </div>

        <div>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(140px,_1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(160px,_1fr))] gap-3">
            {instagramPosts.slice(0, 6).map((post) => (
              <a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full aspect-[3/4] bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow transition-shadow"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={post.imageUrl}
                    alt={post.caption}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute bottom-2 right-2 bg-white/90 rounded-full p-1 shadow">
                    <Instagram size={16} className="text-esla-secondary" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="sm:hidden mt-3">
          <a
            href="https://www.instagram.com/eslateamelitesoccer/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold px-4 py-2 rounded-full shadow-sm transition-opacity hover:opacity-90"
          >
            <Instagram size={18} />
            <span>@eslateamelitesoccer</span>
          </a>
        </div>
      </Container>
    </Section>
  );
}

