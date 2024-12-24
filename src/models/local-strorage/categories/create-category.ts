import { LS } from ".."
import { ILSComponentCategories, ILSDashboardCategories } from "./category.model"

export class Category {
  public create(
    name: string,
    color: string,
    target: 'component_categories' | 'dashboard_categories',
    id_target?: number
  ): void {
    const storage = new LS()

    const { categories, ...rest } = storage.get()
    const targetCategory =
      target === 'component_categories'
        ? rest.component_categories
        : rest.dashboard_categories

    const newCategoryId = categories.length
      ? categories[categories.length - 1].id + 1
      : 1

    categories.push({ id: newCategoryId, name, color })

    if (id_target) {
      const newRelationId = targetCategory.length
        ? targetCategory[targetCategory.length - 1].id + 1
        : 1

      if (target === 'component_categories') {
        (targetCategory as ILSComponentCategories[]).push({
          id: newRelationId,
          id_component: id_target,
          id_category: newCategoryId,
        })
      } else {
        (targetCategory as ILSDashboardCategories[]).push({
          id: newRelationId,
          id_dashboard: id_target,
          id_category: newCategoryId,
        })
      }
    }

    storage.set({
      ...rest,
      categories,
      [target]: targetCategory,
    })
  }
}