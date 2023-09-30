import { useState } from "react";
import styled, { css } from "styled-components";
import { BsChevronDown } from "@react-icons/all-files/bs/BsChevronDown";

import useLive from "../../hooks/useLive";
// import useFakeLive from "../../hooks/fake/useFakeLive";

import LineUp from "./LineUp";
import HeadToHead from "./HeadToHead";
import Error from "../common/Error";
import Loading from "../common/Loading";
import Event from "./Event";

interface MatchAccordionProps {
  title: string;
  fixturesId: string;
}

interface AccordionProps {
  $isOpen: boolean;
}

const AccordionContainer = styled.div``;

const AccordionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.secondBackground};
  flex: 1;
  padding: 10px 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  border-top-right-radius: ${(props) => props.theme.border.radius};
  border-top-left-radius: ${(props) => props.theme.border.radius};
`;

const HeaderTitle = styled.h4`
  width: 100%;
  text-align: center;
`;

const AccordionIcon = styled.div<AccordionProps>`
  transition: all 0.3s ease;
  ${(props) =>
    props.$isOpen
      ? css`
          transform: rotate(180deg);
        `
      : css``}
`;

const AccordionContent = styled.div<AccordionProps>`
  padding: 1.5rem 0.5rem;
  overflow-y: scroll;
  transition: max-height 0.3s ease-in-out;
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
  ${(props) =>
    props.$isOpen
      ? css`
          max-height: 500px; /* 원하는 최대 높이 */
          opacity: 1;
        `
      : css`
          max-height: 0;
          opacity: 0;
        `}
`;

const LiveWrapper = styled.div`
  padding: 0.5rem;
  background-color: yellowgreen;
  border-radius: ${(props) => props.theme.border.radius};
`;

const MatchAccordion: React.FC<MatchAccordionProps> = ({ title, fixturesId }) => {
  const {
    liveScoreQuery: { data: liveData, isError, isLoading },
  } = useLive(fixturesId);

  // const {
  //   liveScoreQuery: { data: liveData, isError, isLoading },
  // } = useFakeLive();

  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AccordionContainer>
      {isError && <Error message="데이터에 오류가 발생하였습니다." />}
      {isLoading && <Loading />}
      {isLoading || (
        <>
          <AccordionHeader onClick={toggleAccordion}>
            <LiveWrapper>LIVE</LiveWrapper>
            <HeaderTitle>{title}</HeaderTitle>
            <AccordionIcon $isOpen={isOpen}>
              <BsChevronDown />
            </AccordionIcon>
          </AccordionHeader>
          <AccordionContent $isOpen={isOpen}>
            <HeadToHead team={liveData && liveData[0].teams} score={liveData && liveData[0].goals} />
            <Event events={liveData && liveData[0].events} />
            <LineUp lineUps={liveData && liveData[0]?.lineups} />
          </AccordionContent>
        </>
      )}
    </AccordionContainer>
  );
};

export default MatchAccordion;
