import styled from "styled-components";
import useColor from "../../hooks/useColor";
import { darken, rgba } from "polished";
import useFakeFixtures from "../../hooks/fake/useFakeFixtures";
import Loading from "../common/Loading";
import Title from "../common/Title";
import SubTitle from "../common/SubTitle";
import { timeStampToDate } from "../../util/date";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import useLeagueId from "../../hooks/useLeagueId";

// import useLeagueId from "../../hooks/useLeagueId";
// import useFixtures from "../../hooks/useFixtures";

interface BannerColor {
  $color: string;
}

const BannerWrapper = styled.div<BannerColor>`
  width: 100%;
  height: 300px;
  position: relative;
  display: flex;
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => rgba(darken(0.05, props.$color), 0.9)};
  margin-top: 1rem;
  padding: 1rem 1.5rem;

  @media (max-width: 1080px) {
    height: auto;
    flex-direction: column;
    gap: 2rem;
  }
`;

const TitleWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1px;
  min-width: 300px;

  @media (max-width: 1080px) {
    align-items: center;
    min-width: 100%;
  }
`;

const HeaderWrapper = styled.div`
  margin-bottom: 2.5rem;
`;

const ButtonWrapper = styled.div`
  margin-top: 2rem;
`;

const SecondWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const Logo = styled.img`
  width: 60%;

  max-width: 150px;
  @media (min-width: 1280px) {
    width: 80%;
  }
`;

const Banner = () => {
  const navigate = useNavigate();
  const leagueId = useLeagueId();
  const color = useColor();
  // const leagueId = useLeagueId();

  // const {
  //   bannerNextMatchesQuery: { data: matches, isLoading, error },
  // } = useFixtures(leagueId);

  const {
    fakeNextMatchesQuery: { data: matches, isLoading, error },
  } = useFakeFixtures();

  if (error) {
    return (
      <BannerWrapper $color={color || "#FFFFFF"}>
        <>Error!</>
      </BannerWrapper>
    );
  }

  if (isLoading) {
    return (
      <BannerWrapper $color={color || "#FFFFFF"}>
        <Loading />
      </BannerWrapper>
    );
  }

  return (
    <BannerWrapper $color={color || "#FFFFFF"}>
      <TitleWrapper>
        <HeaderWrapper>
          <Title title="다음 경기" />
        </HeaderWrapper>

        <Title
          title={
            (matches &&
              `${matches[0].teams.home.name} VS ${matches[0].teams.away.name}`) ||
            ""
          }
        />
        <SubTitle
          subtitle={(matches && timeStampToDate(matches[0].fixture.date)) || ""}
        />
        <SubTitle
          subtitle={
            (matches &&
              `in ${matches[0].fixture.venue.name}, ${matches[0].fixture.venue.city}`) ||
            ""
          }
        />
        <ButtonWrapper>
          <Button onClick={() => navigate(`/league/${leagueId}/schedule`)}>
            더 보기 &#8250;
          </Button>
        </ButtonWrapper>
      </TitleWrapper>
      <SecondWrapper>
        <LogoWrapper>
          <Logo src={matches && matches[0].teams.home.logo} />
          <Title title="Home" small />
        </LogoWrapper>
        <Title title="VS" />
        <LogoWrapper>
          <Logo src={matches && matches[0].teams.away.logo} />
          <Title title="Away" small />
        </LogoWrapper>
      </SecondWrapper>
    </BannerWrapper>
  );
};

export default Banner;
