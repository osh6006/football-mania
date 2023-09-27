import { useParams } from "react-router-dom";
import { RootState } from "../store";
import { useSelector } from "react-redux";

const useColor = () => {
  const params = useParams();
  const leagueId = params.leagueId;
  const selectLeagueList = useSelector(
    (state: RootState) => state?.league?.selectLeagueList
  );
  const colorObj = selectLeagueList?.find(
    (el) => el.id.toString() === leagueId
  );
  return colorObj?.color || "#333";
};

export default useColor;
