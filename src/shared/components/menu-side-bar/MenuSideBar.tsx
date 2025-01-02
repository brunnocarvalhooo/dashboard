import Box from '@mui/material/Box'

import { Collapse, Divider, IconButton, InputAdornment, List, TextField, Tooltip, Typography, useTheme } from '@mui/material'

import { useDrawer } from '../../contexts/drawer'
import { ChildrenContainer, DrawerContentContainer, MenuButton, StyledDrawer } from './styles'

import { MdKeyboardArrowLeft } from "react-icons/md"
import { MdAddChart } from "react-icons/md"
import { MdOutlineLightMode } from "react-icons/md"
import { MdOutlineDarkMode } from "react-icons/md"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { GrConfigure } from "react-icons/gr"

import { useAppTheme } from '../../contexts/theme'
import { ModalAddDashboard } from './components/ModalAddDashboard'
import { useState } from 'react'
import { getContrastColor, truncateText } from '../../utils/masks'
import { VButton, VIconButton } from '../interface'
import { useDashboards } from '../../contexts/dashboards'
import { CategoryChip } from '../interface/chip/category-chip/CategoryChip'
import { LSDashboard } from '../../../services/local-strorage/dashboards'
import { storage } from '../../../models'
import { EmptyContainer } from '../home/styles'
import { ListButtonDashboard } from './parts/ListButtonDashboard'
import { ModalManageDashboardCategories } from './components/ModalManageDashboardCategories'
import { IoMdSearch } from 'react-icons/io'

export const DRAWER_WIDTH = 260

type IMenuSideBarProps = {
  children: React.ReactNode
}

export const MenuSideBar: React.FC<IMenuSideBarProps> = ({ children }) => {
  const { isDrawerOpen, toggleDrawerOpen } = useDrawer()

  const theme = useTheme()

  const { themeName, toggleTheme } = useAppTheme()

  const {
    dashboards,
    handleChangeCurrentDashboard,
    dashboardsCategories,
  } = useDashboards()

  const [maxVisibleCategories, setMaxVisibleCategories] = useState(10)
  const handleChangeMaxVisibleCategories = (operation: '-' | '+') => {
    setMaxVisibleCategories((prev) => {
      if (operation === '+') {
        return Math.min(prev + 10, dashboardsCategories.length)
      } else {
        return Math.max(prev - 10, 10)
      }
    })
  }

  const [openModalAddDashboard, setOpenModalAddDashboard] = useState(false)
  const handleChangeOpenModalAddDashboard = (newValue: boolean) => {
    setOpenModalAddDashboard(newValue)
  }

  const [openModalManageDashboardCategories, setOpenModalManageDashboardCategories] = useState(false)
  const handleChangeOpenModalManageDashboardCategories = (newValue: boolean) => {
    setOpenModalManageDashboardCategories(newValue)
  }

  const [openCategoryCollapse, setOpenCategoryCollapse] = useState(true)
  const handleChangeOpenCategoryCollapse = (newValue: boolean) => {
    setOpenCategoryCollapse(newValue)
  }

  const [openDashboardsCollapse, setOpenDashboardsCollapse] = useState(true)
  const handleChangeOpenDashboardsCollapse = (newValue: boolean) => {
    setOpenDashboardsCollapse(newValue)
  }

  const handleSelectDashboard = (id_dashboard: string) => {
    const dashboard = new LSDashboard(storage)

    const selectedDashboard = dashboard.get(id_dashboard)

    if (selectedDashboard) {
      handleChangeCurrentDashboard(() => selectedDashboard)

      toggleDrawerOpen(false)

      return
    }
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
            <Box display='flex' justifyContent='space-between' alignItems='center' py='8px'>
              <Tooltip title='Novo dashboard' placement='right'>
                <VIconButton
                  icon={<MdAddChart size={24} color={theme.palette.text.primary} />}
                  onClick={() => handleChangeOpenModalAddDashboard(true)} size='small'
                />
              </Tooltip>

              <VIconButton
                icon={themeName === 'light' ?
                  <MdOutlineLightMode size={24} color={theme.palette.text.primary} /> :
                  <MdOutlineDarkMode size={24} color={theme.palette.text.primary} />
                }
                onClick={toggleTheme} size='small'
              />
            </Box>

            <Divider sx={{ opacity: '0.4', mb: 1 }} />

            <TextField
              size='small'
              variant='standard'
              fullWidth
              placeholder='Pesquisar...'
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IoMdSearch size={22} style={{ paddingBottom: '4px', color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Box mt={1}>
              <Box mb={1}>
                <Box display='flex' alignItems='center'>
                  <Box display='flex' alignItems='center' flex={1} gap={0.5}>
                    <Typography variant='caption'>Categorias de dashboard ({dashboardsCategories.length})</Typography>
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
                    <IconButton
                      size='small'
                      onClick={() => handleChangeOpenModalManageDashboardCategories(true)}
                    >
                      <GrConfigure size={12} color={theme.palette.text.primary} />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Collapse in={openCategoryCollapse} timeout="auto" unmountOnExit>
                  <Box mt={0.5}>
                    {dashboardsCategories.length > 0 ?
                      dashboardsCategories
                        .slice(0, maxVisibleCategories)
                        .map((category, i) => (
                          <CategoryChip
                            key={i}
                            categoryColor={category.color}
                            label={
                              <Typography
                                variant='caption'
                                color={getContrastColor(category.color)}
                              >{truncateText(category.name, 12)}</Typography>
                            }
                            size="small"
                          />
                        )) : (
                        <Typography
                          fontSize='0.7rem'
                          color='text.secondary'
                          textAlign='left'
                        >Nenhuma categoria de dashboard disponivel</Typography>
                      )}
                  </Box>

                  {dashboardsCategories.length > 10 && (
                    <>
                      <Tooltip title='Mostrar menos' placement='bottom-end'>
                        <IconButton
                          size='small'
                          disabled={maxVisibleCategories <= 10}
                          onClick={() => handleChangeMaxVisibleCategories('-')}
                        >
                          <KeyboardArrowUpIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Mostrar mais' placement='bottom'>
                        <IconButton
                          size='small'
                          disabled={maxVisibleCategories >= dashboardsCategories.length}
                          onClick={() => handleChangeMaxVisibleCategories('+')}
                        >
                          <KeyboardArrowDownIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </Collapse>
              </Box>

              <Box>
                <Box display='flex' alignItems='center' mb={0.5} gap={0.5}>
                  <Typography variant='body2'>Dashboards ({dashboards.length})</Typography>
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
                        <ListButtonDashboard
                          key={i}
                          dashboard={dashboard}
                          handleSelectDashboard={handleSelectDashboard}
                        />
                      ))}
                    </List>
                  ) : (
                    <EmptyContainer sx={{ alignItems: 'flex-start' }}>
                      <Typography
                        fontSize='0.7rem'
                        color='text.secondary'
                        textAlign='left'
                      >
                        Nenhum dashboard disponivel
                      </Typography>

                      <VButton
                        size='small'
                        variant='contained'
                        onClick={() => handleChangeOpenModalAddDashboard(true)}
                        color='primary'
                        label={
                          <Typography
                            variant="caption"
                            textTransform='none'
                            textAlign='left'
                            color='white'
                          >Criar novo dashboard</Typography>
                        }
                      />
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
            <MdKeyboardArrowLeft size={26} color={theme.palette.text.primary} />
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

      <ModalManageDashboardCategories
        open={openModalManageDashboardCategories}
        handleChangeOpen={handleChangeOpenModalManageDashboardCategories}
      />
    </>
  )
}
