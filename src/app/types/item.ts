export interface Item {
  id: number | undefined,
  name: string,
  unit: string,
  expDate?: Date,
  categoryId: number,
  locationId: number
}
