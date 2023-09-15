import styled, { keyframes } from "styled-components";
import SocialLoginBtn from "../components/Login/SocialLoginBtn";
import { IoMdFootball } from "@react-icons/all-files/io/IoMdFootball";
import useUser from "../hooks/useUser";

const LoginWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;
  background-color: ${(props) => props.theme.colors.background};
  overflow-y: scroll;
  gap: 1rem;

  @media (max-width: 768px) {
    padding-top: 60px;
    padding-bottom: 80px;
  }
`;

const MainTitle = styled.h1`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 3rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

// const Title = styled.h2`
//   font-size: 1.3rem;
//   font-weight: bold;
// `;

const Desc = styled.h3`
  margin-top: 0.5rem;
  color: ${(props) => props.theme.colors.gray};
`;

const FormWrapper = styled.div`
  text-align: center;
  padding: 1.25rem 1.5rem;
  margin-top: 1.5rem;
  background-color: ${(props) => props.theme.colors.secondBackground};
  border-radius: ${(props) => props.theme.border.radius};
`;

const roll = keyframes`
  0% {
    transform: rotate(0deg);
  }
  
  100% {
    transform: rotate(360deg);
  }
`;

const Ball = styled(IoMdFootball)`
  animation: ${roll} linear infinite;
  animation-duration: 3s;
`;

export default function Login() {
  useUser("/");

  return (
    <LoginWrapper>
      <MainTitle>Football Mania.</MainTitle>
      <FormWrapper>
        {/* <Title>어서오세요!</Title> */}
        <Ball size={35} />
        <Desc>로그인 후 서비스를 이용해 보세요.</Desc>
        <SocialLoginBtn type="google" />
        <SocialLoginBtn type="github" />
      </FormWrapper>
    </LoginWrapper>
  );
}
