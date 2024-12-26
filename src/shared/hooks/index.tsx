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
    <DrawerProvider>
      <DashboardsProvider>
        <MenuSideBar>
          {children}
        </MenuSideBar>
      </DashboardsProvider>
    </DrawerProvider>
  </AppThemeProvider>
)

export { AppProvider }
