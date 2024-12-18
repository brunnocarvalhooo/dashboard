import { ICategorie } from "./categories"

export interface IComponentContent {
  key: string,
  data: object
}

export interface IComponent {
  title?: string,
  width: number
  height: number
  categorie: ICategorie
  content: IDashboardComponentContent,
}