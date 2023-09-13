import { useQuery } from "@tanstack/react-query";
import { getLatestMatches, getNextMatches } from "../api/footballApi";

export default function useFixtures(leagueId: number) {
  // const queryClient = useQueryClient();

  const year = new Date().getFullYear();

  const bannerNextMatchesQuery = useQuery({
    queryKey: ["bannerLatestMatch"],
    queryFn: () => getNextMatches(leagueId, year, 2),
    enabled: !!leagueId,
    staleTime: 1000 * 60,
    select(data) {
      return data.response;
    },
  });

  return { bannerNextMatchesQuery };
}
