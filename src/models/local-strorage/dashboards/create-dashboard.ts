import { LS } from ".."
import { IDashboard } from "../../../shared/dtos/dashboard"

export class Dashboard {
  public create(name: string): void {
    const storage = new LS()

    const { dashboards, ...rest } = storage.get()

    const newId = dashboards.length
      ? dashboards[dashboards.length - 1].id + 1
      : 1

    dashboards.push({
      id: newId,
      name,
    })

    storage.set({ ...rest, dashboards })
  }

  public get(id_dashboard: number): IDashboard | undefined {
    const storage = new LS()
  
    const { dashboards, dashboard_categories, categories, components, component_categories } = storage.get()
  
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
}