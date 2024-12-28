import { ILSDashboard } from "../dashboard.model"
import { LSDashboard } from "./dashboards"
import { LSCategory } from "./categories"
import { ILSCategory, ILSComponentCategories, ILSDashboardCategories } from "../category.model"
import { ILSComponent } from "../component.model"

export interface ILSModels {
  dashboards: ILSDashboard[],
  categories: ILSCategory[],
  dashboard_categories: ILSDashboardCategories[],
  components: ILSComponent[],
  component_categories: ILSComponentCategories[]
}

const lSModels: ILSModels = {
  dashboards: [],
  categories: [],
  dashboard_categories: [],
  components: [],
  component_categories: []
}

export interface ILS {
  get(): ILSModels 
  set(data: Partial<ILSModels>): void
  reset(): void
  clear(): void
}

export class LS implements ILS {
  private LOCAL_STORAGE_KEY = '@dashboard'

  public dashboards = new LSDashboard(this)
  public components = new LSCategory(this)
  public categories = new LSCategory(this)

  public get(): ILSModels {
    const lsData = localStorage.getItem(this.LOCAL_STORAGE_KEY)

    if (!lsData) {
      this.reset()
      return lSModels
    }

    try {
      const parsedData = JSON.parse(lsData)
      if (this.isValid(parsedData)) {
        return parsedData
      } else {
        console.warn('Dados inválidos encontrados no localStorage. Resetando para o modelo padrão.')
        this.reset()
        return lSModels
      }
    } catch (error) {
      console.error('Erro ao recuperar os dados do localStorage:', error)
      this.reset()
      return lSModels
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private isValid(data: any): data is ILSModels {
    return (
      data &&
      Array.isArray(data.dashboards) &&
      Array.isArray(data.categories) &&
      Array.isArray(data.dashboard_categories) &&
      Array.isArray(data.components) &&
      Array.isArray(data.component_categories)
    )
  }

  public set(newData: Partial<ILSModels>): void {
    const currentData = this.get()
    const updatedData = { ...currentData, ...newData }
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(updatedData))
  }

  public reset(): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(lSModels))
  }

  public clear(): void {
    localStorage.removeItem(this.LOCAL_STORAGE_KEY)
  }
}