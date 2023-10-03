import { UserDatabase } from "../database/user"
import prisma from "../db"
import { User as PrismaUser } from "../../prisma/generated/client"

export class User {
  static id: number
  static username: string
  static email: string

  static db = new UserDatabase(prisma)

  static async findById(userId: number): Promise<PrismaUser | null> {
    try {
      const result: PrismaUser | null = await this.db.getUserById(userId)

      if (!result) {
        throw new Error("No user found")
      }

      return result
    } catch (error) {
      throw error
    }
  }

  static async createUser(name: string, email: string): Promise<PrismaUser> {
    try {
      const result: PrismaUser | null = await this.db.createUser({
        name,
        email,
      })

      return result
    } catch (err) {
      throw new Error("Could not create user")
    }
  }

  static async updateEmail(
    userId: number,
    newEmail: string
  ): Promise<PrismaUser> {
    try {
      const result: PrismaUser | null = await this.db.updateUserEmail(
        userId,
        newEmail
      )
      if (!result) {
        throw new Error("Could not update email")
      }

      return result
    } catch (error) {
      throw error
    }
  }

  static async delete(userId: number): Promise<void> {
    try {
      const result = this.db.deleteUser(userId)
    } catch (error) {
      throw error
    }
  }
}
