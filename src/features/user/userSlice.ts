import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'app';

interface IUserState {
  isLogged: boolean;
  jwtToken: string | undefined;
  id: number | undefined;
  email: string | undefined;
  role: string | undefined;
  rememberCredentials: boolean | undefined;
}

interface IUserInfo {
  id: number | undefined;
  email: string | undefined;
  role: string | undefined;
  rememberCredentials: boolean | undefined;
}

const initialState: IUserState = {
  isLogged: false,
  jwtToken: undefined,
  id: undefined,
  email: undefined,
  role: undefined,
  rememberCredentials: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserIsLogged: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload;
    },
    setUserJwtToken: (state, action: PayloadAction<string>) => {
      state.jwtToken = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
      const { id, email, role, rememberCredentials } = action.payload;

      state.id = id;
      state.email = email;
      state.role = role;
      state.rememberCredentials = rememberCredentials;
    },
    logoutUser: (state) => {
      state.isLogged = false;
      state.jwtToken = undefined;
      state.id = undefined;
      state.email = undefined;
      state.role = undefined;
      state.rememberCredentials = undefined;
    },
  },
});

export const { setUserIsLogged, setUserJwtToken, setUserInfo, logoutUser } = userSlice.actions;

export const selectUserIsLogged = (state: RootState) => state.user.isLogged;
export const selectUserJwtToken = (state: RootState) => state.user.jwtToken;
export const selectUserId = (state: RootState) => state.user.id;
export const selectUserEmail = (state: RootState) => state.user.email;
export const selectUserRole = (state: RootState) => state.user.role;
export const selectUserRememberCredentials = (state: RootState) => state.user.rememberCredentials;

export default userSlice.reducer;
