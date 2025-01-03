import { Box, Drawer, IconButton, ListItemButton, styled } from "@mui/material"

import { DRAWER_WIDTH } from "./MenuSideBar"
import { borderColor } from "../interface/dialog/styles"

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: `${DRAWER_WIDTH}px`,
    borderRight: '0px',

    '&::-webkit-scrollbar': {
      width: '6px',
      height: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor:
        theme.palette.mode === 'light'
          ? theme.palette.grey[400]
          : theme.palette.grey[800],
      '&:hover': {
        backgroundColor:
          theme.palette.mode === 'light'
            ? theme.palette.grey[500]
            : theme.palette.grey[700],
      },
      borderRadius: '12px'
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },

    [theme.breakpoints.down('sm')]: {
      width: 'calc(100vw - 88px)',
    }
  },
}))

export const DrawerContentContainer = styled(Box)(() => ({
  paddingInline: '8px',
  paddingBottom: '8px',
}))

export const MenuButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  zIndex: 999,
  top: '12px',
  left: `calc(${DRAWER_WIDTH}px + 12px)`,
  background: theme.palette.background.paper,
  borderColor: borderColor(theme.palette.mode),
  color: theme.palette.primary.contrastText,

  '&:hover': {
    background: theme.palette.background.paper,
  },

  [theme.breakpoints.down('sm')]: {
    left: 'calc(100vw - 80px)',
  }
}))

export const StyledListItemButton = styled(ListItemButton)(() => ({
  height: '38px',
  borderRadius: '8px',
  paddingInline: '8px',
  transition: 'all ease 0.3s'
}))

export const ChildrenContainer = styled(Box)(({ theme }) => ({
  height: "100vh",
  overflow: "auto",
  flex: 1,

  '&::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
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
