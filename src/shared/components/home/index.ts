import { Box, styled, Typography } from "@mui/material"

export const EmptyContainer = styled(Box)(() => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px'
}))

export const CreateDashboardButtonLabel = styled(Typography)(() => ({
  '&:hover': {
    textDecoration: 'underline'
  }
}))