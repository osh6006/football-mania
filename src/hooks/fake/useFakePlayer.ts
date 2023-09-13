import { useQuery } from "@tanstack/react-query";
import {
  getPlayerDetailResult,
  getPlayerTrophies,
  getTopScorer,
} from "../../api/fakeFootballAPI";
import { Players } from "../../type/player";
import { Trophie } from "../../type/trophies";

export default function useFakePlayer() {
  const topScorerQuery = useQuery({
    queryKey: ["FakeScorer"],
    queryFn: () => getTopScorer(),
    staleTime: 1000 * 60,
    select(data): Players[] {
      return data;
    },
  });

  const playerDetailQuery = useQuery({
    queryKey: ["PlayerDetail"],
    queryFn: () => getPlayerDetailResult(),
    staleTime: 1000 * 60,
    select(data): Players[] {
      return data;
    },
  });

  const playerTrophiesQuery = useQuery({
    queryKey: ["PlayerTrophies"],
    queryFn: () => getPlayerTrophies(),
    staleTime: 1000 * 60,
    select(data): Trophie[] {
      return data;
    },
  });

  return { topScorerQuery, playerDetailQuery, playerTrophiesQuery };
}
