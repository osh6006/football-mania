import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import styled from "styled-components";
import LeagueType from "./LeagueType";
import { DBLeague } from "../../../type/dbleague";

interface MyLeagueListProps {
  leagueList: DBLeague[] | null;
  setLeagueList: (league: DBLeague[] | null) => void;
}

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

const MyLeagueList: React.FC<MyLeagueListProps> = ({
  leagueList,
  setLeagueList,
}) => {
  const selectLeagueList = useSelector(
    (state: RootState) => state.league.selectLeagueList
  );

  if (!selectLeagueList) {
    return <EmptyData>선택한 데이터가 없습니다.</EmptyData>;
  }

  return (
    <MyLeagueListWrapper>
      {leagueList?.map((type) => (
        <LeagueType
          leagueList={leagueList}
          setLeagueList={setLeagueList}
          league={type}
          key={type.id}
          role="delete"
        />
      ))}
    </MyLeagueListWrapper>
  );
};

export default MyLeagueList;
