import { Box, styled } from '@mui/material'

export enum appColors {
  BLUE = '#0597F2',
  GREEN = '#49D907',
  YELLOW = '#e0e706',
  RED = '#F24607',
  PURPLE = '#970FF2',
}

export const StyledThemeBoxContainer = styled(Box)(({ theme }) => ({
  fontFamily: 'Roboto',
  minHeight: '100vh',
  background: theme.palette.background.default,
  overflow: 'hidden',
}))
