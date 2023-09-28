import React from "react";
import useLineUp from "../../hooks/team/useLineUp";
import Loading from "../common/Loading";
import Error from "../common/Error";
import { styled } from "styled-components";

interface TeamLineUpProps {
  lineUpId?: string;
  teamId?: number;
}

const TeamLineUpWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1.2rem;
`;

const PlayersWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const StartMember = styled.div`
  flex: 1;
`;
const SubMember = styled.div`
  flex: 1;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.5rem 0;
`;
const Name = styled.p``;

const Number = styled.p`
  color: ${(props) => props.theme.colors.gray};
  font-weight: bold;
`;

const Profile = styled.img`
  width: 35px;
  border-radius: 50%;
`;

const TeamLineUp: React.FC<TeamLineUpProps> = ({ lineUpId, teamId }) => {
  const {
    teamLineUpQuery: { data: lineUps, isError, isLoading },
  } = useLineUp(lineUpId);

  if (isError) {
    return <Error message="데이터를 가져오는 중 오류가 발생 하였습니다." />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const lineUp = lineUps?.lineups.filter((el) => el.team.id === teamId)[0];

  return (
    <TeamLineUpWrapper>
      라인업
      <Title>감독</Title>
      <br />
      <NameWrapper>
        <Profile src={lineUp?.coach.photo} alt="감독 사진" />
        <Name>{lineUp?.coach.name}</Name>
      </NameWrapper>
      <br />
      <PlayersWrapper>
        <StartMember>
          <Title>주전</Title>
          <br />
          {lineUp?.startXI.map((el) => (
            <NameWrapper key={el.player.id}>
              <Number>{el.player.number}</Number>
              <Name>{el.player.name}</Name>
              <Name>{el.player.pos}</Name>
            </NameWrapper>
          ))}
        </StartMember>
        <SubMember>
          <Title>교체</Title>
          <br />
          {lineUp?.substitutes.map((el) => (
            <NameWrapper key={el.player.id}>
              <Number>{el.player.number}</Number>
              <Name>{el.player.name}</Name>
              <Name>{el.player.pos}</Name>
            </NameWrapper>
          ))}
        </SubMember>
      </PlayersWrapper>
    </TeamLineUpWrapper>
  );
};

export default TeamLineUp;
