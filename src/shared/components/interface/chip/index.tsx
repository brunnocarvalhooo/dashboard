import { Chip, ChipProps } from "@mui/material"

type Props = ChipProps & {

}

export const VChip = ({ ...rest }: Props) => {
  return (
    <Chip  {...rest} />
  )
}