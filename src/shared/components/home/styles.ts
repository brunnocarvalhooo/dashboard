import { Box, IconButton, keyframes, styled } from "@mui/material"

export const EmptyContainer = styled(Box)(() => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px'
}))

const addDashboardSlideInUp = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`

export const AddDashboardButton = styled(IconButton)(() => ({
  animation: `${addDashboardSlideInUp} 0.2s ease`,
}))
