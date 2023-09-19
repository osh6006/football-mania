import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DBLeague } from "../../type/dbleague";

export interface LeagueState {
  selectedLeague: string;
  leagueList: DBLeague[] | null;
  selectLeagueList: DBLeague[] | null;
}

const initialState: LeagueState = {
  selectedLeague: "",
  leagueList: null,
  selectLeagueList: null,
};

export const leagueSlice = createSlice({
  name: "league",
  initialState,
  reducers: {
    setSelectedLeague: (state, action: PayloadAction<string>) => {
      state.selectedLeague = action.payload;
    },
    changeLeague: (state, action: PayloadAction<string>) => {
      state.selectedLeague = action.payload;
    },
    setLeagueList: (state, action: PayloadAction<DBLeague[]>) => {
      state.leagueList = action.payload;
    },
    setSelectLeagueList: (state, action: PayloadAction<DBLeague[]>) => {
      state.selectLeagueList = action.payload;
    },
    addLeagueTypes: (state, action: PayloadAction<DBLeague>) => {
      if (state.selectLeagueList?.find((el) => el.id !== action.payload.id)) {
        state.selectLeagueList?.push(action.payload);
      }
      return;
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
  setSelectLeagueList,
  setLeagueList,
  addLeagueTypes,
  deleteLeagueTypes,
  setSelectedLeague,
} = leagueSlice.actions;
export default leagueSlice.reducer;
