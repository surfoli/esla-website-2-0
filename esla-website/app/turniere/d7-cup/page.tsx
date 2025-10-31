import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Container from '@/components/ui/Container';

export default function D7CupPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <section className="relative py-16 md:py-24 bg-black">
        <Container>
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              Physio Sportiv <span className="text-esla-primary">Junioren D7er Cup</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-6 font-semibold">Cup-Runde im 7-gegen-7</p>
            <p className="text-white/80 leading-relaxed">
              Der D7er Cup kombiniert Play-More-Football-Elemente mit K.&nbsp;o.-Spannung. Organisiert durch den IFV, 
              unterstützt von Physio Sportiv. Ideal für unsere Talente, um Verantwortung und Wettkampferfahrung zu sammeln.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-20 bg-black/95 border-t border-white/5">
        <Container>
          <div className="max-w-5xl mx-auto text-white">
            <div className="grid gap-8 md:grid-cols-2 md:items-start">
              <div className="space-y-5">
                <h2 className="text-2xl md:text-3xl font-semibold text-esla-primary">Cup mit Entwicklungsschub</h2>
                <p className="text-white/80 leading-relaxed">
                  Der D7er Cup verlangt schnelle Entscheidungen. Kleine taktische Aufgaben wie Pressing-Auslöser,
                  Überzahl-Schaffung und Standards unter Wettkampfdruck helfen unseren Spieler:innen, Verantwortung
                  zu übernehmen und das Spiel zu lesen.
                </p>
                <p className="text-white/70 leading-relaxed">
                  Wir verbinden jeden Cup-Auftritt mit klaren Lernzielen aus dem Training. Matchclips, Feedbackrunden
                  und kurze 1:1-Gespräche sorgen dafür, dass jede Runde einen messbaren Mehrwert bringt.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-white">Matchday-Setup</h3>
                <ul className="space-y-2 text-white/80 leading-relaxed">
                  <li><span className="font-semibold text-white">Warm-up:</span> Dynamische Aktivierung &amp; Torabschluss-Serien.</li>
                  <li><span className="font-semibold text-white">Analysen:</span> Fokus auf Pressing, Umschaltmomente und Standards.</li>
                  <li><span className="font-semibold text-white">Mentales:</span> Routinen für Fokus, Selbstvertrauen und Teamzusammenhalt.</li>
                  <li><span className="font-semibold text-white">Nachbereitung:</span> Highlight-Momente teilen, nächste Schritte definieren.</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-sm uppercase tracking-wide text-white/60">Kompetenz</p>
                <p className="mt-2 text-lg font-semibold">Spielintelligenz</p>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">Spieler:innen lernen, Räume zu lesen und im richtigen Moment zu handeln.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-sm uppercase tracking-wide text-white/60">Teamwork</p>
                <p className="mt-2 text-lg font-semibold">Gemeinsam Lösungen finden</p>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">Wir fördern offene Kommunikation und schnelle Anpassungen auf dem Feld.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-sm uppercase tracking-wide text-white/60">Entwicklung</p>
                <p className="mt-2 text-lg font-semibold">Schritt Richtung D9/C-Junioren</p>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">Die Cup-Erfahrungen bilden die Basis für den nächsten Entwicklungsschritt.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
