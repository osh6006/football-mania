import React from "react";
import { TeamStanding } from "../../type/teamStandings";
import { styled } from "styled-components";

interface TeamStandingsProps {
  teamStandings?: TeamStanding[];
}

const TeamStandingsWrapper = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border: 2px solid ${(props) => props.theme.colors.gray};
  border-radius: ${(props) => props.theme.border.radius};
`;

const TeamStandingTable = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 1rem 0;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin: 4px 0;
`;

const Logo = styled.img`
  max-width: 30px;
  border-radius: 50%;
  background-color: white;
`;

const StatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;
const Stat = styled.p`
  color: ${(props) => props.theme.colors.gray};
`;
const Desc = styled.p``;

const TeamStandings: React.FC<TeamStandingsProps> = ({ teamStandings }) => {
  return (
    <TeamStandingsWrapper>
      {teamStandings?.map((standing) => (
        <div key={standing.league.id}>
          <TitleWrapper>
            <Logo src={standing.league.logo} alt="League Logo" />
            <Title>{standing.league.name}</Title>
          </TitleWrapper>
          <Desc>{standing.league.standings[0][0].description || ""}</Desc>
          <br />
          <TeamStandingTable>
            <StatWrapper>
              <Stat>전적</Stat>
              <Desc>{`
            ${standing.league.standings[0][0].all.played}전
            ${standing.league.standings[0][0].all.win}승
            ${standing.league.standings[0][0].all.draw}무
            ${standing.league.standings[0][0].all.lose}패
            `}</Desc>
            </StatWrapper>
            <StatWrapper>
              <Stat>순위</Stat>
              <Desc>{standing.league.standings[0][0].rank}위</Desc>
            </StatWrapper>
            <StatWrapper>
              <Stat>골 득실</Stat>
              <Desc>{standing.league.standings[0][0].goalsDiff || "0"}</Desc>
            </StatWrapper>
            <StatWrapper>
              <Stat>승점</Stat>
              <Desc>{standing.league.standings[0][0].points || "0"}</Desc>
            </StatWrapper>
            <StatWrapper>
              <Stat>이전 경기 대비</Stat>
              <Desc>{standing.league.standings[0][0].status || "-"}</Desc>
            </StatWrapper>
            <StatWrapper>
              <Stat>최근 전적</Stat>
              <Desc>{standing.league.standings[0][0].form || "-"}</Desc>
            </StatWrapper>
          </TeamStandingTable>
        </div>
      ))}
    </TeamStandingsWrapper>
  );
};

export default TeamStandings;
