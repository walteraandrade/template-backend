import { Product as ProductModel } from "../../../prisma/generated/client"
import { ProductDatabase } from "../../database/product.database"
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../models/controller.model"
import { isProductValid } from "./utils"

export class CreateProductController implements Controller<ProductModel> {
  private readonly productDb: ProductDatabase

  constructor(productDb: ProductDatabase) {
    this.productDb = productDb
  }

  async handle(request: HttpRequest): Promise<HttpResponse<ProductModel>> {
    try {
      if (isProductValid(request.body.product)) {
        return {
          statusCode: 406,
          body: "Invalid format. Product is required.",
        }
      }
      const newUserData = await this.productDb.createProduct(
        request.body.product
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
        body: "Unknown error",
      }
    }
  }
}
