import { User as UserModel } from "../../../prisma/generated/client"
import { UserDatabase } from "../../database/user.database"
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../models/controller.model"
import { isValidUser } from "./utils"

export class CreateUserController implements Controller<UserModel> {
  private readonly userDb: UserDatabase

  constructor(userDb: UserDatabase) {
    this.userDb = userDb
  }

  async handle(request: HttpRequest): Promise<HttpResponse<UserModel>> {
    try {
      if (!isValidUser(request.body.user)) {
        throw new Error(
          "Could not find user to create. Please provide an user object with name and email."
        )
      }
      const newUser = await this.userDb.createUser({
        name: request.body.name,
        email: request.body.email,
      })

      return {
        statusCode: 200,
        body: newUser,
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: "Unknown error at CreateUserController",
      }
    }
  }
}
