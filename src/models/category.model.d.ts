export interface ILSCategory {
  id: string
  name: string
  color: string
}

export interface ILSDashboardCategories {
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
    id_target?: string
  ): void 
}
