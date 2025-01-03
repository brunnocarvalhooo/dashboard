import { Box, IconButton, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { useAppTheme } from "../../../contexts/theme"
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md"
import { useState } from "react"
import { FaCircle } from "react-icons/fa"
import { CirclePicker } from 'react-color'
import { StyledMenu } from "../../interface/menu/styles"
import { CloseIconButton } from "../../interface/icon-button/CloseIconButton"
import { appColors } from "../../../hooks/theme/styles"

export const CustomizeContent = () => {
  const { themeName, toggleTheme, primaryColor, changePrimaryColor } = useAppTheme()

  const handleColorChange = (color: { hex: string }) => {
    changePrimaryColor(color.hex)
  }

  const [anchorElSelectColor, setAnchorElSelectColor] = useState<null | HTMLElement>(null)
  const openSelectColor = Boolean(anchorElSelectColor)
  const handleClickSelectColor = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSelectColor(event.currentTarget)
  }
  const handleCloseSelectColor = () => {
    setAnchorElSelectColor(null)
  }

  return (
    <Box p={1}>
      <Typography
        variant='body2'
        color='text.primary'
        mb={1}
      >
        Customização
      </Typography>

      <Box display='flex' alignItems='center' gap={2} mt={2} mb={1}>
        <Typography
          variant='body2'
        >
          Cor
        </Typography>

        <IconButton
          id="select-color-buttom"
          aria-controls={openSelectColor ? 'select-color-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openSelectColor ? 'true' : undefined}
          onClick={handleClickSelectColor}
          size="small"
        >
          <FaCircle color={primaryColor} />
        </IconButton>

        <StyledMenu
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
          <Box display='flex' alignItems='center' p={1.5}>
            <CirclePicker
              color={primaryColor}
              onChange={handleColorChange}
              colors={Object.values(appColors)}
            />

            <CloseIconButton onClick={handleCloseSelectColor} />
          </Box>
        </StyledMenu>
      </Box>

      <Box display='flex' alignItems='center' gap={2}>
        <Typography
          variant='body2'
        >
          Tema
        </Typography>

        <ToggleButtonGroup
          size="small"
          value={themeName}
          exclusive
          onChange={(_, newValue: "light" | "dark") => {
            if (newValue && newValue !== themeName) toggleTheme()
          }}
          aria-label="text alignment"
        >
          <ToggleButton value="light">
            <MdOutlineLightMode />
          </ToggleButton>
          <ToggleButton value="dark">
            <MdOutlineDarkMode />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  )
}
