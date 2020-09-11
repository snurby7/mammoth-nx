interface IMonthDetail {
  month: number
  year: number
}

export interface IMonthBoundary {
  start: IMonthDetail
  end: IMonthDetail
}
