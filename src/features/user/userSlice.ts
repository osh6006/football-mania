import { User } from "@firebase/auth";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: User;
}

export interface userSlice {
  user: UserState | null;
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
  if (state.user) {
    return state.user.user;
  }
  return null;
};

export default userSlice.reducer;
