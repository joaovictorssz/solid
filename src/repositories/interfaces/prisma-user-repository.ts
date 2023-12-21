import { Prisma, User } from "@prisma/client";

export interface PrismaUserRepositoryInterface {
    create(data: Prisma.UserCreateInput): Promise<User>
}