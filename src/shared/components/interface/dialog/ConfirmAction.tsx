import {
  Typography,
  useTheme,
} from '@mui/material'
import { VButton } from '../button'
import { VDialog } from '.'

type Props = {
  open: boolean
  handleClose: () => void

  title?: string
  customTitle?: React.ReactNode
  subtitle?: string

  onClickConfirmButton: () => void
  labelConfirmButton: string
  customLabelCancelButton?: string
  isLoadingButton?: boolean
  onClickCancel?: () => void
}

export const ConfirmAction = ({
  handleClose,
  open,
  subtitle,
  customTitle,
  title,
  onClickConfirmButton,
  labelConfirmButton,
  isLoadingButton,
  customLabelCancelButton,
  onClickCancel,
}: Props) => {
  const theme = useTheme()

  return (
    <VDialog
      open={open}
      handleClose={handleClose}
      actions={
        <>
          <VButton
            size="small"
            color='primary'
            onClick={onClickCancel || handleClose}
            label={
              <Typography
                textTransform="capitalize"
                variant='body2'
                sx={{
                  '&:hover': {
                    color: theme.palette.text.primary,
                  },
                }}
              >
                {customLabelCancelButton || 'Cancelar'}
              </Typography>
            }
            variant="text"
          />

          <VButton
            color='error'
            loading={isLoadingButton}
            size="small"
            onClick={onClickConfirmButton}
            label={
              <Typography textTransform="none" color='white' variant='body2'>
                {labelConfirmButton}
              </Typography>
            }
            variant="contained"
          />
        </>
      }
      summary={customTitle || (
        <Typography
          fontWeight="normal"
        >
          {title}
        </Typography>
      )}
    >
      {subtitle && (
        <Typography
          variant="body2"
          my={2}
          color='text.secondary'
        >
          {subtitle}
        </Typography>
      )}
    </VDialog >
  )
}
