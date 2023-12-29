import { PrismaUserRepository } from "@/repositories/prisma-user-repository";
import { hash } from "bcryptjs";
import { EmailAlreadyExistsError } from "../errors/email-already-exists-error";
import { User } from "@prisma/client";

interface RequestBodyInterface {
    name: string,
    email: string,
    password: string
}

interface UserRegistrationResponse{
    user: User
}

export class CreateUserServices {
    constructor(private userRepository: PrismaUserRepository) { }

    async create({ email, name, password }: RequestBodyInterface) : Promise<UserRegistrationResponse>{

        const password_hash = await hash(password, 6)

        const emailAlreadyExists = await this.userRepository.verifyExistantEmail(email)

        if (emailAlreadyExists) {
            throw new EmailAlreadyExistsError()
        }

        const user = await this.userRepository.create({ email, name, password_hash })

        return {
            user
        }

    }

}