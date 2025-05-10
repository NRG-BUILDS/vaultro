import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  avatar: string | null;
  name: string;
  username: string | null;
};

interface AuthState {
  token?: string | null;
  refresh?: string | null;
  username?: string | null;
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  refresh: null,
  username: null,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        token: string;
        refresh: string;
        username: string;
        email: string;
        user: User | null;
      }>
    ) => {
      state.token = action.payload.token;
      state.refresh = action.payload.refresh;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.username = action.payload.username;
    },
    setUser: (
      state,
      action: PayloadAction<{
        user: User;
      }>
    ) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.refresh = null;
      state.username = null;
      state.isAuthenticated = false;
      state.user = null;
    },
    updateToken: (
      state,
      action: PayloadAction<{ token: string; refresh: string }>
    ) => {
      state.token = action.payload.token;
      state.refresh = action.payload.refresh; // Update only the token
    },
  },
});

export const { login, setUser, logout, updateToken } = authSlice.actions;
export default authSlice.reducer;
