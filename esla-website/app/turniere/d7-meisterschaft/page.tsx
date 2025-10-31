import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Container from '@/components/ui/Container';
import TournamentMatches from '@/components/tournaments/TournamentMatches';

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

      {/* Spiele aus DB (Competition-Filter enthält D-7 Varianten, ohne Cup/Physio/PMF) */}
      <TournamentMatches 
        title="Junioren D-7" 
        patterns={[/D[-\s]?7/i, /\bD7\b/i, /Junioren\s*D-7/i]} 
        excludePatterns={[/Cup/i, /Physio\s*Sportiv/i, /Play\s*More\s*Football/i, /\bPMF\b/i]} 
      />

      <Footer />
    </main>
  );
}
