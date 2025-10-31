import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import { Heart, Users, TrendingUp, Award, Handshake, CheckCircle, Shield, MapPin, Target, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16 bg-esla-secondary text-white p-10 rounded-3xl">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              ÜBER UNS
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-esla-primary mb-4">
              TEAM ESLA – Elite Soccer Luqmon Adekunle
            </h2>
            <p className="text-xl md:text-2xl text-white/80 font-semibold mb-8">
              Wo Talent auf Charakter trifft.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-esla-secondary text-base max-w-3xl mx-auto">
              <a
                href="https://matchcenter.ifv.ch/default.aspx?v=1761431&oid=7&lng=1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zum SFV Matchcenter"
                className="bg-white rounded-full px-6 py-3 flex items-center gap-x-2 shadow-md hover:shadow-lg hover:bg-esla-light transition-all duration-200 transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-esla-primary/50 cursor-pointer"
              >
                <Shield size={18} className="text-esla-primary flex-shrink-0" />
                <span className="font-semibold">Offiziell anerkannt vom SFV</span>
              </a>
              <Link
                href="/standort"
                aria-label="Zur Standort-Seite"
                className="bg-white rounded-full px-6 py-3 flex items-center gap-x-2 shadow-md hover:shadow-lg hover:bg-esla-light transition-all duration-200 transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-esla-primary/50 cursor-pointer"
              >
                <MapPin size={18} className="text-esla-primary flex-shrink-0" />
                <span className="font-semibold">Luzern – Sportplatz RUAG</span>
              </Link>
              <Link
                href="/team"
                aria-label="Zur Teamseite"
                className="bg-white rounded-full px-6 py-3 flex items-center gap-x-2 shadow-md hover:shadow-lg hover:bg-esla-light transition-all duration-200 transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-esla-primary/50 cursor-pointer"
              >
                <Users size={18} className="text-esla-primary flex-shrink-0" />
                <span className="font-semibold">Team ESLA</span>
              </Link>
            </div>
          </div>

          {/* Combined Image + Feature Cards */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-black text-esla-secondary mb-6">
                Was uns auszeichnet
              </h3>
            </div>
            
            {/* 4 Combined Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group rounded-2xl overflow-hidden shadow-lg shadow-black/30 hover:shadow-2xl hover:shadow-black/40 transition-all duration-300 transform hover:scale-105 bg-esla-primary flex flex-col">
                <div className="relative aspect-[3/4]">
                  <Image
                    src="/images/ESLA_Fussball_Stock_1.jpg"
                    alt="Professionelle Leitung"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
                <div className="p-6 bg-gradient-to-r from-black via-esla-dark to-esla-primary text-white flex-1 mt-[-1px]">
                  <div className="flex items-center gap-x-3 mb-3">
                    <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-lg font-black text-white">Professionelle Leitung</h4>
                  </div>
                  <p className="text-white/90 leading-relaxed text-sm">
                    Strukturierter Trainingsbetrieb unter Cheftrainer <Link href="/team/luqmon" className="text-white hover:text-esla-accent underline font-bold transition-colors">Luqmon Adekunle</Link> (ehem. Profispieler) – Fussball Academy in Luzern mit höchsten Standards.
                  </p>
                </div>
              </div>

              <div className="group rounded-2xl overflow-hidden shadow-lg shadow-black/30 hover:shadow-2xl hover:shadow-black/40 transition-all duration-300 transform hover:scale-105 bg-esla-primary flex flex-col">
                <div className="relative aspect-[3/4]">
                  <Image
                    src="/images/ESLA_Fussball_Stock_2.jpg"
                    alt="Ganzheitliche Förderung"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
                <div className="p-6 bg-gradient-to-b from-black to-esla-primary text-white flex-1 mt-[-1px]">
                  <div className="flex items-center gap-x-3 mb-3">
                    <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-lg font-black text-white">Ganzheitliche Förderung</h4>
                  </div>
                  <p className="text-white/90 leading-relaxed text-sm">
                    Persönlichkeitsentwicklung als fester Bestandteil unseres Konzepts – wir formen nicht nur Fussballer, sondern starke Persönlichkeiten.
                  </p>
                </div>
              </div>

              <div className="group rounded-2xl overflow-hidden shadow-lg shadow-black/30 hover:shadow-2xl hover:shadow-black/40 transition-all duration-300 transform hover:scale-105 bg-esla-primary flex flex-col">
                <div className="relative aspect-[3/4]">
                  <Image
                    src="/images/ESLA_Fussball_Stock_3.jpg"
                    alt="Nachhaltige Perspektive"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
                <div className="p-6 bg-gradient-to-b from-black to-esla-primary text-white flex-1 mt-[-1px]">
                  <div className="flex items-center gap-x-3 mb-3">
                    <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-lg font-black text-white">Nachhaltige Perspektive</h4>
                  </div>
                  <p className="text-white/90 leading-relaxed text-sm">
                    Fokus auf langfristige Entwicklung statt kurzfristiger Erfolge – nachhaltige Nachwuchsförderung in der Zentralschweiz.
                  </p>
                </div>
              </div>

              <div className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-b from-black to-esla-primary flex flex-col">
                <div className="relative aspect-[3/4]">
                  <Image
                    src="/images/ESLA_Fussball_Stock_5.jpg"
                    alt="Starke Gemeinschaft"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
                <div className="p-6 bg-gradient-to-r from-black via-esla-dark to-esla-primary text-white flex-1 mt-[-1px]">
                  <div className="flex items-center gap-x-3 mb-3">
                    <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="text-lg font-black text-white">Starke Gemeinschaft</h4>
                  </div>
                  <p className="text-white/90 leading-relaxed text-sm">
                    Werteorientiertes, familiäres Umfeld – bei ESLA ist jeder Spieler Teil einer echten Fussballfamilie.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Extended Story Section */}
          <div className="bg-white rounded-3xl p-10 md:p-12 mb-16 shadow-lg border border-slate-200">
            <h3 className="text-3xl md:text-4xl font-black text-esla-secondary mb-8">
              Unsere Geschichte – Unsere Vision
            </h3>
            <div className="space-y-6 text-lg md:text-xl text-esla-secondary/90 leading-relaxed">
              <p>
                <strong>TEAM ELITESOCCER – ESLA</strong> entstand aus der Leidenschaft für den Fussball und der Überzeugung, 
                dass sportlicher Erfolg und persönliche Entwicklung Hand in Hand gehen. Unter der Leitung von 
                <Link href="/team/luqmon" className="text-esla-primary hover:text-esla-accent underline font-bold"> Luqmon Adekunle</Link>, 
                einem ehemaligen Profispieler mit internationaler Erfahrung, haben wir eine Akademie geschaffen, 
                die junge Talente im Raum Luzern und der gesamten Zentralschweiz fördert.
              </p>
              <p>
                Unser Ansatz ist ganzheitlich: Wir kombinieren modernes Fussballtraining mit gezielter 
                Persönlichkeitsentwicklung. Technik, Taktik und Athletik werden ebenso geschult wie 
                Disziplin, Teamgeist und mentale Stärke. Bei uns lernen Spieler nicht nur, wie man 
                Tore schiest, sondern auch, wie man Ziele erreicht – auf und neben dem Platz.
              </p>
            </div>
          </div>

          {/* Wer wir sind */}
          <div className="bg-white rounded-3xl p-10 md:p-12 mb-16 shadow-lg border border-slate-200">
            <h3 className="text-3xl md:text-4xl font-black text-esla-secondary mb-6">
              Wer wir sind
            </h3>
            <p className="text-lg md:text-xl text-esla-secondary/90 leading-relaxed mb-6">
              <strong>TEAM ELITESOCCER – ESLA</strong> steht für mehr als Fussball. Wir fördern Talent und formen Charakter. 
              Unser Fokus liegt auf gezielter Nachwuchsförderung sowie auf der ganzheitlichen Persönlichkeitsentwicklung junger Spieler 
              im Raum Luzern und der gesamten Zentralschweiz.
            </p>
            <div className="bg-esla-primary rounded-2xl p-8 border-l-4 border-esla-accent">
              <div className="flex items-start gap-x-4">
                <Target size={32} className="text-white flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-2xl font-black text-white mb-3">
                    Unsere Mission
                  </h4>
                  <p className="text-lg text-white/90 mb-2">
                    <strong>Wir entwickeln Spieler. Wir stärken Persönlichkeiten.</strong>
                  </p>
                  <p className="text-lg text-white/90">
                    Bei uns zählt der Mensch hinter dem Talent.
                  </p>
                </div>
              </div>
            </div>
          </div>


          {/* Our Values */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-black mb-12 text-center">
              Unsere Werte – <span className="text-esla-primary">auf und neben dem Platz</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Value 1 */}
              <div className="bg-esla-primary rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-x-4 mb-4">
                  <div className="bg-white/20 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Leidenschaft</h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Wir leben und lieben den Fussball – mit Herz, Energie und Begeisterung.
                </p>
              </div>

              {/* Value 2 */}
              <div className="bg-esla-primary rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-x-4 mb-4">
                  <div className="bg-white/20 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                    <Handshake size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Respekt</h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Wir begegnen uns mit Wertschätzung – auf dem Platz, in der Kabine und im Alltag.
                </p>
              </div>

              {/* Value 3 */}
              <div className="bg-esla-primary rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-x-4 mb-4">
                  <div className="bg-white/20 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Entwicklung</h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Jeder Spieler darf wachsen – in seinem Tempo, mit klarer Förderung und ehrlicher Begleitung.
                </p>
              </div>

              {/* Value 4 */}
              <div className="bg-esla-primary rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-x-4 mb-4">
                  <div className="bg-white/20 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Mut und Selbstvertrauen</h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Fehler gehören dazu – wir machen sie zur Chance, um stärker zu werden.
                </p>
              </div>

              {/* Value 5 */}
              <div className="bg-esla-primary rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-x-4 mb-4">
                  <div className="bg-white/20 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Teamgeist</h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Wir gewinnen zusammen. Wir verlieren zusammen. Wir halten zusammen.
                </p>
              </div>
            </div>
          </div>

          {/* What Makes Us Special */}
          <div className="bg-esla-secondary text-white rounded-3xl p-10 md:p-12 shadow-lg mb-16 border border-white/10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-10 text-center">
              Was uns <span className="text-esla-primary">auszeichnet</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-x-4 p-6 bg-white/10 rounded-xl border border-white/20 hover:bg-white/15 transition-colors">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle size={28} className="text-esla-primary" />
                </div>
                <div>
                  <h4 className="text-white font-black text-xl mb-2">
                    Professionelle Leitung
                  </h4>
                  <p className="text-white/90 leading-relaxed">
                    Strukturierter Trainingsbetrieb unter Cheftrainer <Link href="/team/luqmon" className="text-esla-primary hover:text-esla-accent underline font-bold">Luqmon Adekunle</Link> (ehem. Profispieler) – 
                    Fussball Academy in Luzern mit höchsten Standards.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-x-4 p-6 bg-white/10 rounded-xl border border-white/20 hover:bg-white/15 transition-colors">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle size={28} className="text-esla-primary" />
                </div>
                <div>
                  <h4 className="text-white font-black text-xl mb-2">
                    Ganzheitliche Förderung
                  </h4>
                  <p className="text-white/90 leading-relaxed">
                    Persönlichkeitsentwicklung als fester Bestandteil unseres Konzepts – 
                    wir formen nicht nur Fussballer, sondern starke Persönlichkeiten.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-x-4 p-6 bg-white/10 rounded-xl border border-white/20 hover:bg-white/15 transition-colors">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle size={28} className="text-esla-primary" />
                </div>
                <div>
                  <h4 className="text-white font-black text-xl mb-2">
                    Nachhaltige Perspektive
                  </h4>
                  <p className="text-white/90 leading-relaxed">
                    Fokus auf langfristige Entwicklung statt kurzfristiger Erfolge – 
                    nachhaltige Nachwuchsförderung in der Zentralschweiz.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-x-4 p-6 bg-white/10 rounded-xl border border-white/20 hover:bg-white/15 transition-colors">
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle size={28} className="text-esla-primary" />
                </div>
                <div>
                  <h4 className="text-white font-black text-xl mb-2">
                    Starke Gemeinschaft
                  </h4>
                  <p className="text-white/90 leading-relaxed">
                    Werteorientiertes, familiäres Umfeld – bei ESLA ist jeder Spieler Teil einer echten Fussballfamilie.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-esla-primary to-esla-accent rounded-3xl p-10 md:p-12 text-center text-white shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-black mb-4">
              Bereit für den nächsten Schritt?
            </h3>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Werde Teil von ESLA – wo junge Talente zu starken Persönlichkeiten reifen.
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-x-3 bg-white text-esla-primary hover:bg-esla-light px-10 py-5 rounded-full font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Jetzt Kontakt aufnehmen
            </a>
          </div>

          

        </div>
      </div>

      <Footer />
    </main>
  );
}
