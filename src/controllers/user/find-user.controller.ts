import { User as UserModel } from "../../../prisma/generated/client"
import { UserDatabase } from "../../database/user.database"
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../models/controller.model"

export class FindUserController implements Controller<UserModel> {
  private readonly userDb: UserDatabase

  constructor(userDb: UserDatabase) {
    this.userDb = userDb
  }

  async handle(request: HttpRequest): Promise<HttpResponse<UserModel>> {
    try {
      if (!request.body.user.id) {
        return {
          statusCode: 406,
          body: "Invalid format. User id is required.",
        }
      }
      const newUserData = await this.userDb.getUserById(request.body.user.id)
      if (newUserData) {
        return {
          statusCode: 200,
          body: newUserData,
        }
      } else {
        return {
          statusCode: 200,
          body: "User not found",
        }
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: "Unknown error",
      }
    }
  }
}
