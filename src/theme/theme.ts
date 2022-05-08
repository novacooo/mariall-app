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
    '&::-webkit-scrollbar': {
      width: 2,
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'blackAlpha.200',
      borderRadius: '50px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'blackAlpha.200',
      borderRadius: '50px',
    },
  },
};

const theme = extendTheme({ config, styles });

export default theme;
