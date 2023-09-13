import styled from "styled-components";
import useFakeSearch from "../../hooks/fake/useFakeSearch";
import useSearch from "../../hooks/useSearch";
import useLeagueId from "../../hooks/useLeagueId";
import Loading from "../common/Loading";
import Error from "../common/Error";
import ResultCard from "./ResultCard";

interface SearchResultProps {
  searchValue: string;
}

const SearchResultWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 5vh;
`;

const NotResult = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.gray};
  font-size: 2rem;
  min-height: 500px;
`;

const SearchResult: React.FC<SearchResultProps> = ({ searchValue }) => {
  const leagueId = useLeagueId();

  // const {
  //   searchPlayerQuery: { data: players, isError:isPlayerError, isPlayerLoading },
  //   searchCoachQuery: { data: coachs, isCoachError, isCoachLoading },
  //   searchTeamQuery: { data: teams, isTeamError, isTeamLoading },

  // } = useSearch(leagueId, searchValue);

  // const isLoading = isPlayerLoading || isCoachLoading || isTeamLoading;
  // const isError = isTeamError || isCoachError || isPlayerError;

  const {
    searchQuery: { data: players, isError, isLoading },
  } = useFakeSearch();

  console.log(players);

  return (
    <SearchResultWrapper>
      {isLoading && <Loading />}
      {isError && <Error message="데이터를 불러오는 중 오류가 발생했습니다." />}
      {players &&
        players?.length > 0 &&
        players.map((playerInfo) => {
          return <ResultCard type="player" key={playerInfo.player.id} playerInfo={playerInfo} />;
        })}
      {/* {players?.length === 0 && coachs.length === 0 && teams.length === 0 && (
        <NotResult>검색된 결과가 없어요 :) 다시 검색해주세요!</NotResult>
      )} */}

      {/* {coachs && coachs?.length > 0 && <></>}
      {teams && teams?.length > 0 && <></>} */}
    </SearchResultWrapper>
  );
};

export default SearchResult;
