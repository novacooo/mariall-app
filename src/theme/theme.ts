import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const colors = {
  gray: {
    50: '#F1F2F3',
    100: '#D9DBDE',
    200: '#C1C5C8',
    300: '#A8AEB3',
    400: '#90979D',
    500: '#778088',
    600: '#5F666D',
    700: '#484D51',
    800: '#303336',
    900: '#181A1B',
  },
};

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors,
});

export default theme;
