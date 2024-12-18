import { createTheme } from '@mui/material'

export const LightTheme = createTheme({
  palette: {
    mode: 'light',
    text: {
      primary: '#333',
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
      color: '#333',
    },
  },
})
