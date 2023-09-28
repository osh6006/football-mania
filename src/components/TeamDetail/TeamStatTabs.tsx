import { useState } from "react";
import { css, styled } from "styled-components";
import { TeamStat } from "../../type/team";
import TeamLineUp from "./TeamLineUp";
import TeamInjured from "./TeamInjured";

type TabState =
  | "basic"
  | "substitutes"
  | "goals"
  | "passes"
  | "tackles"
  | "penalty";

interface StatTabsProps {
  stat?: TeamStat;
  lineUpId?: number | string;
  teamId?: number;
  season: number;
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

const TeamStatTabs: React.FC<StatTabsProps> = ({
  stat,
  lineUpId,
  teamId,
  season,
}) => {
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
          골 득실
        </Tab>
        <Tab
          $active={tabState === "passes"}
          onClick={() => handleTabs("passes")}
        >
          수비 & Etc
        </Tab>
        <Tab
          $active={tabState === "tackles"}
          onClick={() => handleTabs("tackles")}
        >
          선수단
        </Tab>
        <Tab
          $active={tabState === "penalty"}
          onClick={() => handleTabs("penalty")}
        >
          부상자 명단
        </Tab>
      </Tabs>
      <Table>
        {tabState === "basic" && (
          <>
            <Row>
              <Cell>
                <Superscript>승리</Superscript>
                {stat?.fixtures.wins.total || 0}
              </Cell>
              <Cell>
                <Superscript>무승부</Superscript>
                {stat?.fixtures.draws.total || 0}
              </Cell>
              <Cell>
                <Superscript>패배</Superscript>
                {stat?.fixtures.loses.total || 0}
              </Cell>
            </Row>
            <br />
            <Row>
              <Cell>
                <Superscript>경기 수</Superscript>
                {stat?.fixtures.played.total}
              </Cell>
              <Cell>
                <Superscript>승률</Superscript>
                {`${calWinRate(
                  stat?.fixtures.wins.total,
                  stat?.fixtures.draws.total,
                  stat?.fixtures.played.total
                )}%`}
              </Cell>
              <Cell>
                <Superscript>최근 경기</Superscript>
                {stat?.form.slice(0, 5)}
              </Cell>
            </Row>
          </>
        )}
        {tabState === "goals" && (
          <>
            <Row>
              <Cell>
                <Superscript>홈 득점</Superscript>
                {stat?.goals.for.total.home || 0}
              </Cell>
              <Cell>
                <Superscript>어웨이 득점</Superscript>
                {stat?.goals.for.total.away || 0}
              </Cell>
              <Cell>
                <Superscript>평균 득점(90분당)</Superscript>
                {stat?.goals.for.average.total || 0}
              </Cell>
            </Row>
            <br />
            <Row>
              <Cell>
                <Superscript>홈 실점</Superscript>
                {stat?.goals.against.total.home || 0}
              </Cell>
              <Cell>
                <Superscript>어웨이 실점</Superscript>
                {stat?.goals.against.total.away || 0}
              </Cell>
              <Cell>
                <Superscript>평균 실점(90분당)</Superscript>
                {stat?.goals.against.average.total || 0}
              </Cell>
            </Row>
          </>
        )}
        {tabState === "passes" && (
          <>
            <Row>
              <Cell>
                <Superscript>패널티 횟수</Superscript>
                {stat?.penalty.total}
              </Cell>
              <Cell>
                <Superscript>패널티 성공률</Superscript>
                {stat?.penalty.scored.percentage}
              </Cell>
              <Cell>
                <Superscript>주 포메이션</Superscript>
                {stat?.lineups.sort((a, b) => a.played - b.played)[0].formation}
              </Cell>
            </Row>
            <br />
            <Row>
              <Cell>
                <Superscript>경고</Superscript>
                {stat &&
                  Object.values(stat?.cards.yellow).reduce((prev, curr) => {
                    return (prev = prev + curr.total || 0);
                  }, 0)}
              </Cell>
              <Cell>
                <Superscript>퇴장</Superscript>
                {stat &&
                  Object.values(stat?.cards.red).reduce((prev, curr) => {
                    return (prev = prev + curr.total || 0);
                  }, 0)}
              </Cell>
              <Cell>
                <Superscript>클린 시트</Superscript>
                {stat?.clean_sheet.total}
              </Cell>
            </Row>
          </>
        )}
        {tabState === "tackles" && (
          <>
            <Row>
              <TeamLineUp lineUpId={String(lineUpId)} teamId={teamId} />
            </Row>
          </>
        )}
        {tabState === "penalty" && (
          <>
            <Row>
              <TeamInjured teamId={teamId} season={season} />
            </Row>
          </>
        )}
      </Table>
    </StatTabsWrapper>
  );
};

export default TeamStatTabs;

function calWinRate(win?: number, draw?: number, play?: number): string {
  if (
    win !== undefined &&
    win !== null &&
    draw !== undefined &&
    draw !== null &&
    play !== undefined &&
    play !== null
  ) {
    return (((win + draw * 0.5) / play) * 100).toFixed(2);
  }

  return "0";
}
