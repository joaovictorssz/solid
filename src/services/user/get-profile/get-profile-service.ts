import { PrismaUserRepository } from "@/repositories/prisma-user-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "../../errors/resource-not-found-error";

export class GetUserProfileService {
    constructor( private userRepository: PrismaUserRepository){}

    async get(id: string): Promise<User>{
        const user = await this.userRepository.getUserProfile(id)
        
        if(!user){
            throw new ResourceNotFoundError()
        }

        return user
    }
}