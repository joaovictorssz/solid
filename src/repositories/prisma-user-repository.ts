import { prisma } from "@/lib/prisma";
import {Prisma} from '@prisma/client'

export class PrismaUsersReposirory{

    async create(data: Prisma.UserCreateInput){
        
        // prisma verifies if the given email already exists in database
        const userWithSameEmail = await prisma.user.findUnique({
            where:{
            email: data.email
            }
        })

        if(userWithSameEmail){
            throw new Error("E-mail already exists.")
        }
        const user = await prisma.user.create({
            data
        })

        return user
    }
}