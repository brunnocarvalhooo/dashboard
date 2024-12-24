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