import { ILS, LS } from ".."
import { IDashboard } from "../../../shared/dtos/dashboard"
import { ILSCategory } from "../categories/category.model"
import { ILSDashboard } from "./dashboard.model"

export interface IDashboardFactory {
  create(name: string): number
  get(id_dashboard: number): IDashboard | undefined
  list(): ILSDashboard[]
  getCategories(): ILSCategory[]
}

export class Dashboard implements IDashboardFactory {
  private storage: ILS;

  constructor(storage: ILS) {
    this.storage = storage;
  }

  public create(name: string) {
    const { dashboards, ...rest } = this.storage.get()

    const newId = dashboards.length
      ? dashboards[dashboards.length - 1].id + 1
      : 1

    dashboards.push({
      id: newId,
      name,
    })

    this.storage.set({ ...rest, dashboards })

    return newId
  }

  public get(id_dashboard: number) {
    const { dashboards, dashboard_categories, categories, components, component_categories } = this.storage.get()

    const dashboard = dashboards.find((dashboard) => dashboard.id === id_dashboard)

    if (!dashboard) {
      console.warn(`Dashboard with id ${id_dashboard} not found.`)
      return undefined
    }

    const relatedDashboardCategoryIds = dashboard_categories
      .filter((relation) => relation.id_dashboard === id_dashboard)
      .map((relation) => relation.id_category)

    const relatedCategories = categories.filter((category) =>
      relatedDashboardCategoryIds.includes(category.id)
    )

    const relatedComponents = components
      .filter((component) => component.id_dashboard === id_dashboard)
      .map((component) => {
        const componentCategoryIds = component_categories
          .filter((relation) => relation.id_component === component.id)
          .map((relation) => relation.id_category)

        const componentCategories = categories.filter((category) =>
          componentCategoryIds.includes(category.id)
        )

        return {
          ...component,
          categories: componentCategories,
        }
      })

    return {
      id: dashboard.id,
      name: dashboard.name,
      categories: relatedCategories,
      components: relatedComponents,
    }
  }

  public list() {
    const storage = new LS()

    const { dashboards } = storage.get()

    return dashboards
  }

  public getCategories() {
    const storage = new LS()

    const { dashboard_categories, categories } = storage.get()

    const relatedDashboardCategoryIds = dashboard_categories
      .map((relation) => relation.id_category)

    const relatedCategories = categories.filter((category) =>
      relatedDashboardCategoryIds.includes(category.id)
    )

    return relatedCategories
  }
}