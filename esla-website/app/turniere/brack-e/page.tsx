import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Container from '@/components/ui/Container';

export default function BrackEPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <section className="relative py-16 md:py-24 bg-black">
        <Container>
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              BRACK.CH Play More Football – <span className="text-esla-primary">Junioren E (2er Turniere)</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-6 font-semibold">Kinderfussball im IFV unter SFV-Regeln</p>
            <p className="text-white/80 leading-relaxed">
              Play More Football steht für kindgerechte Spielformen mit vielen Ballkontakten und kurzer Spielsequenzen. 
              In den Junioren E treten die Teams je nach Modul z.&nbsp;B. in 3v3, 4v4 oder 6v6 an – der Fokus liegt auf Spielzeit, Fairplay und Spielfreude.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-20 bg-black/95 border-t border-white/5">
        <Container>
          <div className="max-w-5xl mx-auto text-white">
            <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-start">
              <div className="space-y-5">
                <h2 className="text-2xl md:text-3xl font-semibold text-esla-primary">Play-More-Football-Philosophie</h2>
                <p className="text-white/80 leading-relaxed">
                  Mit Play More Football setzt der SFV auf kindgerechte Spielformen, die Kreativität fördern und
                  jedes Kind in den Mittelpunkt stellen. Unsere E-Junioren rotieren zwischen verschiedenen Spielfeldern,
                  erleben intensive Ballaktionen und übernehmen Verantwortung in jeder Runde.
                </p>
                <p className="text-white/70 leading-relaxed">
                  Die Turniere werden bewusst kurz gehalten: Viele Spiele in kompakter Zeit bedeuten zahlreiche Erfolgserlebnisse.
                  Coaches begleiten die Teams als Lernbegleiter:innen, beobachten individuelle Fortschritte und geben gezielte Impulse.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-white">Turniertag im Überblick</h3>
                <ul className="space-y-2 text-white/80 leading-relaxed">
                  <li><span className="font-semibold text-white">Ankommen:</span> Teamritual &amp; Fokus auf Tagesziel.</li>
                  <li><span className="font-semibold text-white">Rotation:</span> Verschiedene Module (3v3, 4v4, 6v6) für vielseitige Lernerfahrungen.</li>
                  <li><span className="font-semibold text-white">Coaching:</span> Positive Verstärkung, kurze Inputs, viel Eigeninitiative.</li>
                  <li><span className="font-semibold text-white">Reflexion:</span> Abschlussrunde mit Feedback und Highlight-Momenten.</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-sm uppercase tracking-wide text-white/60">Fokus</p>
                <p className="mt-2 text-lg font-semibold">Dribbling &amp; 1-gegen-1</p>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">Viele Wiederholungen in kleinen Feldern stärken Mut und Kreativität.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-sm uppercase tracking-wide text-white/60">Teamspirit</p>
                <p className="mt-2 text-lg font-semibold">Rotierende Captain-Rollen</p>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">Spieler:innen übernehmen Verantwortung für Warm-up &amp; Fairplay.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-sm uppercase tracking-wide text-white/60">Begleitung</p>
                <p className="mt-2 text-lg font-semibold">Eltern als Fans</p>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">Wir schaffen Raum für positive Unterstützung und gemeinsames Erlebnis.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
