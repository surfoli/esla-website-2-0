import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Award,
  Compass,
  Heart,
  Lightbulb,
  MapPin,
  Shield,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';

const stats = [
  {
    label: 'Spieler in Ausbildung',
    value: '120+',
    description: 'Talente aus der ganzen Zentralschweiz trainieren regelmässig mit uns.',
  },
  {
    label: 'Lizenzen & Partnerschaften',
    value: '6',
    description: 'Offiziell anerkannte Kooperationen & Zertifizierungen für erstklassige Förderung.',
  },
  {
    label: 'Trainingseinheiten pro Jahr',
    value: '450',
    description: 'Strukturiertes Coaching mit klaren Entwicklungszielen pro Altersstufe.',
  },
];

const pillars = [
  {
    icon: <Target className="w-8 h-8 text-esla-primary" aria-hidden="true" />,
    title: 'Klare Vision',
    description:
      'Wir verfolgen eine präzise Entwicklungsstrategie und begleiten jede Spielerin und jeden Spieler auf dem Weg zu individuellen Zielen.',
  },
  {
    icon: <Shield className="w-8 h-8 text-esla-primary" aria-hidden="true" />,
    title: 'Sichere Umgebung',
    description:
      'Ein professionelles, geschütztes Umfeld schafft Vertrauen und macht charakterliche Entwicklung möglich.',
  },
  {
    icon: <Users className="w-8 h-8 text-esla-primary" aria-hidden="true" />,
    title: 'Gemeinschaft',
    description:
      'Familiengefühl und Teamgeist prägen unseren Alltag – wir gewinnen und wachsen zusammen.',
  },
];

const values = [
  {
    icon: <Heart className="w-7 h-7 text-esla-primary" aria-hidden="true" />,
    title: 'Leidenschaft',
    description: 'Wir leben Fussball – mit Energie, Mut und echter Begeisterung.',
  },
  {
    icon: <Sparkles className="w-7 h-7 text-esla-primary" aria-hidden="true" />,
    title: 'Exzellenz',
    description: 'Hohe Standards in Training, Kommunikation und Auftreten sind unser täglicher Anspruch.',
  },
  {
    icon: <Lightbulb className="w-7 h-7 text-esla-primary" aria-hidden="true" />,
    title: 'Entwicklung',
    description: 'Technik, Taktik und Persönlichkeit – wir fördern den Menschen hinter dem Talent.',
  },
  {
    icon: <Star className="w-7 h-7 text-esla-primary" aria-hidden="true" />,
    title: 'Authentizität',
    description: 'Wir bleiben unserer Identität treu und führen mit Charakter und Integrität.',
  },
  {
    icon: <Zap className="w-7 h-7 text-esla-primary" aria-hidden="true" />,
    title: 'Mut',
    description: 'Fehler sind Chancen – wir geben Raum für Experimente und neue Ideen.',
  },
  {
    icon: <Compass className="w-7 h-7 text-esla-primary" aria-hidden="true" />,
    title: 'Verantwortung',
    description: 'Wir begleiten unsere Athlet:innen mit Weitblick in Schule, Alltag und Karriereplanung.',
  },
];

const milestones = [
  {
    year: '2019',
    title: 'Start der Akademie',
    description:
      'Gründung von TEAM ELITESOCCER in Luzern – mit dem Ziel, professionelles Training zugänglich zu machen.',
  },
  {
    year: '2021',
    title: 'Offizielle Anerkennung',
    description:
      'Anerkennung durch den SFV und Aufbau eines leistungsorientierten Ausbildungsprogramms.',
  },
  {
    year: '2025',
    title: 'Neustart im Sommer',
    description:
      'Wir richten Strukturen, Trainingspläne und Team neu aus und starten 2025 mit frischer Energie in die nächste Etappe.',
  },
];

const highlights = [
  {
    icon: <Award className="w-6 h-6 text-esla-primary" aria-hidden="true" />,
    title: 'Professionelle Leitung',
    description:
      'Cheftrainer Luqmon Adekunle (ehem. Profispieler) führt das Trainerteam mit klarer Philosophie und strukturierter Methodik.',
  },
  {
    icon: <Trophy className="w-6 h-6 text-esla-primary" aria-hidden="true" />,
    title: 'Nachhaltige Ergebnisse',
    description:
      'Unsere Spieler:innen schaffen den Sprung in regionale Auswahlteams und bleiben dem Fussball langfristig verbunden.',
  },
  {
    icon: <ArrowRight className="w-6 h-6 text-esla-primary" aria-hidden="true" />,
    title: 'Perspektiven schaffen',
    description:
      'Wir bauen Brücken zu Vereinen, Schulen und Förderprogrammen und begleiten jede nächste Etappe persönlich.',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-esla-light text-slate-900">
      <Navbar />

      <div className="pt-32 pb-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 space-y-20">
          <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-esla-secondary via-esla-secondary to-esla-primary text-white shadow-[0_30px_80px_-25px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-0 opacity-30">
              <Image
                src="/images/ESLA_Fussball_Stock_3.jpg"
                alt="ESLA Spieler in Aktion"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="relative grid gap-12 px-8 pb-12 pt-12 md:grid-cols-[1.2fr_0.8fr] md:px-14 md:pb-16 md:pt-16">
              <div className="flex flex-col justify-between space-y-10">
                <div className="space-y-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                    Team ESLA
                    <span className="inline-flex h-2 w-2 rounded-full bg-esla-primary" aria-hidden="true" />
                    Luzern
                  </span>
                  <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl">
                    Wir formen Talente zu Charakterspielern.
                  </h1>
                  <p className="text-lg text-white/80 md:text-xl">
                    TEAM ELITESOCCER – ESLA verbindet professionelle Fussballausbildung mit konsequenter Persönlichkeitsentwicklung. Wir schaffen einen Raum, in dem Leidenschaft auf Haltung trifft und junge Athlet:innen ihr Potenzial entfalten.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-base font-semibold text-esla-secondary shadow-lg shadow-esla-primary/20 transition-transform duration-200 hover:-translate-y-1 hover:bg-esla-light hover:text-esla-secondary"
                  >
                    Jetzt kennenlernen
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/team"
                    className="inline-flex items-center justify-center gap-3 rounded-full border border-white/30 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10"
                  >
                    Unser Trainerteam
                  </Link>
                </div>
              </div>

              <div className="relative flex flex-col justify-end">
                <div className="rounded-[28px] bg-white/10 p-8 backdrop-blur-lg">
                  <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-white/70">
                    <span className="inline-flex h-2 w-2 rounded-full bg-esla-primary" aria-hidden="true" />
                    Fakten
                  </div>
                  <div className="mt-6 space-y-6">
                    {stats.map((stat) => (
                      <div key={stat.label} className="border-b border-white/10 pb-6 last:border-none last:pb-0">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">{stat.label}</p>
                        <p className="mt-2 text-3xl font-black text-white">{stat.value}</p>
                        <p className="mt-2 text-sm text-white/80">{stat.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-esla-primary">
                Unsere Identität
              </p>
              <h2 className="text-3xl font-black text-esla-secondary md:text-4xl">
                Fussball, der Haltung zeigt – Willkommen bei TEAM ESLA.
              </h2>
              <p className="text-lg leading-relaxed text-slate-700">
                TEAM ELITESOCCER – ESLA wurde von <Link href="/team/luqmon" className="text-esla-primary underline decoration-2 underline-offset-4 transition-colors hover:text-esla-accent">Luqmon Adekunle</Link> gegründet. Als ehemaliger Profispieler kennt er die Herausforderungen auf und neben dem Platz aus erster Hand. Unsere Akademie bietet jungen Talenten aus Luzern und der gesamten Zentralschweiz eine professionelle Heimat.
              </p>
              <p className="text-lg leading-relaxed text-slate-700">
                Wir kombinieren moderne Trainingsmethoden mit gezieltem Mental- und Persönlichkeitstraining. Technik, Taktik und Athletik sind wichtige Bausteine – entscheidend ist aber, dass junge Menschen lernen, Verantwortung zu übernehmen, resilient zu sein und mit Freude jeden Fortschritt zu feiern.
              </p>
              <div className="flex flex-wrap items-center gap-6 rounded-2xl bg-white p-6 shadow-lg shadow-black/5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-esla-primary/10">
                  <Shield className="h-7 w-7 text-esla-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-base font-semibold text-esla-secondary">Offiziell anerkannt vom SFV</p>
                  <Link
                    href="https://matchcenter.ifv.ch/default.aspx?v=1761431&oid=7&lng=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-esla-primary transition-colors hover:text-esla-accent"
                  >
                    Matchcenter öffnen
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[30px] bg-white shadow-[0_25px_60px_-20px_rgba(0,0,0,0.25)]">
              <Image
                src="/images/ESLA_Fussball_Stock_5.jpg"
                alt="Trainingseinheit bei ESLA"
                width={900}
                height={900}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/90 p-6 text-sm text-slate-700 shadow-xl">
                <p className="font-semibold text-esla-secondary">Luzern – Sportplatz RUAG</p>
                <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="h-4 w-4 text-esla-primary" aria-hidden="true" />
                  Zentral gelegen, modern ausgestattet und perfekt für ambitionierte Spieler:innen.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[34px] border border-slate-200 bg-white p-10 shadow-sm">
            <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
              <div className="space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-esla-primary">Unsere Grundsätze</p>
                <h3 className="text-3xl font-black text-esla-secondary md:text-4xl">Werte, die unseren Weg leiten.</h3>
                <p className="text-lg leading-relaxed text-slate-700">
                  ESLA steht für konsequente Förderung, klare Werte und ein Umfeld, das Menschlichkeit und Leistung verbindet. Diese Haltung spiegelt sich in jedem Training, jedem Gespräch und jedem Auftritt wider.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {values.map((value) => (
                  <div
                    key={value.title}
                    className="group rounded-2xl border border-slate-200 bg-slate-50/50 p-6 transition duration-200 hover:-translate-y-1 hover:border-esla-primary/50 hover:bg-white hover:shadow-[0_14px_35px_-20px_rgba(197,41,88,0.6)]"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-inner">
                      {value.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-esla-secondary">{value.title}</h4>
                    <p className="mt-2 text-sm text-slate-600">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[32px] bg-gradient-to-br from-esla-secondary via-esla-secondary to-esla-primary px-8 py-14 text-white shadow-[0_28px_70px_-20px_rgba(0,0,0,0.6)] md:px-14">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Meilensteine</p>
                <h3 className="text-3xl font-black md:text-4xl">Unsere Reise – gestern, heute und morgen.</h3>
                <p className="text-lg text-white/80">
                  Wir wachsen konsequent weiter. Der Neustart im Sommer 2025 markiert den nächsten Schritt, damit junge Spieler:innen bei uns die beste Ausbildung und echte Perspektiven finden.
                </p>
              </div>

              <div className="space-y-8">
                {milestones.map((milestone) => (
                  <div key={milestone.year} className="flex flex-col gap-3 rounded-2xl bg-white/10 p-6 backdrop-blur">
                    <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-esla-primary">
                      <span className="inline-flex h-2 w-2 rounded-full bg-esla-primary" aria-hidden="true" />
                      {milestone.year}
                    </div>
                    <h4 className="text-xl font-semibold text-white">{milestone.title}</h4>
                    <p className="text-sm text-white/80">{milestone.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-esla-primary">Unsere DNA</p>
              <h3 className="text-3xl font-black text-esla-secondary md:text-4xl">Struktur, die Vertrauen schafft.</h3>
              <p className="text-lg text-slate-700">
                Jedes Training folgt einem klaren Plan. Von Technik über Spielintelligenz bis zu mentaler Stärke – wir begleiten unsere Athlet:innen Schritt für Schritt und dokumentieren jeden Fortschritt transparent.
              </p>
              <div className="space-y-4">
                {pillars.map((pillar) => (
                  <div key={pillar.title} className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-lg shadow-black/5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-esla-primary/10">
                      {pillar.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-esla-secondary">{pillar.title}</h4>
                      <p className="mt-1 text-sm text-slate-600">{pillar.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="rounded-2xl bg-esla-light p-6">
                <h4 className="text-base font-semibold text-esla-secondary">Ganzheitliches Coaching</h4>
                <p className="mt-2 text-sm text-slate-600">
                  Wir arbeiten mit individuellen Entwicklungsplänen, Feedbackgesprächen und mentalem Coaching. Jede Spielerin und jeder Spieler erhält eine klare Roadmap.
                </p>
              </div>
              <div className="rounded-2xl bg-esla-primary/10 p-6">
                <h4 className="text-base font-semibold text-esla-secondary">Community & Elternarbeit</h4>
                <p className="mt-2 text-sm text-slate-600">
                  Eltern werden aktiv eingebunden – Transparenz, Dialog und gemeinsame Werte prägen die Zusammenarbeit.
                </p>
              </div>
              <div className="rounded-2xl bg-esla-accent/10 p-6">
                <h4 className="text-base font-semibold text-esla-secondary">Netzwerk & Perspektiven</h4>
                <p className="mt-2 text-sm text-slate-600">
                  Wir vernetzen unsere Talente mit Partnervereinen, Schulen und Förderprogrammen – für den nächsten Schritt im Fussball und im Leben.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm">
            <div className="grid gap-10 md:grid-cols-2">
              {highlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50/40 p-8 transition duration-200 hover:border-esla-primary/40 hover:shadow-[0_16px_40px_-20px_rgba(197,41,88,0.5)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-inner">
                    {highlight.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-esla-secondary">{highlight.title}</h4>
                    <p className="mt-2 text-sm text-slate-600">{highlight.description}</p>
                  </div>
                </div>
              ))}

              <div className="flex h-full flex-col justify-between rounded-2xl bg-gradient-to-br from-esla-primary to-esla-accent p-8 text-white shadow-[0_22px_45px_-20px_rgba(197,41,88,0.65)]">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Versprechen</p>
                  <h4 className="text-2xl font-black">Wir investieren in Menschen.</h4>
                  <p className="text-sm text-white/80">
                    Unsere Athlet:innen sollen nicht nur bessere Spieler:innen werden – sie sollen wachsen, Verantwortung übernehmen und bereit sein für jeden nächsten Schritt.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href="/sponsoren-angebote"
                    className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-esla-primary transition-transform duration-200 hover:-translate-y-1"
                  >
                    Engagement entdecken
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[36px] bg-gradient-to-br from-white via-esla-light to-white p-12 text-center shadow-[0_30px_80px_-40px_rgba(0,0,0,0.45)]">
            <div className="mx-auto max-w-3xl space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-esla-primary">Next Step</p>
              <h3 className="text-3xl font-black text-esla-secondary md:text-4xl">Bereit, unsere Werte zu erleben?</h3>
              <p className="text-lg text-slate-700">
                Komm zum Probetraining oder nimm Kontakt mit uns auf. Wir freuen uns auf engagierte Spieler:innen, starke Persönlichkeiten und Menschen, die unsere Leidenschaft teilen.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-3 rounded-full bg-esla-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-esla-primary/30 transition-transform duration-200 hover:-translate-y-1 hover:bg-esla-accent"
                >
                  Kontakt aufnehmen
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                  href="/standort"
                  className="inline-flex items-center gap-3 rounded-full border border-esla-primary/30 px-8 py-4 text-base font-semibold text-esla-secondary transition-all duration-200 hover:border-esla-primary hover:bg-esla-primary/5"
                >
                  Standort entdecken
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
