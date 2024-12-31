import { ILSCategory } from "../../models/category.model"
import { IComponent } from "./components"

export interface IDashboard {
  id: string
  name: string
  categories: ILSCategory[]
  components: IComponent[]
}
