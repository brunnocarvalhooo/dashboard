import { Slide } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import { forwardRef, ReactElement } from "react"

export const SlideUpTransition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})