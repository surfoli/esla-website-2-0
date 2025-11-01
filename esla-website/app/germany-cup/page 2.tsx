import Navbar from '@/components/navigation/Navbar';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import Footer from '@/components/footer/Footer';

export default async function GermanyCupPage() {

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-black">
        <Container>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-full bg-white shadow-xl ring-2 ring-inset ring-[#e2c218]/50 border border-[#e2c218]/20">
              <Image
                src="/images/germany-cup-logo.avif"
                alt="Germany Cup Logo"
                width={192}
                height={192}
                className="h-20 w-20 sm:h-28 sm:w-28 object-contain"
                priority
              />
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#e2c218]/90 mb-4">
              ESLA nimmt teil am
            </p>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
              GERMANY <span className="text-[#e2c218]">CUP</span> 2026
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-semibold mb-2">
              Internationales Jugendfussballturnier
            </p>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              5. - 7. Juni 2026 • München
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center max-w-4xl mx-auto mb-2">
              <p className="text-xl font-bold text-white mb-6">
                🏆 Germany Cup 2026 Highlights
              </p>
              <p className="text-white/90 mb-8 text-lg leading-relaxed">
                Das internationale Jugendfussballturnier findet deutschlandweit statt. 
                Seid dabei, wenn ESLA 2026 in München gegen Mannschaften aus ganz Europa antritt!
              </p>
              
              <div className="grid grid-cols-3 gap-8 text-lg mb-10">
                <div className="text-center">
                  <p className="font-bold text-white mb-2 text-3xl">3000+</p>
                  <p className="text-[#e2c218] text-lg">Mannschaften</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-white mb-2 text-3xl">21+</p>
                  <p className="text-[#e2c218] text-lg">Nationen</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-white mb-2 text-3xl">3 Tage</p>
                  <p className="text-[#e2c218] text-lg">Fussball-Festival</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 text-white/90 text-lg">
                {[
                  { icon: '🎪', text: 'Attraktives Rahmenprogramm' },
                  { icon: '🏟️', text: 'Luft-Fussballfeld, Hüpfburg, Fussball-Tennis' },
                  { icon: '🥇', text: 'Medaillen und Urkunden für alle Spieler' },
                  { icon: '⚽', text: 'Internationale Top-Mannschaften' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white/5 rounded-xl p-5 border border-white/10 text-center">
                    <span className="text-3xl text-left">{item.icon}</span>
                    <span className="leading-relaxed font-medium text-center flex-1">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Programm */}
              <div className="text-left mb-10 mt-12">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  Programm
                </h3>
                <div className="space-y-6 text-white/80 text-base">
                  {/* Freitag */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <h4 className="font-bold text-white text-lg">Freitag</h4>
                    </div>
                    <ul className="space-y-2 ml-9">
                      <li className="flex items-center gap-2">
                        <span className="text-[#e2c218]">🍽️</span>
                        <span>Abendessen</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#e2c218]">🎉</span>
                        <span>Eröffnungsfeier (ca. 19:15 Uhr)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#e2c218]">🎵</span>
                        <span>Spielen der Nationalhymnen</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#e2c218]">⚽</span>
                        <span>Eröffnungsspiele</span>
                      </li>
                    </ul>
                  </div>

                  {/* Samstag */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <h4 className="font-bold text-white text-lg">Samstag</h4>
                    </div>
                    <ul className="space-y-2 ml-9">
                      <li className="flex items-center gap-2">
                        <span className="text-[#e2c218]">🥐</span>
                        <span>Frühstück</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#e2c218]">🏆</span>
                        <span>Turniertag 1</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#e2c218]">🎪</span>
                        <span>Rahmenprogramm (z.B. Schussmessanlage, Luft-Fussballfeld, Hüpfburg)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#e2c218]">🏟️</span>
                        <span>Freizeit (z.B. Stadiontour)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#e2c218]">🍽️</span>
                        <span>Abendessen</span>
                      </li>
                    </ul>
                  </div>

                  {/* Sonntag */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <h4 className="font-bold text-white text-lg">Sonntag</h4>
                    </div>
                    <ul className="space-y-2 ml-9">
                      <li className="flex items-center gap-2">
                        <span className="text-[#e2c218]">🥐</span>
                        <span>Frühstück</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#e2c218]">🏆</span>
                        <span>Turniertag 2</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#e2c218]">🥇</span>
                        <span>Siegerehrung</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Germany Cup Galerie */}
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  Germany Cup Impressionen
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <a 
                    href="https://www.germany-cup.com/english/germany-cup-2026/munich-5---7-june/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-xl border border-white/10 hover:border-[#e2c218]/50 transition-all duration-300"
                  >
                    <Image
                      src="/images/germany-cup-stadium.avif"
                      alt="Germany Cup Stadium"
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-2 left-2 text-white text-xs font-medium">
                        Stadion Atmosphäre
                      </div>
                    </div>
                  </a>
                  
                  <a 
                    href="https://www.germany-cup.com/english/germany-cup-2026/munich-5---7-june/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-xl border border-white/10 hover:border-[#e2c218]/50 transition-all duration-300"
                  >
                    <Image
                      src="/images/germany-cup-emotions.webp"
                      alt="Germany Cup Emotions"
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-2 left-2 text-white text-xs font-medium">
                        Spieler-Emotionen
                      </div>
                    </div>
                  </a>
                  
                  <a 
                    href="https://www.germany-cup.com/english/germany-cup-2026/munich-5---7-june/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-xl border border-white/10 hover:border-[#e2c218]/50 transition-all duration-300"
                  >
                    <Image
                      src="/images/germany-cup-celebration.webp"
                      alt="Germany Cup Celebration"
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-2 left-2 text-white text-xs font-medium">
                        Siegesfeier
                      </div>
                    </div>
                  </a>
                  
                  <a 
                    href="https://www.germany-cup.com/english/germany-cup-2026/munich-5---7-june/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-xl border border-white/10 hover:border-[#e2c218]/50 transition-all duration-300"
                  >
                    <Image
                      src="/images/germany-cup-action.webp"
                      alt="Germany Cup Action"
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-2 left-2 text-white text-xs font-medium">
                        Spielaktion
                      </div>
                    </div>
                  </a>
                  
                  <a 
                    href="https://www.germany-cup.com/english/germany-cup-2026/munich-5---7-june/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-xl border border-white/10 hover:border-[#e2c218]/50 transition-all duration-300"
                  >
                    <Image
                      src="/images/germany-cup-players.webp"
                      alt="Germany Cup Players"
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-2 left-2 text-white text-xs font-medium">
                        Spieler-Momente
                      </div>
                    </div>
                  </a>
                  
                  <a 
                    href="https://www.germany-cup.com/english/germany-cup-2026/munich-5---7-june/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-xl border border-white/10 hover:border-[#e2c218]/50 transition-all duration-300"
                  >
                    <Image
                      src="/images/germany-cup-impression.webp"
                      alt="Germany Cup Impression"
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-2 left-2 text-white text-xs font-medium">
                        Turnier-Eindrücke
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Copyright Notice */}
              <div className="text-center pt-6 border-t border-white/10">
                <p className="text-white/60 text-sm mb-2">
                  © 2026 Germany Cup - Alle Rechte vorbehalten
                </p>
                <p className="text-white/40 text-xs max-w-2xl mx-auto mb-3">
                  Die Germany Cup Marke, das Logo und alle damit verbundenen Inhalte sind Eigentum des Germany Cup Veranstalters. 
                  Diese Seite dient der Informationsvermittlung und stellt keine offizielle Germany Cup Website dar.
                </p>
                <a 
                  href="https://www.germany-cup.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#e2c218]/80 hover:text-[#e2c218] text-sm font-semibold transition-colors duration-300"
                >
                  <span>Offizielle Germany Cup Website besuchen</span>
                  <svg 
                    className="w-3 h-3" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
