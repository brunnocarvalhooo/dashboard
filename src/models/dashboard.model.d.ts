export interface ILSDashboard {
  id: string
  name: string
  created_at: string
}

export interface IDashboardFactory {
  create(name: string): string
  get(id_dashboard: string): IDashboard | undefined
  list(): ILSDashboard[]
  getCategories(): ILSCategory[]
}