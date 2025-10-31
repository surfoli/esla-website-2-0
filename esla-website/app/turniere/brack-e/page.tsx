import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Container from '@/components/ui/Container';
import TournamentMatches from '@/components/tournaments/TournamentMatches';

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

      {/* Nur PMF/BRACK Junioren E – ohne Physio-Sportiv-Cup */}
      <TournamentMatches 
        title="BRACK.CH Play More Football – Junioren E"
        patterns={[/Play\s*More\s*Football/i, /(Junioren\s*E|\bE\b)/i]}
        requireAll
        excludePatterns={[/Physio\s*Sportiv/i, /Cup/i, /D7/i, /D9/i]}
      />

      <Footer />
    </main>
  );
}
