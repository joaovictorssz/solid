import { PrismaUserRepository } from "@/repositories/prisma-user-repository";
import { InvalidCredentialsError } from "../errors/invalid-credentia-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";


interface AuthenticationRequestBody {
    email: string,
    password: string
}


export class AuthenticationService {
    constructor(
        private userRepository: PrismaUserRepository
    ) { }


    async authenticate({ email, password }: AuthenticationRequestBody): Promise<User> {
        const user = await this.userRepository.verifyExistantEmail(email)

        if (!user) {
            throw new InvalidCredentialsError()
        }


        const doesPassowordMatches = await compare(password, user.password_hash)

        if (!doesPassowordMatches) {
            throw new InvalidCredentialsError()
        }

        return user

    }
}