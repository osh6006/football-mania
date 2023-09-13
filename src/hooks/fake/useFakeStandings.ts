import { useQuery } from "@tanstack/react-query";
import { getStandings } from "../../api/fakeFootballAPI";
import { Standings } from "../../type/standings";

export default function useFakeStandings() {
  const fakeStandingsQuery = useQuery({
    queryKey: ["FakeStandings"],
    queryFn: () => getStandings(),
    staleTime: 1000 * 60,
    select(data): Standings[] {
      return data;
    },
  });

  return { fakeStandingsQuery };
}
