// team Info

interface Team {
  id: number;
  name: string;
  code: string;
  country: string;
  founded: number;
  national: false;
  logo: string;
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

export interface TeamInfo {
  team: Team;
  venue: Venue;
}

// team Stat

interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
}

interface Team {
  id: number;
  name: string;
  logo: string;
}

interface Played {
  home: number;
  away: number;
  total: number;
}

interface Fixtures {
  played: Played;
  wins: Played;
  draws: Played;
  loses: Played;
}

interface Total {
  home: number;
  away: number;
  total: number;
}

interface Average {
  home: string;
  away: string;
  total: string;
}

interface Minute {
  "0-15": {
    total: string;
    percentage: string;
  };
  "16-30": {
    total: string;
    percentage: string;
  };
  "31-45": {
    total: string;
    percentage: string;
  };
  "46-60": {
    total: string;
    percentage: string;
  };
  "61-75": {
    total: string;
    percentage: string;
  };
  "76-90": {
    total: string;
    percentage: string;
  };
  "91-105": {
    total: string;
    percentage: string;
  };
  "106-120": {
    total: string;
    percentage: string;
  };
}

interface For {
  total: Total;
  average: Average;
  minute: Minute;
}
interface Against {
  total: Total;
  average: Average;
  minute: Minute;
}

interface Goals {
  for: For;
  against: Against;
}

interface Streak {
  wins: number;
  draws: number;
  loses: number;
}

interface HomeAway {
  home: string | null;
  away: string | null;
}

interface BigGoals {
  for: HomeAway;
  against: HomeAway;
}

interface Biggest {
  streak: Streak;
  wins: HomeAway;
  loses: HomeAway;
  goals: BigGoals;
}

interface Clean_sheet {
  home: number;
  away: number;
  total: number;
}

interface Scored {
  total: string;
  percentage: string;
}
interface Penalty {
  scored: Scored;
  missed: Scored;
  total: number;
}

interface Lineups {
  formation: string;
  played: number;
}

interface Cards {
  red: Minute;
  yellow: Minute;
}

export interface TeamStat {
  league: League;
  team: Team;
  form: string;
  fixtures: Fixtures;
  goals: Goals;
  biggest: Biggest;
  clean_sheet: Clean_sheet;
  failed_to_score: Clean_sheet;
  penalty: Penalty;
  lineups: Lineups[];
  cards: Cards;
}
