import { Box } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close';

import { IDashboard } from '../../../dtos/dashboard'
import { CloseModalButton, StyledDialog, StyledDialogContent } from './styles'
import { SlideUpTransition } from '../../../shared/styles/transitions';

type Props = {
  open: boolean
  handleChangeOpen: (newValue: number | undefined) => void
  component: IDashboard
}

export const ModalFullScreen = ({ open, handleChangeOpen, component }: Props) => {
  const handleClose = () => {
    handleChangeOpen(undefined)
  }

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth='xl'
      TransitionComponent={SlideUpTransition}
    >
      <StyledDialogContent>
        <Box>
          {component.content}

          <CloseModalButton onClick={handleClose}>
            <CloseIcon />
          </CloseModalButton>
        </Box>
      </StyledDialogContent>
    </StyledDialog>
  )
}
