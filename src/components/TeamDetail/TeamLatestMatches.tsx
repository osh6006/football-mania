import React from "react";
import { styled } from "styled-components";
import { Match } from "../../type/fixtures";

interface TeamLatestMatchesProps {
  matches?: Match[];
}

const TeamLatestMatchesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 2px solid ${(props) => props.theme.colors.gray};
  border-radius: ${(props) => props.theme.border.radius};
  gap: 0.5rem;
`;

const MatchWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const HomeTeam = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  flex: 1;
  text-align: right;
  gap: 0.3rem;
`;

const Score = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1rem;
`;

const AwayTeam = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex: 1;
  text-align: left;
  gap: 0.3rem;
`;

const Title = styled.h2`
  flex: 1;
  font-size: large;
  font-weight: bold;
  text-align: center;
`;

const Logo = styled.img`
  max-width: 30px;
  border-radius: 50%;
`;

const IsWinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 4px;
  border-radius: 50%;
`;

const TeamLatestMatches: React.FC<TeamLatestMatchesProps> = ({ matches }) => {
  return (
    <TeamLatestMatchesWrapper>
      <MatchWrapper>
        <Title>홈</Title>
        <Score></Score>
        <Title>어웨이</Title>
      </MatchWrapper>

      {matches?.map((match) => (
        <MatchWrapper key={match.fixture.id}>
          <HomeTeam>
            {match.teams.home.name}
            <Logo src={match.teams.home.logo} alt="home logo" />
          </HomeTeam>
          <Score>
            <IsWinner
              style={{
                backgroundColor: `${match.teams.home.winner ? "blue" : "red"}`,
              }}
            >
              {match.teams.home.winner ? "승" : "패"}
            </IsWinner>
            {` ${match.goals.home} VS ${match.goals.away}`}
            <IsWinner
              style={{
                backgroundColor: `${match.teams.away.winner ? "blue" : "red"}`,
              }}
            >
              {match.teams.away.winner ? "승" : "패"}
            </IsWinner>
          </Score>
          <AwayTeam>
            <Logo src={match.teams.away.logo} alt="away logo" />
            {match.teams.away.name}
          </AwayTeam>
        </MatchWrapper>
      ))}
    </TeamLatestMatchesWrapper>
  );
};

export default TeamLatestMatches;
