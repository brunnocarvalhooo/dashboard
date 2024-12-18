import { IComponent } from "./components"

export interface IDashboard {
  id: number
  name: string
  components: IComponent[]
}
