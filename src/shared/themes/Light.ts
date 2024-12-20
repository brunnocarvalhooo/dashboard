import { createTheme } from '@mui/material'

export const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#04D924',
      contrastText: '#666'
    },
    text: {
      primary: '#000',
      secondary: '#666',
    },
    background: {
      default: '#EEEEEE',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    allVariants: {
      color: '#000',
    },
  },
})
