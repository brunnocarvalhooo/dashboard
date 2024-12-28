import { Box, IconButton, Menu, TextField, Typography } from "@mui/material"
import { VButton, VDialog } from "../../interface"
import { SketchPicker } from 'react-color'
import { useState } from "react"
import { FaCircle } from "react-icons/fa"

type Props = {
  open: boolean
  handleChangeOpen: (newValue: boolean) => void
}

export const ModalManageDashboardCategories = ({ open, handleChangeOpen }: Props) => {
  const [anchorElSelectColor, setAnchorElSelectColor] = useState<null | HTMLElement>(null)
  const openSelectColor = Boolean(anchorElSelectColor)
  const handleClickSelectColor = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSelectColor(event.currentTarget)
  }
  const handleCloseSelectColor = () => {
    setAnchorElSelectColor(null)
  }

  const [color, setColor] = useState('#000000')
  const handleColorChange = (color: { hex: string }) => {
    setColor(color.hex)
  }

  const handleClose = () => {
    handleChangeOpen(false)
  }

  return (
    <VDialog
      open={open}
      handleClose={handleClose}
      summary={
        <Typography color="text.primary">Categorias de dashboard</Typography>
      }
      actions={
        <Box width='100%' display='flex' alignItems='center' gap={1}>
          <Box display='flex' alignItems='center' gap={0.5}>
            <IconButton
              id="select-color-buttom"
              aria-controls={openSelectColor ? 'select-color-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openSelectColor ? 'true' : undefined}
              onClick={handleClickSelectColor}
            >
              <FaCircle color={color} />
            </IconButton>

            <Menu
              id="select-color-menu"
              aria-labelledby="select-color-buttom"
              anchorEl={anchorElSelectColor}
              open={openSelectColor}
              onClose={handleCloseSelectColor}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              sx={{
                '& .MuiMenu-list': {
                  paddingTop: '0px',
                  paddingBottom: '0px'
                },
              }}
            >
              <Box>
                <SketchPicker color={color} onChange={handleColorChange} />
              </Box>
            </Menu>

            <TextField size="small" variant="standard" sx={{ pt: 0.5 }} />
          </Box>

          <VButton
            size="small"
            variant="contained"
            color="primary"
            label={
              <Typography
                color='white'
                textTransform='capitalize'
              >Criar</Typography>
            }
          />
        </Box>
      }
    >
      <Box my={2}>
        <Typography>oi</Typography>
      </Box>
    </VDialog>
  )
}
