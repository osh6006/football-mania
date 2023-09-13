import { useState } from "react";

export default function useSeason() {
  const [seasonRange, setSeasonRange] = useState<number[] | null>(null);
  const [selectSeason, setSelectSeason] = useState<number>(
    new Date().getFullYear()
  );

  return {
    seasonRange,
    setSeasonRange,
    selectSeason,
    setSelectSeason,
  };
}
