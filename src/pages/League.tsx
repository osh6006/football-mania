import styled from "styled-components";
import useChange from "../hooks/useChange";
import { Outlet } from "react-router-dom";

const LeagueWrapper = styled.section`
  flex: 1;
  height: 100vh;
  overflow-y: scroll;

  @media (max-width: 768px) {
    padding-top: 60px;
    padding-bottom: 80px;
  }
`;

const League = () => {
  useChange();
  return (
    <LeagueWrapper>
      <Outlet />
    </LeagueWrapper>
  );
};

export default League;
