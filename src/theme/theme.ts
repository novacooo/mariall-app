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
    '.show-on-print-only': {
      display: 'none',
    },
    '@media print': {
      '.show-on-print-only': {
        display: 'block !important',
      },
      '*': {
        borderColor: '#f2f2f2 !important',
      },
      th: {
        color: '#666666 !important',
      },
      td: {
        color: '#000000 !important',
      },
      'tr:nth-of-type(odd) td': {
        backgroundColor: '#f2f2f2 !important',
      },
    },
  },
};

export const theme = extendTheme({ config, styles });
