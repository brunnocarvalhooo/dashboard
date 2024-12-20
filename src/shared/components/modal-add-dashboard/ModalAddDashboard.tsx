import { Box, TextField, Typography } from "@mui/material"

import { VDialog } from "../interface/dialog"
import { VButton } from "../interface"

type Props = {
  open: boolean,
  handleChangeOpen: (newValue: boolean) => void
}

export const ModalAddDashboard = ({ open, handleChangeOpen }: Props) => {
  const handleClose = () => {
    handleChangeOpen(false)
  }

  return (
    <VDialog
      open={open}
      handleClose={handleClose}
      summary={
        <Typography>Criar novo dashboard</Typography>
      }
      actions={
        <VButton
          size="small"
          color="primary"
          variant="contained"
          label={
            <Typography
              textTransform='capitalize'
              color="white"
              fontWeight='bold'
            >Criar</Typography>
          }
        />
      }
    >
      <Box width='100%' mb={2} mt={3}>
        <TextField
          size="small"
          label='Nome'
          fullWidth
        />
      </Box>
    </VDialog>
  )
}
