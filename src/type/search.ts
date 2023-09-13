import { Player } from "./player";

interface Team {
  id: number;
  name: string;
  logo: string;
}

interface Career {
  team: Team;
  start: null | string;
  end: null | string;
}

export interface Coach extends Player {
  career: Career[];
}

interface Venue {
  id: number;
  name: string;
  address: string;
  city: string;
  capacity: number;
  surface: string;
  image: string;
}

export interface SearchTeam {
  id: number;
  name: string;
  code: string;
  country: string;
  founded: number;
  national: boolean;
  logo: string;
  venue: Venue;
}
