import {
  ButtonProps,
  CircularProgress,
} from '@mui/material'
import React from 'react'
import { StyledButton } from './styles'

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
    <StyledButton disableElevation disabled={loading} {...rest} color={color}>
      {loading ? (
        <CircularProgress size={14} sx={{ margin: '2px', color: 'white' }} />
      ) : (
        label
      )}
    </StyledButton>
  )
}
