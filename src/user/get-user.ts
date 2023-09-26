import Prisma from "../db"

export const getUserByEmail = async (userEmail: string) => {
  const user = await Prisma.user.findUnique({ where: { email: userEmail } })
  if (user) {
    return user
  } else {
    return "User not found"
  }
}
