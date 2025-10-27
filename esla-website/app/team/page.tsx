'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Image from 'next/image';
import { Users, Shield, Zap, Target } from 'lucide-react';
import { teams, playerGroups } from '@/data/team';
import Container from '@/components/ui/Container';

 

const positionIcons = {
  staff: Users,
  goalkeepers: Shield,
  defenders: Shield,
  midfielders: Target,
  wingers: Zap,
  strikers: Target,
  players: Users,
};

type PlayerGroup = 'goalkeepers' | 'defenders' | 'midfielders' | 'wingers' | 'strikers';

const positionNames: Record<PlayerGroup, string> = {
  goalkeepers: 'TORHÜTER',
  defenders: 'VERTEIDIGER',
  midfielders: 'MITTELFELDSPIELER',
  wingers: 'FLÜGELSPIELER',
  strikers: 'STÜRMER',
};

const positionLabel: Record<PlayerGroup, string> = {
  goalkeepers: 'Torhüter',
  defenders: 'Verteidigungsspieler',
  midfielders: 'Mittelfeldspieler',
  wingers: 'Flügelspieler',
  strikers: 'Stürmer',
};

const filterOptions: Record<'players' | 'staff', string> = {
  players: 'SPIELER',
  staff: 'STAFF',
};

 

function encodePublicPath(path: string): string {
  // Encode only path segments after '/images' to preserve leading slash
  const parts = path.split('/');
  return parts
    .map((seg, idx) => (idx > 1 ? encodeURIComponent(seg) : seg))
    .join('/');
}

export default function TeamPage() {
  type PositionKey = 'players' | 'staff';
  const [selectedPosition, setSelectedPosition] = useState<PositionKey>('players');
  // Preselect via query: /team?section=staff | /team?section=players (ohne useSearchParams)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const section = params.get('section');
    if (section === 'staff') setSelectedPosition('staff');
    if (section === 'players') setSelectedPosition('players');
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12 bg-black text-white p-10 rounded-3xl">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
              UNSER <span className="text-esla-primary">TEAM</span>
            </h1>
            <p className="text-white/90 text-xl">
              Die Gesichter hinter dem Erfolg
            </p>
          </div>

          {/* Position Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {Object.entries(filterOptions).map(([key, label]) => {
              const Icon = positionIcons[key as PositionKey];
              const active = selectedPosition === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedPosition(key as PositionKey)}
                  aria-pressed={active}
                  className={`px-8 py-4 rounded-full font-semibold text-base md:text-lg transition-all duration-200 flex items-center gap-x-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-esla-primary focus-visible:ring-offset-2 ring-offset-white ${
                    active
                      ? 'bg-esla-primary text-white shadow-lg shadow-esla-primary/50 scale-105'
                      : 'bg-black/10 text-black border border-black/30 hover:bg-black/20'
                  }`}
                >
                  <Icon size={24} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          {selectedPosition === 'players' ? (
            <>
              {playerGroups.map((group) => (
                <section key={group} className="mb-12">
                  <Container>
                    <h2 className="text-black font-extrabold text-4xl md:text-5xl mb-6 text-left">{positionNames[group]}</h2>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,345px))] justify-center md:justify-start gap-8">
                    {teams[group].map((player, index) => (
                      <div
                        key={`${group}-${player.name}`}
                          className="max-w-[345px] w-full bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 animate-scale-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        {/* Image */}
                        <div className="relative aspect-[3/4] bg-gradient-to-b from-esla-secondary to-esla-dark overflow-hidden">
                          <Image
                            src={encodePublicPath(player.image)}
                            alt={player.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                        className="object-cover object-[center_30%] rounded-t-2xl"
                          />
                        </div>

                        {/* Info */}
                        <div
                          className="rounded-b-2xl p-5 bg-gradient-to-r from-black via-esla-dark to-esla-primary"
                        >
                          <h3 className="text-white font-bold text-2xl mb-3 leading-tight">{player.name}</h3>
                          <p className="text-white/90 font-semibold text-base leading-tight">{positionLabel[group]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  </Container>
                </section>
              ))}
            </>
          ) : (
            <Container>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,345px))] justify-center md:justify-start gap-8">
                {teams.staff.map((member, index) => (
                  <div
                    key={`staff-${member.name}`}
                    className="max-w-[345px] w-full bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 animate-scale-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="relative aspect-[3.2/4] bg-gradient-to-b from-esla-secondary to-esla-dark overflow-hidden">
                      <Image
                        src={encodePublicPath(member.image)}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                        className="object-cover object-[center_30%]"
                      />
                    </div>
                    <div
                      className="rounded-b-2xl p-5 bg-gradient-to-r from-black via-esla-dark to-esla-primary"
                    >
                      <h3 className="text-white font-bold text-2xl mb-3 leading-tight">{member.name}</h3>
                      <p className="text-white/90 font-semibold text-base leading-tight">{member.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          )}

        </div>
      </div>

      <Footer />
    </main>
  );
}

