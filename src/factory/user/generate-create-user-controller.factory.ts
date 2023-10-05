import { PrismaClient } from "../../../prisma/generated/client"
import { CreateUserController } from "../../controllers/user/create-user.controller"
import { UserDatabase } from "../../database/user.database"

export function generateCreateUserController() {
  const prisma = new PrismaClient()
  const userDb = new UserDatabase(prisma)
  const createUserController = new CreateUserController(userDb)
  return createUserController
}
