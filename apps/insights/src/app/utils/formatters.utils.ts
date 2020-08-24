export const formatter = {
  date(dateValue: string): string {
    const date = new Date(dateValue)
    // + 1 since it's zero based
    return `${date.getMonth() + 1}/${date.getDate() + 1}/${date.getFullYear()}`
  },
}
