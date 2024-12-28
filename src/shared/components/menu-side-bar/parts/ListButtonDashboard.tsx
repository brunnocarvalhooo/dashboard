import { Box, ListItemText, Typography, useTheme } from "@mui/material"
import { StyledListItemButton } from "../styles"
import { VIconButton } from "../../interface"
import { SlOptionsVertical } from "react-icons/sl"
import { VMenu } from "../../interface/menu"
import { useCallback, useState } from "react"
import { ILSDashboard } from "../../../../models/dashboard.model"
import { FiTrash } from "react-icons/fi"
import { storage } from "../../../../models"
import { useDashboards } from "../../../contexts/dashboards"
import { ConfirmAction } from "../../interface/dialog/ConfirmAction"

type Props = {
  dashboard: ILSDashboard
  handleSelectDashboard: (id_dashboard: number) => void
}

export const ListButtonDashboard = ({ dashboard, handleSelectDashboard }: Props) => {
  const theme = useTheme()

  const { fetchDashboards, currentDashboard, handleChangeCurrentDashboard } = useDashboards()

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
  const handleChangeOpenConfirmDelete = (newValue: boolean) => {
    setOpenConfirmDelete(newValue)
  }

  const [anchorElDashboardOptions, setAnchorElDashboardOptions] = useState<null | HTMLElement>(null)
  const openDashboardOptions = Boolean(anchorElDashboardOptions)
  const handleClickDashboardOptions = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElDashboardOptions(event.currentTarget)
  }
  const handleCloseDashboardOptions = () => {
    setAnchorElDashboardOptions(null)
  }

  const handleDeleteDashboard = useCallback(() => {
    try {
      storage.dashboards.delete(dashboard.id)

      fetchDashboards()

      if (currentDashboard && currentDashboard?.id === dashboard.id) {
        handleChangeCurrentDashboard(() => undefined)
      }

      handleCloseDashboardOptions()
      handleChangeOpenConfirmDelete(false)
    } catch (error) {
      console.log(error)
    }
  }, [currentDashboard, dashboard.id, fetchDashboards, handleChangeCurrentDashboard])

  return (
    <Box
      display="flex"
      alignItems="center"
    >
      <StyledListItemButton
        onClick={() => handleSelectDashboard(dashboard.id)}
      >
        <ListItemText
          primary={
            <Box>
              <Typography
                color="text.primary"
                variant="body2"
                noWrap
                flex={1}
              >
                {dashboard.name}
              </Typography>
            </Box>
          }
        />
      </StyledListItemButton>

      <VIconButton
        id="demo-positioned-button"
        aria-controls={openDashboardOptions ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openDashboardOptions ? 'true' : undefined}
        onClick={handleClickDashboardOptions}
        sx={{ height: '38px', }}
        icon={
          <SlOptionsVertical
            size={14}
            color={theme.palette.text.secondary}
          />
        }
      />

      <VMenu
        menuProps={{
          anchorEl: anchorElDashboardOptions,
          open: openDashboardOptions
        }}
        handleClose={handleCloseDashboardOptions}
        items={[
          {
            label: 'Exluir',
            onClick: () => handleChangeOpenConfirmDelete(true),
            icon: <FiTrash size={14} color={theme.palette.error.main} style={{ marginBottom: '4px' }} />,
            labelColor: "error.main"
          }
        ]}
      />

      <ConfirmAction
        handleClose={() => handleChangeOpenConfirmDelete(false)}
        labelConfirmButton="Deletar"
        open={openConfirmDelete}
        title="Excluir dashboard?"
        subtitle={`Isso ira excluir o dashboard (${dashboard.name}) permanentemente`}
        onClickConfirmButton={handleDeleteDashboard}
      />
    </Box>
  )
}
