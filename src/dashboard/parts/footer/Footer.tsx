import { Typography } from "@mui/material"
import { FooterContainer } from "./styles"
import { APP_NAME } from "../../../shared/hooks"

export const Footer = () => {
  return (
    <FooterContainer>
      <Typography>{APP_NAME} Footer</Typography>
    </FooterContainer>
  )
}
