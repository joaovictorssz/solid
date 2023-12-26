import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { PrismaUserRepositoryInterface } from "./interfaces/prisma-user-repository";

export class PrismaUserRepository implements PrismaUserRepositoryInterface {

    async verifyExistantEmail(email: string) {

        const emailAlreadyExists = await prisma.user.findUnique({
            where: {
                email
            }
        })

        return emailAlreadyExists

    }

    async create(data: Prisma.UserCreateInput) {

        const user = await prisma.user.create({
            data
        })
        return user
    }

}