import { useQuery } from "@tanstack/react-query";
import { getTeamInjuries } from "../../api/footballApi";
import { Injury } from "../../type/injuries";

export default function useInjuries(teamId?: number, season?: number) {
  const teamInjuriesQuery = useQuery({
    queryKey: ["teamLineUp", teamId],
    queryFn: () => getTeamInjuries(teamId, season),
    enabled: !!teamId && !!season,
    staleTime: 1000 * 60,
    select(data): Injury[] {
      return data;
    },
  });
  return { teamInjuriesQuery };
}
