import { useQuery } from "@tanstack/react-query";
import {
  getTeamInfo,
  getTeamLatestMatches,
  getTeamStandings,
  getTeamStat,
} from "../../api/fakeFootballAPI";
import { TeamInfo, TeamStat } from "../../type/team";
import { Match } from "../../type/fixtures";
import { TeamStanding } from "../../type/teamStandings";

export default function useFakeTeam() {
  const teamInfoQuery = useQuery({
    queryKey: ["FakeTeamInfo"],
    queryFn: () => getTeamInfo(),
    staleTime: 1000 * 60,
    select(data): TeamInfo {
      return data;
    },
  });

  const teamStatQuery = useQuery({
    queryKey: ["FakeTeamStat"],
    queryFn: () => getTeamStat(),
    staleTime: 1000 * 60,
    select(data): TeamStat {
      return data;
    },
  });

  const teamLatestMatchesQuery = useQuery({
    queryKey: ["FakeTeamLatestMatches"],
    queryFn: () => getTeamLatestMatches(),
    staleTime: 1000 * 60,
    select(data): Match[] {
      return data;
    },
  });

  const teamStandingsQuery = useQuery({
    queryKey: ["FakeTeamStandings"],
    queryFn: () => getTeamStandings(),
    staleTime: 1000 * 60,
    select(data): TeamStanding[] {
      return data;
    },
  });

  return {
    teamInfoQuery,
    teamStatQuery,
    teamLatestMatchesQuery,
    teamStandingsQuery,
  };
}
