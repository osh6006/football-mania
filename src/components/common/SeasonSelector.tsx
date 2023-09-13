import { useCallback } from "react";

import { styled } from "styled-components";

import { BsFillCaretLeftFill } from "@react-icons/all-files/bs/BsFillCaretLeftFill";
import { BsFillCaretRightFill } from "@react-icons/all-files/bs/BsFillCaretRightFill";

interface SeasonSelectorProps {
  setSelectSeason: (year: number) => void;
  currentSeason: number;
  seasonRange: number[] | null;
}

const SeasonSelectorWrapper = styled.div`
  width: 100%;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  gap: 1rem;
`;

const BackBtn = styled.button`
  color: white;
`;
const NextBtn = styled(BackBtn)``;

const SeasonSelector: React.FC<SeasonSelectorProps> = ({
  currentSeason,
  setSelectSeason,
  seasonRange,
}) => {
  const increase = useCallback(() => {
    if (seasonRange && seasonRange[seasonRange.length - 1] <= currentSeason)
      return;
    setSelectSeason(currentSeason + 1);
  }, [currentSeason, seasonRange, setSelectSeason]);

  const decrease = useCallback(() => {
    if (seasonRange && seasonRange[0] >= currentSeason) return;
    setSelectSeason(currentSeason - 1);
  }, [currentSeason, seasonRange, setSelectSeason]);

  return (
    <SeasonSelectorWrapper>
      <BackBtn onClick={() => decrease()}>
        <BsFillCaretLeftFill size={20} />
      </BackBtn>
      {currentSeason}
      <NextBtn onClick={() => increase()}>
        <BsFillCaretRightFill size={20} />
      </NextBtn>
    </SeasonSelectorWrapper>
  );
};

export default SeasonSelector;
