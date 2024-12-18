import { DimensionButton, DimensionsButtonsContainer, rotateStyle } from "./styles"

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { IDashboard } from "../../../shared/dtos/dashboard";
import { useDashboards } from "../../../shared/contexts/dashboards";

type Props = {
  component: IDashboard
}

export const DemensionsButtons = ({ component }: Props) => {
  const { handleChangeDashboards } = useDashboards()

  const handleChangeDimension = (orientation: 'bottom' | 'right', action: '+' | '-') => {
    handleChangeDashboards((prev) =>
      prev.map((prevComponent) => {
        if (prevComponent.id !== component.id) return prevComponent;

        const updatedComponent = { ...prevComponent };

        switch (orientation) {
          case 'bottom':
            updatedComponent.height =
              action === '+'
                ? Math.min(updatedComponent.height + 1, 4)
                : Math.max(updatedComponent.height - 1, 1);
            break;

          case 'right':
            updatedComponent.width =
              action === '+'
                ? Math.min(updatedComponent.width + 1, 12)
                : Math.max(updatedComponent.width - 1, 1);
            break;

          default:
            console.warn('Orientação inválida');
        }

        return updatedComponent;
      })
    );
  };

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
          variant="contained"
          size="small"
          color="secondary"
          disabled={component.width === 12}
          onClick={() => handleChangeDimension('right', '+')}
        >
          <AddIcon sx={{ ...rotateStyle }} />
        </DimensionButton>

        <DimensionButton
          disableElevation
          variant="contained"
          size="small"
          color="secondary"
          disabled={component.width === 1}
          onClick={() => handleChangeDimension('right', '-')}
        >
          <RemoveIcon sx={{ ...rotateStyle }} />
        </DimensionButton>
      </DimensionsButtonsContainer>

      <DimensionsButtonsContainer sx={{ bottom: '8px' }}>
        <DimensionButton
          disableElevation
          variant="contained"
          size="small"
          color="secondary"
          disabled={component.height === 4}
          onClick={() => handleChangeDimension('bottom', '+')}
        >
          <AddIcon />
        </DimensionButton>

        <DimensionButton
          disableElevation
          variant="contained"
          size="small"
          color="secondary"
          disabled={component.height === 1}
          onClick={() => handleChangeDimension('bottom', '-')}
        >
          <RemoveIcon />
        </DimensionButton>
      </DimensionsButtonsContainer>
    </>
  )
}
