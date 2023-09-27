import { IncomingMessage, ServerResponse } from "http"
import { User } from "../prisma/generated/client"
import { createUser } from "./user/create-user"
import { getUserByEmail } from "./user/get-user"
import { Request } from "./middlewares/http-handler"

const sharedHeader: Record<string, string> = {
  "Content-Type": "text/plain",
  "X-Powered-By": "Cuscuz and Eggs",
}

interface RouteHandlersParams {
  req: Promise<Request>
  res: ServerResponse<IncomingMessage>
}

export function handleNotFound({ res }: RouteHandlersParams) {
  res.writeHead(404, sharedHeader).write("Route not found")
  res.end()
}

export async function handleCreateUser({ req, res }: RouteHandlersParams) {

  const reqBody = await (await req).body
  if (!reqBody) {
    return res.end("In order to create an user you need to provide the correct data")
  }

  const userData: User = reqBody
  if (!isValidUser(userData)) {
    throw new Error("Invalid user")
  }

  const newUser = await createUser(userData)

  res
    .writeHead(200, sharedHeader)
    .write(`User ${newUser.name} created successfully`)

  res.end()
}

export async function handleGetUser({ req, res }: RouteHandlersParams) {
  const userEmail = (await req).body.email
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
