import { Box, styled, Typography } from "@mui/material"

export const EmptyContainer = styled(Box)(() => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  paddingBottom: '160px'
}))

export const CreateComponentButtonLabel = styled(Typography)(() => ({
  '&:hover': {
    textDecoration: 'underline'
  }
}))