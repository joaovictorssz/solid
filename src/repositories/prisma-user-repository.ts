import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client'
import { PrismaUserRepositoryInterface } from "./interfaces/prisma-user-repository";

export class PrismaUsersReposirory implements PrismaUserRepositoryInterface {


    async create(data: Prisma.UserCreateInput) {

        const user = await prisma.user.create({ data })

        return user
    }
}