import styled from "styled-components";
import DetailLink from "../common/DetailLink";

interface SectionHeaderProps {
  title: string;
  src: string;
}

const SectionHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
`;

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, src }) => {
  return (
    <SectionHeaderWrapper>
      <SectionTitle>{title}</SectionTitle>
      <DetailLink name="모두 보기" src={src} />
    </SectionHeaderWrapper>
  );
};

export default SectionHeader;
