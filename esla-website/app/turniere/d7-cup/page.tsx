import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Container from '@/components/ui/Container';
import TournamentMatches from '@/components/tournaments/TournamentMatches';

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

      <TournamentMatches 
        title="Physio Sportiv Junioren D7er Cup" 
        patterns={[/D7(?:er)?\s*Cup/i, /Junioren\s*D7.*Cup/i, /Physio\s*Sportiv.*D7/i]} 
        excludePatterns={[/Meisterschaft/i, /Play\s*More\s*Football/i, /\bPMF\b/i]} 
      />

      <Footer />
    </main>
  );
}
