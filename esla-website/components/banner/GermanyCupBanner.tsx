// Server Component – vermeidet Hydration-Differenzen

import Image from 'next/image';
import { Calendar, MapPin, Trophy, ExternalLink } from 'lucide-react';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';

export default function GermanyCupBanner() {
  return (
    <Section noContainer className="bg-gradient-to-b from-[#e7cb34]/40 via-[#1a1a1a] to-[#141414] relative overflow-hidden">

      <Container>
        <div className="relative z-10">
        <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-9 md:p-14 lg:p-18 border border-white/15 shadow-2xl max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left: Content */}
            <div className="gap-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                WIR NEHMEN TEIL AM
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#e7cb34] to-white mt-2">
                  GERMANY CUP 2026
                </span>
              </h2>

              <p className="text-white/85 text-lg leading-relaxed">
                ESLA ist dabei! Wir treten beim renommierten Germany Cup in München an. 
                Einer der größten Jugend-Fußball-Turniere Europas.
              </p>

              <div className="gap-y-6 py-7">
                <div className="flex items-center gap-x-4 text-white">
                  <div className="bg-white/20 p-3 rounded-lg shadow-inner shadow-black/20">
                    <Calendar size={22} />
                  </div>
                  <div>
                    <div className="text-sm text-white/70 mb-1">Datum</div>
                    <div className="font-bold">5. - 7. Juni 2026</div>
                  </div>
                </div>

                <div className="flex items-center gap-x-4 text-white">
                  <div className="bg-white/20 p-3 rounded-lg shadow-inner shadow-black/20">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <div className="text-sm text-white/70 mb-1">Ort</div>
                    <div className="font-bold">München, Deutschland</div>
                  </div>
                </div>

                <div className="flex items-center gap-x-4 text-white">
                  <div className="bg-white/20 p-3 rounded-lg shadow-inner shadow-black/20">
                    <Trophy size={22} />
                  </div>
                  <div>
                    <div className="text-sm text-white/70 mb-1">Teams</div>
                    <div className="font-bold">Über 400 Teams aus ganz Europa</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://www.germany-cup.com/deutsch/germany-cup-2026/muenchen-5.---7.-juni/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-[#242424] hover:bg-[#f1e7b2] px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-x-2"
                >
                  <span>Mehr Infos</span>
                  <ExternalLink size={20} />
                </a>
                <a
                  href="/sponsoren-angebote"
                  className="bg-black/30 hover:bg-black/40 backdrop-blur text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 border border-white/25 inline-block text-center"
                >
                  Team unterstützen
                </a>
              </div>
            </div>

            {/* Right: Logo & Graphics */}
            <div className="relative">
              <div className="relative z-10 bg-white rounded-3xl p-8 md:p-10 shadow-2xl transform hover:scale-105 transition-transform duration-300 w-full">
                <div className="relative w-full">
                  <Image
                    src="/images/Germany_cup_logo.avif"
                    alt="Germany Cup 2026 Logo"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
                <div className="text-center mt-6">
                  <div className="text-2xl font-black text-esla-primary">GERMANY CUP</div>
                  <div className="text-lg font-bold text-[#242424]">München 2026</div>
                </div>
              </div>

              
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-10 border-t border-white/15">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white">400+</div>
              <div className="text-white/70 text-sm mt-2">Teams</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white">12</div>
              <div className="text-white/70 text-sm mt-2">Länder</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white">3</div>
              <div className="text-white/70 text-sm mt-2">Tage</div>
            </div>
          </div>
        </div>
        </div>
      </Container>
    </Section>
  );
}

