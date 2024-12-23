import {
  Dialog,
  DialogProps,
  useTheme,
} from '@mui/material'
import React from 'react'
import { borderColor, StyledDialogActions, StyledDialogContent, StyledDialogTitle } from './styles'
import { CloseIconButton } from '../icon-button/CloseIconButton'
import { SlideUpTransition } from '../../../styles/transitions'

type Props = DialogProps & {
  open: boolean
  handleClose: () => void

  summary?: React.ReactNode
  children: React.ReactNode
  actions?: React.ReactNode
}

export const VDialog = ({
  open,
  handleClose,
  actions,
  children,
  summary,
  ...rest
}: Props) => {
  const theme = useTheme()

  return (
    <Dialog
      {...rest}
      open={open}
      onClose={handleClose}
      TransitionComponent={SlideUpTransition}
      hideBackdrop
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '12px',
          boxShadow: 'none'
        },
      }}
    >
      {summary && (
        <StyledDialogTitle>
          {summary}

          <CloseIconButton onClick={handleClose} />
        </StyledDialogTitle>
      )}

      <StyledDialogContent
        sx={{
          p: actions ? '0px 16px' : summary ? '0px 16px' : '16px',
          borderTop: summary ? undefined : '1px solid',
          borderBottom: actions ? undefined : '1px solid',
          borderColor: borderColor(theme.palette.mode),
          borderRadius: actions
            ? summary
              ? undefined
              : '0px 0px 12px 12px'
            : summary
              ? '0px 0px 12px 12px'
              : '12px',
        }}
      >
        {children}
      </StyledDialogContent>

      {actions && (
        <StyledDialogActions>
          {actions}
        </StyledDialogActions>
      )}
    </Dialog>
  )
}
