import { ILS } from ".."
import { IDashboardsCategoriesFactory, ILSDashboardsCategories } from "../../../models/category.model"
import { v4 as uuidv4 } from 'uuid'

export class LSDashboardsCategories implements IDashboardsCategoriesFactory {
  private storage: ILS

  constructor(storage: ILS) {
    this.storage = storage
  }

  public create(
    name: string,
    color: string,
    id_dashboards: string[]
  ) {
    const {
      dashboards_categories,
      dashboards_categories_relation,
      ...rest
    } = this.storage.get()

    const newId = uuidv4()

    dashboards_categories.push({
      id: newId,
      name,
      color
    })

    this.createRelations(newId, id_dashboards, dashboards_categories_relation)

    this.storage.set({ ...rest, dashboards_categories })
  }

  public update(
    id_category: string,
    name: string,
    color: string,
    id_dashboards: string[]
  ) {
    const { dashboards_categories, dashboards_categories_relation, ...rest } = this.storage.get()

    const selectedCategory = dashboards_categories.find(
      (category) => category.id === id_category
    )

    if (selectedCategory) {
      selectedCategory.name = name
      selectedCategory.color = color

      const updatedRelations = dashboards_categories_relation.filter(
        (relation) => relation.id_category !== id_category
      )
      this.createRelations(id_category, id_dashboards, updatedRelations)

      this.storage.set({
        ...rest,
        dashboards_categories,
        dashboards_categories_relation: updatedRelations,
      })
    }
  }

  private createRelations(
    id_category: string,
    id_dashboards: string[],
    existingRelations: ILSDashboardsCategories[]
  ) {
    id_dashboards.forEach((id_dashboard) => {
      const newRelationId = uuidv4()

      existingRelations.push({
        id: newRelationId,
        id_category,
        id_dashboard,
      })
    })
  }

  public delete(id_category: string) {
    const {
      dashboards_categories,
      dashboards_categories_relation,
      ...rest
    } = this.storage.get();

    const updatedCategories = dashboards_categories.filter(
      (category) => category.id !== id_category
    );

    const updatedRelations = dashboards_categories_relation.filter(
      (relation) => relation.id_category !== id_category
    );

    this.storage.set({
      ...rest,
      dashboards_categories: updatedCategories,
      dashboards_categories_relation: updatedRelations,
    });
  }
}