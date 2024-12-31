import { ILSCategory } from "../../models/category.model"

export interface IComponentContent {
  key: string,
  data: object
}

export interface IComponent {
  id: string
  title?: string,
  width: number
  height: number
  categories: ILSCategory[]
  content: IDashboardComponentContent,
}