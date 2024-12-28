import { ChipProps, SxProps } from "@mui/material"
import { StyledCategoryChip } from "./styles"

type Props = ChipProps & {
  categoryColor: string
  sx?: SxProps
}

export const CategoryChip = ({ categoryColor, sx, ...rest }: Props) => {
  return (
    <StyledCategoryChip {...rest} sx={{ background: categoryColor, ...sx }} />
  )
}
