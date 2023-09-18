import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import styled from "styled-components";
import LeagueType from "./LeagueType";

const MyLeagueListWrapper = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  text-transform: uppercase;
`;

const EmptyData = styled.p`
  margin: 1rem 0;
  color: ${(props) => props.theme.colors.gray};
`;

function MyLeagueList() {
  const leagueTypes = useSelector(
    (state: RootState) => state.league.selectLeagueList
  );

  if (!leagueTypes) {
    return <EmptyData>선택한 데이터가 없습니다.</EmptyData>;
  }

  return (
    <MyLeagueListWrapper>
      {leagueTypes.map((type) => (
        <LeagueType league={type} key={type.id} role="delete" />
      ))}
    </MyLeagueListWrapper>
  );
}

export default MyLeagueList;
