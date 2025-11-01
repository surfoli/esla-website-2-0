import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Container from '@/components/ui/Container';
import { teams, playerGroups, getTotalPlayers } from '@/data/team';

const positionNames = {
  goalkeepers: 'TORHÜTER',
  defenders: 'VERTEIDIGER',
  midfielders: 'MITTELFELD',
  wingers: 'FLÜGEL',
  strikers: 'STÜRMER',
} as const;

const positionLabel = {
  goalkeepers: 'Torhüter',
  defenders: 'Verteidigung',
  midfielders: 'Mittelfeld',
  wingers: 'Flügelspieler',
  strikers: 'Stürmer',
} as const;

type PlayerGroupKey = keyof typeof positionNames;

function encodePublicPath(path: string): string {
  const parts = path.split('/');
  return parts
    .map((seg, idx) => {
      if (idx <= 1) return seg;
      const nfd = seg.normalize('NFD');
      return encodeURIComponent(nfd);
    })
    .join('/');
}

type TeamCardProps = {
  name: string;
  role: string;
  image: string;
};

function TeamCard({ name, role, image }: TeamCardProps) {
  return (
    <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-black/30 shadow-[0_28px_60px_-25px_rgba(8,8,8,0.65)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_90px_-25px_rgba(8,8,8,0.7)]">
      <Image
        src={encodePublicPath(image)}
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 h-28 md:h-32">
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-esla-primary/35 to-esla-primary/65 opacity-95" />
        <div className="relative z-10 flex h-full flex-col justify-end gap-1.5 px-5 pb-6">
          <h3 className="text-white font-bold text-2xl leading-tight drop-shadow-sm">{name}</h3>
          <p className="text-white/85 text-sm md:text-base leading-snug">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-100">
      <Navbar />

      <div className="pt-32 pb-24">
        <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
          <div className="mb-16 overflow-hidden rounded-3xl bg-gradient-to-r from-black via-esla-dark to-esla-primary p-10 text-center text-white shadow-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-white/70">ESLA FAMILIE</p>
            <h1 className="mt-4 text-5xl md:text-7xl font-black">
              UNSER <span className="text-esla-primary">TEAM</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-white/85">
              Lerne die Menschen kennen, die ESLA formen – mit Herzblut auf dem Rasen, an der Seitenlinie und hinter den Kulissen.
            </p>
          </div>

          <Container>
            <div className="mb-16 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.38em] text-esla-primary">
                  TEAM AUF DEM PLATZ
                </p>
                <h2 className="mt-3 text-4xl md:text-5xl font-black text-black">SPIELER</h2>
                <p className="mt-4 max-w-2xl text-base text-black/70">
                  Unsere Spieler bringen Tempo, Technik und Leidenschaft auf den Rasen – vom Tor bis zum Sturm in jeder Position top vorbereitet.
                </p>
              </div>
              <div className="text-sm font-semibold uppercase tracking-[0.28em] text-black/45">
                {getTotalPlayers().toString().padStart(2, '0')} Spieler
              </div>
            </div>
          </Container>

          {playerGroups.map((group) => (
            <section key={group} className="mb-24">
              <Container>
                <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.38em] text-esla-primary">
                      POSITION
                    </p>
                    <h2 className="mt-3 text-4xl md:text-5xl font-black text-black">
                      {positionNames[group as PlayerGroupKey]}
                    </h2>
                  </div>
                  <div className="text-sm font-semibold uppercase tracking-[0.28em] text-black/45">
                    {teams[group].length.toString().padStart(2, '0')} Spieler
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
                  {teams[group].map((player) => (
                    <TeamCard
                      key={`${group}-${player.name}`}
                      name={player.name}
                      role={positionLabel[group as PlayerGroupKey]}
                      image={player.image}
                    />
                  ))}
                </div>
              </Container>
            </section>
          ))}

          <section className="mb-24">
            <Container>
              <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.38em] text-esla-primary">
                    TEAM HINTER DEM TEAM
                  </p>
                  <h2 className="mt-3 text-4xl md:text-5xl font-black text-black">STAFF</h2>
                  <p className="mt-4 max-w-2xl text-base text-black/70">
                    Hinter jedem Spieltag steht ein engagiertes Team aus Trainer:innen, Strateg:innen und Support. Sie kümmern sich um Ausbildung, Auftritt und Organisation – damit du ESLA in Bestform erlebst.
                  </p>
                </div>
                <div className="text-sm font-semibold uppercase tracking-[0.28em] text-black/45">
                  {teams.staff.length.toString().padStart(2, '0')} Teammitglieder
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
                {teams.staff.map((member) => {
                  const card = (
                    <TeamCard
                      name={member.name}
                      role={member.position}
                      image={member.image}
                    />
                  );

                  if (member.name === 'Luqmon Adekunle') {
                    return (
                      <Link key={`staff-${member.name}`} href="/team/luqmon" className="block">
                        {card}
                      </Link>
                    );
                  }

                  return (
                    <div key={`staff-${member.name}`} className="block">
                      {card}
                    </div>
                  );
                })}
              </div>
            </Container>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}

