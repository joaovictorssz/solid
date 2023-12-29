import { PrismaUserRepository } from "@/repositories/prisma-user-repository"
import { CreateUserServices } from "../user/register/register-service"

export function makeRegisterService(){
    const prismaUserRepository = new PrismaUserRepository()
    const userServices = new CreateUserServices(prismaUserRepository)

    return userServices
}