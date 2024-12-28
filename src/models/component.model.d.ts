export interface ILSComponent {
  id: string
  title: string
  width: number
  height: number
  content: string
  id_dashboard: string
}

export interface IComponentFactory {
  create(
    title: string,
    width: number,
    height: number,
    id_dashboard: string
  ): void
}
