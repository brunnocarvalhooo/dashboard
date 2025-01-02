import { styled } from "@mui/material"
import { VChip } from ".."

export const CATEGORY_CHIP_MR = '4px'
export const CATEGORY_CHIP_MB = '4px'

export const StyledCategoryChip = styled(VChip)(() => ({
  marginRight: CATEGORY_CHIP_MR, 
  marginBottom: CATEGORY_CHIP_MB, 
}))