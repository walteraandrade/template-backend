import { logger } from "./logger"
import { handleCreateUser, handleGetCompanyName, handleGetUser, handleNotFound } from "./route-handlers"
import { IncomingMessage, ServerResponse } from "http"

enum Routes {
  GetCompanyName = "/get-company-name",
  CreateUser = "/create-user",
  GetUser = "/get-user"
}

export function router(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  route?: string
) {
  
  if (route === undefined || route === '/') {
    return handleNotFound({ req, res })
  }
  if (route === Routes.GetCompanyName) {
    return handleGetCompanyName({ req, res })
  }
  
  if (route === Routes.CreateUser) {
    return handleCreateUser({ req, res })
  }

  if (route === Routes.GetUser) {
    return handleGetUser({ req, res })
  }

  else return res.end()
}
