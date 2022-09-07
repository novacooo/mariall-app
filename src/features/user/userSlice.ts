import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';

interface IUserState {
  isLogged: boolean;
  id: number | undefined;
  email: string | undefined;
  role: string | undefined;
}

interface IUserInfo {
  id: number | undefined;
  email: string | undefined;
  role: string | undefined;
}

const initialState: IUserState = {
  isLogged: false,
  id: undefined,
  email: undefined,
  role: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserIsLogged: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
      const { id, email, role } = action.payload;

      state.id = id;
      state.email = email;
      state.role = role;
    },
  },
});

export const { setUserIsLogged, setUserInfo } = userSlice.actions;

export const selectUserIsLogged = (state: RootState) => state.user.isLogged;

export default userSlice.reducer;
