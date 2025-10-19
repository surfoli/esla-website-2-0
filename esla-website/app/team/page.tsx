'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Image from 'next/image';
import { Users, Shield, Zap, Target } from 'lucide-react';

const teams = {
  staff: [
    { name: 'Luqmon Adekunle', position: 'Cheftrainer', image: '/images/ESLA_Profilbild_Staff_Cheftrainer_Luqmon_Adekunle_Nah.jpg' },
    { name: 'Walid Kahlouni', position: 'Assistenztrainer', image: '/images/ESLA_Profilbild_Staff_Assistenz_Trainer_Walid_Kahlouni_Nah.jpg' },
    { name: 'Badr Kahlouni', position: 'Assistenztrainer', image: '/images/ESLA_Profilbild_Staff_Assistenz_Trainer_Badr_Kahlouni_Nah.jpg' },
    { name: 'Issafar Kamal', position: 'Assistenztrainer', image: '/images/ESLA_Profilbild_Staff_Assistenz_Trainer_Issafar_Kamal_Nah.jpg' },
    { name: 'Zak Berdi', position: 'Sport Operations Manager', image: '/images/ESLA_Profilbild_Staff_Sport_Operations_Manager_Zak_Berdi_Nah.jpg' },
    { name: 'Flavio Räber', position: 'Head of Brand', image: '/images/ESLA_Profilbild_Staff_Head_of_Brand_Flavio_Raeber_Nah.jpg' },
    { name: 'Olivier Durand', position: 'Head of Digital & Media', image: '/images/ESLA_Profilbild_Staff_Head_of_Digital_&_Media_Olivier_Durand_Nah.jpg' },
  ],
  goalkeepers: [
    { name: 'Matteo Tondello', number: 12, image: '/images/ESLA_Profilbild_Torwart_Matteo_Tondello.jpg' },
    { name: 'Nikola Karajanov', number: 1, image: '/images/ESLA_Profilbild_Torwart_Nikola_Karajanov.jpg' },
  ],
  defenders: [
    { name: 'Berat Cetinkaya', number: 2, image: '/images/ESLA_Profilbild_Verteidigungsspieler_Berat_Cetinkaya.jpg' },
    { name: 'Tiago Ribeiro', number: 3, image: '/images/ESLA_Profilbild_Verteidigungsspieler_Tiago_Ribeiro.jpg' },
    { name: 'Yotuel Räber', number: 4, image: '/images/ESLA_Profilbild_Verteidigungsspieler_Yotuel_Räber.jpg' },
    { name: 'Pantelic Nikolaj', number: 5, image: '/images/ESLA_Profilbild_Verteidigungsspieler_Pantelic_Nikolaj.jpg' },
    { name: 'Suru Patrick', number: 15, image: '/images/ESLA_Profilbild_Verteidigungsspieler_Suru_Patrick.jpg' },
    { name: 'Bledion Nuhaj', number: 13, image: '/images/ESLA_Profilbild_Verteidigungsspieler_Bledion_Nuhaj.jpg' },
  ],
  midfielders: [
    { name: 'Andrej Gajic', number: 6, image: '/images/ESLA_Profilbild_Mittelfeldspieler_Andrej_Gajic.jpg' },
    { name: 'Damian Radosavljevic', number: 14, image: '/images/ESLA_Profilbild_Mittelfeldspieler_Damian_Radosavljevic.jpg' },
    { name: 'Phil Räber', number: 10, image: '/images/ESLA_Profilbild_Mittelfeldspieler_Phil_Räber.jpg' },
    { name: 'Sami Belal', number: 16, image: '/images/ESLA_Profilbild_Mittelfeldspieler_Sami_Belal.jpg' },
    { name: 'Tim Sonntag', number: 8, image: '/images/ESLA_Profilbild_Mittelfeldspieler_Tim_Sonntag.jpg' },
    { name: 'Nikic Damjan', number: 22, image: '/images/ESLA_Profilbild_Mittelfeldspieler_Nikic Damjan.jpg' },
  ],
  wingers: [
    { name: 'Dion Vogliqi', number: 7, image: '/images/ESLA_Profilbild_Flügelspieler_Dion_Vogliqi.jpg' },
    { name: 'Antonio Ranieri', number: 17, image: '/images/ESLA_Profilbild_Flügelspieler_Antonio_Ranieri.jpg' },
    { name: 'Dorian Cubi', number: 19, image: '/images/ESLA_Profilbild_Flügelspieler_Dorian_Cubi.jpg' },
    { name: 'Sylaj Dion', number: 24, image: '/images/ESLA_Profilbild_Flügelspieler_Sylaj_Dion.jpg' },
    { name: 'Krasniqi Riad', number: 23, image: '/images/ESLA_Profilbild_Flügelspieler_Krasniqi Riad.jpg' },
    { name: 'Eldion Metaj', number: 26, image: '/images/ESLA_Profilbild_Flügelspieler_Eldion_Metaj.jpg' },
    { name: 'Dion Nuaj', number: 25, image: '/images/ESLA_Profilbild_Flügelspieler_Dion Nuaj.jpg' },
  ],
  strikers: [
    { name: 'Edon Lulaj', number: 9, image: '/images/ESLA_Profilbild_Stuermer_Edon_Lulaj.jpg' },
    { name: 'Anuar Destani', number: 20, image: '/images/ESLA_Profilbild_Stuermer_Anuar_Destani.jpg' },
    { name: 'Alain Uzeirovic', number: 18, image: '/images/ESLA_Profilbild_Stuermer_Alain_Uzeirovic.jpg' },
  ],
};

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
  staff: 'STAFF & TRAINER',
};

const playerGroups: PlayerGroup[] = [
  'goalkeepers',
  'defenders',
  'midfielders',
  'wingers',
  'strikers',
];

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
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 flex items-center gap-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-esla-primary focus-visible:ring-offset-2 ring-offset-white ${
                    active
                      ? 'bg-esla-primary text-white shadow-lg shadow-esla-primary/50 scale-105'
                      : 'bg-esla-secondary/10 text-esla-secondary border border-esla-secondary/30 hover:bg-esla-secondary/20'
                  }`}
                >
                  <Icon size={20} />
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

