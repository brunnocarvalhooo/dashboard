import { LS } from "..";

export class CreateDashboard {
  public create(name: string) {
    const storage = new LS()

    const { dashboards, ...rest } = storage.get()

    dashboards.push({
      id: dashboards[dashboards.length].id + 1,
      name
    })

    return storage.set({ ...rest, dashboards })
  }
}