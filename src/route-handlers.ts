import { User } from "../prisma/generated/client"
import { createUser } from "./user/create-user"
import { getUserByEmail } from "./user/get-user"
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
    return res.end("In order to create an user you need to provide the correct data")
  }

  if (!isValidUser(req.body)) {
    throw new Error("Invalid user")
  }

  const newUser = await createUser(req.body)

  res
    .writeHead(200, sharedHeader)
    .write(`User ${newUser.name} created successfully`)

  res.end()
}

export async function handleGetUser(req: Request, res: Response) {


  const userEmail = req.body.email
  if (!userEmail) {
    return res.end("Cannot query user without an email")
  }

  const user = await getUserByEmail(userEmail)

  res.writeHead(200, sharedHeader).write(JSON.stringify(user))

  res.end()
}

function isValidUser(user: User): user is User {
  return (user as User).name !== undefined || (user as User).email !== undefined
}
