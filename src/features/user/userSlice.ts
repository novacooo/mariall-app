import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';

interface IUserState {
  isLogged: boolean;
  id: number | null;
  jwtToken: string | null;
}

const initialState: IUserState = {
  isLogged: false,
  id: null,
  jwtToken: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserIsLogged: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload;
    },
    setUserId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    setUserJwtToken: (state, action: PayloadAction<string>) => {
      state.jwtToken = action.payload;
    },
  },
});

export const { setUserIsLogged, setUserId, setUserJwtToken } = userSlice.actions;

export const selectUserIsLogged = (state: RootState) => state.user.isLogged;
export const selectUserId = (state: RootState) => state.user.isLogged;
export const selectUserJwtToken = (state: RootState) => state.user.jwtToken;

export default userSlice.reducer;
