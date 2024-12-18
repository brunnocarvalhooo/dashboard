import { Box, IconButton, ImageList, ImageListItem, keyframes, SpeedDial, styled } from "@mui/material";
import { VIconButton } from "../shared/components";

export const Container = styled(Box)(() => ({
  paddingBlock: '80px',
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

export const ActionsSpeedDial = styled(SpeedDial)(() => ({
  zIndex: 99,

  '& .MuiSpeedDial-fab': {
    color: 'white',
    // width: '34px',
    // height: '34px',
    boxShadow: 'none'
  },

  '& .MuiSpeedDialAction-fab': {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
  },
}))

export const HeaderContainer = styled(Box)(() => ({
  width: 'calc(100vw - 100px)',
  height: '60px',
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  paddingLeft: '16px',
}))

export const FullScreenButton = styled(IconButton)(() => ({
  position: 'absolute',
  top: '4px',
  left: '4px',
  opacity: 0,
  zIndex: 2,
  transition: 'opacity 0.3s ease',
}));
