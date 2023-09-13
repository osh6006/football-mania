import styled, { keyframes } from "styled-components";
import useColor from "../../hooks/useColor";
import { lighten } from "polished";

interface SpinnerProps {
  $color: string;
}

const rotation = keyframes`
    from{
        transform: rotate(0deg);
    }

    to{
        transform: rotate(360deg);
    }

`;

const Spinner = styled.div<SpinnerProps>`
  height: 30px;
  width: 30px;
  border: 4px solid ${(props) => lighten(0.5, props.$color)};
  border-radius: 50%;
  border-top: none;
  border-right: none;
  margin: 16px auto;
  animation: ${rotation} 1s linear infinite;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loading = () => {
  const color = useColor();
  return (
    <LoadingWrapper>
      <Spinner $color={color || "#FFFFF"} />
    </LoadingWrapper>
  );
};

export default Loading;
