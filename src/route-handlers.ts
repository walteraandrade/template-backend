import { IncomingMessage, ServerResponse } from "http"
import { logger } from "./logger"
import { User } from "../prisma/generated/client"
import { createUser } from "./user/create-user"
import { getUserByEmail } from "./user/get-user"

const sharedHeader: Record<string, string> = {
  "Content-Type": "text/plain",
  "X-Powered-By": "Cuscuz and Eggs",
}

interface RouteHandlersParams {
  req: IncomingMessage
  res: ServerResponse<IncomingMessage>
}

export function handleGetCompanyName({ req, res }: RouteHandlersParams) {
  req.on("error", (err) => {
    logger(err.message, "error")
    res.writeHead(400)
    res.end(err.message)
  })

  res
    .writeHead(200, {
      Method: req.method,
      url: req.url,
      ...sharedHeader,
    })
    .write("Cuscuz and Eggs")

  res.end()
}

export function handleNotFound({ req, res }: RouteHandlersParams) {
  req.on("error", (err) => {
    logger(err.message, "error")
    res.writeHead(500)
    res.end(err.message)
  })

  res.writeHead(404, sharedHeader).write("Route not found")
  res.end()
}

export function handleCreateUser({ req, res }: RouteHandlersParams) {
  if (req.method === "POST") {
    let reqBody = ""

    req.on("data", (reqData: any) => {
      reqBody = reqData.toString()
    })

    req.on("end", () => {
      try {
        if (!reqBody) {
          return res.end("Empty request")
        }

        const userData: User = JSON.parse(reqBody).data
        if (!isValidUser(userData)) {
          throw new Error("Invalid user")
        }

        createUser(userData)

        res
          .writeHead(200, sharedHeader)
          .write(`User ${userData.name} created successfully`)

        res.end()
      } catch (err) {
        console.log(err)
      }
    })
  } else {
    logger("Wrong method", "error")
    return res.end("Wrong method")
  }
}

export function handleGetUser({ req, res }: RouteHandlersParams) {
  if (req.method !== "GET") {
    logger("Wrong method")
    res.writeHead(405, "Method not allowed").write(sharedHeader)

    return res.end()
  }
  let userData = ""
  req.on("data", (reqData) => {
    userData = reqData.toString()
  })

  req.on("end", async () => {
    try {
      if (!userData) {
        return res.end("Empty request")
      }
      const userEmail = JSON.parse(userData).data.email


      if (!userEmail) {
        return res.end("Cannot query user without an email")
      }

      const user = await getUserByEmail(userEmail)

      res.writeHead(200, sharedHeader).write(JSON.stringify(user))

      res.end()
    } catch (err) {
      console.log(err)
    }
  })
}

function isValidUser(user: User): user is User {
  return (user as User).name !== undefined || (user as User).email !== undefined
}
