import { User } from "@firebase/auth";
import { createSlice } from "@reduxjs/toolkit";

export interface userSlice {
  user: User | null;
}

const initialState: userSlice = {
  user: null,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout, setUser } = userSlice.actions;

export const selectUser = (state: userSlice) => {
  return state.user;
};

export default userSlice.reducer;
