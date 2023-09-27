import styled, { css } from "styled-components";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { SecondSidebarRoutes, SidebarRoutes } from "../../util/routeData";
import { rgba, lighten } from "polished";
import Title from "./Title";
import SubTitle from "./SubTitle";

interface SecondSidebarProps {}

interface MenuProps {
  $selectColor?: string;
}

const SecondSidebarWrapper = styled.nav`
  width: 250px;
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  padding: 1rem 2rem;
`;

const MenuWrapper = styled.ul`
  margin-top: 0.4rem;
`;
const Menu = styled(NavLink)<MenuProps>`
  display: flex;
  padding: 1.4rem 1.55rem;
  font-size: 1.2rem;
  align-items: center;
  gap: 1rem;
  border-left: 6px solid transparent;
  transition: all ${(props) => props.theme.hover.duration};
  ${(props) => {
    const selectedColor = props.$selectColor || "#ffffff";
    const lightSelected = rgba(lighten(0.55, selectedColor), 0.2);

    return css`
      &:hover {
        background-color: ${lightSelected};
      }

      &.active {
        font-weight: bold;
        background-color: ${lightSelected};
        opacity: 0.9;
        border-left: 6px solid ${lighten(0.2, selectedColor)};
      }
    `;
  }};
`;

const SecondSidebar: React.FC<SecondSidebarProps> = () => {
  const { pathname } = useLocation();
  const param = useParams();

  const title = pathname.split("/")[1];
  const subTitle = pathname.split("/")[3] || "";
  const leagueId = param.leagueId;
  const colorObj = SidebarRoutes.find((el) => el.id.toString() === leagueId);

  return (
    <SecondSidebarWrapper>
      <TitleWrapper>
        <Title medium title={"Football Mania "} />
        <SubTitle subtitle={`축구에 대한 모든 것.`} />
      </TitleWrapper>

      <MenuWrapper>
        {SecondSidebarRoutes?.map((item) => (
          <li key={item.name}>
            <Menu
              to={`/${title}/${leagueId}${item.path}`}
              $selectColor={colorObj?.color}
            >
              {subTitle === item.name.toLowerCase() ? (
                <item.activeIcon size={26} />
              ) : (
                <item.icon size={26} />
              )}
              {item.name}
            </Menu>
          </li>
        ))}
      </MenuWrapper>
    </SecondSidebarWrapper>
  );
};

export default SecondSidebar;
