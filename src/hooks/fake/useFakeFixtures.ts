import { useQuery } from "@tanstack/react-query";
import { getOneLatestMatches, getOneLiveMatch, getTwoNextMatches } from "../../api/fakeFootballAPI";
import { Match } from "../../type/fixtures";

export default function useFakeFixtures() {
  // const queryClient = useQueryClient();

  const fakeNextMatchesQuery = useQuery({
    queryKey: ["FakeBannerNextMatch"],
    queryFn: () => getTwoNextMatches(),
    staleTime: 1000 * 60,
    select(data): Match[] {
      return data;
    },
  });

  const fakeLatestMatchesQuery = useQuery({
    queryKey: ["FakeBannerLatestMatch"],
    queryFn: () => getOneLatestMatches(),
    staleTime: 1000 * 60,
    select(data): Match[] {
      return data;
    },
  });

  const fakeLiveMatchQuery = useQuery({
    queryKey: ["FakeBannerLiveMatch"],
    queryFn: () => getOneLiveMatch(),
    staleTime: 1000 * 60,
    select(data): Match[] {
      return data;
    },
  });

  return { fakeNextMatchesQuery, fakeLatestMatchesQuery, fakeLiveMatchQuery };
}
