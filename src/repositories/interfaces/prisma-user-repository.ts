import { Prisma, User } from "prisma/prisma-client";

export interface PrismaUserRepositoryInterface {
    create(data: Prisma.UserCreateInput): Promise<User>,
}