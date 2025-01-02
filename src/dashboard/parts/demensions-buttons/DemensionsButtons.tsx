import { DimensionButton, DimensionsButtonsContainer, rotateStyle } from "./styles"

import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { IComponent } from "../../../shared/dtos/components"
import { IDashboard } from "../../../shared/dtos/dashboard"

type Props = {
  component: IComponent
  dashboard: IDashboard
}

export const DemensionsButtons = ({ component }: Props) => {
  // const { handleChangeCurrentDashboard } = useDashboards()

  // const handleChangeDimension = (
  //   orientation: 'bottom' | 'right',
  //   action: '+' | '-'
  // ) => {
  //   const MAX_DIMENSIONS = { bottom: 4, right: 12 }
  //   const MIN_DIMENSION = 1

  //   handleChangeCurrentDashboard((prev) => {
  //     if (prev) {
  //       const componentIndex = prev.components.findIndex(
  //         (comp) => comp.id === component.id
  //       )

  //       if (componentIndex !== -1) {
  //         const updatedComponent = {
  //           ...prev.components[componentIndex],
  //         }

  //         const dimensionKey = orientation === 'bottom' ? 'height' : 'width'
  //         const maxLimit = MAX_DIMENSIONS[orientation]

  //         updatedComponent[dimensionKey] =
  //           action === '+'
  //             ? Math.min(updatedComponent[dimensionKey] + 1, maxLimit)
  //             : Math.max(updatedComponent[dimensionKey] - 1, MIN_DIMENSION)

  //         prev.components[componentIndex] = updatedComponent
  //       }

  //       return updatedDashboard
  //     }
  //   })
  // }

  return (
    <>
      <DimensionsButtonsContainer
        sx={{
          right: '-26px',
          flexDirection: 'column',
          ...rotateStyle
        }}
      >
        <DimensionButton
          disableElevation
          variant="outlined"
          size="small"
          color="primary"
          disabled={component.width === 12}
          // onClick={() => handleChangeDimension('right', '+')}
        >
          <AddIcon sx={{ ...rotateStyle }} fontSize="small" />
        </DimensionButton>

        <DimensionButton
          disableElevation
          variant="outlined"
          size="small"
          color="primary"
          disabled={component.width === 1}
          // onClick={() => handleChangeDimension('right', '-')}
        >
          <RemoveIcon sx={{ ...rotateStyle }} fontSize="small" />
        </DimensionButton>
      </DimensionsButtonsContainer>

      <DimensionsButtonsContainer sx={{ bottom: '8px' }}>
        <DimensionButton
          disableElevation
          variant="outlined"
          size="small"
          color="primary"
          disabled={component.height === 4}
          // onClick={() => handleChangeDimension('bottom', '+')}
        >
          <AddIcon fontSize="small" />
        </DimensionButton>

        <DimensionButton
          disableElevation
          variant="outlined"
          size="small"
          color="primary"
          disabled={component.height === 1}
          // onClick={() => handleChangeDimension('bottom', '-')}
        >
          <RemoveIcon fontSize="small" />
        </DimensionButton>
      </DimensionsButtonsContainer>
    </>
  )
}
