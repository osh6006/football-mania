interface Player {
  id: number;
  name: string;
  photo: string;
  reason: string;
  type: string;
}
interface Team {
  id: number;
  name: string;
  logo: string;
}
interface Fixture {
  id: number;
  timezone: string;
  date: string;
  timestamp: number;
}
interface League {
  id: number;
  season: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
}
export interface Injury {
  player: Player;
  team: Team;
  fixture: Fixture;
  league: League;
}
