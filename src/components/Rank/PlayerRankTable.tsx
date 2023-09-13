import { useState } from "react";
import styled from "styled-components";
import Loading from "../common/Loading";
import useColor from "../../hooks/useColor";
import { lighten, mix } from "polished";
import Error from "../common/Error";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import useFakePlayer from "../../hooks/fake/useFakePlayer";
import useLeagueId from "../../hooks/useLeagueId";
import usePlayer from "../../hooks/usePlayer";

import { BiLinkExternal } from "@react-icons/all-files/bi/BiLinkExternal";
import { useNavigate } from "react-router-dom";

interface PlayerRankTableProps {
  selectSeason: number;
}

type TopPlayer = "topscorers" | "topassists" | "topredcards" | "topyellowcards";

interface PlayerRankTabProps {
  $color: string;
  $active: boolean;
}

interface TableProps {
  $color: string;
}

const PlayerRankTabWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PlayerRankTab = styled.button<PlayerRankTabProps>`
  color: white;
  padding: 10px, 20px;

  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
  color: ${(props) => (props.$active ? lighten(0.4, props.$color) : "")};
`;

const RankTableWrapper = styled.div`
  font-family: sans-serif;
  font-weight: bold;
  border-radius: 10px;
  overflow: hidden;
`;

const StyledTableContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
  margin-bottom: 20px;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.colors.secondBackground};
`;

const TableRow = styled.tr<TableProps>`
  &:nth-child(even) {
    background-color: ${(props) => mix(0.8, "#808080", props.$color)};
  }
`;

const TableHeaderCell = styled.th`
  white-space: nowrap;
  padding: 1rem;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.secondBackground};
  border-bottom: 2px solid ${(props) => props.theme.colors.gray};
`;

const TabletOnlyHeaderCell = styled(TableHeaderCell)`
  @media (max-width: 970px) {
    display: none;
  }
`;

const TeamTableHeaderCell = styled(TableHeaderCell)`
  text-align: left;
`;

const DesktopOnlyTableHeaderCell = styled(TeamTableHeaderCell)`
  @media (max-width: 1080px) {
    display: none;
  }
`;

const DesktopOnlyHeaderCell = styled(TableHeaderCell)`
  @media (max-width: 1080px) {
    display: none;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  vertical-align: middle;
  text-align: center;
  white-space: nowrap;
`;

const TeamNameTableCell = styled(TableCell)`
  &:hover {
    text-decoration: underline;
  }
  cursor: pointer;
`;

const TabletOnlyTableCell = styled(TableCell)`
  @media (max-width: 970px) {
    display: none;
  }
`;

const DesktopOnlyTableCell = styled(TableCell)`
  @media (max-width: 1080px) {
    display: none;
  }
`;

const DesktopOnlyTeamNameCell = styled(DesktopOnlyTableCell)`
  &:hover {
    text-decoration: underline;
  }
  cursor: pointer;
`;

const LogoNameWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoWrapper = styled.span<TableProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border-radius: 100%;
  background-color: ${(props) => props.$color};
`;

const Logo = styled(LazyLoadImage)`
  border-radius: 50%;
  width: 30px;
`;

const PlayerRankTable: React.FC<PlayerRankTableProps> = ({ selectSeason }) => {
  const color = useColor();
  const leagueId = useLeagueId();
  const navigate = useNavigate();

  const [playerType, setPlayerType] = useState<TopPlayer>("topscorers");
  const handlePlayerTab = (type: TopPlayer) => {
    setPlayerType(type);
  };

  const {
    topScorerQuery: { data: players, isLoading, isError },
  } = useFakePlayer();

  //   const {
  //     topPlayerQuery: { data: players, isLoading, isError },
  //   } = usePlayer(leagueId, selectSeason, playerType);

  return (
    <>
      <PlayerRankTabWrapper>
        <PlayerRankTab
          onClick={() => handlePlayerTab("topscorers")}
          $color={color || "#888"}
          $active={playerType === "topscorers"}
        >
          최다 골
        </PlayerRankTab>
        <PlayerRankTab
          onClick={() => handlePlayerTab("topassists")}
          $color={color || "#888"}
          $active={playerType === "topassists"}
        >
          최다 도움
        </PlayerRankTab>
        <PlayerRankTab
          onClick={() => handlePlayerTab("topyellowcards")}
          $color={color || "#888"}
          $active={playerType === "topyellowcards"}
        >
          최다 경고
        </PlayerRankTab>
        <PlayerRankTab
          onClick={() => handlePlayerTab("topredcards")}
          $color={color || "#888"}
          $active={playerType === "topredcards"}
        >
          최다 퇴장
        </PlayerRankTab>
      </PlayerRankTabWrapper>
      <RankTableWrapper>
        {isError && <Error message="데이터가 없습니다." />}
        {isLoading && <Loading />}
        {isLoading || (
          <StyledTableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeaderCell>순위</TableHeaderCell>
                  <TeamTableHeaderCell>이름</TeamTableHeaderCell>
                  <DesktopOnlyTableHeaderCell>팀</DesktopOnlyTableHeaderCell>
                  <TabletOnlyHeaderCell>경기 시간</TabletOnlyHeaderCell>
                  <TableHeaderCell>골</TableHeaderCell>
                  <TableHeaderCell>도움</TableHeaderCell>
                  <DesktopOnlyHeaderCell>슈팅</DesktopOnlyHeaderCell>
                  <TableHeaderCell>경고</TableHeaderCell>
                  <TableHeaderCell>퇴장</TableHeaderCell>
                  <DesktopOnlyHeaderCell>드리블 성공률</DesktopOnlyHeaderCell>
                  <DesktopOnlyHeaderCell>패스 정확도</DesktopOnlyHeaderCell>
                </tr>
              </thead>
              <tbody>
                {players &&
                  players?.map(
                    (player, index: number) =>
                      index >= 0 && (
                        <TableRow
                          $color={color || "#fff"}
                          key={player.player.id}
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TeamNameTableCell
                            onClick={() => {
                              navigate(
                                `/league/${leagueId}/player/${player.player.id}`
                              );
                            }}
                          >
                            <LogoNameWrapper>
                              <LogoWrapper $color={color || "#fff"}>
                                <Logo
                                  effect="blur"
                                  src={player.player.photo}
                                  alt="TeamLogo"
                                />
                              </LogoWrapper>
                              {player.player.name}
                              <BiLinkExternal />
                            </LogoNameWrapper>
                          </TeamNameTableCell>
                          <DesktopOnlyTeamNameCell
                            onClick={() => {
                              navigate(
                                `/league/${leagueId}/team/${player.statistics[0].team.id}`
                              );
                            }}
                          >
                            <LogoNameWrapper>
                              <LogoWrapper $color={color || "#fff"}>
                                <Logo
                                  effect="blur"
                                  src={player.statistics[0].team.logo}
                                  alt="TeamLogo"
                                />
                              </LogoWrapper>
                              {player.statistics[0].team.name}
                              <BiLinkExternal />
                            </LogoNameWrapper>
                          </DesktopOnlyTeamNameCell>
                          <TabletOnlyTableCell>
                            {player.statistics[0].games.minutes}
                          </TabletOnlyTableCell>
                          <TableCell>
                            {player.statistics[0].goals.total || "0"}
                          </TableCell>
                          <TableCell>
                            {player.statistics[0].goals.assists || "0"}
                          </TableCell>
                          <DesktopOnlyTableCell>
                            {player.statistics[0].shots.total || "0"}
                          </DesktopOnlyTableCell>
                          <TableCell>
                            {player.statistics[0].cards.yellow || "0"}
                          </TableCell>
                          <TableCell>
                            {player.statistics[0].cards.red || "0"}
                          </TableCell>{" "}
                          <DesktopOnlyTableCell>
                            {(player.statistics[0].dribbles.success &&
                              player.statistics[0].dribbles.attempts &&
                              (
                                player.statistics[0].dribbles.success /
                                player.statistics[0].dribbles.attempts
                              ).toFixed(2)) ||
                              "0"}
                          </DesktopOnlyTableCell>{" "}
                          <DesktopOnlyTableCell>
                            {player.statistics[0].passes.accuracy || "0"}
                          </DesktopOnlyTableCell>
                        </TableRow>
                      )
                  )}
              </tbody>
            </Table>
          </StyledTableContainer>
        )}
      </RankTableWrapper>
    </>
  );
};

export default PlayerRankTable;
