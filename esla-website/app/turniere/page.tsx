import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Container from '@/components/ui/Container';
import Link from 'next/link';

const meisterschaften = [
  {
    href: '/turniere/d9-meisterschaft',
    title: 'Junioren D-9 Meisterschaft',
    description: 'Grosses Feld, 9-gegen-9: Der Schritt Richtung Nachwuchs-Leistungsfussball.'
  },
  {
    href: '/turniere/d7-meisterschaft',
    title: 'Junioren D-7 Meisterschaft',
    description: 'Play-More-Football mit viel Ballkontakt und Fokus auf Entscheidungsfindung.'
  },
];

const cups = [
  {
    href: '/germany-cup',
    title: 'Germany Cup 2026',
    description: 'Internationales Highlight mit Top-Teams. Unser Gradmesser für den nächsten Level.'
  },
  {
    href: '/turniere/d9-cup',
    title: 'Physio Sportiv D9er-Cup',
    description: 'K.-o.-Wettbewerb für ältere D-Junior:innen mit Fokus auf Spielintelligenz.'
  },
  {
    href: '/turniere/d7-cup',
    title: 'Physio Sportiv D7er-Cup',
    description: 'Schnelle Spiele, viele Wiederholungen – perfekt für Tempo und Technik.'
  },
  {
    href: '/turniere/e-cup',
    title: 'Physio Sportiv E-Cup',
    description: 'Cup-Erlebnis für unsere Jüngsten mit wachsendem Wettkampfgefühl.'
  },
];

function CardGrid({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: typeof meisterschaften;
}) {
  return (
    <section className="py-12 md:py-20 border-t border-white/10 bg-black">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 md:mb-12 text-center text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-white/50">{subtitle}</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-black">{title}</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6 transition-transform duration-200 hover:-translate-y-1 hover:border-esla-primary/70 hover:bg-white/[0.09]"
              >
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-esla-primary via-esla-accent to-esla-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-white/70 leading-relaxed">{item.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-esla-primary">
                  Mehr erfahren
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function TurniereOverviewPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-b from-black via-black/95 to-black py-20 md:py-28">
        <Container>
          <div className="relative z-10 max-w-4xl text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-white/40">Turniere & Meisterschaften</p>
            <h1 className="mt-4 text-4xl md:text-6xl font-black leading-tight">
              Unsere Bühne für <span className="text-esla-primary">Meisterschaften</span> &{' '}
              <span className="text-esla-accent">Cups</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed">
              Ob Meisterschaftsalltag oder internationales Highlight: Hier findest du alle Wettbewerbe, in denen wir antreten.
              Jede Plattform bringt eigene Schwerpunkte – wir nutzen sie, um unsere Spieler:innen gezielt weiterzuentwickeln.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/spiele"
                className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:border-esla-primary hover:text-esla-primary"
              >
                Aktuelle Spielpläne
              </Link>
              <Link
                href="/team"
                className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:border-esla-accent hover:text-esla-accent"
              >
                Team kennenlernen
              </Link>
            </div>
          </div>

          <div className="pointer-events-none absolute -right-24 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-esla-primary/20 blur-3xl md:block" />
        </Container>
      </section>

      <CardGrid title="Unsere Meisterschaften" subtitle="Ligaformate" items={meisterschaften} />
      <CardGrid title="Unsere Cups" subtitle="K.-o.-Bühnen" items={cups} />

      <Footer />
    </main>
  );
}
