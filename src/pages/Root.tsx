import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import styled, { css } from "styled-components";

import { SidebarRoutes } from "../util/routeData";
import Sidebar from "../components/common/Sidebar";
import MobileBar from "../components/common/MobileBar";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { darken, rgba } from "polished";
import useUser from "../hooks/useUser";

interface RootWrapperProps {
  $leagueColor?: string;
}

const RootWrapper = styled.main<RootWrapperProps>`
  position: relative;
  display: flex;
  width: 100vw;
  color: ${(props) => props.theme.colors.white};
  overflow: hidden;
  transition: background 0.5s ease;

  ${(props) => {
    const selectedColor = props.$leagueColor || "#ffffff";
    const background = rgba(selectedColor, 0.9);

    return css`
      background-color: ${darken(0.18, background)};
    `;
  }}
`;

export default function Root() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useUser("/");
  const selectedLeague = useSelector(
    (state: RootState) => state.league.selectedLeague
  );
  const colorObj = SidebarRoutes.find(
    (el) => el.id.toString() === selectedLeague
  );

  useEffect(() => {
    if (pathname === "/") {
      navigate("/league/39");
    }
  }, [navigate, pathname]);

  return (
    <RootWrapper $leagueColor={colorObj?.color}>
      <Sidebar menus={SidebarRoutes} />
      <MobileBar menus={SidebarRoutes} />
      <Outlet />
    </RootWrapper>
  );
}
