import { useDispatch } from "react-redux";
import { login, logout } from "../../features/user/userSlice";

import styled from "styled-components";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import { firebaseLogout, googleLogin } from "../../api/firebase";

interface SocialLoginBtnProps {
  type: "google" | "github" | "logout";
}

interface BtnProps {
  $color: "google" | "github" | "logout";
}

const SocialBtn = styled.button<BtnProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 1.2rem;
  margin-top: 1.5rem;
  padding: 10px 1rem;

  border: 2px solid ${(props) => props.theme.colors[props.$color] || "#4827"};
  border-radius: ${(props) => props.theme.border.radius};

  transition: background 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors[props.$color] || "#4827"};
  }
`;

const SocialLoginBtn: React.FC<SocialLoginBtnProps> = ({ type }) => {
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const user = await googleLogin();
    dispatch(login(user));
  };

  const handleLogout = async () => {
    await firebaseLogout();
    dispatch(logout());
  };

  if (type === "google") {
    return (
      <SocialBtn $color="google" onClick={handleLogin}>
        <FcGoogle size={25} />
        {`구글로 로그인`}
      </SocialBtn>
    );
  }

  if (type === "logout") {
    return (
      <SocialBtn $color="google" onClick={handleLogout}>
        {`로그아웃`}
      </SocialBtn>
    );
  }

  return <></>;
};

export default SocialLoginBtn;
