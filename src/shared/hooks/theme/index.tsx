import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
} from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import { appColors, StyledThemeBoxContainer } from './styles'
import { ThemeContext } from '../../contexts/theme'

interface IAppThemeProviderProps {
  children: React.ReactNode
}

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>(() =>
    (localStorage.getItem('dashboard:theme') as 'light' | 'dark') || 'light'
  )

  const [primaryColor, setPrimaryColor] = useState<string>(() =>
    localStorage.getItem('dashboard:primaryColor') || appColors.BLUE
  )

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) => (oldThemeName === 'light' ? 'dark' : 'light'))
  }, [])

  const changePrimaryColor = useCallback((color: string) => {
    setPrimaryColor(color)
  }, [])

  useEffect(() => {
    localStorage.setItem('dashboard:theme', themeName)
  }, [themeName])

  useEffect(() => {
    localStorage.setItem('dashboard:primaryColor', primaryColor)
  }, [primaryColor])

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: themeName,
        primary: {
          main: primaryColor,
          contrastText: themeName === 'light' ? '#555' : '#aaa',
        },
        text: {
          primary: themeName === 'light' ? '#000' : '#fff',
          secondary: themeName === 'light' ? '#555' : '#aaa',
        },
        background: {
          default: themeName === 'light' ? '#EEEEEE' : '#171717',
          paper: themeName === 'light' ? '#FFFFFF' : '#212121',
        },
      },
      typography: {
        fontFamily: 'Nunito, Arial, sans-serif',
        allVariants: {
          color: themeName === 'light' ? '#555' : '#aaa',
        },
      },
    })
  }, [themeName, primaryColor])

  return (
    <ThemeContext.Provider
      value={{ themeName, primaryColor, toggleTheme, changePrimaryColor }}
    >
      <ThemeProvider theme={theme}>
        <StyledThemeBoxContainer>
          {children}
        </StyledThemeBoxContainer>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}