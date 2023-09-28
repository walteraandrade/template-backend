import { Product } from "../../prisma/generated/client"
import { Database } from "./database.service"

export class ProductsDatabase extends Database {
  async getProductById(id: number): Promise<Product | null> {
    return await this.client.product.findUnique({ where: { id } })
  }

  async createProduct(product: Product): Promise<Product> {
    return await this.client.product.create({ data: product })
  }
}
