import { useQuery } from "@tanstack/react-query";
import { getTeamInjuries } from "../../api/footballApi";
import { Injury } from "../../type/injuries";
import moment from "moment";

export default function useInjuries(teamId?: number, season?: number) {
  const teamInjuriesQuery = useQuery({
    queryKey: ["teamLineUp", teamId],
    queryFn: () => getTeamInjuries(teamId, season),
    enabled: !!teamId && !!season,
    staleTime: Infinity,
    select(data): Injury[] {
      const injuries = data.filter((el: Injury) => {
        const date = moment(el.fixture.date, "YY-MM-DD");
        const today = moment().format("YY-MM-DD");

        console.log(date);
        console.log(today);
      });
      console.log(injuries);

      return data;
    },
  });
  return { teamInjuriesQuery };
}
