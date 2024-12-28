import { Autocomplete, Box, IconButton, Menu, TextField, Tooltip, Typography, useTheme } from "@mui/material"
import { VButton, VDialog } from "../../interface"
import { SketchPicker } from 'react-color'
import { useCallback, useState } from "react"
import { FaCircle } from "react-icons/fa"
import { useDashboards } from "../../../contexts/dashboards"
import { CategoryChip } from "../../interface/chip/category-chip/CategoryChip"
import { REQUIRED_ERROR } from "../../../utils/validation-errors"
import { storage } from "../../../../models"
import { getContrastColor, truncateText } from "../../../utils/masks"

import { AiFillEdit } from "react-icons/ai"
import { FiTrash } from "react-icons/fi"
import { ICategory } from "../../../dtos/categories"

type Props = {
  open: boolean
  handleChangeOpen: (newValue: boolean) => void
}

export const ModalManageDashboardCategories = ({ open, handleChangeOpen }: Props) => {
  const {
    dashboardsCategories,
    fetchDashboardsCategories,
    dashboards
  } = useDashboards()

  const theme = useTheme()

  const [anchorElSelectColor, setAnchorElSelectColor] = useState<null | HTMLElement>(null)
  const openSelectColor = Boolean(anchorElSelectColor)
  const handleClickSelectColor = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSelectColor(event.currentTarget)
  }
  const handleCloseSelectColor = () => {
    setAnchorElSelectColor(null)
  }

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)

  const [title, setTitle] = useState({
    state: '',
    error: ''
  })

  const [color, setColor] = useState(theme.palette.primary.main)
  const handleColorChange = (color: { hex: string }) => {
    setColor(color.hex)
  }

  const handleClose = () => {
    handleChangeOpen(false)
    setTitle({
      state: '',
      error: ''
    })
  }

  const handleClickEditCategory = (category: ICategory) => {
    setTitle((prev) => ({
      ...prev,
      state: category.name
    }))
    setColor(category.color)
    setSelectedCategory(category.id)
  }

  const handleCreateAndUpdateCategory = useCallback(async () => {
    if (!title.state) {
      setTitle((prev) => ({
        ...prev,
        error: REQUIRED_ERROR
      }))
      return
    }

    try {
      storage.categories.create(
        title.state,
        color,
        'dashboard_categories',
      )

      fetchDashboardsCategories()

      setTitle({
        state: '',
        error: ''
      })
      setColor(theme.palette.primary.main)
    } catch (error) {
      console.log(error)
    }
  }, [color, fetchDashboardsCategories, theme.palette.primary.main, title.state])

  return (
    <VDialog
      open={open}
      handleClose={handleClose}
      summary={
        <Typography color="text.primary">Categorias de dashboard</Typography>
      }
      actions={
        <Box width='100%'>
          <Box width='100%' display='flex' alignItems='flex-start' gap={1}>
            <Box display='flex' alignItems='flex-start' gap={0.5} flex={1}>
              <Tooltip title='Cor da categoria' placement="bottom">
                <IconButton
                  id="select-color-buttom"
                  aria-controls={openSelectColor ? 'select-color-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openSelectColor ? 'true' : undefined}
                  onClick={handleClickSelectColor}
                >
                  <FaCircle color={color} />
                </IconButton>
              </Tooltip>

              <Menu
                id="select-color-menu"
                aria-labelledby="select-color-buttom"
                anchorEl={anchorElSelectColor}
                open={openSelectColor}
                onClose={handleCloseSelectColor}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                sx={{
                  '& .MuiMenu-list': {
                    paddingTop: '0px',
                    paddingBottom: '0px'
                  },
                }}
              >
                <Box>
                  <SketchPicker color={color} onChange={handleColorChange} />
                </Box>
              </Menu>

              <TextField
                fullWidth
                error={!!title.error}
                helperText={title.error}
                value={title.state}
                placeholder="Titulo"
                onChange={
                  (e) => setTitle((prev) => ({
                    ...prev,
                    error: prev.error ? '' : prev.error,
                    state: e.target.value
                  }))
                }
                size="small"
                variant="standard"
                sx={{ pt: 0.5 }}
              />
            </Box>

            <VButton
              onClick={() => handleCreateAndUpdateCategory()}
              size="small"
              variant="contained"
              color="primary"
              label={
                <Typography
                  color='white'
                  textTransform='capitalize'
                >{selectedCategory ? 'Salvar' : 'Criar'}</Typography>
              }
            />
          </Box>

          <Box mt={2}>
            <Autocomplete
              multiple
              options={dashboards}
              getOptionLabel={(option) => option.name}
              // defaultValue={[top100Films[13]]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Dashboards da categoria"
                // placeholder="Favorites"
                />
              )}
            />
          </Box>
        </Box>
      }
    >
      <Box my={2}>
        {dashboardsCategories.length > 0 ?
          dashboardsCategories.map((category, i) => {
            const contrastColor = getContrastColor(category.color)

            return (
              <CategoryChip
                key={i}
                categoryColor={category.color}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                label={
                  <Box display='flex' alignItems='center' gap={0.5}>
                    <Typography
                      variant='caption'
                      color={contrastColor}
                    >{truncateText(category.name, 12)}</Typography>

                    {hoveredIndex === i && (
                      <Box display="flex" alignItems="center">
                        <IconButton
                          size="small"
                          onClick={() => handleClickEditCategory(category)}
                        >
                          <AiFillEdit size={14} style={{ color: contrastColor }} />
                        </IconButton>
                        <IconButton size="small">
                          <FiTrash size={14} style={{ color: contrastColor }} />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                }
                size="small"
                sx={{
                  marginRight: '8px',
                  marginBottom: '8px',
                  transition: 'all ease 1s'
                }}
              />
            )
          }) : (
            <Typography
              fontSize='0.7rem'
              color='text.secondary'
              textAlign='left'
            >Nenhuma categoria de dashboard disponivel</Typography>
          )}
      </Box>
    </VDialog>
  )
}
