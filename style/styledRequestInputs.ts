import { Box, MenuItem, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const UrlInput = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.2),
  },
  '& fieldset': {
    border: 0,
    borderRight: '1px solid #ffffff3b',
    borderRadius: 0,
  },
}));

export const UrlBox = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  border: '1px solid #ffffff3b',
  borderRadius: 1,
}));

export const UrlMenuItem = styled(MenuItem)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
}));
