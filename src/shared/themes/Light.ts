import { createTheme } from '@mui/material'

export const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0DA64F',
      contrastText: '#5D5D5D'
    },
    text: {
      primary: '#000',
      secondary: '#888',
    },
    background: {
      default: '#EEEEEE',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    allVariants: {
      color: '#5D5D5D',
    },
  },
})
