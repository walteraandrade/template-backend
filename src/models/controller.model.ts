export type HttpRequest = {
  body?: any
}

export type HttpResponse = {
  statusCode: number
  body: any
}

export interface Controller {
  handle: (request: HttpRequest) => Promise<HttpResponse>
}
