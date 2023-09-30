import styled from "styled-components";
import { Goals, Team } from "../../type/fixtures";

interface HeadToHeadProps {
  team?: Team;
  score?: Goals;
}

const HeadToHeadWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-size: 1.2rem;
`;
const Away = styled(Home)``;

const Logo = styled.img`
  width: 70%;
  max-width: 150px;
`;
const TeamName = styled.h2`
  font-weight: bold;
`;

const VSScore = styled.h2`
  display: flex;
  font-size: 2rem;
  gap: 1rem;
`;

function HeadToHead({ team, score }: HeadToHeadProps) {
  return (
    <HeadToHeadWrapper>
      <Home>
        <Logo src={team?.home.logo} alt={"HomeLogo"} />
        <TeamName>{team?.home.name}</TeamName>
      </Home>
      <VSScore>
        <div>{score?.home}</div>:<div>{score?.away}</div>
      </VSScore>
      <Away>
        <Logo src={team?.away.logo} alt={"AwayLogo"} />
        <TeamName>{team?.away.name}</TeamName>
      </Away>
    </HeadToHeadWrapper>
  );
}

export default HeadToHead;
