import { Product as ProductModel } from "../../../prisma/generated/client"

export function isProductValid(product: Omit<ProductModel, "id">) {
  return Object.values(product).length < 3
}
