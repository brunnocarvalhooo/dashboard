import React from 'react'
import { AppThemeProvider } from './theme'
import { DrawerProvider } from './drawer'
import { MenuSideBar } from '../components/menu-side-bar/MenuSideBar'
import { DashboardsProvider } from './dashboards'

interface Props {
  children: React.ReactNode
}

const AppProvider: React.FC<Props> = ({ children }) => (
  <AppThemeProvider>
    <DrawerProvider>
      <MenuSideBar>
        <DashboardsProvider>
          {children}
        </DashboardsProvider>
      </MenuSideBar>
    </DrawerProvider>
  </AppThemeProvider>
)

export { AppProvider }
