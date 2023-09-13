import { styled } from "styled-components";
import { TeamStat } from "../../type/team";
import TeamStatTabs from "./TeamStatTabs";

interface StatTableProps {
  stats?: TeamStat;
  lineUpId?: number | string;
  teamId: number;
  season: number;
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

const TeamStatTable: React.FC<StatTableProps> = ({
  stats,
  lineUpId,
  teamId,
  season,
}) => {
  return (
    <StatTableWrapper>
      <TableWrapper>
        <TitleWrapper>
          {/* <TableTitleLogo src={stat.league.logo} alt="league logo" /> */}
          <TableTitle>{stats?.team?.name}</TableTitle>
        </TitleWrapper>
        <TeamStatTabs
          stat={stats}
          lineUpId={lineUpId}
          teamId={teamId}
          season={season}
        />
      </TableWrapper>
    </StatTableWrapper>
  );
};

export default TeamStatTable;
