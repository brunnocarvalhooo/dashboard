import { Typography } from "@mui/material"

import { VDialog } from "../../../shared/components"

type Props = {
  open: boolean
  handleChangeOpen: (newValue: boolean) => void
}

export const ModalAddComponent = ({ open, handleChangeOpen }: Props) => {
  const handleClose = () => {
    handleChangeOpen(false)
  }

  return (
    <VDialog
      open={open}
      handleClose={handleClose}
      fullWidth
      maxWidth='xl'
      summary={
        <Typography
          color="text.primary"
        >Adicionar componente</Typography>
      }
    >
      <Typography>oi</Typography>
    </VDialog>
  )
}
