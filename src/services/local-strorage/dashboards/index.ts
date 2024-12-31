import { ILS } from ".."
import { IDashboardFactory } from "../../../models/dashboard.model"
import { v4 as uuidv4 } from 'uuid'

export class LSDashboard implements IDashboardFactory {
  private storage: ILS

  constructor(storage: ILS) {
    this.storage = storage
  }

  public create(name: string) {
    const { dashboards, ...rest } = this.storage.get()

    const newId = uuidv4()

    dashboards.push({
      id: newId,
      name,
      created_at: new Date().toISOString()
    })

    this.storage.set({ ...rest, dashboards })

    return newId
  }

  public get(id_dashboard: string) {
    const {
      dashboards,
      dashboards_categories,
      dashboards_categories_relation,
      components,
      component_categories_relation,
      component_categories
    } = this.storage.get()

    const dashboard = dashboards.find((dashboard) => dashboard.id === id_dashboard)

    if (!dashboard) {
      console.warn(`Dashboard with id ${id_dashboard} not found.`)
      return undefined
    }

    const relatedDashboardCategoryIds = dashboards_categories_relation
      .filter((relation) => relation.id_dashboard === id_dashboard)
      .map((relation) => relation.id_category)

    const relatedCategories = dashboards_categories.filter((category) =>
      relatedDashboardCategoryIds.includes(category.id)
    )

    const relatedComponents = components
      .filter((component) => component.id_dashboard === id_dashboard)
      .map((component) => {
        const componentCategoryIds = component_categories_relation
          .filter((relation) => relation.id_component === component.id)
          .map((relation) => relation.id_category)

        const componentCategories = component_categories.filter((category) =>
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
    const { dashboards } = this.storage.get()

    return dashboards
  }

  public getCategories() {
    const { dashboards_categories, dashboards_categories_relation } = this.storage.get()

    return dashboards_categories.map((category) => {
      const relatedDashboards = dashboards_categories_relation
        .filter((relation) => relation.id_category === category.id)
        .map((relation) => relation.id_dashboard)

      return {
        ...category,
        relations: relatedDashboards,
      }
    })
  }
  
  public delete(id_dashboard: string) {
    const { dashboards, dashboards_categories_relation, components, ...rest } = this.storage.get()

    const updatedDashboards = dashboards.filter((dashboard) => dashboard.id !== id_dashboard)
    const updatedDashboardCategories = dashboards_categories_relation.filter(
      (category) => category.id_dashboard !== id_dashboard
    )
    const updatedComponents = components.filter(
      (component) => component.id_dashboard !== id_dashboard
    )

    this.storage.set({
      ...rest,
      dashboards: updatedDashboards,
      dashboards_categories_relation: updatedDashboardCategories,
      components: updatedComponents,
    })
  }
}