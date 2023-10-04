import { PrismaClient } from "../../prisma/generated/client"
import { FindUserController } from "../controllers/find-user.controller"
import { UserDatabase } from "../database/user.database"

export function createGetUserController() {
  const prisma = new PrismaClient()
  const userDb = new UserDatabase(prisma)
  const getUserController = new FindUserController(userDb)
  return getUserController
}
