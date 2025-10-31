import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Container from '@/components/ui/Container';
import TournamentMatches from '@/components/tournaments/TournamentMatches';

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

      {/* @ts-ignore Async Server Component in app dir ist erlaubt */}
      <TournamentMatches 
        title="Junioren D9er Cup" 
        patterns={[/D9(?:er)?\s*Cup/i, /Junioren\s*D9.*Cup/i, /Physio\s*Sportiv.*D9/i]} 
        excludePatterns={[/Meisterschaft/i, /Play\s*More\s*Football/i, /\bPMF\b/i]} 
      />

      <Footer />
    </main>
  );
}
