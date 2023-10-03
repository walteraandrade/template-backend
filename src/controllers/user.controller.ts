import { User as PrismaUser } from "../../prisma/generated/client"
import { User } from "../entities/user"
import { Request, Response } from "express"

const sharedHeader: Record<string, string> = {
  "Content-Type": "text/plain",
  "X-Powered-By": "Cuscuz and Eggs",
}

export function handleNotFound(req: Request, res: Response) {
  res.sendStatus(404)
}

export async function handleCreateUser(req: Request, res: Response) {
  if (!req.body) {
    return res.end(
      "In order to create an user you need to provide the correct data"
    )
  }

  if (!isValidUser(req.body)) {
    throw new Error("Invalid user")
  }

  const newUser = await User.createUser(req.body.name, req.body.email)

  res
    .writeHead(200, sharedHeader)
    .write(`User ${newUser.name} created successfully`)

  res.end()
}

export async function handleUpdateUserEmail(req: Request, res: Response) {
  const userToUpdate = req.body.user
  if (!userToUpdate.id) {
    return res.end("Cannot query user without an id")
  }

  if (!userToUpdate.email) {
    return res.end("Cannot update an user's email without an email")
  }

  const user = await User.updateEmail(req.body.id, req.body.email)

  res.writeHead(200, sharedHeader).write(JSON.stringify(user))

  res.end()
}

export async function handleGetUser(req: Request, res: Response) {
  console.log(1)
  const userId = Number(req.body.user.id)

  if (!userId) {
    throw new Error("An id is necessary to find user")
  }
  const user = await User.findById(userId)

  res.write(JSON.stringify(user))

  res.end()
}

function isValidUser(user: PrismaUser): user is PrismaUser {
  return (
    (user as PrismaUser).name !== undefined ||
    (user as PrismaUser).email !== undefined
  )
}
