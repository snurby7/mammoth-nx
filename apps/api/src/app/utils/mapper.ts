import { IDateRangeSearchQuery, IMonthBoundary } from '@mammoth/api-interfaces'

export const toMonthBoundary = (request: IDateRangeSearchQuery): IMonthBoundary => {
  return {
    start: {
      day: request.dayStart,
      month: request.monthStart,
      year: request.yearStart,
    },
    end: {
      day: request.dayEnd,
      month: request.monthEnd,
      year: request.yearEnd,
    },
  }
}
