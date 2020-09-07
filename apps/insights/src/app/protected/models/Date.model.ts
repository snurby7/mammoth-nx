import { types } from 'mobx-state-tree'

export const DateModel = types
  .model({
    year: types.number,
    month: types.number,
    day: types.number,
    hour: types.number,
    minute: types.number,
    second: types.number,
  })
  .views((self) => ({
    toDate(): string {
      const date = new Date()
      date.setFullYear(self.year)
      date.setMonth(self.month - 1)
      date.setDate(self.day)
      console.log(self, date.toISOString())
      return date.toDateString()
    },
  }))
