import { PrismaClient } from "../../../prisma/generated/client"
import { FindUserController } from "../../controllers/user/find-user.controller"
import { UserDatabase } from "../../database/user.database"

export function generateChangeUserEmailController() {
  const prisma = new PrismaClient()
  const userDb = new UserDatabase(prisma)
  const changeUserController = new FindUserController(userDb)
  return changeUserController
}
