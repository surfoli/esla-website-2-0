export type Player = { name: string; number?: number; image: string };
export type Staff = { name: string; position: string; image: string };

export type PlayerGroup = 'goalkeepers' | 'defenders' | 'midfielders' | 'wingers' | 'strikers';

export const playerGroups: PlayerGroup[] = [
  'goalkeepers',
  'defenders',
  'midfielders',
  'wingers',
  'strikers',
];

export const teams: Record<PlayerGroup, Player[]> & { staff: Staff[] } = {
  staff: [
    { name: 'Luqmon Adekunle', position: 'Cheftrainer', image: '/images/ESLA_Profilbild_Staff_Cheftrainer_Luqmon_Adekunle_Nah.jpg' },
    { name: 'Walid Kahlouni', position: 'Assistenztrainer', image: '/images/ESLA_Profilbild_Staff_Assistenz_Trainer_Walid_Kahlouni_Nah.jpg' },
    { name: 'Badr Kahlouni', position: 'Assistenztrainer', image: '/images/ESLA_Profilbild_Staff_Assistenz_Trainer_Badr_Kahlouni_Nah.jpg' },
    { name: 'Issafar Kamal', position: 'Assistenztrainer', image: '/images/ESLA_Profilbild_Staff_Assistenz_Trainer_Issafar_Kamal_Nah.jpg' },
    { name: 'Zak Berdi', position: 'Sport Operations Manager', image: '/images/ESLA_Profilbild_Staff_Sport_Operations_Manager_Zak_Berdi_Nah.jpg' },
    { name: 'Flavio Räber', position: 'Head of Brand', image: '/images/ESLA_Profilbild_Staff_Head_of_Brand_Flavio_Raeber_Nah.jpg' },
    { name: 'Olivier Durand', position: 'Digital Architect', image: '/images/ESLA_Profilbild_Staff_Head_of_Digital_&_Media_Olivier_Durand_Nah.jpg' },
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

export function getTotalPlayers(): number {
  return playerGroups.reduce((sum, g) => sum + teams[g].length, 0);
}

export function getTotalStaff(): number {
  return teams.staff.length;
}
