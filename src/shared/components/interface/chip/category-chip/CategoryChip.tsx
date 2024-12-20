import { ChipProps } from "@mui/material"
import { StyledCategoryChip } from "./styles"

type Props = ChipProps & {
  categoryColor: string
}

export const CategoryChip = ({ categoryColor, ...rest }: Props) => {
  return (
    <StyledCategoryChip {...rest} sx={{ background: categoryColor }} />
  )
}
