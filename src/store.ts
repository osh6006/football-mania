import { configureStore } from "@reduxjs/toolkit";
import leagueSlice from "./features/league/leagueSlice";

export const store = configureStore({
  reducer: {
    league: leagueSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
