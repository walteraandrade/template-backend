import { User as UserModel } from "../../prisma/generated/client"
import { UserDatabase } from "../database/user.database"
import { UseCase } from "../models/use-case.model"

export class FindUserUseCase implements UseCase<Promise<UserModel | null>> {
  private readonly userDatabase: UserDatabase

  constructor(userDatabase: UserDatabase) {
    this.userDatabase = userDatabase
  }

  async exec(userId: number): Promise<UserModel | null> {
    const user = await this.userDatabase.getUserById(userId)
    return user
  }
}
