import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';

interface IUserState {
  isLogged: boolean;
}

const initialState: IUserState = {
  isLogged: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLogged: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload;
    },
  },
});

export const { setIsLogged } = userSlice.actions;

export const selectIsLogged = (state: RootState) => state.user.isLogged;

export default userSlice.reducer;
