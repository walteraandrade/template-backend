import { PrismaClient } from "../../prisma/generated/client";


export class Database {
    protected client: PrismaClient;
    constructor(client: PrismaClient) {
        this.client = client;
    }
}