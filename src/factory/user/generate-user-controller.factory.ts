import { PrismaClient } from "../../../prisma/generated/client"
import { FindUserController } from "../../controllers/user/find-user.controller"
import { UserDatabase } from "../../database/user.database"
import { FindUserUseCase } from "../../domain/find-user.use-case"

export function generateFindUserController() {
  const prisma = new PrismaClient()
  const userDb = new UserDatabase(prisma)
  const findUserUseCase = new FindUserUseCase(userDb)
  const getUserController = new FindUserController(findUserUseCase)
  return getUserController
}
