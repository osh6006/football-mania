import styled from "styled-components";
import { DBLeague } from "../../../type/dbleague";
import LeagueType from "./LeagueType";

interface MoveLeagueListProps {
  leagueList: DBLeague[] | null;
  setLeagueList: (league: DBLeague[] | null) => void;
}

const MoveLeagueListWrapper = styled.div`
  width: 100%;
  max-height: 150px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 4px 0;
  margin-top: 1rem;
  flex-wrap: wrap;
  overflow-y: auto;
  text-transform: uppercase;
`;

const EmptyData = styled.p`
  margin: 1rem 0;
  color: ${(props) => props.theme.colors.gray};
`;

const MoveLeagueList: React.FC<MoveLeagueListProps> = ({
  leagueList,
  setLeagueList,
}) => {
  if (leagueList?.length === 0) {
    return <EmptyData>이동 가능한 리그가 없습니다.</EmptyData>;
  }
  return (
    <MoveLeagueListWrapper>
      {leagueList?.map((type) => (
        <LeagueType
          leagueList={leagueList}
          setLeagueList={setLeagueList}
          league={type}
          key={type.id}
          role="move"
        />
      ))}
    </MoveLeagueListWrapper>
  );
};

export default MoveLeagueList;
