export interface Match {
  id: string;
  date: string;
  time?: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number | null;
  awayScore?: number | null;
  location?: string;
  competition?: string;
  status: 'upcoming' | 'finished' | 'live';
  teamLogo?: string;
  matchNumber?: string; // Spielnummer (optional)
}

export interface TeamStats {
  teamName: string;
  logo: string;
  played: number;
  won: number;
  draw: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface Player {
  id: string;
  name: string;
  position: string;
  number: number;
  goals: number;
  assists: number;
  image?: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  link: string;
  timestamp: string;
}

