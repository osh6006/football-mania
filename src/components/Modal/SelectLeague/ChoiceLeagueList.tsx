import { useSelector } from "react-redux";
import { RootState } from "../../../store";

import styled from "styled-components";
import LeagueType from "./LeagueType";

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

const ChoiceLeagueList = () => {
  const leagueTypes = useSelector(
    (state: RootState) => state.league.selectLeagueList
  );

  if (!leagueTypes) {
    return <EmptyData>선택 가능한 리그가 없습니다.</EmptyData>;
  }

  return (
    <ChoiceLeagueListWrapper>
      {leagueTypes.map((type) => (
        <LeagueType league={type} key={type.id} role="add" />
      ))}
      {leagueTypes.map((type) => (
        <LeagueType league={type} key={type.id} role="add" />
      ))}
      {leagueTypes.map((type) => (
        <LeagueType league={type} key={type.id} role="add" />
      ))}
    </ChoiceLeagueListWrapper>
  );
};

export default ChoiceLeagueList;
