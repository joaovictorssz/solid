import { PrismaUserRepository } from "@/repositories/prisma-user-repository"
import { AuthenticationService } from "../../user/authentication/authentication-service"

export function makeAuthenticationService(){
    const usersRepository = new PrismaUserRepository()
    const authenticationService = new AuthenticationService(usersRepository)
    return authenticationService
}