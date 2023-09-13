import styled, { css } from "styled-components";
import { LineUp } from "../../type/fixtures";
import { lighten } from "polished";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import useColor from "../../hooks/useColor";

interface LineUpProps {
  lineUps?: LineUp[];
}

interface HeaderProps {
  $type: "home" | "away";
}

interface ColorProps {
  $color: string;
}

const LineUpWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const LineUpHome = styled.div`
  flex: 1;
`;
const LineUpAway = styled(LineUpHome)``;

const Header = styled.div<HeaderProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.colors.secondBackground};

  ${(props) => {
    const type = props.$type;

    return css`
      border-left: 4px solid ${type === "home" ? "red" : "blue"};
    `;
  }}
  border-bottom: 2px solid
    ${({
    theme: {
      colors: { gray },
    },
  }) => gray};
`;

const TeamNameWrapper = styled.span`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
const TeamName = styled.h3`
  font-size: 1.3rem;
`;
const Formation = styled.h4`
  color: ${(props) => props.theme.colors.gray};
`;
const Logo = styled(LazyLoadImage)`
  max-width: 35px;
`;
const CategoryTitle = styled.h4<ColorProps>`
  padding: 0.8rem 0.8rem;
  font-size: 1.1rem;
  font-weight: bold;
  text-transform: uppercase;
  border-bottom: 2px solid
    ${({
      theme: {
        colors: { gray },
      },
    }) => gray};
  /* background-color: ${(props) =>
    lighten(0.11, props.theme.colors.secondBackground)}; */
`;

const Category = styled.h5<ColorProps>`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  gap: 0.5rem;
  text-transform: capitalize;
  border-bottom: 2px solid
    ${({
      theme: {
        colors: { gray },
      },
    }) => gray};
`;

const PlayerImg = styled(LazyLoadImage)`
  max-width: 25px;
  border-radius: 50%;
`;
const Number = styled.p``;

const LineUpComponents: React.FC<LineUpProps> = ({ lineUps }) => {
  const color = useColor();
  const HomeTeam = lineUps && lineUps[0];
  const AwayTeam = lineUps && lineUps[1];

  return (
    <LineUpWrapper>
      {lineUps && HomeTeam && AwayTeam && (
        <>
          <LineUpHome>
            <Header $type="home">
              <TeamNameWrapper>
                <TeamName>{HomeTeam.team.name}</TeamName>
                <Formation>{HomeTeam.formation}</Formation>
              </TeamNameWrapper>
              <Logo effect="blur" src={HomeTeam.team.logo} alt="HomeTeamLogo" />
            </Header>
            <CategoryTitle $color={color || "#FFF"}>감독</CategoryTitle>
            <Category $color={color || "#FFF"}>
              <PlayerImg effect="blur" src={HomeTeam.coach.photo} />{" "}
              {HomeTeam.coach.name}
            </Category>
            <CategoryTitle $color={color || "#FFF"}>선발 멤버</CategoryTitle>
            {HomeTeam.startXI.map((player) => (
              <Category $color={color || "#FFF"} key={player.player.id}>
                <Number>{player.player.number}</Number>
                <p>{player.player.pos}</p>
                <p>{player.player.name}</p>
              </Category>
            ))}
            <CategoryTitle $color={color || "#FFF"}>교체 멤버</CategoryTitle>
            {HomeTeam.substitutes.map((player) => (
              <Category $color={color || "#FFF"} key={player.player.id}>
                <Number>{player.player.number}</Number>
                <p>{player.player.pos}</p>
                <p>{player.player.name}</p>
              </Category>
            ))}
          </LineUpHome>
          <LineUpAway>
            <Header $type="away">
              <TeamNameWrapper>
                <TeamName>{AwayTeam.team.name}</TeamName>
                <Formation>{AwayTeam.formation}</Formation>
              </TeamNameWrapper>
              <Logo src={AwayTeam.team.logo} alt="AwayTeamLogo" />
            </Header>
            <CategoryTitle $color={color || "#FFF"}>감독</CategoryTitle>
            <Category $color={color || "#FFF"}>
              <PlayerImg src={AwayTeam.coach.photo} /> {AwayTeam.coach.name}
            </Category>
            <CategoryTitle $color={color || "#FFF"}>선발 멤버</CategoryTitle>
            {AwayTeam.startXI.map((player) => (
              <Category $color={color || "#FFF"} key={player.player.id}>
                <Number>{player.player.number}</Number>
                <p>{player.player.pos}</p>
                <p>{player.player.name}</p>
              </Category>
            ))}
            <CategoryTitle $color={color || "#FFF"}>교체 멤버</CategoryTitle>
            {AwayTeam.substitutes.map((player) => (
              <Category $color={color || "#FFF"} key={player.player.id}>
                <Number>{player.player.number}</Number>
                <p>{player.player.pos}</p>
                <p>{player.player.name}</p>
              </Category>
            ))}
          </LineUpAway>
        </>
      )}
    </LineUpWrapper>
  );
};

export default LineUpComponents;
