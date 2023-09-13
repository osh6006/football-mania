import { useQuery } from "@tanstack/react-query";

import { getLiveScore } from "../../api/fakeFootballAPI";
import { LiveMatch } from "../../type/fixtures";

export default function useFakeLive() {
  const liveScoreQuery = useQuery({
    queryKey: ["fakeLiveScore"],
    queryFn: () => getLiveScore(),
    staleTime: 1000 * 60,
    select(data): LiveMatch[] {
      return data;
    },
  });

  return { liveScoreQuery };
}
