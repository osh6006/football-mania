import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LeagueState {
  selectedLeague: string;
}

const initialState: LeagueState = {
  selectedLeague: "39",
};

export const leagueSlice = createSlice({
  name: "league",
  initialState,
  reducers: {
    changeLeague: (state, action: PayloadAction<string>) => {
      state.selectedLeague = action.payload;
    },
  },
});

export const { changeLeague } = leagueSlice.actions;
export default leagueSlice.reducer;
