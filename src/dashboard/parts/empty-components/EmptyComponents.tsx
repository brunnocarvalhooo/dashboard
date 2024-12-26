import { Button, Typography } from "@mui/material"
import { CreateComponentButtonLabel, EmptyContainer } from "./styles"

import InsertChartIcon from '@mui/icons-material/InsertChart'

type Props = {
  handleChangeOpenAddComponentModal: (newValue: boolean) => void
}

export const EmptyComponents = ({ handleChangeOpenAddComponentModal }: Props) => {
  return (
    <EmptyContainer>
      <InsertChartIcon sx={{ fontSize: '4rem', color: 'text.secondary', mb: '8px' }} />

      <Typography
        color='text.secondary'
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
        <CreateComponentButtonLabel
          variant="caption"
          textTransform='none'
          textAlign='left'
        >Clique aqui para adicionar um componente</CreateComponentButtonLabel>
      </Button>
    </EmptyContainer>
  )
}
