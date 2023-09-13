import { useQuery } from "@tanstack/react-query";
import { getCoachTeam, getSearchCoach, getSearchPlayer } from "../api/footballApi";

import { Players } from "../type/player";
import { Team } from "../type/fixtures";

export default function useSearch(leagueId: number, searchValue: string) {
  const searchPlayerQuery = useQuery({
    queryKey: ["searchPlayer"],
    queryFn: () => getSearchPlayer(leagueId, searchValue),
    enabled: !!leagueId && !!searchValue,
    staleTime: 1000 * 60,
    select(data): Players[] {
      return data;
    },
  });

  const searchCoachQuery = useQuery({
    queryKey: ["searchCoach"],
    queryFn: () => getSearchCoach(leagueId, searchValue),
    enabled: !!leagueId && !!searchValue,
    staleTime: 1000 * 60,
    select(data): Players[] {
      return data;
    },
  });

  const searchTeamQuery = useQuery({
    queryKey: ["topPlayer"],
    queryFn: () => getCoachTeam(leagueId, searchValue),
    enabled: !!leagueId && !!searchValue,
    staleTime: 1000 * 60,
    select(data): Team[] {
      return data.response;
    },
  });

  return { searchPlayerQuery, searchCoachQuery, searchTeamQuery };
}
