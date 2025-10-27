// Server Component: vermeidet Hydration-Differenzen für statische Inhalte

import { Instagram } from 'lucide-react';

// Mock Instagram Posts (später durch echte Instagram API ersetzen)
const instagramPosts = [
  {
    id: 'DOc1WbWjoDv',
    title: 'ESLA Reel DOc1WbWjoDv',
    embedUrl: 'https://www.instagram.com/reel/DOc1WbWjoDv/embed',
    link: 'https://www.instagram.com/reel/DOc1WbWjoDv/',
  },
  {
    id: 'DOO4D-gjk46',
    title: 'ESLA Reel DOO4D-gjk46',
    embedUrl: 'https://www.instagram.com/reel/DOO4D-gjk46/embed',
    link: 'https://www.instagram.com/reel/DOO4D-gjk46/',
  },
];

export default function InstagramFeed() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div>
        <h3 className="text-2xl md:text-3xl font-black text-esla-secondary">Folgt uns auf Instagram</h3>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block w-full aspect-[9/16] bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-full w-full">
                <iframe
                  src={post.embedUrl}
                  title={post.title}
                  loading="lazy"
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
                <div className="absolute bottom-2 right-2 bg-white/90 rounded-full p-1 shadow">
                  <Instagram size={16} className="text-esla-secondary" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

