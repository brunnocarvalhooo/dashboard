import { ILS } from ".."
import { v4 as uuidv4 } from 'uuid'
import { IComponentsCategoriesFactory, ILSComponentsCategories } from "../../../models/category.model"

export class LSComponentsCategories implements IComponentsCategoriesFactory {
  private storage: ILS

  constructor(storage: ILS) {
    this.storage = storage
  }

  public create(
    name: string,
    color: string,
    id_components: string[]
  ) {
    const {
      components_categories,
      components_categories_relation,
      ...rest
    } = this.storage.get()

    const newId = uuidv4()

    components_categories.push({
      id: newId,
      name,
      color,
      active: true
    })

    const updatedRelations = this.createRelations(newId, id_components, components_categories_relation)

    this.storage.set({
      ...rest,
      components_categories,
      components_categories_relation: updatedRelations,
    })
  }

  public update(
    id_category: string,
    name: string,
    color: string,
    id_components: string[]
  ) {
    const { components_categories, components_categories_relation, ...rest } = this.storage.get()

    const selectedCategory = components_categories.find(
      (category) => category.id === id_category
    )

    if (selectedCategory) {
      selectedCategory.name = name
      selectedCategory.color = color

      const filteredRelations = components_categories_relation.filter(
        (relation) => relation.id_category !== id_category
      )

      const updatedRelations = this.createRelations(
        id_category,
        id_components,
        filteredRelations
      )

      this.storage.set({
        ...rest,
        components_categories,
        components_categories_relation: updatedRelations,
      })
    }
  }

  private createRelations(
    id_category: string,
    id_components: string[],
    existingRelations: ILSComponentsCategories[]
  ): ILSComponentsCategories[] {
    const newRelations = id_components.map((id_component) => ({
      id: uuidv4(),
      id_category,
      id_component,
    }))

    return [...existingRelations, ...newRelations]
  }

  public delete(id_category: string) {
    const {
      components_categories,
      components_categories_relation,
      ...rest
    } = this.storage.get()

    const updatedCategories = components_categories.filter(
      (category) => category.id !== id_category
    )

    const updatedRelations = components_categories_relation.filter(
      (relation) => relation.id_category !== id_category
    )

    this.storage.set({
      ...rest,
      components_categories: updatedCategories,
      components_categories_relation: updatedRelations,
    })
  }

  public changeActiveStatus(id_category: string) {
    const { components_categories, ...rest } = this.storage.get()

    const updatedCategories = components_categories.map((category) =>
      category.id === id_category
        ? { ...category, active: !category.active }
        : category
    )

    this.storage.set({
      ...rest,
      components_categories: updatedCategories,
    })
  }
}