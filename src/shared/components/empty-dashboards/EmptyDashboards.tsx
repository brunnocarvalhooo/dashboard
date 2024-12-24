import { Button, Typography } from "@mui/material"
import { useState } from "react"

import { ModalAddDashboard } from "../modal-add-dashboard/ModalAddDashboard"
import { EmptyContainer } from "."

export const EmptyDashboards = () => {
  const [openModalAddComponent, setOpenModalAddComponent] = useState(false)
  const handleChangeOpenModalAddComponent = (newValue: boolean) => {
    setOpenModalAddComponent(newValue)
  }

  return (
    <>
      <EmptyContainer>
        <Typography>Nenhum dashboard disponível no momento</Typography>
        <Button>Clique aqui para criar um novo dashboard</Button>

      </EmptyContainer>

      <ModalAddDashboard open={openModalAddComponent} handleChangeOpen={handleChangeOpenModalAddComponent} />
    </>
  )
}
