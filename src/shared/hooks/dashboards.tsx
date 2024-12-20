import React, { useCallback, useState } from 'react'
import { DashboardsContext } from '../contexts/dashboards'
import { IDashboard } from '../dtos/dashboard'

const dashboardData: IDashboard[] = [
  {
    id: 1,
    name: "Sales Dashboard",
    categories: [
      {
        id: 1,
        name: "Finance",
        color: "#FF5733"
      },
      {
        id: 2,
        name: "Operations",
        color: "#33C4FF"
      }
    ],
    components: [
      {
        id: 1,
        title: "Monthly Sales",
        width: 6,
        height: 1,
        categories: [
          {
            id: 1,
            name: "Finance",
            color: "#FF5733"
          }
        ],
        content: {
          key: "sales-data",
          data: {
            totalSales: 50000,
            growth: 10
          }
        }
      },
      {
        id: 2,
        title: "Operational Costs",
        width: 6,
        height: 1,
        categories: [
          {
            id: 2,
            name: "Operations",
            color: "#33C4FF"
          }
        ],
        content: {
          key: "cost-data",
          data: {
            totalCosts: 20000,
            variance: -5
          }
        }
      }
    ]
  },
  {
    id: 2,
    name: "Sales Dashboard",
    categories: [
      {
        id: 1,
        name: "Finance",
        color: "#FF5733"
      },
      {
        id: 2,
        name: "Operations",
        color: "#33C4FF"
      }
    ],
    components: [
      {
        id: 1,
        title: "Monthly Sales",
        width: 6,
        height: 1,
        categories: [
          {
            id: 1,
            name: "Finance",
            color: "#FF5733"
          }
        ],
        content: {
          key: "sales-data",
          data: {
            totalSales: 50000,
            growth: 10
          }
        }
      },
      {
        id: 2,
        title: "Operational Costs",
        width: 6,
        height: 1,
        categories: [
          {
            id: 2,
            name: "Operations",
            color: "#33C4FF"
          }
        ],
        content: {
          key: "cost-data",
          data: {
            totalCosts: 20000,
            variance: -5
          }
        }
      }
    ]
  },
];

interface DashboardsProps {
  children: React.ReactNode
}

const DashboardsProvider: React.FC<DashboardsProps> = ({ children }) => {
  const [dashboards, setDashboards] = useState<IDashboard[]>(dashboardData)
  const [currentDashboard, setCurrentDashboard] = useState<IDashboard>(dashboardData[0])

  const handleChangeDashboards = useCallback((
    updateFn: (prev: IDashboard[]) => IDashboard[],
  ) => {
    setDashboards((prev) => {
      const updatedRows = updateFn(prev)
      return prev === updatedRows ? prev : updatedRows
    })
  }, [])

  return (
    <DashboardsContext.Provider
      value={{
        dashboards,
        handleChangeDashboards,

        currentDashboard
      }}
    >
      {children}
    </DashboardsContext.Provider>
  )
}

export { DashboardsProvider }
