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
    <Section noContainer className="bg-esla-secondary">
      {/* Instagram Grid - Full Width Collage */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-0 mb-0">
        {instagramPosts.map((post) => (
          <a
            key={post.id}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden"
          >
            <Image
              src={post.imageUrl}
              alt={post.caption}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              unoptimized
            />
            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-esla-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Instagram size={32} className="text-white" />
            </div>
          </a>
        ))}
      </div>

      {/* Content Section Below */}
      <Container>
        <div className="py-16 md:py-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
            TEAM ELITESOCCER
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            <span className="text-esla-primary">Social Media</span>
          </h3>
          <p className="text-white/90 text-lg mb-8 max-w-3xl leading-relaxed">
            Erlebe hautnah, was hinter den Kulissen von Team Elitesoccer passiert – Trainings, Teamspirit und echte Momente. 
            <span className="block mt-2 text-esla-primary font-semibold">#ESLA #TeamElitesoccer #NextGeneration</span>
          </p>
          <a
            href="https://www.instagram.com/eslateamelitesoccer/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-x-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-10 py-4 rounded-full font-bold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Instagram size={22} />
            <span>@eslateamelitesoccer</span>
          </a>
        </div>
      </Container>
    </Section>
  );
}

