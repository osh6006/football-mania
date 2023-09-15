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

const MainTitleWrapper = styled.div`
  position: relative;
  display: flex;
`;

const MainTitle = styled.h1`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 3rem;
  font-weight: bold;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

// const Title = styled.h2`
//   font-size: 1.3rem;
//   font-weight: bold;
// `;

const Desc = styled.h3`
  color: ${(props) => props.theme.colors.gray};
`;

const FormWrapper = styled.div`
  position: relative;
  min-width: 360px;
  text-align: center;
  padding: 1.25rem 1.5rem;
  margin-top: 1.5rem;
  background-color: ${(props) => props.theme.colors.secondBackground};
  border-radius: ${(props) => props.theme.border.radius};
`;

const roll = keyframes`
  0%{
        opacity: 1;
        top: -30px;
        transform: rotate(0deg);
        margin-top: -1rem;
        margin-bottom: 2rem;
    }
    40%{
        top: 20px;
        transform: rotate(180deg);

    }
    60%{
        top: 5px;
        transform: rotate(230deg);
    }

    80%{
      top: 20px;
      transform: rotate(270deg);
    }

    100%{
      top: 20px;
      transform:rotate(300deg);
      margin-top: -1rem;
      margin-bottom: 2rem;
    }

    /* 100%{
      top: 20px;
      transform: translateX(30px) rotate(360deg);
    } */

`;

const Ball = styled(IoMdFootball)`
  position: relative;
  top: 15px;
  animation: ${roll} 0.8s cubic-bezier(0.47, 0, 0.745, 0.715) infinite alternate;
  opacity: 0;

  @media (max-width: 768px) {
  }
`;

export default function Login() {
  useUser("/");

  return (
    <LoginWrapper>
      <MainTitleWrapper>
        <MainTitle>Football Mania.</MainTitle>
      </MainTitleWrapper>
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
