import { PrismaClient } from "../../prisma/generated/client"
import { FindUserController } from "../controllers/user/find-user.controller"
import { UserDatabase } from "../database/user.database"

export function generateFindUserController() {
  const prisma = new PrismaClient()
  const userDb = new UserDatabase(prisma)
  const getUserController = new FindUserController(userDb)
  return getUserController
}
