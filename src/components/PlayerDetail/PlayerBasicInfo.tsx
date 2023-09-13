import React from "react";
import { styled } from "styled-components";
import { Player } from "../../type/player";

interface PlayerBasicInfoProps {
  playerInfo?: Player;
}

const PlayerBasicInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 2rem;
  padding-bottom: 2rem;

  border-bottom: 2px solid ${(props) => props.theme.colors.gray};

  @media (max-width: 500px) {
    flex-direction: column-reverse;
    gap: 1rem;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FirstName = styled.h2`
  color: ${(props) => props.theme.colors.gray};
  font-size: 1rem;
`;
const LastName = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const DescWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
`;
const Desc = styled.p`
  color: ${(props) => props.theme.colors.gray};
`;
const Answer = styled.p``;

const Avatar = styled.img`
  width: 200px;
  border-radius: 50%;
`;

const PlayerBasicInfo: React.FC<PlayerBasicInfoProps> = ({ playerInfo }) => {
  return (
    <PlayerBasicInfoWrapper>
      <HeaderWrapper>
        <FirstName>{playerInfo?.firstname}</FirstName>
        <LastName>{playerInfo?.lastname}</LastName>
        <DescWrapper>
          <Desc>생년월일</Desc>
          <Answer>{playerInfo?.birth.date}</Answer>
        </DescWrapper>
        <DescWrapper>
          <Desc>국가</Desc>
          <Answer>{playerInfo?.nationality}</Answer>
        </DescWrapper>
        <DescWrapper>
          <Desc>키</Desc>
          <Answer>{playerInfo?.height}</Answer>
        </DescWrapper>
        <DescWrapper>
          <Desc>몸무게</Desc>
          <Answer>{playerInfo?.weight}</Answer>
        </DescWrapper>
        <DescWrapper>
          <Desc>나이</Desc>
          <Answer>{playerInfo?.age}</Answer>
        </DescWrapper>
      </HeaderWrapper>
      <Avatar src={playerInfo?.photo} alt="Player Profile" />
    </PlayerBasicInfoWrapper>
  );
};

export default PlayerBasicInfo;
