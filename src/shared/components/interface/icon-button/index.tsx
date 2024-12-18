import { IconButtonProps } from "@mui/material"
import { ReactNode } from "react"
import { StyledIconButton } from "./styles"

type Props = IconButtonProps & {
  icon: ReactNode
}

export const VIconButton = ({ icon, ...rest }: Props) => {
  return (
    <StyledIconButton {...rest}>
      {icon}
    </StyledIconButton>
  )
}
