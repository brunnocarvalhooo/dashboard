import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
} from 'react'
import { ThemeProvider } from '@mui/material'
import { DarkTheme, LightTheme } from '../../themes'
import { StyledThemeBoxContainer } from './styles'
import { ThemeContext } from '../../contexts/theme'

interface IAppThemeProviderProps {
  children: React.ReactNode
}

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({
  children,
}) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>(() =>
    (localStorage.getItem('dashboard:theme') as 'light' | 'dark') || 'light',
  )

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) =>
      oldThemeName === 'light' ? 'dark' : 'light',
    )
  }, [])

  useEffect(() => {
    localStorage.setItem('dashboard:theme', themeName)
  }, [themeName])

  const theme = useMemo(() => {
    if (themeName === 'light') return LightTheme

    return DarkTheme
  }, [themeName])

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <StyledThemeBoxContainer>{children}</StyledThemeBoxContainer>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeProvider }
