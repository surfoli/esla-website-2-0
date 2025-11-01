import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, MapPin, Shield, Target, Heart, Trophy, Globe2 } from 'lucide-react';

export default function LuqmonBio() {
  return (
    <>
      <Section className="pt-32" noContainer>
        <Container>
          <div className="mb-8">
            <Link href="/team" className="inline-flex items-center gap-x-2 text-white/70 hover:text-white font-semibold transition-colors">
              <ArrowLeft size={20} />
              Zurück zum Team
            </Link>
          </div>
          <div className="bg-gradient-to-br from-black via-[#111] to-esla-primary rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <div className="grid lg:grid-cols-[400px_1fr] gap-12 items-center">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-white/10">
                <Image
                  src="/images/esla-profilbild-staff-cheftrainer-luqmon-adekunle-nah.jpg"
                  alt="Cheftrainer Luqmon Adekunle"
                  fill
                  className="object-cover object-[center_25%]"
                  sizes="(min-width: 1024px) 400px, 100vw"
                  priority
                />
              </div>
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-black leading-tight">Adekunle <span className="text-esla-primary">Babatunde Luqmon</span></h1>
                <p className="text-xl md:text-2xl text-esla-primary font-bold">Cheftrainer & Gründer von Team ESLA</p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="bg-white/10 px-4 py-2 rounded-full flex items-center gap-x-2"><Calendar size={16} />10. Oktober 1984</span>
                  <span className="bg-white/10 px-4 py-2 rounded-full flex items-center gap-x-2"><MapPin size={16} />Lagos, Nigeria</span>
                  <span className="bg-white/10 px-4 py-2 rounded-full flex items-center gap-x-2"><Shield size={16} />1.77 m • Innenverteidiger</span>
                </div>
                <p className="text-white/85 leading-relaxed text-lg">Als ehemaliger Profispieler in 4 Ländern und 3 Ligen prägte Luqmon Adekunle den Schweizer Fussball – heute gibt er seine Erfahrung als Gründer und Visionär von Team Elite Soccer an die nächste Generation weiter.</p>
                <div className="space-y-4 text-white/85 leading-relaxed">
                  <p className="text-lg">Als 20-Jähriger wechselte Luqmon in die serbische Prva Liga zu <span className="font-semibold text-white">Borac Čačak</span> und schloss sich kurz darauf dem mazedonischen Topklub <span className="font-semibold text-white">Vëllazërimi</span> an. Von 2006 bis 2008 trug er das Trikot von <span className="font-semibold text-white">FK Rabotnički Skopje</span> und spielte eine Schlüsselrolle bei der Qualifikation zur <span className="font-semibold text-white">UEFA Champions League 2008/09</span>.</p>
                  <p className="text-lg">Am 22. Dezember 2008 verpflichtete ihn der <span className="font-semibold text-white">FC Luzern</span> nach einem spektakulären Champions-League-Qualifikationsspiel gegen Inter Baku. Mit den Innerschweizern gelang ihm ein glänzender Start in der Super League.</p>
                  <p className="text-lg">In der Saison 2011/12 sammelte Luqmon als Leihspieler beim <span className="font-semibold text-white">SC Kriens</span> wertvolle Einsätze in der Swiss Challenge League. 2014 folgte der Wechsel zu <span className="font-semibold text-white">Zug 94</span>, wo er gleich im Debüt beim 9:0 gegen den FC Grenchen traf. Seine letzte Station als Aktiver war <span className="font-semibold text-white">FC Sursee</span>, bevor er sich ganz auf den Aufbau von Team ESLA konzentrierte.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section noContainer>
        <Container>
          <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-12">Karriere in <span className="text-esla-primary">Zahlen</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-black to-esla-primary rounded-2xl p-6 text-center shadow-xl border border-white/10">
              <div className="text-3xl font-black text-esla-accent mb-2">13+</div>
              <div className="text-sm text-white/70">Jahre Profi</div>
            </div>
            <div className="bg-gradient-to-br from-black to-esla-primary rounded-2xl p-6 text-center shadow-xl border border-white/10">
              <div className="text-3xl font-black text-esla-accent mb-2">6</div>
              <div className="text-sm text-white/70">Vereine</div>
            </div>
            <div className="bg-gradient-to-br from-black to-esla-primary rounded-2xl p-6 text-center shadow-xl border border-white/10">
              <div className="text-3xl font-black text-esla-accent mb-2">188</div>
              <div className="text-sm text-white/70">Ligaspiele</div>
            </div>
            <div className="bg-gradient-to-br from-black to-esla-primary rounded-2xl p-6 text-center shadow-xl border border-white/10">
              <div className="text-3xl font-black text-esla-accent mb-2">12</div>
              <div className="text-sm text-white/70">Ligatore</div>
            </div>
          </div>
        </Container>
      </Section>

      <Section noContainer>
        <Container>
          <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-12">Professionelle <span className="text-esla-primary">Karriere</span></h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 text-white">
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 space-y-6">
              <h3 className="text-xl font-bold text-esla-primary">Internationale Stationen</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <div>
                    <div className="font-semibold">FK Rabotnički Skopje</div>
                    <div className="text-sm text-white/60">Mazedonien</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-esla-primary font-semibold">2006–2008</div>
                    <div className="text-xs text-white/60">38 Spiele • 4 Tore</div>
                  </div>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <div>
                    <div className="font-semibold">Borac Čačak</div>
                    <div className="text-sm text-white/60">Serbien</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-esla-primary font-semibold">2005–2006</div>
                    <div className="text-xs text-white/60">UEFA CL-Qualifikation</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 space-y-6">
              <h3 className="text-xl font-bold text-esla-primary">Erfolge & Auszeichnungen</h3>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-x-3">
                  <span className="w-5 flex-none inline-flex justify-center">
                    <Trophy className="mt-[2px] text-esla-accent" size={18} />
                  </span>
                  <span><span className="font-semibold">Mazedonische Meisterschaft & Pokalsieg</span> mit FK Rabotnički (2007/08)</span>
                </li>
                <li className="flex items-start gap-x-3">
                  <span className="w-5 flex-none inline-flex justify-center">
                    <Shield className="mt-[2px] text-esla-accent" size={18} />
                  </span>
                  <span><span className="font-semibold">Swiss Cup Finalist</span> mit dem FC Luzern (2011/12)</span>
                </li>
                <li className="flex items-start gap-x-3">
                  <span className="w-5 flex-none inline-flex justify-center">
                    <Globe2 className="mt-[2px] text-esla-accent" size={18} />
                  </span>
                  <span><span className="font-semibold">UEFA Champions League Qualifikation</span> 2008/09</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 space-y-6">
              <h3 className="text-xl font-bold text-esla-primary">Schweizer Vereine</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <div>
                    <div className="font-semibold">FC Luzern</div>
                    <div className="text-sm text-white/60">Super League</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-esla-primary font-semibold">2008–2013</div>
                    <div className="text-xs text-white/60">39 Spiele • 1 Tor</div>
                  </div>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <div>
                    <div className="font-semibold">SC Kriens</div>
                    <div className="text-sm text-white/60">Challenge League</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-esla-primary font-semibold">2011–2012</div>
                    <div className="text-xs text-white/60">11 Spiele</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">Zug 94 / FC Sursee</div>
                    <div className="text-sm text-white/60">1. Liga Classic</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-esla-primary font-semibold">2014–2016</div>
                    <div className="text-xs text-white/60">40 Spiele • 2 Tore</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section noContainer>
        <Container>
          <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-12">Grösste <span className="text-esla-primary">Erfolge</span></h2>
          <div className="bg-gradient-to-br from-esla-primary to-black rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <Trophy className="mx-auto text-white" size={44} />
                <div className="font-bold">Champions League</div>
                <div className="text-white/80 text-sm">Qualifikation 2008/09 mit FK Rabotnički Skopje</div>
              </div>
              <div className="text-center space-y-3">
                <Shield className="mx-auto text-white" size={44} />
                <div className="font-bold">Meister Mazedonien</div>
                <div className="text-white/80 text-sm">Nationale Meisterschaft und internationale Erfahrung</div>
              </div>
              <div className="text-center space-y-3">
                <Globe2 className="mx-auto text-white" size={44} />
                <div className="font-bold">4 Länder • 3 Ligen</div>
                <div className="text-white/80 text-sm">Internationale Karriere auf höchstem Niveau</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section noContainer>
        <Container>
          <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-12">Meine <span className="text-esla-primary">Philosophie</span></h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 space-y-6 text-white">
              <div className="flex items-center gap-x-4"><div className="bg-esla-primary rounded-full p-3"><Target className="text-white" size={24} /></div><h3 className="text-2xl font-black">Vision</h3></div>
              <p className="text-white/80 leading-relaxed">Als ehemaliger Profispieler weiss ich, was es heisst auf höchstem Niveau zu bestehen. Diese Erfahrung gebe ich an die nächste Generation weiter – nicht nur technisch, sondern auch mental.</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 space-y-6 text-white">
              <div className="flex items-center gap-x-4"><div className="bg-esla-primary rounded-full p-3"><Heart className="text-white" size={24} /></div><h3 className="text-2xl font-black">Warum ESLA?</h3></div>
              <p className="text-white/80 leading-relaxed">Ich habe Team ESLA gegründet, weil ich sehe, wie viel Potenzial in unseren jungen Spielern steckt. Mit der richtigen Anleitung und mentalen Stärke können sie Grosses erreichen – auf und neben dem Platz.</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section noContainer>
        <Container>
          <div className="bg-gradient-to-r from-black to-esla-primary rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Werden Sie Teil unserer Mission</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Unterstützen Sie uns bei der Förderung der nächsten Fussball-Generation und helfen Sie jungen Talenten, ihre Träume zu verwirklichen.</p>
            <Link href="/sponsoren-angebote" className="inline-block bg-esla-primary hover:bg-esla-accent text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 shadow-lg">Team unterstützen</Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
