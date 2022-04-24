import { createContext, useContext, useState } from 'react';

type AccentColorType =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'blue'
  | 'cyan'
  | 'purple'
  | 'pink';

interface IColorContext {
  accentColor: AccentColorType;
  changeAccentColor: (color: AccentColorType) => void;
}

interface ColorContextProps {
  children: React.ReactNode;
}

const initialAccentColor = 'teal';

const initialContext: IColorContext = {
  accentColor: initialAccentColor,
  changeAccentColor: () => {},
};

const ColorContext = createContext<IColorContext>(initialContext);

export const useColorContext = () => useContext(ColorContext);

const ColorContextProvider = ({ children }: ColorContextProps) => {
  const [accentColor, setAccentColor] =
    useState<AccentColorType>(initialAccentColor);

  const changeAccentColor = (color: AccentColorType) => setAccentColor(color);

  return (
    <ColorContext.Provider value={{ accentColor, changeAccentColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export default ColorContextProvider;
