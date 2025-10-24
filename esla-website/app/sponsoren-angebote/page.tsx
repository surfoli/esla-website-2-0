import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Link from 'next/link';
import { Check, Star, TrendingUp, Award, Users, Heart, MapPin, Smartphone, Handshake, Flame, Trophy, Zap } from 'lucide-react';

// Encodiertes SVG-Muster für den Hintergrund (verhindert Parser-Probleme)
const GRID_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(#grid)"/></svg>`;
const GRID_BG = `url("data:image/svg+xml,${encodeURIComponent(GRID_SVG)}")`;

const packages = [
  {
    name: 'Hauptsponsor',
    icon: Star,
    color: 'from-esla-primary to-esla-accent',
    featured: true,
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
    color: 'from-esla-primary to-esla-accent',
    features: [
      'Logo auf dem Ärmel',
      'Präsenz auf Social Media',
      'Website-Präsenz',
    ],
  },
  {
    name: 'Hosensponsor',
    icon: TrendingUp,
    color: 'from-esla-secondary to-esla-dark',
    features: [
      'Logo auf der Hose',
      'Präsenz auf Social Media',
      'Website-Präsenz',
    ],
  },
  {
    name: 'Trainingssponsor',
    icon: Users,
    color: 'from-esla-primary to-esla-accent',
    features: [
      'Logo auf Trainingsshirt',
      'Website-Präsenz',
    ],
  },
  {
    name: 'Event Sponsor',
    icon: Award,
    color: 'from-esla-secondary to-esla-dark',
    features: [
      'Logo auf Eventbannern',
      'Nennungen auf Plakaten',
      'Website-Präsenz',
    ],
  },
  {
    name: 'Supporter',
    icon: Heart,
    color: 'from-esla-primary to-esla-accent',
    features: [
      'Namentliche Erwähnung',
      'Website & Instagram',
    ],
  },
];

const statsData = [
  { value: '2025', label: 'Gründungsjahr' },
  { value: '14-18', label: 'Junge Spieler' },
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
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-esla-secondary to-esla-dark text-white px-6 py-20 md:py-24 mb-16">
            <div
              className="hidden md:block absolute inset-y-0 right-0 w-2/5 opacity-30"
              style={{
                backgroundImage: GRID_BG,
                backgroundSize: 'auto',
                backgroundRepeat: 'repeat',
              }}
            />
            <div className="relative max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-black mb-6">
                Unterstützen Sie unser Team und werden auch Sie <span className="text-esla-primary">Sponsor</span>
              </h1>
              <p className="text-2xl font-light mb-4">Wir entwickeln Spieler und stärken Persönlichkeiten</p>
              <p className="text-white/90 max-w-3xl mx-auto mb-8">
                Als ambitioniertes Team aus Emmen bieten wir Ihnen die Chance, echte Nachwuchstalente zu fördern. Seit 2025 SFV-anerkannt und bereit für gemeinsame Erfolge mit Ihnen als Partner.
              </p>
              <Link
                href="/kontakt"
                className="inline-block bg-esla-primary hover:bg-esla-accent text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg"
              >
                Jetzt Partner werden
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {statsData.map((s) => (
              <div key={s.label} className="bg-esla-secondary rounded-2xl p-6 text-center border border-esla-dark shadow-sm text-white">
                <div className="text-4xl font-black text-esla-primary mb-2">{s.value}</div>
                <div className="text-white/80">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Werte */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-esla-secondary">
                Unsere <span className="text-esla-primary">Werte</span>
              </h2>
              <p className="text-esla-secondary/70">Werte, die uns antreiben und unsere Spieler formen</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {valuesData.map(({ icon: Icon, title }) => (
                <div key={title} className="bg-esla-secondary rounded-xl p-8 text-center border border-esla-dark shadow-sm text-white">
                  <div className="flex justify-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-esla-primary flex items-center justify-center">
                      <Icon className="text-white" size={20} />
                    </div>
                  </div>
                  <h3 className="font-semibold">{title}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Sponsoring Pakete */}
          <div className="mb-16">
            <h2 className="text-4xl font-black text-esla-secondary text-center mb-4">
              SPONSORING-<span className="text-esla-primary">PAKETE</span>
            </h2>
            <p className="text-esla-secondary/70 text-center mb-12">
              Wählen Sie das passende Paket für Ihr Engagement
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg, index) => {
                const Icon = pkg.icon;
                return (
                  <div
                    key={pkg.name}
                    className="relative bg-esla-secondary rounded-3xl p-8 border border-esla-dark hover:border-esla-primary transition-all duration-300 transform hover:translate-y-[-5px] shadow-sm text-white"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {pkg.featured && (
                      <span className="absolute -top-3 right-6 bg-esla-primary text-white text-xs font-semibold px-3 py-1 rounded-full">HAUPTSPONSOR</span>
                    )}
                    <div className={`bg-gradient-to-br ${pkg.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto`}>
                      <Icon size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-center mb-6 text-white">
                      {pkg.name}
                    </h3>
                    <ul className="gap-y-3">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-x-2">
                          <span className="bg-esla-primary rounded-md p-1 flex-shrink-0 mt-0.5">
                            <Check size={16} className="text-white" />
                          </span>
                          <span className="text-white/90">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ihre Vorteile */}
          <div className="mb-16 rounded-3xl bg-esla-secondary text-white p-12">
            <h2 className="text-4xl font-black text-center mb-12">
              Ihre Vorteile als <span className="text-esla-primary">Partner</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advantagesData.map((item, index) => {
                const Icon = item.Icon;
                return (
                  <div key={item.title} className="rounded-2xl border border-white/20 bg-white/10 p-8 text-center backdrop-blur animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-esla-primary flex items-center justify-center">
                      <Icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-white/80 text-sm">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-3xl bg-esla-primary text-white p-12 text-center">
            <h2 className="text-4xl font-black mb-4">Unterstützen Sie unser Team und werden auch Sie Sponsor</h2>
            <p className="text-white/90 text-xl max-w-2xl mx-auto mb-8">Kontaktieren Sie uns für weitere Informationen über unsere Partnerschaftsmöglichkeiten</p>
            <Link href="/kontakt" className="inline-block bg-white text-esla-primary font-bold text-lg px-8 py-4 rounded-lg border-2 border-white hover:translate-y-[-2px] transition-all shadow">
              Jetzt Kontakt aufnehmen
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}

