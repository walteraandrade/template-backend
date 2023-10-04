import { Request, Response } from "express"
import { Controller, HttpRequest } from "../models/controller.model"

export function httpParser(controller: Controller) {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
    }
    const HttpResponse = await controller.handle(httpRequest)
    res.status(HttpResponse.statusCode).json(HttpResponse.body)
  }
}
