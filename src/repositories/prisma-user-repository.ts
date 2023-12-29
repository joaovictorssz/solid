import { Prisma, User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { PrismaUserRepositoryInterface } from "./interfaces/prisma-user-repository";

export class PrismaUserRepository implements PrismaUserRepositoryInterface {

    async getUserProfile(id: string): Promise<User | null> {
            const user = await prisma.user.findUnique({
                where:{
                    id
                }
            })

            return user
        }
        
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