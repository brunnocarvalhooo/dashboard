import { IconButtonProps } from "@mui/material"
import { forwardRef, ReactNode } from "react"
import { StyledIconButton } from "./styles"

type Props = IconButtonProps & {
  icon: ReactNode
}

export const VIconButton = forwardRef<HTMLButtonElement, Props>(
  ({ icon, ...rest }, ref) => {
    return (
      <StyledIconButton {...rest} ref={ref}>
        {icon}
      </StyledIconButton>
    );
  }
);
