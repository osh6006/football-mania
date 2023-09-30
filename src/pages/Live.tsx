import styled from "styled-components";
// import useFakeFixtures from "../hooks/fake/useFakeFixtures";
import MatchAccordion from "../components/Live/MatchAccordion";
import Error from "../components/common/Error";
import Title from "../components/common/Title";
import SubTitle from "../components/common/SubTitle";
import Loading from "../components/common/Loading";

import useLeagueId from "../hooks/useLeagueId";
import useFixtures from "../hooks/useFixtures";

const LiveWrapper = styled.section`
  padding: 1rem 1rem;
`;

const MatchesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  margin: 1rem auto;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default function Live() {
  const leagueId = useLeagueId();

  const {
    liveMatchesQuery: { data: matches, isError, isLoading },
  } = useFixtures(leagueId);

  // const {
  //   fakeLiveMatchQuery: { data: matches, isError, isLoading },
  // } = useFakeFixtures();

  return (
    <LiveWrapper>
      {isError && <Error message="데이터를 불러오는 중 오류가 발생하였습니다." />}
      <Title title="라이브" />
      <SubTitle subtitle="현재 리그의 진행중인 경기를 확인해 보세요." />
      {isLoading && <Loading />}
      <br />
      {isLoading || (
        <MatchesWrapper>
          {matches?.map((match) => (
            <MatchAccordion
              key={match.fixture.id}
              fixturesId={match.fixture.id}
              title={
                `${match.teams.home.name} ${matches[0].goals.home} VS ${matches[0].goals.away} ${match.teams.away.name}` ||
                "서버에 오류가 있습니다 관리자에게 문의하세요"
              }
            ></MatchAccordion>
          ))}
          {matches?.length === 0 && <div>현재 진행중인 경기가 없습니다.</div>}
        </MatchesWrapper>
      )}
    </LiveWrapper>
  );
}
