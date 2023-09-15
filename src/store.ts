import { configureStore } from "@reduxjs/toolkit";
import leagueSlice from "./features/league/leagueSlice";
import userSlice from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    league: leagueSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
