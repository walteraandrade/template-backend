import { User as UserModel } from "../../../../prisma/generated/client"
import { HttpRequest, HttpResponse } from "../../../models/controller.model"
import { UseCase } from "../../../models/use-case.model"
import { FindUserController } from "../find-user.controller"

const mockUser = {
  id: 1,
  name: "Manu Dibango",
  email: "manudibango@email.com",
}

const stubFindUserUseCase = () => {
  class FindUserUseCase implements UseCase<UserModel> {
    async exec(id: number) {
      if (id === mockUser.id) {
        return await Promise.resolve(mockUser)
      } else return null
    }
  }
  return new FindUserUseCase()
}

const findUserController = new FindUserController(stubFindUserUseCase() as any)

describe("Testing user controllers", () => {
  test("Should return the correct user from searchin by the right id", async () => {
    const httpRequest = {
      body: {
        user: {
          id: 1,
        },
      },
    }

    const response = await findUserController.handle(httpRequest)

    expect(response.statusCode).toBe(200)
    expect((response.body as UserModel).id).toBe(httpRequest.body.user.id)
  })

  test("Should return 406 if no body is passed to the request", async () => {
    const httpRequest: HttpRequest = {
      body: null,
    }

    const response = await findUserController.handle(httpRequest)

    expect(response.statusCode).toBe(406)
  })

  test("Should return 200 with error message if no user was found", async () => {
    const httpRequest: HttpRequest = {
      body: {
        user: {
          id: 2,
        },
      },
    }
    const response = await findUserController.handle(httpRequest)

    expect(response.statusCode).toBe(200)
    expect(response.body).toBe("User not found")
  })
})
