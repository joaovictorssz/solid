import { Prisma, User } from "@prisma/client";

export interface PrismaUserRepositoryInterface {
    create(data: Prisma.UserCreateInput): Promise<User>,
    verifyExistantEmail(email: string) : Promise<User | null>,
    getUserProfile(id: string) : Promise<User | null>
}