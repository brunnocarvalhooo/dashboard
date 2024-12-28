export interface ILSComponent {
  id: number
  title: string
  width: number
  height: number
  content: string
  id_dashboard: number
}

export interface IComponentFactory {
  create(
    title: string,
    width: number,
    height: number,
    id_dashboard: number
  ): void
}
