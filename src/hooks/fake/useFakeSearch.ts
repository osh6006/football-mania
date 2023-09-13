import { useQuery } from "@tanstack/react-query";
import { getSearchResult } from "../../api/fakeFootballAPI";
import { Players } from "../../type/player";

function useFakeSearch() {
  const searchQuery = useQuery({
    queryKey: ["searchPlayer"],
    queryFn: () => getSearchResult(),
    staleTime: 1000 * 60,
    select(data): Players[] {
      return data;
    },
  });

  return { searchQuery };
}

export default useFakeSearch;
