import { Tooltip, Typography } from "@mui/material"
import { useState } from "react"

import { ModalAddDashboard } from "../menu-side-bar/components/ModalAddDashboard"
import { AddDashboardButton, EmptyContainer } from "./styles"

import { GoPlus } from "react-icons/go";

export const EmptyDashboards = () => {
  const [openModalAddComponent, setOpenModalAddComponent] = useState(false)
  const handleChangeOpenModalAddComponent = (newValue: boolean) => {
    setOpenModalAddComponent(newValue)
  }

  return (
    <>
      <EmptyContainer>
        <Typography
          variant="h4"
          fontWeight='bold'
          color="primary.main"
          textAlign='center'
        >
          Bem vindo ao Dashboard
        </Typography>

        <Tooltip title='Criar novo dashboard' placement="bottom">

          <AddDashboardButton
            onClick={() => handleChangeOpenModalAddComponent(true)}
          >
            <GoPlus />
          </AddDashboardButton>
        </Tooltip>


      </EmptyContainer>

      <ModalAddDashboard open={openModalAddComponent} handleChangeOpen={handleChangeOpenModalAddComponent} />
    </>
  )
}
