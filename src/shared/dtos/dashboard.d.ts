import { ICategory } from "./categories"
import { IComponent } from "./components"

export interface IDashboard {
  id: string
  name: string
  categories: ICategory[]
  components: IComponent[]
}
