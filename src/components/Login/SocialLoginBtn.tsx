import { useDispatch } from "react-redux";
import { login } from "../../features/user/userSlice";

import { googleLogin } from "../../api/firebase";

import styled from "styled-components";
import { AiOutlineGoogle } from "@react-icons/all-files/ai/AiOutlineGoogle";
import { AiOutlineGithub } from "@react-icons/all-files/ai/AiOutlineGithub";

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
  margin-top: 1rem;
  padding: 10px 1rem;

  border: 2px solid ${(props) => props.theme.colors[props.$color] || "#4827"};
  border-radius: ${(props) => props.theme.border.radius};

  transition: background 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors[props.$color] || "#4827"};
  }
  user-select: none;
`;

const SocialLoginBtn: React.FC<SocialLoginBtnProps> = ({ type }) => {
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const user = await googleLogin();
    dispatch(login(user));
  };

  if (type === "google") {
    return (
      <SocialBtn $color="google" onClick={handleLogin}>
        <AiOutlineGoogle size={25} />
        {`Sign up with Google`}
      </SocialBtn>
    );
  }

  if (type === "github") {
    return (
      <SocialBtn $color="github" onClick={handleLogin}>
        <AiOutlineGithub size={25} />
        {`Sign up with Github`}
      </SocialBtn>
    );
  }

  return <></>;
};

export default SocialLoginBtn;
