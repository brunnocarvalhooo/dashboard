import { createContext, useContext } from "react"
import { IDashboard } from "../dtos/dashboard"

export interface IDashboardsContextData {
  dashboards: IDashboard[]
  handleChangeDashboards: (updateFn: (prevRows: IDashboard[]) => IDashboard[]) => void
}

export const DashboardsContext = createContext({} as IDashboardsContextData)

export const useDashboardsContext = () => {
  return useContext(DashboardsContext)
}

function useDashboards(): IDashboardsContextData {
  const context = useContext(DashboardsContext)

  if (!context) {
    throw new Error('useDashboards must be used within an DashboardsProvider')
  }

  return context
}

export { useDashboards }
