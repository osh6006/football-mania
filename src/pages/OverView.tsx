import styled from "styled-components";
import Title from "../components/common/Title";
import SubTitle from "../components/common/SubTitle";
import Banner from "../components/Overview/Banner";
import LatestMatches from "../components/Overview/LatestMatches";
import RankTable from "../components/Overview/RankTable";
import Profile from "../components/Overview/Profile";
import Live from "../components/Overview/Live";
import PlayerList from "../components/Overview/PlayerList";
import SectionHeader from "../components/Overview/SectionHeader";

const OverViewWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 1rem;
  padding: 1rem;

  @media (max-width: 1280px) {
    flex-direction: column;
  }
`;

const LeftSideWrapper = styled.section`
  flex: 1;
`;

const LeftSideTempWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 1280px) {
    flex-direction: column;
  }
`;

const RightSideWrapper = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 35%;
  margin-top: 59px;
  gap: 1rem;

  @media (max-width: 1280px) {
    width: 100%;
    margin-top: 0;
  }
`;

const ProfileWrapper = styled.div`
  display: block;
  width: 300px;
  right: 0;
  position: absolute;

  @media (max-width: 768px) {
    display: none;
  }
`;

export default function OverView() {
  return (
    <OverViewWrapper>
      <ProfileWrapper>
        <Profile email="test@test.com" name="테스트" />
      </ProfileWrapper>
      <LeftSideWrapper>
        <Title title="어서오세요 Test 님 !" />
        <SubTitle subtitle="다시 오신 것을 환영합니다." />
        <Banner />
        <LeftSideTempWrapper>
          <LatestMatches />
          <Live />
        </LeftSideTempWrapper>
        <SectionHeader title="리그 순위" src="123" />
        <RankTable />
      </LeftSideWrapper>
      <RightSideWrapper>
        <PlayerList title="최다 득점 선수" type="topscorers" />
        <PlayerList title="최다 도움 선수" type="topassists" />
      </RightSideWrapper>
    </OverViewWrapper>
  );
}
