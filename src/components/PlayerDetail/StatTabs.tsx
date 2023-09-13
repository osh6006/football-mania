import { useState } from "react";
import { Statistics } from "../../type/player";
import { css, styled } from "styled-components";

type TabState =
  | "basic"
  | "substitutes"
  | "goals"
  | "passes"
  | "tackles"
  | "penalty";

interface StatTabsProps {
  stat: Statistics;
}

interface TabsProps {
  $active: boolean;
}

const StatTabsWrapper = styled.div``;
const Tabs = styled.div`
  display: flex;
`;
const Tab = styled.button<TabsProps>`
  color: white;
  padding: 10px 20px;

  transition: all 0.3s ease-in-out;

  ${(props) => {
    const isActive = props.$active;
    return css`
      color: ${isActive ? "#000" : "#fff"};
      background-color: ${isActive ? "#fff" : ""};

      &:hover {
        color: ${isActive ? "" : "#000"};
        background-color: ${isActive ? "" : "#fff"};
      }
    `;
  }}
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Cell = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 10px;
  font-size: 1.2rem;
`;

const Superscript = styled.sup`
  color: ${(props) => props.theme.colors.gray};
  font-size: 0.9rem;
`;

const StatTabs: React.FC<StatTabsProps> = ({ stat }) => {
  const [tabState, setTabState] = useState<TabState>("basic");
  const handleTabs = (type: TabState) => {
    setTabState(type);
  };
  return (
    <StatTabsWrapper>
      <Tabs>
        <Tab $active={tabState === "basic"} onClick={() => handleTabs("basic")}>
          기본 정보
        </Tab>
        <Tab $active={tabState === "goals"} onClick={() => handleTabs("goals")}>
          골 & 슈팅
        </Tab>
        <Tab
          $active={tabState === "passes"}
          onClick={() => handleTabs("passes")}
        >
          드리블 & 패스
        </Tab>
        <Tab
          $active={tabState === "tackles"}
          onClick={() => handleTabs("tackles")}
        >
          수비 & 파울
        </Tab>
        <Tab
          $active={tabState === "penalty"}
          onClick={() => handleTabs("penalty")}
        >
          패널티
        </Tab>
      </Tabs>
      <Table>
        {tabState === "basic" && (
          <>
            <Row>
              <Cell>
                <Superscript>소속 팀</Superscript>
                {`${stat.team.name || "이름 없음"}`}
              </Cell>
              <Cell>
                <Superscript>포지션</Superscript>
                {`${stat.games.position || "포지션 없음"}`}
              </Cell>
              <Cell>
                <Superscript>출전 시간</Superscript>
                {`${stat.games.minutes || 0}분`}
              </Cell>
            </Row>
            <br />
            <Row>
              <Cell>
                <Superscript>교체 IN</Superscript>
                {`${stat.substitutes.in || 0}`}
              </Cell>
              <Cell>
                <Superscript>교체 OUT</Superscript>
                {`${stat.substitutes.out || 0}`}
              </Cell>
              <Cell>
                <Superscript>벤치</Superscript>
                {`${stat.substitutes.bench || 0}`}
              </Cell>
            </Row>
          </>
        )}
        {tabState === "goals" && (
          <>
            <Row>
              <Cell>
                <Superscript>골</Superscript>
                {`${stat.goals.total || 0}`}
              </Cell>
              <Cell>
                <Superscript>슈팅</Superscript>
                {`${stat.shots.total || 0}`}
              </Cell>
              <Cell>
                <Superscript>유효슈팅</Superscript>
                {`${stat.shots.on || 0}`}
              </Cell>
            </Row>
            <br />
            <Row>
              <Cell>
                <Superscript>도움</Superscript>
                {`${stat.goals.assists || 0}`}
              </Cell>
              <Cell>
                <Superscript>세이브</Superscript>
                {`${stat.goals.save || 0}`}
              </Cell>
              <Cell>
                <Superscript>실점</Superscript>
                {`${stat.goals.conceded || 0}`}
              </Cell>
            </Row>
          </>
        )}
        {tabState === "passes" && (
          <>
            <Row>
              <Cell>
                <Superscript>모든 패스</Superscript>
                {`${stat.passes.total || 0}`}
              </Cell>
              <Cell>
                <Superscript>키 패스</Superscript>
                {`${stat.passes.key || 0}`}
              </Cell>
              <Cell>
                <Superscript>정확도</Superscript>
                {`${stat.passes.accuracy || 0}`}
              </Cell>
            </Row>
            <br />
            <Row>
              <Cell>
                <Superscript>드리블 시도</Superscript>
                {`${stat.dribbles.attempts || 0}`}
              </Cell>
              <Cell>
                <Superscript>드리블 성공</Superscript>
                {`${stat.dribbles.success || 0}`}
              </Cell>
              <Cell>
                <Superscript>드리블 돌파</Superscript>
                {`${stat.dribbles.past || 0}`}
              </Cell>
            </Row>
          </>
        )}
        {tabState === "tackles" && (
          <>
            <Row>
              <Cell>
                <Superscript>태클 시도</Superscript>
                {`${stat.tackles.total || 0}`}
              </Cell>
              <Cell>
                <Superscript>차단</Superscript>
                {`${stat.tackles.blocks || 0}`}
              </Cell>
              <Cell>
                <Superscript>인터셉트</Superscript>
                {`${stat.tackles.interceptions || 0}`}
              </Cell>
            </Row>
            <br />
            <Row>
              <Cell>
                <Superscript>파울 유도</Superscript>
                {`${stat.fouls.drawn || 0}`}
              </Cell>
              <Cell>
                <Superscript>파울</Superscript>
                {`${stat.fouls.committed || 0}`}
              </Cell>
              <Cell>
                <Superscript>Yellow / Red</Superscript>
                {`${stat.cards.yellow || 0} / ${stat.cards.red || 0}`}
              </Cell>
            </Row>
          </>
        )}
        {tabState === "penalty" && (
          <>
            <Row>
              <Cell>
                <Superscript>횟수</Superscript>
                {`${stat.penalty.commited || 0}`}
              </Cell>
              <Cell>
                <Superscript>승리</Superscript>
                {`${stat.penalty.won || 0}`}
              </Cell>
              <Cell>
                <Superscript>득점</Superscript>
                {`${stat.penalty.scored || 0}`}
              </Cell>
            </Row>
            <br />
            <Row>
              <Cell>
                <Superscript>세이브</Superscript>
                {`${stat.penalty.saved || 0}`}
              </Cell>
              <Cell>
                <Superscript>실축</Superscript>
                {`${stat.penalty.missed || 0}`}
              </Cell>
            </Row>
          </>
        )}
      </Table>
    </StatTabsWrapper>
  );
};

export default StatTabs;
