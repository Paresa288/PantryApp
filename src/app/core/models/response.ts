import { Item } from "./item";

export interface Response {
  data: [Item],
  success: Boolean,
  message?: String,
  statusCode: number
}
