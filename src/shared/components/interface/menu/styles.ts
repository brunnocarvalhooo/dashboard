import { Menu, MenuItem, styled } from '@mui/material'

export const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    background: theme.palette.background.paper,
    borderRadius: '12px',
    border: '1px solid',
    boxShadow: 'none',
    padding: '4px',
    borderColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.1)',
  },

  '& .MuiMenu-list': {
    paddingTop: '0px',
    paddingBottom: '0px'
  },

  '& .MuiMenuItem-root': {
    borderRadius: '8px',
  },
}))

export const StyledMenuItem = styled(MenuItem)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}))
