import { StyledDashboardComponent, DashboardContainer, Container, RollUpButton, slideInUp, slideOutDown, ActionsSpeedDial, HeaderContainer, FullScreenButton, CategoriesContainer, rollUpColors } from "./styles"
import { Box, Chip, SpeedDialAction, SpeedDialIcon, TextField, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useEffect, useMemo, useState } from "react"

import FullscreenIcon from '@mui/icons-material/Fullscreen'
import TransformIcon from '@mui/icons-material/Transform'
import AddchartIcon from '@mui/icons-material/Addchart'
import SettingsIcon from '@mui/icons-material/Settings'
import NorthIcon from '@mui/icons-material/North'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'

import { CATEGORY_CHIP_MB } from "../shared/components/interface/chip/category-chip/styles"
import { CategoryChip } from "../shared/components/interface/chip/category-chip/CategoryChip"
import { ModalAddComponent } from "./components/modal-add-component/ModalAddComponent"
import { DemensionsButtons } from "./parts/demensions-buttons/DemensionsButtons"
import { ModalFullScreen } from "./components/modal-full-screen/ModalFullScreen"
import { EmptyComponents } from "./parts/empty-components/EmptyComponents"
import { useDashboards } from "../shared/contexts/dashboards"
import { getContrastColor } from "../shared/utils/masks"
import { useDrawer } from "../shared/contexts/drawer"
import { EmptyDashboards, VIconButton } from "../shared/components"
import { Footer } from "./parts/footer/Footer"
import { IoMdSearch } from "react-icons/io"
import { ModalManageComponentCategories } from "./components/modal-manage-component-categories/ModalManageComponentCategories"

export const Dashboard = () => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'))

  const { isDrawerOpen, toggleDrawerOpen } = useDrawer()

  const { currentDashboard } = useDashboards()

  const dashboardComponentHeight = useMemo(() => {
    const percentages = { sm: 10, md: 15, lg: 20, default: 30 }

    if (smDown) {
      return (window.innerHeight * percentages.sm) / 100
    } else if (mdDown) {
      return (window.innerHeight * percentages.md) / 100
    } else if (lgDown) {
      return (window.innerHeight * percentages.lg) / 100
    }

    return (window.innerHeight * percentages.default) / 100
  }, [lgDown, mdDown, smDown])

  const [searching, setSearching] = useState(false)

  const [openAddComponentModal, setOpenAddComponentModal] = useState(false)
  const handleChangeOpenAddComponentModal = (newValue: boolean) => {
    setOpenAddComponentModal(newValue)
  }

  const [openManageComponentsCayegories, setOpenManageComponentsCayegories] = useState(false)
  const handleChangeOpenManageComponentsCayegories = (newValue: boolean) => {
    setOpenManageComponentsCayegories(newValue)
  }

  const [openFullScreenModal, setOpenFullScreenModal] = useState<string | undefined>(undefined)
  const handleChangeOpenFullScreenModal = (newValue: string | undefined) => {
    setOpenFullScreenModal(newValue)
  }

  const [dimensionsMode, setDimensionsMode] = useState(false)
  const handleChangeDimensionsMode = () => {
    setDimensionsMode((prev) => !prev)
  }

  const [isRollUpButtonVisible, setIsRollUpButtonVisible] = useState(false)
  const [rollUpColor, setRollUpColor] = useState<string>(rollUpColors.BLUE)

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleScroll = () => {
    const scrollTop = window.scrollY
    const scrollTrigger = 100
    setIsRollUpButtonVisible(scrollTop > scrollTrigger)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const colors = Object.values(rollUpColors)
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    setRollUpColor(randomColor)
  }, [isRollUpButtonVisible])

  const speedDialActions = [
    {
      icon: <AddchartIcon fontSize="small" />,
      name: 'Adicionar componente',
      onClick: () => handleChangeOpenAddComponentModal(true)
    },
    ...(currentDashboard && currentDashboard.components.length > 0 ?
      [
        {
          icon: dimensionsMode ? <CloseIcon fontSize="small" /> : <TransformIcon fontSize="small" />,
          name: dimensionsMode ? 'Sair da edição de dimensões' : 'Editar dimensões',
          onClick: () => handleChangeDimensionsMode()
        }
      ] : []
    )
  ]

  return (
    <Container>
      <HeaderContainer>
        <Tooltip title='Menu' placement='bottom-start'>
          <VIconButton
            onClick={() => toggleDrawerOpen(!isDrawerOpen)}
            size='small'
            icon={<MenuIcon sx={{ color: 'text.primary' }} />}
          />
        </Tooltip>

        {currentDashboard && (
          <Typography noWrap color="text.primary">
            {currentDashboard.name}
          </Typography>
        )}
      </HeaderContainer>

      {currentDashboard ? (
        <>
          <CategoriesContainer>
            <Tooltip title={`Gerenciar categorias de ${currentDashboard.name}`} placement="bottom-end">
              <Chip
                size="small"
                onClick={() => handleChangeOpenManageComponentsCayegories(true)}
                label={
                  <Box display='flex' justifyContent='center'>
                    <SettingsIcon sx={{ fontSize: '1rem' }} />
                  </Box>
                }
                sx={{ mb: CATEGORY_CHIP_MB }}
              />
            </Tooltip>

            <ModalManageComponentCategories
              open={openManageComponentsCayegories}
              handleChangeOpen={handleChangeOpenManageComponentsCayegories}
            />

            <Tooltip title={`Pesquisar categorias de ${currentDashboard.name}`} placement="bottom-end">
              <Chip
                size="small"
                onClick={() => !searching && setSearching(true)}
                label={
                  <Box display='flex' justifyContent='flex-end' gap={1} minWidth={searching ? '150px' : '16px'}>
                    <IoMdSearch
                      size={16}
                      style={{ marginTop: searching ? 6.5 : 0 }}
                      onClick={() => setSearching(false)}
                    />

                    {searching && (
                      <TextField
                        size="small"
                        variant="standard"
                        placeholder="Pesquisar..."
                        sx={{
                          minHeight: '2px',
                          '& .MuiInputBase-input': {
                            fontSize: '0.8rem',
                            pt: '6px',

                            '&::placeholder': {
                              fontSize: '0.8rem',
                              pt: '6px',
                            }
                          },
                        }}
                      />
                    )}
                  </Box>
                }
                sx={{ mb: CATEGORY_CHIP_MB }}
              />
            </Tooltip>

            {currentDashboard.categories.map((category, i) => (
              <CategoryChip
                key={i}
                categoryColor={category.color}
                label={
                  <Typography
                    variant="caption"
                    color={getContrastColor(category.color)}
                  >{category.name}</Typography>
                }
                size="small" />
            ))}
          </CategoriesContainer>

          {currentDashboard.components.length > 0 ? (
            <DashboardContainer
              variant="quilted"
              cols={6}
              rowHeight={dashboardComponentHeight}
            >
              {currentDashboard.components.map((component, i) => (
                <StyledDashboardComponent
                  key={i}
                  cols={component.width}
                  rows={component.height}
                  sx={dimensionsMode ? {
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: `${theme.palette.background.paper}95`,
                      zIndex: 3,
                    },
                  } : undefined}
                >
                  {/* {component.content} */}

                  {!dimensionsMode && (
                    <>
                      <FullScreenButton
                        size="small"
                        className="fullscreen-button"
                        onClick={() => setOpenFullScreenModal(component.id)}
                      >
                        <FullscreenIcon fontSize="small" />
                      </FullScreenButton>

                      <ModalFullScreen
                        open={component.id === openFullScreenModal}
                        handleChangeOpen={handleChangeOpenFullScreenModal}
                        component={component}
                      />
                    </>
                  )}

                  {dimensionsMode && <DemensionsButtons component={component} dashboard={currentDashboard} />}
                </StyledDashboardComponent>
              ))}
            </DashboardContainer>
          ) : (
            <EmptyComponents handleChangeOpenAddComponentModal={handleChangeOpenAddComponentModal} />
          )}

          <ActionsSpeedDial
            ariaLabel="Dashboard actions SpeedDial "
            direction="down"
            sx={{ position: 'fixed', top: '12px', right: '16px' }}
            icon={<SpeedDialIcon />}
          >
            {speedDialActions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={action.onClick}
              />
            ))}
          </ActionsSpeedDial>

          <ModalAddComponent
            open={openAddComponentModal}
            handleChangeOpen={handleChangeOpenAddComponentModal}
          />

          {isRollUpButtonVisible && (
            <Tooltip title='Voltar para o topo' placement='top-start'>
              <RollUpButton
                onClick={handleScrollToTop}
                sx={{
                  animation: isRollUpButtonVisible
                    ? `${slideInUp} 0.2s ease`
                    : `${slideOutDown} 0.2s ease`,
                  background: rollUpColor,
                  '&:hover': {
                    background: rollUpColor
                  }
                }}
                icon={<NorthIcon />}
              />
            </Tooltip>
          )}
        </>
      ) : (
        <Box height='100vh' pb={16}>
          <EmptyDashboards />
        </Box>
      )}

      <Footer />
    </Container>
  )
}
