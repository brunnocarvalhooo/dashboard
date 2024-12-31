import React, { useCallback, useEffect, useState } from 'react'
import { DashboardsContext } from '../contexts/dashboards'
import { IDashboard } from '../dtos/dashboard'
import { ILSDashboard } from '../../models/dashboard.model'
import { storage } from '../../models'
import { ICategory } from '../dtos/categories'

interface DashboardsProps {
  children: React.ReactNode
}

const DashboardsProvider: React.FC<DashboardsProps> = ({ children }) => {
  const [dashboards, setDashboards] = useState<ILSDashboard[]>([])
  
  const [dashboardsCategories, setDashboardsCategories] = useState<ICategory[]>([])
  
  const [currentDashboard, setCurrentDashboard] = useState<IDashboard>()

  const handleChangeCurrentDashboard = useCallback((
    updateFn: (prev: IDashboard | undefined) => IDashboard | undefined,
  ) => {
    setCurrentDashboard((prev) => {
      const updatedRows = updateFn(prev)
      return prev === updatedRows ? prev : updatedRows
    })
  }, [])
  
  const fetchDashboards = () => {
    const dashboardList = storage.dashboards.list()
    setDashboards(dashboardList)
  }

  const fetchDashboardsCategories = () => {
    const dashboardList = storage.dashboards.getCategories()
    setDashboardsCategories(dashboardList)
  }

  useEffect(() => {
    fetchDashboards()
    fetchDashboardsCategories()
  }, [])

  return (
    <DashboardsContext.Provider
      value={{
        dashboards,
        dashboardsCategories,
        fetchDashboards,
        fetchDashboardsCategories,
        currentDashboard,
        handleChangeCurrentDashboard
      }}
    >
      {children}
    </DashboardsContext.Provider>
  )
}

export { DashboardsProvider }
