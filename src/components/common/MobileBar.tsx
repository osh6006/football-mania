import styled, { css } from "styled-components";
import { AllRouteType, SecondSidebarRoutes } from "../../util/routeData";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { lighten } from "polished";

import { CgMenuRight } from "@react-icons/all-files/cg/CgMenuRight";
import { useState } from "react";

import "react-lazy-load-image-component/src/effects/blur.css";
import Profile from "../Overview/Profile";
import { firebaseLogout } from "../../api/firebase";
import { useDispatch } from "react-redux";
import { logout } from "../../features/user/userSlice";

import { BiLogOut } from "@react-icons/all-files/bi/BiLogOut";

interface MobileBarProps {
  menus: AllRouteType[];
}

interface MenuProps {
  $selectColor: string;
}

interface MenuSvgProps {
  $scale?: number;
}

interface TopBarMenuProps {
  $open: boolean;
}

const commonBar = styled.nav`
  display: none;
  position: fixed;
`;

const TopBarWrapper = styled(commonBar)`
  top: 0;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.secondBackground};
  z-index: 100;
  padding: 0 1rem;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    width: 100%;
  }
`;

const TopbarTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`;
const TopbarBtn = styled.button`
  color: white;
  transition: all 0.3s ease;
  padding: 8px;
  border-radius: 100%;
  &:hover {
    background-color: gray;
  }

  &:active {
    background-color: gray;
  }

  &:focus {
    outline: 2px solid white;
  }
`;

const TopbarMenuWrapper = styled.nav<TopBarMenuProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #333;
  color: white;
  width: 60%;
  height: 100vh;
  padding: 20px;
  position: fixed;
  top: 60px;
  right: ${(props) => (props.$open ? "0" : "-1000px")};
  transition: right 0.3s ease-in-out;
  z-index: 1000;

  @media (min-width: 768px) {
    display: none;
  }

  @media (max-width: 500px) {
    width: 80%;
  }
`;

const TopbarMenu = styled(Link)`
  display: flex;
  padding: 1.3rem 1.55rem;
  font-size: 1.5rem;
  align-items: center;
  gap: 1rem;
`;

const BottomBarWrapper = styled(commonBar)`
  bottom: 0;
  color: ${(props) => props.theme.colors.primary};
  z-index: 100;
  background-color: ${(props) => props.theme.colors.secondBackground};

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 80px;
    width: 100%;
  }
`;

const BottomMenu = styled(NavLink)<MenuProps>`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 4px;
  font-size: 1.2rem;
  border: 4px solid transparent;
  border-radius: ${(props) => props.theme.border.radius};
  cursor: pointer;
  transition: border 0.1s ease-out, background 0.5s ease-in;

  &:active {
    opacity: 0.5;
  }

  ${(props) => {
    const selectedColor = props.$selectColor || "#ffffff";

    return css`
      background: ${selectedColor};

      &:hover {
        border: 4px solid ${selectedColor};
        background: ${lighten(0.15, selectedColor)};
      }

      &:active {
        opacity: 0.5;
      }

      &.active {
        font-weight: bold;
        background-color: ${lighten(0.15, selectedColor)};
        border: 4px solid ${selectedColor};
      }
    `;
  }}
`;

const MenuSvg = styled.img<MenuSvgProps>`
  scale: ${(props) => props.$scale};
`;

const LogOutBtn = styled.button`
  display: flex;
  padding: 1.3rem 1.55rem;
  font-size: 1.5rem;
  align-items: center;
  gap: 1rem;
  color: white;
`;

const ProfileWrapper = styled.div`
  position: absolute;
  display: flex;
  bottom: 10%;
`;

const MobileBar: React.FC<MobileBarProps> = ({ menus }) => {
  const dispatch = useDispatch();
  const [navOpen, setNavOpen] = useState(false);

  const handleLogOut = async () => {
    await firebaseLogout();
    dispatch(logout());
  };

  const handleClick = () => {
    setNavOpen(!navOpen);
  };

  const { pathname } = useLocation();
  const param = useParams();
  const title = pathname.split("/")[1];
  const subTitle = pathname.split("/")[3] || "";
  const leagueId = param.leagueId;

  return (
    <>
      <TopBarWrapper>
        <TopbarTitle>Football 5</TopbarTitle>
        <TopbarBtn onClick={handleClick}>
          <CgMenuRight size={25} />
        </TopbarBtn>
      </TopBarWrapper>
      <TopbarMenuWrapper $open={navOpen}>
        {SecondSidebarRoutes?.map((item) => (
          <li key={item.name}>
            <TopbarMenu
              onClick={handleClick}
              to={`/${title}/${leagueId}${item.path}`}
            >
              {subTitle === item.name.toLowerCase() ? (
                <item.activeIcon />
              ) : (
                <item.icon />
              )}
              {item.name}
            </TopbarMenu>
          </li>
        ))}
        <ProfileWrapper>
          <Profile />
          <LogOutBtn onClick={handleLogOut}>
            <BiLogOut size={30} />
          </LogOutBtn>
        </ProfileWrapper>
      </TopbarMenuWrapper>
      <BottomBarWrapper>
        {menus &&
          menus?.map((menu) => (
            <BottomMenu
              key={menu.name}
              to={menu.path}
              $selectColor={menu.color}
            >
              <MenuSvg
                alt="League Logo"
                src={menu.svg}
                $scale={menu.$mobileScale}
              />
            </BottomMenu>
          ))}
      </BottomBarWrapper>
    </>
  );
};

export default MobileBar;
