import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Container from '@/components/ui/Container';

export default function D9MeisterschaftPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <section className="relative py-16 md:py-24 bg-black">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h1 className="text-4xl md:text-6xl font-black mb-4 text-white">
                Meisterschaft <span className="text-esla-primary">Junioren D-9</span>
              </h1>
              <p className="text-white/90 text-lg md:text-xl mb-6 font-semibold">Offizielle Liga im 9-gegen-9</p>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-3">Altersklasse</h2>
                  <ul className="text-white/80 space-y-1">
                    <li>• 11 bis 12 Jahre, ältere D-Junioren</li>
                    <li>• Übergang zur C-Kategorie (13 J.)</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3">Funktion</h2>
                  <ul className="text-white/80 space-y-1">
                    <li>• Vorbereitung auf den Grossfeld-Fussball</li>
                    <li>• Grössere Spielfläche, mehr Taktik und Positionstreue</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3">Spielform</h2>
                  <ul className="text-white/80 space-y-1">
                    <li>• 9 Spieler, 8 Feldspieler und 1 Torhüter, mindestens 7 auf dem Feld</li>
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
                    <li>• 68–57 m × 52–41 m, Tore 5 × 2 m, Sicherheitsabstand 3 m</li>
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
                    <li>• Positionsspiel und Dynamik, gruppentaktische Abläufe, gemeinsame Match-Analyse in Kleingruppen</li>
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
