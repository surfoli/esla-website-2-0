import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Container from '@/components/ui/Container';

export default function D9MeisterschaftPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <section className="relative py-16 md:py-24 bg-black">
        <Container>
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              Meisterschaft <span className="text-esla-primary">Junioren D-9</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-6 font-semibold">Offizielle Liga im 9-gegen-9</p>
            <p className="text-white/80 leading-relaxed">
              Die Junioren D-9 Meisterschaft ist die Liga für 11–12-Jährige im 9-gegen-9 auf verkleinertem Grossfeld. 
              Sie bildet die Brücke vom Kinder- zum Jugendfussball und legt die Basis für Technik, Spielverständnis und Teamgeist.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left mt-8">
              <div className="bg-white/10 border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-2">Altersklasse</p>
                <p className="text-white/80">D-Junioren (U12/U13) – Alter ca. 11–12 Jahre</p>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-2">Spielform</p>
                <p className="text-white/80">9 Spieler (8 Feldspieler + 1 Torhüter), Ballgrösse 4</p>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-2">Spielfeld & Spielzeit</p>
                <p className="text-white/80">ca. 70–75 × 50–55 m, Spielzeiten gemäss Regionalverband</p>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-2">Regeln</p>
                <p className="text-white/80">gemäss SFV – Abseits und Rückpassregel aktiv, Fairplay im Fokus</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-20 bg-black/95 border-t border-white/5">
        <Container>
          <div className="max-w-5xl mx-auto text-white">
            <div className="grid gap-8 md:gap-12 md:grid-cols-2">
              <div className="space-y-5">
                <h2 className="text-2xl md:text-3xl font-bold text-esla-primary">Warum die Meisterschaft zählt</h2>
                <p className="text-white/80 leading-relaxed">
                  Die Meisterschaft bietet unseren Junioren eine regelmässige Bühne, um Verantwortung zu übernehmen
                  und spielerische Lösungen zu finden. Über mehrere Monate erhalten die Spieler wertvolles Feedback
                  zu Technik, Positionsspiel und Kommunikation.
                </p>
                <p className="text-white/70 leading-relaxed">
                  Durch Lernziele pro Block fokussieren wir uns auf konkrete Aspekte wie Umschaltmomente, Standards
                  oder defensive Organisation. Coaches analysieren jede Runde gemeinsam mit den Spieler:innen, damit
                  Fortschritte erlebbar werden.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                <h3 className="text-xl font-semibold">Schwerpunkte pro Saisonphase</h3>
                <ul className="space-y-2 text-white/80 leading-relaxed">
                  <li><span className="font-semibold text-white">Vorbereitung:</span> Mechanismen im Spielaufbau &amp; Standards festigen.</li>
                  <li><span className="font-semibold text-white">Herbstrunden:</span> Tempo hochhalten und Automatismen testen.</li>
                  <li><span className="font-semibold text-white">Winter:</span> Technikblöcke, Futsal, individuelle Entwicklung.</li>
                  <li><span className="font-semibold text-white">Frühling:</span> Anwendung &amp; Mut, Verantwortung in entscheidenden Spielen.</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-sm uppercase tracking-wide text-white/60">Trainingsschwerpunkt</p>
                <p className="mt-2 text-lg font-semibold">Positionsspiel &amp; Dynamik</p>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">Wir kombinieren individualtaktische Inputs mit gruppentaktischen Aufgaben.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-sm uppercase tracking-wide text-white/60">Teamgefühl</p>
                <p className="mt-2 text-lg font-semibold">Gemeinsame Match-Analyse</p>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">Spieler:innen reflektieren in Kleingruppen und definieren nächste Schritte.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-sm uppercase tracking-wide text-white/60">Ausblick</p>
                <p className="mt-2 text-lg font-semibold">Vorbereitung auf C-Junioren</p>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">Strukturiertes Athletik- und Mentoringprogramm begleitet den Wechsel.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
