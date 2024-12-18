import { createTheme } from '@mui/material'

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#04D924'
    },
    text: {
      primary: '#fff',
      secondary: '#888',
    },
    background: {
      default: '#000000',
      paper: '#111111',
    },
  },
  typography: {
    fontFamily: 'Nunito, Arial, sans-serif',
    allVariants: {
      color: '#fff',
    },
  },
})
