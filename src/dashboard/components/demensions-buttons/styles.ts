import { Box, Button, styled } from "@mui/material";
import { borderColor } from "../../../shared/components/interface/dialog/styles";

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

export const DimensionButton = styled(Button)(({ theme }) => ({
  height: '22px',
  minWidth: '32px',
  borderColor: borderColor(theme.palette.mode),
  color: 'white'
}))