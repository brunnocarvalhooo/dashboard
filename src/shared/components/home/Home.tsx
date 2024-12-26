import { Button, Typography } from "@mui/material"
import { useState } from "react"

import { ModalAddDashboard } from "../modal-add-dashboard/ModalAddDashboard"
import { CreateDashboardButtonLabel, EmptyContainer } from "."

export const EmptyDashboards = () => {
  const [openModalAddComponent, setOpenModalAddComponent] = useState(false)
  const handleChangeOpenModalAddComponent = (newValue: boolean) => {
    setOpenModalAddComponent(newValue)
  }

  return (
    <>
      <EmptyContainer>
        <Typography
          variant="h6"
          color="text.secondary"
        >
          Bem vindo ao Dashboard
        </Typography>

        <Button onClick={() => handleChangeOpenModalAddComponent(true)}>
          <CreateDashboardButtonLabel
            variant="caption"
            textTransform='none'
            textAlign='left'
          >Clique aqui para criar um novo dashboard</CreateDashboardButtonLabel>
        </Button>

      </EmptyContainer>

      <ModalAddDashboard open={openModalAddComponent} handleChangeOpen={handleChangeOpenModalAddComponent} />
    </>
  )
}
