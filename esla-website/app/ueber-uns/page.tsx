import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import { Heart, Users, TrendingUp, Award, Handshake, CheckCircle, Shield, MapPin, Target, Zap } from 'lucide-react';

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
              <div className="bg-white rounded-full px-6 py-3 flex items-center gap-x-2 shadow-md">
                <Shield size={18} className="text-esla-primary flex-shrink-0" />
                <span className="font-semibold">Offiziell anerkannt vom SFV</span>
              </div>
              <div className="bg-white rounded-full px-6 py-3 flex items-center gap-x-2 shadow-md">
                <MapPin size={18} className="text-esla-primary flex-shrink-0" />
                <span className="font-semibold">Luzern – Sportplatz RUAG</span>
              </div>
              <div className="bg-white rounded-full px-6 py-3 flex items-center gap-x-2 shadow-md">
                <Users size={18} className="text-esla-primary flex-shrink-0" />
                <span className="font-semibold">Team ESLA</span>
              </div>
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
            <h2 className="text-3xl md:text-4xl font-black text-white mb-12 text-center">
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
                    Strukturierter Trainingsbetrieb unter Cheftrainer Luqmon Adekunle (ehem. Profispieler) – 
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

