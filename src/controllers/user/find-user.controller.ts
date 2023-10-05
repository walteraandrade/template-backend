import { User as UserModel } from "../../../prisma/generated/client"
import { FindUserUseCase } from "../../domain/find-user.use-case"
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../models/controller.model"

export class FindUserController implements Controller<UserModel> {
  private readonly findUserUseCase: FindUserUseCase

  constructor(findUserUseCase: FindUserUseCase) {
    this.findUserUseCase = findUserUseCase
  }

  async handle(request: HttpRequest): Promise<HttpResponse<UserModel>> {
    try {
      if (!request.body.user.id) {
        return {
          statusCode: 406,
          body: "Invalid format. User id is required.",
        }
      }
      const newUserData = await this.findUserUseCase.exec(request.body.user.id)
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
        body: "Unknown error at FindUserController",
      }
    }
  }
}
