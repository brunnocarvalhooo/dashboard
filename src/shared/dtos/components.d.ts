import { ICategory } from "./categories"

export interface IComponentContent {
  key: string,
  data: object
}

export interface IComponent {
  id: number
  title?: string,
  width: number
  height: number
  categories: ICategory[]
  content: IDashboardComponentContent,
}