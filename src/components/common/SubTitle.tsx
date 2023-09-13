import styled from "styled-components";

interface SubTitleProps {
  subtitle: string;
}

const StyledSubtitle = styled.p`
  color: ${(props) => props.theme.colors.gray};
  margin-top: 0.5rem;
  text-transform: capitalize;
`;

const SubTitle: React.FC<SubTitleProps> = ({ subtitle }) => {
  return <StyledSubtitle>{subtitle}</StyledSubtitle>;
};

export default SubTitle;
