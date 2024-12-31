import { Box, TextField, Typography } from "@mui/material"

import { VDialog } from "../../interface/dialog"
import { VButton } from "../../interface"
import { useState } from "react"
import { storage } from "../../../../models"
import { useDashboards } from "../../../contexts/dashboards"
import { useDrawer } from "../../../contexts/drawer"
import { REQUIRED_ERROR } from "../../../utils/validation-errors"

type Props = {
  open: boolean,
  handleChangeOpen: (newValue: boolean) => void
}

export const ModalAddDashboard = ({ open, handleChangeOpen }: Props) => {
  const { fetchDashboards, handleChangeCurrentDashboard } = useDashboards()

  const { toggleDrawerOpen } = useDrawer()

  const [name, setName] = useState({
    state: '',
    error: ''
  })

  const handleClose = () => {
    handleChangeOpen(false)

    setTimeout(() => {
      setName({
        error: '',
        state: '',
      })
    }, 1000)
  }

  const handleCreateDashboard = () => {
    if (!name.state) {
      setName((prev) => ({
        ...prev,
        error: REQUIRED_ERROR
      }))
      return
    }

    try {
      const newDashboardId = storage.dashboards.create(name.state)

      fetchDashboards()

      const newDashboard = storage.dashboards.get(newDashboardId)

      toggleDrawerOpen(false)

      if (newDashboard) handleChangeCurrentDashboard(() => newDashboard)

      handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <VDialog
      open={open}
      handleClose={handleClose}
      summary={
        <Typography color="text.primary">Criar novo dashboard</Typography>
      }
      actions={
        <VButton
          onClick={handleCreateDashboard}
          size="small"
          color="primary"
          variant="contained"
          label={
            <Typography
              textTransform='capitalize'
              color="white"
            >Criar</Typography>
          }
        />
      }
    >
      <Box width='100%' mb={2} mt={3}>
        <TextField
          error={!!name.error}
          helperText={name.error}
          value={name.state}
          onChange={(e) => setName((prev) => ({
            ...prev,
            state: e.target.value,
            error: prev.error ? '' : prev.error,
          }))}
          variant="standard"
          size="small"
          placeholder='Nome'
          fullWidth
        />
      </Box>
    </VDialog>
  )
}
