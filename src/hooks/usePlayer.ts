import { useQuery } from "@tanstack/react-query";
import { Players } from "../type/player";
import { getTopPlayer } from "../api/footballApi";

function usePlayer(leagueId: number, season: number, type?: string) {
  let tempSeason = season;
  if (!season) {
    tempSeason = Number(new Date().getFullYear);
  }

  const topPlayerQuery = useQuery({
    queryKey: ["topPlayer", leagueId, tempSeason, type],
    queryFn: () => getTopPlayer(leagueId, tempSeason, type || "topscorers"),
    enabled: !!leagueId && !!type && !!season,
    staleTime: 1000 * 60,
    select(data): Players[] {
      return data.response;
    },
  });

  return { topPlayerQuery };
}

export default usePlayer;
