import styled from "styled-components";
interface ErrorProps {
  message: string;
}

const ErrorWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const Error: React.FC<ErrorProps> = ({ message }) => {
  return <ErrorWrapper>{message}</ErrorWrapper>;
};

export default Error;
