import Box from '@mui/material/Box'

import { Collapse, IconButton, InputAdornment, List, TextField, Tooltip, Typography, useTheme } from '@mui/material'

import { useDrawer } from '../../contexts/drawer'
import { ChildrenContainer, DrawerContentContainer, MenuButton, StyledDrawer } from './styles'

import { MdKeyboardArrowLeft, MdOutlineClose, MdOutlineFilterAlt } from "react-icons/md"
import { MdAddChart } from "react-icons/md"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { GrConfigure } from "react-icons/gr"

import { ModalAddDashboard } from './components/ModalAddDashboard'
import { useMemo, useState } from 'react'
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
import { ILSDashboard } from '../../../models/dashboard.model'
import { ICategory } from '../../dtos/categories'
import { StyledMenu } from '../interface/menu/styles'
import { RiColorFilterLine } from 'react-icons/ri'
import { DashboardsCategoriesFiltersContent } from './parts/DashboardsCategoriesFiltersContent'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import { CustomizeContent } from './parts/CustomizeContent'

interface ISearchResults {
  dashboard: ILSDashboard[]
  dashboardsCategories: ICategory[]
}

export const DRAWER_WIDTH = 260


type IMenuSideBarProps = {
  children: React.ReactNode
}

export const MenuSideBar: React.FC<IMenuSideBarProps> = ({ children }) => {
  const { isDrawerOpen, toggleDrawerOpen } = useDrawer()

  const theme = useTheme()

  const {
    dashboards,
    handleChangeCurrentDashboard,
    dashboardsCategories,
    fetchDashboardsCategories
  } = useDashboards()

  const [search, setSearch] = useState('')
  const [dashboardsFilters, setDashboardsFilters] = useState({
    active: true,
    inactive: true
  })

  const [anchorElFilterDashboardsCategories, setAnchorElDashboardsCategories] = useState<null | HTMLElement>(null)
  const openFilterDashboardsCategories = Boolean(anchorElFilterDashboardsCategories)
  const handleClickFilterDashboardsCategories = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElDashboardsCategories(event.currentTarget)
  }
  const handleCloseFilterDashboardsCategories = () => {
    setAnchorElDashboardsCategories(null)
  }

  const [anchorElCustomize, setAnchorElCustomize] = useState<null | HTMLElement>(null)
  const openCustomize = Boolean(anchorElCustomize)
  const handleClickCustomize = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCustomize(event.currentTarget)
  }
  const handleCloseCustomize = () => {
    setAnchorElCustomize(null)
  }

  const [maxVisibleCategories, setMaxVisibleCategories] = useState(10)
  const handleChangeMaxVisibleCategories = (operation: '-' | '--' | '+' | '++') => {
    setMaxVisibleCategories((prev) => {
      switch (operation) {
        case '+':
          return Math.min(prev + 10, dashboardsCategories.length)
        case '++':
          return dashboardsCategories.length
        case '-':
          return Math.max(prev - 10, 10)
        case '--':
          return 10
        default:
          return prev
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

  const handleChangeActiveStatusCategory = (id_category: string) => {
    try {
      storage.dashboards_categories.changeActiveStatus(id_category)

      fetchDashboardsCategories()
    } catch (error) {
      console.log(error)
    }
  }

  const searchResult = useMemo<ISearchResults>(() => {
    const dashboardsCategoriesResult = dashboardsCategories
      .filter((category) =>
        search ? category.name.toLowerCase().includes(search.toLowerCase()) : true
      )
      .filter((category) => {
        if (dashboardsFilters.active && dashboardsFilters.inactive) return true
        if (dashboardsFilters.active) return category.active
        if (dashboardsFilters.inactive) return !category.active
        return false
      })

    const dashboardsResult = dashboards
      .filter((dashboard) =>
        search ? dashboard.name.toLowerCase().includes(search.toLowerCase()) : true
      )
      .filter((dashboard) => {
        const relatedCategories = dashboardsCategories.filter((category) =>
          category.relations.includes(dashboard.id)
        )

        if (relatedCategories.length === 0) return true

        return relatedCategories.some((category) => category.active)
      })

    return {
      dashboard: dashboardsResult,
      dashboardsCategories: dashboardsCategoriesResult,
    }
  }, [dashboards, dashboardsCategories, search, dashboardsFilters])
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
                  icon={<MdAddChart size={24} color={theme.palette.text.secondary} />}
                  onClick={() => handleChangeOpenModalAddDashboard(true)} size='small'
                />
              </Tooltip>

              <Tooltip title='Customização' placement='left'>
                <VIconButton
                  id="customize-button"
                  aria-controls={openCustomize ? 'customize-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openCustomize ? 'true' : undefined}
                  onClick={handleClickCustomize}
                  icon={<RiColorFilterLine size={24} color={theme.palette.text.secondary} />}
                  size='small'
                />
              </Tooltip>

              <StyledMenu
                id="customize-menu"
                aria-labelledby="customize-button"
                anchorEl={anchorElCustomize}
                open={openCustomize}
                onClose={handleCloseCustomize}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                sx={{ top: '-8px' }}
              >
                <CustomizeContent />
              </StyledMenu>
            </Box>

            <TextField
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                handleChangeOpenCategoryCollapse(true)
                handleChangeOpenDashboardsCollapse(true)
              }}
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
                  endAdornment: search && (
                    <IconButton size='small' onClick={() => setSearch('')}>
                      <MdOutlineClose
                        size={20}
                        style={{
                          color: 'text.secondary',
                        }}
                      />
                    </IconButton>

                  )
                },
              }}
            />

            <Box mt={1}>
              <Box mb={1}>
                <Box display='flex' alignItems='center'>
                  <Box display='flex' alignItems='center' flex={1} gap={0.5}>
                    <Typography variant='caption' color='text.primary'>
                      Categorias de dashboard ({searchResult.dashboardsCategories.length})
                    </Typography>
                    <IconButton
                      size='small'
                      onClick={() => handleChangeOpenCategoryCollapse(!openCategoryCollapse)}
                    >
                      {openCategoryCollapse ?
                        <KeyboardArrowUpIcon sx={{ fontSize: '1rem', color: 'text.primary' }} /> :
                        <KeyboardArrowDownIcon sx={{ fontSize: '1rem', color: 'text.primary' }} />
                      }
                    </IconButton>
                  </Box>

                  <Box>
                    <Tooltip title='Filtros' placement='bottom'>
                      <IconButton
                        size='small'
                        id="filter-dashboards-categories-button"
                        aria-controls={openFilterDashboardsCategories ? 'filter-dashboards-categories-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openFilterDashboardsCategories ? 'true' : undefined}
                        onClick={handleClickFilterDashboardsCategories}
                      >
                        <MdOutlineFilterAlt size={16} color={theme.palette.text.secondary} />
                      </IconButton>
                    </Tooltip>

                    <StyledMenu
                      id="filter-dashboards-categories-menu"
                      aria-labelledby="filter-dashboards-categories-button"
                      anchorEl={anchorElFilterDashboardsCategories}
                      open={openFilterDashboardsCategories}
                      onClose={handleCloseFilterDashboardsCategories}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      <DashboardsCategoriesFiltersContent
                        dashboardsFilters={dashboardsFilters}
                        setDashboardsFilters={setDashboardsFilters}
                      />
                    </StyledMenu>

                    <Tooltip title='Gerenciar categorias de dashboard' placement='right'>
                      <IconButton
                        size='small'
                        onClick={() => handleChangeOpenModalManageDashboardCategories(true)}
                      >
                        <GrConfigure size={13} color={theme.palette.text.secondary} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                <Collapse in={openCategoryCollapse} timeout="auto" unmountOnExit>
                  <Box mt={0.5}>
                    {searchResult.dashboardsCategories.length > 0 ?
                      searchResult.dashboardsCategories
                        .slice(0, maxVisibleCategories)
                        .map((category, i) => (
                          <CategoryChip
                            onClick={() => handleChangeActiveStatusCategory(category.id)}
                            key={i}
                            categoryColor={category.active ? category.color : theme.palette.background.default}
                            sx={{
                              '&:hover': {
                                background: category.active ? `${category.color}99` : theme.palette.background.paper
                              }
                            }}
                            label={
                              <Typography
                                variant='caption'
                                color={getContrastColor(category.active ? category.color : theme.palette.background.default)}
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

                  {searchResult.dashboardsCategories.length > 10 && (
                    <Box mt={0.5}>
                      <Tooltip title='Menos' placement='bottom-end'>
                        <IconButton
                          size='small'
                          disabled={maxVisibleCategories <= 10}
                          onClick={() => handleChangeMaxVisibleCategories('-')}
                        >
                          <KeyboardArrowUpIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Mínimo' placement='bottom'>
                        <IconButton
                          size='small'
                          disabled={maxVisibleCategories <= 10}
                          onClick={() => handleChangeMaxVisibleCategories('--')}
                        >
                          <KeyboardDoubleArrowUpIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Mais' placement='bottom'>
                        <IconButton
                          size='small'
                          disabled={maxVisibleCategories >= searchResult.dashboardsCategories.length}
                          onClick={() => handleChangeMaxVisibleCategories('+')}
                        >
                          <KeyboardArrowDownIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Todos' placement='bottom'>
                        <IconButton
                          size='small'
                          disabled={maxVisibleCategories >= searchResult.dashboardsCategories.length}
                          onClick={() => handleChangeMaxVisibleCategories('++')}
                        >
                          <KeyboardDoubleArrowDownIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                </Collapse>
              </Box>

              <Box>
                <Box display='flex' alignItems='center' mb={0.5} gap={0.5}>
                  <Typography variant='body2' color='text.primary'>
                    Dashboards ({searchResult.dashboard.length})
                  </Typography>
                  <IconButton
                    size='small'
                    onClick={() => handleChangeOpenDashboardsCollapse(!openDashboardsCollapse)}
                  >
                    {openDashboardsCollapse ?
                      <KeyboardArrowUpIcon sx={{ fontSize: '1rem', color: 'text.primary' }} /> :
                      <KeyboardArrowDownIcon sx={{ fontSize: '1rem', color: 'text.primary' }} />
                    }
                  </IconButton>
                </Box>
                <Collapse in={openDashboardsCollapse} timeout="auto" unmountOnExit>
                  {searchResult.dashboard.length > 0 ? (
                    <List disablePadding>
                      {searchResult.dashboard.map((dashboard, i) => (
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

                      {dashboards.length === 0 && (
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
                      )}
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
