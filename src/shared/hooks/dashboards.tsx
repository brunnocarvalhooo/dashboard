import React, { useCallback, useState } from 'react'
import { DashboardsContext } from '../contexts/dashboards'
import { IDashboard } from '../dtos/dashboard'
import { Typography } from '@mui/material';

const dashboardData: IDashboard[] = [
  {
    id: 1,
    width: 2,
    height: 1,
    content: <Typography>teste1</Typography>,
  },
  {
    id: 2,
    width: 4,
    height: 1,
    content: <Typography>teste2</Typography>,
  },
  {
    id: 3,
    width: 1,
    height: 1,
    content: <Typography>teste3</Typography>,
  },
  {
    id: 4,
    width: 3,
    height: 1,
    content: <Typography>teste4</Typography>,
  },
  {
    id: 5,
    width: 2,
    height: 1,
    content: <Typography>teste5</Typography>,
  },
  {
    id: 6,
    width: 6,
    height: 1,
    content: <Typography>teste5</Typography>,
  },
];

interface DashboardsProps {
  children: React.ReactNode
}

const DashboardsProvider: React.FC<DashboardsProps> = ({ children }) => {
  const [dashboards, setDashboards] = useState<IDashboard[]>(dashboardData)

  const handleChangeDashboards = useCallback((
    updateFn: (prevRows: IDashboard[]) => IDashboard[],
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
      }}
    >
      {children}
    </DashboardsContext.Provider>
  )
}

export { DashboardsProvider }
