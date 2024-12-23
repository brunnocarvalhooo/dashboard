import { Box, styled } from "@mui/material"

export const EmptyContainer = styled(Box)(() => ({
  height: 'calc(100vh - 160px)',
  width: 'calc(100vw - 8px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '16px'
}))