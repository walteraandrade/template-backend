import { User as UserModel } from "../../prisma/generated/client"
import { UserDatabase } from "../database/user.database"
import { UseCase } from "../models/use-case.model"

export class FindUserUseCase implements UseCase<UserModel | null> {
  private readonly userDb: UserDatabase

  constructor(userDb: UserDatabase) {
    this.userDb = userDb
  }

  async exec(userId: number) {
    const user = await this.userDb.getUserById(userId)
    if (user) {
      return user
    } else {
      return null
    }
  }
}
