import { NavLink } from "react-router-dom";
import { AllRouteType } from "../../util/routeData";

import { lighten } from "polished";

import styled, { css } from "styled-components";

import { RiFootballFill } from "@react-icons/all-files/ri/RiFootballFill";
import { BiLogOut } from "@react-icons/all-files/bi/BiLogOut";

import SecondSidebar from "./SecondSidebar";
import { useDispatch } from "react-redux";
import { logout } from "../../features/user/userSlice";
import { firebaseLogout } from "../../api/firebase";

interface SidebarProps {
  menus: AllRouteType[];
}

interface MenuProps {
  $selectColor: string;
}

interface MenuSvgProps {
  $scale?: number;
}

const SidebarWrapper = styled.nav`
  display: flex;
  background-color: ${(props) => props.theme.colors.background};

  @media (max-width: 768px) {
    display: none;
  }
`;

const LeagueSidebarWrapper = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 80px;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.secondBackground};
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  margin-bottom: 3rem;
  border: 4px solid transparent;
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.colors.background};
`;

const Navigation = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
`;

const MenuWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
`;

const Menu = styled(NavLink)<MenuProps>`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  font-size: 1.2rem;
  border: 4px solid transparent;
  border-radius: ${(props) => props.theme.border.radius};
  cursor: pointer;
  transition: border 0.1s ease-out, background 0.5s ease-in;

  &:active {
    opacity: 0.5;
  }

  ${(props) => {
    const selected = props.$selectColor || "#ffffff";

    return css`
      background: ${selected};

      &:hover {
        border: 4px solid ${selected};
        background: ${lighten(0.15, selected)};
      }

      &:active {
        opacity: 0.5;
      }

      &.active {
        font-weight: bold;
        background-color: ${lighten(0.15, selected)};
        border: 4px solid ${selected};
      }
    `;
  }}
`;

const MenuSvg = styled.img<MenuSvgProps>`
  scale: ${(props) => props.$scale};
`;

const LogOutBtn = styled.button`
  position: absolute;
  width: 48px;
  height: 48px;
  padding: 8px;
  bottom: 2rem;
  color: white;
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) =>
    lighten(0.15, props.theme.colors.secondBackground)};
  cursor: pointer;
  transition: border 0.1s ease-out, background 0.2s ease-in,
    color 0.3s ease-in-out;

  &:hover {
    background: ${(props) => props.theme.colors.background};
  }
`;

const Sidebar: React.FC<SidebarProps> = ({ menus }) => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await firebaseLogout();
    dispatch(logout());
  };
  return (
    <SidebarWrapper>
      <LeagueSidebarWrapper>
        <Logo>
          <RiFootballFill size="24" />
        </Logo>
        <Navigation>
          <MenuWrapper>
            {menus &&
              menus?.map((menu) => (
                <li key={menu.name}>
                  <Menu to={menu.path} $selectColor={menu.color}>
                    {menu.svg && (
                      <MenuSvg
                        alt="league Logo"
                        src={menu.svg}
                        $scale={menu.$scale}
                      />
                    )}
                  </Menu>
                </li>
              ))}
          </MenuWrapper>
        </Navigation>
        <LogOutBtn onClick={handleLogout}>
          <BiLogOut size={25} />
        </LogOutBtn>
      </LeagueSidebarWrapper>
      <SecondSidebar />
    </SidebarWrapper>
  );
};

export default Sidebar;
