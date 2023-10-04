import { PrismaClient, User as PrismaUser } from "../../prisma/generated/client"
import { Database } from "./database.service"

export class UserDatabase {
  private readonly client: PrismaClient

  constructor(prisma: PrismaClient) {
    this.client = prisma
  }
  async createUser(user: Omit<PrismaUser, "id">) {
    return await this.client.user.create({ data: user })
  }

  async getUserById(id: number) {
    return await this.client.user.findUnique({
      where: {
        id,
      },
    })
  }

  async getUserByEmail(email: string) {
    return await this.client.user.findUnique({
      where: {
        email,
      },
    })
  }

  async updateUserEmail(userId: number, email: string) {
    return await this.client.user.update({
      where: { id: userId },
      data: { email },
    })
  }

  async deleteUser(userId: number) {
    return await this.client.user.delete({
      where: { id: userId },
    })
  }
}
