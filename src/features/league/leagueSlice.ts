import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DBLeague } from "../../type/dbleague";

export interface LeagueState {
  selectedLeague: string;
  leagueTypes: DBLeague[] | null;
  selectLeagueList: DBLeague[] | null;
}

const initialState: LeagueState = {
  selectedLeague: "39",
  leagueTypes: null,
  selectLeagueList: null,
};

export const leagueSlice = createSlice({
  name: "league",
  initialState,
  reducers: {
    changeLeague: (state, action: PayloadAction<string>) => {
      state.selectedLeague = action.payload;
    },
    setLeagueTypes: (state, action: PayloadAction<DBLeague[]>) => {
      state.selectLeagueList = action.payload;
    },
    addLeagueTypes: (state, action: PayloadAction<DBLeague>) => {
      state.selectLeagueList?.push(action.payload);
    },
    deleteLeagueTypes: (state, action: PayloadAction<number>) => {
      if (state.selectLeagueList) {
        state.selectLeagueList = state.selectLeagueList?.filter(
          (el) => el.id !== action.payload
        );
      }
    },
  },
});

export const {
  changeLeague,
  setLeagueTypes,
  addLeagueTypes,
  deleteLeagueTypes,
} = leagueSlice.actions;
export default leagueSlice.reducer;
