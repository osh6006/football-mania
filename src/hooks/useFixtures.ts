import { useQuery } from "@tanstack/react-query";
import { getLatestMatches, getLiveMatches, getNextMatches } from "../api/footballApi";
import { LiveMatch } from "../type/fixtures";

export default function useFixtures(leagueId: number) {
  // const queryClient = useQueryClient();

  const year = new Date().getFullYear();

  const bannerNextMatchesQuery = useQuery({
    queryKey: ["bannerNextMatches", leagueId],
    queryFn: () => getNextMatches(leagueId, year, 2),
    enabled: !!leagueId,
    staleTime: Infinity,
    select(data) {
      return data.response;
    },
  });

  const bannerLatestMatchesQuery = useQuery({
    queryKey: ["bannerLatestMatches", leagueId],
    queryFn: () => getLatestMatches(leagueId, year, 2),
    enabled: !!leagueId,
    staleTime: Infinity,
    select(data) {
      return data.response;
    },
  });

  const bannerLiveMatchQuery = useQuery({
    queryKey: ["bannerLiveMatch", leagueId],
    queryFn: () => getLiveMatches(leagueId, year),
    enabled: !!leagueId,
    staleTime: 1000 * 60,
    select(data) {
      return data.response;
    },
  });

  const liveMatchesQuery = useQuery({
    queryKey: ["LiveMatches", leagueId],
    queryFn: () => getLiveMatches(leagueId, year),
    enabled: !!leagueId,
    staleTime: 29000,
    refetchInterval: 30000,
    select(data): LiveMatch[] {
      return data.response;
    },
  });

  return {
    bannerNextMatchesQuery,
    bannerLatestMatchesQuery,
    bannerLiveMatchQuery,
    liveMatchesQuery,
  };
}
