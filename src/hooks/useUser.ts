import { useEffect } from "react";
import { onUserStateChange } from "../api/firebase";
import { selectUser, setUser } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function useUser(path: string) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    onUserStateChange((isUser) => {
      if (isUser) {
        dispatch(setUser(isUser));
        navigate(path);
      } else {
        navigate("/login");
      }
    });
  }, [dispatch, navigate, path]);

  return user;
}
