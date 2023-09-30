import styled from "styled-components";
// import useFakeSearch from "../../hooks/fake/useFakeSearch";
import useSearch from "../../hooks/useSearch";
import useLeagueId from "../../hooks/useLeagueId";
import Loading from "../common/Loading";
import Error from "../common/Error";
import ResultCard from "./ResultCard";

interface SearchResultProps {
  searchValue: string;
}

const SearchResultWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 5vh;
`;

const NotSearchValue = styled.div`
  color: ${(props) => props.theme.colors.gray};
  font-size: 1.5rem;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 100%;
  left: 50%;
`;

const SearchResult: React.FC<SearchResultProps> = ({ searchValue }) => {
  const leagueId = useLeagueId();

  const {
    searchPlayerQuery: { data: players, isError: isPlayerError, isLoading: isPlayerLoading },
    searchCoachQuery: { data: coachs, isError: isCoachError, isLoading: isCoachLoading },
    searchTeamQuery: { data: teams, isError: isTeamError, isLoading: isTeamLoading },
  } = useSearch(leagueId, searchValue);

  const isLoading = isPlayerLoading || isCoachLoading || isTeamLoading;
  const isError = isTeamError || isCoachError || isPlayerError;

  // const {
  //   searchQuery: { data: players, isError, isLoading },
  // } = useFakeSearch();

  if (!searchValue) {
    return (
      <LoadingWrapper>
        <NotSearchValue>검색어를 입력 후 Enter or 버튼 클릭</NotSearchValue>
      </LoadingWrapper>
    );
  }

  if (isLoading) {
    return (
      <LoadingWrapper>
        <Loading />
      </LoadingWrapper>
    );
  }

  if (isError) {
    return (
      <LoadingWrapper>
        <Error message="데이터를 불러오는 중 오류가 발생했습니다." />
      </LoadingWrapper>
    );
  }
  console.log(players);
  console.log(coachs);
  console.log(teams);

  if (players?.length === 0 && coachs?.length === 0 && teams?.length === 0) {
    return (
      <LoadingWrapper>
        <NotSearchValue>검색된 결과가 없어요 :) 다시 검색해주세요!</NotSearchValue>
      </LoadingWrapper>
    );
  }

  return (
    <SearchResultWrapper>
      <>
        {players &&
          players?.length > 0 &&
          players.map((playerInfo) => <ResultCard type="player" key={playerInfo.player.id} playerInfo={playerInfo} />)}
        {coachs &&
          coachs?.length > 0 &&
          coachs.map((coachInfo) => <ResultCard type="coach" coachInfo={coachInfo} key={coachInfo.id} />)}
        {teams &&
          teams?.length > 0 &&
          teams.map((teamInfo) => <ResultCard type="team" teamInfo={teamInfo} key={teamInfo.team.id} />)}
      </>
    </SearchResultWrapper>
  );
};

export default SearchResult;
