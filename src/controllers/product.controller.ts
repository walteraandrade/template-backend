import { Request, Response } from "express"
import { Product } from "../entities/product.entity"

export const handleCreateProduct = async (req: Request, res: Response) => {
  if (!req.body.product) {
    return res.sendStatus(406)
  }

  await Product.createProduct(req.body.product)

  res.end()
}

export const handleGetProduct = async (req: Request, res: Response) => {
  const productId = Number(req.body?.product?.id)

  if (!productId) {
    throw new Error("Id is needed to query product")
  }

  const product = await Product.getProduct(productId)
  if (product) {
    res.send(JSON.stringify(product))
  } else res.send("Product not found")

  res.end()
}
