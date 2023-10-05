import { PrismaClient } from "../../../prisma/generated/client"
import { FindProductController } from "../../controllers/product/find-product.controller"
import { ProductDatabase } from "../../database/product.database"

export function generateFindProductController() {
  const prisma = new PrismaClient()
  const userDb = new ProductDatabase(prisma)
  const findProductController = new FindProductController(userDb)
  return findProductController
}
