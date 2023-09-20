import { useNavigate } from "react-router-dom";

import useColor from "../../hooks/useColor";
import useLeagueId from "../../hooks/useLeagueId";

import styled from "styled-components";
import { mix } from "polished";

import Error from "../common/Error";
import Loading from "../common/Loading";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { Standing } from "../../type/standings";
import useFakeStandings from "../../hooks/fake/useFakeStandings";

import { BiLinkExternal } from "@react-icons/all-files/bi/BiLinkExternal";
// import useTeam from "../../hooks/useTeam";

interface TableProps {
  $color: string;
}

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

const DesktopOnlyHeaderCell = styled(TableHeaderCell)`
  @media (max-width: 1080px) {
    display: none;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  vertical-align: middle;
  text-align: center;
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
  width: 25px;
`;

const RankTable = () => {
  const {
    fakeStandingsQuery: { data: teams, isLoading, isError },
  } = useFakeStandings();

  const leagueId = useLeagueId();
  const color = useColor();
  const navigate = useNavigate();

  // const {
  //   teamRankQuery: { data: teams, isLoading, isError },
  // } = useTeam(leagueId, new Date().getFullYear());

  return (
    <RankTableWrapper>
      {isError && <Error message="데이터가 없습니다." />}
      {isLoading && <Loading />}
      {isLoading || (
        <StyledTableContainer>
          <Table>
            <thead>
              <tr>
                <TableHeaderCell>순위</TableHeaderCell>
                <TeamTableHeaderCell>클럽</TeamTableHeaderCell>
                <TabletOnlyHeaderCell>경기 수</TabletOnlyHeaderCell>
                <TabletOnlyHeaderCell>골득실</TabletOnlyHeaderCell>
                <TableHeaderCell>승점</TableHeaderCell>
                <DesktopOnlyHeaderCell>최근 경기</DesktopOnlyHeaderCell>
              </tr>
            </thead>
            <tbody>
              {teams &&
                teams[0]?.league?.standings[0]?.map(
                  (team: Standing, index: number) =>
                    index < 10 && (
                      <TableRow $color={color || "#fff"} key={team.team.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TeamNameTableCell
                          onClick={() => {
                            navigate(
                              `/league/${leagueId}/team/${team.team.id}`
                            );
                          }}
                        >
                          <LogoNameWrapper>
                            <LogoWrapper $color={color || "#fff"}>
                              <Logo
                                effect="blur"
                                src={team.team.logo}
                                alt="TeamLogo"
                              />
                            </LogoWrapper>
                            {team.team.name}
                            <BiLinkExternal />
                          </LogoNameWrapper>
                        </TeamNameTableCell>
                        <TabletOnlyTableCell>
                          {team.all.played}
                        </TabletOnlyTableCell>
                        <TabletOnlyTableCell>
                          {team.goalsDiff}
                        </TabletOnlyTableCell>
                        <TableCell>{team.points}</TableCell>
                        <DesktopOnlyTableCell>{team.form}</DesktopOnlyTableCell>
                      </TableRow>
                    )
                )}
            </tbody>
          </Table>
        </StyledTableContainer>
      )}
    </RankTableWrapper>
  );
};

export default RankTable;
