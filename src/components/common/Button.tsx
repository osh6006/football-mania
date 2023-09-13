import styled from "styled-components";
import useColor from "../../hooks/useColor";
import { lighten } from "polished";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

interface StyledButtonProps {
  $color: string;
}

const StyledButton = styled.button<StyledButtonProps>`
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${(props) => lighten(0.2, props.$color)};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => lighten(0.4, props.$color)};
  }

  &:focus {
    outline: 2px solid #fff;
  }
`;

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  const color = useColor();
  return (
    <StyledButton onClick={onClick} $color={color || "#FFFFFF"}>
      {children}
    </StyledButton>
  );
};

export default Button;
