import { DialogActions, DialogContent, DialogTitle, styled } from "@mui/material";

const borderColor = (themeMode: 'dark' | 'light') => {
  return `rgba(${themeMode === 'dark' ? 255 : 0}, ${themeMode === 'dark' ? 255 : 0}, ${themeMode === 'dark' ? 255 : 0}, 0.15)`
}

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: '64px',
  bgcolor: theme.palette.background.default,
  border: '1px solid',
  borderRadius: '12px 12px 0px 0px',
  borderColor: borderColor(theme.palette.mode),
}))

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  bgcolor: theme.palette.background.paper,
  borderInline: '1px solid',
  borderColor: borderColor(theme.palette.mode),

  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.grey[400]
        : theme.palette.grey[900],
    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'light'
          ? theme.palette.grey[500]
          : theme.palette.grey[800],
    },
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
}))

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  bgcolor: theme.palette.background.paper,
  paddingInline: '16px',
  paddingBottom: '16px',
  borderInline: '1px solid',
  borderBottom: '1px solid',
  borderRadius: '0px 0px 12px 12px',
  borderColor: borderColor(theme.palette.mode),
}))
