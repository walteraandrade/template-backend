export type HttpRequest = {
  body?: any
}

export type HttpResponse<T> = {
  statusCode: number
  body: T | string
}

export interface Controller<T> {
  handle: (request: HttpRequest) => Promise<HttpResponse<T>>
}
