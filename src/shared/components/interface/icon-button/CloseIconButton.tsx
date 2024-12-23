import { useTheme } from "@mui/material"
import { VIconButton } from "."

import CloseIcon from '@mui/icons-material/Close'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: any
}

export const CloseIconButton = ({ onClick }: Props) => {
  const theme = useTheme()

  return (
    <VIconButton
      size="small"
      onClick={onClick}
      icon={<CloseIcon />}
      sx={{
        '&:hover': {
          color: theme.palette.error.main
        }
      }}
    />
  )
}
