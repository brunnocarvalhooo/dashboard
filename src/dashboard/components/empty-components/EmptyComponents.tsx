import { Box, Button, Typography, useTheme } from "@mui/material"
import { EmptyContainer } from "./styles"

import InsertChartIcon from '@mui/icons-material/InsertChart'

type Props = {
  handleChangeOpenAddComponentModal: (newValue: boolean) => void
}

export const EmptyComponents = ({ handleChangeOpenAddComponentModal }: Props) => {
  const theme = useTheme()
  return (
    <EmptyContainer>
      <InsertChartIcon sx={{ fontSize: '4rem', color: theme.palette.grey[400] }} />

      <Box display='flex' flexDirection='column' gap={1}>
        <Typography
          color={theme.palette.grey[400]}
          variant="h6"
          fontWeight='bold'
          textAlign='center'
        >
          Ainda não há componentes neste dashboard
        </Typography>

        <Button
          size="small"
          variant="text"
          onClick={() => handleChangeOpenAddComponentModal(true)}
        >
          <Typography
            variant="caption"
          >Clique aqui para adicionar um componente</Typography>
        </Button>
      </Box>
    </EmptyContainer>
  )
}
