import { styled } from "styled-components";
import { useParams } from "react-router-dom";

import useTeam from "../hooks/useTeam";

import TeamBasicInfo from "../components/TeamDetail/TeamBasicInfo";
import TeamStatTable from "../components/TeamDetail/TeamStatTable";
import TeamLatestMatches from "../components/TeamDetail/TeamLatestMatches";
import TeamStandings from "../components/TeamDetail/TeamStandings";
import useLeagueId from "../hooks/useLeagueId";
import useSeason from "../hooks/useSeason";
import useFakeTeam from "../hooks/fake/useFakeTeam";
import Title from "../components/common/Title";
import SubTitle from "../components/common/SubTitle";
import SeasonSelector from "../components/common/SeasonSelector";
import Error from "../components/common/Error";
import Loading from "../components/common/Loading";

const TeamDetailWrapper = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
`;

const TagTitle = styled.h3`
  font-size: 1.5rem;
`;

export default function TeamDetail() {
  const params = useParams();
  const leagueId = useLeagueId();

  const { seasonRange, selectSeason, setSeasonRange, setSelectSeason } =
    useSeason();
  const {
    teamInfoQuery: {
      data: teamInfo,
      isError: teamInfoError,
      isLoading: teamInfoLoading,
    },
    teamStatQuery: {
      data: teamStats,
      isError: teamStatError,
      isLoading: teamStatLoading,
    },

    teamLatestMatchesQuery: {
      data: teamLatestMatches,
      isError: teamLatestMatchesError,
      isLoading: teamLatestMatchesLoading,
    },

    teamStandingsQuery: {
      data: teamStandings,
      isError: teamStandingsError,
      isLoading: teamStandingsLoading,
    },
  } = useFakeTeam();

  //   const {
  //     teamInfoQuery: {
  //       data: teamInfo,
  //       isError: teamInfoError,
  //       isLoading: teamInfoLoading,
  //     },
  //     teamStatQuery: {
  //       data: teamStats,
  //       isError: teamStatError,
  //       isLoading: teamStatLoading,
  //     },

  //     teamLatestMatches: {
  //       data: teamLatestMatches,
  //       isError: teamLatestMatchesError,
  //       isLoading: teamLatestMatchesLoading,
  //     },

  //   teamStandingsQuery: {
  //     data: teamStandings,
  //     isError: teamStandingsError,
  //     isLoading: teamStandingsLoading,
  //   },

  //   } = useTeam(leagueId, selectSeason, params.teamId);

  console.log(teamStandings);

  return (
    <TeamDetailWrapper>
      <Title title="Team Info" />
      <SubTitle subtitle="시즌 별 팀에 대한 자세한 정보를 알아보세요" />
      <SeasonSelector
        currentSeason={selectSeason}
        seasonRange={seasonRange}
        setSelectSeason={setSelectSeason}
      />
      {teamInfoError ||
        teamStatError ||
        teamLatestMatchesError ||
        (teamStandingsError && <Error message="데이터에 오류가 있습니다." />)}
      {teamInfoLoading ||
        teamStatLoading ||
        teamLatestMatchesLoading ||
        (teamStandingsLoading && <Loading />)}
      {teamInfoLoading ||
        teamInfoLoading ||
        teamLatestMatchesLoading ||
        (teamInfo && (
          <>
            <TagTitle>팀 정보</TagTitle>
            <TeamBasicInfo teamInfo={teamInfo} />
            <br />
            <TagTitle>시즌 스탯</TagTitle>
            <br />
            <TeamStatTable
              stats={teamStats}
              lineUpId={teamLatestMatches && teamLatestMatches[0].fixture.id}
              teamId={teamInfo.team.id}
              season={selectSeason}
            />
            <br />
            <TagTitle>시즌 현황</TagTitle>
            <br />
            <TeamStandings teamStandings={teamStandings} />
            <TagTitle>최근 경기</TagTitle>
            <br />
            <TeamLatestMatches matches={teamLatestMatches} />
          </>
        ))}
    </TeamDetailWrapper>
  );
}
