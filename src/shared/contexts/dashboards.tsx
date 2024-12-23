import { createContext, useContext } from "react"
import { IDashboard } from "../dtos/dashboard"
import { ILSDashboard } from "../../models/local-strorage/dashboards/dashboard.model"

export interface IDashboardsContextData {
  dashboards: ILSDashboard[]
  fetchDashboards: () => void
  currentDashboard: IDashboard | undefined
  handleChangeCurrentDashboard: (updateFn: (prev: IDashboard | undefined) => IDashboard) => void
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
