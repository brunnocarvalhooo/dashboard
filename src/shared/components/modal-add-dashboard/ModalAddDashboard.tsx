import { Box, TextField, Typography } from "@mui/material"

import { VDialog } from "../interface/dialog"
import { VButton } from "../interface"
import { useState } from "react"
import { Dashboard } from "../../../models/local-strorage/dashboards"
import { storage } from "../../../models"
import { useDashboards } from "../../contexts/dashboards"
import { useDrawer } from "../../contexts/drawer"

type Props = {
  open: boolean,
  handleChangeOpen: (newValue: boolean) => void
}

export const ModalAddDashboard = ({ open, handleChangeOpen }: Props) => {
  const { fetchDashboards, handleChangeCurrentDashboard } = useDashboards()

  const { toggleDrawerOpen } = useDrawer()

  const [name, setName] = useState('')

  const handleClose = () => {
    handleChangeOpen(false)

    setTimeout(() => {
      setName('')
    }, 1000)
    setName('')
  }

  const handleCreateDashboard = () => {
    try {
      const dashboard = new Dashboard(storage)

      const newDashboardId = dashboard.create(name)

      fetchDashboards()

      const newDashboard = dashboard.get(newDashboardId)

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
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="standard"
          size="small"
          placeholder='Nome'
          fullWidth
        />
      </Box>
    </VDialog>
  )
}
