import { Typography } from "@mui/material"

import CloseIcon from '@mui/icons-material/Close';

import { SlideUpTransition } from "../../../shared/styles/transitions";
import { CloseModalButton, StyledDialog, StyledDialogTitle } from "./styles";

type Props = {
  open: boolean
  handleChangeOpen: (newValue: boolean) => void
}

export const ModalAddComponent = ({ open, handleChangeOpen }: Props) => {
  const handleClose = () => {
    handleChangeOpen(false)
  }

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth='xl'
      TransitionComponent={SlideUpTransition}
    >
      <StyledDialogTitle>
        <Typography
          variant="h4"
          fontWeight='bold'
        >Adionar componente</Typography>

        <CloseModalButton onClick={handleClose}>
          <CloseIcon />
        </CloseModalButton>
      </StyledDialogTitle>
    </StyledDialog>
  )
}
