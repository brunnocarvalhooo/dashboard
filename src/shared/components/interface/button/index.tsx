import {
  ButtonProps,
  CircularProgress,
  Button,
} from '@mui/material'
import React from 'react'

type Props = ButtonProps & {
  label: React.ReactNode
  loading?: boolean
  color: 'primary' | 'secondary'
}

export const VButton: React.FC<Props> = ({
  label,
  loading,
  color = 'primary',
  ...rest
}) => {
  return (
    <Button disableElevation disabled={loading} {...rest} color={color} sx={{ borderRadius: '22px' }}>
      {loading ? (
        <CircularProgress size={14} sx={{ margin: '2px', color: 'white' }} />
      ) : (
        label
      )}
    </Button>
  )
}
