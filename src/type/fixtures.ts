interface Periods {
  first: number;
  second: number;
}

interface Venue {
  id: number;
  name: string;
  city: string;
}

interface Status {
  long: string;
  short: string;
  elapsed: null | number;
}

interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  round: string;
}

interface HomeAway {
  id: number;
  name: string;
  logo: string;
  winner: boolean | null;
}

export interface Team {
  home: HomeAway;
  away: HomeAway;
}

export interface Goals {
  home: null | number;
  away: null | number;
}

export interface Score {
  halftime: Goals;
  fulltime: Goals;
  extratime: Goals;
  penalty: Goals;
}

interface Fixture {
  id: string;
  referee: string | null;
  timezone: string;
  date: string;
  timestamp: string;
  periods: Periods;
  venue: Venue;
  status: Status;
}

export interface Match {
  fixture: Fixture;
  league: League;
  teams: Team;
  goals: Goals;
  score: Score;
}

interface Time {
  elapsed: number | null;
  extra: string | null;
}

interface LiveTeam {
  id: number | null;
  name: string | null;
  logo: string;
}

interface Player {
  id: number | null;
  name: string | null;
}

interface Assist {
  id: number | null;
  name: string | null;
}

export interface Events {
  time: Time;
  team: LiveTeam;
  player: Player;
  assist: Assist;
  type: string | null;
  detail: string | null;
  comments: string | null;
}

interface Coach {
  id: number | null;
  name: string | null;
  photo: string;
}

interface LineUpPlayer {
  grid: string;
  id: number | null;
  name: string | null;
  number: number | null;
  pos: string | null;
}

interface StartXI {
  player: LineUpPlayer;
}

interface Goalkeeper {
  border: string | null;
  number: string | null;
  primary: string | null;
}

interface LineUpColors {
  goalkeeper: Goalkeeper;
  player: Goalkeeper;
}

interface LineUpTeam {
  colors: LineUpColors;
  id: number | null;
  logo: string;
  name: string;
}

export interface LineUp {
  coach: Coach;
  formation: null | string;
  startXI: StartXI[];
  substitutes: StartXI[];
  team: LineUpTeam;
}

interface Statistic {
  type: string;
  value: number;
}

interface StatisticsTeam {
  id: number | null;
  logo: string | null;
  name: string | null;
}

interface Statistics {
  team: StatisticsTeam;
  statistic: Statistic[];
}

export interface LiveMatch extends Match {
  events: Events[];
  lineups: LineUp[];
  statistics: Statistics[];
}
