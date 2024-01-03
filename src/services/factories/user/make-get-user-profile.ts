import { PrismaUserRepository } from "@/repositories/prisma-user-repository"
import { GetUserProfileService } from "../../user/get-profile/get-profile-service"

export function makeGetUserProfile(){
    const userRepository  = new PrismaUserRepository()
    const service = new GetUserProfileService(userRepository)
    return service
}