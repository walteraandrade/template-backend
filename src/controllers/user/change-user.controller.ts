import { User as UserModel } from "../../../prisma/generated/client"
import { UserDatabase } from "../../database/user.database"
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../models/controller.model"

export class ChangeUserEmailController implements Controller<UserModel> {
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

      if (!request.body.user.email) {
        return {
          statusCode: 200,
          body: "A new email is needed in order to complete this operation.",
        }
      }
      const newUserData = await this.userDb.updateUserEmail(
        request.body.user.id,
        request.body.user.email
      )
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
