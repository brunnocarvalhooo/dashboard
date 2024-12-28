import { ILS } from ".."
import { IDashboardFactory } from "../../../models/dashboard.model"
import { v4 as uuidv4 } from 'uuid';
import { Target } from "../categories";

export class LSDashboard implements IDashboardFactory {
  private storage: ILS

  constructor(storage: ILS) {
    this.storage = storage
  }

  public create(name: string) {
    const { dashboards, ...rest } = this.storage.get()

    const newId = uuidv4();

    dashboards.push({
      id: newId,
      name,
      created_at: new Date().toISOString()
    })

    this.storage.set({ ...rest, dashboards })

    return newId
  }

  public get(id_dashboard: string) {
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
    const { dashboards } = this.storage.get()

    return dashboards
  }

  public getCategories(target: Target) {
    const { dashboard_categories, categories } = this.storage.get()

    const relatedDashboardCategoryIds = dashboard_categories
      .map((relation) => relation.id_category)

    const relatedCategories = categories.filter((category) =>
      relatedDashboardCategoryIds.includes(category.id)
    )

    const findedCategoriesWithotRelation = dashboard_categories
      .filter((category) =>
        category.id_dashboard === target
      )
      .map((relation) => relation.id_category)

    const categoriesWithotRelation = categories.filter((category) =>
      findedCategoriesWithotRelation.includes(category.id)
    )

    return { ...relatedCategories, ...categoriesWithotRelation }
  }

  public delete(id_dashboard: string) {
    const { dashboards, dashboard_categories, components, ...rest } = this.storage.get()

    const updatedDashboards = dashboards.filter((dashboard) => dashboard.id !== id_dashboard)
    const updatedDashboardCategories = dashboard_categories.filter(
      (category) => category.id_dashboard !== id_dashboard
    )
    const updatedComponents = components.filter(
      (component) => component.id_dashboard !== id_dashboard
    )

    this.storage.set({
      ...rest,
      dashboards: updatedDashboards,
      dashboard_categories: updatedDashboardCategories,
      components: updatedComponents,
    })
  }
}