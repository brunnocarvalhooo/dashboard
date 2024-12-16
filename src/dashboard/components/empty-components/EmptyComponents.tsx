import { Box, Typography, useTheme } from "@mui/material";
import { EmptyContainer } from "./styles"

import InsertChartIcon from '@mui/icons-material/InsertChart';

export const EmptyComponents = () => {
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

        <Typography
          textAlign='center'
          variant="caption"
        >
          <a href="">Clique aqui para adicionar um componente</a>
        </Typography>
      </Box>
    </EmptyContainer>
  )
}
