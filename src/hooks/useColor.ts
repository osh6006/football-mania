import { useParams } from "react-router-dom";
import { SidebarRoutes } from "../util/routeData";

const useColor = () => {
  const params = useParams();
  const leagueId = params.leagueId;
  const colorObj = SidebarRoutes.find((el) => el.id.toString() === leagueId);
  return colorObj?.color;
};

export default useColor;
