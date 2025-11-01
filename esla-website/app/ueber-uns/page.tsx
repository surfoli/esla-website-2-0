import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { getTotalPlayers, getTotalStaff } from '@/data/team';
import {
  ArrowRight,
  Award,
  Brain,
  Compass,
  Heart,
  Lightbulb,
  MapPin,
  MessageCircle,
  Network,
  Shield,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';

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

const focusAreas = [
  {
    icon: <Brain className="w-7 h-7 text-white" aria-hidden="true" />,
    title: 'Ganzheitliches Coaching',
    description:
      'Individuelle Entwicklungspläne, Feedbackgespräche und mentales Coaching geben jeder Spielerin und jedem Spieler eine klare Roadmap.',
  },
  {
    icon: <MessageCircle className="w-7 h-7 text-white" aria-hidden="true" />,
    title: 'Community & Elternarbeit',
    description:
      'Eltern werden aktiv eingebunden – Transparenz, Dialog und gemeinsame Werte prägen die Zusammenarbeit.',
  },
  {
    icon: <Network className="w-7 h-7 text-white" aria-hidden="true" />,
    title: 'Netzwerk & Perspektiven',
    description:
      'Wir vernetzen unsere Talente mit Partnervereinen, Schulen und Förderprogrammen – für den nächsten Schritt im Fussball und im Leben.',
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
  const totalPlayers = getTotalPlayers();
  const totalStaff = getTotalStaff();
  const trainingSessionsPerWeek = 2;
  const trainingWeeksPerYear = 42;
  const trainingSessionsPerYear = trainingSessionsPerWeek * trainingWeeksPerYear;

  const stats = [
    {
      label: 'Spieler im Kader',
      value: String(totalPlayers),
      description: 'Aktiv im Trainings- und Spielbetrieb auf allen Positionen.',
    },
    {
      label: 'Trainer & Staff',
      value: String(totalStaff),
      description: 'Coaches und Support, die Training, Betreuung und Organisation tragen.',
    },
    {
      label: 'Trainingseinheiten pro Jahr',
      value: String(trainingSessionsPerYear),
      description: 'Durchschnittlich zwei geregelte Einheiten über rund 42 Saisonwochen – Ferienpausen eingerechnet.',
    },
    {
      label: 'Offizielle Anerkennung',
      value: 'SFV',
      description: 'Offiziell anerkannt vom Schweizerischen Fussballverband (SFV).',
    },
  ];

  const valueCardClasses =
    'group relative overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-br from-[#171024] via-[#2c1433] to-[#782046] p-6 text-white shadow-[0_25px_60px_-28px_rgba(28,12,48,0.58)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_30px_70px_-26px_rgba(32,14,54,0.62)]';

  const infoCardClasses =
    'rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white via-slate-900/6 to-white p-6 shadow-[0_18px_40px_-28px_rgba(15,15,25,0.5)] transition duration-200 hover:-translate-y-1 hover:border-slate-900/30 hover:shadow-[0_22px_48px_-26px_rgba(15,15,25,0.58)]';

  const dnaPillarCardClasses =
    'group relative flex items-start gap-4 rounded-2xl border border-white/70 bg-white/90 p-6 shadow-[0_18px_40px_-32px_rgba(15,15,25,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-esla-primary/35 hover:shadow-[0_26px_58px_-30px_rgba(197,41,88,0.45)]';

  const dnaFocusCardClasses =
    'group relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-[#f8c6d7] via-[#f6d9e3] to-[#fef2f6] p-6 text-esla-secondary shadow-[0_18px_46px_-28px_rgba(197,41,88,0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-white/45 hover:shadow-[0_24px_60px_-26px_rgba(197,41,88,0.62)]';

  return (
    <main className="min-h-screen bg-esla-light text-slate-900">
      <Navbar />

      <div className="pt-32 pb-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 space-y-20">
          <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#07070d] via-esla-secondary to-esla-primary text-white shadow-[0_30px_80px_-25px_rgba(0,0,0,0.45)]">
            <div className="absolute -left-10 top-[-10%] h-60 w-60 rounded-full bg-white/15 blur-[120px]" aria-hidden="true" />
            <div className="absolute -right-16 bottom-[-20%] h-72 w-72 rounded-full bg-white/30 blur-[140px]" aria-hidden="true" />
            <div className="absolute inset-0 opacity-25">
              <Image
                src="/images/ESLA_Fussball_Stock_3.jpg"
                alt=""
                fill
                className="object-cover"
                priority
                aria-hidden="true"
              />
            </div>
            <div className="relative grid gap-12 px-8 pb-12 pt-12 md:grid-cols-[1.2fr_0.8fr] md:px-14 md:pb-16 md:pt-16">
              <div className="flex flex-col justify-between space-y-10">
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href="https://matchcenter.ifv.ch/default.aspx?v=1761431&oid=7&lng=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/80 transition-colors duration-200 hover:border-white/40 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      SFV Matchcenter
                    </Link>
                    <Link
                      href="/standort"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/80 transition-colors duration-200 hover:border-white/40 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Standort RUAG
                    </Link>
                    <Link
                      href="/team"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/80 transition-colors duration-200 hover:border-white/40 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Team ESLA
                    </Link>
                  </div>
                  <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl">
                    Wir formen Talent und Charakter.
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
                <div className="relative rounded-[28px] bg-white/10 p-8 backdrop-blur-lg">
                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-esla-primary/30 blur-3xl" aria-hidden="true" />
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
          <section className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-white via-esla-light/40 to-white p-10 shadow-[0_24px_60px_-35px_rgba(0,0,0,0.65)] lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
            <div className="absolute -left-12 top-10 hidden h-48 w-48 rounded-full bg-esla-primary/15 blur-[100px] lg:block" aria-hidden="true" />
            <div className="absolute -right-16 bottom-0 hidden h-60 w-60 rounded-full bg-esla-secondary/15 blur-[120px] lg:block" aria-hidden="true" />
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-esla-primary">
                Unsere Identität
              </p>
              <h2 className="text-3xl font-black text-esla-secondary md:text-4xl">
                Fussball, der Haltung zeigt – Willkommen bei TEAM ESLA.
              </h2>
              <p className="text-lg leading-relaxed text-slate-700">
                TEAM ELITESOCCER – ESLA wurde von <Link href="/team/luqmon" className="text-esla-accent underline decoration-2 underline-offset-4 transition-colors hover:text-esla-accent">Luqmon Adekunle</Link> gegründet. Als ehemaliger Profispieler kennt er die Herausforderungen auf und neben dem Platz aus erster Hand. Unsere Akademie bietet jungen Talenten aus Luzern und der gesamten Zentralschweiz eine professionelle Heimat.
              </p>
              <p className="text-lg leading-relaxed text-slate-700">
                Wir kombinieren moderne Trainingsmethoden mit gezieltem Mental- und Persönlichkeitstraining. Technik, Taktik und Athletik sind wichtige Bausteine – entscheidend ist aber, dass junge Menschen lernen, Verantwortung zu übernehmen, resilient zu sein und mit Freude jeden Fortschritt zu feiern.
              </p>
              <Link
                href="https://matchcenter.ifv.ch/default.aspx?v=1761431&oid=7&lng=1"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-wrap items-center gap-6 rounded-2xl bg-gradient-to-r from-[#09090f] via-esla-secondary to-esla-primary p-6 text-white shadow-[0_24px_55px_-28px_rgba(0,0,0,0.65)] transition-transform duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-esla-primary/10 aspect-square">
                  <Shield className="h-7 w-7 text-esla-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-base font-semibold text-white">Offiziell anerkannt vom SFV</p>
                  <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors group-hover:text-white">
                    Matchcenter öffnen
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </div>

            <Link
              href="/standort"
              className="group relative block overflow-hidden rounded-[30px] bg-white shadow-[0_25px_60px_-20px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_32px_70px_-24px_rgba(0,0,0,0.32)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-esla-primary/40"
            >
              <Image
                src="/images/esla-fussball-stock-1.jpg"
                alt="Trainingseinheit bei ESLA"
                width={900}
                height={900}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/90 p-6 text-sm text-slate-700 shadow-xl transition-colors duration-200 group-hover:bg-white">
                <p className="font-semibold text-esla-secondary">Luzern – Sportplatz RUAG</p>
                <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="h-4 w-4 text-esla-primary" aria-hidden="true" />
                  Zentral gelegen, modern ausgestattet und perfekt für ambitionierte Spieler:innen.
                </p>
              </div>
            </Link>
          </section>

          <section className="rounded-[34px] border border-slate-200 bg-white/95 p-10 shadow-[0_24px_55px_-30px_rgba(197,41,88,0.55)]">
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
                  <div key={value.title} className={valueCardClasses}>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-40 transition-opacity duration-200 group-hover:opacity-55" aria-hidden="true" />
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white shadow-inner aspect-square">
                      {value.icon}
                    </div>
                    <div className="relative mt-4 space-y-2">
                      <h4 className="text-lg font-semibold text-white">{value.title}</h4>
                      <p className="text-sm text-white/80">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="relative overflow-hidden rounded-[36px] border border-white/60 bg-gradient-to-br from-white via-rose-50/80 to-white p-10 shadow-[0_26px_60px_-34px_rgba(0,0,0,0.55)]">
            <div className="absolute -top-20 left-10 h-48 w-48 rounded-full bg-esla-primary/12 blur-[110px]" aria-hidden="true" />
            <div className="absolute -bottom-24 right-4 h-56 w-56 rounded-full bg-esla-secondary/12 blur-[130px]" aria-hidden="true" />
            <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div className="space-y-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-esla-primary">Unsere DNA</p>
                <div className="space-y-4">
                  <h3 className="text-3xl font-black text-esla-secondary md:text-4xl">Struktur, die Vertrauen schafft.</h3>
                  <p className="text-lg leading-relaxed text-slate-700">
                    Jedes Training folgt einem klaren Plan. Von Technik über Spielintelligenz bis zu mentaler Stärke – wir begleiten unsere Athlet:innen Schritt für Schritt und dokumentieren jeden Fortschritt transparent.
                  </p>
                </div>
                <div className="grid gap-4">
                  {pillars.map((pillar) => (
                    <div key={pillar.title} className={dnaPillarCardClasses}>
                      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-esla-primary/20 bg-esla-primary/10 text-esla-primary shadow-inner aspect-square">
                        {pillar.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900">{pillar.title}</h4>
                        <p className="mt-1 text-sm text-slate-600">{pillar.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative rounded-[34px] border border-white/40 bg-gradient-to-br from-[#e75f8c] via-[#f18da8] to-[#fbd8e2] p-8 shadow-[0_26px_58px_-30px_rgba(197,41,88,0.58)]">
                <div className="absolute -right-10 top-6 h-36 w-36 rounded-full bg-white/25 blur-[100px]" aria-hidden="true" />
                <div className="absolute -left-12 bottom-0 h-40 w-40 rounded-full bg-esla-primary/25 blur-[120px]" aria-hidden="true" />
                <div className="relative space-y-6">
                  <div className="space-y-2 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">Wir begleiten ganzheitlich</p>
                    <h4 className="text-2xl font-black tracking-tight">Coaching, Community und Perspektiven.</h4>
                    <p className="text-sm text-white/85">
                      Talententwicklung endet nicht nach dem Training. Wir schaffen einen geschützten Rahmen, fördern Austausch und öffnen neue Wege für unsere Athlet:innen.
                    </p>
                  </div>
                  <div className="grid gap-4">
                    {focusAreas.map((focus) => (
                      <div key={focus.title} className={dnaFocusCardClasses}>
                        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20 shadow-inner aspect-square">
                          {focus.icon}
                        </div>
                        <div className="mt-4 space-y-1 text-left">
                          <h5 className="text-lg font-semibold">{focus.title}</h5>
                          <p className="text-sm text-esla-secondary/90">{focus.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[32px] border border-white/25 bg-white/95 p-10 shadow-[0_24px_60px_-35px_rgba(0,0,0,0.58)]">
            <div className="grid gap-10 md:grid-cols-2">
              {highlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="flex flex-col gap-4 rounded-2xl border border-esla-primary/10 bg-gradient-to-br from-[#fff3f8] via-white/97 to-[#fff7fb] p-8 transition duration-200 hover:-translate-y-1 hover:border-esla-primary/40 hover:shadow-[0_18px_44px_-20px_rgba(197,41,88,0.45)]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-esla-primary/20 bg-esla-primary/10 text-esla-primary shadow-inner aspect-square">
                    {highlight.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-esla-secondary">{highlight.title}</h4>
                    <p className="mt-2 text-sm text-slate-600">{highlight.description}</p>
                  </div>
                </div>
              ))}

              <div className="flex h-full flex-col justify-between rounded-2xl bg-gradient-to-br from-esla-secondary via-esla-primary to-esla-accent p-8 text-white shadow-[0_24px_55px_-22px_rgba(197,41,88,0.7)]">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Unterstütze uns</p>
                  <h4 className="text-2xl font-black">Gemeinsam investieren wir in Menschen.</h4>
                  <p className="text-sm text-white/80">
                    Mit deiner Unterstützung wachsen unsere Athlet:innen nicht nur sportlich, sondern auch als Persönlichkeiten – sie übernehmen Verantwortung und sind bereit für jeden nächsten Schritt.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href="/sponsoren-angebote"
                    className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-esla-primary transition-transform duration-200 hover:-translate-y-1"
                  >
                    Sponsoring & Gönner entdecken
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#1a0d1f] via-esla-primary to-[#ff5f8f] p-12 text-center text-white shadow-[0_30px_80px_-40px_rgba(0,0,0,0.52)]">
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-white/10" aria-hidden="true" />
            <div className="absolute -left-20 top-4 h-48 w-48 rounded-full bg-esla-primary/35 blur-[140px]" aria-hidden="true" />
            <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-esla-accent/30 blur-[150px]" aria-hidden="true" />
            <div className="relative mx-auto max-w-3xl space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Next Step</p>
              <h3 className="text-3xl font-black md:text-4xl">Bereit, unsere Werte zu erleben?</h3>
              <p className="text-lg text-white/85">
                Komm zum Probetraining oder nimm Kontakt mit uns auf. Wir freuen uns auf engagierte Spieler:innen, starke Persönlichkeiten und Menschen, die unsere Leidenschaft teilen.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-semibold text-esla-secondary shadow-lg shadow-black/20 transition-transform duration-200 hover:-translate-y-1 hover:bg-esla-light/80"
                >
                  Kontakt aufnehmen
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                  href="/standort"
                  className="inline-flex items-center gap-3 rounded-full border border-white/40 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10"
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
