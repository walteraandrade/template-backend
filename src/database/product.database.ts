import { Product as ProductModel } from "../../prisma/generated/client"
import { Database } from "./database.service"

export class ProductDatabase extends Database {
  async getProductById(id: number): Promise<ProductModel | null> {
    return await this.client.product.findUnique({ where: { id } })
  }

  async createProduct(
    product: Omit<ProductModel, "id">
  ): Promise<ProductModel> {
    return await this.client.product.create({ data: product })
  }
}
