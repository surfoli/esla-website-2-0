import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Container from '@/components/ui/Container';

export default function D9CupPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <section className="relative py-16 md:py-24 bg-black">
        <Container>
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              Physio Sportiv <span className="text-esla-primary">Junioren D9er Cup</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-6 font-semibold">Cupwettbewerb im 9-gegen-9</p>
            <p className="text-white/80 leading-relaxed">
              Der D9er Cup ergänzt die reguläre Meisterschaft. Gespielt wird im 9-gegen-9 nach SFV-Regeln, organisiert über den Regionalverband
              (z. B. IFV). Physio Sportiv tritt als Sponsor auf. Der Cup bringt zusätzlichen K.-o.-Wettkampfcharakter und neue Gegner.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left mt-8">
              <div className="bg-white/10 border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-2">Alters-/Spielklasse</p>
                <p className="text-white/80">Junioren D (U12/U13), 9er-Fussball, Ballgrösse 4</p>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-2">Modus</p>
                <p className="text-white/80">Cup im K.-o.-System, Runden je nach Verband</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-20 bg-black/95 border-t border-white/5">
        <Container>
          <div className="max-w-5xl mx-auto text-white">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-start">
              <div className="space-y-5">
                <h2 className="text-2xl md:text-3xl font-semibold text-esla-primary">Cup-Erlebnisse mit Mehrwert</h2>
                <p className="text-white/80 leading-relaxed">
                  Der D9er Cup ergänzt die Meisterschaft mit intensiven K.-o.-Spielen gegen neue Gegner. Wir nutzen die
                  Turniere, um Spielvarianten zu testen, mentale Stärke aufzubauen und Standards zu perfektionieren.
                </p>
                <p className="text-white/70 leading-relaxed">
                  Zwischen den Runden analysieren wir Spielszenen, definieren Lernziele und bereiten die Teams gezielt auf das
                  nächste Highlight vor. So entsteht ein roter Faden zwischen Training, Cup-Auftritten und persönlicher Entwicklung.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-white">Cup-Checkliste</h3>
                <ul className="space-y-2 text-white/80 leading-relaxed">
                  <li><span className="font-semibold text-white">Matchplan:</span> Klare Rollen, Fokus auf Umschaltspiel &amp; Standards.</li>
                  <li><span className="font-semibold text-white">Coaching:</span> Live-Feedback, kurze Video-Analyse nach dem Spiel.</li>
                  <li><span className="font-semibold text-white">Regeneration:</span> Cool-down, Mobility und Mentales Reset.</li>
                  <li><span className="font-semibold text-white">Community:</span> Unterstützung durch Eltern &amp; Fans als Motivationsschub.</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-sm uppercase tracking-wide text-white/60">Entscheidungsmomente</p>
                <p className="mt-2 text-lg font-semibold">Mut &amp; Verantwortungsgefühl</p>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">Spieler:innen übernehmen Verantwortung in Drucksituationen.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-sm uppercase tracking-wide text-white/60">Spielidee</p>
                <p className="mt-2 text-lg font-semibold">Variantenreiche Standards</p>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">Wir erarbeiten kreative Varianten für Eckbälle, Freistösse und Einwürfe.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-sm uppercase tracking-wide text-white/60">Perspektive</p>
                <p className="mt-2 text-lg font-semibold">Von Cup zu Meisterschaft</p>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">Erfahrungen fliessen direkt in die Meisterschaftsspiele ein.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
