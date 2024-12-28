import { ILS } from "..";
import { ICategoryFactory, ILSComponentCategories, ILSDashboardCategories } from "../../../models/category.model"
import { v4 as uuidv4 } from 'uuid';

export enum Target {
  COMPONENT = 'component_categories',
  DASHBOARD = 'dashboard_categories'
}

export class LSCategory implements ICategoryFactory {
  private storage: ILS;

  constructor(storage: ILS) {
    this.storage = storage;
  }

  public create(
    name: string,
    color: string,
    target: Target,
    id_target?: string
  ): void {
    const { categories, ...rest } = this.storage.get()

    const targetCategory =
      target === Target.COMPONENT
        ? rest.component_categories
        : rest.dashboard_categories

    const newCategoryId = uuidv4()

    categories.push({ id: newCategoryId, name, color })


    const newRelationId = uuidv4()

    if (target === Target.COMPONENT) {
      (targetCategory as ILSComponentCategories[]).push({
        id: newRelationId,
        id_component: id_target || target,
        id_category: newCategoryId,
      })
    } else {
      (targetCategory as ILSDashboardCategories[]).push({
        id: newRelationId,
        id_dashboard: id_target || target,
        id_category: newCategoryId,
      })
    }


    this.storage.set({
      ...rest,
      categories,
      [target]: targetCategory,
    })
  }
}