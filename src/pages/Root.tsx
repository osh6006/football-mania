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
import Loading from "../components/common/Loading";

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

const LoadingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.background};
  color: white;
`;

export default function Root() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useUser("/");

  const selectedLeague = useSelector((state: RootState) => state.league.selectedLeague);
  const selectedLeagueList = useSelector((state: RootState) => state.league.selectLeagueList);
  const colorObj = selectedLeagueList?.find((el) => el.id.toString() === selectedLeague);

  useEffect(() => {
    if (pathname === "/" && selectedLeague) {
      navigate(`/league/${selectedLeague}`);
    }
  }, [navigate, pathname, selectedLeague]);

  if (pathname === "/" || !selectedLeague) {
    return (
      <LoadingWrapper>
        <div>
          <Loading />
          <div>데이터를 불러오는 중...</div>
        </div>
      </LoadingWrapper>
    );
  }

  return (
    <RootWrapper $leagueColor={colorObj?.color}>
      <Sidebar />
      <MobileBar menus={SidebarRoutes} />
      <Outlet />
    </RootWrapper>
  );
}
