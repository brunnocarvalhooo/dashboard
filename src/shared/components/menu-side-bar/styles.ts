import { Box, Drawer, IconButton, ListItemButton, styled } from "@mui/material"

import { DRAWER_WIDTH } from "./MenuSideBar"
import { borderColor } from "../interface/dialog/styles"

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: `${DRAWER_WIDTH}px`,

    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor:
        theme.palette.mode === 'light'
          ? theme.palette.grey[400]
          : theme.palette.grey[900],
      '&:hover': {
        backgroundColor:
          theme.palette.mode === 'light'
            ? theme.palette.grey[500]
            : theme.palette.grey[800],
      },
      borderRadius: '12px'
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
  },
}))

export const DrawerContentContainer = styled(Box)(() => ({
  paddingInline: '12px',
  paddingBottom: '8px',
}))

export const MenuButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  zIndex: 999,
  top: '12px',
  left: `calc(${DRAWER_WIDTH}px + 16px)`,
  background: theme.palette.background.paper,
  border: '1px solid',
  borderColor: borderColor(theme.palette.mode),
  color: theme.palette.primary.contrastText,

  '&:hover': {
    background: theme.palette.background.paper,
  }
}))

export const StyledListItemButton = styled(ListItemButton)(() => ({
  height: '38px',
  borderRadius: '8px'
}))

export const ChildrenContainer = styled(Box)(({ theme }) => ({
  height: "100vh",
  overflow: "auto",
  flex: 1,

  '&::-webkit-scrollbar': {
    width: '4px',
    height: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.grey[400]
        : theme.palette.grey[900],
    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'light'
          ? theme.palette.grey[500]
          : theme.palette.grey[800],
    },
    borderRadius: '12px'
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
}))
