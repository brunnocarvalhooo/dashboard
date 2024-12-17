import { Dialog, DialogTitle, IconButton, styled } from "@mui/material";

export const StyledDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    borderRadius: '12px',
  }
}))

export const StyledDialogTitle = styled(DialogTitle)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

export const CloseModalButton = styled(IconButton)(({ theme }) => ({
  '&:hover': {
    color: theme.palette.error.main
  }
}))