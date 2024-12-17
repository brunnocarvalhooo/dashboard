import { StyledDashboardComponent, DashboardContainer, Container, RollUpButton, slideInUp, slideOutDown, ActionsSpeedDial, HeaderContainer, MenuButton, FullScreenButton } from "./styles";
import { SpeedDialAction, SpeedDialIcon, Tooltip, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

import TransformIcon from '@mui/icons-material/Transform';
import NorthIcon from '@mui/icons-material/North';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddchartIcon from '@mui/icons-material/Addchart';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CloseIcon from '@mui/icons-material/Close';

import { DemensionsButtons } from "./components/demensions-buttons/DemensionsButtons";
import { IDashboard } from "../dtos/dashboard";
import { EmptyComponents } from "./components/empty-components/EmptyComponents";
import { ModalFullScreen } from "./components/modal-full-screen/ModalFullScreen";
import { ModalAddComponent } from "./components/modal-add-component/ModalAddComponent";

const dashboardData: IDashboard[] = [
  {
    id: 1,
    width: 2,
    height: 1,
    content: <Typography>teste1</Typography>,
  },
  {
    id: 2,
    width: 4,
    height: 1,
    content: <Typography>teste2</Typography>,
  },
  {
    id: 3,
    width: 1,
    height: 1,
    content: <Typography>teste3</Typography>,
  },
  {
    id: 4,
    width: 3,
    height: 1,
    content: <Typography>teste4</Typography>,
  },
  {
    id: 5,
    width: 2,
    height: 1,
    content: <Typography>teste5</Typography>,
  },
  {
    id: 6,
    width: 6,
    height: 1,
    content: <Typography>teste5</Typography>,
  },
];

enum rollUpColors {
  BLUE = '#0597F2',
  GREEN = '#49D907',
  YELLOW = '#e0e706',
  RED = '#F24607',
  PURPLE = '#970FF2',
}

export const Dashboard = () => {
  const theme = useTheme()

  const [openAddComponentModal, setOpenAddComponentModal] = useState(false)
  const handleChangeOpenAddComponentModal = (newValue: boolean) => {
    setOpenAddComponentModal(newValue)
  }

  const [openFullScreenModal, setOpenFullScreenModal] = useState<number | undefined>(undefined)
  const handleChangeOpenFullScreenModal = (newValue: number | undefined) => {
    setOpenFullScreenModal(newValue)
  }

  const [dashboard, setDashboard] = useState<IDashboard[]>(dashboardData)
  const handleChangeDashboard = (updateFn: (prevRows: IDashboard[]) => IDashboard[]) => {
    setDashboard((prev) => {
      const updatedReserves = updateFn(prev)
      return prev === updatedReserves
        ? prev
        : updatedReserves
    })
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
      icon: dimensionsMode ? <CloseIcon /> : <TransformIcon />,
      name: dimensionsMode ? 'Sair da edição de dimensões' : 'Editar dimensões',
      onClick: () => handleChangeDimensionsMode()
    },
    {
      icon: <AddchartIcon />,
      name: 'Adicionar componente',
      onClick: () => handleChangeOpenAddComponentModal(true)
    },
  ];

  return (
    <Container>
      <HeaderContainer>
        <Tooltip title='Menu' placement='bottom-start'>
          <MenuButton>
            <ArrowForwardIosIcon />
          </MenuButton>
        </Tooltip>

        <Typography variant="h4" fontWeight='bold' noWrap>
          Teste de titulo de DASHBOARD
        </Typography>
      </HeaderContainer>

      {dashboard.length > 0 ? (
        <DashboardContainer
          variant="quilted"
          cols={6}
          rowHeight={window.innerHeight / 100 * 30} /* 30vh */
        >
          {dashboard.map((component, i) => (
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
                  backgroundColor: `${theme.palette.grey[100]}95`,
                  zIndex: 3,
                },
              } : undefined}
            >
              {component.content}

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

              {dimensionsMode && <DemensionsButtons component={component} handleChangeDashboard={handleChangeDashboard} />}
            </StyledDashboardComponent>
          ))}
        </DashboardContainer>
      ) : (
        <EmptyComponents handleChangeOpenAddComponentModal={handleChangeOpenAddComponentModal} />
      )}

      <ActionsSpeedDial
        ariaLabel="Dashboard actions SpeedDial "
        direction="down"
        sx={{ position: 'fixed', top: '20px', right: '20px' }}
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
          >
            <NorthIcon />
          </RollUpButton>
        </Tooltip>
      )}
    </Container>
  );
}
