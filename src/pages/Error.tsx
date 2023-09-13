import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const ErrorCode = styled.h1`
  font-size: 6rem;
  margin-bottom: 10px;
  color: ${(props) => props.theme.colors.error};
`;

const ErrorMessage = styled.p`
  font-size: 1.5rem;
  text-align: center;
  margin: 0.5rem;
`;

function Error() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigate("/", { replace: false });
  //   }, 5000);
  // }, [navigate]);

  return (
    <ErrorContainer>
      <ErrorCode>404</ErrorCode>
      <ErrorMessage>이런! 요청하신 페이지를 찾을 수 없습니다.</ErrorMessage>
      <ErrorMessage>5초 후 메인 페이지로 이동합니다.</ErrorMessage>
    </ErrorContainer>
  );
}

export default Error;
