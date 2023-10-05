import { Product as ProductModel } from "../../../prisma/generated/client"
import { ProductDatabase } from "../../database/product.database"
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../models/controller.model"

export class FindProductController implements Controller<ProductModel> {
  private readonly productDb: ProductDatabase

  constructor(productDb: ProductDatabase) {
    this.productDb = productDb
  }

  async handle(request: HttpRequest): Promise<HttpResponse<ProductModel>> {
    try {
      if (!request.body.product.id) {
        return {
          statusCode: 406,
          body: "Invalid format. Product id is required.",
        }
      }
      const newUserData = await this.productDb.getProductById(
        request.body.product.id
      )
      if (newUserData) {
        return {
          statusCode: 200,
          body: newUserData,
        }
      } else {
        return {
          statusCode: 200,
          body: "Product not found",
        }
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: "Unknown error at FindProductController",
      }
    }
  }
}
