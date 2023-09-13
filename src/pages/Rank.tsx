import { useState, useEffect } from "react";
import { styled } from "styled-components";
import useColor from "../hooks/useColor";
import { lighten } from "polished";
import Title from "../components/common/Title";
import SubTitle from "../components/common/SubTitle";
import useLeagueId from "../hooks/useLeagueId";
import SeasonSelector from "../components/common/SeasonSelector";
import { getAllSeason } from "../api/footballApi";
import TeamRankTable from "../components/Rank/TeamRankTable";
import PlayerRankTable from "../components/Rank/PlayerRankTable";
import useSeason from "../hooks/useSeason";

type currentRank = "player" | "team";

interface TabBtnProps {
  $color: string;
  $active: boolean;
}

const RankWrapper = styled.section`
  padding: 1rem 1rem;
`;

const RankTab = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
  gap: 1rem;
`;

const TabBtn = styled.button<TabBtnProps>`
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
  font-size: 1.25rem;
  color: white;
  transition: all 0.3s ease;

  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
  color: ${(props) => (props.$active ? lighten(0.4, props.$color) : "")};

  &:hover {
    font-weight: bold;
    color: ${(props) => lighten(0.4, props.$color)};
  }
`;

export default function Rank() {
  const color = useColor();
  const leagueId = useLeagueId();

  const [currentRank, setCurrentRank] = useState<currentRank>("team");
  const { seasonRange, selectSeason, setSeasonRange, setSelectSeason } =
    useSeason();

  const handleTab = (currRank: currentRank) => {
    setCurrentRank(currRank);
  };

  // useEffect(() => {
  //   getAllSeason()
  //     .then((result: number[]) => setSeasonRange(result))
  //     .catch((error) => console.log(error));
  // }, []);

  return (
    <RankWrapper>
      <Title title="순위" />
      <SubTitle subtitle="리그 팀과 선수들의 순위를 확인해 보세요. " />
      <RankTab>
        <TabBtn
          $color={color || "#888"}
          $active={currentRank === "team"}
          onClick={() => handleTab("team")}
        >
          팀 순위
        </TabBtn>
        <TabBtn
          $color={color || "#888"}
          $active={currentRank === "player"}
          onClick={() => handleTab("player")}
        >
          개인 순위
        </TabBtn>
      </RankTab>
      <SeasonSelector
        setSelectSeason={setSelectSeason}
        currentSeason={selectSeason}
        seasonRange={seasonRange}
      />
      {currentRank === "team" && <TeamRankTable selectSeason={selectSeason} />}
      {currentRank === "player" && (
        <PlayerRankTable selectSeason={selectSeason} />
      )}
    </RankWrapper>
  );
}
