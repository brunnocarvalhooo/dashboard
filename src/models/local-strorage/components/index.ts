import { ILS } from "..";
import { IComponentFactory } from "../../component.model"

export class LSComponent implements IComponentFactory {
  private storage: ILS;

  constructor(storage: ILS) {
    this.storage = storage;
  }

  public create(
    title: string,
    width: number,
    height: number,
    id_dashboard: number
  ): void {
    const { components, ...rest } = this.storage.get()

    const newId = components.length
      ? components[components.length - 1].id + 1
      : 1

    components.push({
      id: newId,
      title,
      width,
      height,
      id_dashboard,
      content: '',
    })

    this.storage.set({ ...rest, components })
  }
}