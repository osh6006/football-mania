import styled from "styled-components";
import useFakeFixtures from "../../hooks/fake/useFakeFixtures";
import Loading from "../common/Loading";
import { darken } from "polished";
import SubTitle from "../common/SubTitle";
import DetailLink from "../common/DetailLink";
import useLeagueId from "../../hooks/useLeagueId";

interface LiveSwitchProps {
  $isLive: boolean;
}

const LiveWrapper = styled.div`
  width: 30%;
  padding: 1rem 1rem;
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.colors.secondBackground};
  min-width: 200px;

  @media (max-width: 1280px) {
    width: 100%;
  }
`;

const NotMatch = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
`;

const LiveSwitch = styled.div<LiveSwitchProps>`
  position: relative;
  font-size: 1.1rem;
  padding: 0.5rem;
  padding-right: 1.7rem;
  text-transform: uppercase;
  border-radius: 8px;

  background-color: ${(props) =>
    (props.$isLive && darken(0.3, "#9acd32")) || darken(0.3, "#cd3232")};

  &::after {
    content: "";
    position: absolute;
    top: 26%;
    right: 6.5%;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    background-color: ${(props) => (props.$isLive && "#9acd32") || "#cd3232"};
  }
`;

const MatchWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoWrapper = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 1rem;
  gap: 0.5rem;
`;

const Logo = styled.img`
  width: 90%;
  height: auto;
  max-width: 100px;
`;

const Score = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  gap: 0.5rem;
  min-width: 60px;
`;

const LinkWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

const Live = () => {
  const {
    fakeLiveMatchQuery: { data: matches, isLoading, isError },
  } = useFakeFixtures();

  const leagueId = useLeagueId();

  return (
    <LiveWrapper>
      {isError && <>Error</>}
      {isLoading && <Loading />}
      <TitleWrapper>
        <SectionTitle>라이브</SectionTitle>
        <LiveSwitch $isLive={(matches && matches.length >= 1 && true) || false}>
          live
        </LiveSwitch>
      </TitleWrapper>
      {isLoading ||
        (matches && matches.length > 0 && (
          <>
            <SubTitle subtitle={matches[0].league.round} />

            <MatchWrapper>
              <LogoWrapper>
                <Logo src={matches[0].teams.home.logo} alt="HomeLogo" />
                {matches[0].teams.home.name}
              </LogoWrapper>
              <Score>{`${matches[0].goals.home} : ${matches[0].goals.away}`}</Score>
              <LogoWrapper>
                <Logo src={matches[0].teams.away.logo} alt="AwayLogo" />
                {matches[0].teams.away.name}
              </LogoWrapper>
            </MatchWrapper>
            <LinkWrapper>
              <div></div>
              <DetailLink name="자세히" src={`/league/${leagueId}/live`} />
            </LinkWrapper>
          </>
        )) || (
          <>
            <NotMatch>현재 진행중인 경기가 없습니다!</NotMatch>
          </>
        )}
    </LiveWrapper>
  );
};

export default Live;
