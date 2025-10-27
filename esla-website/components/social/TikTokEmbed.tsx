'use client';

import { useEffect } from 'react';

const TIKTOK_EMBED_SRC = 'https://www.tiktok.com/embed.js';

export default function TikTokEmbed() {
  useEffect(() => {
    const existingScript = document.querySelector(`script[src="${TIKTOK_EMBED_SRC}"]`) as HTMLScriptElement | null;

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = TIKTOK_EMBED_SRC;
      script.async = true;
      document.body.appendChild(script);
      return;
    }

    (window as typeof window & { tiktokEmbedLoad?: () => void }).tiktokEmbedLoad?.();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div>
        <h3 className="text-2xl md:text-3xl font-black text-esla-secondary">Folgt uns auf TikTok</h3>
      </div>

      <div className="w-full">
        <blockquote
          className="tiktok-embed rounded-3xl border border-gray-200 bg-white shadow-sm"
          cite="https://www.tiktok.com/@esla_team_eliteso"
          data-unique-id="esla_team_eliteso"
          data-embed-from="embed_page"
          data-embed-type="creator"
          style={{ maxWidth: '780px', minWidth: '288px', margin: '0 auto' }}
        >
          <section>
            <a target="_blank" rel="noreferrer" href="https://www.tiktok.com/@esla_team_eliteso?refer=creator_embed">
              @esla_team_eliteso
            </a>
          </section>
        </blockquote>
      </div>
    </div>
  );
}


