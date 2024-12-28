import { ILS } from "..";
import { IComponentFactory } from "../../../models/component.model"
import { v4 as uuidv4 } from 'uuid';

export class LSComponent implements IComponentFactory {
  private storage: ILS;

  constructor(storage: ILS) {
    this.storage = storage;
  }

  public create(
    title: string,
    width: number,
    height: number,
    id_dashboard: string
  ): void {
    const { components, ...rest } = this.storage.get()

    const newId = uuidv4()

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