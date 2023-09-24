import { IncomingMessage, ServerResponse } from "http"
import { logger } from "./logger"

const sharedHeader: Record<string, string> = {
  "Content-Type": "text/plain",
  "X-Powered-By": "Cuscuz and Eggs",
}

interface RouteHandlersType {
  req: IncomingMessage
  res: ServerResponse<IncomingMessage>
}

export function handleGetCompanyName({ req, res }: RouteHandlersType) {
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

export function handleNotFound({ req, res }: RouteHandlersType) {
  req.on("error", (err) => {
    logger(err.message, "error")
    res.writeHead(500)
    res.end(err.message)
  })

  res.writeHead(404, sharedHeader).write("Route not found")
  res.end()
}
