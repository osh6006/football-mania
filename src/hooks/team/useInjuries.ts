import { useQuery } from "@tanstack/react-query";
import { getTeamInjuries } from "../../api/footballApi";
import { Injury } from "../../type/injuries";

export default function useInjuries(teamId?: number, season?: number) {
  const teamInjuriesQuery = useQuery({
    queryKey: ["teamLineUp", teamId],
    queryFn: () => getTeamInjuries(teamId, season),
    enabled: !!teamId && !!season,
    staleTime: Infinity,
    select(data): Injury[] {
      const injuries = data.filter((el: Injury) => {
        const date = new Date(el.fixture.date);
        const today = new Date();

        console.log(date);
        console.log(today);

        return date === today;
      });
      console.log(injuries);

      return data;
    },
  });
  return { teamInjuriesQuery };
}
