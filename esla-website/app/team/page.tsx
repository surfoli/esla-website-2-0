'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Image from 'next/image';
import Link from 'next/link';
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
  // Encode only path segments after '/images' and normalize to NFD to match FS on deploy
  const parts = path.split('/');
  return parts
    .map((seg, idx) => {
      if (idx <= 1) return seg;
      const nfd = seg.normalize('NFD');
      return encodeURIComponent(nfd);
    })
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
                    <div className="grid items-stretch justify-items-center md:justify-items-start gap-6 md:gap-8 xl:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {teams[group].map((player, index) => (
                      <div
                        key={`${group}-${player.name}`}
                          className="max-w-[340px] w-full bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] animate-scale-in"
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
              <div className="grid items-stretch justify-items-center md:justify-items-start gap-6 md:gap-8 xl:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {teams.staff.map((member, index) => {
                  const isLuqmon = member.name === 'Luqmon Adekunle';
                  const content = (
                    <div
                      className="max-w-[340px] md:max-w-[360px] w-full bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] animate-scale-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="relative aspect-[3/4] bg-gradient-to-b from-esla-secondary to-esla-dark overflow-hidden group">
                        <Image
                          src={encodePublicPath(member.image)}
                          alt={member.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                          className={`object-cover rounded-t-2xl transition-transform duration-300 ${
                            isLuqmon
                              ? 'object-[center_30%] group-hover:scale-105'
                              : 'object-[center_35%] scale-[1.08] group-hover:scale-[1.12]'
                          }`}
                        />
                        {isLuqmon && (
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="bg-esla-primary text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg flex items-center gap-x-2">
                              Biografie ansehen
                            </span>
                          </div>
                        )}
                      </div>
                      <div
                        className="rounded-b-2xl p-5 bg-gradient-to-r from-black via-esla-dark to-esla-primary"
                      >
                        <h3 className="text-white font-bold text-2xl mb-3 leading-tight">{member.name}</h3>
                        <p className="text-white/90 font-semibold text-base leading-tight">{member.position}</p>
                      </div>
                    </div>
                  );

                  return member.name === 'Luqmon Adekunle' ? (
                    <Link
                      key={`staff-${member.name}`}
                      href="/team/luqmon"
                      className="block cursor-pointer"
                    >
                      {content}
                    </Link>
                  ) : (
                    <div key={`staff-${member.name}`}>{content}</div>
                  );
                })}
              </div>
            </Container>
          )}

        </div>
      </div>

      <Footer />
    </main>
  );
}

