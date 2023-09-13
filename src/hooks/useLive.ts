import { useQuery } from "@tanstack/react-query";
import { getLiveScore } from "../api/footballApi";
import { LiveMatch } from "../type/fixtures";

export default function useLive(fixturesId: string) {
  const liveScoreQuery = useQuery({
    queryKey: ["LiveScore", fixturesId],
    queryFn: () => getLiveScore(fixturesId),
    staleTime: 1000 * 60,
    enabled: !!fixturesId,
    select(data): LiveMatch[] {
      return data;
    },
  });

  // const liveStatisticQuery = useQuery({
  //   queryKey: () => get,
  // });

  return { liveScoreQuery };
}
