import { handleGetCompanyName, handleNotFound } from "./route-handlers"
import { IncomingMessage, ServerResponse } from "http"

enum Routes {
  GetCompanyName = "/get-company-name",
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
  else return res.end()
}
