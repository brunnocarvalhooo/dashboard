import { ICategory } from "./categories"

export interface IComponentContent {
  key: string,
  data: object
}

export interface IComponent {
  id: string
  title?: string,
  width: number
  height: number
  categories: ICategory[]
  content: IDashboardComponentContent,
}