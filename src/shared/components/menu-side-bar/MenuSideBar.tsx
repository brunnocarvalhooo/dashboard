import Box from '@mui/material/Box'

import { Button, Collapse, Divider, IconButton, List, ListItemText, Tooltip, Typography } from '@mui/material'

import { useDrawer } from '../../contexts/drawer'
import { ChildrenContainer, DrawerContentContainer, MenuButton, StyledDrawer, StyledListItemButton } from './styles'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import BuildIcon from '@mui/icons-material/Build'

import { useAppTheme } from '../../contexts/theme'
import { ModalAddDashboard } from '../modal-add-dashboard/ModalAddDashboard'
import { useEffect, useState } from 'react'
import { getContrastColor, truncateText } from '../../utils/masks'
import { VIconButton } from '../interface'
import { useDashboards } from '../../contexts/dashboards'
import { CategoryChip } from '../interface/chip/category-chip/CategoryChip'
import { Dashboard } from '../../../models/local-strorage/dashboards'
import { storage } from '../../../models'
import { CreateDashboardButtonLabel, EmptyContainer } from '../home'

export const DRAWER_WIDTH = 260

type IMenuSideBarProps = {
  children: React.ReactNode
}

export const MenuSideBar: React.FC<IMenuSideBarProps> = ({ children }) => {
  const { isDrawerOpen, toggleDrawerOpen } = useDrawer()

  const { themeName, toggleTheme } = useAppTheme()

  const {
    dashboards,
    handleChangeCurrentDashboard,
    dashboardsCategories,
    fetchDashboardsCategories
  } = useDashboards()

  const [openModalAddDashboard, setOpenModalAddDashboard] = useState(false)
  const handleChangeOpenModalAddDashboard = (newValue: boolean) => {
    setOpenModalAddDashboard(newValue)
  }

  const [openCategoryCollapse, setOpenCategoryCollapse] = useState(true)
  const handleChangeOpenCategoryCollapse = (newValue: boolean) => {
    setOpenCategoryCollapse(newValue)
  }

  const [openDashboardsCollapse, setOpenDashboardsCollapse] = useState(true)
  const handleChangeOpenDashboardsCollapse = (newValue: boolean) => {
    setOpenDashboardsCollapse(newValue)
  }

  const handleSelectDashboard = (id_dashboard: number) => {
    const dashboard = new Dashboard(storage)

    const selectedDashboard = dashboard.get(id_dashboard)

    if (selectedDashboard) {
      handleChangeCurrentDashboard(() => selectedDashboard)

      toggleDrawerOpen(false)

      return
    }
  }

  useEffect(() => {
    fetchDashboardsCategories()
  }, [fetchDashboardsCategories, isDrawerOpen])

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
              <Tooltip title='Novo dashboard' placement='right'>
                <VIconButton
                  icon={<DashboardCustomizeIcon />}
                  onClick={() => handleChangeOpenModalAddDashboard(true)} size='small'
                />
              </Tooltip>

              <VIconButton
                icon={themeName === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
                onClick={toggleTheme} size='small'
              />
            </Box>

            <Divider />

            <Box mt={1}>
              <Box mb={1}>
                <Box display='flex' alignItems='center'>
                  <Box display='flex' alignItems='center' flex={1}>
                    <Typography variant='caption'>Categorias</Typography>
                    <IconButton
                      size='small'
                      onClick={() => handleChangeOpenCategoryCollapse(!openCategoryCollapse)}
                    >
                      {openCategoryCollapse ?
                        <KeyboardArrowUpIcon sx={{ fontSize: '1rem' }} /> :
                        <KeyboardArrowDownIcon sx={{ fontSize: '1rem' }} />
                      }
                    </IconButton>
                  </Box>

                  <Tooltip title='Gerenciar categorias de dashboard' placement='right'>
                    <IconButton size='small'>
                      <BuildIcon sx={{ fontSize: '0.7em' }} />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Collapse in={openCategoryCollapse} timeout="auto" unmountOnExit>
                  <Box mt={0.5}>
                    {dashboardsCategories.length > 0 ?
                      dashboardsCategories.map((categorie, i) => (
                        <CategoryChip
                          key={i}
                          categoryColor={categorie.color}
                          label={
                            <Typography
                              variant='caption'
                              color={getContrastColor(categorie.color)}
                            >{truncateText(categorie.name, 12)}</Typography>
                          }
                          size="small"
                        />
                      )) : (
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          textAlign='left'
                        >Nenhuma categoria de dashboard disponivel</Typography>
                      )}
                  </Box>
                </Collapse>
              </Box>

              <Box>
                <Box display='flex' alignItems='center' mb={0.5}>
                  <Typography variant='body2'>Dashboards</Typography>
                  <IconButton
                    size='small'
                    onClick={() => handleChangeOpenDashboardsCollapse(!openDashboardsCollapse)}
                  >
                    {openDashboardsCollapse ?
                      <KeyboardArrowUpIcon sx={{ fontSize: '1rem' }} /> :
                      <KeyboardArrowDownIcon sx={{ fontSize: '1rem' }} />
                    }
                  </IconButton>
                </Box>
                <Collapse in={openDashboardsCollapse} timeout="auto" unmountOnExit>
                  {dashboards.length > 0 ? (
                    <List disablePadding>
                      {dashboards.map((dashboard, i) => (
                        <StyledListItemButton
                          key={i}
                          onClick={() => handleSelectDashboard(dashboard.id)}
                        >
                          <ListItemText
                            primary={
                              <Typography
                                color='text.primary'
                                variant='body2'
                                noWrap
                              >{dashboard.name}</Typography>
                            }
                          />
                        </StyledListItemButton>
                      ))}
                    </List>
                  ) : (
                    <EmptyContainer sx={{ alignItems: 'flex-start' }}>
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        textAlign='left'
                      >
                        Nenhum dashboard disponivel
                      </Typography>

                      <Button onClick={() => handleChangeOpenModalAddDashboard(true)}>
                        <CreateDashboardButtonLabel
                          variant="caption"
                          textTransform='none'
                          textAlign='left'
                        >Clique aqui para criar um novo dashboard</CreateDashboardButtonLabel>
                      </Button>
                    </EmptyContainer>
                  )}
                </Collapse>
              </Box>
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

        <ChildrenContainer
          onClick={isDrawerOpen ? () => toggleDrawerOpen(false) : undefined}
          sx={isDrawerOpen ? {
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0)',
              zIndex: 99,
            },
          } : undefined}
        >
          {children}
        </ChildrenContainer>
      </Box>

      <ModalAddDashboard
        open={openModalAddDashboard}
        handleChangeOpen={handleChangeOpenModalAddDashboard}
      />
    </>
  )
}
