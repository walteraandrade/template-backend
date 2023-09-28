import { Request, Response } from "express"
import { createProduct } from "../product/create-product"
import { getProduct } from "../product/get-products"

export const handleCreateProduct = async (req: Request, res: Response) => {
  if (!req.body.product) {
    return res.sendStatus(406)
  }

  await createProduct(req.body.product)

  res.end()
}

export const handleGetProduct = async (req: Request, res: Response) => {
  if (!req.body?.product?.name) {
    return res.sendStatus(406)
  }

  const product = await getProduct(req.body.product.name)
  if (product) {
    res.send(product)
  }
  else res.send("Product not found")
}
