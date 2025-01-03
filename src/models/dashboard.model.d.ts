import { ICategory } from "../shared/dtos/categories"
import { IDashboard } from "../shared/dtos/dashboard"
import { ILSCategory } from "./category.model"

export interface ILSDashboard {
  id: string
  name: string
  created_at: string
}

export interface IDashboardFactory {
  create(name: string): string
  get(id_dashboard: string): IDashboard | undefined
  list(): ILSDashboard[]
  getCategories(): ICategory[]
  getCurrentDashboardComponentsCategories(id_dashboard: string): ILSCategory[]
}