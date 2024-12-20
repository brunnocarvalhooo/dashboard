import { ICategory } from "./categories"
import { IComponent } from "./components"

export interface IDashboard {
  id: number
  name: string
  categories: ICategory[]
  components: IComponent[]
}
