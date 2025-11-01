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
    { name: 'Luqmon Adekunle', position: 'Cheftrainer', image: '/images/esla-profilbild-staff-cheftrainer-luqmon-adekunle-nah.jpg' },
    { name: 'Walid Kahlouni', position: 'Assistenztrainer', image: '/images/esla-profilbild-staff-assistenz-trainer-walid-kahlouni-nah.jpg' },
    { name: 'Badr Kahlouni', position: 'Assistenztrainer', image: '/images/esla-profilbild-staff-assistenz-trainer-badr-kahlouni-nah.jpg' },
    { name: 'Issafar Kamal', position: 'Assistenztrainer', image: '/images/esla-profilbild-staff-assistenz-trainer-issafar-kamal-nah.jpg' },
    { name: 'Flavio Räber', position: 'Head of Brand', image: '/images/esla-profilbild-staff-head-of-brand-flavio-raeber-nah.jpg' },
    { name: 'Olivier Durand', position: 'Digital Architect', image: '/images/esla-profilbild-staff-head-of-digital-media-olivier-durand-nah.jpg' },
  ],
  goalkeepers: [
    { name: 'Matteo Tondello', number: 12, image: '/images/esla-profilbild-torwart-matteo-tondello.jpg' },
    { name: 'Nikola Karajanov', number: 1, image: '/images/esla-profilbild-torwart-nikola-karajanov.jpg' },
  ],
  defenders: [
    { name: 'Berat Cetinkaya', number: 2, image: '/images/esla-profilbild-verteidigungsspieler-berat-cetinkaya.jpg' },
    { name: 'Tiago Ribeiro', number: 3, image: '/images/esla-profilbild-verteidigungsspieler-tiago-ribeiro.jpg' },
    { name: 'Yotuel Räber', number: 4, image: '/images/esla-profilbild-verteidigungsspieler-yotuel-raber.jpg' },
    { name: 'Pantelic Nikolaj', number: 5, image: '/images/esla-profilbild-verteidigungsspieler-pantelic-nikolaj.jpg' },
    { name: 'Suru Patrick', number: 15, image: '/images/esla-profilbild-verteidigungsspieler-suru-patrick.jpg' },
    { name: 'Bledion Nuhaj', number: 13, image: '/images/esla-profilbild-verteidigungsspieler-bledion-nuhaj.jpg' },
  ],
  midfielders: [
    { name: 'Andrej Gajic', number: 6, image: '/images/esla-profilbild-mittelfeldspieler-andrej-gajic.jpg' },
    { name: 'Damian Radosavljevic', number: 14, image: '/images/esla-profilbild-mittelfeldspieler-damian-radosavljevic.jpg' },
    { name: 'Sami Belal', number: 16, image: '/images/esla-profilbild-mittelfeldspieler-sami-belal.jpg' },
    { name: 'Tim Sonntag', number: 8, image: '/images/esla-profilbild-mittelfeldspieler-tim-sonntag.jpg' },
    { name: 'Nikic Damjan', number: 22, image: '/images/esla-profilbild-mittelfeldspieler-nikic-damjan.jpg' },
  ],
  wingers: [
    { name: 'Dion Vogliqi', number: 7, image: '/images/esla-profilbild-fluegelspieler-dion-vogliqi.jpg' },
    { name: 'Antonio Ranieri', number: 17, image: '/images/esla-profilbild-fluegelspieler-antonio-ranieri.jpg' },
    { name: 'Dorian Cubi', number: 19, image: '/images/esla-profilbild-fluegelspieler-dorian-cubi.jpg' },
    { name: 'Sylaj Dion', number: 24, image: '/images/esla-profilbild-fluegelspieler-sylaj-dion.jpg' },
    { name: 'Krasniqi Riad', number: 23, image: '/images/esla-profilbild-fluegelspieler-krasniqi-riad.jpg' },
    { name: 'Eldion Metaj', number: 26, image: '/images/esla-profilbild-fluegelspieler-eldion-metaj.jpg' },
    { name: 'Dion Nuaj', number: 25, image: '/images/esla-profilbild-fluegelspieler-dion-nuaj.jpg' },
  ],
  strikers: [
    { name: 'Edon Lulaj', number: 9, image: '/images/esla-profilbild-stuermer-edon-lulaj.jpg' },
    { name: 'Anuar Destani', number: 20, image: '/images/esla-profilbild-stuermer-anuar-destani.jpg' },
  ],
};

export function getTotalPlayers(): number {
  return playerGroups.reduce((sum, g) => sum + teams[g].length, 0);
}

export function getTotalStaff(): number {
  return teams.staff.length;
}
