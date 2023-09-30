import { useQuery } from "@tanstack/react-query";
import { getSearchCoach, getSearchPlayer, getSearchTeam } from "../api/footballApi";

import { Players } from "../type/player";
import { Coach, SearchTeam } from "../type/search";

export default function useSearch(leagueId: number, searchValue: string) {
  console.log(searchValue, leagueId);

  const searchPlayerQuery = useQuery({
    queryKey: ["searchPlayer", leagueId, searchValue],
    queryFn: () => getSearchPlayer(leagueId, searchValue),
    enabled: !!leagueId && !!searchValue,
    staleTime: Infinity,
    select(data): Players[] {
      return data;
    },
  });

  const searchCoachQuery = useQuery({
    queryKey: ["searchCoach", leagueId, searchValue],
    queryFn: () => getSearchCoach(leagueId, searchValue),
    enabled: !!leagueId && !!searchValue,
    staleTime: Infinity,
    select(data): Coach[] {
      return data;
    },
  });

  const searchTeamQuery = useQuery({
    queryKey: ["topPlayer", leagueId, searchValue],
    queryFn: () => getSearchTeam(searchValue),
    enabled: !!searchValue,
    staleTime: Infinity,
    select(data): SearchTeam[] {
      return data;
    },
  });

  return { searchPlayerQuery, searchCoachQuery, searchTeamQuery };
}
