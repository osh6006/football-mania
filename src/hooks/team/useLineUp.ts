import { useQuery } from "@tanstack/react-query";
import { getTeamLineUp } from "../../api/footballApi";
import { LiveMatch } from "../../type/fixtures";

export default function useLineUp(fixturesId: number) {
  const teamLineUpQuery = useQuery({
    queryKey: ["teamLineUp", fixturesId],
    queryFn: () => getTeamLineUp(fixturesId),
    enabled: !!fixturesId,
    staleTime: Infinity,
    select(data: LiveMatch[]): LiveMatch {
      return data[0];
    },
  });
  return { teamLineUpQuery };
}
