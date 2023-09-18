import { NavLink } from "react-router-dom";

import Modal from "react-modal";
import { CustomModalStyles } from "../../styles/modal";
import useModal from "../../hooks/useModal";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user/userSlice";
import { RootState } from "../../store";

import { firebaseLogout } from "../../api/firebase";

import { darken, lighten } from "polished";
import styled, { css } from "styled-components";

import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { BiLogOut } from "@react-icons/all-files/bi/BiLogOut";
import { RiFootballFill } from "@react-icons/all-files/ri/RiFootballFill";

import SecondSidebar from "./SecondSidebar";
import LeagueSelectModal from "../Modal/SelectLeague/LeagueSelectModal";

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
    lighten(0.2, props.theme.colors.secondBackground)};
  cursor: pointer;
  transition: border 0.1s ease-out, background 0.2s linear,
    color 0.3s ease-in-out;

  &:hover {
    background: ${(props) => darken(0.2, props.theme.colors.secondBackground)};
  }
`;

const AddLeagueBtn = styled(LogOutBtn)`
  position: static;
`;

const Sidebar = () => {
  const dispatch = useDispatch();
  const selectLeagueList = useSelector(
    (state: RootState) => state?.league?.selectLeagueList
  );

  const { openModal, closeModal, isOpen } = useModal();

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
            {selectLeagueList &&
              selectLeagueList?.map((menu) => (
                <li key={menu.id}>
                  <Menu to={menu.path} $selectColor={menu.color}>
                    <MenuSvg
                      alt="league Logo"
                      src={`${import.meta.env.VITE_FIREBASE_STORAGE_URL}${
                        import.meta.env.VITE_FIREBASE_SAVE_URL
                      }o/${menu.imageName}?alt=media&token=${menu.imageToken}`}
                      $scale={menu.scale}
                    />
                  </Menu>
                </li>
              ))}
            <AddLeagueBtn onClick={openModal}>
              <AiOutlinePlus size={25} />
            </AddLeagueBtn>
          </MenuWrapper>
          <LogOutBtn onClick={handleLogout}>
            <BiLogOut size={25} />
          </LogOutBtn>
        </Navigation>
      </LeagueSidebarWrapper>
      <SecondSidebar />
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={CustomModalStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
      >
        <LeagueSelectModal closeModal={closeModal} />
      </Modal>
    </SidebarWrapper>
  );
};

export default Sidebar;
