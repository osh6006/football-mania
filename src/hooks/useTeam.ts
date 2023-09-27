import { useQuery } from "@tanstack/react-query";
import {
  getLeagueRanking,
  getTeamInfo,
  getTeamLatestMatches,
  getTeamStandings,
  getTeamStat,
} from "../api/footballApi";
import { Standings } from "../type/standings";
import { TeamInfo, TeamStat } from "../type/team";
import { Match } from "../type/fixtures";
import { TeamStanding } from "../type/teamStandings";

function useTeam(leagueId?: number, season?: number, teamId?: string) {
  const teamRankQuery = useQuery({
    queryKey: ["teamRank", leagueId, season],
    queryFn: () => getLeagueRanking(leagueId, season),
    enabled: !!leagueId && !!season,
    staleTime: Infinity,
    select(data): Standings[] {
      return data.response;
    },
  });

  const teamInfoQuery = useQuery({
    queryKey: ["teamInfo", teamId],
    queryFn: () => getTeamInfo(teamId),
    enabled: !!teamId,
    staleTime: Infinity,
    select(data): TeamInfo {
      return data;
    },
  });

  const teamStatQuery = useQuery({
    queryKey: ["teamStat", leagueId, teamId, season],
    queryFn: () => getTeamStat(leagueId, teamId, season),
    enabled: !!leagueId && !!season && !!teamId,
    staleTime: Infinity,
    select(data): TeamStat {
      return data;
    },
  });

  const teamLatestMatches = useQuery({
    queryKey: ["teamLatestMatches", teamId, season],
    queryFn: () => getTeamLatestMatches(teamId, season),
    enabled: !!teamId && !!season,
    staleTime: Infinity,
    select(data): Match[] {
      return data;
    },
  });

  const teamStandingsQuery = useQuery({
    queryKey: ["TeamStandings", teamId, season],
    queryFn: () => getTeamStandings(teamId, season),
    staleTime: Infinity,
    select(data): TeamStanding[] {
      return data;
    },
  });

  return {
    teamRankQuery,
    teamInfoQuery,
    teamStatQuery,
    teamLatestMatches,
    teamStandingsQuery,
  };
}

export default useTeam;
