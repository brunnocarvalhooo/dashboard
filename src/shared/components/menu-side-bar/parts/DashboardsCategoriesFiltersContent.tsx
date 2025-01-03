import { Box, Checkbox, Typography } from "@mui/material"

type Props = {
  dashboardsFilters: {
    active: boolean;
    inactive: boolean;
  }
  setDashboardsFilters: React.Dispatch<React.SetStateAction<{
    active: boolean;
    inactive: boolean;
  }>>
}

export const DashboardsCategoriesFiltersContent = ({ dashboardsFilters, setDashboardsFilters }: Props) => {
  return (
    <Box p={1}>
      <Typography
        variant='body2'
        color='text.primary'
        display='flex'
        gap={0.5}
      >
        Categorias de dashboard
        <Typography
          variant='caption'
          color='text.secondary'
        >/ Filtros</Typography>
      </Typography>

      <Box display='flex' alignItems='center' gap={2} mt={1}>
        <Box display='flex' alignItems='center'>
          <Checkbox
            size='small'
            checked={dashboardsFilters.active}
            onChange={(_, newValue) => setDashboardsFilters((prev) => ({
              ...prev, active: prev.inactive ? newValue : prev.active
            }))}
          />
          <Typography
            variant='body2'
            color='text.primary'
          >Ativos</Typography>
        </Box>
        <Box display='flex' alignItems='center'>
          <Checkbox
            size='small'
            checked={dashboardsFilters.inactive}
            onChange={(_, newValue) => setDashboardsFilters((prev) => ({
              ...prev, inactive: prev.active ? newValue : prev.inactive
            }))}
          />
          <Typography
            variant='body2'
            color='text.primary'
          >Inativos</Typography>
        </Box>
      </Box>
    </Box>
  )
}
