import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { ArrowRight, Check, Star, TrendingUp, Award, Users, Heart, MapPin, Smartphone, Handshake, Flame, Trophy, Zap } from 'lucide-react';
import { getTotalPlayers, getTotalStaff } from '@/data/team';

// Encodiertes SVG-Muster für den Hintergrund (verhindert Parser-Probleme)
const GRID_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(#grid)"/></svg>`;
const GRID_BG = `url("data:image/svg+xml,${encodeURIComponent(GRID_SVG)}")`;

const packages = [
  {
    name: 'Hauptsponsor',
    icon: Star,
    featured: true,
    cardGradient: 'from-[#090812] via-[#05030a] to-[#000000]',
    iconGradient: 'from-esla-primary via-[#f54c8c] to-esla-accent',
    emailSubject: 'Sponsoring Anfrage – Hauptsponsor',
    emailBody:
      'Guten Tag Team ESLA,\n\nwir möchten Hauptsponsor werden und freuen uns auf weitere Informationen zu den nächsten Schritten.\n\nSportliche Grüsse\n[Name / Unternehmen]',
    features: [
      'Logo auf Trikotvorderseite',
      'Präsenz auf Social Media',
      'Prominent auf Website',
      'Maximale Sichtbarkeit',
    ],
  },
  {
    name: 'Ärmelsponsor',
    icon: Award,
    emailSubject: 'Sponsoring Anfrage – Ärmelsponsor',
    emailBody:
      'Guten Tag Team ESLA,\n\nwir möchten Ärmelsponsor werden und bitten um Kontaktaufnahme.\n\nFreundliche Grüsse\n[Name / Unternehmen]',
    features: [
      'Logo auf dem Ärmel',
      'Präsenz auf Social Media',
      'Website-Präsenz',
    ],
  },
  {
    name: 'Hosensponsor',
    icon: TrendingUp,
    emailSubject: 'Sponsoring Anfrage – Hosensponsor',
    emailBody:
      'Guten Tag Team ESLA,\n\nwir interessieren uns für das Paket als Hosensponsor. Bitte melden Sie sich für die weiteren Details.\n\nBeste Grüsse\n[Name / Unternehmen]',
    features: [
      'Logo auf der Hose',
      'Präsenz auf Social Media',
      'Website-Präsenz',
    ],
  },
  {
    name: 'Trainingssponsor',
    icon: Users,
    emailSubject: 'Sponsoring Anfrage – Trainingssponsor',
    emailBody:
      'Guten Tag Team ESLA,\n\nwir möchten Trainingssponsor werden und freuen uns auf weitere Informationen.\n\nFreundliche Grüsse\n[Name / Unternehmen]',
    features: [
      'Logo auf Trainingsshirt',
      'Website-Präsenz',
    ],
  },
  {
    name: 'Event Sponsor',
    icon: Award,
    emailSubject: 'Sponsoring Anfrage – Event Sponsor',
    emailBody:
      'Guten Tag Team ESLA,\n\nwir interessieren uns für das Event Sponsor Paket und möchten Details besprechen.\n\nHerzliche Grüsse\n[Name / Unternehmen]',
    features: [
      'Logo auf Eventbannern',
      'Nennungen auf Plakaten',
      'Website-Präsenz',
    ],
  },
  {
    name: 'Gönner',
    icon: Heart,
    cardGradient: 'from-[#2b0010] via-[#7a0f2e] to-[#c52958]',
    iconGradient: 'from-[#ff7ba7] via-[#f55395] to-[#c52958]',
    emailSubject: 'Unterstützung als Gönner:in',
    emailBody:
      'Guten Tag Team ESLA,\n\nwir möchten euch als Gönner unterstützen. Bitte sendet uns die nächsten Schritte.\n\nBeste Grüsse\n[Name / Organisation]',
    features: [
      'Namentliche Erwähnung',
      'Website & Instagram',
    ],
  },
];

const totalPlayers = getTotalPlayers();
const totalStaff = getTotalStaff();
const statsData = [
  { value: '2025', label: 'Gründungsjahr' },
  { value: String(totalPlayers), label: 'Spieler' },
  { value: String(totalStaff), label: 'Staff' },
  { value: '2x', label: 'Training pro Woche' },
  { value: 'SFV', label: 'Offiziell anerkannt' },
];

const valuesData = [
  { icon: Flame, title: 'Leidenschaft' },
  { icon: Handshake, title: 'Respekt' },
  { icon: TrendingUp, title: 'Entwicklung' },
  { icon: Zap, title: 'Mut & Selbstvertrauen' },
  { icon: Trophy, title: 'Teamgeist' },
];

const advantagesData = [
  { Icon: MapPin, title: 'Regionale Sichtbarkeit', description: 'Erhöhen Sie Ihren Bekanntheitsgrad in der lokalen Community' },
  { Icon: Heart, title: 'Nachhaltiges Engagement', description: 'Investieren Sie in die Zukunft des Jugendsports' },
  { Icon: Smartphone, title: 'Digitale Präsenz', description: 'Profitieren Sie von unserer aktiven Social Media Präsenz' },
  { Icon: Handshake, title: 'Community Verbindung', description: 'Werden Sie Teil unserer wachsenden Fussball-Familie' },
];

const benefits = [
  {
    icon: TrendingUp,
    title: 'Exklusive Sichtbarkeit',
    description: 'Erhöhen Sie Ihre Markensichtbarkeit durch unsere wachsende Community und regionale Präsenz.',
  },
  {
    icon: Users,
    title: 'Gemeinschaft & Netzwerk',
    description: 'Werden Sie Teil einer engagierten Fussball-Community und knüpfen Sie wertvolle Kontakte.',
  },
  {
    icon: Heart,
    title: 'Soziales Engagement',
    description: 'Investieren Sie in die Zukunft junger Talente und fördern Sie die lokale Jugendentwicklung.',
  },
  {
    icon: Award,
    title: 'Digitale Präsenz',
    description: 'Profitieren Sie von unserer starken Social-Media-Präsenz mit regelmäßigen Posts und Stories.',
  },
];

export default function SponsorenAngebotePage() {
  return (
    <main className="min-h-screen bg-esla-light text-esla-secondary">
      <Navbar />

      <div className="pt-32 pb-24">
        <Container className="space-y-24">
          {/* Hero */}
          <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#07070d] via-esla-secondary to-esla-primary text-white shadow-[0_30px_80px_-25px_rgba(0,0,0,0.45)]">
            <div className="absolute -left-16 -top-12 h-60 w-60 rounded-full bg-white/15 blur-[120px]" aria-hidden="true" />
            <div className="absolute -right-20 bottom-[-30%] h-72 w-72 rounded-full bg-esla-accent/25 blur-[140px]" aria-hidden="true" />
            <div
              className="absolute inset-y-0 right-0 hidden lg:block w-1/3 opacity-30"
              style={{
                backgroundImage: GRID_BG,
                backgroundSize: 'auto',
                backgroundRepeat: 'repeat',
              }}
            />
            <div className="relative mx-auto max-w-3xl space-y-8 px-6 py-16 text-center md:px-12 md:py-20">
              <span className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                Sponsoring
              </span>
              <h1 className="text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Unterstützen Sie unser Team und werden auch Sie <span className="text-esla-accent">Sponsor</span>
              </h1>
              <p className="text-lg text-white/85 md:text-xl">
                Wir entwickeln Spieler:innen und stärken Persönlichkeiten. Seit 2025 offiziell vom SFV anerkannt – gemeinsam schaffen wir Perspektiven für junge Talente in Luzern.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                <span className="inline-flex items-center gap-2">
                  <Star className="h-4 w-4" aria-hidden="true" />
                  Premium Sichtbarkeit
                </span>
                <span className="inline-flex items-center gap-2">
                  <Users className="h-4 w-4" aria-hidden="true" />
                  22 Spieler
                </span>
                <span className="inline-flex items-center gap-2">
                  <Award className="h-4 w-4" aria-hidden="true" />
                  SFV anerkannt
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-semibold text-esla-secondary shadow-lg shadow-black/20 transition-transform duration-200 hover:-translate-y-1 hover:bg-esla-light"
                >
                  Team unterstützen
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                  href="/ueber-uns"
                  className="inline-flex items-center gap-3 rounded-full border border-white/30 px-8 py-4 text-base font-semibold text-white/90 transition-all duration-200 hover:border-white hover:bg-white/10"
                >
                  Mehr über ESLA
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="rounded-[32px] border border-white/25 bg-white/95 p-10 shadow-[0_24px_60px_-35px_rgba(0,0,0,0.55)]">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {statsData.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl bg-gradient-to-br from-esla-light/70 via-white to-white p-6 text-center shadow-[0_18px_40px_-28px_rgba(16,24,40,0.45)]"
                >
                  <div className="text-4xl font-black text-esla-secondary">{s.value}</div>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-esla-secondary/60">{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Werte */}
          <section className="rounded-[34px] bg-gradient-to-br from-white via-esla-light/50 to-white p-10 shadow-[0_24px_60px_-35px_rgba(197,41,88,0.25)]">
            <div className="space-y-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-esla-primary">Unsere Werte</p>
              <h2 className="text-3xl font-black text-esla-secondary md:text-4xl">
                Haltung, die unser Sponsoring trägt
              </h2>
              <p className="mx-auto max-w-3xl text-base text-slate-600">
                Gemeinsam investieren wir in mehr als Resultate – wir fördern Entwicklung, Verantwortung und Teamgeist bei jedem Talent.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {valuesData.map(({ icon: Icon, title }) => (
                <div
                  key={title}
                  className="group rounded-2xl border border-esla-secondary/25 bg-[#08070d] p-8 text-center text-white shadow-[0_18px_45px_-24px_rgba(197,41,88,0.35)] transition duration-200 hover:-translate-y-1 hover:border-esla-accent/50"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition duration-200 group-hover:bg-white/20">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{title}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* Sponsoring Pakete */}
          <section className="space-y-8">
            <div className="space-y-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-esla-primary">Pakete</p>
              <h2 className="text-3xl font-black text-esla-secondary md:text-4xl">Massgeschneiderte Sponsoring-Pakete</h2>
              <p className="mx-auto max-w-3xl text-base text-slate-600">
                Wählen Sie das Engagement, das zu Ihren Zielen passt – von maximaler Sichtbarkeit bis zu gezieltem Support für Trainings und Events.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {packages.map((pkg) => {
                const Icon = pkg.icon;
                const mailtoHref = `mailto:info@teamelitesoccer.ch?subject=${encodeURIComponent(pkg.emailSubject)}&body=${encodeURIComponent(pkg.emailBody)}`;
                const isHauptsponsor = pkg.name === 'Hauptsponsor';
                const isGoenner = pkg.name === 'Gönner';
                const isDarkCard = isHauptsponsor || isGoenner;
                const borderClass = isHauptsponsor
                  ? 'border-white/15 hover:border-white/35'
                  : isGoenner
                  ? 'border-[#ff86a5]/30 hover:border-[#ff86a5]/55'
                  : 'border-white/25 hover:border-esla-accent/50';
                const focusRingClass = isHauptsponsor
                  ? 'focus-visible:ring-white/20'
                  : isGoenner
                  ? 'focus-visible:ring-[#ff86a5]/30'
                  : 'focus-visible:ring-esla-accent/30';
                const featureTextClass = isDarkCard ? 'text-white/85' : 'text-slate-600';
                const checkClasses = isDarkCard ? 'bg-white/15 text-white' : 'bg-esla-primary/10 text-esla-primary';
                const ctaColorClasses = isDarkCard
                  ? 'text-white/80 group-hover:text-white group-focus-visible:text-white'
                  : 'text-esla-secondary/80 group-hover:text-esla-secondary group-focus-visible:text-esla-secondary';
                return (
                  <a
                    key={pkg.name}
                    href={mailtoHref}
                    className={`group relative overflow-hidden rounded-[30px] border ${borderClass} bg-gradient-to-br ${pkg.cardGradient} p-10 text-center ${
                      isDarkCard ? 'text-white' : 'text-esla-secondary'
                    } shadow-[0_24px_55px_-28px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-4 ${focusRingClass}`}
                    aria-label={`Sponsoring-Paket ${pkg.name} anfragen`}
                  >
                    <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 bg-white/20" aria-hidden="true" />
                    {pkg.featured && (
                      <span className="absolute top-5 right-6 z-10 rounded-full bg-esla-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-esla-accent/30">
                        Hauptsponsor
                      </span>
                    )}
                    <div
                      className={`relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${pkg.iconGradient} text-white shadow-[0_18px_40px_-20px_rgba(197,41,88,0.5)]`}
                      aria-hidden="true"
                    >
                      <Icon size={32} />
                    </div>
                    <h3 className="text-2xl font-black text-center">{pkg.name}</h3>
                    <div className="mt-6 space-y-4">
                      {pkg.features.map((feature) => (
                        <div key={feature} className={`flex items-start gap-4 text-sm ${featureTextClass}`}>
                          <span className={`mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full ${checkClasses}`}>
                            <Check size={16} aria-hidden="true" />
                          </span>
                          <span className="flex-1 text-left">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <span className={`mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200 ${ctaColorClasses}`}>
                      Jetzt Interesse melden
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </a>
                );
              })}
            </div>
          </section>

          {/* Ihre Vorteile */}
          <section className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-esla-secondary/95 via-esla-primary/90 to-esla-accent/85 p-12 text-white shadow-[0_24px_70px_-30px_rgba(0,0,0,0.55)]">
            <div className="absolute -left-20 top-8 h-48 w-48 rounded-full bg-white/15 blur-[110px]" aria-hidden="true" />
            <div className="absolute -right-16 bottom-6 h-56 w-56 rounded-full bg-white/10 blur-[130px]" aria-hidden="true" />
            <div className="relative space-y-10">
              <div className="mx-auto max-w-3xl space-y-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Ihre Vorteile</p>
                <h2 className="text-3xl font-black md:text-4xl">Warum eine Partnerschaft mit ESLA wirkt</h2>
                <p className="text-white/85">
                  Nutzen Sie unsere Reichweite im Amateur- und Nachwuchsfussball, stärken Sie Ihr regionales Engagement und zeigen Sie Haltung in der Förderung junger Talente.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {advantagesData.map(({ Icon, title, description }) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-white/25 bg-white/10 p-8 text-center backdrop-blur transition duration-200 hover:border-white/50"
                  >
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
                      <Icon className="text-white" size={24} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="mt-2 text-sm text-white/80">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-[34px] bg-gradient-to-br from-esla-secondary via-esla-primary to-esla-accent p-12 text-center text-white shadow-[0_24px_70px_-30px_rgba(0,0,0,0.55)]">
            <div className="mx-auto max-w-3xl space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Nächster Schritt</p>
              <h2 className="text-3xl font-black md:text-4xl">Unterstützen Sie unser Team und werden Partner:in von ESLA</h2>
              <p className="text-lg text-white/85">
                Kontaktieren Sie uns für Informationen zu individuellen Aktivierungen, gemeinsamen Events und nachhaltigen Partnerschaften.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-semibold text-esla-secondary shadow-lg shadow-black/20 transition-transform duration-200 hover:-translate-y-1 hover:bg-esla-light"
                >
                  Team unterstützen
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                  href="/sponsoren"
                  className="inline-flex items-center gap-3 rounded-full border border-white/40 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10"
                >
                  Sponsoren entdecken
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>
        </Container>
      </div>

      <Footer />
    </main>
  );
}

