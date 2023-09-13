interface Birth {
  date: string;
  place: string;
  country: string;
}

interface Team {
  id: number;
  name: string;
  logo: string;
}

interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
}

interface Game {
  appearences: number | null;
  lineups: number | null;
  minutes: number | null;
  number: number | null;
  position: string;
  rating: string;
  captain: boolean;
}

interface Substitutes {
  in: number | null;
  out: number | null;
  bench: number | null;
}

interface Shot {
  total: number | null;
  on: number | null;
}

interface Goal {
  total: number | null;
  conceded: number | null;
  assists: null | number;
  save: null | number;
}

interface Pass {
  total: number | null;
  key: number | null;
  accuracy: number | null;
}

interface Tackle {
  total: number | null;
  blocks: number | null;
  interceptions: number | null;
}

interface Duel {
  total: number | null;
  won: number | null;
}

interface Dribble {
  attempts: number | null;
  success: number | null;
  past: number | null;
}

interface Foul {
  drawn: number | null;
  committed: number | null;
}

interface Card {
  yellow: number | null;
  yellowred: number | null;
  red: number | null;
}

interface Penalty {
  won: number | null;
  commited: number | null;
  scored: number | null;
  missed: number | null;
  saved: number | null;
}

export interface Player {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number | null;
  birth: Birth;
  nationality: string;
  height: string;
  weight: string;
  injured: boolean;
  photo: string;
}

export interface Statistics {
  team: Team;
  league: League;
  games: Game;
  substitutes: Substitutes;
  shots: Shot;
  goals: Goal;
  passes: Pass;
  tackles: Tackle;
  duels: Duel;
  dribbles: Dribble;
  fouls: Foul;
  cards: Card;
  penalty: Penalty;
}

export interface Players {
  player: Player;
  statistics: Statistics[];
}
