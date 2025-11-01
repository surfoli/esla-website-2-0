import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Container from '@/components/ui/Container';

export default function BrackEPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <section className="relative py-16 md:py-24 bg-black">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h1 className="text-4xl md:text-6xl font-black mb-4 text-white">
                Meisterschaft <span className="text-esla-primary">BRACK.CH Play More Football 2er Turniere</span>
              </h1>
              <p className="text-white/90 text-lg md:text-xl mb-6 font-semibold">Junioren E, Stärkeklasse 2, Herbstrunde, Gruppe 4</p>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-3">Altersklasse</h2>
                  <ul className="text-white/80 space-y-1">
                    <li>• Ca. 9 bis 10 Jahre, Junioren E, Mädchen können ein Jahr älter sein.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3">Spielform</h2>
                  <ul className="text-white/80 space-y-1">
                    <li>• Turnierformat mit kleinen Teams, Rotation zwischen Kleinfeld und grösserem Feld gemäss SFV-Vorgaben für E/FF12.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3">Spielbetrieb</h2>
                  <ul className="text-white/80 space-y-1">
                    <li>• Mehrere kurze Spielrunden im Rotationssystem an einem Turniertag, keine klassische Einzelpartie-Liga.</li>
                    <li>• Organisation und Zeiten pro Wochenende durch den Regionalverband vorgegeben, Detailzeiten im Clubcorner.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3">Spielfeld</h2>
                  <ul className="text-white/80 space-y-1">
                    <li>• Markierte Kinderfelder gemäss SFV Play-More-Football, je nach Runde 3-gegen-3 und 6-gegen-6 auf separaten Feldern.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3">Regeln, kurz</h2>
                  <ul className="text-white/80 space-y-1">
                    <li>• Offizielle SFV-Spielregeln für Kinderfussball E/FF12.</li>
                    <li>• Fair Play, viele Ballkontakte, Wechsel fliessend gemäss Turnierleitung.</li>
                    <li>• Abstoss als Pass flach aus der Zone, Dropkick nicht erlaubt.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3">Besonderes</h2>
                  <ul className="text-white/80 space-y-1">
                    <li>• „2er Turniere“ bedeutet: Aus einer E-Mannschaft werden vor Ort zwei Teams gebildet, die parallel auf zwei Spielfeldern spielen. Dadurch erhalten alle Kinder mehr Einsatzzeit.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-3">Namensgebung</h2>
                  <ul className="text-white/80 space-y-1">
                    <li>• „BRACK.CH“ ist der Titelsponsor des SFV-Kinderfussballs.</li>
                    <li>• „Play More Football“ ist das offizielle SFV-Spielformat für G, F und E, mit turnierbasiertem Rotationssystem.</li>
                    <li>• „Stärkeklasse 2“, „Herbstrunde“, „Gruppe 4“ sind regionale Einteilungen für Niveau, Saisonphase und Gruppe.</li>
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
