import { PrismaClient } from "../../../prisma/generated/client"
import { CreateProductController } from "../../controllers/product/create-product.controller"
import { ProductDatabase } from "../../database/product.database"

export function generateCreateProductController() {
  const prisma = new PrismaClient()
  const userDb = new ProductDatabase(prisma)
  const createProductController = new CreateProductController(userDb)
  return createProductController
}
