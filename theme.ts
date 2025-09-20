'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',

    primary: { main: '#b6d3ebff' },
    secondary: { main: '#dda836ff' },
    get: { main: '#4caf50' },
    post: { main: '#2196f3' },
    put: { main: '#1f8be4ff' },
    patch: { main: '#1682daff' },
    delete: { main: '#f44336' },
    head: { main: '#00acc1' },
    options: { main: '#757575' },
    retry: { main: '#cddc39' },
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
