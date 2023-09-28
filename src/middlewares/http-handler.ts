import { IncomingMessage, ServerResponse } from "http"
import { logger } from "../logger"

const sharedHeader: Record<string, string> = {
  "Content-Type": "text/plain",
  "X-Powered-By": "Cuscuz and Eggs",
}

interface HttpHandlerParams {
  req: IncomingMessage
  res: ServerResponse<IncomingMessage>
  next: (nextParams: Promise<Request>) => void
}

export const httpHandler = ({ req, res, next }: HttpHandlerParams) => {
  req.on("error", (err) => {
    logger(err.message, "error")
    res.writeHead(500).write(sharedHeader)
    return res.end(`Http error: ${err.message}`)
  })

  next(requestParser(req))
}

export async function requestParser(request: IncomingMessage): Promise<Request> {
  const req: Request = {};
  await request.on("data", (chunk) => {
    req.body = JSON.parse(chunk).data
  })

  req.params = getParams(request.url)
  req.url = request.url;

  return req;
}

function getParams(url?: string) {
  if (url) {
    const colonIndex = url.indexOf(":")
    return url.slice(colonIndex ? colonIndex + 1 : 0)
  } else {
    logger("Invalid Params", "error")
  }
}

export interface Request {
  body?: any
  params?: string
  url?: string;
}
