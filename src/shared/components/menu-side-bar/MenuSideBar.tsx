import Box from '@mui/material/Box'

import { Divider, IconButton, List, ListItemText, Tooltip, Typography } from '@mui/material'

import { useDrawer } from '../../contexts/drawer'
import { DrawerContentContainer, MenuButton, StyledDrawer, StyledListItemButton } from './styles'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { useAppTheme } from '../../contexts/theme';
import { ModalAddDashboard } from '../modal-add-dashboard/ModalAddDashboard';
import { useState } from 'react';

const Dashboards = [
  { label: 'Teste1' },
  { label: 'Teste2' },
  { label: 'Teste3' },
  { label: 'Teste4' },
  { label: 'Teste5' },
  { label: 'Teste1dhd shsdhdhdhdhs fsf ggeb wtegwew' },
]

export const DRAWER_WIDTH = 280

type IMenuSideBarProps = {
  children: React.ReactNode
}

export const MenuSideBar: React.FC<IMenuSideBarProps> = ({ children }) => {
  const { isDrawerOpen, toggleDrawerOpen } = useDrawer()

  const { themeName, toggleTheme } = useAppTheme()

  const [openModalAddFashboard, setOpenModalAddFashboard] = useState(false)
  const handleChangeOpenModalAddFashboard = (newValue: boolean) => {
    setOpenModalAddFashboard(newValue)
  }

  return (
    <>
      <Box position='relative'>
        <StyledDrawer
          variant='persistent'
          open={isDrawerOpen}
          onClose={() => toggleDrawerOpen(false)}
        >
          <DrawerContentContainer>
            <Box display='flex' justifyContent='space-between' alignItems='center' py='12px'>
              <IconButton onClick={() => handleChangeOpenModalAddFashboard(true)} size='small'>
                <DashboardCustomizeIcon />
              </IconButton>

              <IconButton onClick={toggleTheme} size='small'>
                {themeName === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Box>

            <Divider />

            <Box>
              <List>
                {Dashboards.map((dashboard, i) => (
                  <StyledListItemButton key={i}>
                    <ListItemText
                      primary={
                        <Typography
                          color='text.primary'
                          noWrap
                        >{dashboard.label}</Typography>
                      }
                    />
                  </StyledListItemButton>
                ))}
              </List>
            </Box>
          </DrawerContentContainer>
        </StyledDrawer>

        <Tooltip title='Fechar menu' placement='right'>
          <MenuButton
            size='small'
            onClick={() => toggleDrawerOpen(!isDrawerOpen)}
            sx={{
              opacity: isDrawerOpen ? 1 : 0,
              pointerEvents: isDrawerOpen ? 'auto' : 'none',
              transition: 'opacity 0.1s ease-in-out, transform 0.2s ease-in-out',
              transform: isDrawerOpen ? 'rotate(0deg)' : 'rotate(180deg)',
            }}
          >
            <ArrowBackIosNewIcon />
          </MenuButton>
        </Tooltip>

        <Box
          height="100vh"
          overflow="auto"
          flex={1}
          onClick={isDrawerOpen ? () => toggleDrawerOpen(false) : undefined}
          sx={isDrawerOpen ? {
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 99,
            },
          } : undefined}
        >
          {children}
        </Box>
      </Box>

      <ModalAddDashboard
        open={openModalAddFashboard}
        handleChangeOpen={handleChangeOpenModalAddFashboard}
      />
    </>
  )
}
