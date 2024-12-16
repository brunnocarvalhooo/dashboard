import { Box, Button, styled } from "@mui/material";

export const rotateStyle = {
  writingMode: 'vertical-lr',
  transform: 'rotate(90deg)',
};

export const DimensionsButtonsContainer = styled(Box)(() => ({
  position: 'absolute',
  zIndex: 4,
  display: 'flex',
  gap: '8px'
}))

export const DimensionButton = styled(Button)(() => ({
  height: '26px',
  minWidth: '32px'
}))