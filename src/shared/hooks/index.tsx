import React from 'react'
import { AppThemeProvider } from './theme'
import { DrawerProvider } from './drawer'
import { MenuSideBar } from '../components/menu-side-bar/MenuSideBar'
import { DashboardsProvider } from './dashboards'

interface Props {
  children: React.ReactNode
}

export const APP_NAME = 'Dashboard'

const AppProvider: React.FC<Props> = ({ children }) => (
  <AppThemeProvider>
    <DashboardsProvider>
      <DrawerProvider>
        <MenuSideBar>
          {children}
        </MenuSideBar>
      </DrawerProvider>
    </DashboardsProvider>
  </AppThemeProvider>
)

export { AppProvider }
