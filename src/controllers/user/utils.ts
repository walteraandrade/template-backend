import { User as PrismaUser } from "../../../prisma/generated/client"

export function isValidUser(user: PrismaUser): user is PrismaUser {
  return (
    (user as PrismaUser).name !== undefined ||
    (user as PrismaUser).email !== undefined
  )
}
