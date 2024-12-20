import { Box } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close';

import { CloseModalButton } from './styles'
import { SlideUpTransition } from '../../../shared/styles/transitions';
import { IComponent } from '../../../shared/dtos/components';
import { VDialog } from '../../../shared/components';

type Props = {
  open: boolean
  handleChangeOpen: (newValue: number | undefined) => void
  component: IComponent
}

export const ModalFullScreen = ({ open, handleChangeOpen, component }: Props) => {
  const handleClose = () => {
    handleChangeOpen(undefined)
  }

  return (
    <VDialog
      open={open}
      handleClose={handleClose}
      fullWidth
      maxWidth='xl'
      TransitionComponent={SlideUpTransition}
    >
      <Box height='86vh'>
        {/* {component.content} */}

        <CloseModalButton onClick={handleClose}>
          <CloseIcon />
        </CloseModalButton>
      </Box>
    </VDialog>
  )
}
