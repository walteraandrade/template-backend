import { User as UserModel } from "../../../../prisma/generated/client"
import { UseCase } from "../../../models/use-case.model"

const mockUser = {
  id: 1,
  name: "Manu Dibango",
  email: "manudibango@email.com",
}
const generateFindUserUseCase = () => {
  class FindUserUseCase implements UseCase<UserModel> {
    async exec(id: number) {
      return await Promise.resolve(mockUser)
    }
  }
  return new FindUserUseCase()
}

describe("Testing user controllers", () => {
  test("Should return the correct user from searchin by the right id", async () => {
    const httpRequest = {
      body: {
        id: 1,
      },
    }
    const findUserUseCase = generateFindUserUseCase()
    const user = await findUserUseCase.exec(1)

    expect(user.email).toBe(mockUser.email)
  })
})
