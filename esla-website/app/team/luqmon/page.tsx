import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import { ArrowLeft, Calendar, ChevronRight, Gamepad2, Globe2, Heart, MapPin, Shield, Target, Trophy } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';

export default function LuqmonPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />

      <Section className="pt-32 pb-20 bg-transparent" noContainer>
        <Container>
          
          {/* Back Button */}
          <div className="mb-8">
            <Link 
              href="/team"
              className="inline-flex items-center gap-x-2 text-esla-secondary hover:text-esla-primary transition-colors font-semibold"
            >
              <ArrowLeft size={20} />
              Zurück zum Team
            </Link>
          </div>

          {/* Hero Section */}
          <div className="bg-gradient-to-br from-esla-secondary to-esla-dark text-white rounded-3xl p-8 md:p-12 mb-16 shadow-xl">
            <div className="grid lg:grid-cols-[420px_1fr] gap-12">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                <div className="relative h-[320px]">
                  <Image
                    src="/images/ESLA_Profilbild_Staff_Cheftrainer_Luqmon_Adekunle_Nah.jpg"
                    alt="Cheftrainer Luqmon Adekunle"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 420px, 100vw"
                    priority
                  />
                </div>
                <div className="bg-esla-primary text-white p-8 space-y-8">
                  <div className="space-y-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-white/70">
                      <Shield className="h-4 w-4" /> Cheftrainer & Gründer
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">4 Länder · 3 Ligen</p>
                    <h1 className="text-3xl font-black">Luqmon Adekunle</h1>
                    <p className="text-white/85 leading-relaxed">
                      Babatunde Luqmon Adekunle führte als Innenverteidiger Mannschaften in Serbien, Mazedonien und der Schweiz an –
                      darunter eine prägende Ära beim <Link href="https://www.fcl.ch" target="_blank" rel="noreferrer" className="font-bold underline text-white hover:text-esla-accent transition-colors">FC Luzern</Link>.
                      Heute steht er als Gründer und Visionär hinter der DNA der Elite Soccer Academy.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6 text-sm">
                    <div>
                      <p className="text-white/60 uppercase text-xs tracking-[0.3em] mb-2">Steckbrief</p>
                      <dl className="grid grid-cols-2 gap-4">
                        <div>
                          <dt className="text-white/60 uppercase text-xs tracking-[0.3em]">Geboren</dt>
                          <dd className="font-semibold">10. Oktober 1984</dd>
                          <dd className="text-white/80">Lagos, Nigeria</dd>
                        </div>
                        <div>
                          <dt className="text-white/60 uppercase text-xs tracking-[0.3em]">Größe & Position</dt>
                          <dd className="font-semibold">1.77 m</dd>
                          <dd className="text-white/80">Innenverteidiger</dd>
                        </div>
                        <div>
                          <dt className="text-white/60 uppercase text-xs tracking-[0.3em]">Nationalität</dt>
                          <dd className="font-semibold">Nigeria</dd>
                          <dd className="text-white/80">Schweiz seit 2008</dd>
                        </div>
                        <div>
                          <dt className="text-white/60 uppercase text-xs tracking-[0.3em]">Sprachen</dt>
                          <dd className="font-semibold">Deutsch, Englisch</dd>
                          <dd className="text-white/80">Yoruba</dd>
                        </div>
                      </dl>
                    </div>

                    <div>
                      <p className="text-white/60 uppercase text-xs tracking-[0.3em] mb-2">Karriere-Highlights</p>
                      <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-white/85">
                        <div className="space-y-1">
                          <p className="uppercase tracking-[0.25em] text-white/60">International</p>
                          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                            <Globe2 className="h-3.5 w-3.5" /> 4 Länder · 3 Ligen
                          </div>
                          <p>UEFA Champions League Qualifikation 08/09</p>
                          <p>FK Rabotnički Skopje</p>
                        </div>
                        <div className="space-y-1">
                          <p className="uppercase tracking-[0.25em] text-white/60">Schweiz</p>
                          <p className="font-semibold">FC Luzern</p>
                          <p>SC Kriens · Zug 94 · FC Sursee</p>
                          <Link href="/team/luqmon" className="inline-flex items-center gap-1 text-white hover:text-esla-accent transition-colors">
                            Mehr über Luqmon <ChevronRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-white/60 uppercase text-xs tracking-[0.3em] mb-2">Stationen</p>
                      <div className="flex flex-wrap gap-2 text-xs font-semibold">
                        {['Borac Čačak', 'Vëllazërimi', 'Rabotnički Skopje', 'FC Luzern', 'SC Kriens', 'Zug 94', 'FC Sursee'].map((station) => (
                          <span key={station} className="rounded-full bg-white/10 px-3 py-1">
                            {station}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-white/60 uppercase text-xs tracking-[0.3em] mb-2">Größte Erfolge</p>
                      <ul className="space-y-2 text-white/90">
                        <li className="flex items-start gap-2">
                          <Trophy className="h-4 w-4 mt-[2px]" />
                          <span>Meister Mazedonien & UEFA Champions League Qualifikation 2008/09 mit FK Rabotnički</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Trophy className="h-4 w-4 mt-[2px]" />
                          <span>Swiss Super League & Challenge League Einsätze für FC Luzern und SC Kriens</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Trophy className="h-4 w-4 mt-[2px]" />
                          <span>Gründer der Elite Soccer Academy – Aufbau eines ganzheitlichen Förderprogramms</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-black mb-4">
                  Adekunle <span className="text-esla-primary">Babatunde Luqmon</span>
                </h1>
                <p className="text-xl md:text-2xl text-esla-primary font-bold mb-4">
                  Cheftrainer & Gründer von Team ESLA
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center md:justify-start text-sm">
                  <span className="bg-white/20 px-3 py-1 rounded-full flex items-center gap-x-1">
                    <Calendar size={16} />
                    10. Oktober 1984
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full flex items-center gap-x-1">
                    <MapPin size={16} />
                    Lagos, Nigeria
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full flex items-center gap-x-1">
                    <Shield size={16} />
                    1.77m • Centre-back
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Career Bubbles */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-esla-secondary mb-12 text-center">
              Professionelle <span className="text-esla-primary">Karriere</span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {/* Career Bubble 1 */}
              <div className="group bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="text-center">
                  <div className="text-3xl font-black mb-2">2008-2013</div>
                  <div className="text-xl font-bold mb-1">FC Luzern</div>
                  <div className="text-sm opacity-90">39 Spiele • 1 Tor</div>
                  <div className="mt-3 text-xs bg-white/20 rounded-full px-2 py-1">Swiss Super League</div>
                </div>
              </div>

              {/* Career Bubble 2 */}
              <div className="group bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="text-center">
                  <div className="text-3xl font-black mb-2">2006-2008</div>
                  <div className="text-xl font-bold mb-1">Rabotnički</div>
                  <div className="text-sm opacity-90">38 Spiele • 4 Tore</div>
                  <div className="mt-3 text-xs bg-white/20 rounded-full px-2 py-1">Champions League</div>
                </div>
              </div>

              {/* Career Bubble 3 */}
              <div className="group bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="text-center">
                  <div className="text-3xl font-black mb-2">2011-2012</div>
                  <div className="text-xl font-bold mb-1">SC Kriens</div>
                  <div className="text-sm opacity-90">11 Spiele • 0 Tore</div>
                  <div className="mt-3 text-xs bg-white/20 rounded-full px-2 py-1">Challenge League</div>
                </div>
              </div>

              {/* Career Bubble 4 */}
              <div className="group bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="text-center">
                  <div className="text-3xl font-black mb-2">2014-2016</div>
                  <div className="text-xl font-bold mb-1">Zug 94</div>
                  <div className="text-sm opacity-90">40 Spiele • 2 Tore</div>
                  <div className="mt-3 text-xs bg-white/20 rounded-full px-2 py-1">9-0 Sieg Record</div>
                </div>
              </div>
            </div>

            {/* Career Stats Summary */}
            <div className="bg-esla-primary rounded-2xl p-8 text-white shadow-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-black text-esla-accent mb-2">13+</div>
                  <div className="text-sm opacity-90">Jahre Profi</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-esla-accent mb-2">6</div>
                  <div className="text-sm opacity-90">Vereine</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-esla-accent mb-2">188</div>
                  <div className="text-sm opacity-90">Ligaspiele</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-esla-accent mb-2">12</div>
                  <div className="text-sm opacity-90">Ligatore</div>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <div className="flex items-center gap-x-3 mb-6">
                <div className="bg-esla-primary rounded-full p-3">
                  <Target className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-black text-esla-secondary">Meine Philosophie</h3>
              </div>
              <p className="text-esla-secondary/90 leading-relaxed mb-4">
                Als ehemaliger Profispieler weiss ich, was es heisst auf höchstem Niveau zu bestehen. 
                Diese Erfahrung gebe ich an die nächste Generation weiter.
              </p>
              <p className="text-esla-secondary/90 leading-relaxed">
                Bei ESLA geht es nicht nur um Fussball – wir formen Charakter, bauen Selbstvertrauen auf 
                und bereiten junge Spieler auf das Leben vor.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <div className="flex items-center gap-x-3 mb-6">
                <div className="bg-esla-primary rounded-full p-3">
                  <Heart className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-black text-esla-secondary">Warum ESLA?</h3>
              </div>
              <p className="text-esla-secondary/90 leading-relaxed mb-4">
                Ich habe Team ESLA gegründet, weil ich sehe, wie viel Potenzial in unseren jungen Spielern steckt. 
                Mit der richtigen Anleitung und mentalen Stärke können sie Grosses erreichen.
              </p>
              <p className="text-esla-secondary/90 leading-relaxed">
                Mein Ziel: Jeden Spieler individuell fördern und ihm die Werkzeuge geben, die er braucht – 
                auf und neben dem Platz.
              </p>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-gradient-to-r from-esla-accent to-esla-primary rounded-2xl p-8 text-white shadow-xl mb-16">
            <h3 className="text-2xl md:text-3xl font-black mb-8 text-center">
              Karriere-Highlights
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Trophy className="mx-auto mb-3 text-yellow-300" size={40} />
                <div className="font-bold mb-2">Champions League</div>
                <div className="text-sm opacity-90">Qualifikation mit Rabotnički</div>
              </div>
              <div className="text-center">
                <Shield className="mx-auto mb-3 text-yellow-300" size={40} />
                <div className="font-bold mb-2">Swiss Super League</div>
                <div className="text-sm opacity-90">5 Jahre bei FC Luzern</div>
              </div>
              <div className="text-center">
                <Gamepad2 className="mx-auto mb-3 text-yellow-300" size={40} />
                <div className="font-bold mb-2">International</div>
                <div className="text-sm opacity-90">4 Länder • 3 Ligen</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-esla-secondary rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-black mb-4">
              Werden Sie Teil unserer Mission
            </h3>
            <p className="mb-6 opacity-90">
              Unterstützen Sie uns bei der Förderung der nächsten Fussball-Generation
            </p>
            <Link
              href="/sponsoren-angebote"
              className="inline-block bg-esla-primary hover:bg-esla-accent text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg"
            >
              Team unterstützen
            </Link>
          </div>
        </Container>
      </Section>
      
      <Footer />
    </main>
  );
}
