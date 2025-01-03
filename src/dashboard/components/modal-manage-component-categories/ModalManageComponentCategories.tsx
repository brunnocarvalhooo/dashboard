import { Box, IconButton, InputAdornment, Menu, TextField, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useDashboards } from "../../../shared/contexts/dashboards"
import { useCallback, useMemo, useState } from "react"
import { REQUIRED_ERROR } from "../../../shared/utils/validation-errors"
import { storage } from "../../../models"
import { VButton, VDialog, VIconButton } from "../../../shared/components"
import { FaCircle } from "react-icons/fa"
import { MdEditOff, MdOutlineClose, MdOutlineFilterAlt } from "react-icons/md"
import { SketchPicker } from "react-color"
import { IoMdSearch } from "react-icons/io"
import { StyledMenu } from "../../../shared/components/interface/menu/styles"
import { getContrastColor, truncateText } from "../../../shared/utils/masks"
import { CategoryChip } from "../../../shared/components/interface/chip/category-chip/CategoryChip"
import { AiFillEdit } from "react-icons/ai"
import { FiTrash } from "react-icons/fi"
import { ConfirmAction } from "../../../shared/components/interface/dialog/ConfirmAction"
import { ILSCategory } from "../../../models/category.model"
import { useAppTheme } from "../../../shared/contexts/theme"

type Props = {
  open: boolean
  handleChangeOpen: (newValue: boolean) => void
}

export const ModalManageComponentCategories = ({ open, handleChangeOpen }: Props) => {
  const { currentDashboard } = useDashboards()

  const { primaryColor } = useAppTheme()

  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const [anchorElSelectColor, setAnchorElSelectColor] = useState<null | HTMLElement>(null)
  const openSelectColor = Boolean(anchorElSelectColor)
  const handleClickSelectColor = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSelectColor(event.currentTarget)
  }
  const handleCloseSelectColor = () => {
    setAnchorElSelectColor(null)
  }

  const [search, setSearch] = useState('')

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)

  const [openConfirmDelete, setOpenConfirmDelete] = useState<string | undefined>()
  const handleChangeOpenConfirmDelete = (newValue: string | undefined) => {
    setOpenConfirmDelete(newValue)
  }

  const [dashboardsFilters] = useState({
    active: true,
    inactive: true
  })

  const [anchorElFilterComponentCategories, setAnchorElComponentCategories] = useState<null | HTMLElement>(null)
  const openFilterComponentCategories = Boolean(anchorElFilterComponentCategories)
  const handleClickFilterComponentCategories = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElComponentCategories(event.currentTarget)
  }
  const handleCloseFilterComponentCategories = () => {
    setAnchorElComponentCategories(null)
  }

  const [title, setTitle] = useState({
    state: '',
    error: ''
  })

  const [color, setColor] = useState(primaryColor)
  const handleColorChange = (color: { hex: string }) => {
    setColor(color.hex)
  }

  const handleResetStates = useCallback(() => {
    setTitle({
      state: '',
      error: ''
    })
    setColor(theme.palette.primary.main)
    setSelectedCategory(undefined)
  }, [theme.palette.primary.main])

  const handleClose = () => {
    handleChangeOpen(false)
    setTimeout(() => {
      handleResetStates()
      setSearch('')
    }, 500)
  }

  // const handleClickEditCategory = (category: ILSCategory) => {
  //   const componentCategories = dashboards.filter((dashboard) => category.relations.includes(dashboard.id))

  //   const dashboardsId = componentCategories.map((category) => category.id)

  //   setRelationedDashboards(dashboardsId)

  //   setTitle((prev) => ({
  //     ...prev,
  //     state: category.name,
  //     error: prev.error ? '' : prev.error,
  //   }))
  //   setColor(category.color)
  //   setSelectedCategory(category.id)
  // }

  const handleExitEditCategory = () => {
    handleResetStates()
  }

  const handleDeleteCategory = useCallback((id_category: string) => {
    try {
      storage.dashboards_categories.delete(id_category)

      // fetchComponentCategories()

      handleChangeOpenConfirmDelete(undefined)

      if (selectedCategory === id_category) {
        handleResetStates()
      }
    } catch (error) {
      console.log(error)
    }
  }, [handleResetStates, selectedCategory])

  const handleCreateAndUpdateCategory = useCallback(async () => {
    if (!title.state) {
      setTitle((prev) => ({
        ...prev,
        error: REQUIRED_ERROR
      }))
      return
    }

    try {
      // if (selectedCategory) {
      //   storage.dashboards_categories.update(
      //     selectedCategory,
      //     title.state,
      //     color,
      //     // relationedDashboards,
      //   )
      // } else {
      //   storage.dashboards_categories.create(
      //     title.state,
      //     color,
      //     // relationedDashboards,
      //   )
      // }

      // fetchComponentCategories()

      handleResetStates()
    } catch (error) {
      console.log(error)
    }
  }, [handleResetStates, title.state])

  const searchResultComponentCategories = useMemo<ILSCategory[] | undefined>(() => {
    if (currentDashboard) {
      const componentsCategories = storage.dashboards.getCurrentDashboardComponentsCategories(currentDashboard.id)

      const componentCategoriesResult = componentsCategories
        .filter((category) =>
          search ? category.name.toLowerCase().includes(search.toLowerCase()) : true
        )
        .filter((category) => {
          if (dashboardsFilters.active && dashboardsFilters.inactive) return true
          if (dashboardsFilters.active) return category.active
          if (dashboardsFilters.inactive) return !category.active
          return false
        })

      setSelectedCategory((prev) => prev)

      return componentCategoriesResult
    }
  }, [currentDashboard, dashboardsFilters.active, dashboardsFilters.inactive, search])

  return (
    <VDialog
      open={open}
      handleClose={handleClose}
      fullWidth
      fullScreen={smDown}
      maxWidth='sm'
      summary={
        <Typography color="text.primary">Categorias de {currentDashboard?.name} ({currentDashboard?.categories.length})</Typography>
      }
      actions={
        <Box width='100%'>
          <Box width='100%' display='flex' alignItems='flex-start' gap={1}>
            <Box display='flex' alignItems='flex-start' gap={0.5} flex={1}>
              <Box display='flex' alignItems='center'>
                <Tooltip title='Cor da categoria' placement="bottom">
                  <IconButton
                    id="select-color-buttom"
                    aria-controls={openSelectColor ? 'select-color-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openSelectColor ? 'true' : undefined}
                    onClick={handleClickSelectColor}
                    size="small"
                  >
                    <FaCircle color={color} />
                  </IconButton>
                </Tooltip>

                {selectedCategory && (
                  <Tooltip title='Sair da edição de categoria' placement="bottom">
                    <IconButton onClick={handleExitEditCategory} size="small">
                      <MdEditOff />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>

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
              />
            </Box>

            <VButton
              onClick={handleCreateAndUpdateCategory}
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
            {/* <Autocomplete
              noOptionsText='Nenhum dashboard disponivel'
              multiple
              options={currentDashboard?.categories}
              value={currentDashboard?.categories.filter((dashboard) => relationedDashboards.includes(dashboard.id))}
              getOptionLabel={(option) => option.name}
              onChange={(_, dashboards) => {
                const DashboardIds = dashboards.map((dashboard) => dashboard.id)

                setRelationedDashboards(DashboardIds)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  placeholder="Dashboards da categoria"
                />
              )}
            /> */}
          </Box>
        </Box>
      }
    >
      <Box my={2}>
        <Box display='flex' gap={1} mb={2}>
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size='small'
            variant='standard'
            placeholder='Pesquisar...'
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <IoMdSearch size={22} style={{ paddingBottom: '4px', color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                endAdornment: search && (
                  <IconButton size='small' onClick={() => setSearch('')}>
                    <MdOutlineClose
                      size={20}
                      style={{
                        color: 'text.secondary',
                      }}
                    />
                  </IconButton>
                )
              },
            }}
          />

          <VIconButton
            size='small'
            id="filter-dashboards-categories-button"
            aria-controls={openFilterComponentCategories ? 'filter-dashboards-categories-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openFilterComponentCategories ? 'true' : undefined}
            onClick={handleClickFilterComponentCategories}
            icon={<MdOutlineFilterAlt size={20} color={theme.palette.text.secondary} />}
          />

          <StyledMenu
            id="filter-dashboards-categories-menu"
            aria-labelledby="filter-dashboards-categories-button"
            anchorEl={anchorElFilterComponentCategories}
            open={openFilterComponentCategories}
            onClose={handleCloseFilterComponentCategories}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {/* <ComponentCategoriesFiltersContent
              dashboardsFilters={dashboardsFilters}
              setDashboardsFilters={setDashboardsFilters}
            /> */}
          </StyledMenu>
        </Box>

        {searchResultComponentCategories && searchResultComponentCategories?.length > 0 ?
          searchResultComponentCategories?.map((category, i) => {
            const contrastColor = getContrastColor(category.color)

            const selected = selectedCategory === category.id

            return (
              <Tooltip
                key={i}
                open={selected && !openConfirmDelete}
                arrow
                title='Editando...'
                placement="top"
              >
                <CategoryChip
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
                          // onClick={() => handleClickEditCategory(category)}
                          >
                            <AiFillEdit size={14} style={{ color: contrastColor }} />
                          </IconButton>

                          <IconButton
                            size="small"
                            onClick={() => handleChangeOpenConfirmDelete(category.id)}
                          >
                            <FiTrash size={14} style={{ color: contrastColor }} />
                          </IconButton>
                        </Box>
                      )}

                      <ConfirmAction
                        handleClose={() => handleChangeOpenConfirmDelete(undefined)}
                        labelConfirmButton="Excluir"
                        open={openConfirmDelete === category.id}
                        title="Excluir categoria?"
                        subtitle={
                          <>
                            Excluir a categoria (
                            <Typography component="span" color={category.color}>
                              {category.name}
                            </Typography>
                            ) removerá a relação com os dashboards associados a ela.
                          </>
                        }
                        onClickConfirmButton={() => handleDeleteCategory(category.id)}
                      />
                    </Box>
                  }
                  size="small"
                  sx={{
                    marginRight: '8px',
                    marginBottom: '8px',
                    transition: 'all ease 1s'
                  }}
                />
              </Tooltip>
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
