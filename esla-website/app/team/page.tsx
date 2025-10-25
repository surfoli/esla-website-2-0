'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Image from 'next/image';
import { Users, Shield, Zap, Target } from 'lucide-react';
import { teams, playerGroups } from '@/data/team';

 

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
          <div className="text-center mb-12 bg-esla-secondary text-white p-10 rounded-3xl">
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
                      : 'bg-esla-secondary/10 text-esla-secondary border border-esla-secondary/30 hover:bg-esla-secondary/20'
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
                <section key={group} className="mb-10">
                  <h2 className="text-esla-secondary font-extrabold text-4xl md:text-5xl mb-6">{positionNames[group]}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {teams[group].map((player, index) => (
                      <div
                        key={`${group}-${player.name}`}
                        className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 animate-scale-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        {/* Image */}
                        <div className="relative aspect-[3/4] bg-gradient-to-b from-esla-secondary to-esla-dark overflow-hidden">
                          <Image
                            src={encodePublicPath(player.image)}
                            alt={player.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                            className="object-cover object-[center_30%]"
                          />
                        </div>

                        {/* Info */}
                        <div className="p-6 bg-esla-primary">
                          <h3 className="text-white font-bold text-xl mb-2">{player.name}</h3>
                          <p className="text-white/90 font-semibold text-sm">{positionLabel[group]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {teams.staff.map((member, index) => (
                <div
                  key={`staff-${member.name}`}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 animate-scale-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="relative aspect-[3/4] bg-gradient-to-b from-esla-secondary to-esla-dark overflow-hidden">
                    <Image
                      src={encodePublicPath(member.image)}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover object-[center_30%]"
                    />
                  </div>
                  <div className="p-6 bg-esla-primary">
                    <h3 className="text-white font-bold text-xl mb-2">{member.name}</h3>
                    <p className="text-white/90 font-semibold text-sm">{member.position}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      <Footer />
    </main>
  );
}

