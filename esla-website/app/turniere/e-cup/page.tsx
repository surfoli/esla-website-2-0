import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Container from '@/components/ui/Container';

export default function ECupPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <section className="relative py-16 md:py-24 bg-black">
        <Container>
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              Physio Sportiv <span className="text-esla-primary">Junioren E Cup</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-6 font-semibold">Play More Football im IFV</p>
            <p className="text-white/80 leading-relaxed">
              Der Physio Sportiv Junioren E Cup ist ein IFV-Wettbewerb im Rahmen von Play More Football.
              Gespielt wird auf Kleinfeldern (z.&nbsp;B. 3v3 bis 6v6) mit mehreren kurzen Spielsequenzen.
              Ziel ist viel Spielzeit, Fairplay und Spielfreude – Physio Sportiv unterstützt als Sponsor.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left mt-8">
              <div className="bg-white/10 border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-2">Altersklasse</p>
                <p className="text-white/80">Junioren E (typisch 9–10 Jahre), Play More Football Module</p>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-2">Format</p>
                <p className="text-white/80">Mehrere Kurzspiele pro Turnier – ohne klassischen Ranglistenfokus</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-20 bg-black/95 border-t border-white/5">
        <Container>
          <div className="max-w-5xl mx-auto text-white">
            <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-start">
              <div className="space-y-5">
                <h2 className="text-2xl md:text-3xl font-semibold text-esla-primary">Spielerlebnis für die Jüngsten</h2>
                <p className="text-white/80 leading-relaxed">
                  Der Physio Sportiv Junioren E Cup setzt auf kurze, intensive Matches mit vielen Ballkontakten und wechselnden
                  Spielformaten. Unsere Coaches planen jede Runde so, dass alle Kinder Erfolgserlebnisse sammeln und neue
                  Fertigkeiten ausprobieren können.
                </p>
                <p className="text-white/70 leading-relaxed">
                  Zwischen den Turnieren bauen wir im Training gezielte Module ein: Koordination, Ballführung, Mut im 1-gegen-1
                  und Spielintelligenz. Kinder übernehmen Aufgaben wie Materialchef oder Warm-up-Leitung, um Verantwortung zu lernen.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-white">Cup-Highlights</h3>
                <ul className="space-y-2 text-white/80 leading-relaxed">
                  <li><span className="font-semibold text-white">Spielspass:</span> Viele Tore, schnelle Wechsel, kurze Pausen.</li>
                  <li><span className="font-semibold text-white">Rotation:</span> Alle Positionen ausprobieren – auch Torhüter:innen.</li>
                  <li><span className="font-semibold text-white">Fairplay:</span> Gemeinsame Rituale mit Gegner:innen stärken Respekt.</li>
                  <li><span className="font-semibold text-white">Feedback:</span> Kindgerechte Reflexionen mit Bild- oder Stickerkarten.</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-sm uppercase tracking-wide text-white/60">Entwicklung</p>
                <p className="mt-2 text-lg font-semibold">Bewegungsfreude</p>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">Viele Wiederholungen stärken Motorik, Balance und Ballgefühl.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-sm uppercase tracking-wide text-white/60">Teamgefühl</p>
                <p className="mt-2 text-lg font-semibold">Gemeinsam feiern</p>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">Wir legen Wert auf Teamrituale, Elternsupport und Freude am Spiel.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-sm uppercase tracking-wide text-white/60">Perspektive</p>
                <p className="mt-2 text-lg font-semibold">Basis für D-Junioren</p>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">Die Erfahrungen bilden das Fundament für spätere Spielsysteme.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
