import { useSelector } from "react-redux";
import { RootState } from "../../../store";

import styled from "styled-components";
import LeagueType from "./LeagueType";
import { DBLeague } from "../../../type/dbleague";

interface ChoiceLeagueListProps {
  leagueList: DBLeague[] | null;
  setLeagueList: (league: DBLeague[] | null) => void;
}

const ChoiceLeagueListWrapper = styled.ul`
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

const ChoiceLeagueList: React.FC<ChoiceLeagueListProps> = ({
  leagueList,
  setLeagueList,
}) => {
  const leagueTypes = useSelector(
    (state: RootState) => state.league.leagueList
  );

  const filteredLeagueList = leagueList
    ? leagueTypes?.filter((a) => !leagueList?.some((b) => a.id === b.id))
    : [];

  if (filteredLeagueList?.length === 0) {
    return <EmptyData>선택 가능한 리그가 없습니다.</EmptyData>;
  }

  return (
    <ChoiceLeagueListWrapper>
      {filteredLeagueList?.map((type) => (
        <LeagueType
          leagueList={leagueList}
          setLeagueList={setLeagueList}
          league={type}
          key={type.id}
          role="add"
        />
      ))}
    </ChoiceLeagueListWrapper>
  );
};

export default ChoiceLeagueList;
