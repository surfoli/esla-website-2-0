import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Container from '@/components/ui/Container';
import TournamentMatches from '@/components/tournaments/TournamentMatches';

export default function ECupPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <section className="relative py-16 md:py-24 bg-black">
        <Container>
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              Physio Sportiv <span className="text-esla-primary">Junioren E Cup</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-6 font-semibold">Play More Football im IFV</p>
            <p className="text-white/80 leading-relaxed">
              Der Physio Sportiv Junioren E Cup ist ein IFV-Wettbewerb im Rahmen von Play More Football.
              Gespielt wird auf Kleinfeldern (z.&nbsp;B. 3v3 bis 6v6) mit mehreren kurzen Spielsequenzen.
              Ziel ist viel Spielzeit, Fairplay und Spielfreude – Physio Sportiv unterstützt als Sponsor.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left mt-8">
              <div className="bg-white/10 border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-2">Altersklasse</p>
                <p className="text-white/80">Junioren E (typisch 9–10 Jahre), Play More Football Module</p>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-2">Format</p>
                <p className="text-white/80">Mehrere Kurzspiele pro Turnier – ohne klassischen Ranglistenfokus</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <TournamentMatches title="Physio Sportiv Junioren E Cup" patterns={[/Physio\s*Sportiv.*E/i, /Junioren\s*E.*Cup/i, /Play\s*More\s*Football/i]} />

      <Footer />
    </main>
  );
}
