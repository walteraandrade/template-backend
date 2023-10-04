import { UserDatabase } from "../database/user.database"
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../models/controller.model"

export class FindUserController implements Controller {
  private readonly userDb: UserDatabase

  constructor(userDb: UserDatabase) {
    this.userDb = userDb
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.body.user.id) {
        return {
          statusCode: 406,
          body: "Invalid format. User id is required.",
        }
      }
      const newUserData = await this.userDb.getUserById(request.body.user.id)
      return {
        statusCode: 200,
        body: newUserData,
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: "Unknown error",
      }
    }
  }
}
