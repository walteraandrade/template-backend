import { ProductsDatabase } from "../database/product"
import prisma from "../db"
import { Product as ProductModel } from "../../prisma/generated/client"

export class Product {
  static id: number
  static productName: string
  static label: string
  static princeInCents: number

  static db = new ProductsDatabase(prisma)

  static async getProduct(id: number): Promise<ProductModel | null> {
    return await this.db.getProductById(id)
  }

  static async createProduct(product: Omit<ProductModel, "id">) {
    return await this.db.createProduct(product)
  }
}
