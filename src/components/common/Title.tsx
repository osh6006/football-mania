import styled from "styled-components";

interface TitleProps {
  title: string;
  small?: boolean;
  medium?: boolean;
}

interface StyledTitleProps {
  $small?: boolean;
  $medium?: boolean;
}

const StyledH1 = styled.h1<StyledTitleProps>`
  font-size: ${(props) => (props.$small ? "1.3rem" : "2rem")};
  font-size: ${(props) => props.$medium && "1.5rem"};
  font-weight: bold;
  text-transform: capitalize;

  @media (max-width: 640px) {
    font-size: 1.6rem;
  }
`;

const Title: React.FC<TitleProps> = ({ title, small, medium }) => {
  return (
    <StyledH1 $small={small} $medium={medium}>
      {title}
    </StyledH1>
  );
};

export default Title;
