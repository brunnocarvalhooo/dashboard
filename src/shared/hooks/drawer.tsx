import React, { useState } from 'react'
import { DrawerContext } from '../contexts/drawer'
import { useDashboards } from '../contexts/dashboards'

interface DrawerProps {
  children: React.ReactNode
}

const DrawerProvider: React.FC<DrawerProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)

  const { fetchDashboardsCategories } = useDashboards()

  const toggleDrawerOpen = (newValue: boolean) => {
    fetchDashboardsCategories()
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
