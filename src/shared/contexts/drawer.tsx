import { createContext, useContext } from "react"

interface IDrawerContextData {
  isDrawerOpen: boolean
  toggleDrawerOpen: (open: boolean) => void
}

export const DrawerContext = createContext<IDrawerContextData>(
  {} as IDrawerContextData,
)

function useDrawer(): IDrawerContextData {
  const context = useContext(DrawerContext)

  if (!context) {
    throw new Error('useDrawer must be used within an AuthProvider')
  }

  return context
}

export { useDrawer }