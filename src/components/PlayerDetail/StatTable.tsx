import { styled } from "styled-components";
import { Statistics } from "../../type/player";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import StatTabs from "./StatTabs";

interface StatTableProps {
  stats?: Statistics[];
}

const StatTableWrapper = styled.div`
  margin: 0 auto;
`;

const TableWrapper = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border: 2px solid ${(props) => props.theme.colors.gray};
  border-radius: ${(props) => props.theme.border.radius};
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const TableTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const StatTable: React.FC<StatTableProps> = ({ stats }) => {
  return (
    <StatTableWrapper>
      {stats?.map((stat, i) => (
        <TableWrapper key={i}>
          <TitleWrapper>
            {/* <TableTitleLogo src={stat.league.logo} alt="league logo" /> */}
            <TableTitle>{stat.league.name}</TableTitle>
          </TitleWrapper>
          <StatTabs stat={stat} />
        </TableWrapper>
      ))}
    </StatTableWrapper>
  );
};

export default StatTable;
