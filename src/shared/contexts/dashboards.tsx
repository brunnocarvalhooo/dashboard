import { createContext, useContext } from "react"
import { IDashboard } from "../dtos/dashboard"
import { ILSDashboard } from "../../models/dashboard.model"
import { ICategory } from "../dtos/categories"

export interface IDashboardsContextData {
  dashboards: ILSDashboard[]
  dashboardsCategories: ICategory[]
  fetchDashboards: () => void
  fetchDashboardsCategories: () => void
  currentDashboard: IDashboard | undefined
  handleChangeCurrentDashboard: (updateFn: (prev: IDashboard | undefined) => IDashboard | undefined) => void
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
