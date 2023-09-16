import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DBLeague } from "../../type/dbleague";

export interface LeagueState {
  selectedLeague: string;
  leagueTypes: DBLeague[] | null;
}

const initialState: LeagueState = {
  selectedLeague: "39",
  leagueTypes: null,
};

export const leagueSlice = createSlice({
  name: "league",
  initialState,
  reducers: {
    changeLeague: (state, action: PayloadAction<string>) => {
      state.selectedLeague = action.payload;
    },
    setLeagueTypes: (state, action: PayloadAction<DBLeague[]>) => {
      state.leagueTypes = action.payload;
    },
  },
});

export const { changeLeague, setLeagueTypes } = leagueSlice.actions;

export const selectLeagueTypes = (state: LeagueState) => {
  if (state.leagueTypes) {
    return state.leagueTypes;
  }

  return null;
};

export default leagueSlice.reducer;
