import { createContext, useContext } from "react"

export interface IThemeContextData {
  themeName: 'light' | 'dark'
  toggleTheme: () => void
}

export const ThemeContext = createContext({} as IThemeContextData)

export const useAppThemeContext = () => {
  return useContext(ThemeContext)
}

function useAppTheme(): IThemeContextData {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within an ThemeProvider')
  }

  return context
}

export { useAppTheme }
