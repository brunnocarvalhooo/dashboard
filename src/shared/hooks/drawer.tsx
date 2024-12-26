import React, { useState } from 'react'
import { DrawerContext } from '../contexts/drawer'

interface DrawerProps {
  children: React.ReactNode
}

const DrawerProvider: React.FC<DrawerProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)

  const toggleDrawerOpen = (newValue: boolean) => {
    setIsDrawerOpen(newValue)
  }

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        toggleDrawerOpen,
      }}
    >
      {children}
    </DrawerContext.Provider>
  )
}

export { DrawerProvider }
