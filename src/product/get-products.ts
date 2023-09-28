import { Product } from '../../prisma/generated/client';
import prisma from '../db';

export const getProduct = async (product: Product) => {
   return await prisma.product.findFirst({ where: {
    name: product.name
   }})
}