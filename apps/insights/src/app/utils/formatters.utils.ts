import { IDateModel } from '@mammoth/api-interfaces'
import moment from 'moment'

export const formatter = {
  date(dateValue: string): string {
    return moment(dateValue).format('MM-DD-YYYY')
  },
  utcFormat(date: Date = new Date()): string {
    return moment.parseZone(date.toString()).utc().format()
  },
  currency(value: number): string {
    if (value < 0) {
      return `-$${Math.abs(value).toFixed(2)}`
    }
    return `$${value.toFixed(2)}`
  },
}

export const dateFormatter = {
  toDateString(dateModel: IDateModel): string {
    const date = new Date()
    date.setFullYear(dateModel.year)
    date.setMonth(dateModel.month - 1)
    date.setDate(dateModel.day)
    return date.toDateString()
  },
  toDate(dateModel: IDateModel): Date {
    const date = new Date()
    date.setFullYear(dateModel.year)
    date.setMonth(dateModel.month - 1)
    date.setDate(dateModel.day)
    return date
  },
}
