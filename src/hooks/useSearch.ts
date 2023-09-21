import { useQuery } from "@tanstack/react-query";
import {
  getCoachTeam,
  getSearchCoach,
  getSearchPlayer,
} from "../api/footballApi";

import { Players } from "../type/player";
import { Coach, SearchTeam } from "../type/search";

export default function useSearch(leagueId: number, searchValue: string) {
  const searchPlayerQuery = useQuery({
    queryKey: ["searchPlayer", leagueId, searchValue],
    queryFn: () => getSearchPlayer(leagueId, searchValue),
    enabled: !!leagueId && !!searchValue,
    staleTime: 1000 * 60,
    select(data): Players[] {
      return data;
    },
  });

  const searchCoachQuery = useQuery({
    queryKey: ["searchCoach", leagueId, searchValue],
    queryFn: () => getSearchCoach(leagueId, searchValue),
    enabled: !!leagueId && !!searchValue,
    staleTime: 1000 * 60,
    select(data): Coach[] {
      return data;
    },
  });

  const searchTeamQuery = useQuery({
    queryKey: ["topPlayer", leagueId, searchValue],
    queryFn: () => getCoachTeam(leagueId, searchValue),
    enabled: !!leagueId && !!searchValue,
    staleTime: 1000 * 60,
    select(data): SearchTeam[] {
      return data.response;
    },
  });

  return { searchPlayerQuery, searchCoachQuery, searchTeamQuery };
}
