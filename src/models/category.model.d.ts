export interface ILSCategory {
  id: string
  name: string
  color: string
  active: boolean
}

export interface IDashboardsCategoriesFactory {
  create(
    name: string,
    color: string,
    id_dashboards: string[]
  ): void
  update(
    id_category: string,
    name: string,
    color: string,
    id_dashboards: string[]
  ): void
  delete(id_category: string): void
  changeActiveStatus(id_category: string): void
}

export interface ILSDashboardsCategories {
  id: string
  id_category: string
  id_dashboard: string
}

export interface ILSComponentCategories {
  id: string
  id_category: string
  id_component: string
}

export interface ICategoryFactory {
  create(
    name: string,
    color: string,
    target: 'component_categories' | 'dashboard_categories',
    targets?: [string]
  ): void 
}
