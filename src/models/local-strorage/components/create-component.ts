import { LS } from ".."

export class Dashboard {
  public create(
    title: string,
    width: number,
    height: number,
    id_dashboard: number
  ): void {
    const storage = new LS()

    const { components, ...rest } = storage.get()

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

    storage.set({ ...rest, components })
  }
}