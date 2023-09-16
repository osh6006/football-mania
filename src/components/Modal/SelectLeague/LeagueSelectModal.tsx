import { darken, lighten } from "polished";
import styled from "styled-components";

interface LeagueSelectModalProps {
  closeModal: () => void;
}

const ModalWraper = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.secondBackground};
  color: white;
`;

const Title = styled.h1`
  font-size: 1.15rem;
`;

const SubTitle = styled.h3`
  color: ${(props) => props.theme.colors.gray};
  margin-top: 4px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  display: flex;
  gap: 0.5rem;
  right: 1rem;
  bottom: 1rem;
`;

const ConfirmBtn = styled.button`
  color: white;
  padding: 10px 12px;
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) =>
    darken(0.15, props.theme.colors.secondBackground)};
  transition: background 0.3s linear;

  &:hover {
    background-color: ${(props) =>
      lighten(0.1, props.theme.colors.secondBackground)};
  }
`;

const CancelBtn = styled(ConfirmBtn)`
  background-color: ${(props) => props.theme.colors.danger};

  &:hover {
    background-color: ${(props) => lighten(0.15, props.theme.colors.danger)};
  }
`;

const LeagueSelectModal: React.FC<LeagueSelectModalProps> = ({
  closeModal,
}) => {
  return (
    <ModalWraper>
      <Title>리그 추가하기</Title>
      <SubTitle>좋아하는 리그를 골라보세요.</SubTitle>
      <br />
      <Title>내가 추가한 리그</Title>

      <ButtonWrapper>
        <ConfirmBtn>확인</ConfirmBtn>
        <CancelBtn onClick={closeModal}>취소</CancelBtn>
      </ButtonWrapper>
    </ModalWraper>
  );
};

export default LeagueSelectModal;
