import { createTheme } from '@mui/material'

export const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0DA64F',
      contrastText: '#555'
    },
    text: {
      primary: '#000',
      secondary: '#555',
    },
    background: {
      default: '#EEEEEE',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    allVariants: {
      color: '#555',
    },
  },
})
