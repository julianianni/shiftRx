export const formatDateToDDMMYYYYY = (d: string) => {
  const date = new Date(d)
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
}
