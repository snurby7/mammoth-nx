import moment from 'moment'

export const parser = {
  date(value: string | null): Date {
    if (value) {
      return moment(value.replace(/[a-z]/gi, ' ').split(' ')[0]).toDate()
    }
    return moment().toDate()
  },
}
