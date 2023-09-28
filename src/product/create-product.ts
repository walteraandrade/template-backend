import { Product } from "../../prisma/generated/client"
import prisma from "../db"


export const createProduct = async (product: Product) => {
   return await prisma.product.create({ data: {
    label: product.label,
    name: product.name,
    priceInCents: product.priceInCents
   }})
}