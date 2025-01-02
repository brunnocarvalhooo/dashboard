import { createTheme } from '@mui/material'

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0DA64F',
      contrastText: '#bbb'
    },
    text: {
      primary: '#fff',
      secondary: '#aaa',
    },
    background: {
      default: '#171717',
      paper: '#212121',
    },
  },
  typography: {
    fontFamily: 'Nunito, Arial, sans-serif',
    allVariants: {
      color: '#bbb',
    },
  },
})
