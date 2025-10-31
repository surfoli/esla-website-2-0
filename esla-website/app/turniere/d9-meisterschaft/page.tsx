import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Container from '@/components/ui/Container';
import TournamentMatches from '@/components/tournaments/TournamentMatches';

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
                <p className="text-white/80">D-Junioren (U12/U13) – Jahrgänge ca. 2013–2014</p>
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

      {/* Spiele aus DB (Competition-Filter enthält D-9 Varianten) */}
      <TournamentMatches 
        title="Junioren D-9" 
        patterns={[/D[-\s]?9/i, /\bD9\b/i, /Junioren D-9/i]} 
        excludePatterns={[/Cup/i, /Physio\s*Sportiv/i, /Play\s*More\s*Football/i, /\bPMF\b/i]}
      />

      <Footer />
    </main>
  );
}
