export interface ILSCategory {
  id: number
  name: string
  color: string
}

export interface ILSDashboardCategories {
  id: number
  id_category: number
  id_dashboard: number
}

export interface ILSComponentCategories {
  id: number
  id_category: number
  id_component: number
}

export interface ICategoryFactory {
  create(
    name: string,
    color: string,
    target: 'component_categories' | 'dashboard_categories',
    id_target?: number
  ): void 
}
