import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Container from '@/components/ui/Container';

export default function D7MeisterschaftPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <section className="relative py-16 md:py-24 bg-black">
        <Container>
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              Meisterschaft <span className="text-esla-primary">Junioren D-7</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-6 font-semibold">Einstieg in den leistungsorientierten Kinderfussball</p>
            <p className="text-white/80 leading-relaxed">
              In der D-7 Meisterschaft (7-gegen-7) sammeln 11–12-Jährige viele Ballkontakte auf kleinerem Feld.
              Der Fokus liegt auf Technik, Kreativität und Teamverständnis – optimale Vorbereitung auf D-9 und C-Junioren.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left mt-8">
              <div className="bg-white/10 border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-2">Spielform</p>
                <p className="text-white/80">7 Spieler (6 Feldspieler + 1 Torhüter), kindgerechte Regeln</p>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-2">Ziel</p>
                <p className="text-white/80">Technik, Übersicht, Spielfreude – Lernen durch Spielen</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-20 bg-black/95 border-t border-white/5">
        <Container>
          <div className="max-w-5xl mx-auto text-white">
            <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
              <div className="space-y-5">
                <h2 className="text-2xl md:text-3xl font-semibold text-esla-primary">Ausbildungsalltag in der Meisterschaft</h2>
                <p className="text-white/80 leading-relaxed">
                  Die D-7 Meisterschaft sorgt für regelmässige Vergleichsmöglichkeiten mit Teams auf ähnlichem Niveau.
                  Wir nutzen diese Plattform, um Spielprinzipien zu verinnerlichen: Ballzirkulation, schnelles Umschalten
                  und zielgerichtetes Passspiel.
                </p>
                <p className="text-white/70 leading-relaxed">
                  Jede Woche setzt das Trainer:innen-Team klare Schwerpunkte. Wir arbeiten mit Technikparcours, Spielformen
                  mit Provokationsregeln und Video-Review, damit die Fortschritte im Spiel sichtbar werden.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-white">Was wir vermitteln</h3>
                <ul className="space-y-2 text-white/80 leading-relaxed">
                  <li><span className="font-semibold text-white">Kreativität:</span> Mut, Lösungen im 1-gegen-1 zu suchen.</li>
                  <li><span className="font-semibold text-white">Organisation:</span> Klare Rollen in Defensive und Offensive.</li>
                  <li><span className="font-semibold text-white">Resilienz:</span> Umgang mit Rückschlägen &amp; Fokus behalten.</li>
                  <li><span className="font-semibold text-white">Leadership:</span> Captain- und Mentor:innenrollen rotieren.</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-sm uppercase tracking-wide text-white/60">Trainingsmix</p>
                <p className="mt-2 text-lg font-semibold">Technik x Spielformen</p>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">Kombination aus Technikstationen und situativem Coaching im Spiel.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-sm uppercase tracking-wide text-white/60">Begleitung</p>
                <p className="mt-2 text-lg font-semibold">Mentoringprogramm</p>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">Ältere Spieler:innen unterstützen als Mentoren bei Matchvorbereitung.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-sm uppercase tracking-wide text-white/60">Vision</p>
                <p className="mt-2 text-lg font-semibold">Persönliche Entwicklung</p>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">Wir stärken Persönlichkeit, Verantwortung und Freude am Fussball.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
