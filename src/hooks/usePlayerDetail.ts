import { useQuery } from "@tanstack/react-query";
import { getPlayerDetail, getPlayerTrophies } from "../api/footballApi";
import { Players } from "../type/player";
import { Trophie } from "../type/trophies";

export default function usePlayerDetail(playerId: number, season: number) {
  const playerDetailQuery = useQuery({
    queryKey: ["playerDetail", playerId, season],
    queryFn: () => getPlayerDetail(playerId, season),
    enabled: !!playerId && !!season,
    staleTime: 1000 * 60,
    select(data): Players[] {
      return data;
    },
  });

  const playerTrophieQuery = useQuery({
    queryKey: ["playerTrophie", playerId],
    queryFn: () => getPlayerTrophies(playerId),
    enabled: !!playerId,
    staleTime: 1000 * 60,
    select(data): Trophie[] {
      return data;
    },
  });

  return { playerDetailQuery, playerTrophieQuery };
}
