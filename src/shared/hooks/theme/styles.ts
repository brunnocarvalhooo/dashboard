import { Box, styled } from '@mui/material'

export const StyledThemeBoxContainer = styled(Box)(({ theme }) => ({
  fontFamily: 'Roboto',
  minHeight: '100vh',
  background: theme.palette.background.default,
  overflow: 'hidden',
}))
