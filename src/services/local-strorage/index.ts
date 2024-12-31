import { ILSDashboard } from "../../models/dashboard.model"
import { LSDashboard } from "./dashboards"
import { ILSCategory, ILSComponentCategories, ILSDashboardsCategories } from "../../models/category.model"
import { ILSComponent } from "../../models/component.model"
import { LSDashboardsCategories } from "./dashboards_categories"

export interface ILSModels {
  dashboards: ILSDashboard[]
  components: ILSComponent[]
  dashboards_categories: ILSCategory[]
  dashboards_categories_relation: ILSDashboardsCategories[]
  component_categories: ILSCategory[]
  component_categories_relation: ILSComponentCategories[]
}

const lSModels: ILSModels = {
  dashboards: [],
  components: [],
  dashboards_categories: [],
  dashboards_categories_relation: [],
  component_categories: [],
  component_categories_relation: []
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
  public dashboards_categories = new LSDashboardsCategories(this)

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
      Array.isArray(data.component_categories) &&
      Array.isArray(data.component_categories_relation) &&
      Array.isArray(data.components) &&
      Array.isArray(data.dashboards) &&
      Array.isArray(data.dashboards_categories) &&
      Array.isArray(data.dashboards_categories_relation)
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