import { Request, httpHandler } from "./middlewares/http-handler"
import {
  handleCreateUser,
  handleGetUser, handleNotFound,
} from "./route-handlers"
import { IncomingMessage, ServerResponse } from "http"

enum Routes {
  GetCompanyName = "/get-company-name",
  CreateUser = "/create-user",
  GetUser = "/get-user",
}

export async function router(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) {
  const route = req.url

  switch (req.method) {
    case "GET":
      if (route === undefined || route === "/") {
        return httpHandler({
          req,
          res,
          next: (nextReq) => handleNotFound({ req: nextReq, res }),
        })
      }
      
      if (route === Routes.GetUser) {
        return httpHandler({
          req,
          res,
          next: (parsedReq) => handleGetUser({ req: parsedReq, res }),
        })
      }

      break;

    case "POST":
      if (route === Routes.CreateUser) {
        return httpHandler({ req, res, next: (parsedReq) => handleCreateUser({ req: parsedReq, res }) })
      }
      break;

    default:
      if (route === undefined || route === "/") {
        return httpHandler({
          req,
          res,
          next: (parsedReq) => handleNotFound({ req: parsedReq, res }),
        })
      }
  }
}
