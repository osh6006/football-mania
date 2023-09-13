import { styled } from "styled-components";
import { TeamInfo } from "../../type/team";

interface TeamBasicInfoProps {
  teamInfo: TeamInfo;
}

const TeamBasicInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 2rem;
  padding-bottom: 2rem;

  border-bottom: 2px solid ${(props) => props.theme.colors.gray};

  @media (max-width: 1040px) {
    gap: 1rem;
    padding: 1rem;
    flex-direction: column-reverse;
  }
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 500px;
`;

const Code = styled.h2`
  color: ${(props) => props.theme.colors.gray};
  font-size: 1rem;
  @media (max-width: 500px) {
    display: none;
  }
`;
const Name = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;

  @media (max-width: 500px) {
    font-size: 3rem;
    text-align: center;
  }
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

const TeamBasicInfo: React.FC<TeamBasicInfoProps> = ({ teamInfo }) => {
  return (
    <TeamBasicInfoWrapper>
      <HeaderWrapper>
        <Code>{teamInfo.team.code}</Code>
        <Name>{teamInfo.team.name}</Name>
        <DescWrapper>
          <Desc>창단 년도</Desc>
          <Answer>{teamInfo?.team.founded}</Answer>
        </DescWrapper>
        <DescWrapper>
          <Desc>국가</Desc>
          <Answer>{teamInfo?.team.country}</Answer>
        </DescWrapper>
        <DescWrapper>
          <Desc>도시</Desc>
          <Answer>{teamInfo?.venue.city}</Answer>
        </DescWrapper>
        <DescWrapper>
          <Desc>홈 구장</Desc>
          <Answer>{teamInfo?.venue.name}</Answer>
        </DescWrapper>
        <DescWrapper>
          <Desc>환경</Desc>
          <Answer>{teamInfo?.venue.surface}</Answer>
        </DescWrapper>
      </HeaderWrapper>
      <Avatar src={teamInfo.team.logo} alt="Team Logo" />
    </TeamBasicInfoWrapper>
  );
};

export default TeamBasicInfo;
