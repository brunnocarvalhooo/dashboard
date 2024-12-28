import { Icon, PopoverVirtualElement, Typography } from "@mui/material"
import { StyledMenu, StyledMenuItem } from "./styles"
import { ReactNode } from "react"

interface IVMenuItems {
  label: string
  icon?: ReactNode
  onClick: () => void
  labelColor?: string
}

type Props = {
  menuProps: {
    open: boolean,
    anchorEl: Element | (() => Element) | PopoverVirtualElement | (() => PopoverVirtualElement) | null | undefined
  }
  handleClose: () => void
  items: IVMenuItems[]
}

export const VMenu = ({ menuProps, items, handleClose }: Props) => {
  return (
    <StyledMenu
      anchorEl={menuProps.anchorEl}
      open={menuProps.open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      {items.map((item, i) => (
        <StyledMenuItem
          key={i}
          onClick={item.onClick}
          sx={{ pl: item.icon ? '8px' : undefined }}
        >
          {item.icon && <Icon fontSize="small">{item.icon}</Icon>}

          <Typography variant="body2" color={item.labelColor || 'text.primary'}>{item.label}</Typography>
        </StyledMenuItem>
      ))}
    </StyledMenu>
  )
}
