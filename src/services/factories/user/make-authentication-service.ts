import { PrismaUserRepository } from "@/repositories/prisma-user-repository"
import { AuthenticationService } from "../../user/authentication/authentication-service"

export function makeAuthenticationService(){
    const usersRepository = new PrismaUserRepository()
    const service = new AuthenticationService(usersRepository)
    return service
}