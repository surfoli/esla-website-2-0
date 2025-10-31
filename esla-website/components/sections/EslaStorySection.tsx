import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/ui/Section';

const values = [
  {
    title: 'Exzellenz',
    description: 'Technische Perfektion, mentale Stärke und tägliche Weiterentwicklung.',
    icon: '⭐️',
  },
  {
    title: 'Teamgeist',
    description: 'Gemeinsam wachsen wir über uns hinaus – jeder zählt, jeder unterstützt.',
    icon: '🤝',
  },
  {
    title: 'Disziplin',
    description: 'Harte Arbeit zahlt sich aus – wir investieren konsequent in Fortschritt.',
    icon: '🏋️',
  },
  {
    title: 'Respekt',
    description: 'Für Gegner, Trainer und Team – Werte, die unser Spiel prägen.',
    icon: '🎯',
  },
];

export default function EslaStorySection() {
  return (
    <Section className="py-16 md:py-24">
      <Link
        href="/ueber-uns"
        className="block rounded-3xl bg-black text-white shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer group"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.95fr)]">
          <div className="px-8 py-10 md:px-12 md:py-14">
            <p className="text-sm uppercase tracking-[0.35em] text-white/60 mb-6">Team Elitesoccer</p>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-black text-esla-accent mb-6">
              Wir formen Talente zu Persönlichkeiten
            </h2>
            <div className="space-y-5 text-base md:text-lg text-white/85 leading-relaxed max-w-2xl">
              <p>
                Die ESLA begleitet junge Spieler:innen in Luzern und der Zentralschweiz mit einem modernen,
                professionellen Ausbildungsprogramm. Technik, Taktik, Athletik und Mindset werden ganzheitlich vermittelt.
              </p>
              <p>
                Unser Trainerteam bringt internationale Erfahrung ein und schafft ein Umfeld, in dem Einsatz, Leidenschaft
                und Disziplin spielerisch gefördert werden.
              </p>
            </div>

            <div className="mt-10 rounded-2xl bg-white/5 border border-white/10 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70 mb-4">Unsere Werte</p>
              <div className="space-y-4">
                {values.map((value) => (
                  <div key={value.title} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-lg">
                      {value.icon}
                    </span>
                    <div>
                      <p className="text-lg font-bold text-white mb-1">{value.title}</p>
                      <p className="text-sm text-white/80 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 text-esla-accent font-bold text-lg group-hover:gap-3 transition-all">
              <span>Mehr über Team Elitesoccer erfahren</span>
              <svg 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>

          <div className="relative min-h-[360px] sm:min-h-[460px] lg:min-h-full">
            <Image
              src="/images/ESLA_Spieler_Stock_Action.jpg"
              alt="ESLA Spieler in Aktion"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover h-full w-full" style={{ objectPosition: 'center center' }}
              priority
            />
          </div>
        </div>
      </Link>
    </Section>
  );
}
