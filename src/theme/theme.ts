import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const styles = {
  global: {
    'html, body, #root': {
      height: '100%',
    },
  },
};

const theme = extendTheme({ config, styles });

export default theme;
