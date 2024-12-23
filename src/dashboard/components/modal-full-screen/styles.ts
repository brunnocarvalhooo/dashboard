import { IconButton, styled } from "@mui/material"

export const CloseModalButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '20px',
  right: '20px',
  borderRadius: '8px',

  '&:hover': {
    color: theme.palette.error.main
  }
}))