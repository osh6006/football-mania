import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { changeLeague } from "../features/league/leagueSlice";

export default function useChange() {
  const { pathname } = useLocation();
  const params = useParams();

  const leagueId = params.leagueId;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // 리덕스에서 현재 리그에 대한 정보를 바꿔준다.
    if (leagueId && !pathname.split("/")[3]) {
      dispatch(changeLeague(leagueId));
      navigate(`/league/${leagueId}/overview`);
    }
  }, [navigate, pathname, dispatch, leagueId]);
}
