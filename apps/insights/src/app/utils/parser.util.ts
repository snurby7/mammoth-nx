import moment from 'moment'

export const parser = {
  date(value: string | null | Date): Date {
    if (typeof value === 'string') {
      return moment(value).toDate()
    }
    return moment().toDate()
  },
  removeEmpty(record: Record<string, unknown>) {
    Object.keys(record).forEach((key) => {
      if (record[key] === undefined) {
        delete record[key]
      }
    })
    return record
  },
}
