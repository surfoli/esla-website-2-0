import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Container from '@/components/ui/Container';

export default function D7MeisterschaftPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <section className="relative py-16 md:py-24 bg-black">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h1 className="text-4xl md:text-6xl font-black mb-4 text-white">
                Meisterschaft <span className="text-esla-primary">Junioren D-7</span>
              </h1>
              <p className="text-white/90 text-lg md:text-xl mb-6 font-semibold">Einstieg im 7-gegen-7</p>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-3">Altersklasse</h2>
                  <ul className="text-white/80 space-y-1">
                    <li>• 10 bis 11 Jahre, jüngere D-Junioren</li>
                    <li>• Oft auch noch E-Abgänger (Jg. 2014–2015 Stand 2025)</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3">Funktion</h2>
                  <ul className="text-white/80 space-y-1">
                    <li>• Einstieg in den Kinder-Leistungsfussball</li>
                    <li>• Viele Ballkontakte, kleinere Spielfelder</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3">Spielform</h2>
                  <ul className="text-white/80 space-y-1">
                    <li>• 7 Spieler, 6 Feldspieler und 1 Torhüter, mindestens 5 auf dem Feld</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3">Ball</h2>
                  <ul className="text-white/80 space-y-1">
                    <li>• Grösse 4, ca. 360 g</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3">Spielfeld und Spielzeit</h2>
                  <ul className="text-white/80 space-y-1">
                    <li>• 55–41 m × 35–25 m, Tore 5 × 2 m, Sicherheitsabstand 3 m</li>
                    <li>• 4 × 20 Minuten, kurze Pausen, Halbzeitpause 10 Minuten</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3">Regeln, kurz</h2>
                  <ul className="text-white/80 space-y-1">
                    <li>• Offizielle SFV-Spielregeln</li>
                    <li>• Rückpassregel gilt</li>
                    <li>• Abstoss als Abwurf aus der Hand erlaubt, Volley und Dropkick verboten</li>
                    <li>• Kein Abseits bei Einwurf oder flachem Pass, Abseits möglich beim Dribbling ab dem zweiten Ballkontakt</li>
                    <li>• Penaltypunkt 7,5 m</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3">Trainingsschwerpunkt</h2>
                  <ul className="text-white/80 space-y-1">
                    <li>• Technik und Spielformen, situatives Coaching, Mentoring durch ältere Spielerinnen und Spieler</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
