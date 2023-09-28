import React from "react";
import { styled } from "styled-components";
import useInjuries from "../../hooks/team/useInjuries";
import Error from "../common/Error";
import Loading from "../common/Loading";

interface TeamInjuredProps {
  teamId?: number;
  season: number;
}

const TeamInjuredWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PlayerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PlayerImg = styled.img`
  max-width: 35px;
  border-radius: 50%;
`;
const Name = styled.p``;
const Desc = styled.p`
  color: ${(props) => props.theme.colors.gray};
  font-size: 12px;
`;

const TeamInjured: React.FC<TeamInjuredProps> = ({ season, teamId }) => {
  const {
    teamInjuriesQuery: { data: injuries, isError, isLoading },
  } = useInjuries(teamId, season);

  if (isError) {
    return <Error message="데이터를 불러오는 중 오류가 발생했습니다." />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      부상자 명단
      {injuries && (
        <TeamInjuredWrapper>
          {injuries.map((injury) => (
            <PlayerWrapper key={injury.player.id}>
              <PlayerImg src={injury.player.photo} alt="Player Image" />
              <div>
                <Desc>{injury.player.reason}</Desc>
                <Name>{injury.player.name}</Name>
              </div>
            </PlayerWrapper>
          ))}
        </TeamInjuredWrapper>
      )}
    </>
  );
};

export default TeamInjured;
