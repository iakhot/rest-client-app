'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',

    primary: {
      main: '#b6d3ebff',
    },
    secondary: {
      main: '#dda836ff',
    },
    background: {
      default: '#292727ff',
      paper: '#1e1e1e',
    },
  },

  typography: {
    fontSize: 14,
  },
  cssVariables: true,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
