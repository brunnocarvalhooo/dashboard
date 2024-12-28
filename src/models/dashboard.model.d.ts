export interface ILSDashboard {
  id: number
  name: string
}

export interface IDashboardFactory {
  create(name: string): number
  get(id_dashboard: number): IDashboard | undefined
  list(): ILSDashboard[]
  getCategories(): ILSCategory[]
}