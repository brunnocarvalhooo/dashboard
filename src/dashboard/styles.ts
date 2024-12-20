import { Box, IconButton, ImageList, ImageListItem, keyframes, SpeedDial, styled } from "@mui/material";
import { VIconButton } from "../shared/components";
import { borderColor } from "../shared/components/interface/dialog/styles";

export const Container = styled(Box)(() => ({
  paddingBlock: '84px',
  paddingInline: '4px',
  position: 'relative'
}))

export const DashboardContainer = styled(ImageList)(() => ({

}))

export const StyledDashboardComponent = styled(ImageListItem)(({ theme }) => ({
  background: theme.palette.background.paper,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  borderRadius: '12px',
  border: '1px solid',
  borderColor: 'rgba(0, 0, 0, 0.05)',
  overflow: 'hidden',

  '&:hover': {
    '& .fullscreen-button': {
      opacity: 1,
    },
  },

  '& .MuiImageListItem-root': {
    borderRadius: '12px',
  }
}));

export const DimensionModeButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  top: '20px',
  right: '20px',
  zIndex: 999,
  background: theme.palette.primary.main,
  transition: 'all ease 0.1s',
  color: 'white',

  '&:hover': {
    background: theme.palette.primary.dark
  }
}))

export const slideInUp = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`

export const slideOutDown = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
`

export const RollUpButton = styled(VIconButton)(() => ({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  zIndex: 999,
  color: 'white',
}))

export const ActionsSpeedDial = styled(SpeedDial)(({ theme }) => ({
  zIndex: 99,

  '& .MuiSpeedDial-fab': {
    color: theme.palette.primary.contrastText,
    boxShadow: 'none',
    background: theme.palette.background.paper,
    border: '1px solid',
    borderColor: borderColor(theme.palette.mode),

    '&:hover': {
      background: theme.palette.background.paper,
    }
  },

  '& .MuiSpeedDialAction-fab': {
    color: theme.palette.primary.contrastText,
    boxShadow: 'none',
    background: theme.palette.background.paper,
    border: '1px solid',
    borderColor: borderColor(theme.palette.mode),
  },
}))

export const HEADER_HEIGHT = '48px'

export const HeaderContainer = styled(Box)(() => ({
  width: 'calc(100vw - 80px)',
  height: HEADER_HEIGHT,
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  paddingLeft: '8px',
}))

export const FullScreenButton = styled(IconButton)(() => ({
  position: 'absolute',
  top: '4px',
  left: '4px',
  opacity: 0,
  zIndex: 2,
  transition: 'opacity 0.3s ease',
}));

export const CategoriesContainer = styled(Box)(({ theme }) => ({
  overflow: 'auto',
  width: 'calc(100vw - 90px)',
  position: 'absolute',
  top: HEADER_HEIGHT,
  left: '8px',
  display: 'flex',
  alignSelf: 'center',
  gap: '8px',

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
