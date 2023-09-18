import { useEffect } from "react";
import {
  getLeagueList,
  getUserSelectLeague,
  initSelectLeague,
  onUserStateChange,
} from "../api/firebase";
import { selectUser, setUser } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLeagueTypes } from "../features/league/leagueSlice";

export default function useUser(path: string) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  // const leaguesdata = useSelector(
  //   (state: RootState) => state.league.leagueTypes
  // );

  useEffect(() => {
    onUserStateChange(async (isUser) => {
      if (isUser) {
        await initSelectLeague(isUser);
        const leagues = await getLeagueList();
        const selectLeagues = await getUserSelectLeague(isUser.uid);
        dispatch(setUser(isUser));
        dispatch(setLeagueTypes(selectLeagues));
        navigate(path);
      } else {
        navigate("/login");
      }
    });
  }, [dispatch, navigate, path]);

  return user;
}
