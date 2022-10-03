import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'app';

export type AccentColorType = 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink';

interface IUserState {
  accentColor: AccentColorType;
}

const initialState: IUserState = {
  accentColor: 'teal',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeAccentColor: (state, action: PayloadAction<AccentColorType>) => {
      state.accentColor = action.payload;
    },
  },
});

export const { setThemeAccentColor } = themeSlice.actions;

export const selectThemeAccentColor = (state: RootState) => state.theme.accentColor;

export default themeSlice.reducer;
