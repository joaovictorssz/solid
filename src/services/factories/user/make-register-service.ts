import { PrismaUserRepository } from "@/repositories/prisma-user-repository"
import { CreateUserServices } from "../../user/register/register-service"

export function makeRegisterService(){
    const prismaUserRepository = new PrismaUserRepository()
    const service = new CreateUserServices(prismaUserRepository)

    return service
}