import { styled } from "styled-components";
import Title from "../components/common/Title";
import SubTitle from "../components/common/SubTitle";
import useSeason from "../hooks/useSeason";
import SeasonSelector from "../components/common/SeasonSelector";
// import usePlayerDetail from "../hooks/usePlayerDetail";
import Error from "../components/common/Error";
import Loading from "../components/common/Loading";
// import { useParams } from "react-router-dom";
import PlayerBasicInfo from "../components/PlayerDetail/PlayerBasicInfo";
import useFakePlayer from "../hooks/fake/useFakePlayer";
import StatTable from "../components/PlayerDetail/StatTable";
import CareerTable from "../components/PlayerDetail/CareerTable";

const PlayerDetailWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
`;

const TagTitle = styled.h3`
  font-size: 1.5rem;
`;

export default function PlayerDetail() {
  // const params = useParams();
  const { seasonRange, selectSeason, setSelectSeason } = useSeason();

  // const {
  //   playerDetailQuery: { data: detail, isError, isLoading },
  // } = usePlayerDetail(Number(params.playerId), selectSeason);

  // const {
  //   playerTrophieQuery: { data: trophies },
  // } = usePlayerDetail(Number(params.playerId), selectSeason);

  const {
    playerDetailQuery: { data: detail, isError, isLoading },
    playerTrophiesQuery: { data: trophies },
  } = useFakePlayer();

  return (
    <PlayerDetailWrapper>
      <Title title="Player Info" />
      <SubTitle subtitle="시즌 별 플레이어의 자세한 정보를 알아보세요" />
      <SeasonSelector
        currentSeason={selectSeason}
        seasonRange={seasonRange}
        setSelectSeason={setSelectSeason}
      />

      {isError && <Error message="데이터에 오류가 있습니다." />}
      {isLoading && <Loading />}
      {isLoading ||
        (detail && (
          <>
            <TagTitle>선수 정보</TagTitle>
            <PlayerBasicInfo playerInfo={detail[0].player} />
            <br />
            <TagTitle>시즌 스탯</TagTitle>
            <br />
            <StatTable stats={detail[0].statistics} />
            <br />
            <TagTitle>수상 경력</TagTitle>
            <br />
            <CareerTable trophies={trophies} />
          </>
        ))}
    </PlayerDetailWrapper>
  );
}
