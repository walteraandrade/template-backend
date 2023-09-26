import { User } from '../../prisma/generated/client';
import Prisma from '../db';

export const createUser = async (user: User) => {
   return await Prisma.user.create({ data: user })
}