import { useParams } from "react-router-dom";

export default function useLeagueId() {
  const params = useParams();
  const leagueId = Number(params.leagueId);
  return leagueId;
}
