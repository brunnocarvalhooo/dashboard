import { Dialog, DialogContent, IconButton, styled } from "@mui/material";

export const StyledDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    borderRadius: '12px',
  }
}))

export const StyledDialogContent = styled(DialogContent)(() => ({
  padding: '0px',
  height: '100vh',
  position: 'relative',
}))

export const CloseModalButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '20px',
  right: '20px',

  '&:hover': {
    color: theme.palette.error.main
  }
}))