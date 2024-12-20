import { StyledDashboardComponent, DashboardContainer, Container, RollUpButton, slideInUp, slideOutDown, ActionsSpeedDial, HeaderContainer, FullScreenButton, CategoriesContainer } from "./styles";
import { Chip, SpeedDialAction, SpeedDialIcon, Tooltip, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

import TransformIcon from '@mui/icons-material/Transform';
import NorthIcon from '@mui/icons-material/North';
import AddchartIcon from '@mui/icons-material/Addchart';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

import { DemensionsButtons } from "./components/demensions-buttons/DemensionsButtons";
import { EmptyComponents } from "./components/empty-components/EmptyComponents";
import { ModalFullScreen } from "./components/modal-full-screen/ModalFullScreen";
import { ModalAddComponent } from "./components/modal-add-component/ModalAddComponent";
import { useDrawer } from "../shared/contexts/drawer";
import { VIconButton } from "../shared/components";
import { useDashboards } from "../shared/contexts/dashboards";
import { IDashboard } from "../shared/dtos/dashboard";

enum rollUpColors {
  BLUE = '#0597F2',
  GREEN = '#49D907',
  YELLOW = '#e0e706',
  RED = '#F24607',
  PURPLE = '#970FF2',
}

export const Dashboard = () => {
  const theme = useTheme()

  const { isDrawerOpen, toggleDrawerOpen } = useDrawer()

  const { dashboards } = useDashboards()

  const [currentDashboard, setCurrentDashboard] = useState<IDashboard>(dashboards[0])

  const [openAddComponentModal, setOpenAddComponentModal] = useState(false)
  const handleChangeOpenAddComponentModal = (newValue: boolean) => {
    setOpenAddComponentModal(newValue)
  }

  const [openFullScreenModal, setOpenFullScreenModal] = useState<number | undefined>(undefined)
  const handleChangeOpenFullScreenModal = (newValue: number | undefined) => {
    setOpenFullScreenModal(newValue)
  }

  const [dimensionsMode, setDimensionsMode] = useState(false)
  const handleChangeDimensionsMode = () => {
    setDimensionsMode((prev) => !prev)
  }

  const [isRollUpButtonVisible, setIsRollUpButtonVisible] = useState(false)
  const [rollUpColor, setRollUpColor] = useState<string>(rollUpColors.BLUE)

  console.log(isRollUpButtonVisible)

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
      icon: dimensionsMode ? <CloseIcon fontSize="small" /> : <TransformIcon fontSize="small" />,
      name: dimensionsMode ? 'Sair da edição de dimensões' : 'Editar dimensões',
      onClick: () => handleChangeDimensionsMode()
    },
    {
      icon: <AddchartIcon fontSize="small" />,
      name: 'Adicionar componente',
      onClick: () => handleChangeOpenAddComponentModal(true)
    },
  ];

  return (
    <Container>
      <HeaderContainer>
        <Tooltip title='Menu' placement='bottom-start'>
          <VIconButton onClick={() => toggleDrawerOpen(!isDrawerOpen)} size='small' icon={<MenuIcon />} />
        </Tooltip>

        <Typography noWrap color="text.primary">
          Teste de titulo de DASHBOARD
        </Typography>
      </HeaderContainer>

      <CategoriesContainer>
        <Chip label={<Typography variant="caption">teste</Typography>} size="small" />
        <Chip label={<Typography variant="caption">teste</Typography>} size="small" />
        <Chip label={<Typography variant="caption">teste</Typography>} size="small" />
        <Chip label={<Typography variant="caption">teste</Typography>} size="small" />
        <Chip label={<Typography variant="caption">teste</Typography>} size="small" />
        <Chip label={<Typography variant="caption">teste</Typography>} size="small" />
        <Chip label={<Typography variant="caption">teste</Typography>} size="small" />
        <Chip label={<Typography variant="caption">teste</Typography>} size="small" />
      </CategoriesContainer>

      {currentDashboard.components.length > 0 ? (
        <DashboardContainer
          variant="quilted"
          cols={6}
          rowHeight={window.innerHeight / 100 * 30} /* 30vh */
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
        sx={{ position: 'fixed', top: '12px', right: '12px' }}
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
    </Container>
  );
}
